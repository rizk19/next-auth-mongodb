import React from "react";
import { signOut, useSession } from "next-auth/client";

export const HeaderMain = () => {
    return (
        <nav id="main-header">
            {/* <div className="main-header-burger">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div> */}
            {/* <i className="bx bx-menu bx-md"></i> */}
            <div className="main-header-logo">
                {/* <h6>
                    eki<strong>help</strong>
                </h6> */}
            </div>
            <ul className="main-header-nav-links">
                <li>
                    <a href=""></a>Home
                </li>
                <li>
                    <a href=""></a>Profile
                </li>
                <li>
                    <a href=""></a>Company
                </li>
            </ul>
        </nav>
    );
};
