import React from "react";
import { NavHeader } from "./navheader";
import { Outlet } from 'react-router-dom';

// native specifies whether additional styling should be configured, by default it is supplied a value
//
// to use another styling (custom styling), set native to 'undefined'
export function PageLayout() {
    return (
        <span itemType="http://schema.org/LocalBusiness">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <NavHeader />
                <main>
                    <Outlet />
                </main>
            </div>
        </span >
    );
}
