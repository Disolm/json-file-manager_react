interface SwapProps {
    classNameStr: string
    jsonObj: object[]
    index: number
    swapFun: (path: SwapProps['path'], leftOrRight: string) => void
    path: (string | number) []
}
export function TheSwapVertical({classNameStr, jsonObj, index, swapFun, path}: SwapProps) {
    const swap = function (leftOrRight: string) {
        if (leftOrRight === 'left') {
            swapFun(path, 'left')
        }
        if (leftOrRight === 'right') {
            swapFun(path, 'right')
        }

    }
    return(
        <div className={['flex flex-col', classNameStr].join(' ')}>
            {(index !== 0) &&
                <div
                    title='Сместить в массиве'
                    className='triangle-up'
                    onClick={()=>swap('left')}
                />}
            {(jsonObj.length - 1) !== index &&
                <div
                    title='Сместить в массиве'
                    className='triangle-down'
                    onClick={()=>swap('right')}
                />}
        </div>
    )
}