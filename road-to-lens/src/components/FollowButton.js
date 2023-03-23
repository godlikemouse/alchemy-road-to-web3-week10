import { useFollow, useUnfollow } from "@lens-protocol/react-web";
import { useActiveProfileContext } from "@/context/AuthContext";
import { useState } from "react";

export function FollowButton(props) {
    const { profile } = props;
    const [follower] = useActiveProfileContext();
    const [followed, setFollowed] = useState();

    const {
        execute: followProfile,
        error: followError,
        isPending: followPending,
    } = useFollow({ followee: profile, follower });

    const {
        execute: unfollowProfile,
        error: unfollowError,
        isPending: unfollowPending,
    } = useUnfollow({ followee: profile, follower });

    async function follow() {
        try {
            await followProfile();
            setFollowed(true);
        } catch (ex) {
            console.error(ex);
        }
    }

    async function unfollow() {
        try {
            await unfollowProfile();
            setFollowed(false);
        } catch (ex) {
            console.error(ex);
        }
    }

    if (profile.isFollowedByMe || followed) {
        return (
            <button
                className="rounded bg-red-600 px-4 py-1 text-white mt-2"
                onClick={unfollow}
                disabled={unfollowPending}
            >
                {unfollowPending ? "Unfollow in progress..." : "Unfollow"}
            </button>
        );
    }

    if (followError) {
        return error.message;
    }

    return (
        <button
            className="rounded bg-green-700 px-4 py-1 text-white mt-2"
            onClick={follow}
            disabled={followPending}
        >
            {followPending ? "Follow in progress..." : "Follow"}
        </button>
    );
}
