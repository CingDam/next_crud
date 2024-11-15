import axios from "axios"
import Dashboard from "../../../../components/dashboard/dashboard"
import { baseUrl } from "../../../config"

export const metadata = {
    title: "Dashboard"
}

const getBoardData = async (id) => {
    console.log(id)
    const response = await fetch(`${baseUrl}/gettodo`,{
        method:"GET",
        credentials:"include",
    })
    const data = response.json()
    console.log(data.user);
}

export default async function DashboardPage({params}) {
    const id = await params
    const boards = getBoardData(id)
    return <Dashboard></Dashboard>
}