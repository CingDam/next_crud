export default function Input({addModalStyle,contentsRef}) {
    return (
        <>
            <div className={addModalStyle.job}>
                <div className={addModalStyle.baseJobInput}>
                    <div><label>할 일 내용</label></div>
                    <input type="text" placeholder="할 일 내용을 적어주세요" ref={(el) => (contentsRef.current[0] = el)}/>
                </div>
            </div>
        </>
    )
}