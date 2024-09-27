"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
type FileUpLoaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};
const FileUpLoader = ({ files, onChange }: FileUpLoaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="files Uploader"
          width={1000}
          height={1000}
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            alt="image-uploader "
            width={40}
            height={40}
          />
          <div className="file-upload_label">
            <p className="text-14-regular text-green-400">
              Click to Upload OR Drag and Drop
            </p>
            <p>SVG , PNG , GPG or Gif</p>
          </div>
        </>
      )}
      {/* {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )} */}
    </div>
  );
};
export default FileUpLoader;
