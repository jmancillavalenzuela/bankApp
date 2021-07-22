export const formatterCLP = (value: number) => (value > 0 ? `$ ${value}` : ' ');
/* 
export const formatRut = (inRut: string) => {
  console.log(inRut);
  let rut = inRut;
  rut = rut.replace('.', '').replace('-', '');
  const module = rut.substr(rut.length - 1);
  rut = rut.slice(0, -1);
  rut = rut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  rut = rut + `-${module}`;
  return rut;
}; */

export function formatRut(inRut: string): string {
  console.log(inRut);
  let rut = inRut;
  rut = rut.replace('.', '').replace('-', '');
  const module = rut.substr(rut.length - 1);
  rut = rut.slice(0, -1);
  rut = rut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  rut = rut + `-${module}`;
  return rut;
}
