import React, { useState } from "react";
import { SizedBox } from "./basics";
import "../styles/theme.css";
import { Button, Divider, Drawer, Flex } from "antd";
import { Link } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import COLORS from "../shared/theme.ts";
import strings from "../assets/strings.json";
import {
    CloseOutlined,
    HomeOutlined,
    MenuOutlined,
    PhoneOutlined,
    QuestionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { isMd } from "../shared/responsive_queries.ts";
import { DisplayAtLeastMd, DisplayUntilMd } from "./responsive";

function NavLink({ label, to, fontSize = "1.2em" }) {
    return (
        <a
            href={to}
            style={{
                color: COLORS.onPrimary,
                fontWeight: "600",
                fontSize: fontSize,
            }}
        >
            {label}
        </a>
    );
}

function MenuItem({
    icon,
    children,
}: Readonly<{
    icon: React.ReactNode;
    children: React.ReactNode;
}>) {
    return (
        <Flex vertical={false} gap="0.8em" align="center">
            {icon}
            {children}
        </Flex>
    );
}

/**
 * For anything until md (screen-size)
 */
function MiniHeader() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Flex vertical={false} align="center" justify="center">
                <LogoHorizontal />
                <SizedBox width={"2.2vw"} />
                <Button
                    onClick={() => setOpen(true)}
                    style={{
                        backgroundColor: COLORS.primary,
                        color: COLORS.onPrimary,
                        border: "none",
                    }}
                >
                    <MenuOutlined
                        style={{
                            fontSize: "180%", // optical size?
                        }}
                    />
                </Button>
            </Flex>
            <Drawer
                placement="bottom"
                closable={true}
                onClose={() => setOpen(false)}
                open={open}
                closeIcon={
                    <CloseOutlined
                        style={{
                            fontSize: "130%",
                            color: COLORS.onPrimary,
                        }}
                    />
                }
                style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.onPrimary,
                }}
            >
                <Flex vertical={true} gap="large" justify="center">
                    <MenuItem
                        icon={
                            <HomeOutlined
                                style={{
                                    fontSize: "1.4em",
                                }}
                            />
                        }
                    >
                        <NavLink to="/" label="Home" fontSize="1.4em" />
                    </MenuItem>
                    <MenuItem
                        icon={
                            <QuestionOutlined
                                style={{
                                    fontSize: "1.4em",
                                }}
                            />
                        }
                    >
                        <NavLink to="/about" label="About" fontSize="1.4em" />
                    </MenuItem>
                    <MenuItem
                        icon={
                            <UserOutlined
                                style={{
                                    fontSize: "1.4em",
                                }}
                            />
                        }
                    >
                        <NavLink to="/login" label="Login" fontSize="1.4em" />
                    </MenuItem>
                </Flex>
            </Drawer>
        </>
    );
}

export function LogoHorizontal() {
    return <Link
        to="/"
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center" // makes sure the buttons and the image header are on the same axis line
        }}
    >
        <img
            itemProp="image"
            src={"/logo_horizontal.png"}
            alt="United Aline" />
    </Link>;
}

export function NavHeader() {
    return (
        <Header
            style={{
                backgroundColor: COLORS.primary,
                color: "white",
                height: "56px",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                paddingLeft: isMd() ? "12rem" : "1.2rem",
                paddingRight: isMd() ? "12rem" : "1.2rem",
            }}
        >
            <DisplayAtLeastMd>
                <Flex justify="space-between" align="center">
                    <LogoHorizontal />
                    <SizedBox width="20%" />
                    <Flex gap="middle" flex="1">
                        <Flex align="center">
                            <PhoneOutlined style={{ paddingRight: "0.15em" }} />
                            <a
                                href={`tel: ${strings.canonical.telephoneNumber}`}
                                style={{
                                    color: COLORS.onPrimary,
                                    fontWeight: "600",
                                    fontSize: "1.2em",
                                }}
                            >
                                {strings.canonical.telephoneNumber}
                            </a>
                        </Flex>
                        <Divider type="vertical" />
                        <Flex gap="1.5rem">
                            <NavLink to="/about" label="About" />
                            <NavLink to="/login" label="Login" />
                        </Flex>
                    </Flex>
                </Flex>
            </DisplayAtLeastMd>
            <DisplayUntilMd>
                <MiniHeader />
            </DisplayUntilMd>
        </Header>
    );
}
