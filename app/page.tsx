'use client';
import Image from 'next/image'
import TampilanMenu from './components/Menu/TampilanMenu';
import TampilanMeja from './components/Meja/TampilanMeja';
import TampilanNota from './components/Nota/TampilanNota';
import TampilanPesanan from './components/Pesanan/TampilanPesanan';
import { useState } from 'react';


export default function Home() {

  const [type, setType] = useState('menu');

  function renderView(){
    switch (type) {
      case 'menu':
        return <TampilanMenu />;
      case 'meja':
        return <TampilanMeja />
      case 'pesanan':
        return <TampilanPesanan />
      case 'nota':
        return <TampilanNota />
    }
  }

  function changeView(type: string){
    
    setType(type);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="grid bg-slate-200 w-full mx-auto lg:px-32 py-10 px-8 rounded-lg">
        <div className="flex gap-3 mb-3">
          <button onClick={()=>changeView('menu')} className='p-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg'>Menu</button>
          <button onClick={()=>changeView('meja')} className='p-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg'>Meja</button>
          <button onClick={()=>changeView('pesanan')} className='p-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg'>Pesanan Aktif</button>
          <button onClick={()=>changeView('nota')} className='p-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg'>Cetak Nota</button>
        </div>
        <div>
          {renderView()}
        </div>
      </div>
    </main>
  )
}
