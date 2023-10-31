"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState, useCallback } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";

type Props = {};

const UserMenu = (props: Props) => {
    const registerModal = useRegisterModal();
    const [open, setOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    return (
        <div className="relative ">
            <div className="flex items-center gap-3">
                <div
                    onClick={() => {}}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Airbnb your home
                </div>

                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />

                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>

            {open && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        <>
                            <MenuItem label="Login" onClick={() => null} />
                            <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
                        </>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
