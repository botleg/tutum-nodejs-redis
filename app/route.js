var	os = require('os'),
	router = require('koa-router')();

module.exports = function(redis) {
	router.get('/', function*(next) {
		this.body = {
			host: os.hostname(),
			uptime: os.uptime(),
			os: os.platform(),
			arch: os.arch(),
			network: os.networkInterfaces(),
			cpu: os.cpus()
		};
	});

	router.get('/:key', function*(next) {
		var val = yield redis.get(this.params.key);
		
		if (val !== null) {
			this.body = val;
		} else {
			this.body = "NULL";
		}
	});

	router.get('/:key/:value', function*(next) {
		this.body = yield redis.set(this.params.key, this.params.value);
	});

	return router;
};