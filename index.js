import cheerio from "cheerio";
import chalk from "chalk";
import { arrayFromLength } from "./helpers/common.js";
import { getPageContent } from "./helpers/puppeteer.js";

const SITE = 'https://auto.ria.com/uk/legkovie/mercedes-benz/?page=';

(async function main() {
    try {
        for (const page of arrayFromLength(8)) {
            const url = `${SITE}${page}`
            const pageContent = await getPageContent(url)
            
        }
    } catch(e) {
        console.log(chalk.red("some error \n"))
        console.log(e)
    }
})()
