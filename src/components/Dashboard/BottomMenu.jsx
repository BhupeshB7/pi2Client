import React from 'react';
import { FaHome, FaWallet, FaGamepad, FaCog } from 'react-icons/fa';

const Menu = () => {
    const menuItem = [
        {
            name: 'Home',
            icon: FaHome,
            link: '/dashboard'
        },
        {
            name:'Wallet',
            icon: FaWallet,
            link: '/wallet'
        },
        {
            name:'Game',
            icon: FaGamepad,
            link: '/game/colorpridiction'
        },
        {
            name:'Settings',
            icon: FaCog,
            link: '/setting'
        }
    ];

    return (
        <div  className=' bg-zinc-900 bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:21px_30px]'>
            <div className='menu_content_container'>
                {menuItem.map((item, index) => (
                    <a key={index} href={item.link} className='menu_content'>
                        <div className='menu_icons'><item.icon className='menu_icon'/></div>
                        <p className='text-amber-100 text-lg '>{item.name}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Menu;
