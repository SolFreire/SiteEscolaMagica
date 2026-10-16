// Converte texto simples em HTML seguro: *trecho* vira <em>trecho</em> e <br/> vira quebra de linha.
export function rich(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&lt;br\/&gt;/g, '<br/>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
