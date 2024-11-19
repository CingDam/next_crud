"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../app/config";
import { usePathname } from "next/navigation";

export const useSessionChk = () => {
    const path = usePathname();
    const [session,setSession] = useState({});
    const [isFetching, setIsFetching] = useState(true);
    

    useEffect(()=> {
        const sessionChk = async () => {
            await axios.get(`${baseUrl}/session-chk`,{
                withCredentials: true,
                headers: {
                    "Cache-Control": "no-cache",
                }}).then(response => {
                    if (response.status === 200) {
                        const data = response.data;
                        setSession(data);
                        setIsFetching(false);
                    }
                })
        }
    sessionChk();
    setIsFetching(false);
    },[path])
    
    return {session,isFetching};
    
}