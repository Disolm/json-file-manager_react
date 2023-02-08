import React, {useState} from "react";
interface StringProps {
    initialValueInput: string
}
export function TheInput({initialValueInput}: StringProps) {
    const [valueInput, setValueInput] = useState(initialValueInput)
    // const submitHandler = (event:React.FormEvent) => {
    //     event.preventDefault()
    //     setValueInput('')
    // }
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(event.target.value)
    }
    return (
        <>
            <form
                // onSubmit={submitHandler}
                className='mx-1'
            >
                <input
                    type="text"
                    className='cast-input'
                    value={valueInput}
                    onChange={changeHandler}
                />
            </form>
        </>
    )
}