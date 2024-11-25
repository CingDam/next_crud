import ModalStyle from "../../modal.module.css";
import UpdateModalStyle from "./update.module.css";

export default function UpdateDetailModal({title, setDetailUpdate}) {

    console.log(title);

    const closeModalBox = () => {
        setDetailUpdate(false);
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
                        <input type="text" defaultValue={title}></input>
                    </div>
                    <div className={UpdateModalStyle.btnBox}>
                        <button>수정하기</button>
                    </div>
                </div> 
            </div>
        </div>
    )
} 