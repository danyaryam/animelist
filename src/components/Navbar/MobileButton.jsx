"use client";

import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import InputSearch from "./InputSearch"; // pastikan path sesuai
import UserActionButton from "./UserActionButton"; // pastikan path sesuai

const MobileButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative md:hidden">
            {/* BUTTON BURGER */}
            <button
                className="text-3xl text-white"
                onClick={() => setIsOpen(prev => !prev)}
            >
                {isOpen ? <HiX /> : <HiMenu />}
            </button>

            {/* MOBILE MENU */}
            {isOpen && (
                <div className="absolute right-0 top-12 bg-gray-900 text-white 
                    w-64 rounded-lg shadow-lg px-4 py-5 flex flex-col gap-4 z-50">

                    {/* Search */}
                    <InputSearch />

                    {/* Menu List */}
                    <ul className="flex flex-col gap-3 text-lg font-medium">
                        <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                        <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
                        <li><Link href="/room" className="hover:text-gray-300">Populer</Link></li>
                        <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
                    </ul>

                    {/* User Action */}
                    <UserActionButton />
                </div>
            )}
        </div>
    );
};

export default MobileButton;
