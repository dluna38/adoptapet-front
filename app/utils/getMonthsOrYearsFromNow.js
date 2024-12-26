export default function getMonthsOrYearsFromNow(targetDate) {
    // Convertir la fecha de entrada en un objeto Date
    const target = new Date(targetDate);
    const today = new Date();
    const defaultMsg = "Desconocida";
    // Asegurarse de que la fecha de destino sea válida
    if (isNaN(target)) {
        //createError("La fecha proporcionada no es válida.");
        return defaultMsg;
    }

    if (target > today) {
       // throw new Error("La fecha de destino no puede ser mayor a la fecha actual.");
       return defaultMsg;
    }

    // Calcular la diferencia en años y meses
    const yearDifference = today.getFullYear() - target.getFullYear();

    if (yearDifference >= 1) {
        return yearDifference + (yearDifference === 1 ? " año" : " años");
    }

    const monthDifference = today.getMonth() - target.getMonth();

    return monthDifference + " meses";
    // Calcular la diferencia total en meses
    let totalMonths = (yearDifference * 12 + monthDifference) - 1;

    // Calcular los años y meses en base al total de meses
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    return {
        totalMonths: Math.max(0, totalMonths), // Evitar valores negativos
        years: Math.max(0, years),
        months: Math.max(0, months)
    };
}

