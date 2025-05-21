import { mdiAccountMultiple, mdiFileEdit, mdiFolderInformation, mdiHome, mdiServerSecurity, mdiShieldAccount } from '@mdi/js';
import React from 'react';
import DashboardPage from '../pages/p_dashboard';
import { QuotesPage } from '../pages/p_quotes';
import AdminAgentsPage from '../pages/p_adminagents';
import AdminSystemConfigurationPage from '../pages/p_adminsysconfig';
import { ResourcesPage } from '../pages/p_resources';
import ClientsPage from '../pages/p_clients';

export namespace AdminPageBundles {
    export interface NavSideLink {
        id: string;
        labelIcon: string;
        label: string;
        singleRef: string;
        child: React.ReactNode;
    }

    // represents general agent access (shown to registered agents)
    //
    // order is maintained visually
    export const BranchLinks: ReadonlyArray<NavSideLink> = [
        {
            id: "dashboard_nav",
            labelIcon: mdiHome,
            label: "Dashboard",
            singleRef: "dashboard",
            child: <DashboardPage />
        },
        {
            id: "quotes_nav",
            labelIcon: mdiFileEdit,
            label: "Quotes",
            singleRef: "quotes",
            child: <QuotesPage />
        },
        {
            id: "clients_nav",  
            labelIcon: mdiAccountMultiple,
            label: "Clients",
            singleRef: "clients",
            child: <ClientsPage />
        },
        {
            id: "resources_nav",
            labelIcon: mdiFolderInformation,
            label: "Resources",
            singleRef: "resources",
            child: <ResourcesPage />
        },
        // {
        //     id: "policies_nav",
        //     labelIcon: mdiScript,
        //     label: "Policies",
        //     child: (<div className="bg-yellow-400 text-4xl flex align-center justify-center">Policies</div>)
        // },
        // {
        //     id: "companies_nav",
        //     labelIcon: mdiHandshake,
        //     label: "Companies & Partners",
        //     child: (<div className="bg-pink-400 text-4xl flex align-center justify-center">Companies & Partners</div>)
        // },
    ];

    // represents admin access (shown to admins)
    // shown under normal nav side links and have a different icon color
    // this is represented as single page
    export const AdminNavSideLinks: ReadonlyArray<NavSideLink> = [
        {
            id: "admin_agents_nav",
            labelIcon: mdiShieldAccount,
            label: "Manage Agents",
            singleRef: "adminagents",
            child: <AdminAgentsPage />
        },
        {
            id: "admin_sysconfig_nav",
            labelIcon: mdiServerSecurity,
            label: "Portal Management",
            singleRef: "adminsysconfig",
            child: <AdminSystemConfigurationPage />
        }
    ];
}