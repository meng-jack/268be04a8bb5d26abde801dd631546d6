import React from "react";
import { SecondaryButton } from "../buttons";

/**
 * @returns Quotes button Large, should be shown where it needs big prominence
 */
const GetYourQuoteButtonLarge = () => (
    <SecondaryButton
        onClick={() => {
            // TODO: redirect them here to the get a quote web page
        }}
        style={{
            paddingTop: "1.2rem",
            paddingBottom: "1.2rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
        }}
    >
        <strong
            style={{
                fontSize: "1.4em",
            }}
        >
            Get Your Quote
        </strong>
    </SecondaryButton>
);

export { GetYourQuoteButtonLarge };
