import Dashboard from "../../../../components/dashboard/dashboard"

export const metadata = {
    title: "Dashboard"
}

export default async function DashboardPage({params}) {
    const id = await params
    return <Dashboard id={id}/> 
}