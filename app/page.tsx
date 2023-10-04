'use client';
import Image from 'next/image'


export default function Home() {

  function handleClick(type: string){
    alert(type);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="grid bg-slate-400 p-20  w-auto">
        <div>
          <button onClick={()=>handleClick('menu')} className='p-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg'>Menu</button>
          <button className='p-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg'>Meja</button>
          <button className='p-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg'>Pesanan Aktif</button>
          <button className='p-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg'>Cetak Nota</button>
        </div>
        <div>
          
        </div>
      </div>
    </main>
  )
}
