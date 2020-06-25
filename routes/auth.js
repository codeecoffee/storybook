const express = require('express')
const router = express.Router()
const passport = require('passport')

//Uth with google 
//Get '/auth/google'
router.get('/google',passport.authenticate('google', {scope: ['profile']}))

//CB
//Get /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
(req, res)=>{
  res.redirect('/dashboard')
})

//Logout user 
// /auth/logout
router.get('/logout',(req, res)=>{
  req.logout()
  res.redirect('/')
})


module.exports = router