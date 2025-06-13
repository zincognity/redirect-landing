import { useSession } from "@/hooks/use-session";
import { useEffect, useRef, useState } from "react";

interface Props {
    clientId: string;
}

export const Header: React.FC<Props> = ({ clientId }) => {
    const redirectUri =
        "https://redirect-backend.incognity.link/api/v1/oauth/discord/callback";
    const scope = "identify";
    const discordLoginUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&response_type=code&scope=${scope}`;

    const { decoded, isAuthenticated, removeToken } = useSession();
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const userMenuRef = useRef<HTMLDivElement | null>(null);
    const avatarRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node) &&
                avatarRef.current &&
                !avatarRef.current.contains(event.target as Node)
            ) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const userId = decoded?.user.discord_id;
    const username = decoded?.user.username;
    const avatar = decoded?.user.avatar;
    const avatarUrl =
        userId && avatar
            ? `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`
            : "user.svg";

    return (
        <header className="z-50 fixed top-0 left-0 w-full h-20 px-6 flex items-center justify-between bg-black bg-opacity-80 backdrop-blur-md">
            <div className="text-white text-xl font-bold">Link Friends</div>

            <div className="relative fill-white ">
                <img
                    ref={avatarRef}
                    src={avatarUrl}
                    alt="User avatar"
                    width={45}
                    height={45}
                    className={`rounded-full cursor-pointer border border-zinc-600 ${
                        !userId && "p-1"
                    }`}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                />
                {userMenuOpen && (
                    <div
                        ref={userMenuRef}
                        className="absolute right-0 mt-2 w-60 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6 space-y-4 z-50"
                    >
                        {isAuthenticated ? (
                            <>
                                <div>
                                    <p className="text-white font-semibold text-sm mb-1">
                                        {username}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        removeToken();
                                        setUserMenuOpen(false);
                                    }}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 w-full"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <a href={discordLoginUrl} className="block">
                                <button
                                    onClick={() => setUserMenuOpen(false)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 w-full"
                                >
                                    Sign In
                                </button>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};
