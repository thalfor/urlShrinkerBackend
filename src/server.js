//
const fastfy = require('fastify');
const env = require('./env');
const { WebsiteManip } = require('./routes/database-manip');
//
const app = fastfy();

app.register(WebsiteManip);

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`server running on port ${env.PORT}`);
  });
//