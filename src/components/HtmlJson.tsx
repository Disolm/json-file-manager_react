import React, {useState} from "react";
import {useJsonData} from "../../hooks/jsonData";
type fileType = string | boolean | object[] | object | number

export function HtmlJson() {
    const {jsonData, saveJson} = useJsonData()
    const classButton: string = 'w-full mx-1 px-2 border border-blue-600 bg-white rounded active:bg-blue-200'

    const whatJson = function (json: fileType) {
        if (Array.isArray(json)) {
            return 'array'
        } else {
            return typeof json
        }
    }
    const returnHTML = function (jsonObj: fileType) {
        if (whatJson(jsonObj) === 'object') {
            console.log('returnHTML')
            return (
                Object.entries(jsonObj).map(([keyObj, valueObj]) => {
                        let keyEl: string = keyObj + JSON.stringify(valueObj)
                        const valueObjNotArr: string = whatJson(valueObj) === 'array' ? valueObj.join(', ') : valueObj
                        const [valueInput, setValueInput] = useState(valueObjNotArr)
                        const [isShowInput, setIsShowInput] = useState(true)

                        // if (valueInput !== valueObjNotArr) {
                        //     // console.log(111, valueInput, valueObjNotArr)
                        //     setValueInput(valueObjNotArr)
                        //     // console.log(valueInput)
                        //     setIsShowInput(true)
                        // }
                        // console.log(222, valueInput, valueObjNotArr)

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
                                    newValue = newValue.split(",")
                                    //TODO проработать вариант массив разных типов.
                                    break;
                            }
                            // @ts-ignore
                            json[keyObj] = newValue
                            setIsShowInput(true)
                            saveJson(jsonData)
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
                                        setValueInput(valueObjNotArr)
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
        if (jsonObj instanceof Array) {
            return (
                jsonObj.map((obj: object) =>
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
    return(
        <>
            {
                returnHTML(jsonData)
            }
        </>
    )
}