import { Cache } from "../types";
import json from "./energy_api.json";

export const energy = json as Cache;
energy.naming = {
  0: {
    name: "原発依存減・新設反対派",
    description:
      "このチームは原子力発電の依存度を可能な限り低減し、新たな原子力発電所の新設を認めない立場をとっています。ほとんどのメンバーが原発依存の低減に賛成し、新増設反対の姿勢を明確にしています。",
  },
  1: {
    name: "原発活用・技術推進派",
    description:
      "このチームは原子力発電を最大限活用し、特に核融合発電技術の開発に注力しています。原発の再稼働を支持し、原子力発電所の新増設には反対するものの、技術的な進展を重視する姿勢が特徴です。",
  },
};
energy.date = "2024-11-04";
