import React, { useState } from "react";
import { SizedBox, Spacer } from "./basics";
import "../styles/theme.css";
import { Button, Divider, Drawer, Flex } from "antd";
import { Link } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import COLORS from "../shared/theme";
import { sharedStrings, sharedValues } from "../shared/strings";
import {
    CloseOutlined,
    HomeOutlined,
    MenuOutlined,
    PhoneOutlined,
    QuestionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { isMd } from "../shared/responsive_queries";
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
            <Link
                to="/"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    className=""
                    itemProp="image"
                    src={"/logo_horizontal.png"}
                    alt="United Aline"
                    style={{
                        alignSelf: "center",
                        colorRendering: "optimizeQuality",
                        maxWidth: "80%",
                        height: "100%",
                    }}
                />
            </Link>
            <SizedBox width={"12%"} />
            <Button
                onClick={() => setOpen(true)}
                style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.onPrimary,
                    border: "none",
                    padding: "0.8em",
                }}
            >
                <MenuOutlined
                    style={{
                        fontSize: "180%", // optical size?
                    }}
                />
            </Button>
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

export function NavHeader() {
    return (
        <Header
            style={{
                backgroundColor: COLORS.primary,
                color: "white",
                height: "56px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                paddingLeft: isMd() ? "12rem" : "1.2rem",
                paddingRight: isMd() ? "12rem" : "1.2rem",
            }}
        >
            <DisplayAtLeastMd>
                <Flex vertical={false}>
                    <Link
                        to="/"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            className=""
                            itemProp="image"
                            src={"/logo_horizontal.png"}
                            alt="United Aline"
                            style={{
                                colorRendering: "optimizeQuality",
                                maxWidth: "100%",
                                maxHeight: "100%",
                            }}
                        />
                    </Link>
                    <Spacer />
                    <Flex
                        vertical={false}
                        justify="center"
                        align="center"
                        style={{
                            color: COLORS.onPrimary,
                            fontWeight: "600",
                            fontSize: "1.2em",
                        }}
                    >
                        <PhoneOutlined style={{ paddingRight: "0.15em" }} />
                        <a href={sharedValues.linkDefaultTelephoneNumber}>
                            {sharedStrings.defaultTelephoneNumber}
                        </a>
                    </Flex>
                    <div
                        style={{
                            paddingLeft: "1.2em",
                            paddingRight: "1.2em",
                        }}
                    >
                        <Divider type="vertical" />
                    </div>
                    <Flex gap={"1.5rem"} vertical={false}>
                        <NavLink to="/about" label="About" />
                        <NavLink to="/login" label="Login" />
                    </Flex>
                </Flex>
            </DisplayAtLeastMd>
            <DisplayUntilMd>
                <MiniHeader />
            </DisplayUntilMd>
        </Header>
    );
}
