import cheerio from 'cheerio'
import { getPageContent } from '../helpers/puppeteer.js'

export const listItemsHandler = async data => {
	try {
		for (const initialState of data) {
			const detailedContent = await getPageContent(initialState.carHref)
			const $ = cheerio.load(detailedContent)

			const price = $('.price_value').each((i, header) => {
				console.log($, { header }.find())
			})
			const label = $('.label').text()
			const argument = $('.argument').text()

			console.log({
				label,
				argument,
			})
		}
	} catch (e) {
		throw e
	}
}
