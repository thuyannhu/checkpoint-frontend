import "@/styles/globals.css";
import Header from "@/components/Header";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const backend_url = "http://localhost:4000/graphql";

const httpLink = createHttpLink({
	uri: backend_url,
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<ApolloProvider client={client}>
				<Header />
				<Component {...pageProps} />
			</ApolloProvider>
		</>
	);
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
