import Link from "next/link";
import InputSearch from "./InputSearch";
import UserActionButton from "./UserActionButton";
import MobileButton from "./MobileButton";

const Navbar = () => {
    return (
        <header className="bg-color-accent text-white">
            <div className="flex items-center justify-between p-4">

                <Link href="/" className="font-bold text-2xl">
                    CUYANIMELIST
                </Link>

                <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
                    <ul className="flex items-center gap-4 font-medium">
                        <li><Link href="/" className="hover:text-gray-300 transition">Home</Link></li>
                        <li><Link href="/anime" className="hover:text-gray-300 transition">Anime</Link></li>
                        <li><Link href="/manga" className="hover:text-gray-300 transition">Manga</Link></li>
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
