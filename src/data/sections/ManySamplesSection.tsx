import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

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
                in their own right. The sprint times themselves are lopsided, with that
                long straggle of slower runners. What shape do the means make?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-many-samples-visual" maxWidth="xl">
        <Block id="many-samples-visual" padding="sm">
            <VisualOptionCards
                blockId="many-samples-visual"
                intro="Pick how your students will collect many sample means and see the shape they form."
                cards={[
                    {
                        id: "stacking-means",
                        title: "Sample means dropping one by one and stacking into a hump beside the lopsided original data",
                        looks: "The lopsided sprint times on the left. On the right, an empty space that fills up as each new sample mean drops into place and stacks on the ones near it.",
                        manipulate: "Press once for a single sample, or hold to pour in a hundred, and watch the pile build",
                        reveals: "The means pile up in a smooth hump around the squad's true average even though the original times are nothing like a hump",
                        targetsMisconception: "Students think one sample's average is the whole answer, so no spread exists",
                        recommended: true,
                    },
                    {
                        id: "swap-the-source",
                        title: "The same stacking pile, but students choose what the original data looks like first",
                        looks: "A choice of starting data such as sprint times, audition scores, or rehearsal hours, each a different lopsided or double-humped shape, with the pile of means building underneath.",
                        manipulate: "Switch the starting data and pour in a fresh hundred means each time",
                        reveals: "Whatever the original shape, the pile of means always comes out as the same smooth hump",
                        targetsMisconception: "Students think one sample's average is the whole answer, so no spread exists",
                    },
                    {
                        id: "sample-trail",
                        title: "A running trail of sample means plotted in the order they were taken",
                        looks: "Each new sample mean added as a point along a track, with the band it wanders inside drawn behind it.",
                        manipulate: "Keep taking samples and watch how far the means wander from one another",
                        reveals: "The means bounce around within a band rather than repeating one fixed value, and they cluster thickest in the middle",
                        targetsMisconception: "Students think one sample's average is the whole answer, so no spread exists",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
