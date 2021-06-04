import pool from '../config/connection-database.js'

export default class ReservationController {
  // FUNCION PARA CREAR UNA RESERVACION
  static createReservation (req, res) {
    const data = req.body
    const inser = {
      id_room: data.id_room,
      id_user: data.id_user,
      init_date: data.init_date,
      final_date: data.final_date
    }
    console.log(inser)
    pool.getConnection((error, connection) => {
      if (error) throw error
      connection.query(
        'CALL Create_Reservation (?,?,?,?)',
        [
          inser.id_room,
          inser.id_user,
          inser.init_date,
          inser.final_date
        ],
        (error) => {
          if (!error) {
            connection.release()
            res.status(200).send({ message: 'Habitación Reservada exitosamente!' })
          } else {
            console.log(error)
            res.status(500).send({ message: 'Algo salio mal al reservar los usuarios!' })
          }
        }
      )
    })
  }

  // FUNCION PARA OBTENER RESERVACIONES
  static getReservations (_req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query('SELECT * FROM reservation', (error, results) => {
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
