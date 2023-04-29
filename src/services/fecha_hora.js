export function getHora() {
    const date = new Date();
    const padL = (nr, len = 2, chr = '0') => `${nr}`.padStart(len, chr);

    let fecha_hora = `${padL(date.getMonth() + 1)}-${padL(date.getDate())}-${date.getFullYear()} ${padL(date.getHours())}:${padL(date.getMinutes())}:${padL(date.getSeconds())}`;

    console.log(typeof(fecha_hora))
    console.log(fecha_hora)

    return fecha_hora
}