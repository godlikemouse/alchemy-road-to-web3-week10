import { useComments } from "@lens-protocol/react-web";
import Comment from "@/components/Comment";

export default function CommentList(props) {
    const { publication } = props;

    const { data: comments, loading } = useComments({
        commentsOf: publication.id,
        limit: 2,
    });

    if (loading) return null;
    if (!comments) return null;

    return (
        <div className="p-1">
            {comments.map((comment, idx) => (
                <Comment comment={comment} key={idx} />
            ))}
        </div>
    );
}
