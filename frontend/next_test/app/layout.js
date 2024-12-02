import { cookies } from "next/headers";
import Navigation from "../components/navigation/navigation";
import { baseUrl } from "./config";
import "./globals.css";

export const metadata = {
  title: {
    template : "%s | My Todo",
    default : "My Todo"
  },
  description : "Next를 이용한 To do List"
};

export async function getSession() {
  
  //cookie값을 받아서 nest한테 쏘기
  const cookieStroe = await cookies();
  const sessionId = cookieStroe.get("sessionId")?.value || ""
  const response =  await fetch(`${baseUrl}/session-chk`, {
    headers: {
      // session 미들웨어 설정할때 같은 name으로 
      Cookie: `sessionId=${sessionId}`,
    },
    credentials: "include",
    cache: "no-store",
  })

  if(!response.ok) {
    return null;
  }

  return response.json();
}

export default async function RootLayout({ children }) {
  const session = await getSession();
  const chk = !!session;
  return (
    <html lang="en">
      <body>
        <Navigation chk={chk}></Navigation>
        {children}
      </body>
    </html>
  );
} 
