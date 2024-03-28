const { Markup } = require("telegraf")
const User = require("../models/User")

module.exports = (bot) => {
    bot.action("start", async (ctx) => {
        const user = await User.findOne({id: ctx.from.id})

        return ctx.reply(
            `🌴 Добро пожаловать в Parsing Service! ` + 
            `\n\n🥷 Твой ID: ${user.id} ` + 
            `\n💎 Спаршенно файлов: ${user.parsed.length}`,
            {
                reply_markup: Markup.inlineKeyboard([
                    [
                        Markup.button.callback("BMW", "?bmw"),
                        Markup.button.callback("Mercedes", "?mercedes"),
                    ],
                    [
                        Markup.button.callback("Hyundai", "?hyundai"),
                        Markup.button.callback("Audi", "?audi"),
                    ],
                ]).resize().reply_markup
            }
        )
    })
}