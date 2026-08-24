import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";

import { centralLimitTheoremIntroBlocks } from "./sections/CentralLimitTheoremIntroSection";
import { takingASampleBlocks } from "./sections/TakingASampleSection";
import { averageIsNotAPersonBlocks } from "./sections/AverageIsNotAPersonSection";
import { manySamplesBlocks } from "./sections/ManySamplesSection";
import { biggerSamplesBlocks } from "./sections/BiggerSamplesSection";
import { wrappingUpBlocks } from "./sections/WrappingUpSection";

useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

export const blocks: ReactElement[] = [
    ...centralLimitTheoremIntroBlocks,
    ...takingASampleBlocks,
    ...averageIsNotAPersonBlocks,
    ...manySamplesBlocks,
    ...biggerSamplesBlocks,
    ...wrappingUpBlocks,
];
