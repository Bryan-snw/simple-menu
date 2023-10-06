'use client';
import TampilanMenu from './components/Menu/TampilanMenu';
import TampilanOrder from './components/Order/TampilanOrder';
import TampilanKasir from './components/Kasir/TampilanKasir';
import TampilanDapur from './components/Dapur/TampilanDapur';
import { useState, useEffect } from 'react';


interface Menu {
  id: number,
  nama: string,
  harga: number
}


export default function Home() {

  // Default Menu
  const defaultMenu:Menu[] = [
        {
            id: 283131,
            nama: "Nasi Goreng",
            harga: 20000
        },
        {
            id: 982132,
            nama: "Mie Goreng",
            harga: 22000
        },
        {
            id: 271822,
            nama: "Ayam Goreng",
            harga: 15000
        },
  ]  

  const [type, setType] =  useState(() => sessionStorage.getItem('lastType') || 'kasir');
  const [reset, setReset] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('lastType', type);
  }, [type]);

  function renderView(){
    switch (type) {
      case 'menu':
        return <TampilanMenu 
          reset={reset}
          setReset={setReset}
        />;
      case 'order':
        return <TampilanOrder />
      case 'dapur':
        return <TampilanDapur 
          reset={reset}
          setReset={setReset}
        />
      case 'kasir':
        return <TampilanKasir 
          reset={reset}
          setReset={setReset}
        />
    }
  }

  function changeView(type: string){
    
    setType(type);
  }

  function handleReset(e:React.FormEvent){
    e.preventDefault();
    console.log("Reset From Home");
    localStorage.clear();
    localStorage.setItem('MENU', JSON.stringify(defaultMenu));
    localStorage.setItem('ORDER', JSON.stringify([]));

    setReset(true);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-semibold">Sistem Menu</h1>
      <div className="grid grid-cols-6 mt-4">

        <div className="col-span-4 grid grid-cols-4 bg-slate-200 rounded-md p-1">
          <button onClick={()=>changeView('menu')} className={`${type === 'menu' ? 'bg-slate-50' : 'text-slate-500'} py-1 rounded-md`}>Menu</button>
          <button onClick={()=>changeView('order')} className={`${type === 'order' ? 'bg-slate-50' : 'text-slate-500'} py-1 rounded-md`}>Order</button>
          <button onClick={()=>changeView('dapur')} className={`${type === 'dapur' ? 'bg-slate-50' : 'text-slate-500'} py-1 rounded-md`}>Dapur</button>
          <button onClick={()=>changeView('kasir')} className={`${type === 'kasir' ? 'bg-slate-50' : 'text-slate-500'} py-1 rounded-md`}>Kasir</button>
        </div>

        <div className="col-span-2 grid grid-cols-2">
          <span></span>
          <button onClick={(e)=>handleReset(e)} className='py-1 hover:bg-slate-200 border-solid border border-slate-200 rounded-md'>Reset</button>
        </div>

      </div>

        {/* <div className=" h-96 p-5 mt-4 bg-slate-200 rounded-md"> */}
          {renderView()}
        {/* </div> */}
    </main>
  )
}
