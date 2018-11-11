import React, { StatelessComponent } from 'react';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import { okaidia } from 'react-syntax-highlighter/styles/prism';

registerLanguage('jsx', jsx);

const customStyle = {
	overflowX: 'scroll',
};

export const CodeBlock: StatelessComponent = function CodeBlock(props) {
	return (
		<SyntaxHighlighter style={okaidia} customStyle={customStyle} language="jsx">
			{props.children}
		</SyntaxHighlighter>
	);
};
