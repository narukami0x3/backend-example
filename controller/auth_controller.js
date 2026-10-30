const model = require('../model/auth_model')
const bcrypt = require('bcrypt')
const jwt = require('../middleware/auth')
const jwt2 = require('jsonwebtoken')

exports.register = async (req,res) => {
    const {username,password,fname,lname,phone,address} = req.body
    try {
        const alreadyexist = await model.checkusername()
        if(alreadyexist) return res.status(400).json({message: "this username already existing"})
            const phash = await bcrypt.hash(password,10)
            const result = await model.register(username,phash,fname,lname,phone,address)
            if(!result) return res.status(400).json({message: "login failed"})
            res.status(200).json({message: "success register"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "internal server error !"})
    }
}

exports.login = async (req,res) => {
    const {username,password} = req.body
    try {
        const user = await model.checkusername(username)
        if(!user) return res.status(400).json({message: "invalid username & password"})
        const ismatch = await bcrypt.compare(password,user.password)
        if(!ismatch) return res.status(400).json({message: "invalid username && password"})
        const token = await jwt.signtoken(user.user_id,user.username,user.role)
        if(!token) return res.status(401).json({message: "unauthorized"})
        console.log(jwt2.decode(token))
        res.status(200).json({message: "success" , Authorization: token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error !"})
    }
}

