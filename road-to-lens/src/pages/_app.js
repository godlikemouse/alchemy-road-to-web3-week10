import "@/styles/globals.css";
import { LensProvider, staging, production } from "@lens-protocol/react-web";
import { ActiveProfileProvider, AuthProvider } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import AuthProxy from "@/components/AuthProxy";
import { bindings } from "@/ether-bindings";

export default function App({ Component, pageProps }) {
    const lensConfig = {
        environment: staging,
        bindings: bindings(),
    };

    return (
        <LensProvider config={lensConfig}>
            <AuthProvider>
                <ActiveProfileProvider>
                    <AuthProxy />
                    <Navigation />
                    <Component {...pageProps} />
                </ActiveProfileProvider>
            </AuthProvider>
        </LensProvider>
    );
}
