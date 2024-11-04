//
const knex = require('../database');
const crypto = require('crypto');
const { nanoid } = require('nanoid');
const { z } = require('zod');
//
async function WebsiteManip(app) {

  ////////////////////////// deleting website //////////////////////////
  // find a way to make it autonomous


  /////////////////////// redirecting to website ///////////////////////
  app.get('/:nanoidInput', async (request, reply) => {

    const { nanoidInput } = request.params;

    const record = await knex('db-url').select('website').where({nanoidWebsite: nanoidInput}).first();
    
    if (record) {
      return reply.redirect(record.website.startsWith("http") ? record.website : `http://${record.website}`);
    } else {
      reply.status(404).send({error: 'url not found'});
    }

  });


  //////////////////////// listing all websites ////////////////////////
  app.get('/', async () => {
    //return await knex('db-url').select('*');
    //console.log(websites);
    const websites = await knex('db-url').select('website').groupBy('website').count('website as howMany');
    return websites;
  });


  //////////////////////////// new website /////////////////////////////
  // still need to check for writting variations
  app.post('/', async (request, reply) => {
    const createWebsiteNanoIdBodySchema = z.object({
      website: z.string(),
    });

    const { website } = createWebsiteNanoIdBodySchema.parse(
      request.body,
    );

    let shortid;
    const checkWebsiteExists = await knex('db-url').select('nanoidWebsite').where({website: website}).first();

    if (checkWebsiteExists) {
      shortid = checkWebsiteExists.nanoidWebsite;
    } else {
      await knex('db-url')
      .insert({
        id: crypto.randomUUID(),
        nanoidWebsite: nanoid(8),
        website,
      });
    };
    
    //console.log(shortid);

    return reply.status(201).send({ shortUrl: shortid });

  });

};

module.exports.WebsiteManip = WebsiteManip;
//