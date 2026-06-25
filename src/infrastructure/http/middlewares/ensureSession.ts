import type { FastifyReply, FastifyRequest } from 'fastify'

export async function ensureSession(request: FastifyRequest, reply: FastifyReply) {
   const { sessionId } = request.cookies

   if (!sessionId) {
      return reply.code(401).send({
         error: true,
         data: null,
         message: 'Unauthorized',
      })
   }
}
