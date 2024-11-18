import Login, { LoginData } from "../../components/login/login"
import { baseUrl } from "../config";

export const metadata = {
    title : "login"
}

export default function LoginPage(){
    return (
        <Login></Login>
    )    
}
