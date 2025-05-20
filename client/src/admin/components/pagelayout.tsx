import React from "react";
import { NavHeader } from "./navheader";
import { Outlet } from 'react-router-dom';

// similar to the public page layout
export function PageLayout() {
    return (
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
    );
}
