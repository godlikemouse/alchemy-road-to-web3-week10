import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";
import { LensProvider, staging, production } from "@lens-protocol/react-web";
import { ActiveProfileProvider, AuthProvider } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import AuthProxy from "@/components/AuthProxy";

export default function App({ Component, pageProps }) {
    const lensConfig = {
        environment: staging,
    };

    return (
        <LensProvider config={lensConfig}>
            <ApolloProvider client={client}>
                <AuthProvider>
                    <ActiveProfileProvider>
                        <AuthProxy />
                        <Navigation />
                        <Component {...pageProps} />
                    </ActiveProfileProvider>
                </AuthProvider>
            </ApolloProvider>
        </LensProvider>
    );
}
