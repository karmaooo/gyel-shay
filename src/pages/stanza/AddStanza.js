import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import StanzaDataService from "./services/stanza.service";
import "./addStanza.css";
import { Timestamp } from "firebase/firestore";
const AddStanza = ({ id, setStanzaId }) => {
  const [title, setTitle] = useState("");
  const [verse, setVerse] = useState("");
  const [explanation, setExplanaion] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || verse === "" || explanation === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newStanza = {
      title,
      verse,
      explanation,
      createdAt: Timestamp.now().toDate(),
    };
    console.log(newStanza);

    try {
      if (id !== undefined && id !== "") {
        await StanzaDataService.updateStanza(id, newStanza);
        setStanzaId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await StanzaDataService.addStanzas(newStanza);
        setMessage({ error: false, msg: "New topic added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setVerse("");
    setExplanaion("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await StanzaDataService.getStanza(id);
      console.log("the record is :", docSnap.data());
      setTitle(docSnap.data().title);
      setVerse(docSnap.data().verse);
      setExplanaion(docSnap.data().explanation);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="container">
        <h3>Add Stanza</h3>

        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Verse "
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
            />

            <textarea
              type="text"
              placeholder="explanation "
              value={explanation}
              onChange={(e) => setExplanaion(e.target.value)}
            />
            <button className="add" type="Submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStanza;
