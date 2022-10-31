export default class Token {
    static setToken(token) {
        localStorage.setItem("token", token)
    }

    static getToken() {
        return localStorage.getItem("token")
    }
    
    static removeToken() {
        localStorage.removeItem("token")
    }

    static setUser(id) {
        localStorage.setItem("userId", id)
    }

    static getUser() {
        return localStorage.getItem("userId")
    }
    
    static removeUser() {
        localStorage.removeItem("userId")
    }
}