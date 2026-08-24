import { useMemo, useState } from "react";
import { Button } from "@/components/atoms";

/** Deterministic pseudo-random generator so each starting data set is stable. */
const createRandomGenerator = (seed: number) => {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
};

interface DataSource {
    id: string;
    label: string;
    axisLabel: string;
    minValue: number;
    maxValue: number;
    shapeNote: string;
    build: () => number[];
}

const POPULATION_SIZE = 200;
const SAMPLE_SIZE = 5;

const DATA_SOURCES: DataSource[] = [
    {
        id: "sprint-times",
        label: "Sprint times",
        axisLabel: "time for the 100 metres (seconds)",
        minValue: 11,
        maxValue: 21,
        shapeNote: "lopsided, with a long tail of slower runners",
        build: () => {
            const random = createRandomGenerator(20260824);
            return Array.from({ length: POPULATION_SIZE }, () => 11.8 + 9 * Math.pow(random(), 2.5));
        },
    },
    {
        id: "audition-scores",
        label: "Audition scores",
        axisLabel: "audition score (out of 20)",
        minValue: 0,
        maxValue: 20,
        shapeNote: "two separate humps, beginners and experienced performers",
        build: () => {
            const random = createRandomGenerator(13572468);
            return Array.from({ length: POPULATION_SIZE }, (_unused, index) => {
                const centre = index % 2 === 0 ? 7 : 15;
                const wobble = (random() + random() + random() - 1.5) * 2.2;
                return Math.min(20, Math.max(0, centre + wobble));
            });
        },
    },
    {
        id: "rehearsal-hours",
        label: "Rehearsal hours",
        axisLabel: "rehearsal hours in a week",
        minValue: 0,
        maxValue: 12,
        shapeNote: "flat — every number of hours about equally common",
        build: () => {
            const random = createRandomGenerator(99887766);
            return Array.from({ length: POPULATION_SIZE }, () => random() * 12);
        },
    },
];

const VIEWBOX_WIDTH = 720;
const VIEWBOX_HEIGHT = 360;
const LEFT_PADDING = 52;
const RIGHT_PADDING = 52;
const PLOT_WIDTH = VIEWBOX_WIDTH - LEFT_PADDING - RIGHT_PADDING;
const POPULATION_AXIS_Y = 150;
const POPULATION_MAX_BAR = 92;
const MEANS_AXIS_Y = 322;
const MEANS_MAX_HEIGHT = 108;
const BIN_COUNT = 44;

export const SampleMeansPileExplorer = () => {
    const [sourceId, setSourceId] = useState(DATA_SOURCES[0].id);
    const [means, setMeans] = useState<number[]>([]);

    const source = DATA_SOURCES.find((candidate) => candidate.id === sourceId) ?? DATA_SOURCES[0];
    const population = useMemo(() => source.build(), [source]);

    const valueToX = (value: number) =>
        LEFT_PADDING +
        ((value - source.minValue) / (source.maxValue - source.minValue)) * PLOT_WIDTH;

    const binWidth = (source.maxValue - source.minValue) / BIN_COUNT;
    const binIndexOf = (value: number) =>
        Math.min(BIN_COUNT - 1, Math.max(0, Math.floor((value - source.minValue) / binWidth)));

    const populationBins = useMemo(() => {
        const bins = new Array<number>(BIN_COUNT).fill(0);
        population.forEach((value) => {
            bins[binIndexOf(value)] += 1;
        });
        return bins;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [population, source]);

    const populationMean =
        population.reduce((sum, value) => sum + value, 0) / population.length;

    const meanBins = useMemo(() => {
        const bins = new Array<number>(BIN_COUNT).fill(0);
        means.forEach((value) => {
            bins[binIndexOf(value)] += 1;
        });
        return bins;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [means, source]);

    const tallestMeanColumn = Math.max(1, ...meanBins);
    const dotSpacing = Math.min(7, MEANS_MAX_HEIGHT / tallestMeanColumn);
    const maxPopulationBin = Math.max(1, ...populationBins);

    const takeSamples = (howMany: number) => {
        const collected: number[] = [];
        for (let sampleNumber = 0; sampleNumber < howMany; sampleNumber += 1) {
            let total = 0;
            for (let pick = 0; pick < SAMPLE_SIZE; pick += 1) {
                total += population[Math.floor(Math.random() * population.length)];
            }
            collected.push(total / SAMPLE_SIZE);
        }
        setMeans((current) => [...current, ...collected]);
    };

    const axisTicks = Array.from({ length: 6 }, (_unused, index) =>
        source.minValue + ((source.maxValue - source.minValue) / 5) * index,
    );

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex flex-wrap gap-2">
                {DATA_SOURCES.map((candidate) => (
                    <Button
                        key={candidate.id}
                        variant={candidate.id === sourceId ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                            setSourceId(candidate.id);
                            setMeans([]);
                        }}
                    >
                        {candidate.label}
                    </Button>
                ))}
            </div>

            <svg
                width="100%"
                viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
                role="img"
                aria-label="The starting data on top, and the pile of sample means building underneath"
            >
                <text x={LEFT_PADDING} y={24} fontSize="13" fill="#475569">
                    The 200 starting values — {source.shapeNote}
                </text>

                {populationBins.map((count, index) => {
                    const height = (count / maxPopulationBin) * POPULATION_MAX_BAR;
                    const x = valueToX(source.minValue + index * binWidth);
                    return (
                        <rect
                            key={`population-${index}`}
                            x={x}
                            y={POPULATION_AXIS_Y - height}
                            width={Math.max(2, PLOT_WIDTH / BIN_COUNT - 1.5)}
                            height={height}
                            fill="#cbd5e1"
                        />
                    );
                })}

                <line
                    x1={valueToX(populationMean)}
                    y1={POPULATION_AXIS_Y - POPULATION_MAX_BAR - 8}
                    x2={valueToX(populationMean)}
                    y2={MEANS_AXIS_Y}
                    stroke="#94a3b8"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                />

                <line
                    x1={LEFT_PADDING}
                    y1={POPULATION_AXIS_Y}
                    x2={LEFT_PADDING + PLOT_WIDTH}
                    y2={POPULATION_AXIS_Y}
                    stroke="#334155"
                    strokeWidth={1.5}
                />

                <text x={LEFT_PADDING} y={188} fontSize="13" fill="#475569">
                    The means of random samples of {SAMPLE_SIZE} — {means.length} collected so far
                </text>

                {meanBins.map((count, binIndex) => {
                    const x =
                        valueToX(source.minValue + binIndex * binWidth) +
                        PLOT_WIDTH / BIN_COUNT / 2;
                    return Array.from({ length: count }, (_unused, dotIndex) => (
                        <circle
                            key={`mean-${binIndex}-${dotIndex}`}
                            cx={x}
                            cy={MEANS_AXIS_Y - 5 - dotIndex * dotSpacing}
                            r={2.8}
                            fill="#2563eb"
                            opacity={0.85}
                        />
                    ));
                })}

                <line
                    x1={LEFT_PADDING}
                    y1={MEANS_AXIS_Y}
                    x2={LEFT_PADDING + PLOT_WIDTH}
                    y2={MEANS_AXIS_Y}
                    stroke="#334155"
                    strokeWidth={1.5}
                />

                {axisTicks.map((tick) => (
                    <g key={tick}>
                        <line
                            x1={valueToX(tick)}
                            y1={MEANS_AXIS_Y}
                            x2={valueToX(tick)}
                            y2={MEANS_AXIS_Y + 6}
                            stroke="#334155"
                            strokeWidth={1.2}
                        />
                        <text
                            x={valueToX(tick)}
                            y={MEANS_AXIS_Y + 21}
                            fontSize="12"
                            fill="#475569"
                            textAnchor="middle"
                        >
                            {tick.toFixed(tick % 1 === 0 ? 0 : 1)}
                        </text>
                    </g>
                ))}

                <text
                    x={LEFT_PADDING + PLOT_WIDTH}
                    y={MEANS_AXIS_Y + 38}
                    fontSize="12"
                    fill="#475569"
                    textAnchor="end"
                >
                    {source.axisLabel}
                </text>
            </svg>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button variant="outline" onClick={() => takeSamples(1)}>
                    Take one sample
                </Button>
                <Button onClick={() => takeSamples(100)}>Pour in 100 samples</Button>
                <Button variant="ghost" onClick={() => setMeans([])}>
                    Clear the pile
                </Button>
            </div>
        </div>
    );
};
