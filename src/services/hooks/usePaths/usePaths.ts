import { Entities, Paths } from "./types";

export const usePaths = (params: Entities) => {
  const paths: Paths = {
    tournament:
      "https://gol.gg/tournament/tournament-stats/CBLOL%20Split%201%202023/",
  };
  return {
    paths,
  };
};
