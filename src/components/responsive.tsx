import React from "react";
import MediaQuery from "react-responsive";

const DisplayAtLeastMd = ({ children }: { children: React.ReactNode }) => (
    <MediaQuery minWidth={768}>{children}</MediaQuery>
);

const DisplayUntilMd = ({ children }: { children: React.ReactNode }) => (
    <MediaQuery maxWidth={767}>{children}</MediaQuery>
);

export { DisplayAtLeastMd, DisplayUntilMd };
