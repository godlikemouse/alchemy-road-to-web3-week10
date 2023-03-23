import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAuthContext } from "@/context/AuthContext";
import { useWalletLogin } from "@lens-protocol/react-web";
import { bindings } from "@/ether-bindings";

export default function LoginButton(props) {
    const [address, setAddress] = useState();
    const [token, setToken] = useAuthContext();
    const { execute: walletLogin, error, isPending } = useWalletLogin();

    useEffect(() => {
        // when the app loads, check to see if the user has already connected their wallet
        checkConnection();
    }, []);

    async function checkConnection() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length) {
            setAddress(accounts[0]);
        }
    }

    async function connect() {
        // this allows the user to connect their wallet
        const account = await window.ethereum.send("eth_requestAccounts");
        if (account.result.length) {
            setAddress(account.result[0]);
        }
    }

    async function login() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            signer.bindings = bindings();

            await walletLogin(signer);

            const credentials = JSON.parse(localStorage["lens.credentials"]);
            setToken(credentials.data.refreshToken);
        } catch (err) {
            console.log("Error signing in: ", err);
        }
    }

    return (
        <>
            {!address && (
                <button
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                    onClick={connect}
                >
                    Connect
                </button>
            )}
            {address && !token && (
                <button
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                    onClick={login}
                >
                    Login
                </button>
            )}
            {address && token && (
                <div
                    title={address}
                    className="bg-slate-400 text-white px-4 py-1 rounded"
                >
                    Connected
                </div>
            )}
        </>
    );
}
