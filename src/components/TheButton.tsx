interface ButtonProps {
    nameBtn: string
}
export function TheButton({nameBtn}:ButtonProps) {
    return (
        <>
            <button className='cast-btn'>
                {nameBtn}
            </button>
        </>
    )
}