"use client"

import Link from "next/link"
import homeStyle from "./home.module.css"

export default function Home({session}) {
    return(
        <div className={homeStyle.container}>
            <h1>나만의 일정을 만들어보세요!</h1>
            {
                !session ? <div>
                    <Link href={'./login'}>로그인 하러 가기 &rarr;</Link>
                </div> :
                <div>
                    <Link href={`./board/${session.user.userNum}/todo`}>일정 만들러 가기 &rarr;</Link>
                </div>
            }
        </div>
    )
}