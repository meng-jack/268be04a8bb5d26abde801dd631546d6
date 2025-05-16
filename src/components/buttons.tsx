import { Button } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React from "react";
import "./Styles/SecondaryButton.css"; // Import your custom CSS file

interface CustomButtonProp {
    onClick: () => void;
    size?: SizeType;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

export function SecondaryButton({
    onClick,
    size = "middle",
    style,
    children,
}: Readonly<CustomButtonProp>) {
    return (
        <Button
            className="secondary-button"
            type="primary"
            onClick={onClick}
            size={size}
            style={style}
        >
            {children}
        </Button>
    );
}
