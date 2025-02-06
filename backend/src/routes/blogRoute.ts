import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { decode, sign, jwt, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@anil-prasad/medium-common";
export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

blogRoute.use("/*", async (c, next) => {
    const header = c.req.header("authorization") || "";
    try {
        const user = await verify(header, c.env.JWT_SECRET);
        if (user) {
            //@ts-ignore
            c.set("userId", user.id);
            await next();
        } else {
            c.status(411);
            c.json({ msg: "Unauthorized" });
        }
    } catch (error) {
        c.status(411);
        return c.json({ msg: "Invalid Token" });

    }

});

blogRoute.post("/", async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ msg: "Invalid Inputs" });
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId,
            },
        });
        return c.json({
            blog: blog.id,
        });
    } catch (error) {
        c.status(400);
        return c.json({ message: "User not created" });
    }
});

blogRoute.put("/", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ msg: "Invalid Inputs" });
    }
    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content,
            },
        });
        return c.json({
            blog: blog.id,
        });
    } catch (error) {
        c.status(400);
        return c.json({ msg: "error updating blog" });
    }   
});

blogRoute.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({
        blogs
    });
});

blogRoute.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    console.log(id);
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id,
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        return c.json({
            blog
        });
    } catch (error) {
        c.status(411);
        return c.json({ msg: "Error while fetching blog post" });
    }
});


