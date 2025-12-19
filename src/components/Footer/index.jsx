import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Footer = () => {
    return (
        <footer className="bg-color-accent mt-10">
            <div className="max-w-screen-xl mx-auto px-2 w-full py-10 md:py-16">
                <div className="grid md:grid-cols-3 gap-7">
                    <div>
                        <Link href="/" className="mb-10 block">
                            <span className="text-4xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                                ANIME LIST
                            </span>
                        </Link>

                        <p className="text-gray-400">
                            Online Stream Anime Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia ipsum reiciendis at dolorum, libero doloremque.
                        </p>
                    </div>
                    <div>
                        <div className="flex gap-20">
                            <div className="flex-1 md:flex-none">
                                <h4 className="text-white font-semibold mb-8 text-xl">Quick Links</h4>
                                <ul className="list-item space-y-5 text-gray-400">
                                    <li>
                                        <Link href="/" className="hover:text-white transition">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/anime" className="hover:text-white transition">Anime</Link>
                                    </li>
                                    <li>
                                        <Link href="/manga" className="hover:text-white transition">Manga</Link>
                                    </li>
                                    <li>
                                        <Link href="/genre/anime" className="hover:text-white transition">Genres Anime</Link>
                                    </li>
                                    <li>
                                        <Link href="/genre/manga" className="hover:text-white transition">Genres Manga</Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className="hover:text-white transition">About</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="hover:text-white transition">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 md:flex-none">
                                <h4 className="text-white font-semibold mb-8 text-xl">Legal</h4>
                                <ul className="list-item space-y-5 text-gray-400">
                                    <li>
                                        <Link href="#" className="hover:text-white transition">Legal</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition">Terms of Service</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-8 text-xl font-semibold text-white">Newsletter</h4>
                        <p className="text-gray-400">Subscribe to our newsletter to get the latest news and offers.</p>
                        <form action="" className="mt-5">
                            <div className="mb-5">
                                <input type="email" name="email" placeholder="Enter your email" className="w-full p-3 rounded-sm bg-white"></input>
                            </div>
                            <button type="submit" className="p-3 bg-color-dark font-bold text-color-accent w-full text-center rounded-sm hover:bg-gray-500 transition">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-500 py-8 text-center text-base text-gray-500">
                &copy; {new Date().getFullYear()} CUYANIMELIST ANIME STREAMING. Dany Arya. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer