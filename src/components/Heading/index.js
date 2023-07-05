import React from "react";

const Heading = (props) => {
    return(
        <div className="LT---Heading text-left text-capitalize mb-4">
            <h2>
                {props.title}
                <span>{props.subTitle}</span>    
            </h2>
        </div>
    );
}

export default Heading;