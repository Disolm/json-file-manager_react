import React, {useState} from "react";

export function TheHellipHorizontal() {
    const classButton: string = 'ml-2 px-4 rounded-2xl cursor-pointer w-min text-base'
    const [isShowList, setIsShowList] = useState<boolean>(false)
    const clickHellip = function () {
        console.log('clickHellip')
        setIsShowList(!isShowList)
    }
    return (
        <div className='flex flex-row'>
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
                >
                    Добавить
                </div>
                <div
                    className={['bg-red-100', classButton].join(' ')}
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
        </div>
    )
}