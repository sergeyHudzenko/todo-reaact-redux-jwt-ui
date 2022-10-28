import jwt_decode from "jwt-decode";

export const isAuthenticated = (accessToken) => {
    if (!accessToken) {
      return false;
    }

  let decodedToken = jwt_decode(accessToken);
  console.log("Decoded Token", decodedToken);
  let currentDate = new Date();

  // JWT exp is in seconds
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log("Token expired.");
    return false
  } else {
    console.log("Valid token");   
    return true
  }
  };