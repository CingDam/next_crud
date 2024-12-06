"use client"
import { useRef, useState } from "react";
import detailStyle from "./detail.module.css";
import Link from "next/link";
import { baseUrl } from "../../app/config";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import UpdateDetailModal from "../modal/detail/update/UpdateDetail";
import AddJob from "../modal/detail/add/AddJob";
import ReactPaginate from "react-paginate";

export default function Detail({id,datas,url,total}) {
    
    

    const router = useRouter();

    const [detailUpdate,setDetailUpdate] = useState(false);
    const [detailAdd, setDetailAdd] = useState(false);
    const [title, setTitle] = useState("");
    const [jobNum, setJobNum] = useState("");
    const [perPage, setPerPage]  = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentGroup, setCurrentGroup] = useState(0);

    const jobDelValRef = useRef([]); 

    const perGroup = 5;
    const offset = currentPage * perPage;
    const pageCount = Math.ceil(total)/perPage;
    const groupStart = currentGroup * perGroup;
    const groupEnd = Math.min(groupStart + perGroup, pageCount);
    const currentItems = datas.slice(offset, offset + perPage);

    const changePage = (e) => {
        setCurrentPage(e.selected);
        // 선택된 페이지가 현재 그룹 범위 밖이면 그룹 업데이트
        if (e.selected < groupStart || e.selected >= groupEnd) {
          setCurrentGroup(Math.floor(e.selected / perGroup));
        }
    }


    const addJob = ()  => {
        setDetailAdd(true);
    }
    
    const dummy = async () => {
        const res = await axios.post(`${baseUrl}/${url}/dummy`,
            {
                id: id
            }
            ,{
            header: {
                "Content-Type" : "application/json"
            }
        })

        const data = res.data

        console.log(res);
        
        if(data) {
            router.refresh();
        } else {
            console.error("더미 추가 실패")
        }
    }

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
                        datas ?  currentItems.map((data,index) => (
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
            <div>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={pageCount}
                    forcePage={currentPage}
                    breakLabel={null}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={groupEnd - groupStart}
                    renderOnZeroPageCount={null}
                    onPageChange={changePage}
                    containerClassName={"pagenation"}
                    activeClassName={"active"}
                    previousClassName={"prev"}
                    nextClassName={"next"}
                >
                </ReactPaginate>
            </div>
            <div className={detailStyle.btnBox}>
                <button>완료 작업 체크하기</button> 
                <button onClick={multipleJobDelte}>다중 삭제</button>
                <button onClick={addJob}>추가하기</button>
                <button onClick={dummy}>더미추가</button>
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

            {
                detailAdd && <AddJob id={id} setDetailAdd={setDetailAdd} />
            }
        </div>
    )
}