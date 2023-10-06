import React, { useEffect, useState } from 'react'
import { Order, Menu } from '@/app/utils/type'

const TampilanDapur = (props:any) => {

  const {reset, setReset} = props;

  const [menuList, setMenuList] = useState<Menu[]>(JSON.parse(localStorage.getItem('MENU') || "[]")); 
  const [orderList, setOrderList] = useState<Order[]>(JSON.parse(localStorage.getItem('ORDER') || "[]")); 

  useEffect(() => {

    if (reset) {

      // Set Reset back to false
      setReset(false);

      // Get Item from local Storage
      setOrderList(JSON.parse(localStorage.getItem('ORDER')||"[]"));
      
    }
  }, [reset, setReset]);

  function renderMeja1(){
    const meja1 = []
    for (let index = 0; index < orderList.length; index++) {
      const order = orderList[index];
      if (order.mejaId ===1) {
        const menu = menuList.find(menu => menu.id === order.menuId);
        if (menu){
          meja1.push(<p key={index} className="text-slate-500 text-sm">{order.jumlah}x{" "}{menu.nama}</p>)
        }
      }
    }
    return <>{meja1}</>;
  }

  function renderMeja2(){
    const meja2 = []
    for (let index = 0; index < orderList.length; index++) {
      const order = orderList[index];
      if (order.mejaId ===2) {
        const menu = menuList.find(menu => menu.id === order.menuId);
        if (menu){
          meja2.push(<p key={index} className="text-slate-500 text-sm">{order.jumlah}x{" "}{menu.nama}</p>)
        }
      }
    }
    return <>{meja2}</>;
  }

  function renderMeja3(){
    const meja3 = []
    for (let index = 0; index < orderList.length; index++) {
      const order = orderList[index];
      if (order.mejaId ===3) {
        const menu = menuList.find(menu => menu.id === order.menuId);
        if (menu){
          meja3.push(<p key={index} className="text-slate-500 text-sm">{order.jumlah}x{" "}{menu.nama}</p>)
        }
      }
    }
    return <>{meja3}</>;
  }

  return (
    <div className=" h-96 p-5 mt-4 bg-slate-200 rounded-md">
      <div className="grid grid-cols-3">
        <div>
          <h1 className="text-xl font-semibold mb-2">Meja 1</h1>
          
          {renderMeja1()}
          
        </div>
        <div>
          <h1 className="text-xl font-semibold mb-2">Meja 2</h1>

          {renderMeja2()}

        </div>
        <div>
          <h1 className="text-xl font-semibold mb-2">Meja 3</h1>
          {renderMeja3()}
        </div>
      </div>
    </div>
  )
}

export default TampilanDapur