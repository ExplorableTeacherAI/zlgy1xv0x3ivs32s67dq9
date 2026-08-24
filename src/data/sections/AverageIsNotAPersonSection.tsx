import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const averageIsNotAPersonBlocks: ReactElement[] = [
    <StackLayout key="layout-average-not-person-heading" maxWidth="xl">
        <Block id="average-not-person-heading" padding="md">
            <EditableH2 id="h2-average-not-person-heading" blockId="average-not-person-heading">
                An Average Is Not a Person
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-average-not-person-explanation" maxWidth="xl">
        <Block id="average-not-person-explanation" padding="sm">
            <EditableParagraph id="para-average-not-person-explanation" blockId="average-not-person-explanation">
                Does anyone in that sample actually run 14.4 seconds? Nobody does. The
                mean was calculated from the five times, but it is not one of them. It
                is a new number that describes the handful as a whole.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-average-not-person-question" maxWidth="xl">
        <Block id="average-not-person-question" padding="sm">
            <EditableParagraph id="para-average-not-person-question" blockId="average-not-person-question">
                The same goes for the hours a drama group rehearses or the marks a
                choir scores at a festival. So where does the mean sit compared with
                the real values behind it?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-average-not-person-visual" maxWidth="xl">
        <Block id="average-not-person-visual" padding="sm">
            <VisualOptionCards
                blockId="average-not-person-visual"
                intro="Pick how your students will see that the mean is a new number, not one of the values."
                cards={[
                    {
                        id: "dots-and-marker",
                        title: "Five rehearsal hours as dots on a line, with the mean marked separately underneath",
                        looks: "Five dots spread along a number line for the five performers, and a clearly different marker below the line showing where the mean falls.",
                        manipulate: "Drag any performer's dot and watch the mean marker shift, usually landing in a gap where no dot sits",
                        reveals: "The mean moves whenever any value moves, and it rarely lands on top of a real value",
                        targetsMisconception: "Students confuse an average of a sample with a single data value",
                        recommended: true,
                    },
                    {
                        id: "levelling-bars",
                        title: "Five bars of different heights that level out to one shared height",
                        looks: "Five bars, one per performer, with a dashed line across them at the mean height.",
                        manipulate: "Press a button to pour the bars level and watch every bar become the same height",
                        reveals: "The mean is the height everyone would have if the total were shared out equally, which is usually nobody's real height",
                        targetsMisconception: "Students confuse an average of a sample with a single data value",
                    },
                    {
                        id: "guess-the-person",
                        title: "A challenge that asks students to find the performer whose score equals the mean",
                        looks: "Five named performers with their scores, and the mean shown in a box the students can compare against.",
                        manipulate: "Click the performer they think matches the mean and see how far off each one is",
                        reveals: "No performer matches, and the gaps above the mean exactly cancel the gaps below it",
                        targetsMisconception: "Students confuse an average of a sample with a single data value",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
