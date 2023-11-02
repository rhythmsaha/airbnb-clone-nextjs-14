"use client";

import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any;
}

interface Props {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<Props> = ({ onChange, value }) => {
    const handleUpload = useCallback(
        (result: any) => {
            onChange(result.info.secure_url);
        },
        [onChange]
    );

    return (
        <CldUploadWidget onUpload={handleUpload} uploadPreset="jqe7zldy" options={{ maxFiles: 1 }}>
            {({ open }) => (
                <div
                    onClick={() => open?.()}
                    className="relaive cursor-pointer hover:opacity-70 transitio  border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                >
                    <TbPhotoPlus size={50} />
                    <div className="text-lg font-semibold">Click to upload</div>

                    {value && (
                        <div className="absolute inset-0 w-full h-full">
                            <Image src={value} fill style={{ objectFit: "cover" }} alt="Upload" />
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    );
};

export default ImageUpload;
