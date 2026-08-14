//arquivo totalmente vibecodado por se tratar de uma função não importante, apenas de formatação de inputs

function formatCurrencyInput(value: number | string): string {
  // Aceita apenas dígitos (remove tudo que não for número)
  const digits = String(value).replace(/\D/g, '');

  if (!digits) return '0,00';

  // Garante pelo menos 3 dígitos (ex: "5" -> "005" = 0,05)
  const padded = digits.padStart(3, '0');

  const cents = padded.slice(-2);
  const integerPart = padded.slice(0, -2).replace(/^0+(?=\d)/, ''); // remove zeros à esquerda

  // Adiciona separador de milhar
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formattedInteger},${cents}`;
}

export default formatCurrencyInput