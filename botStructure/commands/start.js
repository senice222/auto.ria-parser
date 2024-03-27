const { Markup } = require("telegraf")


module.exports = (bot) => {
    bot.command("start", async (ctx) => {
        return ctx.reply(
            '🌴 Добро пожаловать в Parser Service!',
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