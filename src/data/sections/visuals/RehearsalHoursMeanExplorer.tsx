import { useRef, useState, type PointerEvent } from "react";
import { Button } from "@/components/atoms";

const PERFORMERS = ["Amara", "Ben", "Chloe", "Dev", "Erin"];
const STARTING_HOURS = [3.5, 5, 6.5, 9, 4.5];

const VIEWBOX_WIDTH = 720;
const VIEWBOX_HEIGHT = 240;
const LEFT_PADDING = 60;
const RIGHT_PADDING = 60;
const PLOT_WIDTH = VIEWBOX_WIDTH - LEFT_PADDING - RIGHT_PADDING;
const AXIS_Y = 120;
const MIN_HOURS = 0;
const MAX_HOURS = 12;

const hoursToX = (hours: number) =>
    LEFT_PADDING + ((hours - MIN_HOURS) / (MAX_HOURS - MIN_HOURS)) * PLOT_WIDTH;

const xToHours = (x: number) => {
    const raw = ((x - LEFT_PADDING) / PLOT_WIDTH) * (MAX_HOURS - MIN_HOURS) + MIN_HOURS;
    const snapped = Math.round(raw * 2) / 2;
    return Math.min(MAX_HOURS, Math.max(MIN_HOURS, snapped));
};

export const RehearsalHoursMeanExplorer = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [hours, setHours] = useState<number[]>(STARTING_HOURS);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

    const total = Math.round(hours.reduce((sum, value) => sum + value, 0) * 10) / 10;
    const mean = Math.round((total / hours.length) * 100) / 100;
    const someoneMatchesMean = hours.some((value) => Math.abs(value - mean) < 0.001);

    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
        if (draggingIndex === null || !svgRef.current) return;
        const bounds = svgRef.current.getBoundingClientRect();
        const svgX = ((event.clientX - bounds.left) / bounds.width) * VIEWBOX_WIDTH;
        setHours((current) =>
            current.map((value, index) => (index === draggingIndex ? xToHours(svgX) : value)),
        );
    };

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
            <svg
                ref={svgRef}
                width="100%"
                viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
                role="img"
                aria-label="Five performers' rehearsal hours as dots, with their mean marked below the line"
                onPointerMove={handlePointerMove}
                onPointerUp={() => setDraggingIndex(null)}
                onPointerLeave={() => setDraggingIndex(null)}
                style={{ touchAction: "none" }}
            >
                <text x={LEFT_PADDING} y={24} fontSize="13" fill="#475569">
                    Hours each performer rehearsed this week — drag any dot
                </text>

                <line
                    x1={LEFT_PADDING}
                    y1={AXIS_Y}
                    x2={LEFT_PADDING + PLOT_WIDTH}
                    y2={AXIS_Y}
                    stroke="#334155"
                    strokeWidth={1.5}
                />

                {[0, 2, 4, 6, 8, 10, 12].map((tick) => (
                    <g key={tick}>
                        <line
                            x1={hoursToX(tick)}
                            y1={AXIS_Y}
                            x2={hoursToX(tick)}
                            y2={AXIS_Y + 6}
                            stroke="#334155"
                            strokeWidth={1.2}
                        />
                        <text
                            x={hoursToX(tick)}
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
                    y={AXIS_Y + 38}
                    fontSize="12"
                    fill="#475569"
                    textAnchor="end"
                >
                    rehearsal hours
                </text>

                {hours.map((value, index) => (
                    <g key={PERFORMERS[index]}>
                        <text
                            x={hoursToX(value)}
                            y={AXIS_Y - 46}
                            fontSize="12"
                            fill="#9f1239"
                            textAnchor="middle"
                        >
                            {PERFORMERS[index]}
                        </text>
                        <circle
                            cx={hoursToX(value)}
                            cy={AXIS_Y - 26}
                            r={12}
                            fill={draggingIndex === index ? "#be123c" : "#f43f5e"}
                            stroke="#881337"
                            strokeWidth={1.5}
                            style={{ cursor: "grab" }}
                            onPointerDown={() => setDraggingIndex(index)}
                        />
                        <text
                            x={hoursToX(value)}
                            y={AXIS_Y - 22}
                            fontSize="10"
                            fill="#ffffff"
                            textAnchor="middle"
                            pointerEvents="none"
                        >
                            {value}
                        </text>
                    </g>
                ))}

                <polygon
                    points={`${hoursToX(mean)},${AXIS_Y + 52} ${hoursToX(mean) - 9},${AXIS_Y + 68} ${hoursToX(mean) + 9},${AXIS_Y + 68}`}
                    fill="#2563eb"
                />
                <text
                    x={hoursToX(mean)}
                    y={AXIS_Y + 86}
                    fontSize="13"
                    fill="#2563eb"
                    textAnchor="middle"
                >
                    mean {mean.toFixed(2)} hours
                </text>
            </svg>

            <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                <div className="font-mono">
                    {hours.join(" + ")} = {total.toFixed(1)}, and {total.toFixed(1)} ÷ 5 ={" "}
                    <span className="font-semibold text-blue-600">{mean.toFixed(2)} hours</span>
                </div>
                <div className="mt-2">
                    {someoneMatchesMean
                        ? "Right now one performer happens to sit exactly on the mean — but the mean was still worked out from all five, not read off that one dot."
                        : "No performer sits on the blue mean marker. The mean describes the group, not any one person in it."}
                </div>
            </div>

            <div className="mt-3">
                <Button variant="outline" onClick={() => setHours(STARTING_HOURS)}>
                    Reset the dots
                </Button>
            </div>
        </div>
    );
};
