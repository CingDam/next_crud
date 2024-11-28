"use client"
import { useRef, useState } from "react";
import detailStyle from "./detail.module.css";
import Link from "next/link";
import { baseUrl } from "../../app/config";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import UpdateDetailModal from "../modal/detail/update/UpdateDetail";

export default function Detail({id,datas,url}) {
    
    const router = useRouter();

    const [detailUpdate,setDetailUpdate] = useState(false);
    const [title, setTitle] = useState("");
    const [jobNum, setJobNum] = useState("");

    const jobDelValRef = useRef([]); 
    
    const onDetailUpdate = (title,jobNum) => {

        setDetailUpdate(true);
        setTitle(title);
        setJobNum(jobNum);

    }

    const jobDel = async (jobNum) => {
        console.log(id,jobNum)
       const res = await axios.delete(`${baseUrl}/${url}/del-job`,{
        data: {
            jobNum: Number(jobNum),
            todoNum: Number(id),
        },
       }, {
            headers: {
                "Content-Type" : "apllication/json"
            },
        })

        const data = res.data;
        if(data.message === "삭제 성공!") {
            router.refresh();
        } else {
            console.error(data.message);
            alert(data.message);
        }
    }

    const multipleJobDelte = async () => {
        const jobDelList = jobDelValRef.current
        //필터로 먼저 ref값과 ref에서 checked속성 받아오기
        .filter(ref => ref && ref.checked)
        // map으로 새 배열 생성
        .map(ref => ref?.value || '');
        

        const res = await axios.delete(`${baseUrl}/${url}/del-jobs`, {
            data: {
                todoNum: id,
                jobNum: jobDelList
            }
        },{
            headers:{
                "Content-Type": "application/json"
            }
        })

        const data = res.data

        if (data.chk) {
            jobDelValRef.current.forEach(ref => {
                if (ref) {
                    ref.checked = false;
                }
            });
            router.refresh();
        } else {
            console.error("삭제실패!")
        }
    } 

    return (
        <div className={detailStyle.container}>
            <table>
                <thead>
                    <tr>
                        <th>체크</th>
                        <th>번호</th>
                        <th>작업 명</th>
                        <th>기능</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datas ?  datas.map((data,index) => (
                            <tr key={index}>
                                <td><input type="checkbox" 
                                value={data.jobNum}
                                defaultChecked={ data.jobChk === 'Y' ? true : '' } 
                                readOnly = { data.jobChk === 'Y' ? true : '' }
                                ref={el => jobDelValRef.current[index] = el}
                                />
                                </td>
                                <td>{index+1}</td>
                                <td>{data.jobTitle}</td>
                                <td>
                                    <div className= {detailStyle.util} >
                                        <button onClick={() => {onDetailUpdate(
                                            data.jobTitle,
                                            data.jobNum
                                            )}}>수정</button> 
                                            <button onClick={()=> jobDel(data.jobNum)}>삭제</button>
                                    </div>
                                </td>
                            </tr>    
                        )) :
                        redirect("./")
                    }
                </tbody>
            </table>
            <div className={detailStyle.btnBox}>
                <button>완료 작업 체크하기</button> <button onClick={multipleJobDelte}>다중 삭제</button>
            </div>
            <div className={detailStyle.back}>
                <Link href={'./'}>돌아가기</Link>
            </div>
            {
                detailUpdate && 
                <UpdateDetailModal 
                    title={title} 
                    setDetailUpdate={setDetailUpdate}
                    id={id}
                    jobNum = {jobNum}
                    url = {url}
                    router = {router}
                />
            }
        </div>
    )
}