

module.exports = (bot) => {
    bot.action("?bmw", async (ctx) => {
        ctx.scene.enter("bmw")
    })
}