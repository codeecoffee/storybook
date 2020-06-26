const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

//Show add Page
//GET /stories/add 

router.get('/add', ensureAuth, (req,res)=>{
  res.render('stories/add')
})

//Process the add form
//POST
router.get('/', ensureAuth, async(req,res)=>{
  try{
    req.body.user = req.user.id
    await Story.create(req.body)
    res.redirect('/dashboard')
    
  }catch(err){
    console.log(err)
    res.render('error/500')
  }
})