import { app } from './app.ts';
import { env } from './config/env.ts';

app.listen({ port: env.PORT }).then(() => {
	console.log('HTTP Server Running');
});
