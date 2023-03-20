import warn from './warn.svg';

function handleCloseModal() {
  setShowModal(false);

  setTimeout(() => {
    modal(false);
  }, 800);
}

export default function DeleteModal() {
  return (
    <div className='w-full h-full  text-hardGray flex justify-center items-center bg-black bg-opacity-40 absolute font-nuni left-0 bottom-0 backdrop-blur-xs overflow-hidden z-20'>
      <div className='bg-white rounded-4xl w-[600px] flex flex-col items-center relative px-14 py-10'>
        <img
          className='w-[160px] h-[160px] mt-4'
          src={warn}
          alt=''
        />
        <span
          onClick={handleCloseModal}
          className='font-nuni text-4xl absolute top-4 right-5 cursor-pointer'
        >
          &times;
        </span>
        <p className='font-semibold text-[18px] text-[#CC7800] mb-7'>
          Tem certeza que deseja excluir esta cobrança?
        </p>
        <div className='flex flex-row gap-4 text-[18px]'>
          <button className='px-9 bg-[#F2D6D0] text-[#AE1100] rounded'>
            Não
          </button>
          <button className='px-9 bg-[#ACD9C5] text-[#034A2A] rounded'>
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}
