import React, { useContext } from "react";
import Info from '../Info.json'
import {Context} from '../Context'



    function Dropdown() {
        const context = useContext(Context);
        
        return (
                <select className="text-transform-primary clear-background" onChange={context.changeLanguage} value={context.language}>
                    {
                        Info.languages.map((item) =>
                            <option value={item} key={item}>{item}</option>
                        )
                    }
                </select>
            )
}
export default Dropdown;