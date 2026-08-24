import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, Table } from "@/components/atoms";
import { SquadSampleMeanExplorer } from "./visuals/SquadSampleMeanExplorer";
import { PracticeQuestion } from "./practice/PracticeQuestion";
import { PracticeQuestionSet } from "./practice/PracticeQuestionSet";
import { SampleMeanOptionsDiagram } from "./visuals/SampleMeanOptionsDiagram";

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

    <StackLayout key="layout-taking-sample-practice-median-spread" maxWidth="xl">
        <Block id="block-1787570007115" padding="sm">
            <PracticeQuestionSet
                intro="A sample of seven runners is timed: 15.0, 12.4, 18.3, 14.7, 19.9, 13.1 and 16.2 seconds."
                questions={[
                    {
                        prompt: "Put the seven times in order and find the median time, in seconds.",
                        numericAnswer: 15.0,
                        tolerance: 0.05,
                        unit: "seconds",
                        correctFeedback:
                            "Correct. In order the times run 12.4, 13.1, 14.7, 15.0, 16.2, 18.3, 19.9, and 15.0 sits fourth — three times below it and three above.",
                        hints: [
                            "Write the seven times out in order from fastest to slowest first.",
                            "There are seven times, so the median is the fourth one along. Count in from each end.",
                        ],
                        finalExplanation:
                            "In order: 12.4, 13.1, 14.7, 15.0, 16.2, 18.3, 19.9. The middle value of seven is the fourth, so the median is 15.0 seconds.",
                    },
                    {
                        prompt:
                            "Using the same seven times, find the interquartile range: the median of the three times below the middle, subtracted from the median of the three times above it.",
                        numericAnswer: 5.2,
                        tolerance: 0.05,
                        unit: "seconds",
                        correctFeedback:
                            "Correct. The lower three are 12.4, 13.1, 14.7 with median 13.1, the upper three are 16.2, 18.3, 19.9 with median 18.3, and 18.3 - 13.1 = 5.2 seconds.",
                        hints: [
                            "Split the ordered list either side of the median 15.0, leaving three times below and three above.",
                            "The middle of the lower three is 13.1 and the middle of the upper three is 18.3. Now subtract.",
                        ],
                        finalExplanation:
                            "Lower quartile 13.1, upper quartile 18.3, so the interquartile range is 18.3 - 13.1 = 5.2 seconds. It measures how spread out the middle half of the times is.",
                    },
                    {
                        prompt:
                            "The slowest runner's time changes from 19.9 to 25.0 seconds. Which of these happens?",
                        choices: [
                            { id: "both-jump", label: "Both the mean and the median jump up by the same amount" },
                            { id: "mean-moves-median-stays", label: "The mean rises, but the median stays at 15.0" },
                            { id: "neither-changes", label: "Neither changes, because only one time was altered" },
                        ],
                        correctChoiceId: "mean-moves-median-stays",
                        correctFeedback:
                            "Yes. The mean uses every value, so a slower time drags it up. The median only cares which value sits in the middle, and that is still 15.0.",
                        hints: [
                            "The mean adds all seven times together. Does a bigger total change the mean?",
                            "Now reorder the list with 25.0 at the end. Which time is still fourth along?",
                        ],
                        finalExplanation:
                            "The total grows, so the mean rises. But 25.0 stays at the end of the ordered list, so the fourth value is still 15.0 and the median does not move. This is why a coach may prefer the median when one time is unusual.",
                    },
                ]}
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
                explanationCaption="What each answer would look like on a time line:"
                explanationVisual={<SampleMeanOptionsDiagram />}
            />
        </Block>
    </StackLayout>,
];
