import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { SampleSizeSpreadExplorer } from "./visuals/SampleSizeSpreadExplorer";
import { PracticeQuestion } from "./practice/PracticeQuestion";

export const biggerSamplesBlocks: ReactElement[] = [
    <StackLayout key="layout-bigger-samples-heading" maxWidth="xl">
        <Block id="bigger-samples-heading" padding="md">
            <EditableH2 id="h2-bigger-samples-heading" blockId="bigger-samples-heading">
                Bigger Samples, Narrower Bell
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bigger-samples-explanation" maxWidth="xl">
        <Block id="bigger-samples-explanation" padding="sm">
            <EditableParagraph id="para-bigger-samples-explanation" blockId="bigger-samples-explanation">
                Now change how many runners go into each handful. Pick only two, and one
                unusually fast sprinter drags that mean a long way. Pick twenty, and a
                fast one is likely to be balanced by a slow one.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bigger-samples-question" maxWidth="xl">
        <Block id="bigger-samples-question" padding="sm">
            <EditableParagraph id="para-bigger-samples-question" blockId="bigger-samples-question">
                Before you touch the slider below, decide: does using bigger handfuls
                spread the means out more, or squeeze them closer together? Then drag it
                from 2 up to 30 and watch the red width bar answer you.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bigger-samples-visual" maxWidth="xl">
        <Block id="bigger-samples-visual" padding="sm" hasVisualization>
            <SampleSizeSpreadExplorer />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bigger-samples-practice-choice" maxWidth="xl">
        <Block id="bigger-samples-practice-choice" padding="sm">
            <PracticeQuestion
                prompt="A coach wants sample means that land close to the squad's true average nearly every time. Should each sample contain 4 runners or 25 runners, and why?"
                choices={[
                    { id: "four-fewer-to-go-wrong", label: "4 runners — fewer times means less can go wrong, so the means vary less" },
                    { id: "twenty-five-balance-out", label: "25 runners — fast and slow runners balance each other, so the means vary less" },
                    { id: "no-difference", label: "Either — the number in each sample makes no difference to the means" },
                ]}
                correctChoiceId="twenty-five-balance-out"
                correctFeedback="Exactly. With 25 runners in a sample, one unusually slow time is outweighed by the rest, so the means huddle tightly around the squad's average."
                hints={[
                    "Set the slider above to 4, note the width of the red bar, then set it to 25 and compare.",
                    "The red bar got shorter as the sample grew, so bigger samples give means that vary less. Which option says that?",
                ]}
                finalExplanation="Bigger samples give a narrower pile, not a wider one: extra runners give the fast and slow ones a chance to cancel out. Slide from 2 to 30 above and watch the red width bar shrink."
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bigger-samples-practice-clubs" maxWidth="xl">
        <Block id="bigger-samples-practice-clubs" padding="sm">
            <PracticeQuestion
                prompt="Two clubs estimate their squad's average time. Club A averages 3 runners; Club B averages 20. Whose single estimate is more likely to land within 0.2 seconds of the truth?"
                choices={[
                    { id: "club-a", label: "Club A, because a small sample is easier to control" },
                    { id: "club-b", label: "Club B, because means of larger samples cluster tightly around the true average" },
                    { id: "equal", label: "Both are equally likely — it is random either way" },
                ]}
                correctChoiceId="club-b"
                correctFeedback="Right. Club B's means sit in a narrow pile around the squad average, so a single one of them is much more likely to be close to it."
                hints={[
                    "Set the slider to 3 above and see how far the means stray from the dashed squad average, then set it to 20.",
                    "At 20 the pile was far narrower than at 3. Which club's single estimate is therefore safer?",
                ]}
                finalExplanation="Both clubs are sampling at random, but Club B's larger samples produce means packed tightly around the squad average, so Club B's estimate is far more likely to be within 0.2 seconds."
            />
        </Block>
    </StackLayout>,
];
