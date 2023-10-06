import React, { useState, useEffect } from 'react'

interface Order {
  id: number,
  menuId: number,
  mejaId: number,
  jumlah: number
}

interface Menu {
  id: number,
  nama: string,
  harga: number
}

const rupiah = (number: number) =>{
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

function checkActiveTable(existOrders:any){
  let obj:any = {};

  for (let index = 0; index < existOrders.length; index++) {
    const order =existOrders[index]
    if (!obj[order.mejaId]) {
      obj[order.mejaId] = order.mejaId;
    }
  }

  return Object.keys(obj);
}

const TampilanKasir = (props:any) => {
  const {reset, setReset} = props;

  const [isPrint, setIsPrint] = useState(false);
  const [nomorMeja, setNomorMeja] = useState(0);
  const [orderList, setOrderList] = useState<Order[]>(JSON.parse(localStorage.getItem('ORDER') || "[]")); 
  const [menuList, setMenuList] = useState<Menu[]>(JSON.parse(localStorage.getItem('MENU') || "[]")); 
  let totalHarga = 0;

  const activeTables = checkActiveTable(orderList);

  useEffect(() => {

    if (reset) {

      // Set Reset
      setReset(false);
      setNomorMeja(0);
      setIsPrint(false);

      // Get Item from local Storage
      setOrderList(JSON.parse(localStorage.getItem('ORDER')||"[]"));
      
    }
  }, [reset, setReset]);

  useEffect(() => {
    localStorage.setItem('ORDER', JSON.stringify(orderList));
  }, [orderList])

  function renderStruk(){
    let orders:any = [];
    totalHarga = 0;
    for (let index = 0; index < orderList.length; index++) {
      const order = orderList[index];
      if (order.mejaId === nomorMeja) {
        const menu = menuList.find(menu => menu.id === order.menuId);
        if (menu){
          totalHarga += menu.harga*order.jumlah;
          orders.push(<tr key={index}>
            <td>{order.jumlah}</td>
            <td>{menu.nama}</td>
            <td>{rupiah(menu.harga)}</td>
          </tr>)
        }
      }
    }
    return <>{orders}</>
  }

  function handleEmptyTable(e:React.FormEvent){
    e.preventDefault();

    const updatedData = [...orderList]

    for (let index = updatedData.length-1; index >= 0; index--) {
      const order = updatedData[index];

      if(order.mejaId === nomorMeja){
        updatedData.splice(index, 1);
      }
  
    }

    console.log("Updet Data ",updatedData);

    setOrderList(updatedData);
    
    setNomorMeja(0);
    setIsPrint(false);
  }

  function handlePrint(e:React.FormEvent){
    e.preventDefault();
    setIsPrint(true);
  }

  return (
    <div className=" h-96 p-5 mt-4 bg-slate-200 rounded-md">
      <label htmlFor="meja">Meja</label>

      <div className="grid grid-cols-4 mt-2">

        <form className="col-span-3 " onSubmit={handlePrint}>
          <select value={nomorMeja} id="meja" name="meja"className="w-2/4 p-2 rounded-md" onChange={(e)=>setNomorMeja(parseInt(e.target.value))}>
            <option value="0">Nomor Meja</option>
            {activeTables.map((table)=>{
              return (
                <option key={table} value={table}>{table}</option>
              )
            })}
          </select>
          {nomorMeja === 0 ? 
            (<button disabled className="ms-2 w-1/4 bg-slate-600  py-2 text-white font-semibold rounded-xl">Print</button>)
          : 
            (<button type='submit' className="ms-2 w-1/4 bg-blue-600 hover:bg-blue-700 py-2 text-white font-semibold rounded-xl">Print</button>)
          }
          
        </form>

        {nomorMeja === 0 ? 
          "" 
        : 
          (<button onClick={handleEmptyTable} className="bg-red-600 hover:bg-red-700 py-2 text-white font-semibold rounded-xl">Kosongkan</button>)
        }
        
      </div>

      {isPrint ?
         (<>     
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="text-start">Jumlah</th>
                <th className="text-start">Nama</th>
                <th className="text-start">Harga</th>
              </tr>
            </thead>
            <tbody>
              {renderStruk()}
            </tbody>
          </table>
          
          <div className='mt-2 pt-1  border-solid border border-t-slate-600'>
            <p className="font-semibold">Total Harga</p>
            <p className="font-semibold">{rupiah(totalHarga)}</p>
          </div>
         </>
       )
      :
        ""
      }

    </div>
  )
}

export default TampilanKasir