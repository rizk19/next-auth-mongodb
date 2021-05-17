import React from "react";
import { signOut, useSession } from "next-auth/client";

import { Logo } from "@components";

export const Header: React.FC = () => {
    const [session] = useSession();
    console.log("sessionsession", session);

    return (
        <>
            <div
                className="text-center"
                style={{ backgroundColor: "#20232a" }}
                data-testid="container"
            >
                <Logo />
            </div>
            {session && <button onClick={() => signOut()}>Sign Out</button>}
        </>
    );
};
