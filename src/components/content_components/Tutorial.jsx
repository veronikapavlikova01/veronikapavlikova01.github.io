import { React } from 'react';

function Tutorial(props) {
    return (
        <div className="flex content-container background-secondary padding-secondary border-radius-primary box-shadow">
            <h2 className="text-medium">{props.title}</h2>
            <p className="margin-top-secondary margin-bottom-primary">{props.label}</p>
            <ol>
                {
                    props.steps.map((item) => (
                        <li className="margin-bottom-primary" key={item}>{item}</li>
                    ))
                }
            </ol>
            {props.children}
        </div>
    )
}

export default Tutorial;