import authHeader from "./auth-header";
import axios from "axios";
const API_URL = "http://localhost:5000/";
class AuthService {
       
    getUserBoard() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    login(email, password) {
        return axios
            .post(API_URL + "signin",{
                email,
                password
            })
            .then(response => {
                if (response.data.token) {
                    // console.log("SS",response.data.token)
                    localStorage.setItem("user", JSON.stringify(response.data.token));
                }
                return response.data;
            });
    }
    logout() {   
        localStorage.removeItem("user");
    }
    register(email, password) {
        return axios.post(API_URL + "signup", {
            email,
            password
        }).then(response => {

            return response.data;
        }

        );
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}
export default new AuthService();