import React from "react";
import { SizedBox } from "./basics";
import COLORS from "../shared/theme.ts";
import { Flex, Button, Drawer, Group, Menu, Center } from '@mantine/core';
import Icon from '@mdi/react';
import { mdiAccountOutline, mdiChevronDown, mdiClose, mdiHelp, mdiHomeVariantOutline, mdiMenu } from '@mdi/js';
import { DisplayAtLeastMd, DisplayUntilMd } from "./responsive";
import styled from 'styled-components';
import { useDisclosure } from '@mantine/hooks';

const NavLink = styled.a<{ $fontSize?: string; }>`
    color: var(--primary);
    font-weight: 600;
    font-size: ${props => props.$fontSize ?? "1.2em"}
`;

function MenuItem({
    icon,
    children,
}: Readonly<{
    icon: React.ReactNode;
    children: React.ReactNode;
}>) {
    return (
        <Flex direction="row" gap="1.4rem" align="center">
            {icon}
            {children}
        </Flex>
    );
}

/**
 * For anything until md (screen-size)
 */
function MiniHeader() {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <div className="bg-primary-color py-[1.2rem] pl-[1.2rem]">
            <Flex direction="row" align="center" justify="center">
                <LogoHorizontal />
                <SizedBox $width={"2.2vw"} />
                <Button
                    onClick={open}
                    color="var(--primary)"
                >
                    <Icon path={mdiMenu} size={1.8} color={COLORS.onPrimary} />
                </Button>
            </Flex >
            <Drawer
                position="bottom"
                onClose={close}
                opened={opened}
                closeButtonProps={{
                    iconSize: "1.6em",
                    icon: <Icon path={mdiClose} className="text-on-primary-color" />
                }}
            >
                <Drawer.Body className="bg-primary-color pt-[0.4em]">
                    <Flex direction="column" gap="2rem" justify="center">
                        <MenuItem
                            icon={<Icon path={mdiHomeVariantOutline} size={1.4} color={COLORS.onPrimary} />}
                        >
                            <NavLink href="/public/" $fontSize="1.4em">Home</NavLink>
                        </MenuItem>
                        <MenuItem
                            icon={<Icon path={mdiHelp} size={1.4} color={COLORS.onPrimary} />}
                        >
                            <NavLink href="/public/about" $fontSize="1.4em">About</NavLink>
                        </MenuItem>
                        <MenuItem
                            icon={<Icon path={mdiAccountOutline} size={1.4} color={COLORS.onPrimary} />}
                        >
                            <NavLink href="/login" $fontSize="1.4em">Login</NavLink>
                        </MenuItem>
                    </Flex>
                </Drawer.Body>
            </Drawer>
        </div>
    );
}

export function LogoHorizontal() {
    return <a href="/">
        <img
            itemProp="image"
            src="/logo_horizontal.png"
            alt="United Aline" />
    </a>;
}

const bigMenuLinks: ReadonlyArray<{ to: string, label: string, links: ReadonlyArray<{ to: string, label: React.ReactNode; }>; }> = [
    {
        to: "/public/about",
        label: "About",
        links: []
    },
    {
        to: "/login",
        label: "Login",
        links: []
    }
];

export function NavHeader() {
    const items = bigMenuLinks.map((link) => {
        const menuItems = link.links.map((sublink) => (
            <Menu.Item key={sublink.to}>{sublink.label}</Menu.Item>
        ));
        if (menuItems.length > 0) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                        <a
                            href={link.to}
                            className={`
                                block
                                leading-1
                                px-3
                                py-2
                                rounded-sm
                                no-underline
                                text-[1.2em]
                                font-medium
                            `}
                        >
                            <Center>
                                <span className="mr-5px text-on-primary-color">
                                    {link.label}
                                </span>
                                <Icon path={mdiChevronDown} size={1.2} color={COLORS.onPrimary} />
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {menuItems}
                    </Menu.Dropdown>
                </Menu>
            );
        }
        return (<a
            key={link.label}
            href={link.to}
            className={`
                block
                leading-1
                px-3
                py-2
                rounded-sm
                no-underline
                text-[1.2em]
                font-medium
                text-on-primary-color
            `}>{link.label}</a>);
    });
    return (
        <header>
            <DisplayAtLeastMd>
                <div className={`
                    bg-primary-color
                    py-[2rem]
                    px-[12rem]
                `}>
                    <div className={`
                            h-[56px]
                            flex
                            justify-between
                            items-center
                        `}>
                        <LogoHorizontal />
                        <Group gap={5} visibleFrom="sm">
                            {items}
                        </Group>
                    </div>
                </div>
            </DisplayAtLeastMd>
            <DisplayUntilMd>
                <MiniHeader />
            </DisplayUntilMd>
        </header >
    );
}