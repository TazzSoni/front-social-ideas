export const setUserData = ({ userData }) => {
  localStorage.setItem("social@user", JSON.stringify(userData));
};

export const getUserData = () => {
  const user = JSON.parse(localStorage.getItem("social@user"));

  return user;
};

export const clearUserData = () => {
  localStorage.clear();
};
