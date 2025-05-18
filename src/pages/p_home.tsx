import React from "react";
import { PageLayout } from "../components/pagelayout";
import { SizedBox } from "../components/basics";
import { Flex } from "antd";
import COLORS from "../shared/theme.ts";
import { GetYourQuoteButtonLarge } from "../components/canonical/canonical";
import { DisplayAtLeastMd, DisplayUntilMd } from "../components/responsive";
import strings from "../assets/strings.json";
import { AnimatedText } from '../components/animated/text_sequencer';

// extracting a lot of code here which i believe to be the correct way to do it in react and not just
// for semantics (borrowed flutter + compose refactoring)

const LeftSide = () => (
    <div id="home-left-bind" style={{ width: "80%" }}>
        <div
            style={{
                fontSize: "1.8em",
                color: COLORS.primary,
                textAlign: "left",
                fontWeight: "bold",
            }}
        >
            An International Insurance Brokerage Firm
        </div>
        <SizedBox height="0.4em" />
        <AnimatedText texts={strings.pages.home.rollerStrings.default} />
        <SizedBox height="6.8rem" />
        <GetYourQuoteButtonLarge
            height="2.2em"
            fontSize="1.2em"
        />

    </div>
);

/**
 * shown on the right side of the screen
 * @returns component
 */
const RightSide = () => (
    <Flex
        id="home-right-bind"
        vertical={true}
        justify="center"
        align="center"
        style={{
            width: "100%",
            height: "100%",

        }}
    >
        <p>
        </p>
    </Flex>
);

export function HomePage() {
    return (
        <PageLayout title={strings.pages.home.title} native={true}>
            <DisplayAtLeastMd>
                <Flex
                    vertical={false}
                    justify="space-betweem"
                    align="center"
                    style={{
                        paddingLeft: '12rem',
                        paddingRight: "0rem",
                        paddingTop: "3.4rem",
                    }}
                >
                    <div style={{ flex: 2 }}>
                        <LeftSide />
                    </div>
                    <SizedBox width="1.2rem" />
                    <div style={{ flex: 1, width: "40%", height: "20rem" }}>
                        <RightSide />
                    </div >
                </Flex>
            </DisplayAtLeastMd>
            <DisplayUntilMd>
                <Flex vertical={true} align="center">
                    <div
                        style={{
                            paddingTop: "2.8em",
                            fontSize: "1.62em",
                            color: COLORS.primary,
                            textAlign: "center",
                            fontWeight: "bold",
                            paddingLeft: "2.5rem",
                            paddingRight: "2.5rem"
                        }}
                    >
                        An International Insurance Brokerage Firm
                    </div>
                    <SizedBox height="0.86rem" />
                    <div
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <AnimatedText texts={strings.pages.home.rollerStrings.medium} />
                    </div>
                    <SizedBox height="2.2em" />
                    <GetYourQuoteButtonLarge />
                </Flex>
            </DisplayUntilMd>
        </PageLayout >
    );
}
