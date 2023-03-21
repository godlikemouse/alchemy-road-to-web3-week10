import CommentList from "./CommentList";

// components/Post.js
export default function Post(props) {
    const post = props.post;

    if (!post.metadata) return null;

    console.info("post", post);

    return (
        <div className="p-8 w-full">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8">
                        <p className="mt-2 text-xs text-slate-800 whitespace-pre-line">
                            {post.metadata.mainContentFocus == "IMAGE" && (
                                <img
                                    src={post.metadata.image}
                                    className="h-40 mr-2 mb-2 float-left"
                                    onError={({ currentTarget }) =>
                                        (currentTarget.style.display = "none")
                                    }
                                />
                            )}
                            {post.metadata.content}
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-md mx-auto overflow-hidden md:max-w-2xl">
                <CommentList publication={post} />
            </div>
        </div>
    );
}
