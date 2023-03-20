import pencil from './assets/pencil.svg';

export default function ClientData() {
  return (
    <div className='bg-white mr-12 mb-6 rounded-4xl py-6 px-7 '>
      <div className='flex justify-between mb-6'>
        <h2 className='font-mont font-bold text-[18px]'>Dados do cliente</h2>
        <button className='flex text-[#0E8750] items-center border-[#DEDEE9] bg-[#F8F8F9] rounded-xl px-[60px] py-1'>
          <img
            src={pencil}
            alt=''
          />
          <span>Editar Cliente</span>
        </button>
      </div>
      <div className='flex w-1/2 justify-between mb-14'>
        <div>
          <p className='mb-2 font-bold'>E-mail*</p>
          <span>sarasilva@gmail.com</span>
        </div>
        <div>
          <p className='mb-2 font-bold'>Telefone*</p>
          <span>71 9 9462 8654</span>
        </div>
        <div>
          <p className='mb-2 font-bold'>CPF*</p>
          <span>054 365 255 87</span>
        </div>
      </div>
      <div className='flex w-full justify-between'>
        <div>
          <p className='mb-2 font-bold'>Endereço*</p>
          <span>Rua das Cornélias; nº 512</span>
        </div>
        <div>
          <p className='mb-2 font-bold'>Bairro</p>
          <span>Oliveiras</span>
        </div>
        <div>
          <p className='mb-2 font-bold'>Complemento</p>
          <span>Ap: 502</span>
        </div>
        <div>
          <p className='mb-2 font-bold'>CEP</p>
          <span>031 654 524 04</span>
        </div>
        <div>
          <p className='mb-2 font-bold'>Cidade</p>
          <span>Salvador</span>
        </div>
        <div>
          <p className='mb-2 font-bold'>UF</p>
          <span>BA</span>
        </div>
      </div>
    </div>
  );
}
