import cheerio from 'cheerio'
import { getPageContent } from '../helpers/puppeteer.js'

export const listItemsHandler = async data => {
	try {
		for (const initialState of data) {
			const detailedContent = await getPageContent(initialState.carHref)
			const $ = cheerio.load(detailedContent)

			// const prices = $('.price_value strong')

			// console.log(prices)
		}
	} catch (e) {
		throw e
	}
}
