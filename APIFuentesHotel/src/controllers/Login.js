import pool from '../config/connection-database.js'

export default class LoginController {
// FUNCION PARA LOGIN
  static PostLogin (req, res) {
    const reci = req.body
    let user
    pool.getConnection((error, connection) => {
      if (error) throw error
      connection.query('SELECT * FROM user WHERE email= ?', reci.email, (err, rows) => {
        if (!err) {
          user = rows[0]
          if (user === undefined) {
            res.status(401).send({ status: 401, message: 'user does not exist' })
		  return
          }
          if (reci.password === user.password) {
            res.status(200).send({ status: 200, message: 'Bienvenido' })
          } else {
            res.status(401).send({ status: 401, message: 'login invalid' })
          }
        } else {
          res.status(500).send(err)
        }
      })
    })
  }
}
