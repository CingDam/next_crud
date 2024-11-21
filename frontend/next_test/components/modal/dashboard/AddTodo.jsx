import { useRef, useState } from "react";
import modalStyle from "../modal.module.css";
import addModalStyle from "./addModal.module.css";
import { baseUrl } from "../../../app/config";

const url = 'todo'

export default function AddTodo({closeModal,id}) {

    const titleRef = useRef('');
    const contentRef = useRef('');

    const closeModalBox = () => {
        closeModal(false);
    }
    const addTodoList = async () => {
        const selectTodoType = document.getElementById('todo_type').value; 
        const title = titleRef.current.value;
        const content = contentRef.current.value;

        await fetch(`${baseUrl}/${url}/add-todo`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: {
                
            }
        })
    }
    return (
        <div className={modalStyle.background}>
            <div className={modalStyle.container}>
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
                <div className={addModalStyle.textBox}>
                    <div><label>할 일 내용</label></div>
                    <textarea placeholder="내용을 입력해주세요" ref={contentRef}></textarea>
                </div>

                <div className={addModalStyle.buttonBox}>
                    <button onClick={addTodoList}>추가하기</button>
                </div>
            </div>
        </div>
    )
}