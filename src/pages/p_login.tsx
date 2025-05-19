import { Flex } from '@mantine/core';
import COLORS from '../shared/theme';
import { SizedBox } from '../components/basics';
import React from 'react';


export function LoginPage() {
    document.title = "Login | United Aline";
    return (
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
    );
}
