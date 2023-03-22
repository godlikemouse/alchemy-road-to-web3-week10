import { useActiveProfileContext } from "@/context/AuthContext";
import { useActiveProfile } from "@lens-protocol/react-web";
import { useState } from "react";
import { useCreateProfile, isValidHandle } from "@lens-protocol/react-web";

export default function VerifyProfile(props) {
    const [activeProfile, setActiveProfile] = useActiveProfileContext();
    const [lensHandle, setLensHandle] = useState(null);
    const [validationError, setValidationError] = useState(null);
    const { data, error, loading } = useActiveProfile();
    const {
        execute: createProfile,
        error: createProfileError,
        isPending: createProfilePending,
    } = useCreateProfile();

    if (loading) return "Verifying...";
    if (error) return `Error: ${error}`;

    const onCreateProfile = async () => {
        try {
            console.info("Creating profile for:", lensHandle);
            const res = await createProfile(lensHandle);
            console.info(res);
        } catch (ex) {
            console.error("Error onCreateProfile:", ex);
        }
    };

    if (!data) {
        return (
            <div className="rounded w-fit p-10 border mt-20 mx-auto shadow-md">
                <h1>Account Not Found</h1>
                <div className="text-slate-600 mt-2">
                    <p>You don't appear to have a Lens profile.</p>
                    <p>Please create one by choosing a handle below</p>
                </div>
                <div className="mt-2">
                    <input
                        type="text"
                        defaultValue={lensHandle}
                        placeholder="Your Lens handle"
                        onChange={(e) => {
                            if (isValidHandle(e.target.value)) {
                                setValidationError("");
                                setLensHandle(e.target.value);
                            } else {
                                setValidationError("Handle name is invalid");
                                setLensHandle(null);
                            }
                        }}
                        className="border p-2 mt-2"
                        minLength={5}
                        maxLength={31}
                        required
                        disabled={createProfilePending}
                    />
                    <div className="text-sm text-red-600">
                        {validationError}
                    </div>
                    <button
                        onClick={onCreateProfile}
                        className="bg-blue-700 p-2 px-4 mt-2 rounded text-white"
                    >
                        Create Profile
                    </button>
                </div>
            </div>
        );
    }

    return <h1>Verify</h1>;
}
