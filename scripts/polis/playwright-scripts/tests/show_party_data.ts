import { data } from "./data.ts";
import { transpose } from "./util.ts";

const party_map = {
  自由民主党: "jimin",
  立憲民主党: "rikken",
  公明党: "koumei",
  日本維新の会: "ishin",
  日本共産党: "kyosan",
  国民民主党: "kokumin",
  "国民民主党 （こちらやこちらも）": "kokumin",
  れいわ新選組: "reiwa",
  社会民主党: "syamin",
  参政党: "sansei",
  "参政党 (むしろこちら）": "sansei",
} as { [key: string]: string };

const lines = data.trim().split("\n");
const parties = lines[0]!.split("\t");

const votes = transpose(
  lines.slice(1).map((line) => line.split("\t").map(Number))
);

const famous: { img: string; votes: number[] }[] = [];
parties.forEach((party, i) => {
  const p = party_map[party];
  if (!p) {
    throw new Error("Unknown party: " + party);
  }
  famous.push({ img: p + ".png", votes: votes[i]! });
});

console.log(JSON.stringify(famous, null, 2));
