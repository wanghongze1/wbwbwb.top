const axios = require('axios');
const mime = require('mime-types');

async function live(ctx, next){
  const { query, headers: { range } } = ctx.request;

  if('url' in query){
    const { data, status, headers } = await axios({
      url: query.url,
      method: 'GET',
      responseType: 'stream'
    });

    ctx.append('Connection', 'keep-alive');
    ctx.append('Content-Type', mime.lookup(query.url));
    ctx.status = status;
    ctx.body = data;
  }else{
    ctx.status = 404;
  }
}

function fortyEightLive(router){
  router.get('/48/live', live);
}

module.exports = fortyEightLive;