import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
// import { EmailAuthCredential } from "firebase/auth/web-extension";
import { getDatabase, set, ref } from "firebase/database";
import { createContext, ReactNode, useContext } from "react";


interface ChildrenProps {
    children: ReactNode
}
const firebaseConfig = {
  // Add credentials
};

export const app = initializeApp(firebaseConfig)

const db = getDatabase(app);
export const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();



export const FirebaseContext = createContext<any>({
    putData: () => { },
    SignupUser: () => { },
    SigninUser: () => { },
    SignupWithGoogle:()=> { },
    SignInWithGoogle:()=> { },
});

export const useFirebase = () => {
    return useContext(FirebaseContext);
}

export const FirebaseProvider: React.FC<ChildrenProps> = ({ children }) => {
    const putData = () => {
        set(ref(db, "Users/kunal" + Math.floor(Math.random() % 10)), {
            id: 1,
            name: "kunal",
            age: 21
        })
    }
    const SignupUser = (email: string, password: string) => {
        return <> {createUserWithEmailAndPassword(auth, email, password)
            .then(() => alert("Created.."))
            .catch(() => alert("User Exist's"))}</>
    }
    const SigninUser = (email: string, password: string) => {
        return <> {signInWithEmailAndPassword(auth, email, password)
            .then(() => alert("SignedUp.."))
            .catch(() => alert("User does'nt exist"))}</>
    }
    const SignupWithGoogle = ()=>{
        signInWithPopup(auth, GoogleProvider).then(() => alert("SignedUp..")).catch(() => alert("User alerady exists"))
    }
    const SignInWithGoogle = ()=>{
        signInWithPopup(auth, GoogleProvider).then(() => alert("SignedUp..")).catch(() => alert("User alerady exists"))
    }

    return (
        <FirebaseContext.Provider value={{ putData, SignupUser, SigninUser, SignupWithGoogle, SignInWithGoogle }}>
            {children}
        </FirebaseContext.Provider>
    )
}
