"use client"

import { useRef, useState } from "react";
import dashboardStyle from "./dashboard.module.css"
import AddTodo from "../modal/dashboard/AddTodo";
import { baseUrl } from "../../app/config";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const url = "todo";


export default function Dashboard({datas,id}) {
    const [addModal, setAddModal] = useState(false);
    const [detailModal , setDetailModal] = useState(false);

    const delValRef = useRef();
    const router = useRouter();
    const path = usePathname();
    

    console.log(datas);
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
    
    const deleteTodo = async (todoNum) => {
        console.log("단일 게시글 삭제번호 :", todoNum );
        console.log("사용자 번호:", id);

        await fetch(`${baseUrl}/${url}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userNum: Number(id.id),
                todoNum: Number(todoNum)
            })
        }).then(res => res.json())
        .then(data => {
            if(data.message == "삭제 성공") {
                router.refresh();
            }
        })
        .catch(err => {
            console.error(err);
        })

    }
    
    const todoResult = () => {
        console.log("결과 업데이트");
    }

    const closeModal = (value) => {
        if (!value) {
            setAddModal(false)
        }
    }
    
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
                            value={data.todoNum}
                            defaultChecked={data.todoChk === 'Y' ? true : false}
                            readOnly = {data.todoChk === 'Y'  ? true : false}
                            ref={delValRef}
                            />
                        </td>
                        <td>{data.todoType}</td>
                        <td><Link href={`./${url}/${data.todoNum}`}>{data.todoTitle}</Link></td>
                        <td>{
                                <div>{dates[index].year}-{dates[index].month}-{dates[index].date} {dates[index].day}요일</div>
                            }</td>
                            <td>
                               <button onClick={() => {
                                deleteTodo(data.todoNum)
                               }}>삭제</button>
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
            addModal && <AddTodo closeModal={closeModal} id={id}></AddTodo>
        }
    </div>)
}