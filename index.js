const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => res.send("Hellow Thanks that you're working !!!!"))

app.listen(PORT, () => console.log('Server has been started...')) 