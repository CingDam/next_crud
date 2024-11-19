"use client"
import Link from "next/link";
import naviStyle from "./navi.module.css"
import { baseUrl } from "../../app/config";
import { useSessionChk } from "../../hooks/useSessionChk";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {

    const path = usePathname();
    const {session, isFetching} = useSessionChk();
    const [chk,setChk] = useState(false);
    console.log(session,isFetching);

    useEffect(() => {

    (session && Object.keys(session).length !== 0) 
        ? setChk(true) : setChk(false);
    },[path,session]);
    if(isFetching) {
        return (
            <div className={naviStyle.container}>
                <Link href={'/'}><h2>To do List</h2></Link>
            </div>
        );
    }
    return(
        <div className={naviStyle.container}>
             <Link href={'/'}><h2>To do List</h2></Link>
            {
                !chk && <div className={naviStyle.loginBox}>
                    <Link href={'/login'}>로그인</Link> <Link href={'/signup'}>회원가입</Link>
                </div>
            }
            {
                chk && <div className={naviStyle.loginBox}>
                    <Link href={`${baseUrl}/logout`}>로그아웃</Link>
                </div>
            }
        </div>
 )}