import Profile from "@/components/Profile";
import { useProfilesToFollow } from "@lens-protocol/react-web";

export default function SuggestedProfileList(props) {
    const { data: profiles, loading, error } = useProfilesToFollow();

    if (loading) return "Loading..";
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            {profiles.map((profile, index) => (
                <Profile
                    key={profile.id}
                    profile={profile}
                    displayFullProfile={false}
                />
            ))}
        </div>
    );
}
