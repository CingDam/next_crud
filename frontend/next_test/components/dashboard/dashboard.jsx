"use client"

import { useEffect, useRef, useState } from "react";
import dashboardStyle from "./dashboard.module.css"
import AddTodo from "../modal/dashboard/AddTodo";
import { baseUrl } from "../../app/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "../../app/loading";

const url = "todo";


export default function Dashboard({datas,id, session, total}) {
    const [addModal, setAddModal] = useState(false);
    const delValRef = useRef([]);
    const router = useRouter();

    const dayOfWeek = ['월', '화', '수', '목', '금', '일', '월']
    const jobType = {
       design: '디자인',
       publishing: '퍼블리싱',
       frontend: '프론트 엔드',
       backend: '백 엔드',
       document: '문서',
       iot: 'IoT'       
    }
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
        setAddModal(true);
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
    
    const todoMultipleDelete = () => {
        console.log("다중삭제");
        console.log("삭제글 번호 :" , delValRef.current.map(ref => ref?.value || ''))
    }

    const closeModal = (value) => {
        if (!value) {
            setAddModal(false)
        }
    }
    

    return (
    <div className={dashboardStyle.container}>
        <table>
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
                {datas.length === 0 ?
                <tr><td colSpan={5}>값이 없습니다!</td></tr>
                :
                datas.map((data,index) => (
                    index < 10 && (
                        <tr key={data.todoNum}>
                        <td><input type="checkbox" 
                            value={data.todoNum}
                            defaultChecked= {data.todoChk === 'Y' ? true : false}
                            readOnly = {data.todoChk === 'Y'  ? true : false}
                            ref={el => delValRef.current[index] = el}
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
                ))
            }   
            </tbody>
        </table>
        <div>
        <div className={dashboardStyle.paging}>
            <div>
                <Link href={'?page=1'}>{'<<'}</Link>
            </div>
            <div>
                <Link href={'?page=1'}>{'<'}</Link>
            </div>
            <div className={dashboardStyle.pageList}>
                <Link href={'?page=1'}>1</Link>
                <Link href={'?page=1'}>2</Link>
                <Link href={'?page=1'}>3</Link>
                <Link href={'?page=1'}>4</Link>
                <Link href={'?page=1'}>5</Link>
            </div>
            <div>
                <Link href={'?page=1'}>{'>'}</Link>
            </div>
            <div>
                <Link href={'?page=1'}>{'>>'}</Link>
            </div>
        </div>
        </div>
        <div className={dashboardStyle.btnBox}>
            <button onClick={addTodoModal}>추가하기</button> <button onClick={todoMultipleDelete}>다중 삭제</button>
        </div>
        {
            addModal && <AddTodo closeModal={closeModal} id={id}></AddTodo>
        }
    </div>)
}