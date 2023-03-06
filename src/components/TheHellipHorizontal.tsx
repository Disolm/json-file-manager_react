import React, {useState} from "react";
interface HellipProps {
    path: (string | number)[]
    addObjectInJson: () => void
    removeObjectInJson: () => void
}
export function TheHellipHorizontal({addObjectInJson, removeObjectInJson, path}: HellipProps) {
    const classButton: string = 'ml-2 px-4 rounded-2xl cursor-pointer w-min text-base'
    const [isShowList, setIsShowList] = useState<boolean>(false)
    const clickHellip = function () {
        setIsShowList(!isShowList)
    }
    const addInJson = function () {

        addObjectInJson()
    }
    return (
        <>
            {!!path.length && <div className='flex flex-row'>
                {!isShowList &&
                    <div
                        className={[classButton].join(' ')}
                        onClick={clickHellip}
                    >
                        &#8658;
                    </div>}
                {isShowList && <div className='flex flex-row flex-nowrap items-center'>
                    <div
                        className={['bg-lime-100', classButton].join(' ')}
                        onClick={addInJson}
                    >
                        Добавить
                    </div>
                    <div
                        className={['bg-red-100', classButton].join(' ')}
                        onClick={removeObjectInJson}
                    >
                        Удалить
                    </div>
                    <div
                        className={['bg-teal-100', classButton].join(' ')}
                        onClick={clickHellip}
                    >
                        &#8656;
                    </div>
                </div>}
            </div>}
        </>
    )
}