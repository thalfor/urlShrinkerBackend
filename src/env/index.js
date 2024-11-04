//
require('dotenv/config');
const { z } = require('zod');
//
const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
});

const env = envSchema.safeParse(process.env).data;

module.exports = env;
//