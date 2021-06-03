import pool from '../config/connection-database.js'

export default class RoomController {
  static getRooms (_request, response) {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query('SELECT * FROM room', (error, results) => {
        if (error) {
          console.log(error)
        } else {
          response.status(200).send(results)
        }
        connection.release()
        if (error) throw error
      })
    })
  }
}
