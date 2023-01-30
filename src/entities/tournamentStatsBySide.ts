import puppeteer from "puppeteer";
import { usePaths } from "../services/hooks/usePaths";

export interface Datasets {
  labels: string[];
  datasets: [
    {
      data: number[];
      backgroundColor: string[];
    }
  ];
}

export async function getTournamentStatsBySide() {
  const { paths } = usePaths("tournament");

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(`${paths.tournament}`);

  const winRate: Datasets = await page.$$eval(".table_list", (el) => {
    const code = el[3]
      .getElementsByTagName("script")[0]
      .innerText.replace("var dragonData = ", "");

    return JSON.parse(JSON.stringify(code, null, 2));
  });

  await browser.close();
}
