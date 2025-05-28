import {
    mdiAccountGroupOutline,
    mdiAccountHardHatOutline,
    mdiAccountTieOutline,
    mdiBullhornOutline,
    mdiCogOutline,
    mdiFileCabinet,
    mdiFileCertificateOutline,
    mdiFileDocumentOutline,
    mdiHandshakeOutline,
    mdiScaleBalance,
    mdiSchoolOutline,
    mdiShieldAccountVariantOutline,
    mdiViewDashboard,
} from "@mdi/js";
import React from "react";
import DashboardPage from "../pages/p_dashboard";
import { LeadsPage } from "../pages/p_quotes";
import AdminAgentsPage from "../pages/p_adminagents";
import AdminSystemConfigurationPage from "../pages/p_adminsysconfig";
import ClientsPage from "../pages/p_clients";
import { AlertsPage } from "../pages/p_alerts";

export namespace AdminPageBundles {
    export interface NavSideLink {
        id: string;
        labelIcon: string;
        label: string;
        singleRef: string;
        child: React.ReactNode;
    }

    export interface ExpandableNavSideLink {
        id: string;
        labelIcon: string;
        label: string;
        links: ReadonlyArray<NavSideLink>;
    }

    // top level items
    export const TopLinks: ReadonlyArray<NavSideLink> = [
        {
            id: "dashboard_nav",
            labelIcon: mdiViewDashboard,
            label: "Dashboard",
            singleRef: "dashboard",
            child: <DashboardPage />,
        },
        {
            id: "alerts_nav",
            labelIcon: mdiBullhornOutline,
            label: "Alerts",
            singleRef: "alerts",
            child: <AlertsPage />,
        },
    ];

    // represents general agent access (shown to registered agents)
    //
    // order is maintained visually
    export const BranchLinks: ReadonlyArray<NavSideLink | ExpandableNavSideLink> =
        [
            {
                id: "policies_nav",
                labelIcon: mdiFileCertificateOutline,
                label: "Policies",
                singleRef: "policies",
                child: <></>,
            },
            {
                id: "claims_nav",
                labelIcon: mdiScaleBalance,
                label: "Claims",
                singleRef: "claims",
                child: <></>,
            },
            {
                id: "carriers_nave",
                labelIcon: mdiHandshakeOutline,
                label: "Carriers",
                singleRef: "carriers",
                child: <></>,
            },
            {
                id: "leads_nav",
                labelIcon: mdiAccountTieOutline,
                label: "Leads",
                singleRef: "leads",
                child: <LeadsPage />,
            },
            {
                id: "clients_nav",
                labelIcon: mdiAccountGroupOutline,
                label: "Clients",
                singleRef: "clients",
                child: <ClientsPage />,
            },
            {
                id: "resources_nav",
                labelIcon: mdiFileCabinet,
                label: "Resources",
                links: [
                    {
                        id: "res_training_nav",
                        labelIcon: mdiSchoolOutline,
                        label: "Training",
                        singleRef: "resources/training",
                        child: <></>,
                    },
                    {
                        id: "res_formsndocs_nav",
                        labelIcon: mdiFileDocumentOutline,
                        label: "Forms & Documents",
                        singleRef: "resources/documents",
                        child: <></>,
                    },
                    {
                        id: "res_it_support_nav",
                        labelIcon: mdiAccountHardHatOutline,
                        label: "IT Support",
                        singleRef: "resources/itsupport",
                        child: <></>,
                    },
                ],
            },
        ];

    // represents admin access (shown to admins)
    // shown under normal nav side links and have a different icon color
    // this is represented as single page
    export const AdminNavSideLinks: ReadonlyArray<NavSideLink> = [
        {
            id: "admin_agents_nav",
            labelIcon: mdiShieldAccountVariantOutline,
            label: "Manage Agents",
            singleRef: "adminagents",
            child: <AdminAgentsPage />,
        },
        {
            id: "admin_sysconfig_nav",
            labelIcon: mdiCogOutline,
            label: "Portal Management",
            singleRef: "adminsysconfig",
            child: <AdminSystemConfigurationPage />,
        },
    ];
}
