import { createElement, useRef, useState } from "react";
import modalStyle from "../../modal.module.css";
import addModalStyle from "./addModal.module.css";
import { baseUrl } from "../../../../app/config";
import { useRouter } from "next/navigation";
import AddInput from "./AddInput";
import Input from "./Input";

const url = 'jobs'

export default function AddJob({setDetailAdd,id}) {

    const [addJob,setAddJob] = useState([]);
    const titleRef = useRef('');
    const contentsRef = useRef([]);
    const router = useRouter();

    const closeModalBox = () => {
        setDetailAdd(false);
        setAddJob([]);
    }
    const createJobAdd = () => {
        console.log("add Input")
        setAddJob((prev) => [...prev,{ id: prev.length + 1 }]);
    }

    const addJobs = async () => {
        const contents = contentsRef.current.map(ref => ref?.value || '');

        
        await fetch(`${baseUrl}/${url}/add-job`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id:Number(id),
                contents: contents
            })
        }).then (res => res.json())
        .then(data => {
            console.log(data);
            setDetailAdd(false);
            router.refresh();
            
        }).catch(err => console.error(err));
    }
    return (
        <div className={modalStyle.background}>
            <div className={`${modalStyle.container} ${modalStyle.addJob}`}>
                <div className={addModalStyle.close} >
                    <img src={'/icon/close.png'} onClick={closeModalBox}/>
                </div>
                <div className={addModalStyle.jobBox}>
                    <Input addModalStyle={addModalStyle} contentsRef={contentsRef} />
                    {
                        addJob.length === 0 ? '' :
                        addJob.map((item,index)=> {
                            return (
                            <AddInput key={index+1}
                            index={index+1} 
                            addModalStyle={addModalStyle} 
                            contentsRef={contentsRef}
                            id={item.id}
                            addJob={addJob}
                            setAddJob={setAddJob}/>)})
                    }
                </div>
                <div className={addModalStyle.jobAddBtn}>
                    <button onClick={createJobAdd}>목록 추가</button>
                </div>  

                <div className={addModalStyle.buttonBox}>
                    <button onClick={addJobs}>추가하기</button>
                </div>
            </div>
        </div>
    )
}