'use client';
import TampilanMenu from './components/Menu/TampilanMenu';
import TampilanOrder from './components/Order/TampilanOrder';
import TampilanKasir from './components/Kasir/TampilanKasir';
import TampilanDapur from './components/Dapur/TampilanDapur';
import { useState, useEffect } from 'react';
import { Menu,Order } from './utils/type';


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
  ];  

  const [isPrint, setIsPrint] = useState(false);
  const [nomorMeja, setNomorMeja] = useState(0); 
  const [reset, setReset] = useState(false);
  const [type, setType] =  useState('menu');
  const [menuList, setMenuList] = useState<Menu[]>(defaultMenu);  
  const [orderList, setOrderList] = useState<Order[]>([]);

  
  useEffect(()=>{
    
    // Handle MenuList
    const dataMenu = localStorage.getItem('MENU');
    
    if (dataMenu) {
      setMenuList(JSON.parse(dataMenu));
    }

    // Handle OrderList
    const dataOrder = localStorage.getItem('ORDER');
    
    if (dataOrder) {
      setOrderList(JSON.parse(dataOrder));
    }

    // Handle type Dynamic Render Component
    const dataType = sessionStorage.getItem('TYPE');
    
    if (dataType) {
      setType(dataType);
    }
  },[])

  useEffect(()=>{
 
    setTimeout(() => {
      localStorage.setItem('MENU', JSON.stringify(menuList));
    }, 0);

  },[menuList])

  useEffect(()=>{
   
    setTimeout(() => {
      localStorage.setItem('ORDER', JSON.stringify(orderList));
    }, 0);

  },[orderList])

  useEffect(()=>{
    
    setTimeout(() => {
      sessionStorage.setItem('TYPE', type);
    }, 0);

  },[type])

  useEffect(()=>{
    setReset(false);
  },[reset])
  
  function renderView(){
    switch (type) {
      case 'menu':
        return <TampilanMenu 
          menuList={menuList}
          setMenuList={setMenuList}
        />;
      case 'order':
        return <TampilanOrder
        menuList={menuList}
        orderList={orderList}
        setOrderList={setOrderList}
        />
      case 'dapur':
        return <TampilanDapur 
          menuList={menuList}
          orderList={orderList} 
        />
      case 'kasir':
        return <TampilanKasir
          isPrint={isPrint}
          nomorMeja={nomorMeja} 
          menuList={menuList}
          orderList={orderList}
          setIsPrint={setIsPrint}
          setNomorMeja={setNomorMeja}
          setOrderList={setOrderList}
        />
    }
  }

  function changeView(type: string){  
    setType(type);
  }

  function handleReset(e:React.FormEvent){
    e.preventDefault();
   
    localStorage.clear();
    setMenuList(defaultMenu);
    setOrderList([]);
    setReset(true);
    setNomorMeja(0);
    setIsPrint(false);
  }

  return (
    <main className="p-8 lg:w-2/4">
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

      {renderView()}
        
    </main>
  )
}

