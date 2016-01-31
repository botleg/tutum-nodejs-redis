Tutum Nodejs Redis
===

Simple Node.js application with Redis as data store to demostrate load balanced docker hosting with [tutum](https://www.tutum.co/). The application has three routes:

1. `/key/value`: to set `key` as `value`
2. `/key`: returns the value of the `key`
3. `/`: returns details about the host

Environment Variables
---

* `APP_PORT`: port where the application should runs
* `REDIS_IP`: ip for redis datastore
* `REDIS_PORT`: port for redis datastore