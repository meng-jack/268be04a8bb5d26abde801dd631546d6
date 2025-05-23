import React from 'react';

export namespace Tags {
    export function Green({ children }) {
        return (<span className={`
                    px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800`}>
            {children}
        </span>);
    }

    export function Yellow({ children }) {
        return (<span className={`
                    px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-200 text-yellow-800`}>
            {children}
        </span>);
    }

    export function Red({ children }) {
        return (<span className={`
                    px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800`}>
            {children}
        </span>);
    }

    export function Grey({ children }) {
        return (<span className={`
                    px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-300 text-gray-800`}>
            {children}
        </span>);
    }
};