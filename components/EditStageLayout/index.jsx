import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import validator from 'validator';
import Link from 'next/link';
import { Heading, Box, Grid, FormField, Anchor } from 'grommet';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Code as CodeIcon,
  Underline as UnderlineIcon,
  LinkPrevious,
  Save
} from 'grommet-icons';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
import Emoji from '../../helpers/emoji';

import {
  Wrapper,
  EditorWrapper,
  EditorToolbar,
  CustomPre,
  Bold,
  Italic,
  Underline,
  ToolbarButton,
  FormWrapper,
  QuestionForm,
  SaveButton
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

function EditStageLayout({
  course_id,
  sendSaveStage,
  sendUpdateStage,
  stageLoadedData,
  responsiveSize
}) {
  const editor = useRef();
  const [editorValue, setEditorValue] = useState(initialValue);
  const [formValue, setFormValue] = useState({
    question: '',
    correct_answer: '',
    false_answer_1: '',
    false_answer_2: ''
  });
  const [formError, setFormError] = useState({
    question: false,
    correct_answer: false,
    false_answer_1: false,
    false_answer_2: false
  });

  useEffect(() => {
    if (!_.isEqual(stageLoadedData, undefined)) {
      const {
        content: { editorValue: value, formValue: _formValue }
      } = stageLoadedData;

      setFormValue(_formValue);
      setEditorValue(Value.fromJSON(JSON.parse(value)));
    }
  }, []);

  function OnChange({ value }) {
    setEditorValue(value);
  }

  function OnKeyDown(event, _editor, next) {
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
    _editor.toggleMark(mark);
  }

  function hasMark(type) {
    return editorValue.activeMarks.some(mark => mark.type === type);
  }

  function onClickMark(event, type) {
    event.preventDefault();
    editor.current.toggleMark(type);
  }

  function saveStage(_formValue) {
    const parsedEditorValue = JSON.stringify(editorValue.toJSON());

    const stageData = {
      editorValue: parsedEditorValue,
      formValue: _formValue
    };

    if (_.isEqual(stageLoadedData, undefined)) {
      sendSaveStage(stageData);
    } else {
      sendUpdateStage(stageData);
    }
  }

  function checkForm(_formValue) {
    if (validator.isEmpty(_formValue.question))
      setFormError({ ...formError, question: true });
    if (validator.isEmpty(_formValue.correct_answer))
      setFormError({ ...formError, correct_answer: true });
    if (validator.isEmpty(_formValue.false_answer_1))
      setFormError({ ...formError, false_answer_1: true });

    if (
      !validator.isEmpty(_formValue.question) &&
      !validator.isEmpty(_formValue.correct_answer) &&
      !validator.isEmpty(_formValue.false_answer_1)
    )
      saveStage(_formValue);
  }

  return (
    <Wrapper minHeight={responsiveSize === 'small' ? '50vh' : null}>
      <Link href={`/course/${course_id}/edit/dashboard`}>
        <Anchor
          size="small"
          icon={<LinkPrevious />}
          label="Volver al dashboard del curso"
          margin="medium"
        />
      </Link>
      {responsiveSize === 'small' && (
        <Box fill align="center">
          <Heading level={2} textAlign="center" margin="medium">
            <Emoji symbol="💻" label="Computadora" />
          </Heading>
          <Heading level={4} textAlign="center" color="gray1" margin="medium">
            Para crear un curso, debes acceder desde tu computadora.
          </Heading>
        </Box>
      )}
      {responsiveSize !== 'small' && (
        <>
          <Heading level={3} color="gray1" margin="medium">
            {stageLoadedData
              ? `Editar clase: ${stageLoadedData.number}`
              : 'Crear nueva clase'}
          </Heading>
          <Box as="section" height="75vh" margin="medium">
            <Grid gap="small" columns={['2/3', '1/3']} fill>
              <EditorWrapper>
                <EditorToolbar direction="row-responsive">
                  <ToolbarButton
                    isActive={hasMark('bold')}
                    icon={<BoldIcon />}
                    hoverIndicator
                    onClick={event => onClickMark(event, 'bold')}
                  />
                  <ToolbarButton
                    isActive={hasMark('italic')}
                    icon={<ItalicIcon />}
                    hoverIndicator
                    onClick={event => onClickMark(event, 'italic')}
                  />
                  <ToolbarButton
                    isActive={hasMark('underlined')}
                    icon={<UnderlineIcon />}
                    hoverIndicator
                    onClick={event => onClickMark(event, 'underlined')}
                  />
                  <ToolbarButton
                    isActive={hasMark('code')}
                    icon={<CodeIcon />}
                    hoverIndicator
                    onClick={event => onClickMark(event, 'code')}
                  />
                </EditorToolbar>
                <Editor
                  className="classEditor"
                  value={editorValue}
                  ref={editor}
                  onChange={OnChange}
                  renderBlock={RenderBlock}
                  onKeyDown={OnKeyDown}
                  renderMark={renderMark}
                  placeholder="Escribe aqui las instrucciones de tu curso..."
                />
              </EditorWrapper>
              <FormWrapper>
                <QuestionForm
                  onSubmit={({ value }) => checkForm(value)}
                  value={formValue}
                  errors={formError}
                >
                  <FormField
                    label="Ingresa la pregunta a responder en esta clase"
                    help="*Evita preguntas confusas o capsiosas."
                    placeholder="Por ejemplo: ¿Que resultado obtuviste?"
                    name="question"
                    onChange={({ target }) => {
                      setFormValue({ ...formValue, question: target.value });
                      setFormError({ ...formError, question: false });
                    }}
                  />
                  <FormField
                    name="correct_answer"
                    label="Escribe la respuesta correcta."
                    help="Los alumnos deberán escoger esta respuesta para progresar en el curso."
                    placeholder="Escribe la respuesta correcta"
                    onChange={({ target }) => {
                      setFormValue({
                        ...formValue,
                        correct_answer: target.value
                      });
                      setFormError({ ...formError, correct_answer: false });
                    }}
                  />
                  <FormField
                    name="false_answer_1"
                    label="Escribe una respuesta incorrecta"
                    help="Evita respuestas obvias o con enunciados confusos"
                    placeholder="Escribe una respuesta incorrecta"
                    onChange={({ target }) => {
                      setFormValue({
                        ...formValue,
                        false_answer_1: target.value
                      });
                      setFormError({ ...formError, false_answer_1: false });
                    }}
                  />
                  <FormField
                    name="false_answer_2"
                    label="Opcionalmente, escribe otra respuesta incorrecta"
                    help="Esto ayudará a darle mas complejidad a la clase."
                    placeholder="Escribe una respuesta incorrecta"
                    onChange={({ target }) =>
                      setFormValue({
                        ...formValue,
                        false_answer_2: target.value
                      })
                    }
                  />
                  <SaveButton
                    icon={<Save size="medium" color="white" />}
                    label="Guardar clase"
                    reverse
                    type="submit"
                  />
                </QuestionForm>
              </FormWrapper>
            </Grid>
          </Box>
        </>
      )}
    </Wrapper>
  );
}

export default EditStageLayout;
