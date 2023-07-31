const PORT = 8080
const URL = 'https://www.bcv.org.ve/'

const https = require('https');
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})

axios.get(URL, {httpsAgent})
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        $('#dolar', html).each(function() {
            const dolar = $(this).find('strong').text()
            console.log(`El precio del dolar es: ${dolar}`);
        })
    })

app.get('/', (req, res) => {
    res.send(
        '<h1>Welcome</h1>'
    )
})

app.listen(PORT, () => {
    console.log(`
        Listening on http://127.0.0.1:${PORT}  
    `)
})