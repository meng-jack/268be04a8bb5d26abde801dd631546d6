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
        <div style={{
            position: 'relative',
            width: width,
            height: height
        }}>
            <img style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                overflow: "hidden",
                height: '100%',
                objectFit: 'cover',
                zIndex: '2'
            }} src={imageUrl} alt={altText} />
            <img style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: edge,
                opacity: "0.65",
                height: '100%',
                filter: `blur(${blurRadius}) translate(-50%)`,
                zIndex: '1',
                transform: 'scaleX(1) translateX(-20)',
                objectFit: 'cover',
                objectPosition: 'left',
            }} alt={altText} src={imageUrl} />
        </div>
    );
};
