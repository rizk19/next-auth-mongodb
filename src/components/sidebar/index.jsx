import React from "react";

export const Sidebar = () => {
    return (
        <div className="custom_sidebar">
            <div className="sidebar_logo_content">
                <div className="sidebar_logo">
                    <div className="sidebar_logo_name">
                        <p>
                            eki<strong>help</strong>
                        </p>
                    </div>
                </div>
                <i className="bx bx-menu" id="sidebar_button"></i>
            </div>
            <ul className="sidebar_nav_list">
                <li>
                    <i className="bx bx-search-alt"></i>
                    <input type="text" placeholder="Search..." />
                    {/* <span className="sidebar_tootip">Dashboard</span> */}
                </li>
                <li>
                    <a href="">
                        <i className="bx bx-grid-alt"></i>
                        <span className="sidebar_links_name">Dashboard</span>
                    </a>
                    {/* <span className="sidebar_tootip">Dashboard</span> */}
                </li>
                <li>
                    <a href="">
                        <i className="bx bxs-user-circle"></i>
                        <span className="sidebar_links_name">User</span>
                    </a>
                    {/* <span className="sidebar_tootip">Dashboard</span> */}
                </li>
                <li>
                    <a href="">
                        <i className="bx bx-pie-chart-alt-2"></i>
                        <span className="sidebar_links_name">Analytics</span>
                    </a>
                    {/* <span className="sidebar_tootip">Dashboard</span> */}
                </li>
                <li>
                    <a href="">
                        <i className="bx bx-cog"></i>
                        <span className="sidebar_links_name">Settings</span>
                    </a>
                    {/* <span className="sidebar_tootip">Dashboard</span> */}
                </li>
            </ul>
            <div className="sidebar_profile_content">
                <div className="sidebar_profile">
                    <div className="sidebar_profile_details">
                        {/* <img src="" alt="" /> */}
                        <div className="sidebar_name_job">
                            <div className="sidebar_name">Rizki Ahmad</div>
                            <div className="sidebar_job">
                                Frontend Developer
                            </div>
                        </div>
                    </div>
                    <i className="bx bx-log-out bx-sm" id="sidebar-log-out"></i>
                </div>
            </div>
        </div>
    );
};
