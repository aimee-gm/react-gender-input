import React from 'react';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import json from 'react-syntax-highlighter/languages/prism/json';
import { okaidia } from 'react-syntax-highlighter/styles/prism';

registerLanguage('jsx', jsx);
registerLanguage('json', json);

interface CodeBlockProps {
	language: 'jsx' | 'json';
	code?: any;
}

export class CodeBlock extends React.Component<CodeBlockProps> {
	private get code() {
		return this.props.children || JSON.stringify(this.props.code, null, '\t');
	}

	render() {
		return (
			<SyntaxHighlighter style={okaidia} language={this.props.language}>
				{this.code}
			</SyntaxHighlighter>
		);
	}
}
