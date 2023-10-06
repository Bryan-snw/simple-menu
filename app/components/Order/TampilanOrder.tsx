import React, { useState, useEffect } from 'react'

interface Menu {
  id: number,
  nama: string,
  harga: number
}

const TampilanOrder = () => {

  const [orderId, setOrderId] = useState(0);
  const [jumlah, setJumlah] = useState(0);
  const [menuId, setMenuId] = useState(0);
  
  const menuList:Menu[] = JSON.parse(localStorage.getItem('MENU') || '[]');
  const [orderList, setOrderList] = useState(JSON.parse(localStorage.getItem('ORDER') || '[]'));


  useEffect(() => {

    const storedOrder = JSON.parse(localStorage.getItem('ORDER') || 'null');

        // if there is no local Storage
        if (!storedOrder) {
          // Set Local Storange
          localStorage.setItem('ORDER', JSON.stringify([]));
          setOrderList([]);
        } else {
          setOrderList(storedOrder);
        }

  }, [])
  

  function handleOrder(e:React.FormEvent, id:number){
    e.preventDefault();
    setOrderId(id);
    
  }

  function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    
    const updatedData =  [...orderList];

    const data = {
      id: Math.floor(100000 + Math.random() * 900000),
      menuId: menuId,
      mejaId: orderId,
      jumlah: jumlah
    }

    updatedData.push(data);
    setOrderList(updatedData);
    localStorage.setItem('ORDER', JSON.stringify(updatedData));

    setOrderId(0);
    setMenuId(0);
    setJumlah(0);
  }

  return (
    <div className="h-96 p-5 mt-4 bg-slate-200 rounded-md">
      <div className="grid grid-cols-3  rounded-md">
        <button onClick={(e)=>handleOrder(e, 1)} className={`${orderId === 1 ? 'bg-slate-50 font-semibold': 'text-slate-500'} py-4 rounded-s-md`}>Meja 1</button>
        <button onClick={(e)=>handleOrder(e, 2)} className={`${orderId === 2 ? 'bg-slate-50 font-semibold': 'text-slate-500'} py-4 `}>Meja 2</button>
        <button onClick={(e)=>handleOrder(e, 3)} className={`${orderId === 3 ? 'bg-slate-50 font-semibold': 'text-slate-500'} py-4 rounded-e-md`}>Meja 3</button>
      </div>
      
      <form  onSubmit={(e)=>handleSubmit(e)}>
        <div className="flex gap-3 mt-4">
          <div className="w-3/4">
            <label className="">Menu</label>
            <select value={menuId} className="w-full p-2 mt-1 rounded-md" onChange={(e)=>setMenuId(parseInt(e.target.value))}>
              <option value="0">Pilih Makanan</option>
              {menuList.map((menu, index)=>{
                return(
                  <option key={index} value={menu.id}>{menu.nama}</option>
                )
              })}
            </select>
          </div>
          <div className='w-1/4'>
            <label className="">Jumlah</label> 
            <select value={jumlah} className="w-full p-2 mt-1 rounded-md" onChange={(e)=>setJumlah(parseInt(e.target.value))}>
              <option value="0" >Kuantitas</option>
              <option value="1" >1</option>
              <option value="2" >2</option>
              <option value="3" >3</option>
              <option value="4" >4</option>
            </select>
          </div>
        </div>
        <div className='mt-2 float-right w-1/5'>
          {orderId === 0 || menuId === 0 || jumlah === 0? 
            <button disabled className="mt-1 w-full bg-slate-600 py-2 text-white font-semibold rounded-xl">Order</button>
          : 
            <button type='submit' className="mt-1 w-full bg-blue-600 hover:bg-blue-700 py-2 text-white font-semibold rounded-xl">Order</button> } 
        </div>
      </form>

    </div>
  )
}

export default TampilanOrder