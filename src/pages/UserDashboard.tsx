import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import './UserDashboard.css';

const UserDashboard: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim()) {
      setMessage('Username cannot be empty');
      return;
    }

    try {
      const success = await updateProfile({
        username: formData.username.trim(),
        email: formData.email.trim()
      });

      if (success) {
        setMessage('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setMessage('Failed to update profile');
      }
    } catch (error) {
      setMessage('An error occurred while updating profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      email: user?.email || ''
    });
    setIsEditing(false);
    setMessage('');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-dashboard">
      <Header />
      
      <main className="main-content">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div className="user-avatar">
              <div className="avatar-placeholder">
                {user.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <h1>User Dashboard</h1>
          </div>

          {message && (
            <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="user-info-section">
            <h2>Profile Information</h2>
            
            {!isEditing ? (
              <div className="user-info-display">
                <div className="info-item">
                  <label>Username:</label>
                  <span>{user.username}</span>
                </div>
                
                <div className="info-item">
                  <label>Email:</label>
                  <span>{user.email}</span>
                </div>
                
                <div className="info-item">
                  <label>Member Since:</label>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                
                <button 
                  className="edit-profile-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-actions">
                  <button type="button" onClick={handleCancel} className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="dashboard-stats">
            <h2>Account Statistics</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <h3>Account Type</h3>
                <p>Standard User</p>
              </div>
              <div className="stat-item">
                <h3>Status</h3>
                <p>Active</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
