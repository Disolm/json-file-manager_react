import React from "react";

interface JsonProps {
    jsonData: object[] | object
}
type jsonType = object | object[]

export function UploadFile({jsonData}:JsonProps) {
    const clickHandler = function (json: jsonType) {
        const indentInJson: string = '    '
        const textData: string = JSON.stringify(json, null, indentInJson)
        const blob: Blob = new Blob([textData],{type: 'application/json'})
        const link: HTMLElement = document.createElement('a')
        link.setAttribute('href', URL.createObjectURL(blob))
        link.setAttribute('download', 'myJSON')
        link.click()
    }
    return (
        <>
            <button
                onClick={()=> clickHandler(jsonData)}
                className="button-upload-file m-2"
            >
                Сохранить файл
            </button>
        </>
    )
}