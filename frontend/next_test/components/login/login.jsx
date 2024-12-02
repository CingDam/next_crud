"use client"

import Link from "next/link"
import loginStyle from "./login.module.css"
import { useEffect, useRef, useState } from "react";
import { baseUrl } from "../../app/config";
import { redirect, useRouter } from "next/navigation";


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
                const response = await fetch(`${baseUrl}/${url}/login`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },body: JSON.stringify({
                        user_id: id,
                        user_pwd: pwd
                    })
                })

                if(response.status === 401) {
                    alert("아이디 혹은 비밀번호를 확인해주세요!");
                    idRef.current.focus();
                }

                const data = await response.json();
                console.log(data);
                if(data.user){
                        // sessionStorage 에서 setItem은 object타입은 JSON.stringify로 변환해서 넣기 => sessionStorage는 string만 들어갈수 잇음
                        sessionStorage.setItem("session",JSON.stringify(data.user));
                        // getItem은 다시 json으로 바꿔야하니까 object문자열을 다시 json으로 parse(변환)해서 받아야하게 때문에 JSON.parse로 받아오기
                        
                    router.push(`/board/${data.user.userNum}/todo`);
                }

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