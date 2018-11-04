import React from 'react';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import { okaidia } from 'react-syntax-highlighter/styles/prism';

registerLanguage('jsx', jsx);

const customStyle = {
	overflowX: 'scroll',
};

export class CodeBlock extends React.Component {
	render() {
		return (
			<SyntaxHighlighter style={okaidia} customStyle={customStyle} language="jsx">
				{this.props.children}
			</SyntaxHighlighter>
		);
	}
}
