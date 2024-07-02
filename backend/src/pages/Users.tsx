
import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, updateUser } from '../api/users';
import { IUser } from '../types';
import '../styles/users.css'; 

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [formValues, setFormValues] = useState<Partial<IUser>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      await deleteUser(userId, token);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (user: IUser) => {
    setEditingUser(user);
    setFormValues(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      try {
        const token = localStorage.getItem('token');
        await updateUser(editingUser._id, formValues, token);
        setUsers(users.map(user => (user._id === editingUser._id ? { ...user, ...formValues } : user)));
        setEditingUser(null);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className='main'>
      <div className='users-page'>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.firstName} {user.lastName} - {user.email}
            <button onClick={() => handleDelete(user._id)}>Delete</button>
            <button onClick={() => handleEditClick(user)}>Edit User</button>
          </li>
        ))}
      </ul>

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
            Password:
            <input
              type="password"
              name="password"
              value={formValues.password || ''}
              onChange={handleInputChange}
            />
          </label>
          <div className="edit-buttons">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={handleCancelEdit}>Cancel</button>
          </div>
        </form>
      )}
    </div>
    </div>
  );
};

export default Users;
