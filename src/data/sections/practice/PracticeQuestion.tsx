import { useState, type ReactNode } from "react";
import { Button, Input, RadioGroup, RadioGroupItem, Label } from "@/components/atoms";

export interface PracticeChoice {
    id: string;
    label: string;
}

export interface PracticeQuestionProps {
    /** The question shown to the student. */
    prompt: ReactNode;
    /** Numeric answer mode: the accepted value. */
    numericAnswer?: number;
    /** Allowed distance from the numeric answer. */
    tolerance?: number;
    /** Unit shown next to the input box. */
    unit?: string;
    /** Multiple-choice mode: the options. */
    choices?: PracticeChoice[];
    /** Multiple-choice mode: the id of the correct option. */
    correctChoiceId?: string;
    /** Shown when the student is right — say why it is right. */
    correctFeedback: string;
    /** Progressive nudges, shown one at a time on each wrong attempt. */
    hints: string[];
    /** Shown once every hint has been used. */
    finalExplanation: string;
    /** Optional picture explaining the answer, revealed once the student has responded. */
    explanationVisual?: ReactNode;
    /** Caption shown above the explanation picture. */
    explanationCaption?: string;
}

export const PracticeQuestion = ({
    prompt,
    numericAnswer,
    tolerance = 0.05,
    unit,
    choices,
    correctChoiceId,
    correctFeedback,
    hints,
    finalExplanation,
    explanationVisual,
    explanationCaption,
}: PracticeQuestionProps) => {
    const [typedAnswer, setTypedAnswer] = useState("");
    const [selectedChoice, setSelectedChoice] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);

    const checkAnswer = () => {
        const correct =
            choices !== undefined
                ? selectedChoice === correctChoiceId
                : typedAnswer.trim() !== "" &&
                  Math.abs(Number(typedAnswer) - (numericAnswer ?? 0)) <= tolerance;
        if (correct) {
            setIsCorrect(true);
        } else {
            setAttempts((current) => current + 1);
        }
    };

    const feedback = isCorrect
        ? correctFeedback
        : attempts === 0
          ? null
          : attempts <= hints.length
            ? hints[attempts - 1]
            : finalExplanation;

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-[15px] leading-relaxed text-slate-800">{prompt}</div>

            {choices ? (
                <RadioGroup
                    className="mt-3 space-y-2"
                    value={selectedChoice}
                    onValueChange={setSelectedChoice}
                    disabled={isCorrect}
                >
                    {choices.map((choice) => (
                        <div key={choice.id} className="flex items-start gap-2">
                            <RadioGroupItem value={choice.id} id={choice.id} className="mt-1" />
                            <Label htmlFor={choice.id} className="text-sm font-normal leading-relaxed">
                                {choice.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            ) : (
                <div className="mt-3 flex items-center gap-2">
                    <Input
                        className="w-32"
                        value={typedAnswer}
                        onChange={(event) => setTypedAnswer(event.target.value)}
                        placeholder="Your answer"
                        disabled={isCorrect}
                    />
                    {unit && <span className="text-sm text-slate-500">{unit}</span>}
                </div>
            )}

            <div className="mt-3 flex items-center gap-3">
                <Button onClick={checkAnswer} disabled={isCorrect}>
                    Check my answer
                </Button>
                {isCorrect && <span className="text-sm font-medium text-emerald-600">Correct</span>}
            </div>

            {feedback && (
                <div
                    className={`mt-3 rounded-lg p-3 text-sm leading-relaxed ${
                        isCorrect ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"
                    }`}
                >
                    {feedback}
                </div>
            )}

            {explanationVisual && (isCorrect || attempts > 0) && (
                <div className="mt-3">
                    {explanationCaption && (
                        <div className="mb-2 text-sm font-medium text-slate-700">
                            {explanationCaption}
                        </div>
                    )}
                    {explanationVisual}
                </div>
            )}
        </div>
    );
};
