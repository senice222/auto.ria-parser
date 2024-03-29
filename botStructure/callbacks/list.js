
module.exports = (bot) => {
    bot.action("?list", async (ctx) => {
        ctx.editMessageText(
            "📚 Список файлов: "
        )
    })
}