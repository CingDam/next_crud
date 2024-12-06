import { Suspense } from "react";
import Dashboard from "../../../../components/dashboard/dashboard"
import { baseUrl } from "../../../config";
import { getSession } from "../../../layout";
import Loading from "../../../loading";
import { redirect } from "next/navigation";

const url = "todo"
export const metadata = {
    title: "Dashboard"
}

const getTodoList = async ({id}) => {
    const res = await fetch(`${baseUrl}/${url}/get-todo`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            id: Number(id),
        })
    })

    const data = await res.json();
    return data;
    
}

export default async function DashboardPage({params}) {
    const id = await params
    const datas = await getTodoList(id);
    const session = await getSession();
    return (
        <>
           {
            session ? 
            <Suspense fallback={<Loading></Loading>}>
            <Dashboard datas={datas.item} total={datas.total} id={id} session={session}/>
            </Suspense> :
            redirect("/")
           }
        </>
    )}