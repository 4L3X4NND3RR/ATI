import pool from '../config/connection-database.js'

export default class UserController {
  // FUNCION PARA CREAR UN USUARIO
  static createUser (req, res) {
    const data = req.body
    const inser = {
      primer_nombre: data.primer_nombre,
      segundo_nombre: data.segundo_nombre,
      primer_apellido: data.primer_apellido,
      segundo_apellido: data.segundo_apellido,
      email: data.email,
      password: data.password
    }
    console.log(inser)
    pool.getConnection((error, connection) => {
      if (error) throw error
      connection.query(
        'CALL Create_User (?,?,?,?,?,?)',
        [
          inser.primer_nombre,
          inser.segundo_nombre,
          inser.primer_apellido,
          inser.segundo_apellido,
          inser.email,
          inser.password
        ],
        (error) => {
          if (!error) {
            connection.release()
            res.status(200).send({ message: 'Usuario creado exitosamente!' })
          } else {
            console.log(error)
            res.status(500).send({ message: 'Algo salio mal al crear los usuarios!' })
          }
        }
      )
    })
  }

  // FUNCION PARA OBTENER UN USUARIO
  static getUsers (_req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query('SELECT * FROM user', (error, results) => {
        if (error) {
          console.log(error)
        } else {
          res.status(200).send(results)
        }
        connection.release()
        if (error) throw error
      })
    })
  }
}
