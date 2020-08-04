const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.render('index'));

app.listen(PORT, () => console.log('Server has been started...')) 