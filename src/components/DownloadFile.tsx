export function DownloadFile() {
    const array = [1, 2, 3].map(num => {
        if (num % 2) return num * 2;
        return num;
    });
    console.log(array)
    return (
        <>
            {/*<input type="file" id="input" accept=".json"/>*/}
            <form>
                <label className="input-file">
                    <input
                        className="input-file__input"
                        type="file" name="file" accept=".json"
                    />
                        <span
                            className="input-file__span"
                        >
                            Выберите файл
                        </span>
                </label>
            </form>
        </>
    )
}