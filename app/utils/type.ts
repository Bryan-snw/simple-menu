export interface Order {
    id: number;
    menuId: number;
    mejaId: number;
    jumlah: number;
}
  
export interface Menu {
    id: number;
    nama: string;
    harga: number;
}