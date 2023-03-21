export default function Interests(props) {
    const { profile } = props;

    console.info("profile interests", profile.interests);

    if (!profile.interests?.length) return null;

    return (
        <div className="mt-2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="flex flex-wrap">
                <div className="text-slate-500 px-2 py-1 text-xs font-bold">
                    Interests:
                </div>
                {profile.interests.map((i) => (
                    <span key={i} className="text-slate-500 px-2 py-1 text-xs">
                        {i}
                    </span>
                ))}
            </div>
        </div>
    );
}
