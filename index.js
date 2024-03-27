const { Telegraf, session } = require("telegraf")

const initBot = () => {
	const bot = new Telegraf("")

	bot.use(session())

	// commands
	require("./botStructure/commands/start")(bot)

	bot.launch()
        .then(console.log('[Parser Bot] Successfully runned'))
}

initBot()