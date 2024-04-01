
import { useState } from 'react';
import s from './Menu.module.scss';

export default function Menu() {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={s.menu_wrapper}>
            <div className={isActive ? s.burger + ' ' + s.active : s.burger} onClick={() => setIsActive(!isActive)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={!isActive ? s.buttons + ' ' + s.active : s.buttons}>
                <a href="###">
                    <img src="./image/web.svg" alt="" />
                </a>
                <a href="###">
                    <img src="./image/contact.svg" alt="" />
                </a>
                <a href="###">
                    <img src="./image/share.svg" alt="" />
                </a>
            </div>
        </div>
    )
} 
