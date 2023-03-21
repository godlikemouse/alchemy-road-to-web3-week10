import { usePublications } from "@lens-protocol/react-web";
import Post from "@/components/Post";

export default function PublicationList(props) {
    const { profile } = props;

    const { data, loading } = usePublications({ profileId: profile.id });

    console.info("Publications:", data);

    if (loading) return "Loading...";

    return data.map((post, idx) => <Post key={idx} post={post} />);
}
