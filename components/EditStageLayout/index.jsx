import React, { useState } from 'react';
import { Heading, Box, Grid } from 'grommet';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import { Wrapper } from './styles';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: 'Escribe aqui las instrucciones de tu curso...'
          }
        ]
      }
    ]
  }
});

// Renderers
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

function EditStageLayout() {
  const [editorValue, setEditorValue] = useState(initialValue);

  function editorOnChange({ value }) {
    setEditorValue(value);
  }

  function editorOnKeyDown(event, editor, next) {
    // Return with no changes if it's not the "`" key with ctrl pressed.
    if (event.key !== '`' || !event.ctrlKey) return next();

    // Decide what to do based on the key code...
    switch (event.key) {
      // When "B" is pressed, add a "bold" mark to the text.
      case 'b': {
        event.preventDefault();
        editor.toggleMark('bold');
        break;
      }
      // When "`" is pressed, keep our existing code block logic.
      case '`': {
        const isCode = editor.value.blocks.some(block => block.type == 'code');
        event.preventDefault();
        editor.setBlocks(isCode ? 'paragraph' : 'code');
        break;
      }
      // Otherwise, let other plugins handle it.
      default: {
        return next();
      }
    }
  }

  return (
    <Wrapper>
      <Heading>Editar clase: 1</Heading>
      <Box as="section">
        <Grid gap="small" columns={['medium', 'medium', 'medium']}>
          <Editor
            value={editorValue}
            onChange={editorOnChange}
            renderBlock={RenderBlock}
            onKeyDown={editorOnKeyDown}
            renderMark={RenderMark}
          />
        </Grid>
      </Box>
    </Wrapper>
  );
}

export default EditStageLayout;
