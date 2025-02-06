import { Hono } from "hono";
import { cors } from 'hono/cors'
import { userRoute } from "./routes/userRoute";
import { blogRoute } from "./routes/blogRoute";

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();
app.use('/*', cors());
app.route("/api/v1/user",userRoute);
app.route("/api/v1/blog",blogRoute)

export default app;
