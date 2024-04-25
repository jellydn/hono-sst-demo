// Usage: bun run src/client.ts
import { hc } from "hono/client";
import type { GreetRoute } from "./greet";

const API_URL =
	"https://hono-sst-demo-huynhdung-honoscript.jellydn.workers.dev" ??
	process.env.API_URL;

const client = hc<GreetRoute>(API_URL);

async function main() {
	const res = await client.greet.$get({
		query: {
			name: "Hono",
		},
	});

	console.log(res.status);

	if (!res.ok) {
		console.error(res.statusText);
		return;
	}

	const data = await res.json();
	console.log(data);
}

main().catch(console.error);
