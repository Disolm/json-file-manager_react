import React, {useRef, useState} from "react";
import {TheSelect} from "./TheSelect";
import types from "../access/types.json"
import {TheHellipHorizontal} from "./TheHellipHorizontal";
import {TheSwapVertical} from "./TheSwapVertical";
import CSSGroup from "../CSSForArray";

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

    const classHoverObjAndArr: string = 'hover:border-l-4 hover:border-blue-100 border-solid border-white border-l-4'

    const pathNull: [] = []

    const [selectedOptionType, setSelectedOptionType] = useState<string>(types.string)

    const thisIsKey = useRef<boolean>(true)

    const CSSGroupIndex = useRef<number>(0)

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

    const renameKeyAndValue = function (event: React.ChangeEvent<HTMLInputElement>, fullPath: pathType) {
        const pathLength: number = fullPath.length - 1
        let jsonChang: jsonType = jsonData
        fullPath.forEach((path, index) => {
            if (thisIsKey.current) {
                if (index < (pathLength - 1)) {
                    jsonChang = jsonChang[path]
                } else if (index === (pathLength - 1)){
                    const ArrKeyValueObj = Object.entries(jsonChang[fullPath[pathLength - 1]])
                    ArrKeyValueObj.map((Arrays) => {
                        if (Arrays[0] === fullPath[fullPath.length - 1]) {
                            Arrays[0] = event.target.value
                        }
                        return [Arrays[0],Arrays[1]]
                    })
                    jsonChang[fullPath[pathLength - 1]] = Object.fromEntries(ArrKeyValueObj)
                    fullPath[pathLength] = event.target.value
                    setCurrentClick(fullPath)
                    typesSaveJson()
                }
            } else {
                if (whatType(jsonChang[path]) === types.object || whatType(jsonChang[path]) === types.array) {
                        jsonChang = jsonChang[path]
                } else {
                        jsonChang[path] = event.target.value
                        typesSaveJson()
                }
            }
        })
    }

    const saveChangValue = function (fullPath: pathType) {
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
                changeJsonFun(jsonData)
            }
        })
    }

    const arraySwap = function (fullPath: pathType, leftOrRight: string) {
        let jsonChang: jsonType = jsonData
        fullPath.forEach((path, index) => {
            if (index < (fullPath.length - 1)) {
                jsonChang = jsonChang[path]
            } else if (whatType(path) === types.number) {
                if (leftOrRight === 'left') {
                    const temp = jsonChang[+path - 1]
                    jsonChang[+path - 1] = jsonChang[+path]
                    jsonChang[path] = temp
                    typesSaveJson()
                }
                if (leftOrRight === 'right') {
                    const temp = jsonChang[+path + 1]
                    jsonChang[+path + 1] = jsonChang[+path]
                    jsonChang[path] = temp
                    typesSaveJson()
                }
            }
        })
    }

    const addToJson = function (valueInput: string,  fullPath: pathType, optionSelect: string) {
        const whatToAdd = function (str: string) {
            if (optionSelect === types.string) {
                return str
            }
            if (optionSelect === types.number) {
                return +str
            }
            if (optionSelect === types.null) {
                return null
            }
            if (optionSelect === types.boolean) {
                return valueInput === 'true'
            }
            if (optionSelect === types.object) {
                return {}
            }
            if (optionSelect === types.array) {
                return []
            }
        }
        let jsonChang: jsonType = jsonData
        fullPath.forEach((path, index) => {
            if (index < (fullPath.length - 1)) {
                jsonChang = jsonChang[path]
            } else {
                if (whatType(jsonChang[path]) === types.object) {
                    jsonChang[path] = {...jsonChang[path], [valueInput]: whatToAdd('')}
                }
                if (whatType(jsonChang[path]) === types.array) {
                    jsonChang[path].push(whatToAdd(valueInput))
                }
                typesSaveJson()
            }
        })
    }

    const removeFromJson = function (fullPath: pathType) {
        let jsonChang: jsonType = jsonData
        fullPath.forEach((path, index) => {
            if (index < (fullPath.length - 1)) {
                jsonChang = jsonChang[path]
            } else {
                if (whatType(jsonChang) === types.object) {
                    delete jsonChang[path]
                }
                if (whatType(jsonChang) === types.array) {
                    jsonChang.splice(path, 1)
                }
                typesSaveJson()
            }
        })
    }

    const [currentClick, setCurrentClick] = useState<pathType>(pathNull)
    const isShowInput = function (fullPath: pathType) {
        return (
            (currentClick.length === fullPath.length) &&
            currentClick.every((value, index) => value === fullPath[index])
        )
    }

    const renderClickDivElKey = function (keyObj: string, valueObj: fileType, path: pathType) {
        return (
            <div
                className={['renderClickDivElKey', whatType(valueObj) === types.object ||
                whatType(valueObj) === types.array ?
                    'mt-1' : 'mt-2', 'pb-1 cursor-pointer bg-blue-50 hover:bg-blue-100 mb-auto rounded'].join(' ')}
                onClick={(event) => {
                    event.stopPropagation()
                    if (currentClick.length) return
                    thisIsKey.current = true
                    setCurrentClick(path)
                    saveJsonFun()
                }}
            >
                {
                    (thisIsKey.current ? !isShowInput(path) : true) &&
                    <div className='h-8 ml-3 mr-1 pt-1'>{keyObj}</div>
                }
                {
                    isShowInput(path) && thisIsKey.current &&
                    renderInputEl(keyObj, path)
                }
            </div>
        )
    }

    const renderValueObj = function (valueObj: fileType, path: pathType) {
        switch (whatType(valueObj)) {
            case types.string:
            case types.number:
            case types.boolean:
            case types.undefined:
            case types.null:
                return (
                    <div
                        key={path.join('-') + String(valueObj)}
                        className='renderValueObj block mx-3 my-1.5 '
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

    const renderInputEl = function (value: fileType, path: pathType) {
        return (whatType(value) !== types.object &&
            <div
                key="divInput"
                className='renderInputEl mt-1 flex р-8'
            >
                <input
                    key="input"
                    type="text"
                    className='cast-input'
                    value={String(value)}
                    autoFocus
                    onChange={(event) => {
                        renameKeyAndValue(event, path)
                    }}
                />
                <button
                    className={classButton}
                    onClick={(event) => {
                        event.stopPropagation()
                        saveChangValue(path)
                        saveJsonFun()
                        thisIsKey.current = true
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
                        thisIsKey.current = true
                        setCurrentClick(pathNull)
                    }}
                >
                    &#10008;
                </button>
                {!thisIsKey.current &&
                    <TheSelect
                        typeValueInput={whatType(value)}
                        value={String(value)}
                        optionType={handleOptionType}
                        area={types.string}
                    />}
            </div>)
    }

    const renderClickDivElValue = function (valueObj: fileType, path: pathType) {
        return (
            <div
            className={['renderClickDivElValue flex flex-row', (whatType(valueObj) === types.object || whatType(valueObj) === types.array) ? '' : classForTailwind('g')].join(' ')}
            >
                <div
                    className={['my-2', whatType(valueObj) === types.object || whatType(valueObj) === types.array ? '' : 'cursor-pointer bg-green-50 hover:bg-green-100 rounded'].join(' ')}
                    onClick={(event) => {
                        event.stopPropagation()
                        if (currentClick.length) return
                        if (whatType(valueObj) === types.object || whatType(valueObj) === types.array) return
                        thisIsKey.current = false
                        setCurrentClick(path)
                        saveJsonFun()
                    }}
                >
                    {(!isShowInput(path) || thisIsKey.current) &&
                        renderValueObj(valueObj, path)
                    }
                    {!thisIsKey.current && isShowInput(path) &&
                        renderInputEl(valueObj, path)
                    }
                </div>
                {!(whatType(valueObj) === types.object || whatType(valueObj) === types.array) &&
                    <div className={['mt-4 cursor-pointer ml-2 hover:bg-red-100 active:bg-red-400 rounded relative top-0 h-6 opacity-30 hover:opacity-100 active:opacity-80', classForTailwind('')].join(' ')}
                         onClick={() => {
                             removeFromJson(path)
                         }}
                    >
                        &#128465;
                    </div>}
            </div>
        )
    }

    const classForTailwind = function (group: string) {
        if (CSSGroupIndex.current === (CSSGroup.length - 1)) {
            CSSGroupIndex.current = 0
        }
        if (group === 'g') {
            return CSSGroup[CSSGroupIndex.current].group
        } else {
            CSSGroupIndex.current++
            return CSSGroup[CSSGroupIndex.current - 1].groupHover
        }
    }

    const returnHTML = function (jsonObj: fileType, path: pathType) {
        if (jsonObj instanceof Array) {
            return (
                <div className='returnHTML__brackets'>
                    <div className='text-xl'>
                        &#91;
                    </div>
                    <div className={['pl-6 w-full', classHoverObjAndArr].join(' ')}>
                        {jsonObj.map((obj: object, index) =>
                            (
                                <div
                                    key={path.join('_') + index}
                                    className={['array h10 flex flex-row', classForTailwind('g')].join(' ')}
                                >
                                    <TheSwapVertical
                                        jsonObj={jsonObj}
                                        index={index}
                                        swapFun={arraySwap}
                                        path={path.concat([index])}
                                        classNameStr={[(whatType(obj)===types.object ||
                                            whatType(obj)===types.array) ? '' : 'my-auto', classForTailwind('')].join(' ')}
                                    />
                                    {
                                        returnHTML(obj, path.concat([index]))
                                    }
                                    {(index < jsonObj.length - 1) && <div className={'comma mt-auto text-2xl'}>
                                        &#8218;
                                    </div>}
                                </div>
                            )
                        )}
                    </div>
                    <div className='flex flex-row text-xl'>
                        &#93;
                        <TheHellipHorizontal
                            addObjectInJson={(valueInput, path, optionSelect) => addToJson(valueInput, path, optionSelect)}
                            removeObjectInJson={() => removeFromJson(path)}
                            path={path}
                            type={types.array}
                        />
                    </div>

                </div>

            )
        } else if (whatType(jsonObj) === types.object) {
            return (
                <div className='returnHTML__curly-brace'>
                    <div className='text-xl'>
                        &#123;
                    </div>
                    <div className={['pl-6', classHoverObjAndArr].join(' ')}>
                        {Object.entries(jsonObj).map(([keyObj, valueObj], index) => {
                                let keyEl: string = keyObj + JSON.stringify(valueObj)
                                const fullPath = path.concat([keyObj])
                                const lengthObj: number = Object.keys(jsonObj).length
                                return (
                                    <div
                                        className='object flex flex-row'
                                        key={keyEl}
                                    >
                                        {
                                            renderClickDivElKey(keyObj, valueObj, fullPath)
                                        }
                                        <p
                                            className={['mr-2 my-2', whatType(valueObj) === types.object || whatType(valueObj) === types.array ? '' : 'py-1'].join(' ')}
                                        >
                                            :
                                        </p>
                                        {
                                            renderClickDivElValue(valueObj, fullPath)
                                        }
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
                    <div className='returnHTML__any flex flex-row text-xl'>
                        &#125;
                        <TheHellipHorizontal
                            addObjectInJson={(valueInput, path, optionSelect) => addToJson(valueInput, path, optionSelect)}
                            removeObjectInJson={() => removeFromJson(path)}
                            path={path}
                            type={types.object}
                        />
                    </div>
                </div>
            )
        } else {
            return renderClickDivElValue(jsonObj, path)
        }

    }

    return (
        <div className='HtmlJson'>
            <div
                onClick={() => {console.log(jsonData)}}
            >
                Вывести в консоль JSON
            </div>
            {
                returnHTML(jsonData, pathNull)
            }
        </div>
    )
}