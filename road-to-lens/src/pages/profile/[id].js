import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Profile from "@/components/Profile";
import PublicationList from "@/components/PublicationList";
import { useProfile } from "@lens-protocol/react-web";
import Interests from "@/components/Interests";

export default function ProfilePage() {
    const router = useRouter();
    const { id } = router.query;

    console.log("fetching profile for", id);
    const { loading, data: profile } = useProfile({ profileId: id });

    if (loading) return "Loading..";

    return (
        <div className="flex flex-col p-8 items-center">
            <Profile profile={profile} displayFullProfile={true} />
            <PublicationList profile={profile} />
            <Interests profile={profile} />
        </div>
    );
}
