import axios from 'axios';

export const setNewPassword = (passwordData, token) => {
  return axios.post(`${process.env.REACT_APP_BASE_URI}/new-password`, passwordData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
};
