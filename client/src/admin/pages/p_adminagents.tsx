import { Button, Divider, Group, ScrollArea, Stack, Table } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import mock from "../../assets/mock_strings.json";
import { Tags } from '../components/tag';
interface Agent {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
}
const initialMockAgents: Agent[] = Array.from(mock.agents);
export default function AdminAgentsPage() {
    const [agents, setAgents] = useState<Agent[]>(initialMockAgents);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [agentToRemoveEmail, setAgentToRemoveEmail] = useState<string | null>(null);

    useEffect(() => {
        document.title = "Manage Agents | United Aline";
    }, []);

    /**
     * Handles the edit action for an agent.
     * For demonstration, it toggles the agent's status between 'Active' and 'Inactive'.
     * In a real application, this would typically open an edit modal or navigate to an edit page.
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
        }
    };

    /**
     * Cancels the remove action.
     */
    const cancelRemoveAgent = () => {
        setAgentToRemoveEmail(null);
        setShowConfirmation(false);
    };


    return (
        <Stack justify="center" className="w-full">
            <span className="text-2xl font-semibold mb-2 text-primary-color">
                Agents Management
            </span>
            <Group gap="0">
                <ScrollArea className="w-full h-[80dvh]" offsetScrollbars>
                    <Table
                        horizontalSpacing="xl"
                        verticalSpacing="xl"
                        striped
                        highlightOnHover
                        withColumnBorders
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>First Name</Table.Th>
                                <Table.Th>Last Name</Table.Th>
                                <Table.Th>Email Address</Table.Th>
                                <Table.Th>Role</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {agents.map((element) => {
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

                                return (
                                    <Table.Tr key={element.email}>
                                        <Table.Td>{element.firstName}</Table.Td>
                                        <Table.Td>{element.lastName}</Table.Td>
                                        <Table.Td>{element.email}</Table.Td>
                                        <Table.Td>{element.role}</Table.Td>
                                        <Table.Td>{statusElement}</Table.Td>
                                        <Table.Td>
                                            <Group gap="xs">
                                                <Button variant="filled" onClick={() => handleEditAgent(element.email)}>
                                                    Edit
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
                </ScrollArea>
            </Group>
            {showConfirmation && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to remove {agentToRemoveEmail}?</p>
                        <Group justify="center">
                            <Button variant="outline" onClick={cancelRemoveAgent}>
                                Cancel
                            </Button>
                            <Button color="red" onClick={handleRemoveAgent}>
                                Confirm Remove
                            </Button>
                        </Group>
                    </div>
                </div>
            )}
        </Stack>
    );
}
