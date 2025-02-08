import auth from '@react-native-firebase/auth';


export const CreateAccountWithEmailAndPassWord=(email,password)=>{
   return auth().createUserWithEmailAndPassword(email,password);
}

export const SignOutUser=()=>{
    return auth().signOut()
}