import { useState, useEffect } from 'react';

import "./css/idcard.css"
import img_woman from "./img/woman.png"
import img_man from "./img/man.png"
import Request from "../../Request"

function IDCard() {
    const [component, setComponent] = useState('IDCard')
    const [show, setShow] = useState(process.env.NODE_ENV === "development" ? true : false)
    const [dataCard, setDataCard] = useState(process.env.NODE_ENV === "development" ? {
        player_info: {
            firstname: 'DEV',
            lastname: 'Lorsan',
            sex: 'f',
            age: '25.01.1996',
            nation: 'US',
            regist: '',
            idcard: '00100',
            subscribe: 'Lorsan',
        },
    } : {})

    useEffect(() => {
        function EventListener(e) {
            let component = e.data.component;
            let event = e.data.event;
            let data = e.data.data;
            if (component === "IDCard") {
                switch (event) {
                    case "setData":
                        setDataCard(data)
                        setShow(true)
                        break;
                    default:
                }
            }
        }

        function Keypress(e) {
            if (e.key === "Escape" && component === "IDCard") {
                Request("POST", "https://war_idcard/CloseNUI");
                setShow(false)
                setDataCard({})
            }
        }

        window.addEventListener("message", EventListener);
        window.addEventListener("keyup", Keypress);
        return () => {
            window.removeEventListener("message", EventListener);
            window.removeEventListener("keyup", Keypress);
        };
    }, [])

    return ( show &&
        <div className="idcard-main">
            <div className="idcard_box">
                <div className="osn-idcard">
                    <div className="clm-2-idcard">
                        <div className="plash_right">
                            <div className="photo_player">
                                <img src={dataCard.player_info.sex === "m" ? img_man : img_woman} className="img-size-card" alt="" />
                            </div>
                            <div className="pl_inf">
                                <div className="pl-row">
                                    <div className="pl-clm-inf-n name-styl-id name-pff">
                                        <span className="pl-grow tsp-topname">First Name</span>
                                        <span className="pl-black">{dataCard.player_info.firstname}</span>
                                    </div>
                                    <div className="pl-clm-inf-n name-styl-id name-pff btm-last">
                                        <span className="pl-grow tsp-topname">Last Name</span>
                                        <span className="pl-black">{dataCard.player_info.lastname}</span>
                                    </div>
                                </div>
                                <div className="pl-row">
                                    <div className="pl-sex">
                                        <span className="pl-grow row-tsp">Gender</span>
                                        <span className="pl-black">{dataCard.player_info.sex === "m" ? "Male" : "Female"}</span>
                                    </div>
                                    <div className="pl-age">
                                        <span className="pl-grow row-tsp">Year old</span>
                                        <span className="pl-black">{dataCard.player_info.age}</span>
                                    </div>
                                </div>
                                <div className="pl-clm">
                                    <div className="pl-clm-inf">
                                        <span className="pl-grow pl-clm-f">Nationality</span>
                                        <span className="pl-black">{dataCard.player_info.nation}</span>
                                    </div>
                                    <div className="pl-clm-inf">
                                        <span className="pl-grow pl-clm-f">Registration Date</span>
                                        <span
                                            className="pl-black">{dataCard.player_info.regist === '' ? '--------------' : dataCard.player_info.regist}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pl-clm-docs">
                                <span className="pl-clm-inf-docs">Identifier Code</span>
                                <span className="pl-clm-inf-docs-num">{dataCard.player_info.idcard}</span>
                            </div>
                            <div className="pl-idcard-subscribe">
                                <span className="pl-idcard-subscribe-text">Signature: </span>
                                <span className="pl-idcard-subscribe-value">{dataCard.player_info.subscribe}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default IDCard;
