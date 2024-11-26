import axios from "axios";
import ModalStyle from "../../modal.module.css";
import UpdateModalStyle from "./update.module.css";
import { baseUrl } from "../../../../app/config";

export default function UpdateDetailModal({title, jobNum, setDetailUpdate,router}) {

    console.log(title);

    const updateValRef = useRef();

    const closeModalBox = () => {
        setDetailUpdate(false);
    }

    const updateDetailJob = () => {
        console.log(jobNum,updateValRef.current.value)
        const res = axios.put(`${baseUrl}/${url}/update-job`, {
            data: {
                jobNum : jobNum,
                title: updateValRef.current.value
            }
        })

        const data = res.data

        if(data === true) {
            closeModalBox();
            router.refresh();
        }
    }

    return (
        <div className={ModalStyle.background}>
            <div className={`${ModalStyle.container} ${ModalStyle.detailUpdate}`}>
                <div className={UpdateModalStyle.close} >
                    <img src={'/icon/close.png'} onClick={closeModalBox}/>
                </div>
                <div className={UpdateModalStyle.container}>
                    <div>
                        <div><label>할 일을 입력해주세요</label></div>
                        <input type="text" 
                            defaultValue={title}
                            ref={updateValRef}
                        ></input>
                    </div>
                    <div className={UpdateModalStyle.btnBox}>
                        <button onClick={updateDetailJob}>수정하기</button>
                    </div>
                </div> 
            </div>
        </div>
    )
} 