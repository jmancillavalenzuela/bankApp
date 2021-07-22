export const formatterCLP = (value: number) => (value > 0 ? `$ ${value}` : ' ');

export function formatRut(inRut: string): string {
  let rut = inRut;
  rut = rut.replace('.', '').replace('-', '');
  const module = rut.substr(rut.length - 1);
  rut = rut.slice(0, -1);
  rut = rut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  rut = rut + `-${module}`;
  return rut;
}
