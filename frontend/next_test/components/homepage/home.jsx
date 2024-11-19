"use client"

import Link from "next/link"
import homeStyle from "./home.module.css"
import Loading from "../../app/loading";
import { useSessionChk } from "../../hooks/useSessionChk";

export default function Home() {
    const {session, isFetching} = useSessionChk();
    console.log(session);
    const isLoggedIn = Object.keys(session).length !== 0;
    
    if(isFetching){
        return <Loading></Loading>
    }
    return(
        <div className={homeStyle.container}>
            <h1>나만의 일정을 만들어보세요!</h1>
            {!isLoggedIn && <div>
                <Link href={'./login'}>로그인 하러 가기 &rarr;</Link>
            </div>}
            {isLoggedIn && <div>
                <Link href={`./board/${session.user.userNum}/todo`}>일정 만들러 가기 &rarr;</Link>
            </div>}
        </div>
    )
}