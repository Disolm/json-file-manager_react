import React, {useState} from "react";
import {ITypeOption} from "../types";
import types from "../access/types.json"

interface SelectProps {
    typeValueInput: string
    value: string
    optionType: (event: string) => void
    area: string
}
export function TheSelect({typeValueInput, value, optionType, area}:SelectProps) {
    const options: Array<ITypeOption> = [
        {
            type: types.string,
            name: 'String'
        },
        {
            type: types.number,
            name: 'Number'
        },
        {
            type: types.null,
            name: 'Null'
        },
        {
            type: types.boolean,
            name: 'boolean'
        },
        {
            type: types.object,
            name: 'Object'
        },
        {
            type: types.array,
            name: 'Array'
        },
    ]
    const whatSelectDefault = function (type: string) {
        let name:string = ''
        options.forEach((option)=>{
            if (type === option.type) {
                name = option.name
            }
        })
        return name
    }

    const isDisabled = function (option: ITypeOption) {
        if (option.type === types.string) {
            return false
        }
        if (!Number.isNaN(+value) && option.type === types.number && value && area !== types.object) {
            return false
        }
        if (value === types.null && option.type === types.null && area !== types.object){
            return false
        }
        if ((value === 'true' || value === 'false') && option.type === types.boolean && area !== types.object) {
            return false
        }
        if (area === types.object || area === types.array) {
            return !(option.type === types.array || option.type === types.object || option.type === types.string)
        }
        return true
    }
    const [valueSelect, setValueSelect] = useState<string>(whatSelectDefault(typeValueInput))
    const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValueSelect(event.target.value)
        options.forEach((option)=>{
            if (event.target.value === option.name) {
                optionType(option.type)
            }
        })
    }
    return (
        <>
            <form className='w-full'>
                <select
                    name='typeValueObj'
                    id="typeValueObj-select"
                    className='cast-option mx-1 px-3 min-w-max'
                    multiple={false}
                    onChange={changeHandler}
                    value={valueSelect}
                >
                    {options.map((option, idx) =>
                        <option
                            value={option.name}
                            key={idx}
                            disabled={isDisabled(option)}
                        >
                            {option.name}
                        </option>
                    )}
                </select>
            </form>
        </>
    )
}