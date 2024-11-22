import { createElement, useRef, useState } from "react";
import modalStyle from "../modal.module.css";
import addModalStyle from "./addModal.module.css";
import { baseUrl } from "../../../app/config";
import { useRouter } from "next/navigation";
import AddInput from "./AddInput";
import Input from "./Input";

const url = 'todo'

export default function AddTodo({closeModal,id}) {

    const [addJob,setAddJob] = useState([]);
    const titleRef = useRef('');
    const contentsRef = useRef([]);
    const router = useRouter();

    const closeModalBox = () => {
        closeModal(false);
        setAddJob([]);
    }
    const createJobAdd = () => {
        console.log("add Input")
        setAddJob((prev) => [...prev,{ id: prev.length + 1 }]);
    }

    const addTodoList = async () => {
        const selectTodoType = document.getElementById('todo_type').value; 
        const title = titleRef.current.value;
        const contents = contentsRef.current.map(ref => ref?.value || '');
        
        await fetch(`${baseUrl}/${url}/add-todo`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id:Number(id.id),
                title: title,
                type: selectTodoType,
                content: contents
            })
        }).then (res => res.json())
        .then(data => {
            console.log(data);
            closeModal(false);
            router.refresh();
            
        }).catch(err => console.error(err));
    }
    return (
        <div className={modalStyle.background}>
            <div className={`${modalStyle.container} ${modalStyle.add}`}>
                <div className={addModalStyle.close} >
                    <img src={'/icon/close.png'} onClick={closeModalBox}/>
                </div>
                <div className={addModalStyle.title}>
                    <div><label>할 일 제목</label></div>
                    <input type="text" placeholder="제목을 입력해 주세요" ref={titleRef}/>
                </div>
                <div className={addModalStyle.type}>
                    <div><label>업무 종류</label></div>
                    <select id="todo_type">
                        <option value="desgin">디자인</option>
                        <option value="publising">퍼블리싱</option>
                        <option value="frontend">프론트 엔드</option>
                        <option value="backend">백 엔드</option>
                        <option value="document">문서</option>
                        <option value="iot">IoT</option>
                    </select>
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
                    <button onClick={addTodoList}>추가하기</button>
                </div>
            </div>
        </div>
    )
}