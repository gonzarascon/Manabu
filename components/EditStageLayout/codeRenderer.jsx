/* eslint-disable react/prop-types */
import React from 'react';

function CodeNode(props) {
  const { attributes, children } = props;
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
}

function RenderBlock(props, editor, next) {
  switch (props.node.type) {
    case 'code':
      return <CodeNode {...props} />;
    default:
      return next();
  }
}

function BoldMark(props) {
  const { children } = props;
  return <strong>{children}</strong>;
}

function RenderMark(props, editor, next) {
  switch (props.mark.type) {
    case 'bold':
      return <BoldMark {...props} />;
    default:
      return next();
  }
}

export { RenderBlock, RenderMark };
