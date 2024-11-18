import axios from "axios";
import Home from "../../components/homepage/home";
import { baseUrl } from "../config";

export const metadata = {
  title: "Home"
}

export default function HomePage() {

  return <Home></Home>
}
