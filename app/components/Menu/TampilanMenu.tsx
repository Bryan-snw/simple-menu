import React, { useEffect, useState } from 'react'


const rupiah = (number: number) =>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

const TampilanMenu = () => {

    const [namaMakanan,setNamaMakanan] = useState("");
    const [hargaMakanan,setHargaMakanan] = useState(0);

    const [menuList, setMenuList] = useState([
        {
            id: 1,
            nama: "Nasi Goreng",
            harga: 20000
        },
        {
            id: 2,
            nama: "Mie Goreng",
            harga: 22000
        },
        {
            id: 3,
            nama: "Ayam Goreng",
            harga: 15000
        },
    ]);

    function handleDelete() {
        
    }
    

    function handleAddMenu(e: any){
        e.preventDefault();

        if (namaMakanan === "") {
            alert("Data Masih Kosong");
        } else {

            const updatedData = [...menuList];

            const data = {
                id: menuList.length+1,
                nama: namaMakanan,
                harga: hargaMakanan
            }

            updatedData.push(data);

            setMenuList(updatedData);
            setHargaMakanan(0);
            setNamaMakanan("")
        }

    }

  return (
    <>
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
                {menuList.map(menu => 
                    <tr key={menu.id}>
                        <td>{menu.id}</td>
                        <td>{menu.nama}</td>
                        <td>{rupiah(menu.harga)}</td>
                        <td><span className="cursor-pointer"onClick={handleDelete}>Hapus</span></td>
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
            <button type='submit' className="mt-1 w-full bg-green-500 hover:bg-green-600 py-2 text-white font-semibold rounded-xl">Tambah Menu</button>
        </form>
    </>
  )
}

export default TampilanMenu