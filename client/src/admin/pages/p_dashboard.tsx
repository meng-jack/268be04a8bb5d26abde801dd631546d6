import { ScrollArea, Stack } from '@mantine/core';
import Icon from '@mdi/react';
import React from 'react';



export default function DashboardPage() {
    return (
        <ScrollArea>
            <Stack justify="flex-start" className="overflow-auto">
                <span>
                    Dashboard
                </span>
            </Stack>
        </ScrollArea>
    );
}