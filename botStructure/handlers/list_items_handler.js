const cheerio = require('cheerio')
const { slugify } = require('transliteration')
const User = require('../models/User')
const {inspect} = require("util")

const listItemHandler = async (content, state, ctx) => {
	try {
		const $ = cheerio.load(content)
		const {budget, city} = state 
		const cars = []

		$('.content').each((i, element) => {
			const carInfo = $(element).find(".unstyle .item-char").map((i, child) => $(child).text().trim()).get();
			const {race, carCity, fuel, gearbox} = carInfo
			const carTitle = $(element).find('.address').attr('title').split('в')[0].trim();
			const carHref = $(element).find('.address').attr('href')
			const price = $(element).find('.size15').children('.size22').text().trim()

			if (budget >= price && carCity === city) {
				cars.push({
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
		await User.findOneAndUpdate({ id: ctx.from.id }, {
			$push: {parsed: JSON.stringify(cars)}
		})

		const buffer = Buffer.from(inspect(cars), 'utf-8')
        ctx.replyWithDocument({source: buffer, filename: `cars.json`})

		return ctx.reply('✅ Успешно спаршенно.');
	} catch (e) {
		console.log("error with parsing", e)
	}
}

module.exports = listItemHandler