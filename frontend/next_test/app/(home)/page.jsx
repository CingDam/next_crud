import Home from "../../components/homepage/home";
import { getSession } from "../layout";


export const metadata = {
  title: "Home"
}

export default async function HomePage() {
  const session = await getSession();
  return <Home session={session}></Home>
}
