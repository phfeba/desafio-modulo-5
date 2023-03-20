import { useState, useEffect } from "react";

import Resume from "./components/Resume";
import Clients from "./components/Clients";
import Charges from "./components/Charges";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ModalUser from "../../components/ModalUser/index";
import Spinner from "../../components/Spinner";
import useSingUpContext from "../../hooks/useSingUpContext";
import { useNavigate, useParams } from "react-router-dom";
import ClientsDetail from "./components/ClientsDetail";

export default function MainApp() {
  const [mainApp, setMainApp] = useState("Home");
  const [modalEdit, setModalEdit] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { getResume, resume } = useSingUpContext();

  const navigate = useNavigate();
  const params = useParams();

  function switchMainApp(newMainApp) {
    setMainApp(newMainApp);
  }

  async function getData() {
    const response = await getResume();
    if (!response) navigate("/");
  }

  useEffect(() => {
    try {
      setDataLoaded(false);

      getData();

      setTimeout(() => {
        setDataLoaded(true);
      }, 2000);
    } catch (err) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (params.rout === "clients") {
      setMainApp("Clients");
    }

    if (params.rout === "home") {
      setMainApp("Home");
    }

    if (params.rout === "charges") {
      setMainApp("Charges");
    }
  }, []);

  return (
    <>
      {!dataLoaded ? (
        <div className="flex w-screen h-screen justify-center items-center -z-50 max-md:relative">
          <Spinner loading={!dataLoaded} />
        </div>
      ) : (
        <>
          {resume && (
            <div className="min-w-full min-h-full flex max-md:flex-col  bg-baseLight absolute -z-50">
              <aside className="w-[7%] min-w-fit h-screen max-md:w-full max-md:hidden z-20">
                <Sidebar switchMainApp={switchMainApp} mainApp={mainApp} />
              </aside>
              <div className="w-full h-full flex flex-col z-50">
                <nav className="h-[11%] w-full mb-4 max-md:fixed max-md:top-0 max-md:h-[8%] max-md:bg-baseLight z-20">
                  <TopBar modal={setModalEdit} main={mainApp} />
                </nav>
                <div className="hidden max-md:flex h-[10%]  max-md:fixed max-md:w-full max-md:bottom-0 z-20">
                  <Sidebar switchMainApp={switchMainApp} mainApp={mainApp} />
                </div>
                <main className=" w-full ">
                  {mainApp === "Home" && <Resume resume={resume} />}
                  {mainApp === "Clients" && <Clients />}
                  {mainApp === "Charges" && <Charges />}
                </main>
                {modalEdit && <ModalUser modal={setModalEdit} />}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
