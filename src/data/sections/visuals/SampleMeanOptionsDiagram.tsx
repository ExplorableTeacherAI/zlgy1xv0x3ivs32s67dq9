const VIEWBOX_WIDTH = 720;
const VIEWBOX_HEIGHT = 330;
const LINE_START_X = 208;
const LINE_END_X = 690;
const MIN_TIME = 12.5;
const MAX_TIME = 16.5;

const timeToX = (time: number) =>
    LINE_START_X + ((time - MIN_TIME) / (MAX_TIME - MIN_TIME)) * (LINE_END_X - LINE_START_X);

interface OptionRow {
    label: string;
    verdict: string;
    verdictColor: string;
    classmateMean: number;
    note: string;
}

const YOUR_MEAN = 14.2;

const OPTION_ROWS: OptionRow[] = [
    {
        label: "Exactly the same",
        verdict: "wrong",
        verdictColor: "#dc2626",
        classmateMean: 14.2,
        note: "Only happens if they pick the very same five runners.",
    },
    {
        label: "Close, but a bit different",
        verdict: "correct",
        verdictColor: "#059669",
        classmateMean: 14.72,
        note: "Different runners, same squad — so a nearby but different total.",
    },
    {
        label: "Completely unrelated",
        verdict: "wrong",
        verdictColor: "#dc2626",
        classmateMean: 16.35,
        note: "A mean out here needs five unusually slow runners, which is rare.",
    },
];

export const SampleMeanOptionsDiagram = () => (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
        <svg
            width="100%"
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            role="img"
            aria-label="Three number lines comparing your sample mean with a classmate's under each answer option"
        >
            <circle cx={22} cy={20} r={6} fill="#e11d48" />
            <text x={34} y={25} fontSize="12" fill="#475569">
                your mean (14.20 s)
            </text>
            <circle cx={196} cy={20} r={6} fill="#2563eb" />
            <text x={208} y={25} fontSize="12" fill="#475569">
                your classmate&apos;s mean
            </text>

            {OPTION_ROWS.map((row, index) => {
                const lineY = 92 + index * 88;
                return (
                    <g key={row.label}>
                        <text x={12} y={lineY - 12} fontSize="13" fill="#0f172a">
                            {row.label}
                        </text>
                        <text x={12} y={lineY + 8} fontSize="12" fill={row.verdictColor}>
                            {row.verdict}
                        </text>

                        <line
                            x1={LINE_START_X}
                            y1={lineY}
                            x2={LINE_END_X}
                            y2={lineY}
                            stroke="#94a3b8"
                            strokeWidth={1.5}
                        />

                        {[13, 14, 15, 16].map((tick) => (
                            <g key={tick}>
                                <line
                                    x1={timeToX(tick)}
                                    y1={lineY}
                                    x2={timeToX(tick)}
                                    y2={lineY + 5}
                                    stroke="#94a3b8"
                                    strokeWidth={1}
                                />
                                <text
                                    x={timeToX(tick)}
                                    y={lineY + 19}
                                    fontSize="10"
                                    fill="#94a3b8"
                                    textAnchor="middle"
                                >
                                    {tick}
                                </text>
                            </g>
                        ))}

                        {index === 0 && (
                            <line
                                x1={timeToX(YOUR_MEAN)}
                                y1={lineY - 30}
                                x2={timeToX(YOUR_MEAN)}
                                y2={lineY}
                                stroke="#cbd5e1"
                                strokeWidth={1.2}
                            />
                        )}
                        <circle cx={timeToX(YOUR_MEAN)} cy={lineY - 14} r={7} fill="#e11d48" />
                        <circle
                            cx={timeToX(row.classmateMean)}
                            cy={index === 0 ? lineY - 30 : lineY - 14}
                            r={7}
                            fill="#2563eb"
                            opacity={index === 0 ? 0.75 : 1}
                        />

                        <text
                            x={LINE_END_X}
                            y={lineY + 36}
                            fontSize="12"
                            fill="#475569"
                            textAnchor="end"
                        >
                            {row.note}
                        </text>
                    </g>
                );
            })}
        </svg>
    </div>
);
