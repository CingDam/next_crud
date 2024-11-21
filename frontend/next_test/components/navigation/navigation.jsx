"use client"
import Link from "next/link";
import naviStyle from "./navi.module.css"
import { baseUrl } from "../../app/config";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navigation({chk}) {
    const path = usePathname();
    const router = useRouter();
    useEffect(()=> {
        router.refresh();
    } ,[chk,path])
    return(
        <div className={naviStyle.container}>
             <Link href={'/'}><h2>To do List</h2></Link>
             {
                !chk ? <div className={naviStyle.loginBox}>
                    <Link href={'/login'}>로그인</Link> <Link href={'/signup'}>회원가입</Link>
                </div> 
            : 
            <div className={naviStyle.loginBox}>
                <Link href={`${baseUrl}/logout`}>로그아웃</Link>
             </div>
             }
            
        </div>
 )}