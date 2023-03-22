import LoginButton from "@/components/LoginButton";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login(props) {
    const [token] = useAuthContext();
    const { push: redirect } = useRouter();

    if (token && document.location.toString().indexOf("/verify-profile") < 0) {
        redirect("/verify-profile");
    }

    return (
        <div className="border w-fit p-10 rounded shadow-md mx-auto mt-5">
            <h1>Connect your MetaMask wallet</h1>
            <div className="mt-5 text-center">
                <LoginButton />
            </div>
        </div>
    );
}
