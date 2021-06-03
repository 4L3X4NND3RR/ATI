import Router from 'express'
import UserController from '../controllers/user-controller.js'
const routes = new Router()

// USERS

// END POINT PARA CREAR UN USUARIO
routes.post('/user', (req, res) => {
  UserController.createUser(req, res)
})
// ENDPOINT PARA OPTENER UN USUARIO
routes.get('/users', (req, res) => {
  UserController.getUsers(req, res)
})

export default routes
