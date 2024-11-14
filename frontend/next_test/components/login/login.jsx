"use client"

import Link from "next/link"
import loginStyle from "./login.module.css"

export default function Login() {
    return (
        <div className={loginStyle.container}>
            <div className={loginStyle.box}>
                <div>
                    <p>아이디</p>
                    <input type="text" placeholder="아이디를 입력해주세요"/>
                </div>
                <div>
                    <p>비밀번호</p>
                    <input type="password" placeholder="비밀번호를 입력해주세요"/>
                </div>
                <div>
                    <button className="login">로그인하기</button>
                </div>
            </div>
            <div className={loginStyle.box}>
                <Link href={'../signup'}>회원가입</Link>  <Link href={'../'} >돌아가기</Link>
            </div>
        </div>
    )
}