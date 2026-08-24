import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { SampleMeansPileExplorer } from "./visuals/SampleMeansPileExplorer";
import { PracticeQuestion } from "./practice/PracticeQuestion";

export const manySamplesBlocks: ReactElement[] = [
    <StackLayout key="layout-many-samples-heading" maxWidth="xl">
        <Block id="many-samples-heading" padding="md">
            <EditableH2 id="h2-many-samples-heading" blockId="many-samples-heading">
                Take Another Sample, and Another
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-many-samples-explanation" maxWidth="xl">
        <Block id="many-samples-explanation" padding="sm">
            <EditableParagraph id="para-many-samples-explanation" blockId="many-samples-explanation">
                One handful gives one mean. But the handful was random, so another
                handful gives another mean, a little higher or a little lower. A single
                sample mean is therefore never the whole story.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-many-samples-question" maxWidth="xl">
        <Block id="many-samples-question" padding="sm">
            <EditableParagraph id="para-many-samples-question" blockId="many-samples-question">
                So collect a hundred of those means and treat them as a set of numbers
                in their own right. Choose the starting data at the top below — lopsided
                sprint times, two-humped audition scores, or flat rehearsal hours — then
                pour in the samples and watch the blue pile build underneath.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-many-samples-visual" maxWidth="xl">
        <Block id="many-samples-visual" padding="sm" hasVisualization>
            <SampleMeansPileExplorer />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-many-samples-practice-shape" maxWidth="xl">
        <Block id="many-samples-practice-shape" padding="sm">
            <PracticeQuestion
                prompt="A school switches its starting data from sprint times to audition scores, which sit in two separate humps, and collects 100 sample means of five. What shape should the pile of means take?"
                choices={[
                    { id: "copies-two-humps", label: "Two humps, copying the shape of the audition scores" },
                    { id: "single-smooth-hump", label: "One smooth hump near the middle of the scores" },
                    { id: "flat", label: "Flat, with the means spread evenly across the whole range" },
                ]}
                correctChoiceId="single-smooth-hump"
                correctFeedback="Yes. A sample of five usually catches performers from both humps, so its mean lands between them. That is the Central Limit Theorem: the pile of means comes out smooth and hump-shaped whatever the starting data looked like."
                hints={[
                    "Press the Audition scores button above, then pour in 100 samples and look at the blue pile.",
                    "Compare the two-humped grey chart at the top with the blue pile below it. Do they have the same shape?",
                ]}
                finalExplanation="Try all three starting data sets above. However lopsided, two-humped or flat the grey chart is, the blue pile of means always builds into a single smooth hump around the middle."
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-many-samples-practice-single" maxWidth="xl">
        <Block id="many-samples-practice-single" padding="sm">
            <PracticeQuestion
                prompt="Priya takes one random sample of five sprinters and gets a mean of 14.1 seconds. She concludes that the squad's average is 14.1 seconds. What is wrong with that?"
                choices={[
                    { id: "nothing-wrong", label: "Nothing — her sample mean is the squad's average" },
                    { id: "estimate-with-spread", label: "Her mean is only one of many possible means, so it is an estimate that could be a bit high or low" },
                    { id: "should-use-fastest", label: "She should have used the fastest runner's time instead" },
                ]}
                correctChoiceId="estimate-with-spread"
                correctFeedback="Right. Her 14.1 is one blue dot in a whole pile. The pile clusters near the squad's true average, but individual dots land either side of it."
                hints={[
                    "Press Take one sample above a few times and note how much the mean jumps around.",
                    "Your single samples landed in different places each time. Can any one of them be the exact truth about all 200 runners?",
                ]}
                finalExplanation="Every sample of five gives a slightly different mean — that is the width of the blue pile above. Priya's 14.1 is a reasonable estimate of the squad's average, not the answer itself."
            />
        </Block>
    </StackLayout>,
];
