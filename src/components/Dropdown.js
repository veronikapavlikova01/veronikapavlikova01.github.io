import React, { useContext, useState } from "react";
import { Context } from '../Context'
import DataAPI from "../DataAPI";
import { IoIosArrowDown } from 'react-icons/io'



function Dropdown() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const languages = dataAPI.getLanguages();
    const [dropdown, setDropdown] = useState(false);
    const showDropdown = () => setDropdown(!dropdown);

    const languageChange = (e) => {
        setDropdown(!dropdown);
        context.changeLanguage(e);
    }

    return (
        <div className="dropdown-box text-transform-primary">
            <div  className="dropdown-button text-transform-primary text-medium cursor-primary flex-secondary align-items-primary padding-primary" onClick={showDropdown}>
                <div className="padding-right-primary">{context.language}</div>
                <IoIosArrowDown />
            </div>
            <ul className={dropdown ? "dropdown dropdown-show" : "dropdown"}>
                {
                    languages.map((item) =>
                        <li className="dropdown-item text-medium cursor-primary" key={item} onClick={() => languageChange(item)}>{item}</li>
                    )
                }
            </ul>
        </div>
    )
}
export default Dropdown;