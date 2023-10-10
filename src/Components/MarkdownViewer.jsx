import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

class MarkdownViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownContent: ''
    };
  }

  componentDidMount() {
    const { fileName } = this.props;
    if (fileName) {
      const path = '/Articles/' + fileName;
      fetch(path)
        .then(response => {
          if (!response.ok) {
            throw new Error('Chargement du fichier Markdown impossible');
          }
          return response.text()
        })   
        .then(markdownContent => {
          this.setState({ markdownContent });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  codeBlock = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={dracula}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  render() {
    return (
      <div>
        <ReactMarkdown components={this.codeBlock}>{this.state.markdownContent}</ReactMarkdown>
      </div>
    );
  }
}

export default MarkdownViewer;
