import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PDFExport } from '@progress/kendo-react-pdf';
import styled from 'styled-components';
import cn from 'classnames';
import _ from 'lodash';
import domtoimage from 'dom-to-image';

// Component
import MyButton from '../components/Button';
import Markdown from '../components/Markdown';

// State
import { inProgressSelector } from '../state/responses/responses.selectors';

// services
import { evaluateCumulatives } from '../services/scoring';
import { currentActivitySelector, currentAppletSelector } from '../state/app/app.selectors';

const MARKDOWN_REGEX = /(!\[.*\]\s*\(.*?) =\d*x\d*(\))/g;

const Summary = styled(({ className, ...props }) => {
  const { appletId, activityId } = useParams();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [messages, setMessages] = useState([]);
  const [activity, setActivity] = useState({});
  const [titleWidth, setTitleWidth] = useState(0);

  const dispatch = useDispatch();

  const applet = useSelector(currentAppletSelector);
  const response = useSelector(inProgressSelector);
  const activityAccess = useSelector(currentActivitySelector);
  let url = "";

  const pdfRef = useRef(null);
  const ref = React.createRef();

  const termsText = t("additional.terms_text")
  const footerText = t("additional.footer_text");

  if (activity.splash && activity.splash.en) {
    url = activity.splash.en;
  }

  useEffect(() => {
    const el = document.getElementById('score-title');
    setTitleWidth(el.offsetWidth);
  }, [lang])

  useEffect(() => {
    const items = ['footer-text'];
    if (messages) {
      for (let i = 0; i < messages.length; i++) {
        items.push(`message-${i}`);
      }
    }

    items.map(id => {
      const pdfContent = document.getElementById(id);

      domtoimage.toJpeg(pdfContent, { quality: 1 })
        .then((dataUrl) => {
          const pdfImage = document.getElementById(`pdf-${id}`);
          pdfImage.src = dataUrl;
        })
    })
  }, [titleWidth])

  useEffect(() => {
    try {
      if (response[`activity/${activityId}`]) updateActivity(response[`activity/${activityId}`]);
    } catch (error) {
      console.log(error);
    }
    if (activityAccess?.disableSummary) history.push(`/applet/${appletId}/activity_thanks`);
  }, [response && Object.keys(response).length > 1]);

  const updateActivity = (response = {}) => {
    const { responses, activity } = response;
    setActivity(activity);

    if (responses && responses.length > 0) {
      const { reportMessages } = evaluateCumulatives(responses, activity);

      setMessages(reportMessages);
    }
  }

  const findActivity = (name, activities = []) => {
    if (!name) return undefined;
    return _.find(activities, { name: { en: name } });
  }

  const handlePDFSave = () => {
    if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
      window.open(doc.output('bloburl', { filename: 'export.pdf' }))
    } else if (pdfRef.current) {
      pdfRef.current && pdfRef.current.save();
    }
  }

  if (activityAccess.disableSummary) return <div />;

  return (
    <Card className={cn('mb-3', className)}>
      <Row className="no-gutters">
        <Col md={12}>
          <Card.Body>
            {messages &&
              messages.map((item, i) => (
                <div key={i}>
                  <h1>{item.category.replace(/_/g, ' ')}</h1>
                  <h3>{item.score}</h3>
                  <Markdown markdown={item.message.replace(MARKDOWN_REGEX, '$1$2')} />
                  {messages.length > 1 && <div className="hr" />}
                </div>
              ))}
          </Card.Body>
        </Col>
      </Row>
      <div>
        <div className="pdf-container">
          <PDFExport
            paperSize="A4"
            forcePageBreak=".page-break"
            margin="2cm"
            ref={pdfRef}
          >
            <div id="PDF" ref={ref}>
              {url.match(/\.(jpeg|jpg|gif|png)$/) != null &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={url + '?not-from-cache-please'}
                    style={{ objectFit: 'contain' }}
                    crossOrigin="anonymous"
                    alt=''
                  />
                  <div className="page-break" />
                </div>
              }
              {applet.image &&
                <div style={{ float: 'right', marginBottom: 10 }}>
                  <img
                    src={applet.image + '?not-from-cache-please'}
                    style={{ objectFit: 'contain' }}
                    width="100"
                    crossOrigin="anonymous"
                    alt=''
                  />
                </div>
              }

              <div className="mb-4">
                <Markdown useCORS={true} markdown={_.get(activity, 'scoreOverview', '').replace(MARKDOWN_REGEX, '$1$2')} />
              </div>
              {
                messages && messages.map((item, i) => (<img id={`pdf-message-${i}`} className="pdf-message" />))
              }

              <div style={{ border: '1px solid black', marginTop: 36, marginBottom: 36 }} />
              <img id="pdf-footer-text"></img>
            </div>
          </PDFExport>

          <span id="score-title">
            <span
              className="score-title text-nowrap"
            >
              <b>{t("additional.child_score")}</b>
            </span>
          </span>

          <div>
            {messages &&
              messages.map((item, i) => (
                <div id={`message-${i}`} key={i} className="report-message">
                  <p className="text-primary mb-1">
                    <b>{item.category.replace(/_/g, ' ')}</b>
                  </p>
                  <div className="mb-4">
                    <Markdown
                      markdown={_.get(item, 'compute.description', '').replace(MARKDOWN_REGEX, '$1$2')}
                      useCORS={true}
                    />
                  </div>

                  <div className="score-area">
                    <p
                      className="score-title text-nowrap"
                      style={{
                        left: `max(${titleWidth/2}px, ${(item.scoreValue / item.maxScoreValue) * 100}%)`,
                      }}>
                      <b>{t("additional.child_score")}</b>
                    </p>
                    <div
                      className={cn('score-bar score-below', {
                        'score-positive': item.compute.direction,
                        'score-negative': !item.compute.direction,
                      })}
                      style={{ width: `${(item.exprValue / item.maxScoreValue) * 100}%` }}
                    />
                    <div
                      className={cn('score-bar score-above', {
                        'score-positive': !item.compute.direction,
                        'score-negative': item.compute.direction,
                      })}
                    />
                    <div
                      className="score-spliter"
                      style={{ left: `${(item.scoreValue / item.maxScoreValue) * 100}%` }}
                    />
                    <p className="score-max-value">
                      <b>{item.maxScoreValue}</b>
                    </p>
                  </div>
                  <div className="mb-4">
                    {t("additional.child_score_on_subscale", { name: item.category.replace(/_/g, ' ') })}
                    {' '}
                    <span className="text-danger">{item.scoreValue}</span>.
                    <Markdown
                      markdown={item.message.replace(MARKDOWN_REGEX, '$1$2')}
                      useCORS={true}
                    />
                  </div>
                </div>
              ))}

            <div id="footer-text">
              <p className="mb-4 terms-font">{termsText}</p>
              <p className="terms-footer">{footerText}</p>
            </div>
          </div>
        </div>
        <MyButton
          type="submit"
          label={t('Consent.next')}
          classes="mr-5 mb-2 float-right"
          handleClick={(e) => history.push(`/applet/${appletId}/activity_thanks`)}
        />
        <MyButton
          type="button"
          label={t('additional.share_report')}
          classes="mr-5 mb-2 float-right"
          handleClick={(e) => handlePDFSave()}
        />
      </div>
    </Card>
  );
})`
  #footer-text, .report-message {
    background-color: white;
  }

  .pdf-message {
    margin: 10px 0px;
  }

  .pdf-container {
    max-width: 1000px;
    position: absolute;
    left: -2000px;
    top: 0;
    font-size: 20pt;
    font-family: Arial, Helvetica, sans-serif;
  }
  .terms-font {
    font-size: 24px;
  }
  .terms-footer {
    font-size: 22px;
  }
  .score-area {
    position: relative;
    display: flex;
    width: 500px;
    padding: 60px 0 60px;

    .score-bar {
      height: 70px;
    }
    .score-positive {
      background-color: #a1cd63;
    }
    .score-negative {
      background-color: #b02318;
    }
    .score-above {
      flex: 1;
    }
    .divider-line {
      border-top: 1px solid black;
    }
    .score-spliter {
      position: absolute;
      top: 40px;
      width: 3px;
      height: 110px;
      background-color: #000;
    }
    .score-title {
      position: absolute;
      top: 0;
      transform: translateX(-50%);
    }
    .score-max-value {
      position: absolute;
      margin: 0;
      right: 0;
      bottom: 0;
    }
  }
  img {
    max-width: 100%;
  }
`;

export default Summary;
