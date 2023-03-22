import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { challenge, authenticate } from "@/queries/auth.js";
import client from "@/apollo-client.js";
import { useAuthContext } from "@/context/AuthContext";

export default function LoginButton(props) {
    const [address, setAddress] = useState();
    const [token, setToken] = useAuthContext();

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
            // first request the challenge from the API server
            const challengeInfo = await client.query({
                query: challenge,
                variables: { address },
            });

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // ask the user to sign a message with the challenge info returned from the server
            const signature = await signer.signMessage(
                challengeInfo.data.challenge.text
            );

            // authenticate the user
            const authData = await client.mutate({
                mutation: authenticate,
                variables: {
                    address,
                    signature,
                },
            });

            // if user authentication is successful, you will receive an accessToken and refreshToken
            const {
                data: {
                    authenticate: { accessToken },
                },
            } = authData;
            console.info("setting token:", accessToken);
            setToken(accessToken);
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
