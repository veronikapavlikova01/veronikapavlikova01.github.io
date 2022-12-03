import { NavLink } from 'react-router-dom'
import Dropdown from './Dropdown';
import { useContext, useState } from "react";
import { Context } from "../Context";
import DataAPI from '../DataAPI'


function Header(props) {
    const language = useContext(Context);
    const navbar = new DataAPI().getNavbar(language.language);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    window.onscroll = function () { shrinkNavbar(); };

    function shrinkNavbar() {
        var docHeight = document.documentElement.scrollTop;
        var header = document.getElementById("header");
        var navlist = document.getElementById("navlist");
        if (docHeight > 100 && header.style.height!=="70px") {
            header.style.height = "70px";
            navlist.classList.remove("navigation-list-active");
            if(sidebar){
                navlist.classList.add("navigation-list-active-70");
            }
        } else if(docHeight<70 && header.style.height!=="100px"){
            header.style.height = "100px";
            navlist.classList.remove("navigation-list-active-70");
            if(sidebar){
                navlist.classList.add("navigation-list-active");
            }
        }
    }

    function navlistClasses() {
        if (sidebar) {
            var height = document.getElementById("header").style.height;
            if (height && height === "70px") {
                return "navigation-list-active-70";
            } else {
                return "navigation-list-active";
            }
        }
    }

    return (
        <>
            <header id="header" className="navigation stick z-index-nav flex-secondary align-items-primary">
                <h1 id="headerLabel" className="font-weight-primary color-primary margin-right-primary">{props.header}</h1>
                <div className="flex-secondary align-items-secondary z-index-nav">
                    <Dropdown></Dropdown>
                    <div className="hamburger" onClick={showSidebar}>
                        <span className={sidebar ? 'bar hamburger1' : 'bar'}></span>
                        <span className={sidebar ? 'bar hamburger2' : 'bar'}></span>
                        <span className={sidebar ? 'bar hamburger3' : 'bar'}></span>
                    </div>
                </div>
            </header>
            <nav id="navbar">
                <ul id="navlist" className={'navigation-list' + ' ' + navlistClasses()} onClick={showSidebar}>
                    <li className="margin-top-secondary margin-bottom-primary"><NavLink className="navigation-link font-weight-primary color-primary cursor-primary" to="/">{navbar.home}</NavLink></li>
                    <li className="margin-top-secondary margin-bottom-primary"><NavLink className="navigation-link font-weight-primary color-primary cursor-primary" to="/tours">{navbar.tours}</NavLink></li>
                    <li className="margin-top-secondary margin-bottom-primary"><NavLink className="navigation-link font-weight-primary color-primary cursor-primary" to="/rooms_overview">{navbar.map}</NavLink></li>
                    <li className="margin-top-secondary margin-bottom-primary"><NavLink className="navigation-link font-weight-primary color-primary cursor-primary" to="/history">{navbar.history}</NavLink></li>
                    <li className="margin-top-secondary margin-bottom-primary"><NavLink className="navigation-link font-weight-primary color-primary cursor-primary" to="/other">{navbar.other}</NavLink></li>
                </ul>
            </nav>
        </>
    )
}


export default Header