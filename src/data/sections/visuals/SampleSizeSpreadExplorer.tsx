import { useMemo } from "react";
import { Slider } from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";

/** Deterministic pseudo-random generator so every sample size is compared fairly. */
const createRandomGenerator = (seed: number) => {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
};

const POPULATION_SIZE = 200;
const SAMPLE_COUNT = 300;

const buildSquadTimes = (): number[] => {
    const random = createRandomGenerator(20260824);
    return Array.from({ length: POPULATION_SIZE }, () => 11.8 + 9 * Math.pow(random(), 2.5));
};

const VIEWBOX_WIDTH = 720;
const VIEWBOX_HEIGHT = 300;
const LEFT_PADDING = 52;
const RIGHT_PADDING = 52;
const PLOT_WIDTH = VIEWBOX_WIDTH - LEFT_PADDING - RIGHT_PADDING;
const AXIS_Y = 236;
const MAX_BAR_HEIGHT = 150;
const MIN_TIME = 11;
const MAX_TIME = 21;
const BIN_COUNT = 60;

const timeToX = (time: number) =>
    LEFT_PADDING + ((time - MIN_TIME) / (MAX_TIME - MIN_TIME)) * PLOT_WIDTH;

export const SampleSizeSpreadExplorer = () => {
    const sampleSize = useVar("sampleSize", 5) as number;
    const setVar = useSetVar();
    const population = useMemo(buildSquadTimes, []);

    const squadMean = population.reduce((sum, value) => sum + value, 0) / population.length;

    const means = useMemo(() => {
        const random = createRandomGenerator(555000 + sampleSize);
        const collected: number[] = [];
        for (let sampleNumber = 0; sampleNumber < SAMPLE_COUNT; sampleNumber += 1) {
            let total = 0;
            for (let pick = 0; pick < sampleSize; pick += 1) {
                total += population[Math.floor(random() * POPULATION_SIZE)];
            }
            collected.push(total / sampleSize);
        }
        return collected;
    }, [population, sampleSize]);

    const spread = useMemo(() => {
        const average = means.reduce((sum, value) => sum + value, 0) / means.length;
        const variance =
            means.reduce((sum, value) => sum + (value - average) ** 2, 0) / means.length;
        return Math.sqrt(variance);
    }, [means]);

    const binWidth = (MAX_TIME - MIN_TIME) / BIN_COUNT;
    const bins = useMemo(() => {
        const counts = new Array<number>(BIN_COUNT).fill(0);
        means.forEach((value) => {
            const index = Math.min(
                BIN_COUNT - 1,
                Math.max(0, Math.floor((value - MIN_TIME) / binWidth)),
            );
            counts[index] += 1;
        });
        return counts;
    }, [means, binWidth]);

    const tallestBin = Math.max(1, ...bins);

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
            <svg
                width="100%"
                viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
                role="img"
                aria-label="The pile of 300 sample means, reshaping as the sample size changes"
            >
                <text x={LEFT_PADDING} y={24} fontSize="13" fill="#475569">
                    300 sample means, each from a random sample of {sampleSize} runners
                </text>

                {bins.map((count, index) => {
                    const height = (count / tallestBin) * MAX_BAR_HEIGHT;
                    return (
                        <rect
                            key={index}
                            x={timeToX(MIN_TIME + index * binWidth)}
                            y={AXIS_Y - height}
                            width={Math.max(2, PLOT_WIDTH / BIN_COUNT - 1)}
                            height={height}
                            fill="#60a5fa"
                        />
                    );
                })}

                <line
                    x1={timeToX(squadMean)}
                    y1={AXIS_Y - MAX_BAR_HEIGHT - 22}
                    x2={timeToX(squadMean)}
                    y2={AXIS_Y}
                    stroke="#334155"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                />
                <text
                    x={timeToX(squadMean)}
                    y={AXIS_Y - MAX_BAR_HEIGHT - 30}
                    fontSize="12"
                    fill="#334155"
                    textAnchor="middle"
                >
                    squad average {squadMean.toFixed(2)} s
                </text>

                <line
                    x1={timeToX(squadMean - 2 * spread)}
                    y1={AXIS_Y - 8}
                    x2={timeToX(squadMean + 2 * spread)}
                    y2={AXIS_Y - 8}
                    stroke="#be123c"
                    strokeWidth={3}
                />
                {[-2, 2].map((side) => (
                    <line
                        key={side}
                        x1={timeToX(squadMean + side * spread)}
                        y1={AXIS_Y - 16}
                        x2={timeToX(squadMean + side * spread)}
                        y2={AXIS_Y}
                        stroke="#be123c"
                        strokeWidth={3}
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
                            y={AXIS_Y + 21}
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
                    y={AXIS_Y + 40}
                    fontSize="12"
                    fill="#475569"
                    textAnchor="end"
                >
                    sample mean time (seconds)
                </text>
            </svg>

            <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
                    <span>Runners in each sample</span>
                    <span className="font-semibold text-blue-600">{sampleSize}</span>
                </div>
                <Slider
                    value={[sampleSize]}
                    min={2}
                    max={30}
                    step={1}
                    onValueChange={(value) => setVar("sampleSize", value[0])}
                />
            </div>

            <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                Almost every sample mean lands inside the red bar, which is currently{" "}
                <span className="font-semibold text-rose-600">
                    {(4 * spread).toFixed(2)} seconds
                </span>{" "}
                wide. Move the slider and watch that width.
            </div>
        </div>
    );
};
