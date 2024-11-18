"use client"

import Link from "next/link"
import homeStyle from "./home.module.css"
import axios from "axios";
import { baseUrl } from "../../app/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

    const [chk,setChk] = useState(false);
    const [data,setData] = useState({});
    const router = useRouter();

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
                setChk(true);
                setData(data);
                router.push(`/board/${data.user.userNum}/todo`)
                }).catch(error => console.error(error));
        }
       
        sessionChk();
    },[])
    
    return(
        <div className={homeStyle.container}>
            <h1>나만의 일정을 만들어보세요!</h1>
            <Link href={'./login'}>로그인 하러 가기 &rarr;</Link>
        </div>
    )
}