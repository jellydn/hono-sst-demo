import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { greetRoute } from "./greet";

const app = new OpenAPIHono();

app.use(etag(), logger());
app.use(prettyJSON());
app.use(cors());

app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

app.get("/ui", swaggerUI({ url: "/doc" }));
app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "My API",
	},
});

// Custom middleware, refer https://hono.dev/concepts/middleware
app.use(async (c, next) => {
	const start = Date.now();
	await next();
	const end = Date.now();
	c.res.headers.set("X-Response-Time", `${end - start}`);
});

app.get("/", (c) => {
	return c.text("Hello Hono!. Please visit /ui for more information.");
});

app.get("/hello", (c) => {
	return c.json({
		message: "Hello!",
	});
});

greetRoute(app);

export default app;
