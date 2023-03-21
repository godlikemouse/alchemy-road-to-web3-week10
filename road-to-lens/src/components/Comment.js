export default function Comment(props) {
    const { comment } = props;

    const profileImage = comment.profile.picture?.original
        ? comment.profile.picture.original.url
        : comment.profile.picture?.uri;

    return (
        <div className="text-right text-xs mt-2">
            <span className="bg-slate-300 p-2 rounded mt-2 inline-block">
                <div className="grid grid-flow-col">
                    <div>{comment.metadata.content} </div>
                    <img
                        src={profileImage}
                        className="w-8 h-8 ml-4 float-right rounded-full bg-white"
                        onError={({ currentTarget }) =>
                            (currentTarget.src =
                                "https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png")
                        }
                    />
                </div>
            </span>
        </div>
    );
}
