import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthProxy(props) {
    const { push: redirect } = useRouter();
    const [token] = useAuthContext();

    useEffect(() => {
        console.info("authproxy token", token);
        if (!token && document.location.toString().indexOf("/login") < 0) {
            console.info("redirecting from authproxy to /login");
            redirect("/login");
        }
    }, [token]);
}
