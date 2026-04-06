import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function Results() {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [surveyInfo, setSurveyInfo] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, [surveyId]);

  const loadResults = async () => {
    try {
      const [surveyRes, responsesRes] = await Promise.all([
        fetch(`/api/survey/${surveyId}`),
        fetch(`/api/responses/${surveyId}`)
      ]);
      const surveyData = await surveyRes.json();
      const responsesData = await responsesRes.json();
      setSurveyInfo(surveyData);
      setResponses(responsesData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading results:', error);
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const questionLabels = {
      satisfaction: 'Overall Satisfaction',
      quality: 'Quality of Branding Materials',
      effectiveness: 'Effectiveness of Branding Initiatives',
      timeliness: 'Timeliness of Deliverables',
      communication: 'Collaboration and Communication',
      responsiveness: 'Responsiveness to Feedback',
      improvement: 'Areas for Improvement'
    };

    const data = responses.map((response, index) => ({
      'Response #': index + 1,
      'Submitted At': new Date(response.submittedAt).toLocaleString(),
      [questionLabels.satisfaction]: response.responses.satisfaction || '',
      [questionLabels.quality]: response.responses.quality || '',
      [questionLabels.effectiveness]: response.responses.effectiveness || '',
      [questionLabels.timeliness]: response.responses.timeliness || '',
      [questionLabels.communication]: response.responses.communication || '',
      [questionLabels.responsiveness]: response.responses.responsiveness || '',
      [questionLabels.improvement]: response.responses.improvement || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses');
    
    const filename = `${surveyInfo.month.replace(/ /g, '_')}_CSAT_Results.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const calculateAverage = (questionId) => {
    const validResponses = responses
      .map(r => r.responses[questionId])
      .filter(v => typeof v === 'number');
    if (validResponses.length === 0) return 0;
    return (validResponses.reduce((a, b) => a + b, 0) / validResponses.length).toFixed(1);
  };

  const getDistribution = (questionId) => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    responses.forEach(r => {
      const value = r.responses[questionId];
      if (value) distribution[value]++;
    });
    return distribution;
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
        <p style={{ color: '#6E6E6E', fontSize: '16px' }}>Loading results...</p>
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
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: '#FFFFFF',
          padding: '32px',
          borderRadius: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#121212', marginBottom: '8px' }}>
              {surveyInfo?.month} - Results
            </h1>
            <p style={{ fontSize: '16px', color: '#6E6E6E' }}>
              {responses.length} total responses
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => navigate('/admin')}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#474747',
                background: '#FFFFFF',
                border: '2px solid #EBEBEB',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#DEDEDE'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#EBEBEB'}
            >
              <i className="ri-arrow-left-line"></i>
              Back to Admin
            </button>
            <button
              onClick={exportToExcel}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
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
              <i className="ri-file-excel-line"></i>
              Export to Excel
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {['satisfaction', 'quality', 'effectiveness', 'timeliness', 'communication', 'responsiveness'].map((questionId) => {
            const labels = {
              satisfaction: 'Overall Satisfaction',
              quality: 'Quality of Materials',
              effectiveness: 'Effectiveness',
              timeliness: 'Timeliness',
              communication: 'Communication',
              responsiveness: 'Responsiveness'
            };
            const average = calculateAverage(questionId);
            const distribution = getDistribution(questionId);
            
            return (
              <div key={questionId} style={{
                background: '#FFFFFF',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6E6E6E', marginBottom: '12px' }}>
                  {labels[questionId]}
                </h3>
                <div style={{ fontSize: '36px', fontWeight: '600', color: '#FF4040', marginBottom: '16px' }}>
                  {average}
                </div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} style={{ flex: 1 }}>
                      <div style={{
                        height: '60px',
                        background: '#F7F7F7',
                        borderRadius: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: `${(distribution[rating] / responses.length) * 100}%`,
                          background: rating >= 4 ? '#40C763' : rating === 3 ? '#FFCC00' : '#FF4040',
                          transition: 'height 0.3s ease'
                        }}></div>
                      </div>
                      <div style={{ 
                        textAlign: 'center', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        color: '#6E6E6E',
                        marginTop: '4px'
                      }}>
                        {rating}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Written Feedback */}
        <div style={{
          background: '#FFFFFF',
          padding: '32px',
          borderRadius: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#121212', marginBottom: '24px' }}>
            Written Feedback
          </h2>
          {responses.filter(r => r.responses.improvement).length === 0 ? (
            <p style={{ color: '#6E6E6E', textAlign: 'center', padding: '40px 0' }}>
              No written feedback yet
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {responses.map((response, index) => {
                if (!response.responses.improvement) return null;
                return (
                  <div
                    key={response.id}
                    style={{
                      padding: '20px',
                      background: '#F7F7F7',
                      borderRadius: '12px'
                    }}
                  >
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6E6E6E', 
                      marginBottom: '8px' 
                    }}>
                      Response #{index + 1} • {new Date(response.submittedAt).toLocaleDateString()}
                    </div>
                    <p style={{ 
                      fontSize: '15px', 
                      color: '#474747', 
                      lineHeight: '1.6',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {response.responses.improvement}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
