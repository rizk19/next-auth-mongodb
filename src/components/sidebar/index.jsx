import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const LinkComponent = (props) => {
    const { url, iconClass, title, activeUrl } = props;
    return (
        <Link href={url} passHref>
            <div className={`a_tag ${activeUrl === url ? "on" : ""}`}>
                <Link href={url} passHref>
                    <i className={iconClass}></i>
                </Link>
                <Link href={url} passHref>
                    <span className="sidebar_links_name">{title}</span>
                </Link>
            </div>
        </Link>
    );
};

export const Sidebar = () => {
    const router = useRouter();
    let sidebarButton, customSidebar, searchButton, layoutContentChild;

    useEffect(() => {
        sidebarButton = document.querySelector("#sidebar_button");
        customSidebar = document.querySelector(".custom_sidebar");
        searchButton = document.querySelector(".bx-search-alt");
        layoutContentChild = document.querySelector(".layout_children_content");

        sidebarButton.onclick = function () {
            customSidebar.classList.toggle("active");
            layoutContentChild.classList.toggle("active");
        };

        searchButton.onclick = function () {
            customSidebar.classList.toggle("active");
            layoutContentChild.classList.toggle("active");
        };
    }, []);

    const dataSidebar = [
        {
            url: "/",
            title: "Dashboard",
            iconClass: "bx bx-grid-alt",
        },
        {
            url: "/",
            title: "User",
            iconClass: "bx bxs-user-circle",
        },
        {
            url: "/",
            title: "Analytics",
            iconClass: "bx bx-pie-chart-alt-2",
        },
        {
            url: "/signin",
            title: "Settings",
            iconClass: "bx bx-cog bx-spin-hover",
        },
        {
            url: "/",
            title: "Dashboard",
            iconClass: "bx bx-grid-alt",
        },
        {
            url: "/",
            title: "User",
            iconClass: "bx bxs-user-circle",
        },
        {
            url: "/attendance",
            title: "Attendance",
            iconClass: "bx bxs-user-circle",
        },
    ];
    const [searchValue, setSearchValue] = useState("");
    const [filteredSidebar, setFilteredSidebar] = useState(dataSidebar);

    const filterSidebar = (queryString) => {
        const value = queryString.target.value ? queryString.target.value : "";
        setSearchValue(value);
        const tempFilter = dataSidebar.filter((option) => {
            return value
                .toLowerCase()
                .split(" ")
                .every((v) => option.title.toLowerCase().includes(v));
        });
        if (queryString) {
            setFilteredSidebar(tempFilter);
        } else {
            setFilteredSidebar(dataSidebar);
        }
    };

    const onPressEnter = (e) => {
        if (e.key === "Enter") {
            setSearchValue("");
            setFilteredSidebar(dataSidebar);
        }
    };

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
                    <input
                        value={searchValue}
                        onChange={(e) => filterSidebar(e)}
                        onKeyPress={(e) => onPressEnter(e)}
                        type="text"
                        placeholder="Search..."
                    />
                    <span className="sidebar_tooltip">Search</span>
                </li>
                {filteredSidebar.map((item, i) => (
                    <li key={i}>
                        <LinkComponent
                            url={item.url}
                            activeUrl={router.pathname}
                            title={item.title}
                            iconClass={item.iconClass}
                        />
                        <span className="sidebar_tooltip">{item.title}</span>
                    </li>
                ))}
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
                    <span className="sidebar_tooltip">Logout</span>
                </div>
            </div>
        </div>
    );
};
