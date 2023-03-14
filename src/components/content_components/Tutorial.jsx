import { React } from 'react';

function Tutorial(props) {
    return (
        <div className="flex content-container background-secondary padding-secondary border-radius-primary box-shadow">
            <h2 className="text-medium">{props.title}</h2>
            <p className="margin-top-secondary margin-bottom-primary">{props.label}</p>
            <div className="flex-secondary margin-bottom-primary">
                <span className="margin-right-secondary font-weight-primary text-medium">1.</span>
                <span>{props.step_1}</span>
            </div>
            <div className="flex-secondary margin-bottom-primary">
                <span className="margin-right-secondary font-weight-primary text-medium">2.</span>
                <span>{props.step_2}</span>
            </div>
            <div className="flex-secondary margin-bottom-primary">
                <span className="margin-right-secondary font-weight-primary text-medium">3.</span>
                <span>{props.step_3}</span>
            </div>
            <div className="flex-secondary margin-bottom-primary">
                <span className="margin-right-secondary font-weight-primary text-medium">4.</span>
                <span>{props.step_4}</span>
            </div>
            {props.children}
        </div>
    )
}

export default Tutorial;