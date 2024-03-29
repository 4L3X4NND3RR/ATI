import Router from 'express'
import UserController from '../controllers/user-controller.js'
import LoginController from '../controllers/Login.js'
import RoomController from '../controllers/room-controller.js'
import ReservationController from '../controllers/reservation_controller.js'
import CommentaryController from '../controllers/commentary-controller.js'
const routes = new Router()

// LOGIN
// ENDPOINTPARA HACER UN LOGIN
routes.post('/login', (req, res) => {
  LoginController.PostLogin(req, res)
})
// USERS
// ENDPOINT PARA CREAR UN USUARIO
routes.post('/user', (req, res) => {
  UserController.createUser(req, res)
})
// ENDPOINT PARA OPTENER UN USUARIO
routes.get('/users', (req, res) => {
  UserController.getUsers(req, res)
})

// COMMENTARY

// ENDPOINT PARA CREAR UN COMENTARIO
routes.post('/commentary', (req, res) => {
  CommentaryController.createCommentary(req, res)
})
// ENDPOINT PARA OPTENER UN COMENTARIO
routes.get('/commentary', (req, res) => {
  CommentaryController.getUsers(req, res)
})

// ENDPOINT PARA OBTENER LOS CUARTOS
routes.get('/rooms', (req, res) => {
  RoomController.getRooms(req, res)
})

// RESERVATION
// ENDPOINT PARA CREAR UNA RESERVACION
routes.post('/reservation', (req, res) => {
  ReservationController.createReservation(req, res)
})
// ENDPOINT PARA OBTENER RESERVACIONES
routes.get('/reservations', (req, res) => {
  ReservationController.getReservations(req, res)
})
export default routes
