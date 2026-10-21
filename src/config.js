/* ==================================================================
   CONFIGURAÇÕES DO SITE: é aqui que vocês trocam e-mail, WhatsApp,
   redes e dados da empresa. Depois é só fazer commit: o GitHub
   publica sozinho.
   ================================================================== */

export const CONTACT = {
  // E-mail mostrado na página e usado como alternativa ao formulário.
  email: 'contato@esptech.com.br',

  // Endereço que recebe o formulário. Com FormSubmit (grátis, sem cadastro):
  //   'https://formsubmit.co/ajax/SEU_EMAIL@dominio.com'
  // Deixe '' para o botão abrir o app de e-mail do visitante com a mensagem pronta.
  formEndpoint: '',

  // Número exibido. Deixe '' para esconder a linha do WhatsApp.
  whatsapp: '+55 (00) 00000-0000',
  // Link de conversa: https://wa.me/55DDDNUMERO (só números). Deixe '' para mostrar só o texto.
  whatsappUrl: '',
};

// Redes no rodapé. Itens com url vazia não aparecem.
export const SOCIAL = [
  { label: 'LinkedIn', url: '' },
  { label: 'GitHub', url: '' },
  { label: 'Instagram', url: '' },
];

export const COMPANY = {
  cnpj: '',                       // ex.: '00.000.000/0001-00' (vazio = não aparece)
  city: 'Pelotas, RS · Brasil',
};
