import React from 'react';
import { Input, Menu } from 'antd';
import "./AppLayout.scss"
//import LogoImage1 from 'assets/logo48.png';
import LogoImage2 from 'assets/textlogo.png';

function AppLayout({ children, sidebar }) {
    return (
        <div className="app">
            <div className="header">
                <h1 className="page-title">
                    <img src={ LogoImage2 } alt="textlogo" width="130px"/>
                </h1>
                <div className="search">
                    <Input.Search />
                </div>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item>메뉴1</Menu.Item>
                        <Menu.Item>메뉴2</Menu.Item>
                        <Menu.Item>메뉴3</Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="contents">{ children }</div>
            <div className="sidebar">{sidebar}</div>
            <div className="footer">
                &copy; 2022. Yoo Yunho.
            </div>
        </div>
    );
}

export default AppLayout;