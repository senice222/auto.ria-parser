const fs = require('fs') 
const path = require('path') 
const { fileURLToPath } = require('url') 

export const saver = async (data) => {
    const { code } = data
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileName = `${code}.json`
    const filePath = path.join(__dirname, "..", "data", fileName)

    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), err => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}