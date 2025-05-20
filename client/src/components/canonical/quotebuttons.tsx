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
        color="var(--secondary)"
        onClick={() => {
            Logging.fine("User request GET_QUOTE_AX");
            navigate("/public/getquote");
        }}
    >
        <span className="text-on-secondary-color text-lg px-2.5 py-2.5">
            {strings.components.getyourquotebutton.displayText}
        </span>
    </Button >;
};

export { GetYourQuoteButtonLarge };
