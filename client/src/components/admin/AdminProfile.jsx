import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, Shield, Settings } from 'lucide-react';
import './AdminProfile.css';
import { motion } from 'framer-motion';

function AdminProfile() {
  return (
    <div style={{
      backgroundColor: 'var(--bg-primary)',
      minHeight: '90vh',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <Shield style={{
              width: '2.5rem',
              height: '2.5rem',
              color: 'var(--accent-primary)'
            }} />
            <div>
              <h1 style={{
                color: 'var(--text-primary)',
                fontSize: '2.5rem',
                fontWeight: '700',
                fontFamily: 'Playfair Display, serif',
                margin: 0
              }}>Admin Dashboard</h1>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                marginTop: '0.5rem'
              }}>Manage users, authors, and content</p>
            </div>
          </div>

          <nav style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '1px solid var(--border-color)'
          }}>
            <ul style={{
              display: 'flex',
              gap: '1rem',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              <li>
                <NavLink 
                  to="usersnauthors" 
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                    transition: 'all 0.3s ease',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    fontFamily: 'Poppins, sans-serif'
                  })}
                >
                  <Users style={{ width: '1.25rem', height: '1.25rem' }} />
                  Users & Authors
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="settings" 
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                    transition: 'all 0.3s ease',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    fontFamily: 'Poppins, sans-serif'
                  })}
                >
                  <Settings style={{ width: '1.25rem', height: '1.25rem' }} />
                  Settings
                </NavLink>
              </li>
            </ul>
          </nav>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid var(--border-color)',
            minHeight: '60vh'
          }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}

export default AdminProfile;