import { defineStore } from 'pinia';
import axios from 'axios';

interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  organization: string;
  phoneNumber: string;
  country: string;
  password: string;
}

type LoginRequest = Omit<UserRequest, 'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'organization' |'country'>

interface User extends UserRequest {
  id: string;
}
export const useUsers = defineStore('users', {
  state: (): {
    users: Array<User>,
    profile: User | null
  } => ({
    users: [],
    profile: null
  }),

  getters: {
    getProfile: (state) => state.profile,
    getUsers: (state) => state.users
  },

  actions: {
    async login (body: LoginRequest) {
      try {
        const response = await axios.post('http://localhost:8085/users/login', body);
        localStorage.setItem('token', response.data.accessToken)
        this.profile = response.data.user
      } catch(err) {

      }
    },
    async registerUser (body: UserRequest) {
      try {
        const response = await axios.post('http://localhost:8085/users/register', body)
        localStorage.setItem('token', response.data.accessToken)
        this.profile = response.data
        this.users = this.users.concat(response.data.user)
      } catch(err) {
        throw new Error('Something went wrong')
      }

    }
  }
});
