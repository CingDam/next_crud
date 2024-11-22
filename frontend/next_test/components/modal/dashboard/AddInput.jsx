export default function AddInput({addModalStyle,contentsRef,addJob,setAddJob,id, index}) {
    const deleteJob = (id) => {
        setAddJob((prev) => prev.filter((component) => component.id !== id));
    }

    return (
        <>
            <div className={addModalStyle.job}>
                <div className={addModalStyle.jobInput}>
                    <div><label>할 일 내용</label></div>
                    <input type="text" placeholder="할 일 내용을 적어주세요" ref={(el) => (contentsRef.current[index] = el)}/>
                </div>
                <div className={addModalStyle.deleteJobInput}><button onClick={()=>{deleteJob(id)}}>삭제</button></div>
            </div>
        </>
    )
}