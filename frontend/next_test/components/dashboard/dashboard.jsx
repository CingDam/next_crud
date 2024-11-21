"use client"

import { useState } from "react";
import dashboardStyle from "./dashboard.module.css"
import AddTodo from "../modal/dashboard/AddTodo";



export default function Dashboard({datas}) {
    const [addModal, setAddModal] = useState(false);
    const [detailModal , setDetailModal] = useState(false);

    const dayOfWeek = ['월', '화', '수', '목', '금', '일', '월']
    const dates = datas.map(data => {
        const date = new Date(data.todoDate);
        return {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            date: date.getDate(),
            day: dayOfWeek[date.getDay()-1],
        };
    })

    const addTodoModal = () => {
        console.log("추가");
        setAddModal(true);
    }
    
    const updateTodo = () => {
        console.log("수정");
    }
    
    const deleteTodo = () => {
        console.log("삭제");
    }
    
    const todoResult = () => {
        console.log("결과 업데이트");
    }

    const closeModal = (value) => {
        if (!value) {
            setAddModal(false)
        }
    }

    console.log(dates.map(date => console.log(date.day)));
    return (<div className={dashboardStyle.container}>
        <table border={1}>
            <thead>
                <tr>
                    <th>체크</th>
                    <th>업무 종류</th>
                    <th>할일 명</th>
                    <th>등록 일자</th>
                    <th>기타</th>
                </tr>
            </thead>
            <tbody>
                {datas.map((data,index) => (
                    index < 10 && (
                        <tr key={data.todoNum}>
                        <td><input type="checkbox" 
                            defaultChecked={data.todoChk === 'Y' ? true : false}
                            readOnly = {data.todoChk === 'Y'  ? true : false}/>
                        </td>
                        <td>{data.todoType}</td>
                        <td>{data.todoTitle}</td>
                        <td>{
                                dates.map((date,index)=> (
                                    <div key={index+1}>{date.year}-{date.month}-{date.date} {date.day}요일</div>
                                ))
                            }</td>
                            <td>
                               <button onClick={deleteTodo}>삭제</button>
                            </td>
                    </tr>
                    )
                ))}
            </tbody>
        </table>
        <div>

        </div>
        <div>
            <button onClick={addTodoModal}>추가하기</button> <button onClick={todoResult}>오늘일정 결과 올리기</button>
        </div>
        {
            addModal && <AddTodo closeModal={closeModal}></AddTodo>
        }
    </div>)
}