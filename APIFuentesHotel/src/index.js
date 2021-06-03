import express from 'express'
import cors from 'cors'
import routes from './config/routes.js'
const app = express()

// configuracion
app.set('port', 3000)

// middleware
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false }))
app.use('/api/', cors({ origin: '*' }), routes)

// iniciando servidor
app.listen(app.get('port'), () => {
  console.log('Server on port: ', app.get('port'))
})
