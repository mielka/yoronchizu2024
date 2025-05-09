import { Cache } from "../types";
import json from "./seijisikin_api.json";

export const seijisikin = json as Cache;
seijisikin.naming = {
  0: {
    name: "政策活動費透明化・段階的改革派",
    description:
      "このチームは政策活動費の透明性を重視し、使途公開の義務化を支持しています。ただし、即時廃止には慎重な姿勢を示し、段階的な改革を模索しています。企業・団体献金に対しては賛否が分かれていますが、基本的には政策活動費の維持とその改善を求めています。",
  },
  1: {
    name: "企業団体献金禁止・即時改革派",
    description:
      "このチームは企業・団体献金の全面禁止を強く支持し、政策活動費の即時廃止にも積極的です。特に、政治資金に対する厳格な監査制度を確立し、政治資金の透明性を確保することを最優先としています。また、政治資金パーティーの禁止など、抜本的な改革を推進しています。",
  },
};
seijisikin.date = "2024-11-04";
