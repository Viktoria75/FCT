import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getUserById, deleteUser, updateUser } from '../api/users';
import { IUser } from '../types';
import '../styles/userprofile.css'; 

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<IUser | null>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [formValues, setFormValues] = useState<Partial<IUser>>({});
  const [newPassword, setNewPassword] = useState<string>('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (authContext && authContext.authenticated && userId && authContext.token) {
        try {
          const userData = await getUserById(userId, authContext.token); 
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, [userId, authContext]);

  const handleDelete = async () => {
    if (user && authContext && authContext.authenticated && authContext.token) {
      try {
        await deleteUser(user._id, authContext.token);
        localStorage.removeItem('token');
        authContext.logout();
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEditClick = () => {
    if (user) {
      setEditingUser(user);
      setFormValues({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({...prevValues, [name]: value }));
  };

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewPassword(e.target.value);
  // };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser && authContext && authContext.authenticated && authContext.token) {
      try {
        const updatedUser = {...editingUser,...formValues };
        if (newPassword) {
          updatedUser.password = newPassword;
        }
        await updateUser(editingUser._id, updatedUser, authContext.token);
        setUser(updatedUser);
        setEditingUser(null);
        setNewPassword('');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    await handleDelete();
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='main'>
      <div className="user-profile">
      <h1>My Profile</h1>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleEditClick}>Edit User Details</button>
      <button onClick={handleDeleteClick}>Delete Profile</button>
      {editingUser && (
        <form onSubmit={handleFormSubmit}>
          <h2>Edit User</h2>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formValues.firstName || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formValues.lastName || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formValues.email || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              name="password"
              value={formValues.password || ''}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleCancelEdit}>Cancel</button>
        </form>
      )}
      {showConfirmDelete && (
          <div className="modal-overlay">
            <div className="confirm-delete">
              <h2>Are you sure you want to delete your profile?</h2>
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        )}
    </div>
    </div>
  );
};

export default UserProfile;