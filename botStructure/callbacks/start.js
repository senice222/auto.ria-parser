const { Markup } = require("telegraf")
const User = require("../models/User")

module.exports = (bot) => {
    bot.action("start", async (ctx) => {
        const user = await User.findOne({id: ctx.from.id})
        
        return ctx.editMessageText(
            `🌴 Добро пожаловать в Parsing Service! ` + 
            `\n\n🥷 Твой ID: ${user.id} ` + 
            `\n💎 Спаршенно файлов: ${user.parsed.length}`,
            {
                reply_markup: Markup.inlineKeyboard([
                    [
                        Markup.button.callback("Начать парсинг", "?parse"),
                    ],
                    [
                        Markup.button.callback("Получить файлы", "?list"),
                    ],
                ]).resize().reply_markup
            }
        )
    })
}