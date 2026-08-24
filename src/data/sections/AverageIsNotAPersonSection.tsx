import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { RehearsalHoursMeanExplorer } from "./visuals/RehearsalHoursMeanExplorer";
import { PracticeQuestion } from "./practice/PracticeQuestion";

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
                Below, five performers in a drama group sit on a line of rehearsal
                hours, with their mean marked in blue underneath. Drag any performer
                and watch the blue marker answer back. Try to make it land exactly on
                someone.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-average-not-person-visual" maxWidth="xl">
        <Block id="average-not-person-visual" padding="sm" hasVisualization>
            <RehearsalHoursMeanExplorer />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-average-not-person-practice-claim" maxWidth="xl">
        <Block id="average-not-person-practice-claim" padding="sm">
            <PracticeQuestion
                prompt="A drama group of five rehearsed for a mean of 5.7 hours. Rahul says: so one of them must have rehearsed for 5.7 hours. Is he right?"
                choices={[
                    { id: "always-a-value", label: "Yes — the mean is always one of the values in the group" },
                    { id: "may-match-nobody", label: "Not necessarily — the mean comes from all five and may match nobody" },
                    { id: "never-a-value", label: "No — the mean can never be equal to one of the values" },
                ]}
                correctChoiceId="may-match-nobody"
                correctFeedback="Exactly. The mean is built from all five hours at once. It can happen to land on somebody, but there is no reason it has to."
                hints={[
                    "Drag the dots above and watch the blue marker. Does it sit on a performer, or between them?",
                    "You may manage to make the marker land on a dot — so it is possible, just not guaranteed. Which option says that?",
                ]}
                finalExplanation="The mean is worked out from every value together, so it usually falls in a gap between them, though it can coincide with one by chance. That is why Rahul cannot conclude anyone rehearsed 5.7 hours."
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-average-not-person-practice-count" maxWidth="xl">
        <Block id="average-not-person-practice-count" padding="sm">
            <PracticeQuestion
                prompt="Five netball players score 4, 9, 2, 7 and 3 goals. Work out the mean score, then count how many of the five players scored exactly that number of goals. Enter that count."
                numericAnswer={0}
                tolerance={0.01}
                unit="players"
                correctFeedback="Correct — the mean is 5 goals, and nobody scored 5. The mean describes the team's scoring, not any single player's."
                hints={[
                    "First find the mean: add 4 + 9 + 2 + 7 + 3, then divide by 5.",
                    "The mean is 5 goals. Now look back at the list — is 5 anywhere in it?",
                ]}
                finalExplanation="The goals total 25, and 25 ÷ 5 = 5 goals. None of the five players scored 5, so the answer is 0. Drag the dots in the line above and you will see the same thing: the marker keeps landing in the gaps."
            />
        </Block>
    </StackLayout>,
];
