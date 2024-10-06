// src/services/auth.js
import api from "/src/main.js"


  export function mockLogin(credentials, success = true) {
    // Check if already logged in
    if (!success) {
      throw { status: 409, response: { data: { message: "A user is already logged in", success: false } } };
    }

    // If all checks pass, return a success message
    return { status: 200, response: { data: { message: "login succeeded", success: true}} };
  }


  export async function Login(username, password) {
    try {
        const response = await api.post('/Login', {
        username: username,
        password: password,
      });
      return response.data; // Return the response data from the backend
    } catch (error) {
      throw error.response ? error.response.data : error; // Pass the error details for proper handling
    }
  }

  

  export function mockRegister(userDetails, success = true) {

    if (!success) {
      throw { status: 409, response: { data: { message: "Username taken", success: false } } };
    }
  
    return { status: 200, response: { data: { message: "user created", success: true}} };
  }
  


  export function mockLogout() {
    return { status: 200, response: { data: { message: "logout succeeded", success: true}} };

  }
  export async function Logout() {
    try {
        const response = await api.post('/Logout');
        return response.data; // Return the response data from the backend
    } catch (error) {
      throw error.response ? error.response.data : error; // Pass the error details for proper handling
    }
  }

  export async function Register(username, password, firstName, lastName, country, email, profilePictureUrl) {
    try {
      const response = await api.post('/Register', {
        username: username,
        firstName: firstName,
        lastName: lastName,
        country: country,
        password: password,
        email: email,
        profilePictureUrl: profilePictureUrl
      });
      return response.data; // Return the response data from the backend
    } catch (error) {
      throw error.response ? error.response.data : error; // Pass the error details for proper handling
    }
  }