import { Group } from '@mantine/core';
import { mdiLifebuoy } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';

export function NavHeader() {
    return (
        <header className="bg-primary-color py-[1em] text-on-primary-color px-[2.5rem] md:px-[4rem]">
            <Group align="center" justify="flex-start" >
                <span className="text-3xl font-semibold">
                    United Aline
                </span>
                <Group align="center" justify='center' gap="0.2em">
                    <Icon path={mdiLifebuoy} size="1em" />
                    <span className="text-md font-normal">
                        Dashboard
                    </span>
                </Group>
            </Group>
        </header >
    );
}