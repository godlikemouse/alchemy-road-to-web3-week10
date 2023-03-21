import { useActiveProfileContext } from "@/context/AuthContext";
import { useProfile, useFollow } from "@lens-protocol/react-web";

export function FollowButton(props) {
    const { profile } = props;

    const {
        execute: follow,
        error,
        isPending,
    } = useFollow({ followee: profile });

    if (profile.isFollowedByMe) {
        return <p>Following</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <button onClick={follow} disabled={isPending}>
            {isPending ? "Follow in progress..." : "Follow"}
        </button>
    );
}
