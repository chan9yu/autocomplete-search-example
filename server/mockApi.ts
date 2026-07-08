import type { Plugin, ViteDevServer } from "vite";

import words from "./words.json" with { type: "json" };

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 20;

function parseLimit(raw: string | null) {
	const value = Number(raw);

	if (!Number.isFinite(value) || value <= 0) return DEFAULT_LIMIT;
	return Math.min(Math.floor(value), MAX_LIMIT);
}

function configureServer(server: ViteDevServer) {
	server.middlewares.use("/api/autocomplete", async (req, res) => {
		const url = new URL(req.url ?? "", "http://localhost");
		const query = (url.searchParams.get("q") ?? "").trim();
		const limit = parseLimit(url.searchParams.get("limit"));

		// 실제 네트워크처럼 보이도록 인위적 지연 (race condition 재현용)
		await new Promise((resolve) => {
			setTimeout(resolve, 200 + Math.random() * 400);
		});

		const q = query.toLowerCase();
		const results = q ? words.filter((item) => item.text.toLowerCase().startsWith(q)).slice(0, limit) : [];

		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ query, results }));
	});
}

export function mockApiPlugin(): Plugin {
	return {
		name: "mock-api",
		configureServer
	};
}
