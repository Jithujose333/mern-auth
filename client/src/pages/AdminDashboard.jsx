import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { persistor } from '../redux/store';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editedData, setEditedData] = useState({username:'',email:''});
  const [newUser, setNewUser] = useState({ username: '', email: '',password:'', role: 'User' });
  
  
  

  const navigate = useNavigate()



  // Fetch users from backend
 
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/dashboard');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
        const data = await response.json();
        console.log(data)
        setUsers(data.users); // Ensure you're setting 'users'
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    useEffect(() => {
    fetchUsers();
  }, []); // Run only once

  // Search filter function
  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Handle edit button click
  const handleEdit = user => {
    setEditUserId(user._id);
    setEditedData(user);
  };

  // Handle input change
  const handleChange = e => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
    
  }
//   // Save updated user details
  const handleSave = async () => {
  try {
    const response = await fetch(`/api/admin/update/${editedData._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: editedData.username,
        email: editedData.email,
      }),
    });

    const data = await response.json();
    console.log(data)

    if (response.ok && data.success) {
      setUsers(prevUsers =>
        prevUsers.map(user => (user._id === editedData._id ? data.updatedUser : user))
      );
      toast.success("user data updated")
      setEditUserId(null); // Exit edit mode
    } else {
      console.error('Failed to update user:', data.message);
      toast.error(data.message)
      
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

  // Delete user
  const handleDelete = async id => {
    try {
      await fetch(`/api/admin/delete/${id}`, { method: 'DELETE' });
      setUsers(users.filter(user => user._id !== id));
      toast.success("user deleted successfully")
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle new user input
  const handleNewUserChange = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleAddUser = async () => {
    console.log(newUser)
    try {
      const response = await fetch('/api/admin/adduser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const addedUser = await response.json();
      console.log(addedUser.user)
      if(response.ok){
        // setUsers([...users, addedUser.user]);
        fetchUsers()
      setNewUser({ username: '', email: '',password:'', role: 'User' });
     
      toast.success(addedUser.message)
      }else{
        console.error('Update failed:', addedUser.message);
        toast.error(addedUser.message)
      }
      
      
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />

      {/* Add User Form */}
      <div className="mb-4">
        <input
          type="text"
          name="username"
          placeholder="Name"
          value={newUser.username}
          onChange={handleNewUserChange}
          className="p-2 border mr-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleNewUserChange}
          className="p-2 border mr-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleNewUserChange}
          className="p-2 border mr-2"
        />
        <select name="role" value={newUser.role} onChange={handleNewUserChange} className="p-2 border mr-2">
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button onClick={handleAddUser} className="bg-linear-to-r from-lime-500 via-green-500 to-emerald-500 p-2 px-4 rounded">Add User</button>
      </div>
     

      {/* User Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user,index) => (
            <tr key={user._id} className="text-center">
              <td className="border p-2">{index+1}</td>
              <td className="border p-2">
                {editUserId === user._id ? (
                  <input type="text" name="username" value={editedData.username || ""} onChange={handleChange} />
                ) : user.username}
              </td>
              <td className="border p-2">
                {editUserId === user._id ? (
                  <input type="email" name="email" value={editedData.email || ""} onChange={handleChange} />
                ) : user.email}
              </td>
              
           
              <td className="border p-2">
                {editUserId === user._id ? (
                  <>
                    <button onClick={handleSave} className="bg-blue-500 text-white p-2 px-3 rounded">Save</button>
                    <button onClick={() => setEditUserId(null)} className="bg-gray-500 text-white p-2 px-3 rounded ml-2">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)} className="bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 p-2 px-3 rounded">Edit</button>
                    <button onClick={() => handleDelete(user._id)} className="bg-gradient-to-l from-rose-500 via-pink-500 to-red-500 p-2 px-3 rounded ml-2">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
