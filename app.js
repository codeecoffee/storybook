const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
dotenv.config({ path: './config/config.env'})
require('./config/passport')(passport)

connectDB()
const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'Stories',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

if(process.env.NODE_ENV === 'development'){
  app.use((morgan('dev')))
}
//View Engine 
app.engine('.hbs', exphbs({dafaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))