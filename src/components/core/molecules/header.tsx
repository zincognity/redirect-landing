import { useEffect, useRef, useState } from "react";

export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
    const [isHidden, setIsHidden] = useState<boolean>(false);

    const routes = [{ src: "/home", title: "Home" }];

    const userMenuRef = useRef<HTMLDivElement | null>(null);
    const avatarRef = useRef<HTMLImageElement | null>(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node) &&
                avatarRef.current &&
                !avatarRef.current.contains(event.target as Node)
            )
                setUserMenuOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const banner = document.getElementById("banner");
            if (banner) {
                const bannerBottom = banner.getBoundingClientRect().bottom;
                setIsHidden(bannerBottom < 80);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`z-50 bg-black-primary bg-opacity-75 fixed top-0 left-0 w-full h-24 sm:h-20 flex justify-between items-center px-5 sm:px-10 transition-transform duration-300 `}
        >
            <div className="flex gap-5 w-full justify-end">
                <div className="relative">
                    <img
                        ref={avatarRef}
                        src={"/icons/user.svg"}
                        width={50}
                        height={50}
                        alt="profile"
                        className="rounded-full cursor-pointer"
                        onClick={toggleUserMenu}
                    />
                    {userMenuOpen && (
                        <div
                            ref={userMenuRef}
                            className="absolute right-0 mt-2 bg-red-dark text-black rounded-xl w-40"
                            style={{ fontFamily: "Nunito Sans, sans-serif" }}
                        >
                            {true ? (
                                <div className="mt-4 bg-white text-white-warm">
                                    <h1 className="mb-3 text-center font-semibold">
                                        {"FRIEND"}
                                    </h1>
                                    {"VISITOR" !== "VISITOR" && (
                                        <button
                                            onClick={() => {
                                                setUserMenuOpen(false);
                                            }}
                                            className="w-full text-center font-medium py-3 rounded-b-xl hover:bg-black-soft hover:text-white hover:rounded-b-none"
                                        >
                                            {"profile"}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            setUserMenuOpen(false);
                                        }}
                                        className="w-full text-center font-medium py-3 rounded-b-xl hover:bg-black-soft hover:text-white hover:rounded-b-xl"
                                    >
                                        {"sign_out"}
                                    </button>
                                </div>
                            ) : (
                                <div className="">
                                    <button
                                        onClick={() => {
                                            setUserMenuOpen(false);
                                        }}
                                        className="w-full text-center font-bold py-3 rounded-b-xl hover:bg-black-soft hover:text-white hover:rounded-xl"
                                    >
                                        {"log_in"}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div
                className={`lg:hidden absolute top-20 left-0 w-full h-screen flex justify-center items-center bg-black-primary bg-opacity-95 text-white ${
                    menuOpen ? "block animate-slide-down" : "hidden"
                }`}
            >
                <ul className="flex flex-col items-center gap-[8vh] py-4 text-2xl">
                    {routes.map((route) => (
                        <li key={route.src}>
                            <div
                                className={"text-white-warm"}
                                onClick={() => {
                                    setMenuOpen(false);
                                }}
                            >
                                {route.title.toUpperCase()}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
