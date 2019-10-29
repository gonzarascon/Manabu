import React, { useState } from 'react';
import { Heading, Box, Grid } from 'grommet';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';

import {
  Wrapper,
  EditorWrapper,
  CustomPre,
  Bold,
  Italic,
  Underline
} from './styles';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: ''
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
    <CustomPre {...attributes}>
      <code>{children}</code>
    </CustomPre>
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
  return <Bold>{children}</Bold>;
}

function renderMark(props, editor, next) {
  const { children, mark, attributes } = props;

  switch (mark.type) {
    case 'bold':
      return <BoldMark {...attributes}>{children}</BoldMark>;
    case 'code':
      return (
        <CustomPre>
          <code {...attributes}>{children}</code>
        </CustomPre>
      );
    case 'italic':
      return <Italic {...attributes}>{children}</Italic>;
    case 'underlined':
      return <Underline {...attributes}>{children}</Underline>;
    default:
      return next();
  }
}

function EditStageLayout() {
  const [editorValue, setEditorValue] = useState(initialValue);

  function OnChange({ value }) {
    setEditorValue(value);
  }

  function OnKeyDown(event, editor, next) {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  }

  return (
    <Wrapper>
      <Heading level={3} color="gray1" margin="medium">
        Editar clase: 1
      </Heading>
      <Box as="section" height="75vh">
        <Grid gap="small" columns={['medium', 'medium', 'medium']} fill>
          <EditorWrapper>
            <Editor
              className="classEditor"
              value={editorValue}
              onChange={OnChange}
              renderBlock={RenderBlock}
              onKeyDown={OnKeyDown}
              renderMark={renderMark}
              placeholder="Escribe aqui las instrucciones de tu curso..."
            />
          </EditorWrapper>
        </Grid>
      </Box>
    </Wrapper>
  );
}

export default EditStageLayout;
