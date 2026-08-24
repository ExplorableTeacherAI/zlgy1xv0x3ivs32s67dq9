import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH1, EditableParagraph } from "@/components/atoms";

export const centralLimitTheoremIntroBlocks: ReactElement[] = [
    <StackLayout key="layout-orientation-title" maxWidth="xl">
        <Block id="orientation-title" padding="md">
            <EditableH1 id="h1-orientation-title" blockId="orientation-title">
                The Central Limit Theorem
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-orientation-hook" maxWidth="xl">
        <Block id="orientation-hook" padding="sm">
            <EditableParagraph id="para-orientation-hook" blockId="orientation-hook">
                Picture sports day. Two hundred students run the 100 metres and the
                times are all over the place: a handful of sprinters near eleven
                seconds, then a long straggle of everyone else. Now suppose you never
                see the full list. You grab five runners at random and work out their
                average time. Then five more. Then five more.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-orientation-promise" maxWidth="xl">
        <Block id="orientation-promise" padding="sm">
            <EditableParagraph id="para-orientation-promise" blockId="orientation-promise">
                Something odd happens to those averages. They do not scatter the way
                the individual times do. They gather around one value in a smooth,
                hump-shaped pile, even though the times you started with were nothing
                like a hump. That is the Central Limit Theorem, and by the end of this
                lesson you will be able to describe it in your own words. If you can
                work out the mean of a small set of numbers, you already have
                everything you need.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
