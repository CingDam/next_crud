"use client"

import { redirect } from "next/navigation";
import { useSessionChk } from "../../hooks/useSessionChk";
import dashboardStyle from "./dashboard.module.css"
import Loading from "../../app/loading";

export default function Dashboard({id}) {
    const {session, isFetching} = useSessionChk(); 
    const userNum = session?.user?.userNum;
    if(isFetching){
        return <Loading></Loading>
    }

    return (<div className={dashboardStyle.container}>
        <table border={1}>
            <thead>
                <th>체크</th>
                <th>할일 명</th>
                <th>등록 일자</th>
                <th>기타</th>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>)
}