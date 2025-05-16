import React from "react";
import { PageLayout } from "../components/pagelayout";
import { SizedBox } from "../components/basics";
import { Flex } from "antd";
import COLORS from "../shared/theme";
import SequentialTextAnimation from "../components/textsequencer";
import { GetYourQuoteButtonLarge } from "../components/canonical/canonical";
import { DisplayAtLeastMd, DisplayUntilMd } from "../components/responsive";

// extracting a lot of code here which i believe to be the correct way to do it in react and not just
// for semantics (borrowed flutter + compose refactoring)

const LeftSide = () => (
    <div id="home-left-bind" style={{ width: "78%" }}>
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
        <SequentialTextAnimation />
        <p>
            With our many Commercial Insurance products, you can safeguard your
            business and its properties. We set out to minimize the hassle and
            risks so you can build up your company.
        </p>
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
            width: "56%",
        }}
    >
        <GetYourQuoteButtonLarge />
    </Flex>
);

export function HomePage() {
    return (
        <PageLayout title="United Aline">
            <DisplayAtLeastMd>
                <Flex
                    vertical={false}
                    justify="space-betweem"
                    align="center"
                    style={{
                        paddingTop: "7.4rem",
                    }}
                >
                    <LeftSide />
                    <SizedBox width="4rem" />
                    <RightSide />
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
                        We set out to minimize the hassle and risks so you can
                        build up your company.
                    </div>
                    <SizedBox height="2.2em" />
                    <GetYourQuoteButtonLarge />
                </Flex>
            </DisplayUntilMd>
        </PageLayout>
    );
}
