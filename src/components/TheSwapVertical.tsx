interface ClassNameProps {
    classNameStr: string
    jsonObj: object[]
    index: number
}
export function TheSwapVertical({classNameStr, jsonObj, index}: ClassNameProps) {
    console.log(classNameStr)
    const clickDown = function () {
        console.log('clickDown')
    }
    const clickUp = function () {
        console.log('clickUp')
    }
    return(
        <div className={['flex flex-col', classNameStr].join(' ')}>
            {(index !== 0) &&
                <div
                    title='Сместить в массиве'
                    className='triangle-up'
                    onClick={clickDown}
                />}
            {(jsonObj.length - 1) !== index &&
                <div
                    title='Сместить в массиве'
                    className='triangle-down'
                    onClick={clickUp}
                />}
        </div>
    )
}