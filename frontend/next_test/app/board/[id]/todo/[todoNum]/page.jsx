import { redirect } from "next/navigation";
import { getSession } from "../../../../layout";
import { Suspense } from "react";
import Loading from "../../../../loading";
import Detail from "../../../../../components/detail/detail";
import axios from "axios";
import { baseUrl } from "../../../../config";

const url = 'jobs';

const getJobs = async (todoNum,session) => {
    if(session) {
        const res = await axios.post(`${baseUrl}/${url}/get-job`,
            {
                todoNum: todoNum,
                userNum: session.user.userNum,
            }
            ,{
            headers: {
                "Content-Type" : "application/json"
            },
        })
    
        const data = res.data
    
        return data.item;
    }
}


export default async function TodoDetail({params}) {
    const {todoNum} = await params
    const session = await getSession();

    const jobs = await getJobs(todoNum, session);
    return (
        <>
            {
                session ?
                <Suspense fallback={<Loading></Loading>}>
                    <Detail id={todoNum} datas={jobs} url={url}></Detail>
                </Suspense>  :
                redirect("/")
            }
        </>
    )
}