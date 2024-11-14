import Link from "next/link"
import homeStyle from "./home.module.css"

export default function Home() {
    return(
        <div className={homeStyle.container}>
            <h1>나만의 일정을 만들어보세요!</h1>
            <Link href={'./login'}>로그인 하러 가기 &rarr;</Link>
        </div>
    )
}