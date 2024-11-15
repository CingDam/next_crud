"use client"

import Link from "next/link"
import loginStyle from "./login.module.css"
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseUrl } from "../../app/config";


const url = 'user'


export default function Login() {
    const idRef = useRef('');
    const pwRef = useRef('');
    const router = useRouter();

    async function loginOn(id,pwd) {
        
        try {

            if(id && pwd) {
                idRef.current.value = '';
                pwRef.current.value = '';
                const response = await axios.post(`${baseUrl}/${url}/login`,{
                    user_id: id,
                    user_pwd: pwd,
                },{
                    withCredentials: true,
                })
                console.log("조회성공!")

                const data = response.data
                console.log(data.user.userNum)
                return router.push(`/board/${data.user.userNum}/todo`)

            }

    
        } catch (error) {
            console.error("로그인 중 오류 발생:", error); // 에러 핸들링
          }
    }
    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            loginOn(idRef.current.value,pwRef.current.value)
        }
    }
    return (
        <div className={loginStyle.container}>
            <div className={loginStyle.box}>
                <div>
                    <p>아이디</p>
                    <input type="text" placeholder="아이디를 입력해주세요" ref={idRef} onKeyDown={handleKeyDown}/>
                </div>
                <div>
                    <p>비밀번호</p>
                    <input type="password" placeholder="비밀번호를 입력해주세요" ref={pwRef} onKeyDown={handleKeyDown}/>
                </div>
                <div>
                    <button className="login" onClick={() => {
                        loginOn(idRef.current.value,pwRef.current.value)
                        }}>로그인하기</button>
                </div>
            </div>
            <div className={loginStyle.box}>
                <Link href={'../signup'}>회원가입</Link>  <Link href={'../'} >돌아가기</Link>
            </div>
        </div>
    )
}