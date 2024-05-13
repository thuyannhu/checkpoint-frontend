import "@/styles/globals.css";
import Header from "@/components/Header";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
} from "@apollo/client";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const client = new ApolloClient({
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
	);}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
