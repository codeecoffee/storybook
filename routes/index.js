const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
//Login/landing page
//Get '/'
router.get('/', ensureGuest, (req, res)=>{
  res.render('login',{
    layout: 'login'
  })
})
//Dashboard
router.get('/dashboard', ensureAuth, (req, res)=>{
  res.reder('dashboard')
})


module.exports = router