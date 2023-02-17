import React from "react";

import {DownloadFile} from "./components/DownloadFile";
import {UploadFile} from "./components/UploadFile";
import {HtmlJson} from "./components/HtmlJson";
import {useJsonData} from "../hooks/jsonData";

export function App() {
    const {jsonData, saveJson} = useJsonData()
    return (
        <div className='flex flex-col justify-center bg-gray-100 my-6'>
            <div className='flex flex-row flex-nowrap my-4 justify-center items-center'>
                <DownloadFile saveJson={saveJson}/>
                <UploadFile jsonData={jsonData}/>
            </div>
            <div className='h-0.5 my-1 w-full bg-blue-900'/>
            <div
                className='p-4 font-medium text-blue-600 bg-white'
            >
                <HtmlJson jsonData={jsonData} saveJson={saveJson}/>
            </div>
        </div>
    )
}
