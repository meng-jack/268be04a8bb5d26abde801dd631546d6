import { Badge, Card, Divider, Group, Pagination, Paper, SimpleGrid, Skeleton, Stack, Tabs } from '@mantine/core';
import React, { useEffect, useMemo, useState } from 'react';
import { Spacer } from '../../components/basics';
import mock from "../../assets/mock_strings.json";
import { hashCode } from '../../utils/strings';
import Icon from '@mdi/react';
import { mdiAlert, mdiAlertOutline, mdiInformation } from '@mdi/js';

export interface InternalAlertStruct {
    level: string;
    title: string;
    content: string;
    timestamp: number;
    category: string;
}

const kAlertPerPage: number = 10;
async function fetchAlerts(
    offset: number,
    limit: number,
    category: string | null
): Promise<ReadonlyArray<InternalAlertStruct>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredAlerts = [...mock.alerts];
            if (category && category !== 'All') {
                filteredAlerts = filteredAlerts.filter(alert => alert.category === category);
            }
            const sortedAlerts = filteredAlerts.sort((a, b) => {
                return b.timestamp - a.timestamp;
            });
            const paginatedAlerts = sortedAlerts.slice(offset, offset + limit);
            resolve(paginatedAlerts);
        }, 1500);
    });
}

async function fetchAlertsTotalCount(category: string | null): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredAlerts = [...mock.alerts];
            if (category && category !== 'All') {
                filteredAlerts = filteredAlerts.filter(alert => alert.category === category);
            }
            resolve(filteredAlerts.length);
        }, 300);
    });
}

interface AlertCardProps {
    alert: InternalAlertStruct;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
    let color: string;
    let icon: React.ReactNode;
    switch (alert.level) {
        case 'info':
            color = 'blue';
            icon = <Icon path={mdiInformation} size={1} />;
            break;
        case 'warn':
            color = 'orange';
            icon = <Icon path={mdiAlertOutline} size={1} />;
            break;
        case 'urgent':
            color = 'red';
            icon = <Icon path={mdiAlert} size={1} />;
            break;
        default:
            color = 'gray';
            icon = <Icon path={mdiInformation} size={1} />;
            break;
    }
    const date = new Date(alert.timestamp * 1000);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    return (
        <div className="border-1 p-2 rounded-(--border-radius) border-surface-color">
            <Group justify="space-between" mb="xs" align={"flex-start border-" + color}>
                <span style={{ flexGrow: 1 }}>{alert.title}</span>
                <Badge color={color} leftSection={icon} variant="light" size="lg">
                    {alert.level.toUpperCase()}
                </Badge>
            </Group>
            {alert.content}
            <br />
            <br />
            <span className="text-sm">
                Posted: {formattedDate}
            </span>
        </div >
    );
};


export function AlertsPage() {
    const [alerts, setAlerts] = useState<ReadonlyArray<InternalAlertStruct>>([]);
    const [totalAlertsCount, setTotalAlertsCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeCategory, setActiveCategory] = useState<string | null>('All');
    const categories = useMemo(() => {
        const uniqueCategories = new Set<string>();
        mock.alerts.forEach(alert => uniqueCategories.add(alert.category));
        return ['All', ...Array.from(uniqueCategories).sort()];
    }, []);
    useEffect(() => {
        const getCount = async () => {
            try {
                setLoading(true);
                const count = await fetchAlertsTotalCount(activeCategory);
                setTotalAlertsCount(count);
                setCurrentPage(1);
            } catch (error) {
                console.error("Failed to fetch total alerts count:", error);
            }
        };
        getCount();
    }, [activeCategory]);
    useEffect(() => {
        const getAlertsForPage = async () => {
            setLoading(true);
            const offset = (currentPage - 1) * kAlertPerPage;
            const limit = kAlertPerPage;
            try {
                const fetchedPageAlerts = await fetchAlerts(offset, limit, activeCategory);
                setAlerts(fetchedPageAlerts);
            } catch (error) {
                console.error("Failed to fetch alerts for page:", error);
            } finally {
                setLoading(false);
            }
        };

        getAlertsForPage();
    }, [currentPage, activeCategory]);
    const totalPages = useMemo(() => {
        return Math.ceil(totalAlertsCount / kAlertPerPage);
    }, [totalAlertsCount, kAlertPerPage]);
    return (
        <Stack justify="flex-start">
            <Group justify="space-between" align="center" mb="md">
                <span className="text-3xl font-bold text-primary-color">
                    Alerts
                </span>
                <Spacer />
                {!loading && totalAlertsCount > 0 && totalPages > 1 && (
                    <Pagination
                        total={totalPages}
                        value={currentPage}
                        onChange={setCurrentPage}
                        color="var(--primary)"
                        withEdges
                        size="md"
                    />
                )}
            </Group>
            <Tabs value={activeCategory} onChange={setActiveCategory} color="var(--primary)">
                <Tabs.List>
                    {categories.map((category) => (
                        <Tabs.Tab key={category} value={category}>
                            {category}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>
            </Tabs>

            <Divider my="sm" />

            {loading ? (
                <SimpleGrid cols={2} spacing="md">
                    {[...Array(kAlertPerPage)].map((_, index) => (
                        <Card key={index} withBorder shadow="sm" radius="md" p="md">
                            <Skeleton height={20} width="70%" mb="xs" />
                            <Skeleton height={10} width="30%" mb="md" />
                            <Skeleton height={10} />
                        </Card>
                    ))}
                </SimpleGrid>
            ) : alerts.length > 0 ? (
                <SimpleGrid cols={2} spacing="md">
                    {alerts.map((alert) => (
                        <AlertCard
                            key={hashCode(`${alert.timestamp}-${alert.title}-${alert.category}`)}
                            alert={alert}
                        />
                    ))}
                </SimpleGrid>
            ) : (
                <Paper p="md" shadow="xs" withBorder>
                    No announcements found for "{activeCategory}" category.
                </Paper>
            )}

            <Group justify="flex-end" mt="lg">
                {!loading && totalAlertsCount > 0 && totalPages > 1 && (
                    <Pagination
                        total={totalPages}
                        value={currentPage}
                        onChange={setCurrentPage}
                        color="var(--primary)"
                        withEdges
                        size="md"
                    />
                )}
            </Group>
        </Stack>
    );
}