const { Markup } = require("telegraf")
const User = require("../../models/User")
const { inspect } = require("util")
const fs = require('fs').promises;

module.exports = (bot) => {
    bot.action(/\?list_(.+)/, async (ctx) => {
        const currentUser = await User.findOne({ id: ctx.from.id })
        const id = +ctx.match[1]
        const chosenInfo = currentUser.parsed.find(item => item.id === id);

        if (chosenInfo) {
            const info = chosenInfo.info;
            const fileContents = await fs.readFile(info, 'utf-8');

            const buffer = Buffer.from(fileContents, 'utf-8');

            // ctx.replyWithDocument(
            //     { source: buffer, filename: `cars.json` },
            //     {
            //         reply_markup: Markup.inlineKeyboard([
            //             [Markup.callback("Вернуться обратно", "?list")]
            //         ])
            //     }
            // );
        } else {
            ctx.reply('ℹ️ Information not found for the specified ID.');
        }


        // ctx.replyWithDocument(
        //     { source: inspect(buffer), filename: `cars.json` },
        // {
        //     reply_markup: Markup.inlineKeyboard([
        //         [
        //             Markup.Markup.callback("Вернуться обратно", "?list")
        //         ]
        //     ])
        // }
        // )
    })
}