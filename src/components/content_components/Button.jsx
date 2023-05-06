import React from 'react';

function Button(props) {
    return (
        <span className="margin-primary display-block text-medium button align-self-primary background-primary font-weight-primary color-primary">{props.button}</span>
    )
}

export default Button;