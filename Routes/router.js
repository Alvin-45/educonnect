const express = require('express')
const userController = require('../Controllers/userController')
const router = new express.Router()

router.post('/register',userController.register)

router.get("/dashboard",userController.allstudentdetails)

router.delete('/dashboard/:id', userController.removestudent);

module.exports = router