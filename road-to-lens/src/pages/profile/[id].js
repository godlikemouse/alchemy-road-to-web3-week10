import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Profile from "@/components/Profile";
import PublicationList from "@/components/PublicationList";
import { useProfile } from "@lens-protocol/react-web";
import Interests from "@/components/Interests";
import { FollowButton } from "@/components/FollowButton";

export default function ProfilePage() {
    const router = useRouter();
    const { id } = router.query;
    const { loading, data: profile } = useProfile({ profileId: id });

    if (loading) return "Loading..";

    return (
        <div className="flex flex-col p-8 items-center">
            <Profile profile={profile} displayFullProfile={true} />
            <div className="p-8 w-full">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <FollowButton profile={profile} />
                </div>
            </div>
            <PublicationList profile={profile} />
            <Interests profile={profile} />
        </div>
    );
}
