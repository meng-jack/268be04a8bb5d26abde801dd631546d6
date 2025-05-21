import React, { useState } from "react";
import { Button, Divider, Group, ScrollArea, Stack, Tooltip } from "@mantine/core";
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiAccountMultiple, mdiArrowCollapseLeft, mdiArrowExpandRight, mdiFileEdit, mdiHandshake, mdiHome, mdiLogout, mdiScript, mdiSecurity } from '@mdi/js';
import { Spacer } from '../../components/basics';
import manifest from "../shared/manifest.json";
import mock from "../../assets/mock_strings.json";
import { Outlet } from "react-router-dom";
import { isMd, isLg } from "../../shared/responsive_queries.ts";
import { useDisclosure } from '@mantine/hooks';
import useWindowDimensions from '../../hooks/windim.tsx';

interface NavSideLink {
    id: string;
    labelIcon: string;
    label: string;
}

// represents general agent access (shown to registered agents)
const NavSideLinks: ReadonlyArray<NavSideLink> = [
    {
        id: "dashboard_nav",
        labelIcon: mdiHome,
        label: "Dashboard"
    },
    {
        id: "quotes_nav",
        labelIcon: mdiFileEdit,
        label: "Quotes"
    },
    {
        id: "customer_nav",
        labelIcon: mdiAccountMultiple,
        label: "Customers"
    },
    {
        id: "policies_nav",
        labelIcon: mdiScript,
        label: "Policies"
    },
    {
        id: "companies_nav",
        labelIcon: mdiHandshake,
        label: "Partners & Companies"
    },

];

// represents admin access (shown to admins)
// shown under normal nav side links and have a different icon color
const AdminNavSideLinks: ReadonlyArray<NavSideLink> = [
    {
        id: "admin_agents_nav",
        labelIcon: mdiSecurity,
        label: "Agents"
    },
    {
        id: "admin_sysconfig_nav",
        labelIcon: mdiSecurity,
        label: "System Configuration"
    }
];

function FullSideNav() {
    const [opened, { open, close }] = useDisclosure(isMd());
    const [selected, setSelected] = useState("dashboard_nav");
    const [forced, setForced] = useState(false);
    const { width } = useWindowDimensions();
    // condition for when the sidebar should not be in the expanded state
    const tooSmall: boolean = !isLg(width);
    if (!forced && tooSmall && opened) {
        close();
    }
    return opened ? (<nav className="bg-primary-color p-4 md:w-70 h-[100vh] text-on-primary-color flex flex-col">
        <ScrollArea>
            <Stack className="self-stretch h-[100%]">
                <header>
                    <img src="/logo_horizontal.png" className="h-[100%]" alt="United Aline" />
                </header>
                <Group className="text-[0.8em] bg-primary-darker-color p-1.5 rounded-(--border-radius)">
                    <span className="font-semibold">
                        Agency Portal
                    </span>
                    <Spacer />
                    {manifest.version}
                </Group>
                <Stack className="text-[0.8em] bg-primary-darker-color p-1.5 rounded-(--border-radius)" gap="0">
                    <Group className="p-0 m-0" align="center" justify="flex-start">
                        <Icon path={mdiAccountCircle} size={1.6} />
                        <Stack justify="center" align="flex-start" gap="0">
                            <span className="font-semibold text-[1.2em]">
                                {mock.user.firstName}{" "}{mock.user.lastName}
                            </span>
                            <span className="font-light text-[0.8em]">
                                {mock.user.email}
                            </span>
                        </Stack>
                    </Group>
                    <div className="py-2">
                        <Divider color="var(--on-primary)" />
                    </div>
                    <Group justify="center" align="center">
                        <Icon path={mdiLogout} size={0.6} color="var(--on-primary)" />
                        Logout
                    </Group>
                </Stack>
                <Divider color="var(--primary-darker)" />
                <Stack gap="0.6em">
                    {NavSideLinks.map((element) => {
                        return (
                            <button
                                key={element.id}
                                onClick={() => {
                                    setSelected(element.id);
                                }}
                                className={selected === element.id
                                    ? `
                                        px-2
                                        py-2
                                        transition-all duration-150 ease
                                        rounded-(--border-radius)
                                        bg-on-primary-color
                                        text-primary-color
                                    `
                                    : `
                                        px-2
                                        py-2
                                        hover:bg-primary-darker-color
                                        transition-all duration-150 ease
                                        rounded-(--border-radius)
                                `}>
                                <Group justify="flex-start" align="center">
                                    <Icon path={element.labelIcon} size={1} />
                                    {element.label}
                                </Group>
                            </button>
                        );
                    })}
                    <Divider color="var(--primary-darker)" />
                    {AdminNavSideLinks.map((element) => {
                        return (
                            <button
                                key={element.id}
                                onClick={() => {
                                    setSelected(element.id);
                                }}
                                className={selected === element.id
                                    ? `
                                        px-2
                                        py-2
                                        transition-all duration-150 ease
                                        rounded-(--border-radius)
                                        bg-on-primary-color
                                        text-primary-color
                                    `
                                    : `
                                        px-2
                                        py-2
                                        hover:bg-primary-darker-color
                                        transition-all duration-150 ease
                                        rounded-(--border-radius)
                                `}>
                                <Group justify="flex-start" align="center">
                                    <Icon path={element.labelIcon} size={1} />
                                    <span className="font-semibold">
                                        {element.label}
                                    </span>
                                </Group>
                            </button>
                        );
                    })}
                </Stack>
            </Stack>
        </ScrollArea>
        <Spacer />
        <div className="self-end">
            <Tooltip label={opened ? "Collapse Menu" : "Expand Menu"}>
                <Button
                    variant="subtle"
                    px="xs"
                    onClick={() => {
                        opened ? close() : open(); // maybe ternary isnt the best here :)
                    }}>
                    <Icon
                        path={opened ? mdiArrowCollapseLeft : mdiArrowExpandRight}
                        color="var(--on-primary)"
                        size={1}
                    />
                </Button>
            </Tooltip>
        </div>
    </nav >) : (
        <nav className="bg-primary-color p-4 w-16 h-[100vh] text-on-primary-color">
            <Stack className="h-[100%]" align="center">
                <ScrollArea>
                    <Stack className="self-stretch h-[100%]" align="center">
                        <header>
                            <img src="/logo_small.png" className="h-[100%]" alt="United Aline" />
                        </header>
                        <span className="text-[0.8em] text-center bg-primary-darker-color p-1.5 rounded-(--border-radius)">
                            {manifest.version}
                        </span>
                    </Stack>
                    <div className="py-2">
                        <Divider color="var(--primary-darker" />
                    </div>
                    <Stack gap="0.6em">
                        {
                            // the shifting of the padding from py-4 to py-2 depending on which is selected
                            // gives a really material 3 design look which doesn't really match with the
                        }
                        {NavSideLinks.map((element) => {
                            return (
                                <Tooltip key={element.id} label={element.label}>
                                    <button
                                        onClick={() => {
                                            setSelected(element.id);
                                        }}
                                        className={selected === element.id
                                            ? `
                                        px-2
                                        py-4
                                        transition-all duration-150 ease
                                        rounded-full
                                        bg-on-primary-color
                                        text-primary-color
                                        flex
                                        justify-center
                                    `
                                            : `
                                        px-2
                                        py-2
                                        hover:bg-primary-darker-color
                                        transition-all duration-150 ease
                                        rounded-full
                                        flex
                                        justify-center
                                `}>
                                        <Icon path={element.labelIcon} size={1.2} />
                                    </button>
                                </Tooltip>
                            );
                        })}
                        <Divider color="var(--primary-darker)" />
                        {AdminNavSideLinks.map((element) => {
                            return (
                                <Tooltip key={element.id} label={element.label}>
                                    <button
                                        onClick={() => {
                                            setSelected(element.id);
                                        }}
                                        className={selected === element.id
                                            ? `
                                        px-2
                                        py-4
                                        transition-all duration-150 ease
                                        rounded-full
                                        bg-on-primary-color
                                        text-primary-color
                                        flex
                                        justify-center
                                    `
                                            : `
                                        px-2
                                        py-2
                                        hover:bg-primary-darker-color
                                        transition-all duration-150 ease
                                        rounded-full
                                        flex
                                        justify-center
                                `}>
                                        <Icon path={element.labelIcon} size={1.2} />
                                    </button>
                                </Tooltip>
                            );
                        })}
                    </Stack>
                </ScrollArea>
                <Spacer />
                <Tooltip label={opened ? "Collapse Menu" : "Expand Menu"}>
                    <Button
                        variant="subtle"
                        px="xs"
                        onClick={() => {
                            setForced(tooSmall);
                            opened ? close() : open(); // maybe ternary isnt the best here :)
                        }}>
                        <Icon
                            path={opened ? mdiArrowCollapseLeft : mdiArrowExpandRight}
                            color="var(--on-primary)"
                            size={1}
                        />
                    </Button>
                </Tooltip>
            </Stack >
        </nav >);
}


// similar to the public page layout
export function PageLayout() {
    return (
        <>
            <FullSideNav />
            <Outlet />
        </>
    );
}
