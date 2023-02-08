import {TheButton} from "./components/TheButton";
import {TheSelect} from "./components/TheSelect";
import {TheInput} from "./components/TheInput";
import {DownloadFile} from "./components/DownloadFile";
import React, {useState} from "react";

export function App() {
    const [jsonData, setJsonData] = useState([
        {
            "name": "Madame Uppercut",
            "age": 39,
            "secretIdentity": "Jane Wilson",
            "powers": [
                "Million tonne punch",
                "Damage resistance",
                "Superhuman reflexes"
            ],
            "data": {
                "squadName": "Super hero squad",
                "homeTown": "Metro City",
                "formed": 2016,
                "secretBase": "Super tower",
                "active": false,
                "data2": {
                    "squadName": "Super hero squad",
                    "homeTown": "Metro City",
                    "formed": 2016,
                    "secretBase": "Super tower",
                    "active": true
                }
            }
        },
        {
            "name": "Molecule Man",
            "age": 29,
            "secretIdentity": "Dan Jokes",
            "powers": [
                "Radiation resistance",
                "Turning tiny",
                "Radiation blast"
            ]
        }])
    type fileType = string | boolean | object[] | object | number

    const whatJson = function (json: fileType) {
        if (Array.isArray(json)) {
            return 'array'
        } else {
            return typeof json
        }
    }
    const upDataJSON = function () {
        setJsonData(jsonData)
    }
    const returnHTML = function (json: fileType) {
        if (whatJson(json) === 'object') {
            return (
                Object.entries(json).map(([keyObj, valueObj]) => {
                    let keyEl: string = keyObj + JSON.stringify(valueObj)
                    const [isShowInput, setIsShowInput] = useState(true)
                    const [valueInput, setValueInput] = useState(whatJson(valueObj) === 'array' ? valueObj.join(', ') : valueObj)
                    const classButton: string = 'w-full mx-1 px-2 border border-blue-600 bg-white rounded active:bg-blue-200'
                    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                        setValueInput(event.target.value)
                    }
                    const saveChangeJson = function (event: React.DetailedHTMLProps<any, any>) {
                        event.stopPropagation()
                        let newValue: fileType = valueInput
                        switch(whatJson(valueObj)) {
                            case 'number':
                                newValue = isNaN(+newValue) ? newValue : +newValue
                                break;
                            case 'boolean':
                                newValue = ('true' === newValue) || ('false' === newValue)  ? 'true' === newValue : newValue
                                break;
                            case 'array':
                                if (typeof newValue === "string") {
                                    newValue = newValue.split(",")
                                }
                                //TODO проработать вариант массив разных типов.
                                break;
                        }
                        // @ts-ignore
                        json[keyObj] = newValue
                        setIsShowInput(true)
                        upDataJSON()
                    }
                    return (
                        <div
                            className='flex flex-row'
                            key={keyEl}
                        >
                            <div
                                className={['my-2 border border-blue-100', whatJson(valueObj) === 'object' ? 'py-2' : ''].join(' ')}
                            >
                                {keyObj}
                            </div>
                            <p className={['my-2', whatJson(valueObj) === 'object' ? 'py-2' : ''].join(' ')}>:</p>
                            <div
                                className={whatJson(valueObj) === 'object' ? '' : 'cursor-pointer'}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    if (whatJson(valueObj) === 'object') return
                                    setIsShowInput(false)
                                }}
                            >
                                {isShowInput && <div className='block mx-1 border border-blue-100 my-2 '>
                                    {
                                        whatJson(valueObj) === 'array' ? valueObj.join(', ') : whatJson(valueObj) === 'object' ? returnHTML(valueObj) :
                                            whatJson(valueObj) === 'boolean' ? valueObj.toString() :
                                                valueObj
                                    }{whatJson(valueObj) !== 'object' && <span className='text-black'>: {whatJson(valueObj)}</span>}
                                </div>}
                                {
                                    whatJson(valueObj) !== 'object' && !isShowInput &&
                                    <div className='my-2 flex'>
                                        <input
                                            type="text"
                                            className='cast-input'
                                            value={valueInput}
                                            onChange={changeHandler}
                                        />
                                        <button
                                            className={classButton}
                                            onClick={saveChangeJson}
                                        >
                                            &#10003;
                                        </button>
                                        <button
                                            className={classButton}
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                setIsShowInput(true)
                                            }}
                                        >
                                            &#10008;
                                        </button>
                                    </div>}
                                </div>
                            </div>
                        )
                    }
                )

            )
        }
        if (json instanceof Array) {
            return (
                json.map((obj: object) =>
                    (
                        <div
                            key={JSON.stringify(obj)}
                            className='h10 mb-6'
                        >
                            {returnHTML(obj)}
                        </div>

                    )
                )
            )
        }
        return <div>error</div>

    }
    const downloadJson = function (fileText: string) {
        const json = JSON.parse(fileText)
        setJsonData(json)
    }
    return (
        <div className='flex flex-col justify-center bg-gray-100 my-6'>
            <div className='flex flex-row flex-nowrap my-4 justify-center items-center'>
                <TheButton
                    nameBtn='Создать JSON'
                />
                <TheButton
                    nameBtn='Загрузить JSON'
                />
            </div>
            <div className='h-0.5 my-1 w-full bg-blue-900'/>
            {/*<div className='flex flex-row items-center'>*/}
            {/*    <TheButton*/}
            {/*        nameBtn='+'*/}
            {/*    />*/}
            {/*    <TheSelect/>*/}
            {/*    <TheInput*/}
            {/*        initialValueInput={'123'}*/}
            {/*    />*/}
            {/*    <TheButton*/}
            {/*        nameBtn='-'*/}
            {/*    />*/}
            {/*</div>*/}
            <div>
                <DownloadFile dataUpdate={downloadJson}/>
            </div>
            <br/>
            {/*<div>*/}
            {/*    {JSON.stringify(jsonData)}*/}
            {/*</div>*/}
            <div
                className='m-2 p-2 font-medium text-blue-600 bg-white'
            >
                {
                    returnHTML(jsonData)
                }
            </div>

        </div>
    )
}
