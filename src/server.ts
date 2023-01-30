import express, { Request, Response } from "express";
import { getTournamentStats } from "./entities/tournamentStats";
import { getTournamentStatsBySide } from "./entities/tournamentStatsBySide";

const app = express();
const port = 3333;

app.get("/tournament-stats", async (request: Request, response: Response) => {
  const stats = await getTournamentStats();
  return response.send(JSON.stringify(stats, null, 2));
});

app.get(
  "/tournament-stats-by-side",
  async (request: Request, response: Response) => {
    getTournamentStatsBySide();
    return response.send(JSON.stringify("stats", null, 2));
  }
);

app.get("/", (request: Request, response: Response) => {
  return response.send(`Server funcionando na porta ${port}`);
});

app.listen(port);
