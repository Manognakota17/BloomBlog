import React from 'react'
import { SignUp } from '@clerk/clerk-react'

function SIgnup() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      background: 'linear-gradient(45deg, rgba(255, 64, 129, 0.05) 0%, rgba(0, 255, 127, 0.05) 100%)'
    }}>
      <SignUp 
        appearance={{
          layout: {
            logoPlacement: "inside",
            socialButtonsPlacement: "bottom",
            helpPageUrl: "https://help.example.com",
          },
          elements: {
            rootBox: {
              backgroundColor: '#1A1A1A',
              border: '1px solid rgba(255, 64, 129, 0.2)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              maxWidth: '480px',
              width: '100%',
              padding: '2rem',
              margin: '0 auto'
            },
            card: {
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              width: '100%'
            },
            headerTitle: {
              color: '#FF4081',
              fontSize: '1.75rem',
              fontFamily: 'JetBrains Mono, monospace',
              textAlign: 'center',
              marginBottom: '1.5rem'
            },
            headerSubtitle: {
              color: '#EAEAEA',
              textAlign: 'center',
              fontSize: '1.1rem'
            },
            formButtonPrimary: {
              backgroundColor: '#FF4081',
              color: '#1A1A1A',
              fontFamily: 'JetBrains Mono, monospace',
              border: 'none',
              padding: '12px 24px',
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: 'rgba(255, 64, 129, 0.8)'
              }
            },
            formFieldInput: {
              backgroundColor: '#2A2A2A',
              color: '#EAEAEA',
              border: '1px solid rgba(255, 64, 129, 0.2)',
              padding: '12px 16px',
              fontSize: '1rem',
              width: '100%',
              '&:focus': {
                border: '1px solid rgba(255, 64, 129, 0.5)',
                outline: 'none'
              }
            },
            formFieldLabel: {
              color: '#EAEAEA',
              fontSize: '1rem',
              marginBottom: '8px'
            },
            footer: {
              color: '#EAEAEA',
              fontSize: '1rem',
              marginTop: '1.5rem'
            },
            footerActionLink: {
              color: '#FF4081',
              fontSize: '1rem',
              '&:hover': {
                color: 'rgba(255, 64, 129, 0.8)'
              }
            },
            socialButtonsBlockButton: {
              backgroundColor: '#2A2A2A',
              border: '1px solid rgba(255, 64, 129, 0.2)',
              color: '#EAEAEA',
              width: '100%',
              padding: '12px 24px',
              marginBottom: '12px',
              '&:hover': {
                backgroundColor: '#3A3A3A'
              }
            },
            socialButtonsBlockButtonText: {
              color: '#EAEAEA',
              fontSize: '1rem'
            },
            dividerLine: {
              backgroundColor: 'rgba(255, 64, 129, 0.2)',
              margin: '24px 0'
            },
            dividerText: {
              color: '#EAEAEA',
              fontSize: '1rem'
            },
            identityPreviewText: {
              color: '#EAEAEA',
              fontSize: '1rem'
            },
            formFieldSuccessText: {
              color: '#00FF7F',
              fontSize: '0.9rem'
            },
            formFieldErrorText: {
              color: '#FF4081',
              fontSize: '0.9rem'
            },
            alert: {
              backgroundColor: '#2A2A2A',
              border: '1px solid #FF4081',
              color: '#FF4081',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px'
            }
          }
        }}
      />
    </div>
  )
}

export default SIgnup