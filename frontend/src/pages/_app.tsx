import "@/styles/globals.css";
import Header from "@/components/Header";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

function App({ Component, pageProps }: AppProps) {
  return (
		<>
			<Header />
			<Component {...pageProps} />
		</>
	);}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
