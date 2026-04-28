import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiCamera,
  FiLock,
  FiTrash2,
  FiLogOut,
  FiX,
} from 'react-icons/fi';
import { authService } from '../services/api';

export default function AccountSettings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  // Edit Profile State
  const [editProfile, setEditProfile] = useState({
    name: '',
    avatar: null,
    previewUrl: null,
  });
  const [editingProfile, setEditingProfile] = useState(false);

  // Change Password State
  const [changePassword, setChangePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    setEditProfile({
      name: currentUser.name || '',
      avatar: null,
      previewUrl: currentUser.avatar || null,
    });
  }, [navigate]);

  // Handle Profile Picture Upload
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditProfile((prev) => ({
          ...prev,
          avatar: file,
          previewUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Profile Changes
  const handleSaveProfile = async () => {
    if (!editProfile.name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setEditingProfile(true);
    try {
      // Prepare FormData for file upload
      const formData = new FormData();
      formData.append('name', editProfile.name);
      if (editProfile.avatar) {
        formData.append('avatar', editProfile.avatar);
      }

      // TODO: Call API to update profile
      // const response = await authService.updateProfile(formData);
      // Update local user state
      const updatedUser = {
        ...user,
        name: editProfile.name,
        avatar: editProfile.previewUrl,
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setEditingProfile(false);
    }
  };

  // Handle Change Password
  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = changePassword;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (currentPassword === newPassword) {
      toast.error('New password must be different from current password');
      return;
    }

    setChangingPassword(true);
    try {
      // TODO: Call API to change password
      // const response = await authService.changePassword({
      //   currentPassword,
      //   newPassword,
      // });

      toast.success('Password changed successfully!');
      setChangePassword({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to change password'
      );
    } finally {
      setChangingPassword(false);
    }
  };

  // Handle Delete Account
  const handleDeleteAccount = async () => {
    if (deleteConfirmation.toUpperCase() !== 'DELETE') {
      toast.error('Please type "DELETE" to confirm');
      return;
    }

    setLoading(true);
    try {
      // TODO: Call API to delete account
      // const response = await authService.deleteAccount();

      toast.success('Account deleted successfully');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showDeleteModal]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ink via-ink to-ink-light flex items-center justify-center">
        <div className='animate-spin h-10 w-10 rounded-full border border-l-accent'></div>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink via-ink to-ink-light py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2"> Account Settings</h1>
          <p className="text-gray-400">Manage your account preferences</p>
        </div>

        {/* User Info Section */}
        <div className="bg-ink-dark rounded-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <FiUser className="text-blue-400" />
            Account Information
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <div className="flex items-center gap-2 text-white">
                <span className="text-lg">{user.name}</span>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <div className="flex items-center gap-2 text-white">
                <FiMail className="text-gray-500" size={18} />
                <span>{user.email}</span>
              </div>
            </div>

            {/* Date Created */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Member Since
              </label>
              <div className="flex items-center gap-2 text-white">
                <FiCalendar className="text-gray-500" size={18} />
                <span>{formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className="bg-ink-dark rounded-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <FiCamera className="text-blue-400" />
            Edit Profile
          </h2>

          <div className="space-y-6">
            {/* Profile Picture Preview */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                {editProfile.previewUrl ? (
                  <img
                    src={editProfile.previewUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-3xl text-white font-semibold">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer transition">
                  <FiCamera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-400">
                Click camera icon to change
              </p>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={editProfile.name}
                onChange={(e) =>
                  setEditProfile((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full bg-ink border border-gray-600 rounded-lg py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="Your name"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveProfile}
              disabled={editingProfile}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white font-semibold py-2.5 rounded-lg transition duration-200"
            >
              {editingProfile ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-ink-dark rounded-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <FiLock className="text-blue-400" />
            Change Password
          </h2>

          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={changePassword.currentPassword}
                onChange={(e) =>
                  setChangePassword((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                className="w-full bg-ink border border-gray-600 rounded-lg py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="••••••••"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                New Password
              </label>
              <input
                type="password"
                value={changePassword.newPassword}
                onChange={(e) =>
                  setChangePassword((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="w-full bg-ink border border-gray-600 rounded-lg py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={changePassword.confirmPassword}
                onChange={(e) =>
                  setChangePassword((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="w-full bg-ink border border-gray-600 rounded-lg py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="••••••••"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleChangePassword}
              disabled={changingPassword}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white font-semibold py-2.5 rounded-lg transition duration-200"
            >
              {changingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>

        {/* Delete Account Section - Danger Zone */}
        <div className="bg-red-900/20 rounded-lg border border-red-700/50 p-6 mb-6">
          <h2 className="text-xl font-semibold text-red-400 mb-2 flex items-center gap-2">
            <FiTrash2 />
            ⚠️ Danger Zone
          </h2>
          <p className="text-gray-300 text-sm mb-6">
            Deleting your account is permanent and cannot be undone. All your
            data will be lost.
          </p>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            Delete Account
          </button>
        </div>

        {/* Logout Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg border border-purple-500/20 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FiLogOut className="text-purple-400" />
            Logout
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Securely sign out of your current session.
          </p>

          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0  bg-black/50  backdrop-blur-md bg-backdrop flex items-center justify-center z-50 px-4">
          <div className="bg-black rounded-lg border border-red-700 w-full max-w-md p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                <FiTrash2 />
                Delete Account
              </h3>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation("");
                }}
                className="text-gray-400 hover:text-white transition"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Warning Message */}
            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mb-6">
              <p className="text-red-300 text-sm">
                This action cannot be undone. This will permanently delete your
                account and remove all your data from our servers.
              </p>
            </div>

            {/* Confirmation Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Type "DELETE" to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder='Type "DELETE"'
                className="w-full bg-ink border border-gray-600 rounded-lg py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
              <p className="text-xs text-gray-400 mt-1">
                This is case-sensitive
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation("");
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2.5 rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={
                  loading || deleteConfirmation.toUpperCase() !== "DELETE"
                }
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-2.5 rounded-lg transition duration-200"
              >
                {loading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
