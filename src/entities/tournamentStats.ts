import puppeteer from "puppeteer";
import { usePaths } from "../services/hooks/usePaths";

export async function getTournamentStats() {
  const { paths } = usePaths("tournament");

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(`${paths.tournament}`);

  const numberOfGames = await page.$eval(
    ".table_list tbody tr:nth-child(1)",
    (el) => {
      const [fieldName, value] = el.innerText.split(":");

      const games = {
        fieldName,
        value: Number(value),
      };

      return games;
    }
  );

  const gameDurantion = await page.$eval(
    ".table_list tbody tr:nth-child(2)",
    (el) => {
      const [fieldName, minutes, seconds] = el.innerText.split(":");

      const time = `${minutes}:${seconds}`.replace("\t", "");

      return {
        fieldName,
        value: time,
      };
    }
  );

  const averageKillsPerGame = await page.$eval(
    ".table_list tbody tr:nth-child(3)",
    (el) => {
      const [fieldName, value] = el.innerText.split(":");

      return {
        fieldName,
        value: Number(value),
      };
    }
  );

  const shortestGame = await page.$eval(
    ".table_list tbody tr:nth-child(4)",
    (el) => {
      const [fieldName, value] = el.innerText.replace(":", "|").split("|");

      return {
        fieldName,
        value: String(value).replace("\t", ""),
      };
    }
  );

  const longestGame = await page.$eval(
    ".table_list tbody tr:nth-child(5)",
    (el) => {
      const [fieldName, value] = el.innerText.replace(":", "|").split("|");

      return {
        fieldName,
        value: String(value).replace("\t", ""),
      };
    }
  );

  const mostKillInGame = await page.$eval(
    ".table_list tbody tr:nth-child(6)",
    (el) => {
      const [fieldName, value] = el.innerText.replace(":", "|").split("|");

      return {
        fieldName,
        value: String(value).replace("\t", ""),
      };
    }
  );

  const tournamentInfos = [
    numberOfGames,
    gameDurantion,
    averageKillsPerGame,
    shortestGame,
    longestGame,
    mostKillInGame,
  ];

  await browser.close();

  return tournamentInfos;
}
