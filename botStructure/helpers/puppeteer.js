const puppeteer = require('puppeteer')

const LAUNCH_PUPPETEER_OPTS = {
	args: [
		'--no-sandbox',
		'--disable-setuid-sandbox',
		'--disable-dev-shm-usage',
		'--disable-accelerated-2d-canvas',
		'--disable-gpu',
		'--window-size=1920x1080',
	],
}

const PAGE_PUPPETEER_OPTS = {
	networkIdle2Timeout: 5000,
	waitUntil: 'networkidle2',
	timeout: 3000000,
}

const getPageContent = async (url) => {
    try {
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS)
        const page = await browser.newPage()
        await page.goto(url, PAGE_PUPPETEER_OPTS)
        const content = await page.content()

        await browser.close()
        return content
    } catch (e) {
        console.log("something went wrong with page content", e)
    }
}

module.exports = getPageContent