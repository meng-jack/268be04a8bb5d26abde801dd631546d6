import React from "react";
import { Logging } from '../../shared/logger.ts';
import { useNavigate } from 'react-router-dom';
import strings from "../../assets/strings.json";
import { Button } from '@mantine/core';
/**
 * @returns Quotes button Large, should be shown where it needs big prominence
 */
const GetYourQuoteButtonLarge = () => {
    const navigate = useNavigate();
    return <Button
        onClick={() => {
            Logging.fine("User request GET_QUOTE_AX");
            navigate("/getquote");
        }}
        styles={{
            root: {
                backgroundColor: "var(--secondary)",
                color: "var(--on-secondary)",
                boxShadow: "none",
                paddingLeft: "2.4rem",
                paddingRight: "2.4rem",
                paddingTop: "1.6rem",
                paddingBottom: "1.6rem"
            },
            label: {
                color: "var(--on-secondary)"
            }
        }}
    >
        <div
            className="text-on-secondary-color text-[1.2em]"
        >
            {strings.components.getyourquotebutton.displayText}
        </div>
    </Button >;
};

export { GetYourQuoteButtonLarge };
