import React, { StatelessComponent } from 'react';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import { okaidia } from 'react-syntax-highlighter/styles/prism';

registerLanguage('jsx', jsx);

export const CodeBlock: StatelessComponent = function CodeBlock(props) {
	return (
		<SyntaxHighlighter style={okaidia} customStyle={{ overflowX: 'scroll' }} language="jsx">
			{props.children}
		</SyntaxHighlighter>
	);
};
