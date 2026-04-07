import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Survey() {
  const { surveyId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [surveyInfo, setSurveyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const questions = [
    {
      id: 'email',
      title: 'Email Address',
      question: 'Please enter your email address',
      type: 'email',
      required: true,
      domains: ['@applaudo.com', '@techsolutions-sv.com']
    },
    {
      id: 'satisfaction',
      title: 'Overall Satisfaction',
      question: 'How satisfied are you with the branding services provided by the team?',
      labels: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
      required: true
    },
    {
      id: 'quality',
      title: 'Quality of Branding Materials',
      question: 'How would you rate the quality of the branding materials delivered by the team?',
      labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
      required: true
    },
    {
      id: 'effectiveness',
      title: 'Effectiveness of Branding Initiatives',
      question: 'To what extent do you feel the branding initiatives (sales plays, digital marketing campaigns, customer presentations, internal events, etc.) effectively support your objectives?',
      labels: ['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely'],
      required: true
    },
    {
      id: 'timeliness',
      title: 'Timeliness of Deliverables',
      question: 'Was the team able to deliver work within the agreed timelines?',
      labels: ['Never', 'Rarely', 'Sometimes', 'Most of the time', 'Always'],
      required: true
    },
    {
      id: 'communication',
      title: 'Collaboration and Communication',
      question: 'How satisfied are you with the level of communication and collaboration with the team?',
      labels: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
      required: true
    },
    {
      id: 'responsiveness',
      title: 'Responsiveness to Feedback',
      question: 'How well does the team incorporate feedback and make necessary adjustments?',
      labels: ['Not well at all', 'Slightly well', 'Moderately well', 'Very well', 'Extremely well'],
      required: true
    },
    {
      id: 'improvement',
      title: 'Areas for Improvement',
      question: 'What aspects of our branding services could be improved?',
      type: 'text',
      required: false
    }
  ];

  useEffect(() => {
    fetch(`/api/survey/${surveyId}`)
      .then(res => res.json())
      .then(data => {
        setSurveyInfo(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading survey:', err);
        setLoading(false);
      });
  }, [surveyId]);

  const handleRatingClick = (rating) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: rating });
  };

  const handleTextChange = (e) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: e.target.value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const finalAnswers = { ...answers };
      if (finalAnswers.email) {
        finalAnswers.email = `${finalAnswers.email.username}${finalAnswers.email.domain}`;
      }
      
      await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyId,
          responses: finalAnswers,
          submittedAt: new Date().toISOString()
        })
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('There was an error submitting your response. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#F7F7F7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Avenir Next LT Pro', Arial, sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #EBEBEB',
            borderTop: '4px solid #FF4040',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#6E6E6E', fontSize: '16px' }}>Loading survey...</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ.id];
  const canProceed = currentQ.type === 'email' 
    ? (currentAnswer?.username && currentAnswer?.username.trim() !== '')
    : (currentAnswer !== undefined || !currentQ.required);

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#F7F7F7',
        fontFamily: "'Avenir Next LT Pro', Arial, sans-serif",
        padding: '24px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            background: '#FFFFFF',
            padding: '24px',
            borderRadius: '24px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <svg width="180" height="36" viewBox="0 0 650 132" style={{ display: 'block' }}>
              <path fill="#121212" d="M207.2,105.3l-6.1-15.4h-30.4l-5.8,15.4h-20.6l32.9-78.6h18.4l32.6,78.6h-21.1,0ZM186.1,47.7l-10,27h19.7l-9.8-27Z"/>
              <path fill="#121212" d="M266.7,106.9c-6.8,0-13.3-2.9-16.8-7.7h-.2v32.7h-18.2V50h17.3v6.8h.3c3.3-4.4,9.5-8.3,17.6-8.3,16.1,0,26.2,13.5,26.2,29s-9.6,29.4-26.3,29.4h0ZM262.3,63.3c-8.2,0-13.3,7.2-13.3,14.2s5.1,14.2,13.3,14.2,13-7.1,13-14.3-4.3-14.1-13-14.1h0Z"/>
              <path fill="#121212" d="M335.9,106.9c-6.8,0-13.3-2.9-16.8-7.7h-.2v32.7h-18.2V50h17.3v6.8h.3c3.3-4.4,9.5-8.3,17.6-8.3,16.1,0,26.2,13.5,26.2,29s-9.6,29.4-26.3,29.4h0ZM331.5,63.3c-8.2,0-13.3,7.2-13.3,14.2s5.1,14.2,13.3,14.2,13-7.1,13-14.3-4.3-14.1-13-14.1h0Z"/>
              <path fill="#121212" d="M370.1,105.3V21.4h18.4v83.9h-18.4Z"/>
              <path fill="#121212" d="M398.3,57.6c6.4-6.1,15.6-9.3,24.6-9.3,18.5,0,25.4,9.1,25.4,29.2v27.9h-16.6v-5.9h-.3c-2.8,4.6-9.1,7.2-15.6,7.2s-20.1-4.3-20.1-17.3,19.4-18.7,35.5-18.7v-.9c0-5.4-4.3-8-10-8s-10.3,2.6-13.6,5.7l-9.2-9.9ZM431.7,81.2h-2.3c-8,0-17,1-17,7.6s4.2,5.7,7.9,5.7c7.3,0,11.4-4.4,11.4-11.3v-1.9h0Z"/>
              <path fill="#121212" d="M494.5,105.3v-7.7h-.2c-2.5,4.9-8.9,9.2-16.6,9.2-14.9,0-20.1-11.5-20.1-22.6v-34.2h18.3v30c0,6.2,1.6,11.8,8.2,11.8s9.8-5.6,9.8-11.9v-29.9h18.2v55.3h-17.5Z"/>
              <path fill="#121212" d="M564.3,105.3v-7.2h-.2c-3.5,5.6-10.8,8.8-18.1,8.8-16.6,0-26.3-14-26.3-29.4s10-29,26.1-29,13.7,3.8,16.9,7.4h.2V21.4h18.2v83.9h-16.8ZM550.3,63.3c-8.7,0-13.1,7-13.1,14.1s4.4,14.3,13.1,14.3,13.3-7,13.3-14.2-5.1-14.2-13.3-14.2h0Z"/>
              <path fill="#121212" d="M619.3,107.1c-16.6,0-30.6-11.5-30.6-29.6s14-29.2,30.6-29.2,30.7,11.1,30.7,29.2-14,29.6-30.7,29.6ZM619.3,63.3c-8.5,0-13-7-13,14.1s4.5,14.3,13.1,14.3,13.1-7.2,13.1-14.3-4.7-14.1-13.2-14.1Z"/>
              <path fill="#ff4040" d="M117.4,6.1c-2.4-3.4-6.3-5.6-10.4-6-.8,0-1.7.1-2.4.5L2,59.8c-1.4.8-2.2,2.4-1.9,4,.4,2.5,1.2,4.9,2.4,7,0,0,0,.1,0,.2,1.3,2.1,2.9,4.1,4.9,5.6,1.3,1,3,1.1,4.4.3L98.3,27v99.9c0,1.6,1,3.1,2.5,3.7,2.4,1,4.9,1.4,7.4,1.4s5-.5,7.4-1.4c1.5-.6,2.5-2.1,2.5-3.7V8.4c0-.8-.3-1.6-.7-2.3h0Z"/>
              <path fill="#ff4040" d="M73.9,57.2c-.8,0-1.7,0-2.4.5l-53.1,30.7c-1.4.8-2.2,2.4-1.9,4,.4,2.5,1.2,4.9,2.4,7,0,0,0,.1,0,.2,1.3,2.1,2.9,4.1,4.9,5.6,1.3,1,3,1.1,4.4.3l36.9-21.3v42.7c0,1.6,1,3.1,2.5,3.7,2.4,1,4.9,1.4,7.4,1.4s5-.5,7.4-1.4c1.5-.6,2.5-2.1,2.5-3.7v-61.3c0-.8-.3-1.6-.7-2.3-2.4-3.4-6.3-5.6-10.4-6Z"/>
            </svg>
          </div>

          <div style={{
            background: '#FFFFFF',
            padding: '64px 48px',
            borderRadius: '32px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#FFEDED',
              borderRadius: '50%',
              margin: '0 auto 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="ri-check-line" style={{ fontSize: '40px', color: '#FF4040' }}></i>
            </div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#121212',
              marginBottom: '16px'
            }}>Thank You!</h1>
            <p style={{
              fontSize: '18px',
              color: '#6E6E6E',
              lineHeight: '1.6',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Your feedback has been submitted successfully. We appreciate you taking the time to help us improve our branding services.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F7F7F7',
      fontFamily: "'Avenir Next LT Pro', Arial, sans-serif",
      padding: '24px'
    }}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
      />
      
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: '#FFFFFF',
          padding: '24px',
          borderRadius: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <svg width="180" height="36" viewBox="0 0 650 132" style={{ display: 'block' }}>
            <path fill="#121212" d="M207.2,105.3l-6.1-15.4h-30.4l-5.8,15.4h-20.6l32.9-78.6h18.4l32.6,78.6h-21.1,0ZM186.1,47.7l-10,27h19.7l-9.8-27Z"/>
            <path fill="#121212" d="M266.7,106.9c-6.8,0-13.3-2.9-16.8-7.7h-.2v32.7h-18.2V50h17.3v6.8h.3c3.3-4.4,9.5-8.3,17.6-8.3,16.1,0,26.2,13.5,26.2,29s-9.6,29.4-26.3,29.4h0ZM262.3,63.3c-8.2,0-13.3,7.2-13.3,14.2s5.1,14.2,13.3,14.2,13-7.1,13-14.3-4.3-14.1-13-14.1h0Z"/>
            <path fill="#121212" d="M335.9,106.9c-6.8,0-13.3-2.9-16.8-7.7h-.2v32.7h-18.2V50h17.3v6.8h.3c3.3-4.4,9.5-8.3,17.6-8.3,16.1,0,26.2,13.5,26.2,29s-9.6,29.4-26.3,29.4h0ZM331.5,63.3c-8.2,0-13.3,7.2-13.3,14.2s5.1,14.2,13.3,14.2,13-7.1,13-14.3-4.3-14.1-13-14.1h0Z"/>
            <path fill="#121212" d="M370.1,105.3V21.4h18.4v83.9h-18.4Z"/>
            <path fill="#121212" d="M398.3,57.6c6.4-6.1,15.6-9.3,24.6-9.3,18.5,0,25.4,9.1,25.4,29.2v27.9h-16.6v-5.9h-.3c-2.8,4.6-9.1,7.2-15.6,7.2s-20.1-4.3-20.1-17.3,19.4-18.7,35.5-18.7v-.9c0-5.4-4.3-8-10-8s-10.3,2.6-13.6,5.7l-9.2-9.9ZM431.7,81.2h-2.3c-8,0-17,1-17,7.6s4.2,5.7,7.9,5.7c7.3,0,11.4-4.4,11.4-11.3v-1.9h0Z"/>
            <path fill="#121212" d="M494.5,105.3v-7.7h-.2c-2.5,4.9-8.9,9.2-16.6,9.2-14.9,0-20.1-11.5-20.1-22.6v-34.2h18.3v30c0,6.2,1.6,11.8,8.2,11.8s9.8-5.6,9.8-11.9v-29.9h18.2v55.3h-17.5Z"/>
            <path fill="#121212" d="M564.3,105.3v-7.2h-.2c-3.5,5.6-10.8,8.8-18.1,8.8-16.6,0-26.3-14-26.3-29.4s10-29,26.1-29,13.7,3.8,16.9,7.4h.2V21.4h18.2v83.9h-16.8ZM550.3,63.3c-8.7,0-13.1,7-13.1,14.1s4.4,14.3,13.1,14.3,13.3-7,13.3-14.2-5.1-14.2-13.3-14.2h0Z"/>
            <path fill="#121212" d="M619.3,107.1c-16.6,0-30.6-11.5-30.6-29.6s14-29.2,30.6-29.2,30.7,11.1,30.7,29.2-14,29.6-30.7,29.6ZM619.3,63.3c-8.5,0-13-7-13,14.1s4.5,14.3,13.1,14.3,13.1-7.2,13.1-14.3-4.7-14.1-13.2-14.1Z"/>
            <path fill="#ff4040" d="M117.4,6.1c-2.4-3.4-6.3-5.6-10.4-6-.8,0-1.7.1-2.4.5L2,59.8c-1.4.8-2.2,2.4-1.9,4,.4,2.5,1.2,4.9,2.4,7,0,0,0,.1,0,.2,1.3,2.1,2.9,4.1,4.9,5.6,1.3,1,3,1.1,4.4.3L98.3,27v99.9c0,1.6,1,3.1,2.5,3.7,2.4,1,4.9,1.4,7.4,1.4s5-.5,7.4-1.4c1.5-.6,2.5-2.1,2.5-3.7V8.4c0-.8-.3-1.6-.7-2.3h0Z"/>
            <path fill="#ff4040" d="M73.9,57.2c-.8,0-1.7,0-2.4.5l-53.1,30.7c-1.4.8-2.2,2.4-1.9,4,.4,2.5,1.2,4.9,2.4,7,0,0,0,.1,0,.2,1.3,2.1,2.9,4.1,4.9,5.6,1.3,1,3,1.1,4.4.3l36.9-21.3v42.7c0,1.6,1,3.1,2.5,3.7,2.4,1,4.9,1.4,7.4,1.4s5-.5,7.4-1.4c1.5-.6,2.5-2.1,2.5-3.7v-61.3c0-.8-.3-1.6-.7-2.3-2.4-3.4-6.3-5.6-10.4-6Z"/>
          </svg>
        </div>

        <div style={{
          background: '#FFFFFF',
          padding: '48px',
          borderRadius: '32px',
          marginBottom: '24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#121212',
            marginBottom: '16px',
            lineHeight: '1.3'
          }}>
            March 2026 - Branding Customer Satisfaction Survey (CSAT)
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6E6E6E',
            lineHeight: '1.6',
            margin: 0
          }}>
            Thank you for taking the time to provide feedback on our Branding team's work. Your insights help us improve our services and deliver better branding initiatives that support your needs.
          </p>
        </div>

        <div style={{
          background: '#FFFFFF',
          padding: '24px',
          borderRadius: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#121212' }}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#FF4040' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: '#EBEBEB',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #FF4040 0%, #A82222 100%)',
              transition: 'width 0.3s ease',
              borderRadius: '8px'
            }}></div>
          </div>
        </div>

        <div style={{
          background: '#FFFFFF',
          padding: '48px',
          borderRadius: '32px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'inline-block',
            background: '#FFEDED',
            color: '#FF4040',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '24px'
          }}>
            {currentQ.title}
          </div>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#121212',
            marginBottom: '40px',
            lineHeight: '1.4'
          }}>
            {currentQ.question}
          </h2>

          {currentQ.type === 'email' ? (
            <div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <input
                  type="text"
                  value={currentAnswer?.username || ''}
                  onChange={(e) => {
                    setAnswers({ 
                      ...answers, 
                      [currentQ.id]: { 
                        username: e.target.value, 
                        domain: currentAnswer?.domain || '@applaudo.com' 
                      } 
                    });
                  }}
                  placeholder="your.name"
                  style={{
                    flex: 1,
                    padding: '16px',
                    fontSize: '16px',
                    fontFamily: "'Avenir Next LT Pro', Arial, sans-serif",
                    color: '#121212',
                    background: '#F7F7F7',
                    border: '2px solid #EBEBEB',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FF4040';
                    e.target.style.background = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#EBEBEB';
                    e.target.style.background = '#F7F7F7';
                  }}
                />
                <select
                  value={currentAnswer?.domain || '@applaudo.com'}
                  onChange={(e) => {
                    setAnswers({ 
                      ...answers, 
                      [currentQ.id]: { 
                        username: currentAnswer?.username || '', 
                        domain: e.target.value 
                      } 
                    });
                  }}
                  style={{
                    padding: '16px',
                    fontSize: '16px',
                    fontFamily: "'Avenir Next LT Pro', Arial, sans-serif",
                    color: '#121212',
                    background: '#F7F7F7',
                    border: '2px solid #EBEBEB',
                    borderRadius: '12px',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FF4040';
                    e.target.style.background = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#EBEBEB';
                    e.target.style.background = '#F7F7F7';
                  }}
                >
                  {currentQ.domains.map((domain) => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>
              <p style={{ fontSize: '14px', color: '#6E6E6E', marginTop: '8px' }}>
                <i className="ri-mail-line" style={{ marginRight: '6px' }}></i>
                Full email: <strong>{currentAnswer?.username || 'your.name'}{currentAnswer?.domain || '@applaudo.com'}</strong>
              </p>
            </div>
          ) : currentQ.type === 'text' ? (
            <div>
              <textarea
                value={currentAnswer || ''}
                onChange={handleTextChange}
                placeholder="Share your thoughts here..."
                style={{
                  width: '100%',
                  minHeight: '180px',
                  padding: '20px',
                  fontSize: '16px',
                  fontFamily: "'Avenir Next LT Pro', Arial, sans-serif",
                  color: '#121212',
                  background: '#F7F7F7',
                  border: '2px solid #EBEBEB',
                  borderRadius: '16px',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  lineHeight: '1.6'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FF4040';
                  e.target.style.background = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#EBEBEB';
                  e.target.style.background = '#F7F7F7';
                }}
              />
              
              <div style={{
                marginTop: '16px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: '#6E6E6E',
                  fontWeight: '500'
                }}>
                  Common feedback topics:
                </span>
                {[
                  'Response time to requests',
                  'Quality of design deliverables',
                  'Communication frequency',
                  'Revision and feedback process',
                  'Brand alignment and consistency',
                  'Creative exploration and options',
                  'Project planning and timelines',
                  'Understanding of our needs'
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const current = currentAnswer || '';
                      const newText = current ? `${current}\n• ${suggestion}` : `• ${suggestion}`;
                      setAnswers({ ...answers, [currentQ.id]: newText });
                    }}
                    style={{
                      padding: '7px 14px',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#474747',
                      background: '#FFFFFF',
                      border: '2px solid #EBEBEB',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#FF4040';
                      e.currentTarget.style.color = '#FF4040';
                      e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#EBEBEB';
                      e.currentTarget.style.color = '#474747';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <i className="ri-add-line" style={{ fontSize: '14px' }}></i>
                    {suggestion}
                  </button>
                ))}
              </div>
              
              <p style={{
                marginTop: '14px',
                fontSize: '13px',
                color: '#6E6E6E',
                lineHeight: '1.5',
                margin: '14px 0 0 0'
              }}>
                <i className="ri-lightbulb-line" style={{ marginRight: '6px', color: '#FF4040' }}></i>
                Click any topic to add it to your feedback, then share your specific thoughts
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[5, 4, 3, 2, 1].map((rating) => {
                const icons = ['ri-emotion-laugh-line', 'ri-emotion-happy-line', 'ri-emotion-normal-line', 'ri-emotion-sad-line', 'ri-emotion-unhappy-line'];
                const colors = ['#40C763', '#94EBAA', '#FFCC00', '#FF9124', '#FF4040'];
                const colorIndex = 5 - rating;
                const isSelected = currentAnswer === rating;
                
                return (
                  <button
                    key={rating}
                    onClick={() => handleRatingClick(rating)}
                    className={`rating-button-${rating}`}
                    style={{
                      width: '100%',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'stretch',
                      background: isSelected ? 'linear-gradient(135deg, #FFEDED 0%, #FFFFFF 100%)' : '#FFFFFF',
                      border: isSelected ? '3px solid #FF4040' : '2px solid #EBEBEB',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      outline: 'none',
                      overflow: 'hidden',
                      position: 'relative',
                      transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                      boxShadow: isSelected ? '0 6px 20px rgba(255, 64, 64, 0.12)' : '0 2px 6px rgba(0,0,0,0.04)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.transform = 'scale(1.005) translateX(4px)';
                        e.currentTarget.style.borderColor = '#DEDEDE';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.transform = 'scale(1) translateX(0)';
                        e.currentTarget.style.borderColor = '#EBEBEB';
                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)';
                      }
                    }}
                  >
                    <div style={{
                      width: '4px',
                      background: colors[colorIndex],
                      transition: 'all 0.3s ease'
                    }}></div>
                    
                    <div style={{
                      flex: 1,
                      padding: '14px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: isSelected ? '#FF4040' : '#F7F7F7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: isSelected ? '0 3px 10px rgba(255, 64, 64, 0.25)' : 'none'
                      }}>
                        <i className={icons[colorIndex]} style={{ 
                          fontSize: '24px', 
                          color: isSelected ? '#FFFFFF' : colors[colorIndex],
                          transition: 'all 0.3s ease'
                        }}></i>
                      </div>
                      
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: isSelected ? 'rgba(255, 64, 64, 0.12)' : `${colors[colorIndex]}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: isSelected ? '#FF4040' : colors[colorIndex],
                        flexShrink: 0,
                        transition: 'all 0.3s ease'
                      }}>
                        {rating}
                      </div>
                      
                      <span style={{
                        fontSize: '16px',
                        fontWeight: isSelected ? '600' : '400',
                        color: isSelected ? '#121212' : '#474747',
                        textAlign: 'left',
                        flex: 1,
                        transition: 'all 0.3s ease'
                      }}>
                        {currentQ.labels[rating - 1]}
                      </span>
                      
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isSelected ? '#FF4040' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isSelected ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
                        opacity: isSelected ? 1 : 0
                      }}>
                        <i className="ri-check-line" style={{ 
                          fontSize: '18px', 
                          color: '#FFFFFF',
                          fontWeight: '600'
                        }}></i>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            style={{
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              color: currentQuestion === 0 ? '#CFCFCF' : '#121212',
              background: '#FFFFFF',
              border: '2px solid',
              borderColor: currentQuestion === 0 ? '#EBEBEB' : '#DEDEDE',
              borderRadius: '16px',
              cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (currentQuestion !== 0) {
                e.currentTarget.style.borderColor = '#121212';
              }
            }}
            onMouseLeave={(e) => {
              if (currentQuestion !== 0) {
                e.currentTarget.style.borderColor = '#DEDEDE';
              }
            }}
          >
            <i className="ri-arrow-left-line"></i>
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed}
              style={{
                padding: '16px 40px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#FFFFFF',
                background: canProceed ? '#FF4040' : '#CFCFCF',
                border: 'none',
                borderRadius: '16px',
                cursor: canProceed ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                if (canProceed) {
                  e.currentTarget.style.background = '#A82222';
                }
              }}
              onMouseLeave={(e) => {
                if (canProceed) {
                  e.currentTarget.style.background = '#FF4040';
                }
              }}
            >
              Submit Survey
              <i className="ri-check-line"></i>
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              style={{
                padding: '16px 40px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#FFFFFF',
                background: canProceed ? '#FF4040' : '#CFCFCF',
                border: 'none',
                borderRadius: '16px',
                cursor: canProceed ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                if (canProceed) {
                  e.currentTarget.style.background = '#A82222';
                }
              }}
              onMouseLeave={(e) => {
                if (canProceed) {
                  e.currentTarget.style.background = '#FF4040';
                }
              }}
            >
              Next Question
              <i className="ri-arrow-right-line"></i>
            </button>
          )}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          padding: '16px',
          color: '#6E6E6E',
          fontSize: '14px'
        }}>
          <i className="ri-lock-line" style={{ marginRight: '8px' }}></i>
          Your responses are confidential and will help us improve our services
        </div>
      </div>
    </div>
  );
}
