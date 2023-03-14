import React, {useRef, useState} from "react";
import types from "../access/types.json"
import {TheSelect} from "./TheSelect";
interface HellipProps {
    path: (string | number)[]
    addObjectInJson: (valueInput: string, path: HellipProps['path'], optionSelect: string) => void
    removeObjectInJson: (fullPath: HellipProps['path']) => void
    type: string
}
export function TheHellipHorizontal({addObjectInJson, removeObjectInJson, path, type}: HellipProps) {
    const classButton: string = 'ml-2 px-4 rounded-2xl cursor-pointer text-base z-10'
    const [isShowButtons, setIsShowButtons] = useState<boolean>(false)
    const [isShowInput, setIsShowInput] = useState<boolean>(false)
    const [valueInput, setValueInput] = useState<string>('')
    const [optionSelect, setOptionSelect] = useState<string>(types.string)
    const [cursorRemove, setCursorRemove] = useState<boolean>(false)
    const allowDelete = useRef<boolean>(true)
    const changeHandlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(event.target.value)
    }
    const clickHellip = function () {
        setIsShowButtons(!isShowButtons)
    }
    const addInJson = function () {
        setIsShowInput(true)
    }
    const handleOptionType = function (option: string) {
        setOptionSelect(option)
    }
    const toggleClass = function (event: React.MouseEvent, fullPath: HellipProps['path']) {
        const timerRemove = 500
        if (event.button === 0) {
            setCursorRemove(true)
            setTimeout(()=>{
                if (!allowDelete.current) {
                    removeObjectInJson(fullPath)
                }
                setCursorRemove(false)
            }, timerRemove)
        }
    }
    return (
        <>
            {!!path.length && <div className='flex flex-row'>
                {!isShowButtons &&
                    <div
                        className={[classButton, 'bg-teal-50 my-1 hover:bg-teal-200 active:bg-teal-100'].join(' ')}
                        onClick={clickHellip}
                    >
                        &#8658;
                    </div>}
                {(isShowButtons && !isShowInput) &&<div className='flex flex-row flex-nowrap items-center'>
                    <div
                        className={['bg-teal-50 my-1 hover:bg-teal-200 active:bg-teal-100', classButton].join(' ')}
                        onClick={clickHellip}
                    >
                        &#8656;
                    </div>
                    <div
                        className={['bg-lime-100 my-1 hover:bg-lime-200 active:bg-lime-100', classButton].join(' ')}
                        onClick={addInJson}
                    >
                        Добавить
                    </div>
                    <div
                        className={['bg-red-100 my-1 hover:bg-red-200 active:bg-red-100 h-6 w-14', cursorRemove ? 'cursor-long-click' : '', classButton].join(' ')}
                        onMouseDown={(event)=>{
                            toggleClass(event, path)
                            allowDelete.current = false
                            }}
                        onMouseUp={()=>{
                            allowDelete.current = true
                            setCursorRemove(false)
                            }}
                        onMouseOut={()=>{
                            allowDelete.current = true
                            setCursorRemove(false)
                            }}
                    >
                        &#128465;
                    </div>
                </div>}
                {(isShowButtons && isShowInput) &&
                    <div className='flex flex-row'>
                        <input
                            key="input"
                            type="text"
                            className='cast-input'
                            value={valueInput}
                            autoFocus
                            onChange={(event) => {
                                changeHandlerInput(event)
                            }}
                        />
                        <button
                            className={[classButton, 'border border-blue-600 bg-white rounded active:bg-blue-200'].join(' ')}
                            onClick={() => {
                                addObjectInJson(valueInput, path, optionSelect)
                                setValueInput('')
                                setIsShowInput(false)
                            }}
                        >
                            &#10003;
                        </button>
                        <button
                            className={[classButton, 'border border-blue-600 bg-white rounded active:bg-blue-200'].join(' ')}
                            onClick={() => {
                                setValueInput('')
                                setIsShowInput(false)
                            }}
                        >
                            &#10008;
                        </button>
                        <TheSelect
                            typeValueInput={types.string}
                            value={valueInput}
                            optionType={handleOptionType}
                            area={type}
                        />
                    </div>
                }
            </div>}
        </>
    )
}