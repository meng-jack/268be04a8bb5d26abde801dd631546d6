import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { HomePage } from "./pages/p_home";
import { AboutPage } from "./pages/p_about";
import { SecureLoginPasswordRequest, SecureLoginPage, SecureTunnelLayout } from "./pages/p_login";
import { GetQuotePage } from './pages/p_getquote.tsx';
import { createTheme, MantineColorsTuple, MantineProvider } from '@mantine/core';
import COLORS from './shared/theme.ts';
import { NoPage404Page } from './pages/p_404_nopage.tsx';
import { PageLayout } from './components/pagelayout.tsx';
import * as Admin from "./admin/components/pagelayout.tsx";
import { AdminPageBundles } from './admin/shared/bundles.tsx';

const myColor: MantineColorsTuple = [
    '#ebf5ff',
    '#d4e7fa',
    '#a4cef7',
    '#72b4f6',
    '#4e9df5',
    '#3b8ff5',
    '#3188f6',
    '#2675dc',
    '#1b68c5',
    '#003d76'
];

const theme = createTheme({
    fontFamily: "Monsterrat",
    colors: {
        myColor,
    },
    components: {
        Drawer: {
            styles: {
                header: {
                    backgroundColor: COLORS.primary,
                    marginBottom: "0.4em",
                    borderBottom: "1px solid var(--primary-darker)"
                },
                body: {
                    backgroundColor: COLORS.primary
                },
                content: {
                    backgroundColor: COLORS.primary
                },

            }
        },
    },

});

export default function App() {
    return (
        <React.StrictMode>
            <MantineProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<PageLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path="*" element={<NoPage404Page />} />
                            <Route path="about" element={<AboutPage />} />
                            <Route path="getquote" element={<GetQuotePage />} />
                        </Route>

                        <Route path="/login" element={<SecureTunnelLayout />} >
                            <Route index element={<SecureLoginPage />} />
                            <Route path="requestpwd" element={<SecureLoginPasswordRequest />} />
                        </Route>

                        <Route path="/demo/admin" element={<Admin.PageLayout />}>
                            {
                                (AdminPageBundles.BranchLinks).map((element) => {
                                    return <Route key={element.singleRef} path={element.singleRef} element={element.child} />;
                                })
                            }
                            {
                                (AdminPageBundles.AdminNavSideLinks).map((element) => {
                                    return <Route key={element.singleRef} path={element.singleRef} element={element.child} />;
                                })
                            }
                        </Route>
                    </Routes>
                </BrowserRouter>
            </MantineProvider>
        </React.StrictMode>
    );
}
