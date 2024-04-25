import { Hono } from "hono";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { greetRoute } from "./greet";

const app = new Hono();

app.use(etag(), logger());
app.use(prettyJSON());
app.use(cors());

app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

// Custom middleware, refer https://hono.dev/concepts/middleware
app.use(async (c, next) => {
	const start = Date.now();
	await next();
	const end = Date.now();
	c.res.headers.set("X-Response-Time", `${end - start}`);
});

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get("/hello", (c) => {
	return c.json({
		message: "Hello!",
	});
});

greetRoute(app);

export default app;
