import React from "react";
import { DocHeader3 } from "../components/basics";
import strings from "../assets/strings.json";
export function AboutPage() {
    document.title = strings.pages.about.title;
    return (
        <div
            style={{
                paddingTop: "5rem",
            }}
        >
            <DocHeader3>{strings.pages.about.officelocations}</DocHeader3>
            <strong>{strings.pages.about.unitedalineheadoffice}</strong>
        </div>
    );
}
