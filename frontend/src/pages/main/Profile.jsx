import { useContext, useState } from 'react';
import { getAuth, updateProfile, signOut } from 'firebase/auth';
import { AuthContext } from '../Authentication/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName });
      setMessage('Profile updated!');
      setEditing(false);
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (!currentUser) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-violet-200 h-100 shadow-xl rounded-xl">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={currentUser.photoURL}
          alt="User"
            referrerPolicy="no-referrer"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        {editing ? (
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="border px-3 py-1 rounded-md"
          />
        ) : (
          <h2 className="text-xl font-semibold">{currentUser.displayName}</h2>
        )}
        <p className="text-sm text-gray-600">{currentUser.email}</p>

        <div className="flex space-x-4 mt-4">
          {editing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-md"
            >
              Edit Name
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
          >
            Log Out
          </button>
        </div>

        {message && <p className="text-sm text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;
