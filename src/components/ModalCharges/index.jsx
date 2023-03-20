import Input from "../Input";
import PinkButton from "../PinkButton";
import GrayButton from "../GrayButton";
import { useState, useEffect } from "react";
import { VscFile } from "react-icons/vsc";
import TextField from "./../TextField/index";
import CheckBoxGreen from "../CheckBoxGreen";
import { chargeSchema } from "../../schemas/validationSchema";
import useSingUpContext from "./../../hooks/useSingUpContext";
import { prepareChargeData } from "../../utils/prepareData";
import { toast } from "react-toastify";

export default function ModalCharges({ modal, client }) {
  const { createCharge } = useSingUpContext();

  const [showModal, setShowModal] = useState(false);
  const [charge, setCharge] = useState({
    client_id: "",
    name: "",
    description: "",
    status: "",
    value: "",
    due_date: "",
  });

  const [formErrors, setFormErrors] = useState({
    client_id: "",
    name: "",
    description: "",
    status: "",
    value: "",
    due_date: "",
  });

  const statusText = {
    pago: "Cobrança Paga",
    pendente: "Cobrança pendente",
    vencido: "Cobrança Vencida",
  };

  const modalClasses = `bg-white py-10 max-md:px-7 px-14 rounded-4xl w-[600px] flex-col text-center relative transform transition-transform duration-1000 ${
    showModal ? "" : "-translate-y-[120%]"
  }`;
  useEffect(() => {
    setShowModal(true);
    setCharge({ ...charge, client_id: client.id, name: client.name });
  }, []);

  function handleCloseModal() {
    setShowModal(false);

    setTimeout(() => {
      modal(false);
    }, 800);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setCharge((prevState) => ({ ...prevState, [name]: value }));
  }

  function clearErrors(event) {
    const { name } = event.target;
    setFormErrors((prevState) => ({ ...prevState, [name]: "" }));
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    console.log(charge);

    const validation = await validationForm();

    if (!validation) return;

    const dataParsed = prepareChargeData(charge);

    const response = await createCharge(dataParsed);

    if (response === "ok") {
      alert("ok");
      return;
    }

    toast.error(response, {
      position: "top-center",
      theme: "dark",
    });
  }

  async function validationForm() {
    try {
      const valid = await chargeSchema.validate(charge);
      if (valid) {
        return true;
      }
    } catch (err) {
      if (!err.errors) return;
      setFormErrors({
        ...formErrors,
        [err.path]: err.errors[0],
      });
    }
  }

  return (
    <div className="w-full h-full  text-hardGray flex justify-center items-center bg-black bg-opacity-40 absolute left-0 bottom-0 backdrop-blur-xs overflow-hidden z-20">
      <form className={modalClasses}>
        <div className="flex gap-6 items-baseline">
          <VscFile className="w-[20px] h-[20px]" />
          <h1 className="font-mont text-2xl font-bold mb-6">
            Cadastrar Cobrança
          </h1>
        </div>
        <span
          onClick={handleCloseModal}
          className="font-nuni text-4xl absolute top-4 right-5 cursor-pointer"
        >
          &times;
        </span>
        <div className="flex flex-col gap-4 font-nuni">
          <Input
            label="Nome*"
            placeholder="Digite seu nome"
            disabled
            name="name"
            value={charge.name}
            onChange={(event) => {
              handleInputChange(event);
              clearErrors(event);
            }}
            error={formErrors.name}
          />
          <TextField
            label="Descrição*"
            placeholder="Digite a descrição"
            rows={3}
            required
            value={charge.description}
            name="description"
            onChange={(event) => {
              handleInputChange(event);
              clearErrors(event);
            }}
            error={formErrors.description}
          />
          <div className="flex gap-6">
            <Input
              label="Vencimento:*"
              placeholder="Data de Vencimento"
              type="date"
              required
              name="due_date"
              value={charge.due_date}
              onChange={(event) => {
                handleInputChange(event);
                clearErrors(event);
              }}
              error={formErrors.due_date}
            />
            <Input
              label="Valor:*"
              placeholder="Digite o valor"
              type="number"
              required
              name="value"
              value={charge.value}
              onChange={(event) => {
                handleInputChange(event);
                clearErrors(event);
              }}
              error={formErrors.value}
            />
          </div>
          <div className="flex flex-col">
            <span className="self-start	font-bold text-sm font-nuni mb-1">
              Status*
            </span>
            <div className="mb-7">
              <Input
                name="status"
                value={statusText[charge.status] ?? ""}
                readOnly="readonly"
                required
                error={formErrors.status}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 bg-softGray h-12 items-center rounded-lg pl-4">
                <CheckBoxGreen
                  type="checkbox"
                  id="pago"
                  value="pago"
                  checked={charge.status === "pago"}
                  onChange={() => setCharge({ ...charge, status: "pago" })}
                />
                <label htmlFor="pago">Cobrança Paga</label>
              </div>
              <div className="flex gap-4 bg-softGray h-12 items-center rounded-lg pl-4">
                <CheckBoxGreen
                  type="checkbox"
                  id="pendente"
                  value="pendente"
                  checked={charge.status === "pendente"}
                  onChange={() => setCharge({ ...charge, status: "pendente" })}
                />

                <label htmlFor="pendente">Cobrança Pendente</label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-6 justify-center mt-4">
          <GrayButton large label="Cancelar" />
          <PinkButton large label="Aplicar" onClick={handleFormSubmit} />
        </div>
      </form>
    </div>
  );
}
