import React, { ReactNode, useState } from 'react';
import { Autocomplete, Button, Checkbox, Flex, Group, Modal, ScrollArea, Stack, Stepper, TextInput } from '@mantine/core';
import strings from "../assets/strings.json";
import { SizedBox } from '../components/basics';
import Icon from '@mdi/react';
import { mdiAccount, mdiChevronLeft, mdiChevronRight, mdiDomain, mdiHandshakeOutline, mdiHelp, mdiMapMarker, mdiPhone } from '@mdi/js';
import styled from 'styled-components';
import COLORS from '../shared/theme';
import { useDisclosure } from '@mantine/hooks';

interface FormPageItem {
    key: string;
    title: ReactNode;
    subtitle?: ReactNode;
    icon?: ReactNode;
    children: ReactNode;
}

function CheckboxLabel({ children }) {
    return <div className="text-[1.4em] pl-[1em]">{children}</div>;
}

// internal checkbox extension representation
function Chbx({ label, descriptionChild }: Readonly<{ label: string | undefined | React.ReactNode, descriptionChild?: React.ReactNode; }>) {
    const ch = <Checkbox autoContrast={true} label={label}></Checkbox>;
    const [opened, { open, close }] = useDisclosure(false);
    if (descriptionChild !== undefined) {
        return (
            <>
                <Modal opened={opened} onClose={close}>
                    {descriptionChild}
                </Modal>
                <Group align="center" gap="0">
                    {ch}
                    <Button onClick={open} variant="white">
                        <Icon path={mdiHelp} size="1rem" />
                    </Button>
                </Group>
            </>
        );
    } else {
        return ch;
    }
}

const PageTitle = styled.text`
    font-size: 3em;
    text-align: center;
    margin-bottom: 16;
`;

const Pages: ReadonlyArray<FormPageItem> = [
    {
        key: "products_needed",
        title: strings.pages.getquote.stepsdisplay.productsneeded,
        icon: <Icon path={mdiHelp} size="1.6em" />,
        children: (
            <Stack >
                <PageTitle>
                    {strings.pages.getquote.steps.productsneeded.title}
                </PageTitle>
                <form>
                    <Stack gap="2.2em" justify="center">
                        <Chbx
                            descriptionChild={
                                <div className="text-md block">
                                    The long-term viability of your company can be jeopardized by simple, everyday tasks. Businesses are more vulnerable than ever to actions brought against them by their clients due to errors made, or errors which the client perceives were made. Mistakes can be extremely costly to a corporation, and very frequently, the corporation is asked to pay for the mistake. Even if there was no mistake, the cost to defend oneself can create a substantial expense.
                                </div>
                            }
                            label={<CheckboxLabel>Professional Liability (E&O)</CheckboxLabel>} />
                        <Chbx
                            descriptionChild={
                                <div className="text-md block">
                                    General Liability Insurance is coverage that pertains to, for the most part, claims arising from the insured's liability for injuries or damage caused by ownership of property, manufacturing operations, contracting operations, sale or distribution of products, the operation of machinery, or professional services.
                                </div>
                            }
                            label={<CheckboxLabel>General Liability</CheckboxLabel>} />
                        <Chbx
                            descriptionChild={
                                <div className="text-md block">
                                    A Business Owner's Policy is a package policy designed for small businesses, to protect its buildings and contents against direct loss while offering protection against losses arising from liability and loss of business income.
                                </div>
                            }
                            label={<CheckboxLabel>Business Owners' Policy (BOP)</CheckboxLabel>} />
                        <Chbx
                            descriptionChild={
                                <div className="text-md block">
                                    With the widespread use of internet technologies, cyber security is becoming increasingly important as a means of protecting business and client information. In the unfortunate case of security failure or data breaches, your business could not only lose its valuable information, but find its reputation harmed as well. With Cyber Liability, you can quickly recuperate your losses, and cover the legal and investigative fees necessary to maintain the integrity of your business.
                                </div>
                            }
                            label={<CheckboxLabel>Cyber Liability</CheckboxLabel>} />
                        <Chbx
                            descriptionChild={
                                <div className="text-md block">
                                    Workers' Compensation is a system established under state law that provides payments without regard to fault, to employees injured in the course and scope of their employment. It provides coverage for liability imposed on certain employers, to pay benefits and furnish care to employees injured, and to pay benefits to dependents of employees killed in the course of or arising from their employment.
                                </div>
                            }
                            label={<CheckboxLabel>Workers' Compensation</CheckboxLabel>} />
                        <Chbx
                            descriptionChild={
                                <div className="text-md block">
                                    A commercial bond is a type of surety bond that guarantees a business or individual will comply with specific laws, regulations, or contractual obligations related to their professional activities. Unlike insurance, which protects the policyholder, a commercial bond protects a third party (the obligee) from potential financial loss if the bonded party (the principal) fails to uphold their commitments. These bonds are often required for licensing, permits, or to ensure adherence to industry standards.
                                </div>
                            }
                            label={<CheckboxLabel>Commercial Bonds</CheckboxLabel>} />
                        <Chbx
                            label={<CheckboxLabel>Speak with a licensed agent</CheckboxLabel>} />
                    </Stack>
                </form>
            </Stack >)
    },
    {
        key: "zip_code",
        title: strings.pages.getquote.stepsdisplay.zipcode,
        icon: <Icon path={mdiMapMarker} size="1.6em" />,
        children: (
            <Stack>
                <PageTitle>
                    {strings.pages.getquote.steps.zipcode.title}
                </PageTitle>
                <form>
                    {
                        // TODO: Add checking and validation for the zipcode (between 5-10 characters long for US zip codes)
                    }
                    <TextInput
                        className='px-10 md:px-40'
                        label="Zip code"
                        required={true} />
                </form>
            </Stack>)
    },
    {
        key: "user_business",
        title: strings.pages.getquote.stepsdisplay.yourbusiness,
        icon: <Icon path={mdiDomain} size="1.6em" />,
        children: (
            <Stack>
                <PageTitle>
                    {strings.pages.getquote.steps.yourbusiness.title}
                </PageTitle>
                <form >
                    <div className="px-10 md:px-[10vw]">
                        <Autocomplete
                            label="Business Type"
                            placeholder="Interior Design"
                            withScrollArea={true}
                            mt="md"
                            required={true}
                            limit={6}
                            data={strings.pages.getquote.steps.yourbusiness.elements.businesstypes}
                            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                        />
                        <SizedBox $height="3rem" />
                        <TextInput
                            label="Business Name"
                            description="If you're a sole trader, please enter your full name. If you use a different name for your business, include both—such as Jane Doe operating as Bright Start Tutoring."
                            required={true}
                            placeholder="Jane Doe Bright Start Tutoring"
                        />
                    </div>
                </form>
            </Stack>
        )
    },
    {
        key: "user_info",
        title: strings.pages.getquote.stepsdisplay.yourinformation,
        icon: <Icon path={mdiAccount} size="1.6em" />,
        children: (
            <Stack>
                <PageTitle>
                    {strings.pages.getquote.steps.yourinformation.title}
                </PageTitle>
                <form>
                    <div className="px-10 md:px-[4vw]">
                        <TextInput
                            label="First Name"
                            required={true}
                            placeholder="Jane" />
                        <SizedBox $height="3rem" />
                        <TextInput
                            label="Last Name"
                            required={true}
                            placeholder="Doe" />
                    </div>
                </form>
            </Stack>
        )
    },
    {
        key: "user_contact",
        title: strings.pages.getquote.stepsdisplay.contactinformation,
        icon: <Icon path={mdiPhone} size="1.6em" />,
        children: (
            <Stack>
                <PageTitle>
                    {strings.pages.getquote.steps.contactinformation.title}
                </PageTitle>
                <form>
                    <div className="px-10 md:px-[2vw]">
                        <TextInput
                            label={strings.pages.getquote.steps.contactinformation.elements.email}
                            required={true}
                            type="email"
                            placeholder="janedoe@domain.com"
                        />
                        <SizedBox $height="3rem" />
                        <TextInput
                            label={strings.pages.getquote.steps.contactinformation.elements.phonenumber.label}
                            description={strings.pages.getquote.steps.contactinformation.elements.phonenumber.description}
                            type="tel"
                            placeholder="XXX-XXX-XXXX"
                        />
                    </div>
                </form>
            </Stack>
        )
    },
];

export function GetQuotePage(): ReactNode {
    document.title = strings.pages.getquote.title;
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
    return (
        <Flex direction="column" justify='center' align='center' className="pt-[2.2rem] px-[2rem]">
            <Stepper
                active={current}
                onStepClick={setCurrent}
            >
                {Pages.map((element, index) => (
                    <Stepper.Step
                        key={index}
                        icon={element.icon}
                        label={element.title}
                        description={element.subtitle ?? ""}
                    />
                ))}
            </Stepper>
            <SizedBox $height="2rem" />
            {current <= Pages.length - 1 ?
                <ScrollArea>
                    {Pages[current].children}
                    <SizedBox $height="6rem" />
                    <Group gap="1.2em" justify='center'>
                        {
                            current > 0 ? <Button
                                size="1.6em"
                                variant='outline'
                                color={COLORS.secondary}
                                onClick={() => {
                                    setCurrent(current - 1);
                                }}
                            >
                                <Group>
                                    <Icon path={mdiChevronLeft} size="1em" color={COLORS.onSecondary} />
                                    <div className="text-xl text-on-secondary-color">Back</div>
                                </Group>
                            </Button> : <></>
                        }
                        <Button
                            size="1.6em"
                            color={COLORS.secondary}
                            onClick={() => {
                                setCurrent(current + 1);
                            }}
                        >
                            <Group>
                                <div className="text-xl text-on-secondary-color">Next</div>
                                <Icon path={mdiChevronRight} size="1em" color={COLORS.onSecondary} />
                            </Group>
                        </Button> : <></>
                    </Group>
                </ScrollArea> : <Stack justify='center' align="center" >
                    <SizedBox $height="6.4rem" />
                    <div className="inline-block rounded-full bg-success-color p-3">
                        <Icon path={mdiHandshakeOutline} size="6.2rem" color={COLORS.onPrimary} />
                    </div>
                    <SizedBox $height="2em" />
                    <div className='text-center text-3xl font-semibold text-primary-color'>
                        We have received your information.
                    </div>
                    <p className='text-[1.4em]'>
                        A member of our team will be in touch with you shortly.
                    </p>
                </Stack>
            }
        </Flex>);
}