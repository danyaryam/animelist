import Link from "next/link";
import InputSearch from "./InputSearch";
import UserActionButton from "./UserActionButton";
import MobileButton from "./MobileButton";

const Navbar = () => {
    return (
        <header className="bg-color-accent text-white">
            <div className="flex items-center justify-between p-4">

                <Link href="/" className="font-bold text-2xl">
                    ANIME LIST
                </Link>

                <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
                    <ul className="flex items-center gap-4 font-medium">
                        <li><Link href="/" className="hover:text-gray-300 transition">Home</Link></li>
                        <li><Link href="/anime" className="hover:text-gray-300 transition">Anime</Link></li>
                        <li><Link href="/manga" className="hover:text-gray-300 transition">Manga</Link></li>
                        <li className="relative group">
                            <button className="hover:text-gray-300 transition flex items-center gap-1">
                                Genre
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <ul className="absolute left-0 mt-2 w-40 py-2 bg-color-accent border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <li>
                                    <Link href="/genres/anime" className="block px-4 py-2 hover:bg-gray-800 transition">
                                        Anime
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/genres/manga" className="block px-4 py-2 hover:bg-gray-800 transition">
                                        Manga
                                    </Link>
                                </li>

                            </ul>
                        </li>
                        <li><Link href="/about" className="hover:text-gray-300 transition">About</Link></li>
                        <li><Link href="/contact" className="hover:text-gray-300 transition">Contact</Link></li>
                    </ul>
                    <InputSearch />
                </div>

                <div className="hidden md:flex">
                    <UserActionButton />
                </div>
                <div className="md:hidden">
                    <MobileButton />
                </div>
            </div>

        </header>
    );
};

export default Navbar;
