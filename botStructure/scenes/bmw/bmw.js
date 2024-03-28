const { Scenes, Markup } = require("telegraf");
const cancelKeyboad = require("./keyboard");
const arrayLength = require("../../helpers/arrray_length");
const getPageContent = require("../../helpers/puppeteer");
const listItemHandler = require("../../handlers/list_items_handler");


const createTask = new Scenes.WizardScene(
    "bmw",
    async (ctx) => {
        ctx.wizard.state.carToParse = {}
        ctx.wizard.state.deleteMessages = []

        ctx.reply(
            `⚙️ <b>Введите ваш бюджет. (В долларах)</b>` +
            '\n<i>Пример: 15000</i>',
            {
                reply_markup: cancelKeyboad,
                parse_mode: "HTML"
            }
        ).then((msg) => ctx.wizard.state.deleteMessages.push(msg.message_id))
        ctx.wizard.next()
    },
    async (ctx) => {
        if (ctx.updateType === "message") {
            ctx.wizard.state.carToParse['budget'] = ctx.message.text

            ctx.reply(
                `🚙 <b>Укажите марку машины.</b>` +
                '\n<i>Пример: BMW (на английском)</i>',
                {
                    reply_markup: cancelKeyboad,
                    parse_mode: "HTML"
                }
            ).then((msg) => ctx.wizard.state.deleteMessages.push(msg.message_id))
            ctx.wizard.next()
        }
    },
    async (ctx) => {
        if (ctx.updateType === "message") {
            ctx.wizard.state.carToParse['mark'] = ctx.message.text

            ctx.reply(
                `🌆 <b>Укажите город. (укр. мовою)</b>` +
                '\n<i>Пример: Киев</i>',
                {
                    reply_markup: cancelKeyboad,
                    parse_mode: "HTML"
                }
            ).then((msg) => ctx.wizard.state.deleteMessages.push(msg.message_id))
            ctx.wizard.next()
        }
    },
    async (ctx) => {
        if (ctx.updateType === "message") {
            ctx.wizard.state.carToParse['city'] = ctx.message.text

            ctx.reply(
                `📖 <b>Количевство страниц с которых нужно спарсить.</b>` +
                '\n<i>Пример: 10</i>',
                {
                    reply_markup: cancelKeyboad,
                    parse_mode: "HTML"
                }
            ).then((msg) => ctx.wizard.state.deleteMessages.push(msg.message_id))
            ctx.wizard.next()
        }
    },
    async (ctx) => {
        if (ctx.updateType === "message") {
            ctx.wizard.state.carToParse['pages'] = ctx.message.text

            ctx.reply('⏳ Начинаем процесс парсинга...');
        
            for (const page of arrayLength(ctx.wizard.state.carToParse.pages)) {
                const URL = `https://auto.ria.com/uk/legkovie/${ctx.wizard.state.carToParse['mark']}/?page=${page}`
                const content = await getPageContent(URL)
                await listItemHandler(content, ctx.wizard.state.carToParse, ctx)
            }
        }
    },
)

createTask.on("message", async (ctx, next) => {
    ctx.wizard.state.deleteMessages.push(ctx.message.message_id)
    next()
})

createTask.action("?cancelScene", async (ctx) => {
    ctx.wizard.state.deleteMessages.map(msg => ctx.deleteMessage(msg))
    ctx.answerCbQuery('Успешно отменено!', { show_alert: true })
    ctx.scene.leave()
})

module.exports = createTask