import Link from "next/link.js";
import LoginButton from "./LoginButton";
import { useActiveProfileContext, useAuthContext } from "@/context/AuthContext";

// components/Navigation.js
export default function Navigation(props) {
    const [token] = useAuthContext();

    if (!token) return null;

    return (
        <nav className="flex p-1 bg-slate-200 shadow-sm">
            <div className="grow p-1">
                <Link href="/">Lens Social</Link>
            </div>
            <div className="grow-0">
                <LoginButton />
            </div>
        </nav>
    );
}
