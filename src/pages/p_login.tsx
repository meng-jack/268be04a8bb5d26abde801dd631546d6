import { PageLayout } from "../components/pagelayout";
import { Flex } from '@mantine/core';
import COLORS from '../shared/theme';
import { SizedBox } from '../components/basics';
import React from 'react';


export function LoginPage() {
    return (
        <PageLayout title="Login | United Aline" native={true}>
            <div className="w-full bg-[url(/city1.jpg)] bg-cover bg-no-repeat">
                <Flex direction="column" justify="center" align="center" className={`
                    bg-[${COLORS.onPrimaryFainter}]
                    w-[30rem]
                    rounded-[${COLORS.borderRadius}]
                    p-6
                `}>
                    <div className="text-[1.75rem]">Login</div>
                    <SizedBox $height="1.1rem" />
                </Flex>
            </div>
        </PageLayout>
    );
}
