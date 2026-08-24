import { useMemo, useState } from "react";
import { Button } from "@/components/atoms";

/** Deterministic pseudo-random generator so the squad is the same on every visit. */
const createRandomGenerator = (seed: number) => {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
};

const POPULATION_SIZE = 200;
const SAMPLE_SIZE = 5;

const buildSquadTimes = (): number[] => {
    const random = createRandomGenerator(20260824);
    const times: number[] = [];
    for (let index = 0; index < POPULATION_SIZE; index += 1) {
        const skewed = 11.8 + 9 * Math.pow(random(), 2.5);
        times.push(Math.round(skewed * 10) / 10);
    }
    return times;
};

const VIEWBOX_WIDTH = 720;
const VIEWBOX_HEIGHT = 250;
const LEFT_PADDING = 48;
const RIGHT_PADDING = 48;
const PLOT_WIDTH = VIEWBOX_WIDTH - LEFT_PADDING - RIGHT_PADDING;
const AXIS_Y = 178;
const MIN_TIME = 11.5;
const MAX_TIME = 21.5;

const timeToX = (time: number) =>
    LEFT_PADDING + ((time - MIN_TIME) / (MAX_TIME - MIN_TIME)) * PLOT_WIDTH;

export const SquadSampleMeanExplorer = () => {
    const squadTimes = useMemo(buildSquadTimes, []);
    const [sampleIndices, setSampleIndices] = useState<number[]>([3, 44, 91, 132, 176]);
    const [step, setStep] = useState(0);

    const dotOffsets = useMemo(() => {
        const random = createRandomGenerator(97531);
        return squadTimes.map(() => random());
    }, [squadTimes]);

    const sampleTimes = sampleIndices.map((index) => squadTimes[index]);
    const sampleTotal = Math.round(sampleTimes.reduce((sum, time) => sum + time, 0) * 10) / 10;
    const sampleMean = Math.round((sampleTotal / SAMPLE_SIZE) * 100) / 100;

    const pickNewSample = () => {
        const chosen = new Set<number>();
        while (chosen.size < SAMPLE_SIZE) {
            chosen.add(Math.floor(Math.random() * POPULATION_SIZE));
        }
        setSampleIndices([...chosen].sort((a, b) => a - b));
        setStep(0);
    };

    const stepLabels = ["Add the five times", "Divide by 5", "Working complete"];

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
            <svg
                width="100%"
                viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
                role="img"
                aria-label="All 200 sprint times with five picked at random"
            >
                <text x={LEFT_PADDING} y={26} fontSize="13" fill="#475569">
                    All 200 sprint times on sports day
                </text>

                {squadTimes.map((time, index) => {
                    const isPicked = sampleIndices.includes(index);
                    return (
                        <circle
                            key={index}
                            cx={timeToX(time)}
                            cy={AXIS_Y - 12 - dotOffsets[index] * 106}
                            r={isPicked ? 6 : 2.6}
                            fill={isPicked ? "#e11d48" : "#cbd5e1"}
                            stroke={isPicked ? "#881337" : "none"}
                            strokeWidth={isPicked ? 1.5 : 0}
                        />
                    );
                })}

                {sampleIndices.map((index) => (
                    <line
                        key={`stalk-${index}`}
                        x1={timeToX(squadTimes[index])}
                        y1={AXIS_Y - 12 - dotOffsets[index] * 106}
                        x2={timeToX(squadTimes[index])}
                        y2={AXIS_Y}
                        stroke="#fb7185"
                        strokeWidth={1.2}
                        strokeDasharray="3 3"
                    />
                ))}

                <line
                    x1={LEFT_PADDING}
                    y1={AXIS_Y}
                    x2={LEFT_PADDING + PLOT_WIDTH}
                    y2={AXIS_Y}
                    stroke="#334155"
                    strokeWidth={1.5}
                />

                {[12, 14, 16, 18, 20].map((tick) => (
                    <g key={tick}>
                        <line
                            x1={timeToX(tick)}
                            y1={AXIS_Y}
                            x2={timeToX(tick)}
                            y2={AXIS_Y + 6}
                            stroke="#334155"
                            strokeWidth={1.2}
                        />
                        <text
                            x={timeToX(tick)}
                            y={AXIS_Y + 22}
                            fontSize="12"
                            fill="#475569"
                            textAnchor="middle"
                        >
                            {tick}
                        </text>
                    </g>
                ))}

                <text
                    x={LEFT_PADDING + PLOT_WIDTH}
                    y={AXIS_Y + 42}
                    fontSize="12"
                    fill="#475569"
                    textAnchor="end"
                >
                    time for the 100 metres (seconds)
                </text>

                {step >= 2 && (
                    <g>
                        <line
                            x1={timeToX(sampleMean)}
                            y1={AXIS_Y - 130}
                            x2={timeToX(sampleMean)}
                            y2={AXIS_Y + 8}
                            stroke="#2563eb"
                            strokeWidth={2.5}
                        />
                        <text
                            x={timeToX(sampleMean)}
                            y={AXIS_Y - 138}
                            fontSize="12"
                            fill="#2563eb"
                            textAnchor="middle"
                        >
                            sample mean {sampleMean.toFixed(2)} s
                        </text>
                    </g>
                )}
            </svg>

            <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                <div className="font-medium text-slate-800">The five picked times</div>
                <div className="mt-1 font-mono text-rose-600">
                    {sampleTimes.map((time) => time.toFixed(1)).join("  ·  ")}
                </div>

                {step >= 1 && (
                    <div className="mt-2 font-mono">
                        {sampleTimes.map((time) => time.toFixed(1)).join(" + ")} ={" "}
                        <span className="font-semibold">{sampleTotal.toFixed(1)}</span>
                    </div>
                )}

                {step >= 2 && (
                    <div className="mt-2 font-mono">
                        {sampleTotal.toFixed(1)} ÷ 5 ={" "}
                        <span className="font-semibold text-blue-600">
                            {sampleMean.toFixed(2)} seconds
                        </span>
                    </div>
                )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button
                    variant="outline"
                    onClick={() => setStep((current) => Math.min(current + 1, 2))}
                    disabled={step >= 2}
                >
                    {stepLabels[step]}
                </Button>
                <Button onClick={pickNewSample}>Pick a new five</Button>
            </div>
        </div>
    );
};
