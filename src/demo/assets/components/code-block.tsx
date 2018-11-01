import React from 'react';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import json from 'react-syntax-highlighter/languages/prism/json';
import { okaidia } from 'react-syntax-highlighter/styles/prism';

registerLanguage('jsx', jsx);
registerLanguage('json', json);

interface CodeBlockProps {
	language: 'jsx' | 'json';
}

export class CodeBlock extends React.Component<CodeBlockProps> {
	render() {
		return (
			<SyntaxHighlighter style={okaidia} language={this.props.language}>
				{this.props.children}
			</SyntaxHighlighter>
		);
	}
}
