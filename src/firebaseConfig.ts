import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { toast } from './toast';

const config = {
    apiKey: "AIzaSyDja_R-qctpwQAP9I1wwE2mVC3G_KSb5M4",
    authDomain: "converterapp-f620e.firebaseapp.com",
    projectId: "converterapp-f620e",
    storageBucket: "converterapp-f620e.appspot.com",
    messagingSenderId: "113982200992",
    appId: "1:113982200992:web:53ab02ba16d79257837dc5"
};

firebase.initializeApp(config)

export function getCurrentUser(){
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                resolve(user)
            } else {
                resolve(null)
            }
            unsubscribe()
        })
    })
}

export function logoutUser(){
    return firebase.auth().signOut()
}

export async function loginUser(username: string, password: string) {
    const email = `${username}@converterapp.com`
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
        //toast(error.message, 2000)
        return false
    }
}

export async function registerUser(username: string, password: string) {
    const email = `${username}@converterapp.com`
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
        console.log(res)
        return true
    } catch (error) {
        console.log(error)
        //toast(error.message, 2000)
        return false
    }
}