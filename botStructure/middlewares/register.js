const User = require("../models/User")

module.exports = (bot) => {
    bot.use(async (ctx, next) => {
        const user = await User.findOne({id: ctx.from.id})

        if (!user) {
            const doc = new User({
                id: ctx.from.id,
                username: ctx.from.username
            })
            await doc.save()
        }
        next()
    })
}