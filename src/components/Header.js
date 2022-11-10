import { NavLink } from 'react-router-dom'
import Dropdown from './Dropdown';
import { useContext, useState } from "react";
import { Context } from "../Context";
import DataAPI from '../DataAPI'


function Header() {
    const language = useContext(Context);
    const navbar = new DataAPI().getNavbar(language.language);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <header className="navigation stick z-index-nav flex-secondary align-items-primary">
                <NavLink to="/" className="margin-right-primary">
                    <h1 className="nav-label font-weight-primary color-primary flex">Frýdlant<span>Audio guide</span></h1>
                </NavLink>
                <div className="flex-secondary align-items-secondary z-index-nav">
                    <Dropdown></Dropdown>
                    <div className="hamburger" onClick={showSidebar}>
                        <span className={sidebar ? 'bar hamburger1' : 'bar'}></span>
                        <span className={sidebar ? 'bar hamburger2' : 'bar'}></span>
                        <span className={sidebar ? 'bar hamburger3' : 'bar'}></span>
                    </div>
                </div>
            </header>
            <nav>
                <ul className={sidebar ? 'navigation-list active' : 'navigation-list'} onClick={showSidebar}>
                    <li className="margin-top-secondary margin-bottom-primary"><NavLink className="navigation-link font-weight-primary color-primary cursor-primary" to="/tours">{navbar.tours}</NavLink></li>
                    <li className="margin-top-secondary margin-bottom-primary"><NavLink className="navigation-link font-weight-primary color-primary cursor-primary" to="#">{navbar.map}</NavLink></li>
                    <li className="margin-top-secondary margin-bottom-primary"><NavLink className="navigation-link font-weight-primary color-primary cursor-primary" to="/history">{navbar.history}</NavLink></li>
                    <li className="margin-top-secondary margin-bottom-primary"><NavLink className="navigation-link font-weight-primary color-primary cursor-primary" to="/contact">{navbar.contact}</NavLink></li>
                </ul>
            </nav>
        </>
    )
}

export default Header