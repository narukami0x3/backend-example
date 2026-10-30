const jwt = require('jsonwebtoken')
require('dotenv').config()

async function signtoken(id,username,role) {
    try {
        const token = await jwt.sign(
            {id: id,username: username,role: role},
            process.env.JWT_SECRET,
            {expiresIn : "2h"}
        )
        return token
    } catch (error) {
        return null
    }
}

const user = async (req,res,next) => {
    const authheader = req.headers['authorization']
    try {
        const decoded = await jwt.verify(authheader, process.env.JWT_SECRET)
        if(decoded.id != 2) return res.status(403).json({error: "unauthorized"})
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({error: "unauthorized"})
    }
}

const admin = async (req,res,next) => {
    const authheader = req.headers['authorization']
    try {
        const decoded = await jwt.verify(authheader, process.env.JWT_SECRET)
        if(decoded.id != 1) return res.status(403).json({error: "unauthorized"})
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({error: "unauthorized"})
    }
}
module.exports = {signtoken,user};