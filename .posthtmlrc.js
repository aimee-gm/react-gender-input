const { name, description, version, repository, license, author } = require('./package.json');

const repo = repository.url.replace('git+', '').replace('.git', '');

const authorBits = /^([a-z- ]+) \(([a-z-:/\.]+)\)$/i.exec(author);

const authorUrl = authorBits[2];
const authorName = authorBits[1];

module.exports = {
	plugins: {
		'posthtml-expressions': {
			locals: {
				name,
				description,
				version: `v${version}`,
				repo,
				releases: `${repo}/releases`,
				licenseUrl: `${repo}/blob/master/LICENSE`,
				npm: `https://npmjs.org/package/${name}`,
				license,
				authorName,
				authorUrl,
			},
		},
	},
};
