import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";
import { ActiveProfileProvider, AuthProvider } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import { LensProvider } from "@lens-protocol/react-web";
import { production } from "@lens-protocol/react-web";

export default function App({ Component, pageProps }) {
    const lensConfig = {
        environment: production,
    };

    return (
        <LensProvider config={lensConfig}>
            <ApolloProvider client={client}>
                <AuthProvider>
                    <ActiveProfileProvider>
                        <Navigation />
                        <Component {...pageProps} />
                    </ActiveProfileProvider>
                </AuthProvider>
            </ApolloProvider>
        </LensProvider>
    );
}
