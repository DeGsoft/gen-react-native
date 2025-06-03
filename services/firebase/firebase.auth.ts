import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithCredential,
    signInWithEmailAndPassword
} from "firebase/auth";
import {auth} from "@/services/firebase/firebase-config";
import {User} from "@firebase/auth-types";
import {getLocalizedText} from "@/languages/languages";

interface FirebaseSignProps {
    (email: string, password: string): Promise<User | any>;
}

export const firebaseSignOut = () => {
    auth.signOut();
    GoogleSignin.revokeAccess().then();
    GoogleSignin.signOut().then();
}

export const firebaseSignIn: FirebaseSignProps = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (!user.emailVerified) {
                sendEmailVerification(user).then();
                firebaseSignOut();
                throw {
                    code: "auth/email-not-verified",
                    message: getLocalizedText("verify_email_error"),
                };
            }
            return user;
        });

export const firebaseSignUp: FirebaseSignProps = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
                const user = userCredential.user;
                return sendEmailVerification(user).then(() => {
                    return {
                        code: "auth/email-verification-sent",
                        message: getLocalizedText("verify_email_sent")
                    }
                });
            }
        )
}

export const firebaseGoogleSignIn = (token: string) =>
    signInWithCredential(auth, GoogleAuthProvider.credential(token))
        .then((result) => result.user);

export const firebaseAuthState = () =>
    new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                unsubscribe();
                if (user?.emailVerified) resolve(user);
                else resolve(null);
            },
            (error) => {
                unsubscribe();
                reject(error);
            }
        );
    });

export const firebaseReset = async (email: string) =>
    sendPasswordResetEmail(auth, email).then(() => {
        firebaseSignOut();
        return {
            code: "auth/password-reset-sent",
            message: getLocalizedText("password_reset_sent")
        };
    });

export const firebaseGetUserIdToken = async() => {
    const user = auth.currentUser;
    return user?.getIdToken();
}