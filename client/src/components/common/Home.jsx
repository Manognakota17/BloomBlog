import { useContext, useEffect, useState } from 'react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj)

  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // console.log("isSignedIn :", isSignedIn)
   console.log("User :", user)
  // console.log("isLolded :", isLoaded)


  async function onSelectRole(e) {
    setError('')
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;

    const allowedAdminEmail = "pavankumar2005712@gmail.com"; // Your email

    if (selectedRole === 'admin' && currentUser.email !== allowedAdminEmail) {
      setError("Sorry, only the authorized user can be an admin.");
      return;
    }
    
    let res = null;
    try {
      if (selectedRole === 'author') {
        res = await axios.post(`${BACKEND_URL}/author-api/author`, currentUser)
        let { message, payload } = res.data;
        if (message === 'author') {
          setCurrentUser({ ...currentUser, ...payload })
          localStorage.setItem("currentuser",JSON.stringify(payload))
        } else {
          setError(message);
        }
      }
      if (selectedRole === 'user') {
        console.log(currentUser)
        res = await axios.post(`${BACKEND_URL}/user-api/user`, currentUser)
        let { message, payload } = res.data;
        console.log(message)
        if (message === 'user') {
          setCurrentUser({ ...currentUser, ...payload })
           localStorage.setItem("currentuser",JSON.stringify(payload))
        } else {
          setError(message);
        }
      }
      if (selectedRole === 'admin') {
        res = await axios.post(`${BACKEND_URL}/admin-api/admin`, currentUser);
        let { message, payload } = res.data;
        if (message === 'admin') {
          setCurrentUser({ ...currentUser, ...payload });
          localStorage.setItem("currentuser", JSON.stringify(payload));
        } else {
          setError(message);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  }


  useEffect(() => {
    if (isSignedIn === true) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded])



  useEffect(() => {

    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      navigate(`/author-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "admin" && error.length === 0) {
      navigate(`/admin-profile/${currentUser.email}`);
    }
  }, [currentUser]);

  // console.log("cu",currentUser)
  //console.log("is loaded",isLoaded)

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-primary)',
      minHeight: '90vh',
      color: 'var(--text-primary)'
    }}>
      <div className='container py-5'>
        {
          isSignedIn === false && <div>
            <h1 style={{ 
              color: 'var(--accent-primary)',
              marginBottom: '2rem',
              fontWeight: '700',
              fontFamily: 'Playfair Display, serif',
              fontSize: '3.5rem',
              textAlign: 'center',
              lineHeight: '1.2'
            }}>Welcome to <span style={{color: 'var(--text-primary)'}}>Bloom Blog</span></h1>
            <p className="lead" style={{ 
              marginBottom: '1.5rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              fontSize: '1.25rem',
              fontWeight: '300'
            }}>
              Experience blogging at the speed of thought. Bloom Blog combines cutting-edge technology 
              with seamless user experience to bring your ideas to life.
            </p>
            <p className="lead" style={{ 
              marginBottom: '2.5rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              fontSize: '1.1rem',
              fontWeight: '300'
            }}>
              Share your knowledge, connect with like-minded individuals, and be part of the future of content creation.
            </p>
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '16px',
              marginTop: '2rem',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              border: '1px solid var(--border-color)'
            }}>
              <p className="lead" style={{ 
                color: 'var(--text-primary)', 
                margin: '0 0 1.5rem',
                fontSize: '1.2rem',
                fontWeight: '400',
                fontFamily: 'Playfair Display, serif'
              }}>
                Ready to start your journey? Sign up now and join our community of tech-savvy creators.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/signup" style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--bg-primary)',
                  padding: '12px 32px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Poppins, sans-serif',
                  border: '2px solid var(--accent-primary)',
                  boxShadow: '0 4px 12px rgba(233, 30, 99, 0.15)'
                }}>Sign Up</Link>
                <Link to="/signin" style={{
                  backgroundColor: 'transparent',
                  color: 'var(--accent-primary)',
                  padding: '12px 32px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Poppins, sans-serif',
                  border: '2px solid var(--accent-primary)'
                }}>Sign In</Link>
              </div>
            </div>
          </div>
        }

        {
          isSignedIn === true &&
          <div>
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 20px rgba(233, 30, 99, 0.1)',
              border: '1px solid var(--border-color)'
            }} className='d-flex justify-content-evenly align-items-center'>
              <img src={user.imageUrl} width="120px" className='rounded-circle' 
                   style={{ 
                     border: '3px solid var(--accent-primary)',
                     boxShadow: '0 4px 12px rgba(233, 30, 99, 0.2)'
                   }} alt="" />
              <div>
                <h2 style={{ 
                  color: 'var(--accent-primary)',
                  margin: '0 0 0.5rem',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '2.5rem'
                }}>{user.firstName}</h2>
                <p style={{ 
                  color: 'var(--text-secondary)',
                  margin: 0,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: '300'
                }}>
                  {user.emailAddresses[0].emailAddress}
                </p>
              </div>
            </div>
            
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '2.5rem',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(233, 30, 99, 0.1)',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ 
                color: 'var(--text-primary)',
                marginBottom: '2rem',
                fontFamily: 'Playfair Display, serif',
                fontSize: '2rem',
                textAlign: 'center'
              }}>Select your role:</h3>
              {error.length !== 0 && (
                <p className="text-danger fs-5 text-center mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>{error}</p>
              )}
              <div className='d-flex role-radio py-4 justify-content-center gap-5'>
                <div className="form-check">
                  <input type="radio" name="role" id="author" value="author" 
                         className="form-check-input" onChange={onSelectRole}
                         style={{ 
                           borderColor: 'var(--accent-primary)',
                           backgroundColor: 'var(--bg-primary)',
                           width: '1.2rem',
                           height: '1.2rem'
                         }} />
                  <label htmlFor="author" className="form-check-label" style={{ 
                    color: 'var(--text-primary)',
                    fontSize: '1.1rem',
                    fontFamily: 'Poppins, sans-serif',
                    marginLeft: '0.5rem'
                  }}>
                    Author
                  </label>
                </div>
                <div className="form-check">
                  <input type="radio" name="role" id="user" value="user" 
                         className="form-check-input" onChange={onSelectRole}
                         style={{ 
                           borderColor: 'var(--accent-primary)',
                           backgroundColor: 'var(--bg-primary)',
                           width: '1.2rem',
                           height: '1.2rem'
                         }} />
                  <label htmlFor="user" className="form-check-label" style={{ 
                    color: 'var(--text-primary)',
                    fontSize: '1.1rem',
                    fontFamily: 'Poppins, sans-serif',
                    marginLeft: '0.5rem'
                  }}>
                    User
                  </label>
                </div>
                <div className="form-check">
                  <input type="radio" name="role" id="admin" value="admin" 
                         className="form-check-input" onChange={onSelectRole}
                         style={{ 
                           borderColor: 'var(--accent-primary)',
                           backgroundColor: 'var(--bg-primary)',
                           width: '1.2rem',
                           height: '1.2rem'
                         }} />
                  <label htmlFor="admin" className="form-check-label" style={{ 
                    color: 'var(--text-primary)',
                    fontSize: '1.1rem',
                    fontFamily: 'Poppins, sans-serif',
                    marginLeft: '0.5rem'
                  }}>
                    Admin
                  </label>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home