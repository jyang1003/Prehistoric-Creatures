#Creating a node app

mkdir

cd


npm init

npm install _______

echo "" >> .gitignore

code .

const express = require('express.js)

const app = express()

same with ejs

middleware:

app.set('view engine', 'ejs')

app.use(ejsLayouts)

app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method'))

app.use('/path', require('./path1/path2.js'))

app.use('/path', require('./path1/path2.js'))
