import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import { Heading, Box, Grid, Text, RadioButtonGroup, Meter } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import Emoji from '../../helpers/emoji';
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
  totalStages,
  responsiveSize,
  wrongAnswer
}) {
  const editor = useRef();
  const [editorValue, setEditorValue] = useState(initialValue);
  const [formValue, setFormValue] = useState({});
  const [userInput, setUserInput] = useState('');
  const [radioOptions, setRadioOptions] = useState([]);
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

  useEffect(() => {
    if (!_.isEqual(formValue, {})) {
      const options =
        formValue.false_answer_2 === ''
          ? _.shuffle([_formValue.correct_answer, _formValue.false_answer_1])
          : _.shuffle([
              _formValue.correct_answer,
              _formValue.false_answer_1,
              _formValue.false_answer_2
            ]);

      setRadioOptions(options);
    }
  }, [formValue]);

  function getProgressQuantity(value) {
    return (value * 100) / totalStages;
  }

  function createStageOptions() {
    if (_formValue.false_answer_2 === '')
      return _.shuffle([_formValue.correct_answer, _formValue.false_answer_1]);

    return _.shuffle([
      _formValue.correct_answer,
      _formValue.false_answer_1,
      _formValue.false_answer_2
    ]);
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
      {responsiveSize === 'small' && (
        <Box fill align="center">
          <Heading level={2} textAlign="center" margin="medium">
            <Emoji symbol="💻" label="Computadora" />
          </Heading>
          <Heading level={4} textAlign="center" color="gray1" margin="medium">
            Para tomar este curso, debes acceder desde tu computadora.
          </Heading>
        </Box>
      )}
      {responsiveSize !== 'small' && (
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
                {wrongAnswer && (
                  <Box justify="center" direction="row">
                    <Heading color="red" textAlign="center" level={4}>
                      <Emoji symbol="🤔" /> ¿Estás seguro que es la respuesta
                      correcta?
                    </Heading>
                  </Box>
                )}
                <AnswerField
                  name="user_input"
                  label={<Heading level={3}>{_formValue.question}</Heading>}
                  component={() => (
                    <RadioButtonGroup
                      options={radioOptions}
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
      )}
    </Wrapper>
  );
}

export default TakeStageLayout;
