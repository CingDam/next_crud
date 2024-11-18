"use client"
import Link from "next/link";
import naviStyle from "./navi.module.css"
import { baseUrl } from "../../app/config";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Navigation() {

    const [session,setSession] = useState(false);

    useEffect(()=> {
        const sessionChk = () => {
            axios.get(`${baseUrl}/session-chk`,{
                withCredentials: true,
                headers: {
                    "Cache-Control": "no-cache",
                }
                }).then(response =>{
                console.log('home Session Chk');
                const data = response.data;
                console.log(data.message);
                setSession(true);
                }).catch(error => console.error(error));
        }
    sessionChk();
    },[])

    return(
        <div className={naviStyle.container}>
             <Link href={'/'}><h2>To do List</h2></Link>
            {
                !session && <div className={naviStyle.loginBox}>
                    <Link href={'/login'}>로그인</Link> <Link href={'/signup'}>회원가입</Link>
                </div>
            }
            {
                session && <div className={naviStyle.loginBox}>
                    <Link href={`${baseUrl}/logout`}>로그아웃</Link>
                </div>
            }
        </div>
 )}