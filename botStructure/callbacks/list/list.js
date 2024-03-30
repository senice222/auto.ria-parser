const { Markup } = require("telegraf")
const User = require("../../models/User")


module.exports = (bot) => {
    bot.action("?list", async (ctx) => {
        const currentUser = await User.findOne({id: ctx.from.id})
        
        const buttons = currentUser.parsed.map(obj => {
            return Markup.button.callback(obj.mark, `?list_${obj.id}`)
        })
        buttons.push({text: "🔙 Назад", callback_data: "start"})
        ctx.editMessageText(
            "📚 Список файлов: ",
            {
                reply_markup: Markup.inlineKeyboard([
                    buttons
                ]).resize().reply_markup
            }
        )
    })
}