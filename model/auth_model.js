const {pool} = require('./conn')

const register = async (username,password,fname,lname,phone,address) => {
    let conn = await pool.getConnection()
    try{
        const [row] = await conn.query(
            `INSERT INTO users (username,password,fname,lname,phone,address,role) VALUES (?,?,?,?,?,?,2)`,
            [username,password,fname,lname,phone,address]
        )
        return row.insertId || null
    }finally{
        conn.release()
    }
}

const checkusername = async (username) => {
    let conn = await pool.getConnection()
    try{
        const [row] = await conn.query(
            `SELECT * FROM users WHERE username = ?`,
            [username]
        )
        return row[0] || null
    }finally{
        conn.release()
    }
}

module.exports = {
    register,
    checkusername
}