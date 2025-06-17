import React, { useMemo, useState } from "react";
import { Accordion, Button, Divider, Group, ScrollArea, Stack, Tooltip } from "@mantine/core";
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiArrowCollapseLeft, mdiArrowExpandRight, mdiLogout } from '@mdi/js';
import { SizedBox, Spacer } from '../../components/basics';
import manifest from "../shared/manifest.json";
import mock from "../../assets/mock_strings.json";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { isMd, isLg } from "../../shared/responsive_queries.ts";
import { useDisclosure } from '@mantine/hooks';
import useWindowDimensions from '../../hooks/windim.tsx';
import { AdminPageBundles } from '../shared/bundles.tsx';
import { Logging } from "../../shared/logger.ts";
import AsyncContentLoader from '../../components/asynccontentloader.tsx';

// --- Reusable Components ---
interface NavButtonProps {
    link: AdminPageBundles.NavSideLink;
    isActive: (path: string) => boolean;
    onClick: (link: AdminPageBundles.NavSideLink) => void;
    isExpanded: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ link, isActive, onClick, isExpanded }) => {
    const activeClass = `
        px-2
        py-2
        transition-all duration-150 ease
        rounded-(--border-radius)
        bg-on-primary-color
        text-primary-color
        ${isExpanded ? '' : 'rounded-full flex justify-center py-4'}
    `;
    const inactiveClass = `
        px-2
        py-2
        hover:bg-primary-darker-color
        transition-all duration-150 ease
        rounded-(--border-radius)
        ${isExpanded ? '' : 'rounded-full flex justify-center py-2'}
    `;
    const commonClasses = isActive(link.singleRef!) ? activeClass : inactiveClass;
    const content = isExpanded ? (
        <Group justify="flex-start" align="center">
            <Icon path={link.labelIcon} size={0.8} />
            <span className="text-[0.8em]">
                {link.label}
            </span>
        </Group>
    ) : (
        <Icon path={link.labelIcon} size={1} />
    );

    return (
        <Tooltip label={link.label} disabled={isExpanded}>
            <button
                key={link.id}
                onClick={() => onClick(link)}
                className={commonClasses}
            >
                {content}
            </button>
        </Tooltip>
    );
};

// --- FullSideNav Component ---
function FullSideNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const pushBranchLink = (link: AdminPageBundles.NavSideLink) => {
        navigate(link.singleRef!);
    };

    const [opened, { open, close }] = useDisclosure(isMd());
    const [forced, setForced] = useState(false);
    const { width } = useWindowDimensions();

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

    // --- Main Render Logic ---
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
                    <Stack gap="0.4em">
                        {AdminPageBundles.TopLinks.map((element) => (
                            <NavButton
                                key={element.id}
                                link={element}
                                isActive={isActiveLink}
                                onClick={pushBranchLink}
                                isExpanded={opened}
                            />
                        ))}
                        <SizedBox $height="0.4em" />
                        <span className="text-xs">General</span>
                        {AdminPageBundles.BranchLinks.map((element) => (
                            // Add the 'singleRef' check here if not all BranchLinks have it
                            "singleRef" in element ? (
                                <NavButton
                                    key={element.id}
                                    link={element}
                                    isActive={isActiveLink}
                                    onClick={pushBranchLink}
                                    isExpanded={opened}
                                />
                            ) :
                                // assuming here we are using an accordion for a 2 layer element
                                // we have to use separate Accordion, since it is not possible to gurantee
                                // another expandable follows (and is just not worth it)
                                (<Accordion variant="filled" transitionDuration={150} radius="md" key={element.id}
                                    styles={{
                                        root: {
                                            "--accordion-transition-duration": "150ms",
                                        },
                                        chevron: {
                                            color: "var(--on-primary)"
                                        },
                                        item: {
                                            backgroundColor: "transparent",
                                        },
                                        panel: {
                                            paddingLeft: "1rem"
                                        },
                                        content: {
                                            borderLeft: "2px solid var(--primary-darker)",
                                        },
                                        control: {
                                            paddingLeft: "0.5rem",
                                            "&:hover": {
                                                backgroundColor: "var(--primary-darker)"
                                            },
                                            backgroundColor: "var(--primary)",
                                            color: "var(--on-primary)",
                                            fontSize: "0.8em",
                                            borderRadius: "var(--border-radius)"
                                        }
                                    }}
                                >
                                    <Accordion.Item value={element.id}>
                                        <Accordion.Control
                                            icon={<Icon path={element.labelIcon}
                                                size={0.8}
                                                color="var(--on-primary)"
                                            />}>{element.label}</Accordion.Control>
                                        <Accordion.Panel>
                                            <Stack gap="0.4em">
                                                {
                                                    element.links.map((subelement) => (
                                                        <NavButton
                                                            key={subelement.id}
                                                            link={subelement}
                                                            isActive={isActiveLink}
                                                            onClick={pushBranchLink}
                                                            isExpanded={opened}
                                                        />
                                                    ))
                                                }
                                            </Stack>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                </Accordion>)
                        ))}
                        {mock.user.isAdmin ? (
                            <>
                                <SizedBox $height="0.6em" />
                                <span className="text-xs">Admin</span>
                                {AdminPageBundles.AdminNavSideLinks.map((element) => (
                                    <NavButton
                                        key={element.id}
                                        link={element}
                                        isActive={isActiveLink}
                                        onClick={pushBranchLink}
                                        isExpanded={opened}
                                    />
                                ))}
                            </>
                        ) : <></>}
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
                            {/* Assuming a smaller logo for collapsed state */}
                            <img src="/logo_small.png" className="h-[100%]" alt="United Aline" />
                        </header>
                        <span className="text-[0.8em] text-center bg-primary-darker-color p-1.5 rounded-(--border-radius)">
                            {manifest.version}
                        </span>
                    </Stack>
                    <div className="py-2">
                        <Divider color="var(--primary-darker)" />
                    </div>
                    <Stack gap="0.6em">
                        {AdminPageBundles.BranchLinks.map((element) => (
                            "singleRef" in element && (
                                <NavButton
                                    key={element.id}
                                    link={element}
                                    isActive={isActiveLink}
                                    onClick={pushBranchLink}
                                    isExpanded={opened}
                                />
                            )
                        ))}
                        <Divider color="var(--primary-darker)" />
                        {AdminPageBundles.AdminNavSideLinks.map((element) => (
                            <NavButton
                                key={element.id}
                                link={element}
                                isActive={isActiveLink}
                                onClick={pushBranchLink}
                                isExpanded={opened}
                            />
                        ))}
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
            </Stack>
        </nav>
    );
}

// similar to the public page layout
export function PageLayout() {
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