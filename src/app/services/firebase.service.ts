import { inject, Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { User } from '../models/user.model';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {getStorage, uploadString, ref, getDownloadURL, deleteObject} from "firebase/storage";



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject (AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage= inject(AngularFireStorage);
  utilsSvc = inject (UtilsService);


  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(),user.email,user.password);
  }


  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(),user.email,user.password);
  }

  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName})
  }

  getAuth(){
    return getAuth();
  }

  singOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }




  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data)
  }

  //Obtener documentos de una colleción
  getCollectionData(path: string, collectionQuery?: any ){
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref,collectionQuery), {idField: 'uid'});
  }

  //obtener un documento
  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //agregar un documento
  addDocument(path: string , data: any){
    return addDoc(collection(getFirestore(), path), data)
  }



  //Actualizar un documento
  updateDocument(path: string, data: any){
    return updateDoc(doc(getFirestore(), path), data)
  }

  //Eliminar un documento
  deleteDocument(path: string){
    return deleteDoc(doc(getFirestore(), path))
  }


  //=======Almacenamineto======

  //Subir imagen
  async uploadImage(path: string, data_url: string): Promise<string>{
    return uploadString(ref(getStorage(),path), data_url, 'data_url').then(() =>{
      return getDownloadURL(ref(getStorage(),path))
    })
  }

  //Obterner ruta de la imagen con su Url
  async getFilePath(url : string){
    return ref(getStorage(), url).fullPath
  }

  //Eliminar archivo
  deleteFile(path: string){
    return deleteObject(ref(getStorage(),path));
  }
}
