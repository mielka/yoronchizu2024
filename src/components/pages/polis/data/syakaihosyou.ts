import { Cache } from "../types";
import json from "./syakaihosyou_api.json";

export const syakaihosyou = json as Cache;
syakaihosyou.naming = {
  0: {
    name: "現役世代負担軽減・改革志向派",
    description:
      "このチームは、高齢者と現役世代の間で負担の公平性を確保することを目指し、高齢者の医療費窓口負担の引き上げや、年金制度の抜本的な改革を推進しています。特に現役世代の負担軽減に強い支持を示しており、社会保険制度の見直しを重視しています。",
  },
  1: {
    name: "低所得高齢者支援・負担分散派",
    description:
      "このチームは、低所得高齢者の支援に重点を置きつつも、現役世代や富裕層にも応分の負担を求める姿勢を取っています。年金や社会保険制度の底上げを進めつつ、社会全体の公平な負担を目指しています。年収の壁の見直しなど、働き方の多様性にも対応しようとしています。",
  },
};
syakaihosyou.date = "2024-11-04";
