import { useState, createContext, useMemo } from "react";
import axios from "./../services/api";
import { getToken } from "../services/storage";

export const SingUpContext = createContext(null);

export default function SingUpProvider(props) {
  const [resume, setResume] = useState({});
  const [loggedUser, setLoggedUser] = useState({});
  const [charges, setCharges] = useState([]);
  const [clients, setClients] = useState([]);

  async function getResume() {
    try {
      const response = await axios.get("/resumo", getToken());

      if (response.status !== 200) return false;

      setResume(response.data);

      console.log(response.data);

      return true;
    } catch (err) {}
  }

  async function getCharges() {
    try {
      const response = await axios.get("/cobranca", getToken());
      console.log(response.data);

      if (response.status !== 200) return false;

      setCharges(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getUser() {
    try {
      const response = await axios.get("/usuario", getToken());

      if (response.status !== 200) return false;

      setLoggedUser(() => response.data);

      console.log(response.data);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function getClients(filter) {
    let response;

    try {
      if (!filter) {
        response = await axios.get("/cliente", getToken());
      } else {
        response = await axios.get("/cliente", {
          params: { status: filter },
          headers: getToken().headers,
        });
      }

      if (response.status !== 200) return false;

      setClients(() => response.data);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function updateUser(data) {
    let response;
    try {
      response = await axios.put("/usuario", data, getToken());

      if (response.status === 204) return "ok";
    } catch (err) {
      console.log(err);
      return err.response.data.mensagem;
    }
  }

  async function createClient(data) {
    let response;

    try {
      response = await axios.post("/cliente", data, getToken());
      getResume();
      if (response.status === 204) return "ok";
    } catch (err) {
      console.log(err);
      return err.response.data.mensagem;
    }
  }

  async function createCharge(data) {
    let response;

    try {
      response = await axios.post("/cobranca", data, getToken());

      getResume();
      if (response.status === 204) return "ok";
    } catch (err) {
      console.log(err);
      return err.response.data.mensagem;
    }
  }

  function detailCharge(id) {
    let response;

    try {
      response = axios.get(`/cobranca/${id}`, getToken());

      console.log(response.data);

      if (response.status === 204) return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data.mensagem;
    }
  }

  const contextValue = useMemo(
    () => ({
      resume,
      clients,
      getResume,
      loggedUser,
      getCharges,
      charges,
      getUser,
      getClients,
      updateUser,
      createClient,
      createCharge,
    }),
    [
      resume,
      clients,
      getResume,
      loggedUser,
      getCharges,
      charges,
      getUser,
      getClients,
      updateUser,
      createClient,
      createCharge,
    ]
  );

  return (
    <SingUpContext.Provider value={contextValue}>
      {props.children}
    </SingUpContext.Provider>
  );
}
