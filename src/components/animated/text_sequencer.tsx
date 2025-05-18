import "./styles/TextSequencer.css";

import React, { useEffect, useState } from "react";

const AnimatedText = ({
    // the strings individually shown
    // it is best to make them similar length to read as the interval is FIXED
    texts,
    // interval described in milliseconds,
    interval = 5000
}: { texts: ReadonlyArray<string>, interval?: number; }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, interval);
        return () => clearInterval(timer);
    }, [texts, interval]);
    return (
        <div style={{
            position: 'relative',
            display: 'block',
            width: '100%',  
            height: '100%',
        }}>
            {texts.map((text: string, index: number) => {
                return (
                    <span
                        // no need to worry about "Do not use Array index in keys"
                        //
                        // the array is immutable
                        key={index}
                        className={`text-item ${index === currentIndex ? "active" : ""}`}
                    >
                        {text}
                    </span>
                );
            })}
        </div>
    );
};


export { AnimatedText };