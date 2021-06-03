import pool from '../config/connection-database.js'

export default class CommentaryController {
  // FUNCION PARA CREAR UN COMENTARIO
  static createCommentary (req, res) {
    const data = req.body
    const inser = {
      id_user: data.id_user,
      commentary_desc: data.commentary_desc
    }
    console.log(inser)
    pool.getConnection((error, connection) => {
      if (error) throw error
      connection.query(
        'CALL Create_Commentary (?,?)',
        [
          inser.id_user,
          inser.commentary_desc

        ],
        (error) => {
          if (!error) {
            connection.release()
            res.status(200).send({ message: 'Comentario creado exitosamente!' })
          } else {
            console.log(error)
            res.status(500).send({ message: 'Algo salio mal al crear los comentarios!' })
          }
        }
      )
    })
  }

  // FUNCION PARA OBTENER COMENTARIOS
  static getUsers (_req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query('SELECT * FROM commentary', (error, results) => {
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
