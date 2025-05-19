import React, { ReactNode, useEffect, useState } from "react";
import { NavHeader } from "./navheader";
import { isMd } from "../shared/responsive_queries.ts";

// native specifies whether additional styling should be configured, by default it is supplied a value
//
// to use another styling (custom styling), set native to 'undefined'
export function PageLayout({ title, header, native, children }: Readonly<{
    title: string;
    header?: ReactNode,
    native: boolean,
    children: ReactNode;
}>) {
    const ismd = isMd();
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        document.title = title;
        setVisible(true);
    }, [title]);
    return (
        <span itemType="http://schema.org/LocalBusiness">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {header !== undefined ? header : <NavHeader />}
                {native
                    ?
                    <main style={{
                        opacity: visible ? 1 : 0,
                        transition: "opacity 0.7s ease-in-out",
                    }}>{children}</main>
                    : <main
                        className={`
                            pl-[${ismd ? '12rem' : '2.5rem'}]
                            pr-[${ismd ? '12rem' : '2.5rem'}]
                            opacity-[${visible ? 1 : 0}]
                            transition-opacity
                            duration-700
                            ease-in-out
                        `}
                    >
                        {children}
                    </main>
                }
            </div>
        </span >
    );
}
