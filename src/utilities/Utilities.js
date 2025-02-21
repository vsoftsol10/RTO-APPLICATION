import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin'

GoogleSignin.configure(
    {
        webClientId:"640987262083-p6039knc6b6sltir790cnevqn1eqc79s.apps.googleusercontent.com"
    }
);

export const SignInWithEmailandPassword=(email,password)=>{
  return auth().signInWithEmailAndPassword(email,password);
}

export const CreateAccountWithEmailAndPassWord = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);

    // Set default display name
    await userCredential.user.updateProfile({
      displayName: email.split('@')[0], // Set display name as email username
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
};


export const SignInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const signInResult = await GoogleSignin.signIn();
    let idToken = signInResult.idToken || signInResult.data?.idToken;

    if (!idToken) {
      throw new Error('No ID token found');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);

    // Update displayName in Firebase if it's missing
    if (userCredential.user && !userCredential.user.displayName) {
      await userCredential.user.updateProfile({
        displayName: signInResult.user.name, // Set Google name
      });
    }

    return userCredential;
  } catch (error) {
    console.log('Google Sign-in Error:', error);
    throw error;
  }
};


export const SignInAnonymously=()=>{
  return auth().signInAnonymously();
  
}

export const SignOutUser=()=>{
    return auth().signOut();

}