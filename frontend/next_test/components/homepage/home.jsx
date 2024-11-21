"use client"

import Link from "next/link"
import homeStyle from "./home.module.css"
import { Suspense } from "react";
import Loading from "../../app/loading";

export default function Home({user}) {
    
    return(
        <div className={homeStyle.container}>
            <h1>나만의 일정을 만들어보세요!</h1>
            {
                !user ? <div>
                    <Link href={'./login'}>로그인 하러 가기 &rarr;</Link>
                </div> :
                <div>
                    <Link href={`./board/${user.userNum}/todo`}>일정 만들러 가기 &rarr;</Link>
                </div>
            }
        </div>
    )
}