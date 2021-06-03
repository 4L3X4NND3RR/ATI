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
            res.status(401).send('user does not exist')
          }
          if (reci.password === user.password) {
            res.status(200).send({ message: 'Bienvenido' })
          } else {
            res.status(401).send('login invalid')
          }
        } else {
          res.status(500).send(err)
        }
      })
    })
  }
}
