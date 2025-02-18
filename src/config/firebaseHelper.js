import {collection,addDoc} from '@react-native-firebase/firestore';
import {db} from './firebaseconfig';

const addUser= async(userData)=>{
    try{
        const docRef=await addDoc(collection(db,'users'),{
            name: userData.name,
            mobileNo: userData.mobileNo,
            dob: userData.dob,
            pincode: userData.pincode,
            country: userData.country,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return{
            success:true,
            userId:docRef.id
        };
    }
    catch(error){
        return{
            success: false,
            error: error.message
        };
    }
};

export default addUser;