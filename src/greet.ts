import { zValidator } from "@hono/zod-validator";
import type { Hono } from "hono";
import { z } from "zod";

export const greetRoute = (app: Hono) => {
	return app.get(
		"/greet",
		zValidator(
			"query",
			z.object({
				name: z.string(),
			}),
		),
		(c) => {
			const { name } = c.req.valid("query");
			return c.json({
				message: `Hello! ${name}`,
			});
		},
	);
};

export type GreetRoute = ReturnType<typeof greetRoute>;
