import React from "react";
import { PageLayout } from "../components/pagelayout";
import { DocHeader3 } from "../components/basics";

export function AboutPage() {
    return (
        <PageLayout title="About | United Aline">
            <div
                style={{
                    paddingTop: "5rem",
                }}
            >
                <DocHeader3>Office Locations</DocHeader3>
                <strong>United Aline Head Office</strong>
            </div>
        </PageLayout>
    );
}
