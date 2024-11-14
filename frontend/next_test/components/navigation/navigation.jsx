import Link from "next/link";
import naviStyle from "./navi.module.css"
export default function Navigation() {
    return(
        <div className={naviStyle.container}>
             <Link href={'../'}><h2>To do List</h2></Link>
             <div className={naviStyle.loginBox}>
                <Link href={'/login'}>로그인</Link> <Link href={'/signup'}>회원가입</Link>
             </div>
        </div>
    )}