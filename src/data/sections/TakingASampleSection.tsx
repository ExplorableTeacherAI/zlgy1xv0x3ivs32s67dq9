import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

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
                Pick a different five runners and you would get a different mean. How
                different? Let us find out.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-taking-sample-visual" maxWidth="xl">
        <Block id="taking-sample-visual" padding="sm">
            <VisualOptionCards
                blockId="taking-sample-visual"
                intro="Pick how your students will take a sample from the squad and work out its mean."
                cards={[
                    {
                        id: "draw-five-runners",
                        title: "A squad of runners where five are picked at random and their mean is worked out on screen",
                        looks: "All 200 sprint times shown as small dots along a time line. Five of them light up as the picked sample, with their five values listed beside the line.",
                        manipulate: "Press a button to pick a fresh random five, and watch the sum and the division happen one step at a time",
                        reveals: "Every fresh handful gives a different mean, and each mean is worked out from the five times rather than read off one runner",
                        recommended: true,
                    },
                    {
                        id: "team-sheet-table",
                        title: "A team sheet where students tick five performers and see the mean build up row by row",
                        looks: "A table of named squad members with their times, and a running total and mean underneath that updates as rows are ticked.",
                        manipulate: "Tick and untick performers to build their own sample of five",
                        reveals: "The mean depends on which five are chosen, and it changes as soon as one name is swapped",
                    },
                    {
                        id: "balance-beam",
                        title: "Five picked times sitting on a beam that balances at their mean",
                        looks: "A horizontal beam with five weights placed at the five sample times; a pivot slides to the point where the beam balances.",
                        manipulate: "Drag the weights or pick a new random five and watch the balance point move",
                        reveals: "The mean is the balance point of the sample, a position worked out from all five values together",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
