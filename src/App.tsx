import {DownloadFile} from "./components/DownloadFile";
import React from "react";
import {UploadFile} from "./components/UploadFile";
import {HtmlJson} from "./components/HtmlJson";

export function App() {
    return (
        <div className='flex flex-col justify-center bg-gray-100 my-6'>
            <div className='flex flex-row flex-nowrap my-4 justify-center items-center'>
                <DownloadFile/>
                <UploadFile/>
            </div>
            <div className='h-0.5 my-1 w-full bg-blue-900'/>
            <div
                className='p-4 font-medium text-blue-600 bg-white'
            >
                <HtmlJson/>
            </div>

        </div>
    )
}
