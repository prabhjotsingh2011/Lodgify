//  deflate(buf: InputType, callback: CompressCallback): void;
//     function deflate(buf: InputType, options: ZlibOptions, callback: CompressCallback): void;
//     namespace deflate {
//         function __promisify__(buffer: InputType, options?: ZlibOptions): Promise<Buffer>;
//     }
//     /**
//      * Compress a chunk of data with `Deflate`.
//      * @since v0.11.12
//      */
//     function deflateSync(buf: InputType, options?: ZlibOptions): Buffer;
//     /**
//      * @since v0.6.0
//      */
//     function deflateRaw(buf: InputType, callback: CompressCallback): void;
//     function deflateRaw(buf: InputType, options: ZlibOptions, callback: CompressCallback): void;
//     namespace deflateRaw {
//         function __promisify__(buffer: InputType, options?: ZlibOptions): Promise<Buffer>;
//     }
//     /**
//      * Compress a chunk of data with `DeflateRaw`.
//      *


'use client'

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any;
}
interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}


const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)

    }, [onChange]);


    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="diehxnpj"
            options={{
                maxFiles: 1,
            }}

        >
            {
                ({open})=>{
                    return (
                        <div onClick={()=> open?.()}
                            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                            >
                                <TbPhotoPlus size={50} />
                                <div className="font-semibold text-lg">
                                    Click to upload
                                </div>
                                {
                                    value && (
                                        <div className="absolute inset-0 w-full h-full">
                                            <Image
                                                alt="Upload"
                                                fill
                                                style={{ objectFit: "cover" }}
                                                src={value}
                                            />
                                        </div>
                                    )
                                }
                        </div>
                    )
                }
            }

        </CldUploadWidget>
    );
}

export default ImageUpload;