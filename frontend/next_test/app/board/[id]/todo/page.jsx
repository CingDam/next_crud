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
    console.log(id);
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
    console.log(data.item);
    return data.item;
    
}

export default async function DashboardPage({params}) {
    const id = await params
    const datas = await getTodoList(id);
    console.log(datas);
    return (
        <>
            { await getSession() !== null ?
            <Suspense fallback={<Loading></Loading>}>
                <Dashboard datas={datas} id={id}/>
            </Suspense>
            :
            redirect("/")}
        </>
    )}