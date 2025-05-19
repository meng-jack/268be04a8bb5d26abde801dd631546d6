import { Stack } from '@mantine/core';
import React from 'react';
import Icon from '@mdi/react';
import { mdiAlert } from '@mdi/js';

export function NoPage404Page() {
    document.title = "404 | United Aline";
    return (
        <Stack justify='center' align='center' className="pt-30 text-center px-10">
            <Icon path={mdiAlert} size="6.8em" />
            <span className="text-6xl">
                404
            </span>
            <span className="text-xl">
                Oops! The page you're looking for could not be found.
            </span>
        </Stack>
    );
}