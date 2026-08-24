import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, Table } from "@/components/atoms";
import { SquadSampleMeanExplorer } from "./visuals/SquadSampleMeanExplorer";
import { PracticeQuestion } from "./practice/PracticeQuestion";

export const takingASampleBlocks: ReactElement[] = [
    <StackLayout key="layout-taking-sample-heading" maxWidth="xl">
        <Block id="taking-sample-heading" padding="md">
            <EditableH2 id="h2-taking-sample-heading" blockId="taking-sample-heading">
                Taking a Sample
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-taking-sample-worked-example" maxWidth="xl">
        <Block id="taking-sample-worked-example" padding="sm">
            <EditableParagraph id="para-taking-sample-worked-example" blockId="taking-sample-worked-example">
                The whole squad is 200 runners. A sample is a small handful of them,
                picked at random. Say you pick five, with times 13.2, 15.0, 12.6, 16.4
                and 14.8 seconds. Add them up: 72.0. Divide by 5: the sample mean is
                14.4 seconds. That single number now stands in for the whole handful.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-taking-sample-question" maxWidth="xl">
        <Block id="taking-sample-question" padding="sm">
            <EditableParagraph id="para-taking-sample-question" blockId="taking-sample-question">
                Every grey dot below is one runner's time, and five are picked out in
                red. Work through the adding and the dividing one step at a time, then
                pick a fresh five. How far does the mean move?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-taking-sample-visual" maxWidth="xl">
        <Block id="taking-sample-visual" padding="sm" hasVisualization>
            <SquadSampleMeanExplorer />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-taking-sample-more-examples" maxWidth="xl">
        <Block id="block-1787569973457" padding="sm">
            <Table
                columns={[
                    { header: "Sample", align: "left", width: 110 },
                    { header: "The five times picked (seconds)", align: "left" },
                    { header: "Total", align: "center", width: 90 },
                    { header: "Sample mean", align: "center", width: 130 },
                ]}
                rows={[
                    {
                        cells: [
                            "Sample A",
                            "12.1, 13.6, 19.2, 14.0, 15.6",
                            "74.5",
                            "74.5 ÷ 5 = 14.9",
                        ],
                    },
                    {
                        cells: [
                            "Sample B",
                            "16.3, 12.8, 13.5, 18.1, 14.8",
                            "75.5",
                            "75.5 ÷ 5 = 15.1",
                        ],
                    },
                    {
                        cells: [
                            "Sample C",
                            "11.9, 13.2, 12.4, 20.5, 14.5",
                            "72.5",
                            "72.5 ÷ 5 = 14.5",
                        ],
                    },
                ]}
                color="#2563eb"
                caption="Three more samples of five taken from the same squad of 200 runners"
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-taking-sample-practice-mean" maxWidth="xl">
        <Block id="taking-sample-practice-mean" padding="sm">
            <PracticeQuestion
                prompt="Five swimmers are picked at random from a squad. Their times are 12.5, 14.0, 16.5, 13.0 and 15.0 seconds. What is this sample's mean, in seconds?"
                numericAnswer={14.2}
                tolerance={0.05}
                unit="seconds"
                correctFeedback="Correct. The five times add to 71.0, and 71.0 divided by 5 is 14.2 — one number worked out from all five swimmers together."
                hints={[
                    "Start by adding the five times together before doing anything else.",
                    "The total is 71.0, and five swimmers were picked. What do you divide 71.0 by?",
                ]}
                finalExplanation="12.5 + 14.0 + 16.5 + 13.0 + 15.0 = 71.0, and 71.0 ÷ 5 = 14.2 seconds. Press Add the five times, then Divide by 5 above to watch the same two steps on the sprint squad."
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-taking-sample-practice-varies" maxWidth="xl">
        <Block id="taking-sample-practice-varies" padding="sm">
            <PracticeQuestion
                prompt="A classmate picks their own random five runners from the same squad of 200. What should you expect their sample mean to be?"
                choices={[
                    { id: "identical", label: "Exactly the same as yours, because it is the same squad" },
                    { id: "close-but-different", label: "Close to yours, but usually a bit higher or lower" },
                    { id: "unrelated", label: "Completely unrelated to yours" },
                ]}
                correctChoiceId="close-but-different"
                correctFeedback="Yes. You both sampled the same squad, so the means land in the same region — but a different five runners give a different total, so the two means rarely match exactly."
                hints={[
                    "Press Pick a new five a few times above and note each mean you get. Are they identical?",
                    "The means you collected were all different, yet none was wildly far from the others. Which option describes that?",
                ]}
                finalExplanation="Different handfuls give different totals, so the means differ — but every handful comes from the same squad, so they all land near the squad's own average. Keep pressing Pick a new five above to see it happen."
            />
        </Block>
    </StackLayout>,
];
