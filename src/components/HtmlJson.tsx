import React, {useState} from "react";
import {TheSelect} from "./TheSelect";
import types from "../access/types.json"

type fileType = string | boolean | object[] | object | number
type jsonType = any
type pathType = (string | number)[]

type JSONValue = string | number | boolean | { [x: string]: JSONValue } | JSONValue[]

interface JsonProps {
    jsonData: jsonType
    saveJsonFun: () => void
    changeJsonFun: (jsonData: object | object[]) => void
    cancelChangeJsonFun: () => void
}

export function HtmlJson({jsonData, saveJsonFun, changeJsonFun, cancelChangeJsonFun}: JsonProps) {
    const classButton: string = 'mx-1 px-3 border border-blue-600 bg-white rounded active:bg-blue-200'
    const pathNull: [] = []
    const [selectedOptionType, setSelectedOptionType] = useState<string>(types.string)
    const handleOptionType = function (event: string) {
        setSelectedOptionType(event)
    }
    const whatType = function (json: fileType) {
        if (Array.isArray(json)) {
            return types.array
        } else if (json === null) {
            return types.null
        } else {
            return typeof json
        }
    }
    const typesSaveJson = function () {
        if (whatType(jsonData) === types.object) {
            changeJsonFun({...jsonData})
        }
        if (whatType(jsonData) === types.array) {
            changeJsonFun([...jsonData])
        }
    }
    const changeHandler = function (event: React.ChangeEvent<HTMLInputElement>, fullPath: pathType) {
        let jsonChang: jsonType = jsonData

        fullPath.forEach((path) => {
            if (whatType(jsonChang[path]) === types.object || whatType(jsonChang[path]) === types.array) {
                jsonChang = jsonChang[path]
            } else {
                jsonChang[path] = event.target.value
                typesSaveJson()
            }
        })
    }
    const saveChangValue = function(fullPath: pathType) {
        let jsonChang: jsonType = jsonData

        fullPath.forEach((path) => {
            if (whatType(jsonChang[path]) === types.object || whatType(jsonChang[path]) === types.array) {
                jsonChang = jsonChang[path]
            } else {
                switch (selectedOptionType) {
                    case types.number:
                        jsonChang[path] = +jsonChang[path]
                        break
                    case types.null:
                        jsonChang[path] = null
                        break
                    case types.boolean:
                        jsonChang[path] = jsonChang[path] === 'true'
                        break
                    default:
                        jsonChang[path] = jsonChang[path]
                        break
                }
                typesSaveJson()
            }
        })
    }
    const [currentClick, setCurrentClick] = useState<pathType>(pathNull)
    const isShowInput = function (fullPath: pathType) {
        return (
            currentClick.length === fullPath.length &&
            currentClick.every((value, index) => value === fullPath[index])
        )
    }

    const renderValueObj = function (valueObj: fileType, path: pathType) {
        switch (whatType(valueObj)) {
            case types.string:
            case types.number:
            case types.boolean:
            case types.undefined:
            case types.null:
                return (!isShowInput(path) &&
                    <div
                        key={path.join('-') + String(valueObj)}
                        className='block mx-3 my-1.5 '
                    >
                        {String(valueObj)}
                        {whatType(valueObj) !== types.object &&
                            <span className='text-black text-sm ml-4'>
                                &#8592;{whatType(valueObj)}
                            </span>}
                    </div>)
            case types.object:
            case types.array:
                return returnHTML(valueObj, path)
        }
    }
    const renderInputEl = function (valueObj: fileType, path: pathType) {
        return (whatType(valueObj) !== types.object && isShowInput(path) &&
            <div
                key="divInput"
                className='my-1 flex'
            >
                <input
                    key="input"
                    type="text"
                    className='cast-input'
                    value={String(valueObj)}
                    autoFocus
                    onChange={(event) => {
                        changeHandler(event, path)
                    }}
                />
                <button
                    className={classButton}
                    onClick={(event) => {
                        event.stopPropagation()
                        saveChangValue(path)
                        saveJsonFun()
                        setCurrentClick(pathNull)
                    }}
                >
                    &#10003;
                </button>
                <button
                    className={classButton}
                    onClick={(event) => {
                        event.stopPropagation()
                        cancelChangeJsonFun()
                        setCurrentClick(pathNull)
                    }}
                >
                    &#10008;
                </button>
                <TheSelect
                    typeValueInput={whatType(valueObj)}
                    value={String(valueObj)}
                    optionType={handleOptionType}
                />
            </div>)
    }
    const renderClickDivElValue = function (valueObj: fileType, path: pathType) {
        return (
            <div
                className={['my-2', whatType(valueObj) === types.object || whatType(valueObj) === types.array ? '' : 'cursor-pointer bg-green-50'].join(' ')}
                onClick={(event) => {
                    event.stopPropagation()
                    if (currentClick.length) return
                    if (whatType(valueObj) === types.object || whatType(valueObj) === types.array) return
                    setCurrentClick(path)
                    saveJsonFun()
                }}
            >
                {renderValueObj(valueObj, path)}
                {renderInputEl(valueObj, path)}
            </div>
        )
    }
    const returnHTML = function (jsonObj: fileType, path: pathType) {
        if (jsonObj instanceof Array) {
            return (
                <div className='brackets'>
                    &#91;
                    <div className='pl-6 w-full'>
                        {jsonObj.map((obj: object, index) =>
                            (
                                <div
                                    key={JSON.stringify(obj || String(obj)) + path.join('_') + index}
                                    className='h10 mb-4 pl-2 flex flex-row'
                                >
                                    {returnHTML(obj, path.concat([index]))}
                                    {(index < jsonObj.length - 1) && <div className={'comma mt-auto text-2xl'}>
                                        &#8218;
                                    </div>}
                                </div>
                            )
                        )}
                    </div>
                    &#93;
                </div>

            )
        } else if (whatType(jsonObj) === types.object) {
            return (
                <div className='curly-brace'>
                    &#123;
                    <div className='pl-6'>
                        {Object.entries(jsonObj).map(([keyObj, valueObj], index) => {
                                let keyEl: string = keyObj + JSON.stringify(valueObj)
                                const fullPath = path.concat([keyObj])
                                const lengthObj: number = Object.keys(jsonObj).length
                                return (
                                    <div
                                        className='flex flex-row'
                                        key={keyEl}
                                    >
                                        <div
                                            className={['my-2', whatType(valueObj) === types.object || whatType(valueObj) === types.array ? '' : 'py-1'].join(' ')}
                                        >
                                            {keyObj}
                                        </div>
                                        <p
                                            className={['mr-2 my-2', whatType(valueObj) === types.object || whatType(valueObj) === types.array ? '' : 'py-1'].join(' ')}
                                        >
                                            :
                                        </p>
                                        {renderClickDivElValue(valueObj, fullPath)}
                                        {(index < lengthObj - 1) && <p
                                            className={['comma mr-2 my-2 text-2xl mt-auto', whatType(valueObj) === types.object || whatType(valueObj) === types.array ? '' : 'py-1'].join(' ')}
                                        >
                                            &#8218;
                                        </p>}
                                    </div>
                                )
                            }
                        )}
                    </div>
                    &#125;
                </div>
            )
        } else {
            return renderClickDivElValue(jsonObj, path)
        }

    }
    return (
        <div className='HtmlJson'>
            <div
                onClick={() => {
                    console.log(jsonData)
                }
                }
            >
                Вывести в консоль JSON
            </div>
            {
                returnHTML(jsonData, pathNull)
            }
        </div>
    )
}