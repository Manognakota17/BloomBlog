import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import './AdminProfile.css';

const UsersnAuthors = () => {
  const [users, setUsers] = useState([]);
  const { getToken } = useAuth();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentuser"));
        const userId = currentUser ? currentUser._id : null;
        
        const response = await axios.get(`${BACKEND_URL}/user-api/users`, {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });
        setUsers(response.data.payload);
      } catch (error) {
        console.error("Full error:", error);
        toast.error("Failed to load users");
      }
    };

    fetchUsers();
  }, [getToken]);

  const toggleBlockStatus = async (id, blocked) => {
    try {
      const token = await getToken();
      const response = await axios.put(
        `${BACKEND_URL}/admin-api/admin/block-unblock/${id}`,
        { blocked: !blocked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, blocked: response.data.payload.blocked } : user
        )
      );
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
      toast.error("Failed to update user status");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <Users style={{
          width: '1.5rem',
          height: '1.5rem',
          color: 'var(--accent-primary)'
        }} />
        <h2 style={{
          color: 'var(--text-primary)',
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: '600',
          fontFamily: 'Poppins, sans-serif'
        }}>Users & Authors</h2>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.95rem'
        }}>
          <thead>
            <tr style={{
              backgroundColor: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                color: 'var(--text-secondary)',
                fontWeight: '600',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>User Details</th>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                color: 'var(--text-secondary)',
                fontWeight: '600',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Role</th>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                color: 'var(--text-secondary)',
                fontWeight: '600',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Status</th>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                color: 'var(--text-secondary)',
                fontWeight: '600',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  transition: 'background-color 0.3s ease'
                }}
                whileHover={{
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                <td style={{ padding: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--bg-primary)',
                      fontSize: '1.2rem',
                      fontWeight: '600'
                    }}>
                      {user.firstName?.[0]}
                    </div>
                    <div>
                      <div style={{
                        color: 'var(--text-primary)',
                        fontWeight: '500',
                        marginBottom: '0.25rem'
                      }}>{user.firstName} {user.lastName}</div>
                      <div style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem'
                      }}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--bg-primary)',
                    textTransform: 'capitalize'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    backgroundColor: user.blocked ? 'rgba(255, 64, 129, 0.1)' : 'rgba(0, 255, 127, 0.1)',
                    color: user.blocked ? '#FF4081' : '#00FF7F',
                    textTransform: 'capitalize'
                  }}>
                    {user.blocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button
                    onClick={() => toggleBlockStatus(user._id, user.blocked)}
                    style={{
                      backgroundColor: user.blocked ? 'var(--accent-primary)' : '#FF4081',
                      color: 'var(--bg-primary)',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {user.blocked ? "Unblock User" : "Block User"}
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UsersnAuthors;