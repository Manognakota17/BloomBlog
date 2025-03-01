import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo4.avif";
import { useClerk, useUser } from '@clerk/clerk-react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import {useAuth} from '@clerk/clerk-react'

const Header = () => {
  const { userId } = useAuth();
  const { signOut } = useClerk();
  const { currentUser,setCurrentUser } = useContext(userAuthorContextObj);
 console.log(currentUser);

 const navigate=useNavigate()
  // Add these lines
  const { isSignedIn, user, isLoaded } = useUser();
  const handleSignOut = async () => {
    console.log("signout called")
    try {
      await signOut();
      // Clear local storage after successful sign out
      setCurrentUser(null)
      localStorage.clear();
      navigate('/')
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <nav className="header d-flex justify-content-between align-content-center py-3" 
           style={{ 
             backgroundColor: 'var(--bg-primary)',
             borderBottom: '1px solid var(--border-color)',
             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
             padding: '1rem 2rem',
           }}>
        <div className="d-flex justify-content-center align-items-center">
          <Link href="/" style={{ 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <div className="ms-4 d-flex align-items-center">
              <span style={{ 
                color: 'var(--accent-primary)', 
                fontSize: '2rem', 
                fontWeight: '700',
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '1px',
                textShadow: '0 2px 10px rgba(233, 30, 99, 0.2)',
                transition: 'all 0.3s ease'
              }}>Bloom</span>
              <span style={{ 
                color: 'var(--text-primary)', 
                fontSize: '2rem', 
                fontWeight: '700',
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '1px',
                marginLeft: '4px',
                transition: 'all 0.3s ease'
              }}>Blog</span>
            </div>
          </Link>
        </div>
        <ul className="d-flex justify-content-center list-unstyled align-items-center" style={{ margin: 0 }}>
          {!isSignedIn ? (
            <>
              <li>
                <Link to="signin" style={{ 
                  color: 'var(--accent-primary)',
                  textDecoration: 'none',
                  fontWeight: '500',
                  padding: '10px 24px',
                  borderRadius: '30px',
                  marginRight: '1rem',
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                  border: '2px solid var(--accent-primary)',
                  backgroundColor: 'transparent',
                  display: 'inline-block',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="signup" style={{ 
                  color: 'var(--bg-primary)',
                  textDecoration: 'none',
                  fontWeight: '500',
                  padding: '10px 24px',
                  borderRadius: '30px',
                  marginRight: '1rem',
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'var(--accent-primary)',
                  border: '2px solid var(--accent-primary)',
                  display: 'inline-block',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <div className="d-flex justify-content-around align-items-center" style={{ gap: '1.5rem' }}>
              <div className="user-button d-flex align-items-center" style={{ gap: '1rem' }}>
                <div style={{ 
                  position: "relative",
                  padding: '3px',
                  background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.5), rgba(52, 152, 219, 0.5))',
                  borderRadius: '50%',
                }}>
                  <img
                    src={user.imageUrl}
                    width="40px"
                    height="40px"
                    className="rounded-circle"
                    alt=""
                    style={{ 
                      border: '2px solid var(--bg-primary)',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    color: 'var(--bg-primary)',
                    background: 'var(--accent-primary)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 8px rgba(233, 30, 99, 0.2)',
                    fontFamily: 'Poppins, sans-serif'
                  }}>{currentUser.role}</div>
                </div>
                <p className="mb-0 user-name" style={{ 
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  fontFamily: 'Poppins, sans-serif'
                }}>{user.firstName}</p>
              </div>
              <button 
                onClick={handleSignOut} 
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--accent-primary)',
                  border: '2px solid var(--accent-primary)',
                  padding: '8px 20px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'Poppins, sans-serif'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                  e.currentTarget.style.color = 'var(--bg-primary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(233, 30, 99, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <span>Sign out</span>
              </button>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header