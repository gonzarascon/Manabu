import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import Link from 'next/link';
import { Heading, Box, Grid, Anchor, RadioButtonGroup, Meter } from 'grommet';
import { LinkPrevious, FormNextLink } from 'grommet-icons';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import {
  Wrapper,
  EditorWrapper,
  CustomPre,
  Bold,
  Italic,
  Underline,
  FormWrapper,
  QuestionForm,
  SaveButton,
  AnswerField
} from './styles';

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

function renderMark(props, _editor, next) {
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

function TakeStageLayout({
  course_id,
  checkUserInput,
  stageLoadedData,
  totalStages
}) {
  const editor = useRef();
  const [editorValue, setEditorValue] = useState(initialValue);
  const [formValue, setFormValue] = useState({});
  const [userInput, setUserInput] = useState('');
  const {
    content: { formValue: _formValue }
  } = stageLoadedData;

  useEffect(() => {
    if (!_.isEqual(stageLoadedData, undefined)) {
      const {
        content: { editorValue: value, formValue: _formValue }
      } = stageLoadedData;

      setFormValue(_formValue);
      setEditorValue(Value.fromJSON(JSON.parse(value)));
    }
  }, []);

  function getProgressQuantity(value) {
    return (value * 100) / totalStages;
  }

  function createStageOptions() {
    if (_formValue.false_answer_2 === '')
      return [_formValue.correct_answer, _formValue.false_answer_1];

    return [
      _formValue.correct_answer,
      _formValue.false_answer_1,
      _formValue.false_answer_2
    ];
  }

  return (
    <Wrapper>
      <Box direction="row" alignContent="center">
        <Heading level={3} color="gray1" margin="medium">
          Clase: {stageLoadedData ? stageLoadedData.number : ''}
        </Heading>

        <Box margin="medium" direction="row">
          <Heading level={4} margin={{ right: 'small' }} color="gray1">
            Progreso:
          </Heading>
          <Meter
            values={[
              {
                value: getProgressQuantity(stageLoadedData.number),
                color: 'brand'
              }
            ]}
            background="gray4"
          />
        </Box>
      </Box>
      <Box as="section" height="75vh" margin="medium">
        <Grid gap="small" columns={['2/3', '1/3']} fill>
          <EditorWrapper>
            <Editor
              className="classEditor"
              value={editorValue}
              ref={editor}
              renderBlock={RenderBlock}
              renderMark={renderMark}
              readOnly
            />
          </EditorWrapper>
          <FormWrapper>
            <QuestionForm
              onSubmit={() => checkUserInput(userInput)}
              value={formValue}
            >
              <AnswerField
                name="user_input"
                label={<Heading level={3}>{_formValue.question}</Heading>}
                component={() => (
                  <RadioButtonGroup
                    options={createStageOptions()}
                    onChange={({ target: { value } }) => setUserInput(value)}
                    value={userInput}
                  />
                )}
              />
              <SaveButton
                icon={<FormNextLink size="medium" color="white" />}
                label="Continuar"
                reverse
                type="submit"
              />
            </QuestionForm>
          </FormWrapper>
        </Grid>
      </Box>
    </Wrapper>
  );
}

export default TakeStageLayout;
