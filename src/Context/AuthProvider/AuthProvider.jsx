import { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import auth from "../../FIrebase/FIrebase";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUsernameAndPhotoUrl = async (name, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      return { ...auth.currentUser, displayName: name, photoURL: photo };
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLoginByGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const userLogOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const handleAuthChange = (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic
          .post("/jwt", userInfo)
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
            }
          })
          .catch((err) => {
            console.error("Error fetching token:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
    return () => unsubscribe();
  }, [axiosPublic]);

  const value = {
    loading,
    setLoading,
    createUser,
    updateUsernameAndPhotoUrl,
    userLogin,
    userLoginByGoogle,
    userLogOut,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export AuthContext for use in other components
export { AuthContext };
