// components/Profile.js

import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext.js";
import { FollowButton } from "./FollowButton";

export default function Profile(props) {
    const profile = props.profile;

    // When displayFullProfile is true, we show more info.
    const displayFullProfile = props.displayFullProfile;

    const [token] = useAuthContext();

    return (
        <div className="p-8">
            <Link href={`/profile/${profile.id}`}>
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="md:flex">
                        <div className="md:shrink-0">
                            {profile.picture ? (
                                <img
                                    src={
                                        profile.picture.original
                                            ? profile.picture.original.url
                                            : profile.picture.uri
                                    }
                                    className="h-48 w-full object-cover md:h-full md:w-48"
                                />
                            ) : (
                                <div
                                    style={{
                                        backgrondColor: "gray",
                                    }}
                                    className="h-48 w-full object-cover md:h-full md:w-48"
                                />
                            )}
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                {profile.handle}
                                {displayFullProfile &&
                                    profile.name &&
                                    " (" + profile.name + ")"}
                            </div>
                            <div className="block mt-1 text-sm leading-tight font-medium text-black hover:underline">
                                {profile.bio}
                            </div>
                            <div className="mt-2 text-sm text-slate-900">
                                {profile.ownedBy}
                            </div>
                            <p className="mt-2 text-xs text-slate-500">
                                following: {profile.stats.totalFollowing}{" "}
                                followers: {profile.stats.totalFollowers}
                            </p>
                            {token ? (
                                <FollowButton profileId={profile.id} />
                            ) : null}
                        </div>
                    </div>
                </div>
                {profile.interests && profile.interests.length ? (
                    <div className="mt-2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                        <div className="flex flex-wrap">
                            <div className="text-slate-500 px-2 py-1 text-xs font-bold">
                                Interests:
                            </div>
                            {profile.interests.map((i) => (
                                <span
                                    key={i}
                                    className="text-slate-500 px-2 py-1 text-xs"
                                >
                                    {i}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : null}
            </Link>
        </div>
    );
}
