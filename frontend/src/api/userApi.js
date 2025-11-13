import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/SignUp", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/LogIn", credentials);
  return data;
};

// ✅ FIXED: Make this a function, not an immediate call
export const logoutUser = async () => {
  const { data } = await axiosInstance.post("/auth/LogOut");
  return data;
};

export const checkAuth = async () => {
  const { data } = await axiosInstance.get("/auth/check");
  return data;
};
