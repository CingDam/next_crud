import { redirect } from "next/navigation";
import Login, { LoginData } from "../../components/login/login"
import { baseUrl } from "../config";
import { getSession } from "../layout";

export const metadata = {
    title : "login"
}

export default async function LoginPage(){
    const session = await getSession();
    return (
        <>
            {
                session ? 
                    redirect("/")
                    : <Login></Login>
            }
        </>
    )    
}
