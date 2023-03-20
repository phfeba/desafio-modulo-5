export function formatDateNumeric(date) {
    return new Date(date).toLocaleDateString('pt-BR', { year: '2-digit', month: 'numeric', day: 'numeric'});
}