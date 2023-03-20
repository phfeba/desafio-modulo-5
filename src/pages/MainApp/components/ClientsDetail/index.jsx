import { SlPeople } from 'react-icons/sl';
import PinkButton from '../../../../components/PinkButton';
import ClientsTable from './components/ClientsTable';
import { useEffect, useState } from 'react';
import useSingUpContext from '../../../../hooks/useSingUpContext';
import ModalClients from '../../../../components/ModalClients';
import ClientData from './components/ClientData';

export default function ClientsDetail() {
  const { getClients, clients } = useSingUpContext();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getClients();
  }, []);

  function handleShowModal() {
    setShowModal(!showModal);
  }

  return (
    <div className='ml-24 max-lg:mx-12 max-md:mx-0 max-md:mt-24 h-full max-md:pb-36 font-nuni'>
      <div className='mr-14 mb-6 flex items-center justify-between max-lg:flex-col max-lg:gap-4 max-lg:items-start max-md:items-center max-md:mr-0'>
        <div className='flex items-center gap-3 text-gray-700'>
          <SlPeople className='text-3xl' />
          <h2 className='text-2xl font-mont font-semibold w-'>
            Sara Lage Silva
          </h2>
        </div>
        <div className='flex items-center gap-6 max-md:flex-col'>
          <div className='flex gap-4 max-md:justify-between max-md:w-80 max-md:gap-0'>
            <PinkButton
              label='+ Nova Cobrança'
              large
              noMargins
              onClick={handleShowModal}
            />
          </div>
        </div>
      </div>
      <ClientData />
      {clients && <ClientsTable db={clients} />}
      <>{showModal && <ModalClients modal={setShowModal} />}</>
    </div>
  );
}
