// src/services/authService.js
import { v4 as uuidv4 } from 'uuid';

// Simulate API delay
const apiDelay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys
const AUTH_TOKEN_KEY = 'lalaforms_auth_token';
const USER_STORAGE_KEY = 'lalaforms_user';
const USERS_STORAGE_KEY = 'lalaforms_users';

// Get users from storage
const getUsersFromStorage = () => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Save users to storage
const saveUsersToStorage = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Register a new user
export const registerUser = async (name, email, password) => {
  await apiDelay();
  
  const users = getUsersFromStorage();
  
  // Check if email is already in use
  if (users.some(user => user.email === email)) {
    throw new Error('Email is already in use');
  }
  
  // Create new user
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password, // In a real app, the password would be hashed
    createdAt: new Date().toISOString(),
    isPro: false,
    planType: 'free'
  };
  
  users.push(newUser);
  saveUsersToStorage(users);
  
  // Save user info to local storage
  const { password: _, ...userWithoutPassword } = newUser;
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
  
  // Generate and save auth token
  const token = uuidv4();
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  
  return userWithoutPassword;
};

// Login user
export const loginUser = async (email, password) => {
  await apiDelay();
  
  const users = getUsersFromStorage();
  
  // Find user by email
  const user = users.find(user => user.email === email);
  
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  // Save user info to local storage
  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
  
  // Generate and save auth token
  const token = uuidv4();
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  
  return userWithoutPassword;
};

// Logout user
export const logoutUser = async () => {
  await apiDelay();
  
  // Clear auth token and user info from local storage
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  
  return { success: true };
};

// Get current user
export const getCurrentUser = async () => {
  await apiDelay();
  
  // Check if auth token exists
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    return null;
  }
  
  // Get user info from local storage
  const userJson = localStorage.getItem(USER_STORAGE_KEY);
  
  if (!userJson) {
    return null;
  }
  
  return JSON.parse(userJson);
};

// Update user profile
export const updateUserProfile = async (userId, userData) => {
  await apiDelay();
  
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Update user data
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    updatedAt: new Date().toISOString()
  };
  
  saveUsersToStorage(users);
  
  // Update user info in local storage if it exists
  const currentUserJson = localStorage.getItem(USER_STORAGE_KEY);
  
  if (currentUserJson) {
    const currentUser = JSON.parse(currentUserJson);
    
    if (currentUser.id === userId) {
      const { password: _, ...userWithoutPassword } = users[userIndex];
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    }
  }
  
  return { success: true };
};

// Change password
export const changePassword = async (userId, currentPassword, newPassword) => {
  await apiDelay();
  
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Verify current password
  if (users[userIndex].password !== currentPassword) {
    throw new Error('Current password is incorrect');
  }
  
  // Update password
  users[userIndex].password = newPassword;
  users[userIndex].updatedAt = new Date().toISOString();
  
  saveUsersToStorage(users);
  
  return { success: true };
};

// Upgrade to Pro
export const upgradeToPro = async (userId, planType) => {
  await apiDelay();
  
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Update user plan
  users[userIndex].isPro = true;
  users[userIndex].planType = planType; // 'monthly' or 'yearly'
  users[userIndex].planStartDate = new Date().toISOString();
  users[userIndex].updatedAt = new Date().toISOString();
  
  saveUsersToStorage(users);
  
  // Update user info in local storage if it exists
  const currentUserJson = localStorage.getItem(USER_STORAGE_KEY);
  
  if (currentUserJson) {
    const currentUser = JSON.parse(currentUserJson);
    
    if (currentUser.id === userId) {
      const { password: _, ...userWithoutPassword } = users[userIndex];
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    }
  }
  
  return { success: true };
};
