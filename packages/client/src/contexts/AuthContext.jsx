import {createContext} from "react";
import { useState,useEffect, useContext} from "react";
import api, {setAuthHeaders} from "../utils/api.config";

const authContext = createContext();


const initialState = {
    user: null,
    isAuthenticated: null,
}

export function useAuth () {
    const [auth, setAuth] = useState(initialState);
    const signup = async (username, password, confirmPassword) => {
        try {
          const response = await api.post('/auth/signup', { username, password, confirmPassword })
          return response.data;
        } catch (error) {
          throw error
        }
      }
      const signin = async (username, password) => {
        try {
          const response = await api.post("/auth/signin", { username, password })
          setAuthHeaders(response.data.token);
          localStorage.setItem ("userData", JSON.stringify (response.data));
          setAuth ({
            isAuthenticated: true,
            user: response.data.user
          });
        } 
        catch (error) {
          throw error;
        }
      }
      const signout = () => {
        setAuth({
            isAuthenticated:false,
            user: null,
        })
        localStorage.removeItem ("userData");
      }
      useEffect(()=> {
        const userData = JSON.parse(localStorage.getItem("userData")) || null;
        if (userData){
            setAuthHeaders(userData.token)
          setAuth ({
            isAuthenticated:true,
            user: userData.user,
          });
        } else {
            setAuth ({
                isAuthenticated: false,
                user: null,
            })
        }
    }, [])
      return {
        auth,
        signup,
        signin,
        signout,
      };
}

const AuthProvider =({children}) => {
    const {auth, setAuth,signup,signin,signout} = useAuth();
    console.log({children})
    return <authContext.Provider value={{auth, signup, signin, signout}}>
        {children}
    </authContext.Provider>
}

export function useProvideAuth () {
    const {auth, signup, signin, signout} = useContext(authContext);
    return{
        auth,
        signup,
        signin,
        signout
    }

}

export default AuthProvider;