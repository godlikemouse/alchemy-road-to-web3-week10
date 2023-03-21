import { useProfile, useFollow } from "@lens-protocol/react-web";

export function FollowButton(props) {
    const { profileId } = props;

    const { data: profile, loading } = useProfile({ profileId });
    console.info("profile data:", profile);

    //TODO: load follower

    const {
        execute: follow,
        error,
        isPending,
    } = useFollow({ followee: profile ?? {} });

    if (loading) return null;

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
