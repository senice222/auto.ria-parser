const cheerio = require('cheerio')
const { slugify } = require('transliteration')
const User = require('../models/User')
const { inspect } = require("util")

const parsingHandler = async (content, state, ctx, maxPage, carsList) => {
	try {
		const $ = cheerio.load(content)
		const {budget, pages, mark} = state

		$('.content').each((i, element) => {
			const carInfo = $(element).find(".unstyle .item-char").map((i, child) => $(child).text().trim()).get();
			const race = carInfo[0];
			const carCity = carInfo[1];
			const fuel = carInfo[2];
			const gearbox = carInfo[3]
			const carTitle = $(element).find('.address').attr('title').split('в')[0].trim();
			const carHref = $(element).find('.address').attr('href')
			const price = $(element).find('.size15').children('.size22').text().trim()
			
			const numericPrice = parseFloat(price.replace(/\D/g, ''))

			if (+budget >= numericPrice) {
				carsList.push({
					carTitle,
					carHref,
					carRace: race,
					city: carCity,
					fuelType: fuel,
					typeGearbox: gearbox,
					price,
					code: slugify(carTitle),
				})
			} else {
				console.log("not found any cars")
			}
		});

		if (+pages === maxPage) {
			const id = new Date().valueOf()
			await User.findOneAndUpdate({ id: ctx.from.id }, {
				$push: { parsed: {id, mark, info: JSON.stringify(carsList)} }
			})
	
			const buffer = Buffer.from(inspect(carsList), 'utf-8')
			ctx.replyWithDocument({ source: buffer, filename: `cars.json` })
			return ctx.reply('✅ Успешно спаршенно.');
		}
	} catch (e) {
		console.log("error with parsing", e)
	}
}

module.exports = parsingHandler