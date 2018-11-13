const { name, description, version, repository } = require('./package.json');

const repo = repository.url.replace('git+', '').replace('.git', '');

module.exports = {
	plugins: {
		'posthtml-expressions': {
			locals: {
				name,
				description,
				version: `v${version}`,
				repo,
			},
		},
	},
};
