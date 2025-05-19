import React from 'react';

interface EdgeBlurredImageProps {
    imageUrl: string;
    altText?: string;
    width?: string | number;
    edge?: string;
    height?: string | number;
    blurRadius?: string;
}

export default function EdgeBlurredImage({
    imageUrl,
    altText = '',
    width = '100%',
    edge = "12%",
    height = '100%',
    blurRadius = '34px',
}: Readonly<EdgeBlurredImageProps>) {
    return (
        <div className={`relative w-[${width}] h-[${height}]`}>
            <img className="absolute top-0 left-0 w-full h-full overflow-hidden object-cover z-20" src={imageUrl} alt={altText} />
            <img className={`
                absolute
                top-0
                left-0
                w-[${edge}]
                opacity-65
                h-full
                blur-[${blurRadius}]
                -translate-x-1/2
                z-10
                scale-x-1
                translate-x-[-20px]
                object-cover
                object-left
            `} alt={altText} src={imageUrl} />
        </div>
    );
};
