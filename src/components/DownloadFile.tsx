import React, {useState} from "react";

interface FileProps {
    dataUpdate: any
}

export function DownloadFile(props: FileProps) {
    // const [valueInput, setValueInput] = useState({})

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.currentTarget.files) return;
        let file = event.currentTarget.files[0]
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function () {
            const fileText: string | ArrayBuffer | null = reader.result
            if (typeof fileText === "string") {
                // setValueInput(JSON.parse(fileText))
                props.dataUpdate(fileText)
            }
        }
        reader.onerror = function () {
            console.log(reader.error)
        }
    }
    return (
        <>
            {/*<input type="file" id="input" accept=".json"/>*/}
            <label className="input-file m-2">
                <input
                    className="input-file__input"
                    type="file" name="file" accept=".json"
                    onChange={changeHandler}
                />
                <span
                    className="input-file__span"
                >
                            Выберите файл
                        </span>
            </label>
        </>
    )
}