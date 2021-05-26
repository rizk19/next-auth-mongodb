import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
    return (
        <div
            className="text-center py-4"
            style={{ backgroundColor: "#282c34" }}
        >
            <a
                href="https://github.com/rizk19"
                target="_blank"
                className="d-block mb-3 footer-brand"
                data-testid="ekihelp-logo"
            >
                <span style={{ color: "lightgrey" }}>eki</span>
                <strong>help</strong>
            </a>

            <ul
                className="d-flex justify-content-center list-unstyled p-0 m-0"
                data-testid="icons-container"
            >
                <li className="mx-2">
                    <a href="https://github.com/rizk19">
                        <Image
                            src="/icons/github-icon.svg"
                            alt="github"
                            width="28"
                            height="29"
                        />
                    </a>
                </li>
                <li className="mx-2">
                    <a href="https://twitter.com/eightkiw">
                        <Image
                            src="/icons/twitter-icon.svg"
                            alt="twitter"
                            width="28"
                            height="28"
                        />
                    </a>
                </li>
                <li className="mx-2">
                    <Image
                        src="/icons/linkedin-icon.svg"
                        alt="linkedin"
                        width="28"
                        height="32"
                    />
                </li>
            </ul>
        </div>
    );
};
