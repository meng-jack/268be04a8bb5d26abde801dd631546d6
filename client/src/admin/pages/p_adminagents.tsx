import { Button, Divider, Group, Menu, Modal, Paper, Select, Stack, Table, TextInput, LoadingOverlay, Loader, Pagination } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import mock from "../../assets/mock_strings.json";
import { Tags } from '../components/tag';
import { mdiAccountPlus, mdiAt, mdiChevronDown, mdiChevronUp, mdiCommaBox, mdiExport, mdiFileExcelBox, mdiFilePdfBox, mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import { Spacer } from '../../components/basics';
import { useDisclosure } from '@mantine/hooks';
import { Logging } from '../../shared/logger';
import { ComputedStrings } from '../../shared/canonical_strings';

interface Agent {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    lastActivity: number;
    registeredTimestamp: number;
}

const initialMockAgents: Agent[] = Array.from(mock.agents);

export default function AdminAgentsPage() {
    const [agents, setAgents] = useState<Agent[]>(initialMockAgents);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const newAccountFormDisclosure = useDisclosure(false);
    const [agentToRemoveEmail, setAgentToRemoveEmail] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sortMethod, setSortMethod] = useState<string | null>(null);
    const [activePage, setActivePage] = useState(1);
    const kEntriesPerPage = 30;
    useEffect(() => {
        document.title = "Manage Agents | United Aline";
    }, []);

    /**
     * Handles the edit action for an agent.
     * @param email The email of the agent to edit.
     */
    const handleEditAgent = (email: string) => {
        setAgents((prevAgents) =>
            prevAgents.map((agent) =>
                agent.email === email
                    ? {
                        ...agent,
                        status: agent.status === 'Active' ? 'Inactive' : 'Active',
                        // todo here with modal
                    }
                    : agent
            )
        );
        console.log(`Edit action for agent: ${email}`);
    };

    /**
     * Initiates the remove action for an agent, showing a confirmation.
     * @param email The email of the agent to potentially remove.
     */
    const confirmRemoveAgent = (email: string) => {
        setAgentToRemoveEmail(email);
        setShowConfirmation(true);
    };

    /**
     * Executes the removal of an agent after confirmation.
     */
    const handleRemoveAgent = () => {
        if (agentToRemoveEmail) {
            setAgents((prevAgents) =>
                prevAgents.filter((agent) => agent.email !== agentToRemoveEmail)
            );
            console.log(`Agent removed: ${agentToRemoveEmail}`);
            setAgentToRemoveEmail(null);
            setShowConfirmation(false);
            const newTotalItems = agents.length - 1;
            const newTotalPages = Math.ceil(newTotalItems / kEntriesPerPage);
            if (activePage > newTotalPages && newTotalPages > 0) {
                setActivePage(newTotalPages);
            } else if (newTotalPages === 0) {
                setActivePage(1);
            }
        }
    };

    /**
     * Cancels the remove action.
     */
    const cancelRemoveAgent = () => {
        setAgentToRemoveEmail(null);
        setShowConfirmation(false);
    };

    const handleSort = () => {
        if (sortMethod !== null) {
            let comparator: (a: Agent, b: Agent) => number;
            Logging.info("Sorting agents table with method: " + sortMethod);
            if (sortMethod === "First Name") {
                comparator = (a, b) => a.firstName.localeCompare(b.firstName);
            } else if (sortMethod === "Last Name") {
                comparator = (a, b) => a.lastName.localeCompare(b.lastName);
            } else if (sortMethod === "Role") {
                comparator = (a, b) => a.role.localeCompare(b.role);
            } else if (sortMethod === "Registration Time") {
                comparator = (a, b) => a.registeredTimestamp - b.registeredTimestamp;
            } else {
                return;
            }
            setIsLoading(true);
            let newSortOrder: 'asc' | 'desc' | null;
            if (sortOrder === 'asc') {
                newSortOrder = 'desc';
            } else if (sortOrder === 'desc') {
                newSortOrder = null;
            } else {
                newSortOrder = 'asc';
            }
            // todo! timeout used for simulating a wait time in the mockup
            setTimeout(() => {
                if (newSortOrder === null) {
                    setAgents(initialMockAgents);
                } else {
                    const sortedAgents = [...initialMockAgents].sort((a, b) => { // Sort initialMockAgents
                        if (newSortOrder === 'asc') {
                            return comparator(a, b);
                        } else {
                            return comparator(b, a);
                        }
                    });
                    setAgents(sortedAgents);
                }
                setSortOrder(newSortOrder);
                setIsLoading(false);
                setActivePage(1); // Reset to first page on sort
            }, 250);
        }
    };

    const totalItems = agents.length;
    const totalPages = Math.ceil(totalItems / kEntriesPerPage);
    const startIndex = (activePage - 1) * kEntriesPerPage;
    const endIndex = startIndex + kEntriesPerPage;
    const paginatedAgents = agents.slice(startIndex, endIndex);
    return (
        <Stack justify="center" className="w-full">
            <LoadingOverlay
                visible={isLoading}
                zIndex={999999}
                loaderProps={{
                    children: (
                        <Loader color="var(--primary)" className="self-start i" />
                    )
                }}
                transitionProps={{ transition: 'fade', duration: 150 }} />
            <span className="text-2xl font-semibold mb-2 text-primary-color">
                Agents Management
            </span>
            <Divider />
            <Group className="mb-0.5 w-full" align="flex-end">
                <TextInput flex={3} label="Search" placeholder="Agent Name" rightSection={<button
                    onClick={() => {
                        // todo! Add search logic here.
                        // this should not be handled from the pagination data and should directly
                        // direct the request to the server itself
                        // Remember to filter 'agents' state and reset activePage to 1
                    }}
                >
                    <Icon path={mdiMagnify} color="var(--primary)" size={1.2} />
                </button>} />
                <Select flex={3} clearable leftSection={<button onClick={() => {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    handleSort();
                }}><Icon path={sortOrder === "asc" ? mdiChevronUp : mdiChevronDown} color="var(--primary)" size={1.2} /></button>} label="Sort By" data={["First Name", "Last Name", "Role", "Registration Time"]} onChange={(selected) => {
                    if (selected) {
                        setSortMethod(selected);
                        Logging.info("SortMethod = " + selected);
                        if (sortMethod !== selected) {
                            setSortOrder('asc');
                        }
                        handleSort();
                    } else {
                        setSortMethod(null);
                        setSortOrder(null);
                        setAgents(initialMockAgents); // Revert to original if selection is cleared
                        setActivePage(1); // Reset to first page
                    }
                }} />
                <Spacer $flex={3} />
                <Menu position="bottom-start" shadow="xl" transitionProps={{ transition: 'rotate-right', duration: 180 }}>
                    <Menu.Target>
                        <Button variant="outline" color="var(--primary)">
                            <Group>
                                <Icon path={mdiExport} size={1} />
                                Export As
                            </Group>
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>
                            Export Formats
                        </Menu.Label>
                        <Menu.Item leftSection={<Icon path={mdiFileExcelBox} size={0.8} />}>
                            Microsoft Excel Spreadsheet (.xlsx)
                        </Menu.Item>
                        <Menu.Item leftSection={<Icon path={mdiFilePdfBox} size={0.8} />}>
                            PDF (.pdf)
                        </Menu.Item>
                        <Menu.Item leftSection={<Icon path={mdiCommaBox} size={0.8} />}>
                            Comma-Separated Values (.csv)
                        </Menu.Item>
                        <Menu.Item leftSection={<Icon path={mdiCommaBox} size={0.8} />}>
                            Tab-Separated Values (.tsv)
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                <Button variant='gradient'
                    onClick={newAccountFormDisclosure[1].toggle}
                    gradient={{
                        from: "var(--primary)",
                        to: "blue",
                        deg: 35
                    }}>
                    <Group>
                        <Icon path={mdiAccountPlus} size={1} />
                        Register New Account
                    </Group>
                </Button>
            </Group>
            {/* Pagination component */}
            <Pagination total={totalPages} value={activePage} onChange={setActivePage} radius="md" withEdges color="var(--primary)" />
            <Table
                horizontalSpacing="xl"
                verticalSpacing="xl"
                highlightOnHover
                styles={{
                    th: {
                        backgroundColor: "var(--primary)",
                        color: "var(--on-primary)",
                        borderRadius: "var(--border-radius)",
                        paddingTop: "1.2em",
                        paddingLeft: " 1.2em",
                        paddingRight: " 1.2em",

                        paddingBottom: "1.2em",
                    },
                }}
                withColumnBorders
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>First Name</Table.Th>
                        <Table.Th>Last Name</Table.Th>
                        <Table.Th>Email Address</Table.Th>
                        <Table.Th>Role</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Last Activity</Table.Th>
                        <Table.Th>Registered Since</Table.Th>
                        <Table.Th>Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {/* Render only the paginated agents */}
                    {paginatedAgents.map((element) => {
                        let statusElement: React.ReactNode;
                        if (element.status === "Active") {
                            statusElement = <Tags.Green>{element.status}</Tags.Green>;
                        } else if (element.status === "Pending Activation") {
                            statusElement = <Tags.Yellow>{element.status}</Tags.Yellow>;
                        } else if (element.status === "Inactive") {
                            statusElement = <Tags.Red>{element.status}</Tags.Red>;
                        } else {
                            statusElement = <Tags.Grey>{element.status}</Tags.Grey>;
                        }
                        const registeredDate = new Date(element.registeredTimestamp);
                        const registeredAgo = Math.trunc((+new Date() - +registeredDate) / 8.64e+7);
                        return (
                            <Table.Tr key={element.email}>
                                <Table.Td className="select-text">{element.firstName}</Table.Td>
                                <Table.Td className="select-text">{element.lastName}</Table.Td>
                                <Table.Td className="select-text">{element.email}</Table.Td>
                                <Table.Td className="select-text">{element.role}</Table.Td>
                                <Table.Td>{statusElement}</Table.Td>
                                <Table.Td>{ComputedStrings.getTimeAgoString(new Date(element.lastActivity))}</Table.Td>
                                <Table.Td>
                                    {
                                        registeredDate.toLocaleString("en-US", {
                                            month: "long", year: 'numeric',
                                            day: 'numeric',
                                            minute: 'numeric',
                                            hour: 'numeric',
                                        })
                                    }
                                    <br />
                                    <span className="text-[0.9em] font-light">
                                        {(() => {
                                            let timeAgoText: string;
                                            if (registeredAgo === 0) {
                                                timeAgoText = "Today";
                                            } else if (registeredAgo === 1) {
                                                timeAgoText = `${registeredAgo} day ago`;
                                            } else {
                                                timeAgoText = `${registeredAgo} days ago`;
                                            }
                                            return `(${timeAgoText})`;
                                        })()}
                                    </span>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        <Button variant="filled" color="var(--secondary)" onClick={() => handleEditAgent(element.email)} >
                                            <span className="text-on-secondary-color">
                                                Edit
                                            </span>
                                        </Button>
                                        <Divider orientation='vertical' />
                                        <Button variant="outline" color="red" onClick={() => confirmRemoveAgent(element.email)}>
                                            Remove
                                        </Button>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        );
                    })}
                </Table.Tbody>
            </Table>
            {
                <Modal
                    opened={newAccountFormDisclosure[0]}
                    centered
                    onClose={newAccountFormDisclosure[1].close}
                    title="Register New Account"
                >
                    <div className="text-sm font-light">
                        A link with setup steps will be emailed to the user. Before that, the user will be marked with
                        {" "}<Tags.Yellow>Pending Activation</Tags.Yellow>.
                    </div>
                    <Divider className="my-3" />
                    <Paper className="mb-4">
                        <Group justify="space-evenly" align="center" wrap="nowrap" className="mb-4">
                            <TextInput label="First Name" placeholder="User first name" required />
                            <TextInput label="Last Name" placeholder="User last name" required />
                        </Group>
                        <TextInput className="mb-4" label="Email" placeholder="User email" required leftSection={<Icon path={mdiAt} size={0.8} />} />
                        <Select label="Role" placeholder="User role" required searchable data={["Management", "Agent", "Support", "IT Admin"]} />
                    </Paper>
                    <Group justify="flex-end">
                        <Button variant="outline" color="var(--primary)" onClick={newAccountFormDisclosure[1].close}>
                            Cancel
                        </Button>
                        <Button color="var(--primary)" onClick={() => {
                            // todo! Add new account creation logic here.
                            // after creation, add the new agent to 'agents' state
                            // and potentially navigate to the last page if the new agent is added there.
                        }}>
                            Create
                        </Button>
                    </Group>
                </Modal>
            }
            {
                <Modal opened={showConfirmation} centered onClose={() => {
                    setShowConfirmation(false);
                }} title={<p className="text-center font-semibold mb-4 text-lg ">Are you sure you want to remove {agentToRemoveEmail}?</p>}>
                    <Group justify="center">
                        <Button variant="outline" onClick={cancelRemoveAgent}>
                            Cancel
                        </Button>
                        <Button color="red" onClick={handleRemoveAgent}>
                            Confirm Remove
                        </Button>
                    </Group>
                </Modal>
            }
        </Stack>
    );
}