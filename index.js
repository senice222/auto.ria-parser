import chalk from 'chalk'
import cheerio from 'cheerio'
import { slugify } from 'transliteration'
import { listItemsHandler } from './handlers/listItemsHandler.1.js'
import { arrayFromLength } from './helpers/common.js'
import { getPageContent } from './helpers/puppeteer.js'

const SITE = 'https://auto.ria.com/uk/legkovie/mercedes-benz/?page='

;(async function main() {
	try {
		for (const page of arrayFromLength(8)) {
			const url = `${SITE}${page}`
			const pageContent = await getPageContent(url)
			const $ = cheerio.load(pageContent)
			const cars = []

			$('.address').each((i, header) => {
				const carTitle = $(header).attr('title')
				const carHref = $(header).attr('href')

				cars.push({
					carTitle,
					carHref,
					code: slugify(carTitle),
				})
			});
			await listItemsHandler(cars)
		}
	} catch (e) {
		console.log(chalk.red('some error \n'))
		console.log(e)
	}
})()
