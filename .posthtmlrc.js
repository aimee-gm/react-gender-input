const { version, repository } = require('./package.json');

const repo = repository.url.replace('git+', '').replace('.git', '');

module.exports = {
	plugins: {
		'posthtml-expressions': {
			locals: {
				version: `v${version}`,
				repo,
			},
		},
	},
};
