const { Markup } = require("telegraf");

const cancelKeyboad = Markup.inlineKeyboard([
    [
        Markup.button.callback('❌ Отменить', '?cancelScene')
    ]
]).resize().reply_markup

module.exports = cancelKeyboad