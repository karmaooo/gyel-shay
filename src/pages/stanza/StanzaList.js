import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import StanzaDataService from "./services/stanza.service";
import "./stanzaList.css";
const StanzasList = ({ getStanzaId }) => {
  const [stanzas, setStanzas] = useState([]);
  useEffect(() => {
    getStanzas();
  }, []);

  const getStanzas = async () => {
    const data = await StanzaDataService.getAllStanzas();
    console.log(data.docs);
    setStanzas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await StanzaDataService.deleteStanza(id);
    getStanzas();
  };
  return (
    <>
      <div className="stanzaList">
        <button className="refresh" onClick={getStanzas}>
          Refresh List
        </button>
      </div>
      <div className="table">
        {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Verse </th>
              <th>Explanation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stanzas.map((doc, index) => {
              return (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>{doc.title}</td>
                  <td>{doc.verse}</td>
                  <td>{doc.explanation}</td>
                  <td>
                    <div>
                      <button
                        className="editb"
                        onClick={(e) => getStanzaId(doc.id)}
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button
                        className="deleteb"
                        onClick={(e) => deleteHandler(doc.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StanzasList;
