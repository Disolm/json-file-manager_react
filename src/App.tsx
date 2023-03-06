import React from "react";

import {DownloadFile} from "./components/DownloadFile";
import {UploadFile} from "./components/UploadFile";
import {HtmlJson} from "./components/HtmlJson";
import {useJsonData} from "./hooks/jsonData";

export function App() {
    const {jsonData, saveJson, changeJson, cancelChangeJson} = useJsonData()
    return (
        <div className='flex flex-col justify-center bg-gray-100 min-w-max'>
            <div className='flex flex-row flex-nowrap pt-10 pb-4 justify-center items-center bg-cyan-100 h-full'>
                <DownloadFile
                    saveJson = {saveJson}
                    changeJson = {changeJson}
                />
                <UploadFile jsonData = {jsonData}/>
            </div>
            <div className='h-0.5 my-1 w-full bg-blue-900'/>
            <div
                className='p-4 font-medium text-blue-600 bg-white'
            >
                <HtmlJson
                    jsonData = {jsonData}
                    saveJsonFun = {saveJson}
                    changeJsonFun = {changeJson}
                    cancelChangeJsonFun = {cancelChangeJson}
                />
            </div>
        </div>
    )
}
