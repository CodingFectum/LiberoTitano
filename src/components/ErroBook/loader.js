import React from "react";

import loaderimg from "./aboutImg.png"
import './all.css'
const Loader = () => {
    return( 
        <div className="Global_loader_class">
            <div style={{textAlign: 'center'}}>
                <img src={loaderimg} style={{height: 200, width: 'auto'}} />
                {/* <h4>Processing..!</h4> */}
            </div>
        </div>
    )
}

export default Loader;