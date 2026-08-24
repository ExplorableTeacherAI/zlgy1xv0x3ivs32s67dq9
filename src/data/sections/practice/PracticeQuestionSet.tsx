import { PracticeQuestion, type PracticeQuestionProps } from "./PracticeQuestion";

export interface PracticeQuestionSetProps {
    /** Optional line introducing the group of questions. */
    intro?: string;
    /** The questions, asked one after another. */
    questions: PracticeQuestionProps[];
}

export const PracticeQuestionSet = ({ intro, questions }: PracticeQuestionSetProps) => (
    <div className="w-full space-y-3">
        {intro && <div className="text-[15px] font-medium text-slate-800">{intro}</div>}
        {questions.map((question, index) => (
            <PracticeQuestion key={index} {...question} />
        ))}
    </div>
);
