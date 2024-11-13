import Link from "next/link";

async function loginChk() {
  
}
export default function Home() {

  return (
    <div>
      <h1>To do List</h1>
      <Link href={'/login'}>로그인하기</Link> <Link href={'/signup'}>회원가입하기</Link>
    </div>
  )
}
