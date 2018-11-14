const cypress = require('cypress');
const handler = require('serve-handler');
const http = require('http');
const path = require('path');

const server = http.createServer((request, response) => {
	return handler(request, response, {
		public: path.resolve(__dirname, './dist/demo'),
	});
});

server.listen(8080, async () => {
	try {
		const results = await cypress.run({
			config: {
				baseUrl: 'http://localhost:8080',
			},
		});

		if (!results.totalTests || results.totalPassed !== results.totalTests) {
			process.exit(1);
		}

		process.exit(0);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
});
