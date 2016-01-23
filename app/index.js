var app = require('koa')(),
	redis = require('redis'),
	wrapper = require('co-redis');

const appPort = process.env.APP_PORT || 8000,
	redisHost = process.env.REDIS_IP || '127.0.0.1',
	redisPort = process.env.REDIS_PORT || 6379;

var client = redis.createClient(redisPort, redisHost);
client = wrapper(client);

client.on('connect', function() {
	console.log('redis connection established.');
});

var router = require('./route.js')(client);
app.use(router.routes());

app.listen(appPort, '0.0.0.0');