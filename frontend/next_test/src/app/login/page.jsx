import Link from "next/link";

export default function Login(){
    return (
        <div>
            <h1>로그인 페이지입니다</h1>
            <Link href={'../signup'}>회원가입하기</Link> <Link href={'../'}>돌아가기</Link>
        </div>
)}