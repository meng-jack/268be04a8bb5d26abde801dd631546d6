import { Stack } from '@mantine/core';
import React from 'react';

export default function DashboardPage() {
    document.title = "Dashboard | United Aline";
    return (
        <Stack justify="flex-start">
            <span>
                Dashboard
            </span>
        </Stack>
    );
}