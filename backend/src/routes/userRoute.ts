import { signinInput, signupInput } from "@anil-prasad/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { decode, sign, jwt, verify } from "hono/jwt";
import { comparePassword, hashPassword } from "../utils/passwordUtil";
export const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();



userRoute.post("/signup", async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        c.json({msg:"Invalid Inputs"});
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const hashpassword = hashPassword(body.password);
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashpassword,
            },
        });
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.text(jwt);
    } catch (error) {
        c.status(411);
        return c.text("User already exists");
    }
});

userRoute.post("/signin", async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        c.json({msg:"Invalid Inputs"});
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        //@ts-ignore
        const isValid = comparePassword(body.password, user.password);
        if (!user || !isValid) {
            c.status(403);
            return c.json({ msg: "Incorrect credentials" });
        }
        //@ts-ignore
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.text(jwt);
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.text("Ivalid");
        
    }
    
});
