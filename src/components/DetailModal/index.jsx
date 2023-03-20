import { VscFile } from 'react-icons/vsc';

function handleCloseModal() {
  setShowModal(false);

  setTimeout(() => {
    modal(false);
  }, 800);
}
export default function DetailModal() {
  return (
    <div className='w-full h-full  text-hardGray flex justify-center items-center bg-black bg-opacity-40 absolute font-nuni left-0 bottom-0 backdrop-blur-xs overflow-hidden z-20'>
      <div className='bg-white rounded-4xl w-[600px] flex-col relative   px-14 py-10'>
        <div className='flex gap-6 items-baseline mb-4'>
          <VscFile className='w-[20px] h-[20px]' />
          <h1 className='font-mont text-2xl font-bold'>Detalhes da Cobrança</h1>
        </div>
        <span
          onClick={handleCloseModal}
          className='font-nuni text-4xl absolute top-4 right-5 cursor-pointer'
        >
          &times;
        </span>
        <p className='mb-2 font-bold'>Nome</p>
        <span>Sara Lage Silva</span>
        <p className='mt-6 mb-1 font-bold'>Descrição</p>
        <span>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
          explicabo exercitationem dolore temporibus nesciunt quaerat adipisci
          molestias voluptates eius, consequatur harum. Ut laboriosam
          perferendis veritatis a enim at quae quam?
        </span>
        <div className='flex gap-36 my-6'>
          <div className='flex flex-col gap-2'>
            <p className='font-bold'>Vencimento</p>
            <span>10/12/2021</span>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-bold'>Valor</p>
            <span>R$ 300,00</span>
          </div>
        </div>
        <div className='flex gap-36'>
          <div className='flex flex-col gap-2'>
            <p className='font-bold'>ID cobranças</p>
            <span>248563147</span>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-bold'>Status</p>
            <span>Vencida</span>
          </div>
        </div>
      </div>
    </div>
  );
}
