import Fastify, { type FastifyError } from 'fastify'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { userRoutes } from './infrastructure/http/routes/userRoutes'
import { mealRoutes } from './infrastructure/http/routes/mealRoutes'
import { AppError } from './shared/errors/AppError'
import { env } from './shared/env'

const app = Fastify({ logger: true })

app.register(cors)
app.register(cookie)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(userRoutes, { prefix: '/users' })
app.register(mealRoutes, { prefix: '/meals' })

app.setErrorHandler((error: FastifyError, _request, reply) => {
   if (error.validation) {
      return reply.code(400).send({
         error: true,
         data: null,
         message: 'Please check the submitted information',
         fields: error.validation.map((v) => ({
            message: v.message ?? 'Invalid value',
            field: v.instancePath?.replace(/^\//, '') || String(v.params?.missingProperty ?? ''),
         })),
      })
   }

   if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
         error: true,
         data: null,
         message: error.message,
      })
   }

   app.log.error(error)
   return reply.status(500).send({
      error: true,
      data: null,
      message: 'An unexpected error occurred',
   })
})

app.listen({ port: env.PORT }, (err) => {
   if (err) {
      app.log.error(err)
      process.exit(1)
   }
})
