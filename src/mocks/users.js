// Mock data for users endpoints
export const usersAll = [
  { id: "1", name: "Alice", username: "alice@email.com", role: "user", delete: false },
  { id: "2", name: "Bob", username: "bob@email.com", role: "admin", delete: false }
];

export const usersBooked = [
  { courtBooked: "Court 1", dayBooked: 15, timeBooked: "10:00", userId: "1" },
  { courtBooked: "Court 2", dayBooked: 15, timeBooked: "11:00", userId: "2" }
];

export const loginSuccess = {
  success: true,
  username: "alice@email.com",
  id: "1",
  role: "user",
  email: "alice@email.com"
};

export const loginError = {
  success: false,
  errorCode: 10001,
  message: "Invalid credentials"
};

export const registerSuccess = {
  token: "mock-token",
  name: "Alice"
};

export const registerError = {
  message: "Username already exists"
};

export const resetSuccess = { success: true };
export const resetError = { success: false };
