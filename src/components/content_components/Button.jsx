import { React } from 'react';

function Button(props) {
    return (
        <button className="margin-primary display-block text-medium button align-self-primary background-primary font-weight-primary color-primary">{props.button}</button>
    )
}

export default Button;