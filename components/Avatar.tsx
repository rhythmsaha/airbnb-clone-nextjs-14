"use client";

import Image from "next/image";

interface Props {
    src?: string | null | undefined;
}

const Avatar: React.FC<Props> = ({ src }) => {
    return (
        <Image className="rounded-full" height={30} width={30} alt="avatar" src={src || "/images/placeholder.jpg"} />
    );
};

export default Avatar;
