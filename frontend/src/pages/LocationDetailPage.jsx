// src/pages/LocationDetailPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLocationById, getIssuesByLocationId } from "../api.js";

const LocationDetailPage = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const [location, setLocation] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [locationData, issuesData] = await Promise.all([
        getLocationById(numericId),
        getIssuesByLocationId(numericId)
      ]);
      setLocation(locationData);
      setIssues(issuesData || []);
    } catch (err) {
      console.error("Error loading location", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
        Loading...
      </div>
    );
  }
  
  if (!location) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
        Location not found.
      </div>
    );
  }

  const score = location.score?.value ?? 0;
  const label = location.score?.label ?? "Unknown";

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#ca8a04';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#16a34a';
    if (score >= 60) return '#ca8a04';
    return '#dc2626';
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                margin: '0 0 8px 0',
                color: '#111827'
              }}>
                {location.name}
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: '0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {location.address}
              </p>
            </div>
            
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '24px',
              borderRadius: '12px',
              textAlign: 'center',
              minWidth: '160px',
              border: '2px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '700',
                color: getScoreColor(score),
                lineHeight: '1',
                marginBottom: '8px'
              }}>
                {score}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {label}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}>
          {/* Accessibility Features Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '28px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 20px 0',
              color: '#111827'
            }}>
              Accessibility Features
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { key: 'hasRamp', label: 'Wheelchair Ramp', icon: '♿' },
                { key: 'hasLift', label: 'Elevator Access', icon: '🛗' },
                { key: 'hasBraille', label: 'Braille Signage', icon: '👆' },
                { key: 'hasTactilePath', label: 'Tactile Pathways', icon: '🦯' },
                { key: 'hasAccessibleRestroom', label: 'Accessible Restroom', icon: '🚻' }
              ].map(({ key, label, icon }) => (
                <div key={key} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <span style={{
                    fontSize: '14px',
                    color: '#374151',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '18px' }}>{icon}</span>
                    {label}
                  </span>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: '600'
                  }}>
                    {location.features?.[key] ? '✅' : '❌'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '28px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 20px 0',
              color: '#111827'
            }}>
              Issue Summary
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              {[
                { label: 'Total Issues', value: issues.length, color: '#3b82f6' },
                { label: 'Open', value: issues.filter(i => i.status === 'Open').length, color: '#dc2626' },
                { label: 'In Progress', value: issues.filter(i => i.status === 'In Progress').length, color: '#ca8a04' },
                { label: 'Resolved', value: issues.filter(i => i.status === 'Resolved').length, color: '#16a34a' }
              ].map(({ label, value, color }) => (
                <div key={label} style={{
                  padding: '20px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: color,
                    marginBottom: '4px'
                  }}>
                    {value}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              to={`/locations/${location.id}/report`}
              style={{
                display: 'block',
                width: '150px',
                marginTop: '20px',
                padding: '14px 24px',
                backgroundColor: '#ffa600ff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'background-color 0.2s'
              }}
            >
              Report an Issue
            </Link>
          </div>
        </div>

        {/* Recent Issues Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '28px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 20px 0',
            color: '#111827'
          }}>
            Recent Issues
          </h3>
          
          {issues.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#9ca3af',
              fontSize: '14px'
            }}>
              No issues reported yet. Great job maintaining accessibility!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {issues.map((issue) => (
                <div key={issue._id} style={{
                  padding: '20px',

                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  borderLeft: `4px solid ${getSeverityColor(issue.severity)}`
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                    flexWrap: 'wrap',
                    marginBottom: '8px'
                  }}>
                    <div style={{ flex: '1', minWidth: '200px' }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: '4px'
                      }}>
                        {issue.type}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#4b5563',
                        lineHeight: '1.5'
                      }}>
                        {issue.description}
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        padding: '6px 12px',
                        backgroundColor: 'white',
                        color: getSeverityColor(issue.severity),
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        border: `1px solid ${getSeverityColor(issue.severity)}`,
                        letterSpacing: '0.5px'
                      }}>
                        {issue.severity}
                      </span>

                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: '12px',

                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {new Date(issue.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationDetailPage;