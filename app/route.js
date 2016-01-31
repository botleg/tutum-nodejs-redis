var os = require('os'),
	router = require('koa-router')();

module.exports = function(redis) {
	var host = os.hostname();

	router.get('/', function*(next) {
		this.body = {
			host: host
		};
	});

	router.get('/:key', function*(next) {
		var val = yield redis.get(this.params.key);
		
		if (val !== null) {
			this.body = {
				host: host,
				value: val
			};
		} else {
			this.body = {
				host: host,
				value: "NULL"
			};
		}
	});

	router.get('/:key/:value', function*(next) {
		var res = yield redis.set(this.params.key, this.params.value);

		this.body = {
			host: host,
			result: res
		};
	});

	return router;
};