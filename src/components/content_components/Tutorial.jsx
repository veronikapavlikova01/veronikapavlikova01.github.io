import { React } from 'react';

function Tutorial(props) {
    return (
        <div className="flex content-container background-secondary padding-secondary border-radius-primary box-shadow">
            <h2 className="text-medium">{props.title}</h2>
            <p className="margin-top-secondary margin-bottom-primary">{props.label}</p>
            <ol>
                <li className="margin-bottom-primary">{props.step_1}</li>
                <li className="margin-bottom-primary">{props.step_2}</li>
                <li className="margin-bottom-primary">{props.step_3}</li>
                <li className="margin-bottom-primary">{props.step_4}</li>
            </ol>
            {props.children}
        </div>
    )
}

export default Tutorial;