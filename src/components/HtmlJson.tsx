import React, {useState} from "react";

type fileType = string | boolean | object[] | object | number
type jsonType = any
type pathType = (string | number)[]

type JSONValue = string | number | boolean | { [x: string]: JSONValue } | JSONValue[]

interface JsonProps {
    jsonData: jsonType
    saveJson: (jsonData: object | object[]) => void
}

export function HtmlJson({jsonData, saveJson}: JsonProps) {
    const classButton: string = 'w-full mx-1 px-2 border border-blue-600 bg-white rounded active:bg-blue-200'

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
                    saveJson({...jsonData})
                }
                if (whatType(jsonData) === 'array') {
                    saveJson([...jsonData])
                }
            }
        })
    }

    const [currentClick, setCurrentClick] = useState<pathType>([])
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
                        key={JSON.stringify(path)}
                        className='block mx-1 my-1 '
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
    const returnHTML = function (jsonObj: fileType, path: pathType) {
        if (jsonObj instanceof Array) {
            return (
                <div>
                    [{ jsonObj.map((obj: object, index) =>
                        (
                            <div
                                key={JSON.stringify(obj)+String(path)}
                                className='h10 mb-4 pl-2 flex flex-row'
                            >
                                {returnHTML(obj, path.concat([index]))}
                                <div>&sbquo;</div>
                            </div>

                        )
                    )}]
                </div>

            )
        } else if (whatType(jsonObj) === 'object') {
            return (
                <div>&#123;
                    {Object.entries(jsonObj).map(([keyObj, valueObj]) => {
                            let keyEl: string = keyObj + JSON.stringify(valueObj)
                            const fullPath = path.concat([keyObj])
                            return (
                                <div
                                    className='flex flex-row'
                                    key={keyEl}
                                >
                                    <div
                                        className={['my-2', whatType(valueObj) === 'object' ? 'py-2' : ''].join(' ')}
                                    >
                                        {keyObj}
                                    </div>
                                    <p
                                        className={['mr-2 my-2', whatType(valueObj) === 'object' ? 'py-2' : ''].join(' ')}
                                    >
                                        :
                                    </p>
                                    <div
                                        className={['py-2', whatType(valueObj) === 'object' || whatType(valueObj) === 'array' ? '' : 'cursor-pointer'].join(' ')}
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            if (whatType(valueObj) === 'object' || whatType(valueObj) === 'array') return
                                            setCurrentClick(fullPath)
                                        }}
                                    >
                                        {renderValueObj(valueObj, fullPath)}
                                        {whatType(valueObj) !== 'object' && isShowInput(fullPath) &&
                                            <div
                                                key="divInput"
                                                className='my-1 flex'
                                            >
                                                <input
                                                    key="input"
                                                    type="text"
                                                    className='cast-input'
                                                    value={valueObj}
                                                    autoFocus
                                                    onChange={(event) => {
                                                        changeHandler(event, fullPath)
                                                    }}
                                                />
                                                <button
                                                    className={classButton}
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        setCurrentClick([])
                                                    }}
                                                >
                                                    &#10003;
                                                </button>
                                                <button
                                                    className={classButton}
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        setCurrentClick([])
                                                    }}
                                                >
                                                    &#10008;
                                                </button>
                                            </div>}
                                    </div>
                                </div>
                            )
                        }
                    )}
                    &#125;
                </div>
            )
        } else {
            return renderValueObj(jsonObj, path)
        }

    }
    return (
        <>
            {
                returnHTML(jsonData, [])
            }
        </>
    )
}