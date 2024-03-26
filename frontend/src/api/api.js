import axios from 'axios';

export const setNewPassword = (passwordData, token) => {
  return axios.post('http://localhost:3001/new-password', passwordData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
};
