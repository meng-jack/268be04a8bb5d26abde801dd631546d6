import { SizedBox } from "../components/basics";
import { Container, Flex } from "@mantine/core";
import { GetYourQuoteButtonLarge } from "../components/canonical/canonical";
import { DisplayAtLeastMd, DisplayUntilMd } from "../components/responsive";
import strings from "../assets/strings.json";
import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import { isMd } from '../shared/responsive_queries';

// extracting a lot of code here which i believe to be the correct way to do it in react and not just
// for semantics (borrowed flutter + compose refactoring)

const RollerStrings = () => {
    const [rollerIndex, setRollerIndex] = useState(0);
    useEffect(() => {
        const id = setInterval(
            () => setRollerIndex((index) => index + 1),
            5000,
        );
        return () => clearTimeout(id);
    }, []);

    return <div className="h-auto max-h-auto">
        <TextTransition
            className={isMd() ? "" : "text-center px-[2.4rem]"}
            springConfig={presets.stiff}
            translateValue="75%">
            <span className="inline-block h-auto max-h-auto">
                {strings.pages.home.rollerStrings.default[rollerIndex % strings.pages.home.rollerStrings.default.length]}
            </span>
        </TextTransition></div>;
};

const LeftSide = () => (
    <div id="home-left-bind" style={{ width: "80%" }}>
        <div
            className="text-[1.8em] text-primary-color text-left font-bold"
        >
            An International Insurance Brokerage Firm
        </div>
        <SizedBox $height="0.4em" />
        <RollerStrings />
        <SizedBox $height="6.8rem" />
        <GetYourQuoteButtonLarge />
    </div>
);

/**
 * shown on the right side of the screen
 * @returns component
 */
const RightSide = () => (
    <Flex
        id="home-right-bind"
        direction="column"
        justify="center"
        align="center"
    >
        <p>
        </p>
    </Flex>
);

const Mini = () => (<Flex direction="column" align="center">
    <div
        className="pt-[2.8em] text-[1.8em] text-primary-color text-center font-bold px-[2.5rem]"
    >
        An International Insurance Brokerage Firm
    </div>
    <Container className="pt-[1.8rem] pb-[2rem]">
        <RollerStrings />
    </Container>
    <GetYourQuoteButtonLarge />
</Flex>);

export function HomePage() {
    document.title = strings.pages.home.title;
    return (
        <>
            <DisplayAtLeastMd>
                <Flex
                    direction="row"
                    justify="space-betweem"
                    align="center"
                    className="pl-[12rem] pt-[3.4rem] pr-0"
                >
                    <div className="flex-2">
                        <LeftSide />
                    </div>
                    <SizedBox $width="1.2rem" />
                    <div className="w-[40%] h-[20rem]">
                        <RightSide />
                    </div >
                </Flex>
            </DisplayAtLeastMd>
            <DisplayUntilMd>
                <Mini />
            </DisplayUntilMd>
        </>
    );
}
