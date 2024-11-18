import Dashboard from "../../../../components/dashboard/dashboard"
import { baseUrl } from "../../../config"
import { redirect } from "next/navigation"

export const metadata = {
    title: "Dashboard"
}

async function getSession() {

    const response = await fetch(`${baseUrl}/session-chk`,{
        credentials: 'include',
        cache: "no-store",
    })

    const data = await response.json();
    console.log("dashboard session");
    console.log(data);

    if(data) {
        return data;
    } else {
        return false;
    }
    
}


export default async function DashboardPage({params}) {
    const id = await params
    return <Dashboard/> 
}