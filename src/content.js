/* Conteúdo editável da página.
   Fotos ficam em public/fotos. Campos vazios ('') simplesmente não aparecem. */

export const MILESTONES = [
  { tag: '1º lugar', what: 'Hackathon de Saúde Senac/Unimed', note: 'Painel de leitos com IA', area: 'Saúde', win: true },
  { tag: 'Fundação', what: 'Nasce a ESPtech', note: 'Para validar o painel com a Unimed', area: 'Startup' },
  { tag: '3º lugar', what: 'Tech Business', note: 'Já como startup', area: 'Negócios', win: true },
  { tag: '1º lugar', what: 'Hackathon Solana × Cursor', area: 'Web3', win: true },
  { tag: '1º lugar', what: 'Hackathon universitário Superteam BR', area: 'Web3', win: true },
  { tag: 'Out 2026', what: 'The Garage', note: '2 semanas de imersão na comunidade Web3', area: 'Web3' },
  { tag: 'Agora', what: '3 projetos competindo no Colosseum', note: 'Desenvolvidos no The Garage', area: 'Web3' },
];

export const ORIGIN_PHOTOS = [
  { src: 'fotos/origem-1.jpg', alt: 'O time no palco do Hackathon de Saúde Senac/Unimed', caption: 'Hackathon de Saúde Senac/Unimed · Jun 2026', span: 'lg:col-span-7', ratio: 'aspect-[3/2]', pos: '50% 40%' },
  { src: 'fotos/origem-2.jpg', alt: 'Selfie do time comemorando a vitória', caption: 'A primeira vitória', span: 'lg:col-span-5 lg:mt-32', ratio: 'aspect-[4/5]', pos: '62% 50%' },
  { src: 'fotos/origem-3.jpg', alt: 'O time em frente à sede da Unimed', caption: 'Validação com a Unimed', span: 'lg:col-span-4 lg:col-start-2', ratio: 'aspect-[3/4]', pos: '50% 70%' },
  { src: 'fotos/origem-4.jpg', alt: 'Premiação no palco do Tech Business', caption: '3º lugar · Tech Business', span: 'lg:col-span-6 lg:col-start-7 lg:-mt-20', ratio: 'aspect-[3/2]', pos: '50% 50%' },
  { src: 'fotos/origem-5.jpg', alt: 'Pitch do Painel Inteligente de Hotelaria no telão', caption: 'Pitch · Painel Inteligente de Hotelaria', span: 'lg:col-span-7', ratio: 'aspect-[16/9]', pos: '50% 50%' },
  { src: 'fotos/origem-6.jpg', alt: 'Parte do time com o troféu do hackathon Web3', caption: 'Hackathon Solana × Cursor', span: 'lg:col-span-4 lg:col-start-9 lg:-mt-24', ratio: 'aspect-[3/4]', pos: '50% 62%' },
];

export const TEAM = [
  { name: 'João Gularte', photo: 'fotos/time-1.jpg', pos: '50% 30%', role: '', stack: [], github: '', linkedin: '', line: 'Lorem ipsum dolor sit amet, consectetur adipiscing.' },
  { name: 'Gabriel Neughbauer', photo: 'fotos/time-4.jpg', pos: '50% 15%', role: '', stack: [], github: '', linkedin: '', line: 'Sed do eiusmod tempor incididunt ut labore et dolore.' },
  { name: 'Pedro Silveira', photo: 'fotos/time-3.jpg', pos: '42% 30%', role: '', stack: [], github: '', linkedin: '', line: 'Ut enim ad minim veniam, quis nostrud exercitation.' },
  { name: 'Pedro Eduardo da Silva', photo: 'fotos/time-2.jpg', pos: '50% 25%', role: '', stack: [], github: '', linkedin: '', line: 'Duis aute irure dolor in reprehenderit in voluptate.' },
  { name: 'Vitória Tumelero', photo: 'fotos/time-5.jpg', pos: '50% 25%', role: '', stack: [], github: '', linkedin: '', line: 'Excepteur sint occaecat cupidatat non proident.' },
];

export const SERVICES = [
  { title: 'IA & Dados', lead: 0, text: 'Modelos preditivos, automação inteligente e painéis que transformam dados em decisões.', tags: ['Machine learning', 'Visão computacional', 'Dashboards'] },
  { title: 'Produtos Web & Mobile', lead: 1, text: 'Plataformas, sistemas internos e apps do MVP à escala, com UX pensada para quem usa.', tags: ['Web apps', 'Mobile', 'Design de interface'] },
  { title: 'Automação & Integrações', lead: 2, text: 'Conectamos sistemas, eliminamos trabalho manual e fazemos seus dados conversarem.', tags: ['APIs', 'Cloud', 'ETL'] },
  { title: 'Web3 & Blockchain', lead: 3, text: 'Contratos inteligentes, rastreabilidade e tokenização onde a confiança precisa ser verificável.', tags: ['Smart contracts', 'Rastreabilidade', 'Tokenização'] },
  { title: 'Discovery & Prototipagem', lead: 'core', text: 'Do problema difuso a um protótipo testável em poucas semanas, antes de qualquer grande investimento.', tags: ['Imersão', 'Protótipo', 'Validação'] },
];
