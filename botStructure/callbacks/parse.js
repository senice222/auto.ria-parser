

module.exports = (bot) => {
    bot.action("?parse", async (ctx) => {
        ctx.scene.enter("parse")
    })
}