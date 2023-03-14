import React, { useContext, useState } from "react";
import { Context } from '../Context'
import DataAPI from "../DataAPI";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



function Dropdown() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const languages = dataAPI.getLanguages();
    const [dropdown, setDropdown] = useState(false);
    const showDropdown = () => setDropdown(!dropdown);

    const languageChange = (e) => {
        setDropdown(!dropdown);
        context.setLanguage(e);
    }

    return (
        <div className="dropdown-box text-transform-primary">
            <div  className="dropdown-button text-transform-primary cursor-primary flex-secondary align-items-primary" onClick={showDropdown}>
                <div className="dropdown-padding font-size-medium">{context.language}</div>
                <KeyboardArrowDownIcon className="dropdown-icon"/>
            </div>
            <ul className={dropdown ? "dropdown display-block" : "dropdown"}>
                {
                    languages.map((item) =>
                        <li className="dropdown-item cursor-primary font-size-medium" key={item} onClick={() => languageChange(item)}>{item}</li>
                    )
                }
            </ul>
        </div>
    )
}
export default Dropdown;