import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { HomePage } from "./pages/p_home";
import { AboutPage } from "./pages/p_about";
import { ConfigProvider } from "antd";

import COLORS from "./shared/theme";
import { LoginPage } from "./pages/p_login";

export default function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: COLORS.primary,
                    fontFamily: "Monsterrat",
                },
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}
