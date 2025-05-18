import React from "react";
import { PageLayout } from "../components/pagelayout";
import { DocHeader3 } from "../components/basics";
import strings from "../assets/strings.json";
export function AboutPage() {
    return (
        <PageLayout title={strings.pages.about.title} native={false}>
            <div
                style={{
                    paddingTop: "5rem",
                }}
            >
                <DocHeader3>{strings.pages.about.officelocations}</DocHeader3>
                <strong>{strings.pages.about.unitedalineheadoffice}</strong>
            </div>
        </PageLayout>
    );
}
