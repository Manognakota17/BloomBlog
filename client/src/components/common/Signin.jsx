import React from 'react'
import { SignIn } from '@clerk/clerk-react'

function SIgnin() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      background: 'linear-gradient(45deg, rgba(0, 255, 127, 0.05) 0%, rgba(255, 64, 129, 0.05) 100%)'
    }}>
      <SignIn 
        appearance={{
          layout: {
            logoPlacement: "inside",
            socialButtonsPlacement: "bottom",
            helpPageUrl: "https://help.example.com",
          },
          elements: {
            rootBox: {
              backgroundColor: '#1A1A1A',
              border: '1px solid rgba(0, 255, 127, 0.2)',
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
              color: '#00FF7F',
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
              backgroundColor: '#00FF7F',
              color: '#1A1A1A',
              fontFamily: 'JetBrains Mono, monospace',
              border: 'none',
              padding: '12px 24px',
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 127, 0.8)'
              }
            },
            formFieldInput: {
              backgroundColor: '#2A2A2A',
              color: '#EAEAEA',
              border: '1px solid rgba(0, 255, 127, 0.2)',
              padding: '12px 16px',
              fontSize: '1rem',
              width: '100%',
              '&:focus': {
                border: '1px solid rgba(0, 255, 127, 0.5)',
                outline: 'none'
              }
            },
            formFieldLabel: {
              color: '#EAEAEA'
            },
            footer: {
              color: '#EAEAEA'
            },
            footerActionLink: {
              color: '#00FF7F',
              '&:hover': {
                color: 'rgba(0, 255, 127, 0.8)'
              }
            },
            socialButtonsBlockButton: {
              backgroundColor: '#2A2A2A',
              border: '1px solid rgba(0, 255, 127, 0.2)',
              color: '#EAEAEA',
              '&:hover': {
                backgroundColor: '#3A3A3A'
              }
            },
            socialButtonsBlockButtonText: {
              color: '#EAEAEA'
            },
            dividerLine: {
              backgroundColor: 'rgba(0, 255, 127, 0.2)'
            },
            dividerText: {
              color: '#EAEAEA'
            },
            identityPreviewText: {
              color: '#EAEAEA'
            },
            formFieldSuccessText: {
              color: '#00FF7F'
            },
            formFieldErrorText: {
              color: '#FF4081'
            },
            alert: {
              backgroundColor: '#2A2A2A',
              border: '1px solid #FF4081',
              color: '#FF4081'
            }
          }
        }}
      />
    </div>
  )
}

export default SIgnin