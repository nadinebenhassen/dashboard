import React from 'react'
import { useState, ReactNode,useEffect } from 'react'
import axios from 'axios';

interface IUserContext {
  activeProfile: any; 
  setActiveProfile: ()=>any; 
  loadMe: ()=>any;
}

export const loadCurrentUser = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:3002/auth/load', {
        headers: {
            
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Failed to load current user:', error);
      throw error;
    }
  };
const UserContext = React.createContext<IUserContext | any>(null)
interface UserContextProviderProps {
  children: ReactNode;
}

function UserContextProvider({ children }: UserContextProviderProps) {
  const [activeProfile, setActiveProfile] = useState(null)
  const loadMe = async (token: string) => { 
      setActiveProfile(await loadCurrentUser(token))
   }
   

  return (
    <UserContext.Provider
      value={{
        activeProfile, setActiveProfile,
        loadMe,
     
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext }