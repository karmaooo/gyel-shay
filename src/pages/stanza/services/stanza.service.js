import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const stanzaCollectionRef = collection(db, "stanzas");
class StanzaDataService {
  addStanzas = (newStanza) => {
    return addDoc(stanzaCollectionRef, newStanza);
  };

  updateStanza = (id, updatedStanza) => {
    const stanzaDoc = doc(db, "stanzas", id);
    return updateDoc(stanzaDoc, updatedStanza);
  };

  deleteStanza = (id) => {
    const stanzaDoc = doc(db, "stanzas", id);
    return deleteDoc(stanzaDoc);
  };

  getAllStanzas = () => {
    return getDocs(stanzaCollectionRef);
  };

  getStanza = (id) => {
    const stanzaDoc = doc(db, "stanzas", id);
    return getDoc(stanzaDoc);
  };
}

export default new StanzaDataService();
