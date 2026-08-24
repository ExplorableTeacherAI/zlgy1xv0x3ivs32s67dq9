import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";

export const wrappingUpBlocks: ReactElement[] = [
    <StackLayout key="layout-wrapping-up-heading" maxWidth="xl">
        <Block id="wrapping-up-heading" padding="md">
            <EditableH2 id="h2-wrapping-up-heading" blockId="wrapping-up-heading">
                Wrapping Up
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-wrapping-up-summary" maxWidth="xl">
        <Block id="wrapping-up-summary" padding="sm">
            <EditableParagraph id="para-wrapping-up-summary" blockId="wrapping-up-summary">
                The sprint times never changed. They are as messy at the end of this
                lesson as they were at the start. What changed is what you did with
                them: take a random handful, work out its mean, and repeat. Those means
                settle into a smooth hump around the squad's true average, and the
                bigger each handful, the tighter that hump becomes. The shape you
                started from hardly matters at all.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-wrapping-up-next" maxWidth="xl">
        <Block id="wrapping-up-next" padding="sm">
            <EditableParagraph id="para-wrapping-up-next" blockId="wrapping-up-next">
                That is why a coach can judge a squad's fitness without timing all two
                hundred runners, and why a festival can rate a show from a sample of
                its audience. Next comes the natural follow-up question: exactly how
                wide should that hump be, and how much trust does a single sample
                really earn?
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
