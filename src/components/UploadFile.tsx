import React from "react";

interface JsonProps {
    json: object | object[]
}
export function UploadFile({json}: JsonProps) {
    const clickHandler = function (json: object | object[]) {
        const textData = JSON.stringify(json, null, '    ')
        const blob = new Blob([textData],{type: 'application/json'})
        const link = document.createElement('a')
        link.setAttribute('href', URL.createObjectURL(blob))
        link.setAttribute('download', 'myJSON')
        link.click()
    }
    return (
        <>
            <button
                onClick={()=> clickHandler(json)}
                className="button-upload-file m-2"
            >
                Сохранить файл
            </button>
        </>
    )
}