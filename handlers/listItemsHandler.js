const cheerio = require('cheerio')
const { slugify } = require('transliteration')
const { saver } = require('./saver.js')

export const listItemsHandler = async (pageContent) => {
	try {
		const $ = cheerio.load(pageContent)
		const cars = []

		$('.content').each((i, element) => {
			const carTitle = $('.address').attr('title')
			const carHref = $('.address').attr('href')
			const carInfo = $(element).find(".item-char").map((i, child) => {
				return $(child).text().trim()
			}).get()
			const [race, city, fuel, gearbox] = carInfo
			const price = $(element).find('.size15').children('.size22').text().trim()

			cars.push({
				carTitle,
				carHref,
				carRace: race,
				city,
				fuelType: fuel,
				typeGearbox: gearbox,
				price,
				code: slugify(carTitle),
			})
		});
		
		for (const initialState of cars) {
			await saver(initialState)
		}
	} catch (e) {
		throw e
	}
}
