import React, {useState} from "react";
import {ITypeOption} from "../types";

export function TheSelect() {
    const options: Array<ITypeOption> = [
        {
            id: 0,
            type: 'Object',
            name: 'Объект'
        },
        {
            id: 1,
            type: 'Array',
            name: 'Массив'
        },
        {
            id: 2,
            type: 'String',
            name: 'Строка'
        },
        {
            id: 3,
            type: 'Number',
            name: 'Число'
        }
    ]
    const [valueSelect, setValueSelect] = useState(options[0].name)
    const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValueSelect(event.target.value)
    }
    return (
        <>
            <form className=''>
                <select
                    className='cast-option'
                    multiple={false}
                    onChange={changeHandler}
                >
                    {options.map(option =>
                        <option
                            value={`${option.type}`}
                            key={`${option.id}`}
                        >
                            {option.name}
                        </option>
                    )}

                </select>
            </form>
        </>
    )
}