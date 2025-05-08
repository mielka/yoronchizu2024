import * as d3 from "d3";
import { PCA, ScatterPoint } from "./types";

// baseClustersScaled, ptptoisProjected

// in globals
const side = 730;
export const scatterPadding = 10;
export const sideWithPadding = side + scatterPadding * 2;
export const svgHeightWithPadding = sideWithPadding / 1.5;
export const svgHeightWithoutPadding =
  svgHeightWithPadding - scatterPadding * 2;
export let pca_to_screnn_x = (x: number) => x;
export let pca_to_screen_y = (x: number) => x;

const graphUtil = (math: PCA) => {
  const allXs: number[] = [];
  const allYs: number[] = [];

  const baseClusterIdToGid = (baseClusterId: number): number => {
    const clusters = math["group-clusters"];
    const cluster = clusters.find((c: { id: number; members: number[] }) =>
      c.members.includes(baseClusterId)
    );
    return cluster ? cluster.id : -1;
  };

  // participants
  const { x: clusterXs, y: clusterYs, id: bids } = math["base-clusters"];
  const baseClusters: ScatterPoint[] = clusterXs.map((x: number, i: number) => {
    const y: number = clusterYs[i]!;
    const bid: number = bids[i]!;
    const gid: number = baseClusterIdToGid(bid);

    allXs.push(x);
    allYs.push(y);

    return { x, y, bid, gid };
  });

  // // ptptois
  // for (let i = 0; i < ptptois.length; i++) {
  //   const p = ptptois[i];
  //   allXs.push(p.x);
  //   allYs.push(p.y);
  // }

  const border = 35;
  const minClusterX = Math.min(...allXs);
  const maxClusterX = Math.max(...allXs);
  const minClusterY = Math.min(...allYs);
  const maxClusterY = Math.max(...allYs);
  pca_to_screnn_x = d3
    .scaleLinear()
    .domain([minClusterX, maxClusterX])
    .range([border, 730 - border]);
  pca_to_screen_y = d3
    .scaleLinear()
    .domain([minClusterY, maxClusterY])
    .range([border, svgHeightWithoutPadding - border]);

  const baseClustersScaled: ScatterPoint[] = baseClusters.map(
    (p: ScatterPoint) => ({
      ...p,
      x: pca_to_screnn_x(p.x),
      y: pca_to_screen_y(p.y),
    })
  );

  // const ptptoisProjected = ptptois.map((p: { x: number; y: number; }) => ({
  //   ...p,
  //   x: xx(p.x),
  //   y: yy(p.y),
  // }));

  const pointsForHullGeneration: { [gid: number]: Groups } = {};

  function addPoint(o: Group) {
    const list = pointsForHullGeneration[o.gid];
    if (list) {
      list.push(o);
    } else {
      pointsForHullGeneration[o.gid] = [o];
    }
  }
  baseClustersScaled.forEach(addPoint);
  // console.log(pointsForHullGeneration);

  type Hull = [number, number][];
  type Group = { gid: number; x: number; y: number };
  type Groups = Group[];
  type Hulls = { group: Groups; hull: Hull }[];
  const hulls: Hulls = [];

  Object.values(pointsForHullGeneration).forEach((group: Groups) => {
    // if (group.length <= 10) {
    const offset = 30;
    // オフセットを追加
    group.forEach((point: Group) => {
      const { x, y } = point;
      for (let i = 0; i < 10; i++) {
        const newPoint: Group = {
          gid: group[0]!.gid,
          x: x + Math.sin((i / 10) * 6.28) * offset,
          y: y + Math.cos((i / 10) * 6.28) * offset,
        };
        group.push(newPoint);
      }
    });
    // }

    const pairs: [number, number][] = group.map(({ x, y }) => [x, y]);
    const hull = d3.polygonHull(pairs);
    if (hull === null) return;
    hulls.push({ group, hull });
  });

  return {
    baseClustersScaled,
    // ptptoisProjected,
    hulls,
  };
};

export default graphUtil;
