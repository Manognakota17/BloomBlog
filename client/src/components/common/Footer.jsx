import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      padding: '4rem 0 2rem',
      marginTop: 'auto',
      borderTop: '1px solid var(--border-color)',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                color: 'var(--accent-primary)',
                fontFamily: 'Playfair Display, serif',
                fontWeight: '700',
                fontSize: '2rem',
                marginBottom: '1rem'
              }}>
                Bloom Blog
              </h3>
              <p style={{ 
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                maxWidth: '300px'
              }}>
                Where ideas flourish and creativity blossoms. Join our community of passionate writers and readers.
              </p>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <h5 style={{ 
              color: 'var(--text-primary)',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '600',
              fontSize: '1.1rem',
              marginBottom: '1.5rem'
            }}>Quick Links</h5>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <Link to="/" style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'color 0.3s ease'
              }}>Home</Link>
              <Link to="/articles" style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'color 0.3s ease'
              }}>Articles</Link>
              <Link to="/signin" style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'color 0.3s ease'
              }}>Sign In</Link>
              <Link to="/signup" style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'color 0.3s ease'
              }}>Sign Up</Link>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 style={{ 
              color: 'var(--text-primary)',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '600',
              fontSize: '1.1rem',
              marginBottom: '1.5rem'
            }}>Categories</h5>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <span style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem'
              }}>Programming</span>
              <span style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem'
              }}>AI & ML</span>
              <span style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem'
              }}>Database</span>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-color)',
          marginTop: '3rem',
          paddingTop: '2rem',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            margin: 0,
            fontFamily: 'Poppins, sans-serif'
          }}>
            © {new Date().getFullYear()} Bloom Blog. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer