import { Checkbox, CheckboxChangeEvent, Flex } from 'antd';
import React from 'react';

export function InformationalCheckbox({ title, subtitle = undefined, onChange, checked = undefined, disabled = undefined, indeterminate = undefined }: Readonly<{ title: React.ReactNode, subtitle?: React.ReactNode, onChange: (e: CheckboxChangeEvent) => void, checked?: boolean, disabled?: boolean, indeterminate?: boolean; }>) {
    return (
        <Checkbox onChange={onChange} checked={checked} disabled={disabled} indeterminate={indeterminate}>
            <Flex vertical={true}>
                {title}
                {subtitle}
            </Flex>
        </Checkbox>
    );
}