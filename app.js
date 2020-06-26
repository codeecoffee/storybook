const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
dotenv.config({ path: './config/config.env'})
require('./config/passport')(passport)

connectDB()
const app = express()

//body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'Stories',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection})
}))
app.use(passport.initialize())
app.use(passport.session())

if(process.env.NODE_ENV === 'development'){
  app.use((morgan('dev')))
}

//HBS helpers
const { formatDate } = require('./helpers/hbs')

//View Engine 
app.engine('.hbs', exphbs({helpers:{
  formatDate,
},dafaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))