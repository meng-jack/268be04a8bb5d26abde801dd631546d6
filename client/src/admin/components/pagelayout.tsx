import React, { useMemo, useState } from "react";
import { Button, Divider, Group, ScrollArea, Stack, Tooltip } from "@mantine/core";
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiArrowCollapseLeft, mdiArrowExpandRight, mdiLogout } from '@mdi/js';
import { Spacer } from '../../components/basics';
import manifest from "../shared/manifest.json";
import mock from "../../assets/mock_strings.json";
import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { isMd, isLg } from "../../shared/responsive_queries.ts";
import { useDisclosure } from '@mantine/hooks';
import useWindowDimensions from '../../hooks/windim.tsx';
import { AdminPageBundles } from '../shared/bundles.tsx';
import { Logging } from "../../shared/logger.ts";
import AsyncContentLoader from '../../components/asynccontentloader.tsx';
function FullSideNav() {
    const navigate = useNavigate();
    const location = useLocation();
    function pushBranchLink(link: AdminPageBundles.NavSideLink) {
        navigate(link.singleRef!);
    }
    const [opened, { open, close }] = useDisclosure(isMd());
    const [forced, setForced] = useState(false);
    const { width } = useWindowDimensions();
    // condition for when the sidebar should not be in the expanded state
    const tooSmall: boolean = !isLg(width);
    if (!forced && tooSmall && opened) {
        close();
    }
    const isActiveLink = (linkPath: string) => {
        const locSplit = location.pathname.split("/");
        const last = locSplit[locSplit.length - 1];
        Logging.finer("DASH Selection Check " + location.pathname + "(" + last + ") === " + linkPath);
        return last === linkPath;
    };
    const loadTitleImage = useMemo(() => {
        return async () => {
            return Promise.resolve('/logo_horizontal.png');
        };
    }, []);
    return opened ? (
        <nav className="bg-primary-color p-4 md:w-70 h-[100vh] text-on-primary-color flex flex-col">
            <ScrollArea>
                <Stack className="self-stretch h-[100%]">
                    <header>
                        <AsyncContentLoader
                            asyncOperation={loadTitleImage}
                            minHeight="1.5em"
                            loaderProps={{
                                color: "var(--on-primary)",
                                type: "dots",
                                size: "1.5em",
                            }}
                        >
                            {(imageUrl: string) => (
                                <img
                                    src={imageUrl}
                                    alt="United Aline"
                                    style={{ maxHeight: '300px' }}
                                />
                            )}
                        </AsyncContentLoader>
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
                            <Stack justify="center" align="flex-start" gap="0.2em">

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
                        <button onClick={() => {
                            navigate("/");
                        }}>
                            <Group justify="center" align="center">
                                <Icon path={mdiLogout} size={0.6} color="var(--on-primary)" />
                                Logout
                            </Group>
                        </button>
                    </Stack>
                    <Divider color="var(--primary-darker)" />
                    <Stack gap="0.6em">
                        {AdminPageBundles.BranchLinks.map((element) => {
                            return (
                                <button
                                    key={element.id}
                                    onClick={() => {
                                        pushBranchLink(element);
                                    }}
                                    className={isActiveLink(element.singleRef!)
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
                                        `}
                                >
                                    <Group justify="flex-start" align="center">
                                        <Icon path={element.labelIcon} size={1} />
                                        {element.label}
                                    </Group>
                                </button>
                            );
                        })}
                        <Divider color="var(--primary-darker)" />
                        {AdminPageBundles.AdminNavSideLinks.map((element) => {
                            return (
                                <button
                                    key={element.id}
                                    onClick={() => {
                                        pushBranchLink(element);
                                    }}
                                    className={isActiveLink(element.singleRef!)
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
                                        `}
                                >
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
                            setForced(tooSmall);
                            opened ? close() : open();
                        }}>
                        <Icon
                            path={opened ? mdiArrowCollapseLeft : mdiArrowExpandRight}
                            color="var(--on-primary)"
                            size={1}
                        />
                    </Button>
                </Tooltip>
            </div>
        </nav >
    ) : (
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
                        {AdminPageBundles.BranchLinks.map((element) => {
                            return (
                                <Tooltip key={element.id} label={element.label}>
                                    <button
                                        onClick={() => {
                                            pushBranchLink(element);
                                        }}
                                        className={isActiveLink(element.singleRef!)
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
                                            `}
                                    >
                                        <Icon path={element.labelIcon} size={1.2} />
                                    </button>
                                </Tooltip>
                            );
                        })}
                        <Divider color="var(--primary-darker)" />
                        {AdminPageBundles.AdminNavSideLinks.map((element) => {
                            return (
                                <Tooltip key={element.id} label={element.label}>
                                    <button
                                        onClick={() => {
                                            pushBranchLink(element);
                                        }}
                                        className={isActiveLink(element.singleRef!)
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
                                            `}
                                    >
                                        <Icon path={element.labelIcon} size={1.2} />
                                    </button>
                                </Tooltip>
                            );
                        })}
                    </Stack>
                </ScrollArea>
                <Spacer />
                <div className="self-end">
                    <Tooltip label={opened ? "Collapse Menu" : "Expand Menu"}>
                        <Button
                            variant="subtle"
                            px="xs"
                            onClick={() => {
                                setForced(tooSmall);
                                opened ? close() : open();
                            }}>
                            <Icon
                                path={opened ? mdiArrowCollapseLeft : mdiArrowExpandRight}
                                color="var(--on-primary)"
                                size={1}
                            />
                        </Button>
                    </Tooltip>
                </div>
            </Stack >
        </nav >
    );
}


// similar to the public page layout
export function PageLayout() {
    // using "flex-start" here ensures that the element (the Outlet) is properly displayed
    // as mantine displays everything on the cross-axis at the center-line
    return (
        <Group gap="0" align="flex-start" className="h-screen w-screen" wrap="nowrap">
            <div className="shrink-0">
                <FullSideNav />
            </div>
            <div className="flex-grow h-full overflow-hidden">
                <ScrollArea className="h-full" offsetScrollbars>
                    <div className="p-4 min-h-full">
                        <Outlet />
                    </div>
                </ScrollArea>
            </div>
        </Group>
    );
}
