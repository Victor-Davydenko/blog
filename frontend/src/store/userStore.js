import {makeAutoObservable} from 'mobx';
import axios, {AxiosError} from 'axios';
import AuthService from '../services/AuthService';

export default class UserStore {
  user = {};

  isLoading = false;

  error = null;

  isAuth = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setIsAuth(auth) {
    this.isAuth = auth;
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  setError(error) {
    this.error = error;
  }

  setUser(user) {
    this.user = user;
  }

  async login(email, password) {
    this.setError(null);
    try {
      const response = await AuthService.login(email, password);
      console.log(response.data)
      if (response instanceof AxiosError) {
        this.setError(response.response.data.message);
      }
      localStorage.setItem('accessToken', response.data.token);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    }
    catch (e) {
      throw new Error(e);
    }
  }

  async registration(name, email, password) {
    try {
      const response = await AuthService.registration(name, email, password);
      if (response instanceof AxiosError) {
        this.setError(response.response.data.message);
        this.setNotificationState({ errorMessage: this.error, isError: true });
      }
      localStorage.setItem('accessToken', response.data.token);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    }
    catch (e) {
      throw new Error(e);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('accessToken');
      this.setIsAuth(false);
      this.setUser({});
    }
    catch (e) {
      throw new Error(e);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/refresh`, { withCredentials: true });
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
      this.setIsLoading(false);
    }
    catch (e) {
      this.setIsLoading(false);
    }
  }
}