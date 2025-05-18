import React, { ReactNode, useEffect } from "react";
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
    useEffect(() => {
        document.title = title;
    }, [title]);
    return (
        <span itemType="http://schema.org/LocalBusiness">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    verticalAlign: "baseline",
                    minHeight: "100vh",
                }}
            >
                {header !== undefined ? header : <NavHeader />}
                {native
                    ?
                    <main style={{ flexGrow: 1 }}>{children}</main>

                    : <div
                        style={{
                            paddingLeft: ismd ? "12rem" : "2.5rem",
                            paddingRight: ismd ? "12rem" : "2.5rem",
                        }}
                    >
                        <main style={{ flexGrow: 1 }}>{children}</main>
                    </div>
                }
            </div>
        </span>
    );
}
