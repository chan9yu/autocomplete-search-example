import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { mockApiPlugin } from "./server/mockApi";

export default defineConfig({
	plugins: [react(), mockApiPlugin()],
	server: {
		port: 3500
	}
});
