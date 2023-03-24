import { useRouter } from "next/navigation";

export default function InstallMetamask(props) {
    const { push: redirect } = useRouter();

    const onContinue = () => {
        redirect("/");
    };

    return (
        <div className="border w-fit p-10 rounded shadow-md mx-auto mt-5">
            <h1>MetaMask wallet required</h1>
            <div className="mt-5 text-sm">
                Please install MetaMask wallet before preceeding.
            </div>
            <div className="mt-5">
                <button
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                    onClick={onContinue}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
