import { Header } from 'antd/es/layout/layout';
import React, { ReactNode, useState } from 'react';
import { isMd } from '../shared/responsive_queries';
import COLORS from '../shared/theme';
import { PageLayout } from '../components/pagelayout';
import { Checkbox, Flex, Steps } from 'antd';
import { LogoHorizontal } from '../components/navheader';
import { CompassOutlined, ContactsOutlined, CustomerServiceOutlined, PhoneOutlined, QuestionOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import strings from "../assets/strings.json";
import { DisplayAtLeastMd } from '../components/responsive';
import { DocHeader3, SizedBox } from '../components/basics';

interface FormPageItem {
    key: string;
    title: ReactNode;
    subtitle?: ReactNode;
    icon?: ReactNode;
    children: ReactNode;
}

function CheckboxTitle({ children }: Readonly<{ children: ReactNode; }>) {
    return <div style={{
        fontSize: "1.2em",
        fontWeight: "bold"
    }}>{children}</div>;
}

const Pages: ReadonlyArray<FormPageItem> = [
    {
        key: "products_needed",
        title: strings.pages.getquote.stepsdisplay.productsneeded,
        icon: <QuestionOutlined />,
        children: (
            <Flex vertical={true} gap="0">
                <h2>
                    {strings.pages.getquote.steps.productsneeded.title}
                </h2>
                <Flex vertical={true} align="flex-start" justify="flex-start" gap="1.2em">
                    <Checkbox>
                        <CheckboxTitle>Professional Liability (E&O)</CheckboxTitle>
                    </Checkbox>
                    <Checkbox>
                        <CheckboxTitle>General Liability</CheckboxTitle>
                    </Checkbox>
                    <Checkbox>
                        <CheckboxTitle>Business Owners' Policy (BOP)</CheckboxTitle>
                    </Checkbox>
                    <Checkbox>
                        <CheckboxTitle>Cyber Liability</CheckboxTitle>
                    </Checkbox>
                    <Checkbox>
                        <CheckboxTitle>Workers' Compensation</CheckboxTitle>
                    </Checkbox>
                    <Checkbox>
                        <CheckboxTitle>Commercial Bonds</CheckboxTitle>
                    </Checkbox>
                    <Checkbox>
                        <Flex vertical={false}> <CustomerServiceOutlined /><SizedBox width="0.4em" /><CheckboxTitle>Speak with a licensed agent</CheckboxTitle>
                        </Flex></Checkbox>
                </Flex>
            </Flex>)
    },
    {
        key: "zip_code",
        title: strings.pages.getquote.stepsdisplay.zipcode,
        icon: <CompassOutlined />,
        children: (<p>Zip Code</p>)
    },
    {
        key: "user_business",
        title: strings.pages.getquote.stepsdisplay.yourbusiness,
        icon: <ShopOutlined />,
        children: (<p>Your Business</p>)
    },
    {
        key: "user_info",
        title: strings.pages.getquote.stepsdisplay.yourinformation,
        icon: <UserOutlined />,
        children: (<p>Your Information</p>)
    },
    {
        key: "user_contact",
        title: strings.pages.getquote.stepsdisplay.contactinformation,
        icon: <ContactsOutlined />,
        children: (<p>Contact Information</p>)
    }
];

export function GetQuotePage(): ReactNode {
    // short hand function
    function findPageIndex(key: string): number {
        return Pages.findIndex((element: FormPageItem) => element.key === key);
    }
    // short hand function
    function findPage(key: string): FormPageItem | undefined {
        return Pages.find((element: FormPageItem) => element.key === key);
    }
    // represents at what stage the user is currently on in the form
    // it is used by both the steps (from antd) and the pageview
    const [current, setCurrent] = useState(0);
    const md = isMd();
    return (<PageLayout title={strings.pages.getquote.title} native={false} header={
        <Header
            style={{
                color: COLORS.onPrimary,
                backgroundColor: COLORS.primary,
            }}
        >
            <Flex vertical={false} align="center" justify='center' wrap="nowrap">
                <LogoHorizontal />
                <Flex align="center" style={{
                    top: "50%"
                }}>
                    <a
                        href={`tel: ${strings.canonical.telephoneNumber}`}>
                        <PhoneOutlined style={{ paddingRight: "0.15em", fontSize: md ? "1.2em" : "1.6em" }} />
                    </a>
                    <DisplayAtLeastMd>
                        <a
                            href={`tel: ${strings.canonical.telephoneNumber}`}
                            style={{
                                color: COLORS.onPrimary,
                                fontWeight: "600",
                                fontSize: "1.2em",
                            }}
                        >
                            {strings.canonical.telephoneNumber}
                        </a>
                    </DisplayAtLeastMd>
                </Flex>
            </Flex>
        </ Header>
    }>
        <Flex vertical={true} justify='center' align='center' style={{
            paddingTop: "1.8rem"
        }}>
            <Steps current={current}
                direction={md ? 'horizontal' : 'vertical'}
                onChange={(value) => {
                    setCurrent(value);
                }}
                labelPlacement='vertical'
                items={Pages.map((value) => ({
                    title: value.title,
                    subtitle: value.subtitle,
                    icon: value.icon,
                }))}>
            </Steps>
            <SizedBox height="1.6rem" />
            {Pages[current].children}
        </Flex>
    </PageLayout >);
}