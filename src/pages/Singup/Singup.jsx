import React, { useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import GoogleLogo from "@assets/Icons/google-icon.svg";

import { app } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setToken } from "../../store/slice/auth";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

const Singup = () => {
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const writeUserData = (userId, name, email, imageUrl) => {
    const db = getDatabase(app);
    try {
      set(ref(db, "users/" + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl,
        employees: null,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handelSignUp = () => {
    const auth = getAuth(app);

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        dispatch(setAuth(user));
        dispatch(setToken(token));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorCode, errorMessage, email, credential);
      });
  };

  const handelSignOut = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("auth");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    if (auth?.uid) {
      const { uid, displayName, email, photoURL } = auth;
      writeUserData(uid, displayName, email || user?.email, photoURL);
      navigate("/", { replace: true });
    }
  }, [auth]);

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center bg-slate-950  p-4 texnpm install firebaset-white">
      <button
        onClick={handelSignUp}
        className="text-white border font-semibold hover:bg-slate-900/50 border-indigo-500 py-2 px-8 rounded-md flex gap-4 items-center">
        <img src={GoogleLogo} alt="" />
        Continue with google
      </button>
      <br />
      {/* <button onClick={handelSignOut} className="text-white">
        Google SignOut
      </button> */}
    </div>
  );
};

export default Singup;
