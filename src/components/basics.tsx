import React from "react";

const SizedBox = ({ width = "0px", height = "0px" }) => (
    <div style={{ width: width, height: height }}></div>
);

const DocHeader1 = ({ children }: { children: React.ReactNode }) => (
    <h1
        style={{
            fontSize: "3rem",
            fontFamily: "Monsterrat",
            marginBottom: "2.5rem",
            lineHeight: "1.2",
            fontWeight: "600",
        }}
    >
        {children}
    </h1>
);

const DocHeader2 = ({ children }: { children: React.ReactNode }) => (
    <h2
        style={{
            fontSize: "2.6rem",
            fontFamily: "Monsterrat",
            marginBottom: "2rem",
            marginTop: "2rem",
            fontWeight: "500",
        }}
    >
        {children}
    </h2>
);

const DocHeader3 = ({ children }: { children: React.ReactNode }) => (
    <h3
        style={{
            fontSize: "2.4rem",
            fontFamily: "Monsterrat",
            marginBottom: "2rem",
            marginTop: "2rem",
            fontWeight: "500",
        }}
    >
        {children}
    </h3>
);

export { SizedBox, DocHeader1, DocHeader2, DocHeader3 };
