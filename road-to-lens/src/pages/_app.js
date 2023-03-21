import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";
import { AuthProvider } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import { LensProvider } from "@lens-protocol/react-web";
import { LensConfig, staging } from "@lens-protocol/react-web";

export default function App({ Component, pageProps }) {
    const lensConfig = {
        environment: staging,
    };

    return (
        <LensProvider config={lensConfig}>
            <ApolloProvider client={client}>
                <AuthProvider>
                    <Navigation />
                    <Component {...pageProps} />
                </AuthProvider>
            </ApolloProvider>
        </LensProvider>
    );
}
