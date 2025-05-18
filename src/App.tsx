import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { HomePage } from "./pages/p_home";
import { AboutPage } from "./pages/p_about";
import { ConfigProvider } from "antd";

import { LoginPage } from "./pages/p_login";
import { GetQuotePage } from './pages/p_getquote.tsx';
import COLORS from './shared/theme.ts';

export default function App() {
    return (
        <ConfigProvider
            // antd provides a great visual editor here:
            //
            // https://ant.design/theme-editor
            theme={{
                token: {
                    colorPrimary: COLORS.primary,
                    colorInfo: COLORS.primary,
                    colorSuccess: "#6eb74a",
                    colorWarning: "#d7a133",
                    colorError: "#ca4346",
                    fontSize: 18,
                    wireframe: false,
                    colorPrimaryBg: "#bcd2e2" // :D really good color choice
                },
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/getquote" element={<GetQuotePage />} />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}
