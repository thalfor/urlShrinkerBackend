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
    const nanoidInput = Object.values(request.params)[0];
    const website = await knex('db-url').select('website').where({nanoidWebsite: nanoidInput}).first();
    console.log(Object.values(website)[0]);
    return website;
  })


  //////////////////////// listing all websites ////////////////////////
  app.get('/', async () => {
    //return await knex('db-url').select('*');
    const websites = await knex('db-url').select('website').groupBy('website').count('website as howMany');
    console.log(websites);
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
    )

    const checkWebsiteExists = await knex('db-url').select('nanoidWebsite').where({website: website}).first();

    if (checkWebsiteExists) {
      await knex('db-url')
      .insert({
        id: crypto.randomUUID(),
        nanoidWebsite: checkWebsiteExists.nanoidWebsite,
        website,
      });
    } else {
      await knex('db-url')
      .insert({
        id: crypto.randomUUID(),
        nanoidWebsite: nanoid(8),
        website,
      });
    };
    
    return reply.status(201).send();

  });

};

module.exports.WebsiteManip = WebsiteManip;
//