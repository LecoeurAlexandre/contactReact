import './App.css';
import Header from './Components/contacts/Header';
import ModalComponent from './Components/shared/ModalComponent'
import Contacts from './Components/contacts/Contacts'
import {API_KEY} from './apiKey'
import { createPortal } from "react-dom";
import { useRef, useState } from "react";



function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const [contactModalVisible, setContactModalVisible] = useState(false)

  const [isLogged, setIsLogged] = useState(false)

  const [modalConnect, setModalConnect] = useState()

  //Ref modal connexion
  const emailRef = useRef()
  const passwordRef = useRef()
  //Ref modal contact
  const lastnameRef = useRef()
  const firstnameRef = useRef()
  const birthdateRef = useRef()
  const emailContactRef = useRef()
  const phoneRef = useRef()

  const submitFormHandler = async (event) => {
    event.preventDefault()
    console.log(modalConnect)
    let BASE_URL = ""
    if (modalConnect) {
      BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    } else {
      BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    }

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body : JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true
        })
      })
  
      // Si la réponse n'a pas comme code de retour un OK (200), alors on va envoyer une erreur
      if(!response.ok) {
        throw new Error("Il y a eu une erreur !")
      } 

      // Si la réponse est concluante, il va nous falloir extraire les données de la réponse (le body). Pour ce faire, on utilise la méthode asynchrone .json()
      const data = await response.json()
      
      // Dans la réponse se trouve un token qui nous servira par la suite pour faire notre requêtes de gestion de la base de données Firestore. Pour le moment, l'endroit le plus utile où le stocker est le stockage local de notre navigateur
      localStorage.setItem('token', data.idToken)

      emailRef.current.value = ""
      passwordRef.current.value = ""

      setIsLogged(true)
      setModalVisible(false)
    } catch (error) {
      console.error(error.message);
    }
  }

  const logOutHandler = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
    alert("Déconnexion réussie")
  }

  
  return (
    <>
    {modalVisible && createPortal(<ModalComponent closeModal={() => setModalVisible(false)}>
        <div className="d-flex justify-content-between align-items center">
        <h3>{modalConnect ? "S'inscrire" : "Se connecter"}</h3>
        <button onClick={() =>setModalVisible(false)} className="btn btn-outline-dark rounded-circle"><i className="bi bi-x"></i></button>
        </div>
        <hr />
        <form onSubmit={submitFormHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email : </label>
            <input type="text" required ref={emailRef} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe : </label>
            <input type="password" required ref={passwordRef} className="form-control" />
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-outline-info me-2">{modalConnect ? "S'inscrire" : "Se connecter"}</button>
          </div>
        </form>
    </ModalComponent>, document.getElementById("modal-root"))}
    {contactModalVisible && createPortal(<ModalComponent closeModal={() => setModalVisible(false)}>
        <div className="d-flex justify-content-between align-items center">
        <h3>Ajouter un contact</h3>
        <button onClick={() =>setContactModalVisible(false)} className="btn btn-outline-dark rounded-circle"><i className="bi bi-x"></i></button>
        </div>
        <hr />
        <form onSubmit={submitFormHandler}>
        <div className="mb-3">
            <label htmlFor="lastname" className="form-label">Patronyme : </label>
            <input type="text" required ref={lastnameRef} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">Prénom : </label>
            <input type="text" required ref={firstnameRef} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="birthdate" className="form-label">Date de naissance : </label>
            <input type="date" required ref={birthdateRef} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email : </label>
            <input type="text" required ref={emailContactRef} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Téléphone : </label>
            <input type="text" required ref={phoneRef} className="form-control" />
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-outline-info me-2">Ajout</button>
          </div>
        </form>
    </ModalComponent>, document.getElementById("modal-root"))}
    <Header setModalVisible={setModalVisible} setModalConnect={setModalConnect} isLogged={isLogged} logOutHandler={logOutHandler}/>
    <Contacts setContactModalVisible={setContactModalVisible} isLogged={isLogged}/>
    </>
  );
}

export default App;
