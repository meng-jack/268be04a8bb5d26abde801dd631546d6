import { Stack } from '@mantine/core';
import React from 'react';
import { ComputedStrings } from "../../shared/canonical_strings";
import mock from "../../assets/mock_strings.json";

export default function DashboardPage() {
    document.title = "Dashboard | United Aline";
    return (
        <Stack justify="flex-start">
            <div className="text-primary-color text-2xl">
                <span className="font-semibold">
                    {ComputedStrings.getTimeBasedGreeting()}
                </span>
                {" "}{mock.user.firstName},
            </div>
            
        </Stack>
    );
}