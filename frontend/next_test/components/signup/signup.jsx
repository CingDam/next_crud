"use client"

import Link from "next/link";
import signUpStyle from "./signup.module.css";

export default function SignUp() {
    return (
    <div className={signUpStyle.container}>
        <h4>회원가입</h4>
        <div>
            <p className={signUpStyle.subtitle}>ID</p>
            <div className={signUpStyle.box}>
                <input type="text" placeholder="아이디를 입력해주세요"/> <button>중복확인</button>
            </div>
            <p className={signUpStyle.subtitle}>비밀번호</p>
            <div className={signUpStyle.box}>
                <input type="password" placeholder="비밀번호를 입력해주세요"/> 
            </div>
            <p>비밀번호 확인</p>
            <div className={signUpStyle.box}>
                <input type="password" placeholder="비밀번호를 다시 입력해주세요"/> 
            </div>
            <p className={signUpStyle.subtitle}>이메일</p>
            <div className={signUpStyle.box}>
                <input type="text" placeholder="이메일 아이디를 입력해주세요"/> @ <input type="text" placeholder="이메일 주소를 선택해주세요" disabled/>
                <select>
                    <option value="naver">naver.com</option>
                    <option value="kakao">kakao.com</option>
                    <option value="daum">daum.net</option>
                    <option value="etc">직접 입력</option>
                </select>
            </div>
        </div>
        <div className={signUpStyle.box}>
            <Link href="../">돌아가기</Link>
        </div>
    </div>
    )
}