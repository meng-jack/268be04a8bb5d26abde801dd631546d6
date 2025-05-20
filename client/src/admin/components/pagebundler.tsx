import React from 'react';

export function PageBundler({ children }) {
    return (
        <div className="md:px-[4rem] px-[2.5rem] pt-[1.8rem]">
            {children}
        </div>
    );
}