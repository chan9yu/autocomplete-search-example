import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Autocomplete } from "./components/Autocomplete";

const queryClient = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Autocomplete />
		</QueryClientProvider>
	);
}
