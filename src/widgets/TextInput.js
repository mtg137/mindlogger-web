import React, { useState, useEffect, useRef } from 'react';
import { Modal, Card, Row, Col, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Markdown from '../components/Markdown';
import { parseMarkdown } from '../services/helper';
import { profileSelector } from '../state/applet/applet.selectors';
import { activityLastResponseTimeSelector } from '../state/responses/responses.selectors';
import Navigator from './Navigator';

const TextInput = ({
  item,
  values,
  isBackShown,
  isNextShown,
  handleChange,
  handleBack,
  watermark,
  isSubmitShown,
  answer,
  invalid,
  activity,
  answers,
  ...props
}) => {
  const { t } = useTranslation();

  const lastResponseTime = useSelector(activityLastResponseTimeSelector);
  const profile = useSelector(profileSelector);
  const markdown = useRef(parseMarkdown(item.question.en, lastResponseTime, profile, activity, answers)).current;
  const maxLength = item.valueConstraints.maxLength;
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(answer && typeof answer === 'object' ? answer.value : answer || '');

  useEffect(() => {
    setValue(values[item.variableName]);
  }, [values[item.variableName]]);

  return (
    <Card className={`${invalid ? 'invalid' : ''} mb-3 px-3`} style={{ maxWidth: 'auto' }}>
      <Row className="no-gutters">
        <Col md={12}>
          <Card.Title className="question">
            {watermark && <Image className="watermark" src={watermark} alt="watermark" rounded />}
            <div className="markdown">
              <Markdown markdown={markdown} />
            </div>
          </Card.Title>
          <Card.Body>
            <Row className="no-gutters px-4 py-4">
              <input
                type="text"
                style={{ width: '80%', margin: 'auto' }}
                value={value}
                maxlength={maxLength}
                onChange={(e) => {
                  setValue(e.target.value);
                  handleChange(e.target.value);
                }}
                disabled={!isNextShown}
              />
            </Row>
          </Card.Body>
        </Col>
      </Row>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('failed')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('incorrect_answer')}</Modal.Body>
      </Modal>

      <Navigator
        isBackShown={isBackShown}
        isNextShown={isNextShown}
        isNextDisable={!value || !value.length}
        handleBack={handleBack}
        isSubmitShown={isSubmitShown}
        canSubmit={(e) => {
          if (!item.correctAnswer || !item.correctAnswer.en || item.correctAnswer.en === value) {
            return true;
          }
          setShow(true);
          return false;
        }}
        skippable={item.skippable}
        {...props}
      />
    </Card>
  );
};

export default TextInput;
