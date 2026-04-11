import Fastify from 'fastify';
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';

const app = Fastify({
	requestTimeout: 300_000,
	connectionTimeout: 300_000,
}).withTypeProvider<ZodTypeProvider>();

// Fastify zod configuration
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/', () => {
	console.log('Hello World');
});

app.listen({ port: 3333, host: '0.0.0.0' }, () => {
	console.log('HTTP server is running on 3333');
});
