const mongoose = require("mongoose");
const initBot = require("./bot");

mongoose.connect("mongodb://localhost:27017/parser", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(async () => {
		console.log('[Parser] MongoDB connected successfully!');
		initBot()
	})
	.catch(e => console.error('[Parser] Fatal error occurred while connecting to MongoDB:', e))

process.on('SIGINT', async () => {
	try {
		await mongoose.connection.close();
		console.log('Closed connection with MongoDB successfully');
	} catch (error) {
		console.error('Error closing MongoDB connection:', error);
	} finally {
		process.exit();
	}
});