import React, { useState, useEffect, useCallback } from 'react';
import { Loader, Text, Stack, Flex, type LoaderProps } from '@mantine/core';

interface AsyncContentLoaderProps {
    asyncOperation: () => Promise<any>;
    children: (data: any) => React.ReactNode;
    loadingMessage?: string;
    errorComponent?: (error: Error) => React.ReactNode;
    loaderProps?: LoaderProps;
    minHeight?: string | number;
}

/**
 * reusable component that displays a loader in the content's space while an asynchronous operation is running,
 * and then renders its children with the resolved data.
 */
export default function AsyncContentLoader({
    asyncOperation,
    children,
    loadingMessage,
    errorComponent,
    loaderProps,
    minHeight = '200px',
}: Readonly<AsyncContentLoaderProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<any>(null);
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setData(null);
        try {
            const result = await asyncOperation();
            setData(result);
        } catch (err: any) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [asyncOperation]);
    useEffect(() => {
        fetchData();
    }, [fetchData]); // eslint-disable-line react-hooks/exhaustive-deps
    if (error) {
        return errorComponent ? errorComponent(error) : (
            <Flex justify="center" align="center" style={{ minHeight: minHeight }}>
                <Text c="red" ta="center" p="md">
                    Error loading content: {error.message || 'An unknown error occurred.'}
                </Text>
            </Flex>
        );
    }
    if (isLoading) {
        return (
            <Flex justify="center" align="center" style={{ minHeight: minHeight }}>
                <Stack align="center" gap="xs">
                    <Loader {...loaderProps} />
                    {loadingMessage && <Text size="sm" c="dimmed">{loadingMessage}</Text>}
                </Stack>
            </Flex>
        );
    }
    return <>{children(data)}</>;
}