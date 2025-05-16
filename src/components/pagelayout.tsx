import React, { ReactNode, useEffect } from "react";
import { NavHeader } from "./navheader";
import { isMd } from "../shared/responsive_queries";

interface PageLayoutProps {
    title: string;
    children: ReactNode;
}

export function PageLayout({ title, children }: Readonly<PageLayoutProps>) {
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
                <NavHeader />
                <div
                    style={{
                        paddingLeft: ismd ? "12rem" : "2.5rem",
                        paddingRight: ismd ? "12rem" : "2.5rem",
                    }}
                >
                    <main style={{ flexGrow: 1 }}>{children}</main>
                </div>
            </div>
        </span>
    );
}
