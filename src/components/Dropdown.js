import React, { useContext, useState } from "react";
import {Context} from '../Context'
import DataAPI from "../DataAPI";



    function Dropdown() {
        const context = useContext(Context);
        const dataAPI = new DataAPI();
        const languages = dataAPI.getLanguages();
        const [dropdown, setDropdown] = useState(false);
        const showDropdown = () => setDropdown(!dropdown);
        
        return (
                <div className="dopdown-wrapper">
                    <button className="dropdown-button" onClick={showDropdown}>{context.language}</button>
                    <ul className={dropdown? "dropdown dropdown-show" : "dropdown"}>
                        {
                            languages.map((item)=>
                                <li className="dropdown-item" key={item}>{item}</li>
                            )
                        }
                    </ul>
                </div>

/*
                <select className="text-transform-primary clear-background" onChange={context.changeLanguage} value={context.language}>
                    {
                        Info.languages.map((item) =>
                            <option value={item} key={item}>{item}</option>
                        )
                    }
                </select>
*/
            )
}
export default Dropdown;