//la idea es indicar el formato de moneda correto con javascript 
export const FormatoMoneda = (value: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2, // Siempre mostrar al menos 2 decimales
    maximumFractionDigits: 2, // Evita que se muestren más de 3 decimales

  }).format(value); //que me formatee el valor que recibo, la idea es usarla donde tenemos que mostrar precios
}