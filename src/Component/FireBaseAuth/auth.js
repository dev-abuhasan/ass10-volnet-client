import React, { createContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

let Context = null;
const { Provider, Consumer } = Context = createContext();

const UserAuthProvider = (props) => {
  //Declare State
  const [user, setUser] = useState(null);
  const [succeed, setSucceed] = useState(false);
  const [error, setError] = useState('');

  //  register user with email and password
  const registerEmailAndPassword = (email, password, name) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        const isPossibleNewUser = true;
        setSucceed(isPossibleNewUser);
        verifyEmail();
        updateUserProfile(name);
        return res;
      })
      .catch(error => {
        const errorMessageDuplicate = error.message;
        setSucceed(errorMessageDuplicate);
      });
  }

  // sign in user of google
  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const signedIUser = {
          isSigned: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedIUser);
        return result;
      }).catch(error => {
        const errorMessage = error.message;
        const email = error.email;
        console.log(errorMessage, email);
      });
  }

  // facebook registration user 
  const facebookRegistration = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(facebookProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const signedIUser = {
          isSigned: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedIUser);
      }).catch(error => {
        const errorMessage = error.message;
        const email = error.email;
        console.log(errorMessage, email);
      });
  }

  //update user profile
  const updateUserProfile = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(() => {
      console.log('user name updated successfully');
    }).catch(error => {
      console.log(error);
    });
  }

  //verifyEmail
  const verifyEmail = () => {
    const user = firebase.auth().currentUser;
    user.sendEmailVerification().then(() => {
      // Email sent.
    }).catch(error => {
      console.log(error);
    });
  }

  //jwt Token

  //reset password
  const resetPassword = email => {
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(() => {

    }).catch(error => {
      console.log(error);
    });
  }

  //login in user 
  const loginInUserEmailAndPass = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        const name = result.user.displayName;
        setUser(name);
        return result;
      })
      .catch(error => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  // logout user
  const logOut = () => {
    firebase.auth().signOut()
      .then(() => {
        setUser(null);
      }).catch(error => {
        console.log(error);
      })
  }
  return (
    <Provider value={
      {
        user,
        succeed,
        error,
        loginInUserEmailAndPass,
        resetPassword,
        registerEmailAndPassword,
        handleGoogleSignIn,
        facebookRegistration,
        logOut,
        setUser,
      }
    }>
      {props.children}
    </Provider>
  )

}

export { UserAuthProvider, Consumer as UserConsumer, Context as UserAuthContext };