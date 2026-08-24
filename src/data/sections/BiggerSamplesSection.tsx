import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

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
                Now change how many runners go into each handful. Pick only two, and
                one unusually fast sprinter drags that mean a long way. Pick twenty,
                and a fast one is likely to be balanced by a slow one.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bigger-samples-question" maxWidth="xl">
        <Block id="bigger-samples-question" padding="sm">
            <EditableParagraph id="para-bigger-samples-question" blockId="bigger-samples-question">
                So does using bigger handfuls make the collected means spread out more,
                or squeeze them closer together? Try it before you decide.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bigger-samples-visual" maxWidth="xl">
        <Block id="bigger-samples-visual" padding="sm">
            <VisualOptionCards
                blockId="bigger-samples-visual"
                intro="Pick how your students will test what sample size does to the spread of the means."
                cards={[
                    {
                        id: "size-slider",
                        title: "A slider for sample size, with the hump of means reshaping as it moves",
                        looks: "The pile of collected sample means, with a control for how many performers go into each sample and a marker showing how wide the pile is.",
                        manipulate: "Slide the sample size from 2 up to 30 and watch the hump redraw itself each time",
                        reveals: "Larger samples squeeze the means into a taller, narrower hump around the same centre",
                        targetsMisconception: "Students think a bigger sample gives more spread-out averages, not less",
                        recommended: true,
                    },
                    {
                        id: "side-by-side-humps",
                        title: "Two piles side by side, one built from small samples and one from large",
                        looks: "Two humps drawn on the same scale, one labelled samples of 2 and one labelled samples of 20, filling up together.",
                        manipulate: "Pour in more samples and compare how far each pile spreads",
                        reveals: "Both piles sit over the same centre, but the large-sample pile is clearly the narrower of the two",
                        targetsMisconception: "Students think a bigger sample gives more spread-out averages, not less",
                    },
                    {
                        id: "prediction-first",
                        title: "A predict-then-check activity on sample size and spread",
                        looks: "Three sketched humps of different widths offered as predictions, and the real pile of means built afterwards to compare against the choice.",
                        manipulate: "Choose the hump they expect for samples of 20, then run the samples and see which one appears",
                        reveals: "The instinct that bigger samples wander more is wrong; the extra values steady the mean instead",
                        targetsMisconception: "Students think a bigger sample gives more spread-out averages, not less",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
