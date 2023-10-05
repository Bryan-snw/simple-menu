import React, { useState, useEffect } from 'react'

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
  
const TampilanMenu = (props:any) => {

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
    
    const [namaMakanan,setNamaMakanan] = useState("");
    const [hargaMakanan,setHargaMakanan] = useState(0);  
    const [menuList, setMenuList] = useState<Menu[]>(JSON.parse(localStorage.getItem('MENU') || '[]'));  

    useEffect(() => {

      if (props.reset) {
        // Clear Local Storange
        localStorage.clear();
        // Set Reset back to false
        props.setReset(false);

        // Get Item from local Storage
        const storedMenu = JSON.parse(localStorage.getItem('MENU') || 'null');

        // if there is no local Storage
        if (!storedMenu) {
          // Set Local Storange
          localStorage.setItem('MENU', JSON.stringify(defaultMenu));
          setMenuList(defaultMenu);
        } else {
          setMenuList(storedMenu);
        }
        
      }
    }, [props.reset]);
    
    useEffect(() => {
      localStorage.setItem('MENU', JSON.stringify(menuList));
    }, [menuList])
    
   
    function handleAddMenu(e:React.FormEvent) {
      e.preventDefault();

      if (!namaMakanan) {
        alert("Data Masih Kosong");
      } else {
        const updatedData = [...menuList];

        const data = {
          id: Math.floor(100000 + Math.random() * 900000),
          nama: namaMakanan,
          harga: hargaMakanan
        }
        updatedData.push(data)
        
        setMenuList(updatedData);
        setHargaMakanan(0);
        setNamaMakanan("");
      }
    }

    function handleDelete(e:React.FormEvent, id:number) {
      e.preventDefault();
      const updatedData = [...menuList];

      updatedData.splice(id, 1);
      
      
      setMenuList(updatedData);
        
    }
      

  return (
    <div className="p-5 mt-4 bg-slate-200 rounded-md">
        <table className="w-full">
            <thead>
            <tr>
                    <th className="text-start">ID</th>
                    <th className="text-start">Nama</th>
                    <th className="text-start">Harga</th>
                    <th className="text-start">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {menuList.map((menu, index) => 
                    <tr key={menu.id}>
                        <td>{menu.id}</td>
                        <td>{menu.nama}</td>
                        <td>{rupiah(menu.harga)}</td>
                        <td><span className="cursor-pointer text-sm bg-red-600 hover:bg-red-700 px-2 text-white rounded-md"onClick={(e)=>handleDelete(e,index)}>Hapus</span></td>
                    </tr>
                )}
            </tbody>
        </table>
        <hr className='my-4 h-px bg-gray-200 border-2 rounded-xl' />
        <form className="grid gap-3" onSubmit={handleAddMenu}>
            <div>
                <label htmlFor="namaMakanan" className="font-semibold">Nama Makanan</label>
                <input className="w-full rounded-md p-2 mt-1" 
                    type="text" 
                    placeholder="Nama Makanan"
                    id='namaMakanan'
                    name='namaMakanan'
                    value={namaMakanan}
                    required
                    onChange={(e)=>setNamaMakanan(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="hargaMakanan" className="font-semibold">Harga Makanan</label>
                <input className="w-full rounded-md p-2 mt-1" 
                    type="number" 
                    placeholder="10000"
                    id='hargaMakanan'
                    name='hargaMakanan'
                    value={hargaMakanan}
                    onChange={(e)=>setHargaMakanan(parseInt(e.target.value))}
                />
            </div>
            <button type='submit' className="mt-1 w-full bg-green-600 hover:bg-green-700 py-2 text-white font-semibold rounded-xl">Tambah Menu</button>
        </form>
    </div>
  )
}

export default TampilanMenu