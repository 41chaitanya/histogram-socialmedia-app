import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import gsap from 'gsap';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const containerRef = useRef();
  const cardRef = useRef();

  useEffect(() => {
    fetchProfile();
    
    // Entrance animation
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await api.getMyProfile();
      setProfile(data);
      setBio(data.bio || '');
      setProfileImageUrl(data.profileImageUrl || '');
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      const updated = await api.updateProfile(bio, profileImageUrl);
      setProfile(updated);
      setIsEditing(false);
      
      // Success animation
      gsap.to(cardRef.current, {
        boxShadow: '0 0 30px rgba(120, 224, 143, 0.5)',
        duration: 0.3,
        yoyo: true,
        repeat: 1
      });
    } catch (err) {
      setError('Failed to update profile');
      gsap.to(cardRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setBio(profile?.bio || '');
    setProfileImageUrl(profile?.profileImageUrl || '');
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="profile-container" ref={containerRef}>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-container" ref={containerRef}>
      <div className="profile-card" ref={cardRef}>
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar-large">
            {profileImageUrl ? (
              <img src={profileImageUrl} alt={profile?.username} />
            ) : (
              <span>{profile?.username?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="profile-header-info">
            <h1>{profile?.username}</h1>
            <span className="profile-role-badge">{user?.role}</span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {error && <p className="error-message">{error}</p>}

          {isEditing ? (
            <>
              <div className="profile-field">
                <label>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>

              <div className="profile-field">
                <label>Profile Image URL</label>
                <input
                  type="url"
                  value={profileImageUrl}
                  onChange={(e) => setProfileImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="profile-actions">
                <button 
                  className="btn-secondary"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="profile-field">
                <label>Bio</label>
                <p className="profile-bio">
                  {profile?.bio || 'No bio yet. Click edit to add one!'}
                </p>
              </div>

              <button 
                className="btn-primary edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
