import React from 'react';
import ReactDOM from 'react-dom';
import { DemoApp } from './components/demo-app';
import './demo.scss';

const { version, repository } = require('../../package.json');

const homepage = repository.url.replace('git+', '').replace('.git', '');

ReactDOM.render(
	<DemoApp version={version} homepage={homepage.replace('#readme', '')} />,
	document.getElementById('demo')
);
