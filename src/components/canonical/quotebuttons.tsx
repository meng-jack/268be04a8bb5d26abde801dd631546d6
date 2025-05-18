import React from "react";
import { SecondaryButton } from "../buttons";
import { Logging } from '../../shared/logger.ts';
import { useNavigate } from 'react-router-dom';
import strings from "../../assets/strings.json";
/**
 * @returns Quotes button Large, should be shown where it needs big prominence
 */
const GetYourQuoteButtonLarge = ({ width, fontSize, height }: Readonly<{
    width?: string; fontSize?: string; height?: string;
}>) => {
    const navigate = useNavigate();
    return <SecondaryButton
        onClick={() => {
            Logging.fine("User request GET_QUOTE_AX");
            navigate("/getquote");
        }}
        style={{
            paddingTop: "1.2rem",
            paddingBottom: "1.2rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            width: width,
            height: height
        }}
    >
        <strong
            style={{
                fontSize: fontSize ?? "1.4em",
            }}
        >
            {strings.components.getyourquotebutton.displayText}
        </strong>
    </SecondaryButton >;
};

export { GetYourQuoteButtonLarge };
