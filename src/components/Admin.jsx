import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [surveys, setSurveys] = useState([]);
  const [newSurveyMonth, setNewSurveyMonth] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    try {
      const res = await fetch('/api/surveys');
      const data = await res.json();
      setSurveys(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading surveys:', error);
      setLoading(false);
    }
  };

  const createSurvey = async () => {
    if (!newSurveyMonth.trim()) {
      alert('Please enter a month and year');
      return;
    }

    try {
      const res = await fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ month: newSurveyMonth })
      });
      const data = await res.json();
      setNewSurveyMonth('');
      loadSurveys();
      copyToClipboard(`${window.location.origin}/survey/${data.id}`);
    } catch (error) {
      console.error('Error creating survey:', error);
      alert('Error creating survey');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Survey link copied to clipboard!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F7F7F7',
      fontFamily: "'Avenir Next LT Pro', Arial, sans-serif",
      padding: '24px'
    }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: '#FFFFFF',
          padding: '32px',
          borderRadius: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <svg width="180" height="36" viewBox="0 0 650 132" style={{ display: 'block', marginBottom: '24px' }}>
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
          
          <h1 style={{ fontSize: '32px', fontWeight: '600', color: '#121212', marginBottom: '8px' }}>
            Branding Survey Admin
          </h1>
          <p style={{ fontSize: '16px', color: '#6E6E6E' }}>
            Create monthly surveys and view responses
          </p>
        </div>

        {/* Create New Survey */}
        <div style={{
          background: '#FFFFFF',
          padding: '32px',
          borderRadius: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#121212', marginBottom: '24px' }}>
            Create New Survey
          </h2>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#474747',
                marginBottom: '8px'
              }}>
                Month and Year
              </label>
              <input
                type="text"
                value={newSurveyMonth}
                onChange={(e) => setNewSurveyMonth(e.target.value)}
                placeholder="e.g., March 2026"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '16px',
                  fontFamily: "'Avenir Next LT Pro', Arial, sans-serif",
                  color: '#121212',
                  background: '#F7F7F7',
                  border: '2px solid #EBEBEB',
                  borderRadius: '12px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#FF4040'}
                onBlur={(e) => e.target.style.borderColor = '#EBEBEB'}
              />
            </div>
            <button
              onClick={createSurvey}
              style={{
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#FFFFFF',
                background: '#FF4040',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#A82222'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#FF4040'}
            >
              <i className="ri-add-line"></i>
              Create Survey
            </button>
          </div>
        </div>

        {/* Existing Surveys */}
        <div style={{
          background: '#FFFFFF',
          padding: '32px',
          borderRadius: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#121212', marginBottom: '24px' }}>
            Existing Surveys
          </h2>
          
          {loading ? (
            <p style={{ color: '#6E6E6E', textAlign: 'center', padding: '40px 0' }}>
              Loading surveys...
            </p>
          ) : surveys.length === 0 ? (
            <p style={{ color: '#6E6E6E', textAlign: 'center', padding: '40px 0' }}>
              No surveys created yet. Create your first one above!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {surveys.map((survey) => (
                <div
                  key={survey.id}
                  style={{
                    padding: '20px',
                    background: '#F7F7F7',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#121212', marginBottom: '4px' }}>
                      {survey.month} - Branding CSAT
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6E6E6E' }}>
                      {survey.responseCount || 0} responses • Created {new Date(survey.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/survey/${survey.id}`)}
                      style={{
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#474747',
                        background: '#FFFFFF',
                        border: '2px solid #EBEBEB',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#FF4040';
                        e.currentTarget.style.color = '#FF4040';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#EBEBEB';
                        e.currentTarget.style.color = '#474747';
                      }}
                    >
                      <i className="ri-link"></i>
                      Copy Link
                    </button>
                    <button
                      onClick={() => navigate(`/results/${survey.id}`)}
                      style={{
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#FFFFFF',
                        background: '#FF4040',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#A82222'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#FF4040'}
                    >
                      <i className="ri-bar-chart-line"></i>
                      View Results
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
