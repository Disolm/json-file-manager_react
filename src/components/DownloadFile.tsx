import React from "react";
import {createStore} from "../../hooks/createStore";

import {useJsonData} from "../../hooks/jsonData";
import {rootReducerFun} from "../../redux/rootReducer";

export function DownloadFile() {
    // const {saveJson} = useJsonData()
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.currentTarget.files) return;
        let file = event.currentTarget.files[0]
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function () {
            const jsonText: string | ArrayBuffer | null = reader.result
            if (typeof jsonText === "string") {
                const json = JSON.parse(jsonText)
                // console.log('createStore', createStore)
                const store = createStore(rootReducerFun, json)
                // saveJson(json)
                store.dispatch({
                    type: 'SAVE',
                    jsonNew: store.getState()
                })
            }
        }
        reader.onerror = function () {
            console.log(reader.error)
        }
        event.currentTarget.value = ''
    }
    return (
        <>
            <label className="input-file m-2">
                <input
                    className="input-file__input"
                    type="file" name="file" accept=".json"
                    onChange={changeHandler}
                />
                <span
                    className="input-file__span"
                >
                    Выберите файл
                </span>
            </label>
        </>
    )
}