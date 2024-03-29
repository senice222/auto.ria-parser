const { Telegraf, Scenes, session } = require("telegraf")

const initBot = () => {
	const bot = new Telegraf("6747367653:AAGm80nmYWPHCEAtgNFLTcAF8_Vf63OvQ14")
	
	bot.use(session())

	const Stage = new Scenes.Stage([
		require("./botStructure/scenes/parsing_scene/parse")
	])

	// middlewares
	bot.use(Stage.middleware())
    require("./botStructure/middlewares/register")(bot)

	// commands
	require("./botStructure/commands/start")(bot)

	// callbacks
	require("./botStructure/callbacks/start")(bot)
	require("./botStructure/callbacks/parse")(bot)

	bot.launch()
        .then(console.log('[Parser Bot] Successfully runned'))
}

module.exports = initBot