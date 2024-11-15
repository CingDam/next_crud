import axios from "axios";
import Home from "../../components/homepage/home";
import { baseUrl } from "../config";

export const metadata = {
  title: "Home"
}

const getSession = async () => {
  const response = await axios.get(`${baseUrl}/session-chk`,{
    withCredentials: true,
  })
  if(response.data?.user) {
    return true
  } else {
    return false
  }
}

export default function HomePage() {

  let sessionChk = getSession()
  return <Home></Home>
}
