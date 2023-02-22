import React, {useState} from "react";

type fileType = string | boolean | object[] | object | number
type jsonType = any
type pathType = (string | number)[]

type JSONValue = string | number | boolean | { [x: string]: JSONValue } | JSONValue[]

interface JsonProps {
    jsonData: jsonType
    jsonDataBuffer: jsonType
    saveJson: () => void
    changeJson: (jsonData: object | object[]) => void
    cancelChangeJson: () => void
}

export function HtmlJson({jsonData, jsonDataBuffer, saveJson, changeJson, cancelChangeJson}: JsonProps) {
    const classButton: string = 'w-full mx-1 px-2 border border-blue-600 bg-white rounded active:bg-blue-200'
    const pathNull: [] = []
    const whatType = function (json: fileType) {
        if (Array.isArray(json)) {
            return 'array'
        } else if (json === null) {
            return 'null'
        } else {
            return typeof json
        }
    }

    const changeHandler = function (event: React.ChangeEvent<HTMLInputElement>, fullPath: pathType) {
        let jsonChang: jsonType = jsonData

        fullPath.forEach((path) => {
            if (whatType(jsonChang[path]) === 'object' || whatType(jsonChang[path]) === 'array') {
                jsonChang = jsonChang[path]
            } else {
                jsonChang[path] = event.target.value
                if (whatType(jsonData) === 'object') {
                    changeJson({...jsonData})
                }
                if (whatType(jsonData) === 'array') {
                    changeJson([...jsonData])
                }
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

    const renderValueObj = function (valueObj: fileType, path: pathType): any {
        switch (whatType(valueObj)) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'undefined':
            case 'null':
                return (!isShowInput(path) &&
                    <div
                        key={path.join('-')+String(valueObj)}
                        className='block mx-3 my-1.5 '
                    >
                        {String(valueObj)}
                        {whatType(valueObj) !== 'object' &&
                            <span className='text-black text-sm ml-4'>
                                &#8592;{whatType(valueObj)}
                            </span>}
                    </div>)
            case 'object':
            case 'array':
                return returnHTML(valueObj, path)
        }
    }
    const renderInputEl = function (valueObj: fileType , path: pathType) {
        return (whatType(valueObj) !== 'object' && isShowInput(path) &&
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
                        setCurrentClick(pathNull)
                        saveJson()
                    }}
                >
                    &#10003;
                </button>
                <button
                    className={classButton}
                    onClick={(event) => {
                        event.stopPropagation()
                        setCurrentClick(pathNull)
                        cancelChangeJson()
                    }}
                >
                    &#10008;
                </button>
            </div>)
    }
    const renderClickDivElValue = function (valueObj: fileType, path: pathType) {
        return (
            <div
                className={['my-2', whatType(valueObj) === 'object' || whatType(valueObj) === 'array' ? '' : 'cursor-pointer bg-green-50'].join(' ')}
                onClick={(event) => {
                    event.stopPropagation()
                    if (whatType(valueObj) === 'object' || whatType(valueObj) === 'array') return
                    setCurrentClick(path)
                    if (!currentClick.length) {
                        saveJson()
                    }
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
                    <div className='pl-6'>
                        { jsonObj.map((obj: object, index) =>
                            (
                                <div
                                    key={JSON.stringify(obj || String(obj))+path.join('_') + index}
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
        } else if (whatType(jsonObj) === 'object') {
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
                                            className={['my-2', whatType(valueObj) === 'object' || whatType(valueObj) === 'array' ? '' : 'py-1'].join(' ')}
                                        >
                                            {keyObj}
                                        </div>
                                        <p
                                            className={['mr-2 my-2', whatType(valueObj) === 'object' || whatType(valueObj) === 'array' ? '' : 'py-1'].join(' ')}
                                        >
                                            :
                                        </p>
                                        {renderClickDivElValue(valueObj, fullPath)}
                                        {(index < lengthObj - 1) && <p
                                            className={['comma mr-2 my-2 text-2xl mt-auto', whatType(valueObj) === 'object' || whatType(valueObj) === 'array' ? '' : 'py-1'].join(' ')}
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
        <>
            <div
            onClick={()=>{
                console.log(jsonData)}
            }
            >
                Вывести в консоль JSON
            </div>
            {
                returnHTML(jsonData, pathNull)
            }
        </>
    )
}