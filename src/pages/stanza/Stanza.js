import { useState } from "react";
import AddStanza from "./AddStanza";
import StanzasList from "./StanzaList";
import "./addStanza.css";
import "./stanzaList.css";

function Stanza() {
  const [stanzaId, setStanzaId] = useState("");

  const getStanzaIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setStanzaId(id);
  };
  return (
    <>
      <div >
        <AddStanza id={stanzaId} setStanzaId={setStanzaId} />
      </div>

      <div>
        <StanzasList getStanzaId={getStanzaIdHandler} />
      </div>
    </>
  );
}

export default Stanza;
