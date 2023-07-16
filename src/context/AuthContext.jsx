import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const inisitalStateToken = localStorage.getItem("token")

const AuthProvider = ({ children }) => {

       const [token, setToken ] = useState(inisitalStateToken);
       const [user, setUser] = useState(null);
       const [loading, setLoading] = useState(false);

       useEffect (() => {
        if (token) {
            getUserProfile(token);
        } setUser(false)
       }, []);

       const getUserProfile = async (accessToken)=> {
         try {
            setLoading(true);
             const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
            method: "GET",
            headers: {
                 authorization:`Bearer ${accessToken}`,
             },
             });

            const data = await res.json();
            setUser(data);
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
   }

       const saveToken = (accessToken) => {
        setToken(accessToken);
        localStorage.setItem("token", accessToken);
       };

       const logOut = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
     }




    return ( <AuthContext.Provider value={{saveToken, token, getUserProfile, user, loading, setLoading, logOut}}>
        {children}
        </AuthContext.Provider>
 );
};

export default AuthProvider;