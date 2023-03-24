import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProxy(props) {
    const { push: redirect } = useRouter();
    const [token] = useAuthContext();

    useEffect(() => {
        if (!("ethereum" in window)) {
            //metamask is not installed
            redirect("/install-metamask");
            return;
        }

        if (!token && document.location.toString().indexOf("/login") < 0) {
            //not authenticated
            console.info("redirecting from authproxy to /login");
            redirect("/login");
        }
    });
}
