import Router from 'express'
import UserController from '../controllers/user-controller.js'
import LoginController from '../controllers/Login.js'
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

export default routes
