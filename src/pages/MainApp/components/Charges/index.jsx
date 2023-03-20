import { useEffect, useState } from "react";

import filters from "./assets/filters.svg";
import { VscFile } from "react-icons/vsc";
import Input from "../../../../components/Input";
import ChargesTable from "./components/ChargesTable";

import Spinner from "../../../../components/Spinner";

import useSingUpContext from "../../../../hooks/useSingUpContext";

export default function Charges() {
  const { getCharges } = useSingUpContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);

    getCharges();

    setTimeout(() => {
      setLoading(true);
    }, 500);
  }, []);

  return (
    <div className="ml-24 max-lg:mx-12 max-md:mx-0 max-md:mt-24 h-full bg-baseLight">
      <div className="mr-14 flex items-center justify-between max-lg:flex-col max-lg:gap-4 max-lg:items-start max-md:items-center max-md:mr-0">
        <div className="flex items-center gap-3 text-gray-700">
          <VscFile className="text-3xl" />
          <h2 className="text-2xl font-mont font-semibold w-">Cobranças</h2>
        </div>
        <div className="flex items-center gap-6 max-md:flex-col">
          <div className="flex gap-4 max-md:justify-between  w-[420px] max-md:w-80 max-md:gap-2">
            <img className="cursor-pointer" src={filters} alt="Filtros" />
            <Input
              placeholder="Pesquisa"
              type="search"
              size="w-full"
              noMargins
              shadow
            />
          </div>
        </div>
      </div>
      {!loading ? (
        <div className="flex h-[60vh]  items-center justify-center">
          <Spinner loading={!loading} />
        </div>
      ) : (
        <ChargesTable />
      )}
    </div>
  );
}
