// Conteúdo da página inicial de Hogwarts. Os componentes só cuidam da marcação;
// todo o texto, links e imagens vivem aqui.

const img = (n: number) => `/assets/fotos/website-images/hp-img-${String(n).padStart(2, '0')}.png`;

export interface Link {
  label: string;
  href: string;
}

export interface NavGroup {
  title: string;
  links: Link[];
}

export const site = {
  name: 'Hogwarts',
  fullName: 'Escola de Magia e Bruxaria de Hogwarts',
  title: 'Escola de Magia e Bruxaria de Hogwarts | Seja Bem-vindo',
  description:
    'A Escola de Magia e Bruxaria de Hogwarts oferece a mais prestigiada formação mágica do mundo bruxo. Descubra a tradição das quatro casas, feitiços, poções e excelência mágica.',
  crest: '/assets/brasao.png',
  address: 'Terras Altas da Escócia — Acesso via Expresso de Hogwarts (Plataforma 9 ¾)',
  contact: 'Coruja Correio: Torre Norte',
};

export const ctas = {
  visit: { label: 'Visitar Castelo', href: '/enrolments/tour' },
  admission: { label: 'Admissão', href: '/enrolments/apply' },
  letter: { label: 'A Carta de Hogwarts', href: '/enrolments/apply' },
};

export const navGroups: NavGroup[] = [
  {
    title: 'Sobre Hogwarts',
    links: [
      { label: 'História do Castelo', href: '/about/our-school' },
      { label: 'Corpo Docente', href: '/about/teaching-quality' },
      { label: 'N.O.M.s e N.I.E.M.s', href: '/about/academic-results' },
      { label: 'As Quatro Casas', href: '/about/student-wellbeing' },
      { label: 'Tradições das Casas', href: '/about/school-houses' },
      { label: 'O Castelo e Terrenos', href: '/about/campus-and-facilities' },
      { label: 'Conselho Diretor', href: '/about/leadership-governance' },
      { label: 'Carreiras Mágicas', href: '/about/employment' },
    ],
  },
  {
    title: 'Disciplinas Mágicas',
    links: [
      { label: 'Currículo de Hogwarts', href: '/learn/curriculum-pathways' },
      { label: 'Primeiros Anos (1º ao 3º)', href: '/learn/early-learning' },
      { label: 'Anos Médios (4º e 5º)', href: '/learn/junior-school' },
      { label: 'Anos Avançados (6º e 7º)', href: '/learn/senior-school' },
      { label: 'Defesa Contra as Trevas', href: '/learn/trek' },
      { label: 'Poções e Alquimia', href: '/learn/quest' },
      { label: 'Transfiguração e Feitiços', href: '/learn/charms-transfiguration' },
      { label: 'Artes Mágicas Avançadas', href: '/learn/enrichment-extension' },
    ],
  },
  {
    title: 'Vida em Hogwarts',
    links: [
      { label: 'Copa de Quadribol', href: '/co-curricular/sport' },
      { label: 'Coral dos Sapos e Orquestra', href: '/co-curricular/music' },
      { label: 'Clube de Duelos', href: '/co-curricular/stem-academy' },
      { label: 'Artefatos e Encantamentos', href: '/co-curricular/performing-arts' },
      { label: 'Clube de Poções', href: '/co-curricular/debating' },
      { label: 'Trato de Criaturas Mágicas', href: '/co-curricular/community-service' },
      { label: 'Herbologia Mágica', href: '/co-curricular/effective-communication' },
      { label: 'Expedições a Hogsmeade', href: '/co-curricular/outdoor-camps-international' },
      { label: 'Clubes Estudantis', href: '/co-curricular/clubs' },
    ],
  },
  {
    title: 'Admissão Mágica',
    links: [
      { label: 'A Carta de Hogwarts', href: '/enrolments/apply' },
      { label: 'Visitar o Castelo', href: '/enrolments/tour' },
      { label: 'Bolsas e Apoio ao Aluno', href: '/enrolments/fees-scholarships' },
      { label: 'Estudantes Estrangeiros', href: '/enrolments/international-students' },
      { label: 'Expresso de Hogwarts (Plat. 9 ¾)', href: '/enrolments/travel-transport' },
      { label: 'Lista de Materiais e Varinhas', href: '/enrolments/practical-information' },
    ],
  },
  {
    title: 'Nossa Comunidade',
    links: [
      { label: 'Ex-Alunos Notáveis', href: '/community/alumni' },
      { label: 'Associação de Pais Bruxa', href: '/community/parents' },
      { label: 'Apoio ao Fundo Dumbledore', href: '/community/donate' },
      { label: 'Fundação de Magia de Hogwarts', href: '/community/foundation' },
      { label: 'Ordem de Merlin e Honrarias', href: '/community/honours' },
      { label: 'Portal dos Guardiões', href: '/community/portal' },
    ],
  },
  {
    title: 'Recursos e Arquivos',
    links: [
      { label: 'O Profeta Diário', href: '/resources/blog' },
      { label: 'Biblioteca de Hogwarts', href: '/resources/publications' },
      { label: 'Ecos e Vozes do Castelo', href: '/resources/student-podcast' },
      { label: 'Calendário Letivo Mágico', href: '/resources/term-dates' },
      { label: 'Estatuto e Regras do Castelo', href: '/resources/policies' },
      { label: 'Rede de Flu Oficial', href: '/resources/flu' },
    ],
  },
];

export const quickLinks: Link[] = [
  { label: 'Coruja Correio & Contato', href: '/contact' },
  { label: 'Cofre em Gringotes', href: '/enrolments/fees-scholarships' },
  { label: 'Calendário Letivo Mágico', href: '/resources/term-dates' },
  { label: 'Lista de Materiais e Varinhas', href: '/enrolments/practical-information' },
  { label: 'Portal dos Guardiões', href: '/community/portal' },
  { label: 'Fundação de Magia de Hogwarts', href: '/community/foundation' },
  { label: 'Rede de Flu Oficial', href: '/resources/flu' },
  { label: 'Carreiras Mágicas', href: '/about/employment' },
];

export const hero = {
  titleNormal: 'Nós não criamos apenas',
  titleAccent: 'bruxos.',
  subtitle: 'Nós despertamos o poder da',
  subtitleHighlight: 'magia.',
  front: { src: '/assets/fotos/heroGirl.png', alt: 'Jovem bruxa diante do castelo' },
  back: { src: '/assets/fotos/heroBackground.png', alt: '' },
  card: {
    eyebrow: 'Cerimônia de Seleção',
    title: '1º de Setembro',
    link: { label: 'Apoio ao Fundo Dumbledore', href: '/community/donate' },
    image: img(1),
  },
};

export const statement = {
  heading:
    'A Escola de Magia e Bruxaria de Hogwarts, situada nas misteriosas Terras Altas da Escócia, é o mais prestigiado centro de ensino mágico do mundo, acolhendo jovens bruxos e bruxas do 1º ao 7º ano.',
  // Trechos entre *asteriscos* ganham destaque.
  text: 'Descubra uma *formação extraordinária* em uma *comunidade lendária*. Nossos estudantes desenvolvem sabedoria, coragem e maestria arcana... *prontos para liderar o futuro do mundo bruxo*.',
};

export interface YearCard {
  title: string;
  subtitle?: string;
  href: string;
  image: string;
  posX?: string;
}

export const years: YearCard[] = [
  { title: 'Primeiros Anos', subtitle: '1º ao 3º Ano', href: '/learn/early-learning', image: img(2) },
  { title: 'Anos Médios', subtitle: '4º e 5º Ano (N.O.M.s)', href: '/learn/junior-school', image: img(3), posX: '30%' },
  { title: 'Anos Avançados', subtitle: '6º e 7º Ano (N.I.E.M.s)', href: '/learn/senior-school', image: img(4) },
];

export const discover: YearCard[] = [
  { title: 'Copa de Quadribol', href: '/co-curricular/sport', image: img(7) },
  { title: 'Coral dos Sapos e Orquestra', href: '/co-curricular/music', image: img(8), posX: '30%' },
  { title: 'Clube de Duelos', href: '/co-curricular/stem-academy', image: img(9) },
];

export const testimonial = {
  quote:
    'Hogwarts sempre será um refúgio e um lar para todos aqueles que a ela recorrerem e buscarem a luz do conhecimento e da coragem.',
  name: 'Alvo Dumbledore',
  role: 'Diretor de Hogwarts · Ordem de Merlin, Primeira Classe',
};

export const academic = {
  eyebrow: 'Exames Mágicos Oficiais',
  title: 'Excelência *Arcana* e Resultados *Extraordinários*',
  text: 'Em Hogwarts, temos imenso orgulho da tradição de excelência de nossos bruxos e bruxas. Sob a rigorosa avaliação da Banca Examinadora Mágica, nossos formandos conquistam as mais altas honrarias nos exames de N.O.M.s e N.I.E.M.s, abrindo portas para as mais prestigiadas carreiras do mundo bruxo.',
  stats: [
    { value: 98, suffix: '%', label: 'Aprovação com honras nos N.I.E.M.s Avançados' },
    { value: 100, suffix: '%', label: 'Aprovação N.O.M.s em Feitiços e Defesa' },
    { value: 4, suffix: '', label: 'Casas Centenárias Unidas pelo Legado dos Fundadores' },
  ],
  cta: { label: 'Conhecer N.O.M.s e N.I.E.M.s', href: '/about/academic-results' },
};

export const infoBlocks = [
  {
    eyebrow: 'Acolhimento & Tradição',
    title: '*Vida nas Casas*',
    text: 'O acolhimento e o senso de pertencimento de cada estudante são o coração de Hogwarts. Desde a Cerimônia do Chapéu Seletor, Grifinória, Sonserina, Corvinal e Lufa-Lufa tornam-se uma verdadeira família, com apoio dedicado de Monitores e Mestres de Casa em todos os momentos.',
    cta: { label: 'Explorar a Vida nas Casas', href: '/about/student-wellbeing' },
    image: { src: img(5), alt: 'Vida nas Quatro Casas' },
    imageSide: 'left' as const,
  },
  {
    eyebrow: 'Conhecimento com Profundidade',
    title: '*Alquimia*, Poções & Artes Avançadas',
    text: 'O aprendizado em Hogwarts estimula cada estudante a expandir seu potencial mágico. Por meio de disciplinas eletivas e mentorias com mestres renomados, nossos alunos aprofundam-se em Alquimia, Trato de Criaturas Mágicas, Aritmancia e Runas Antigas.',
    cta: { label: 'Explorar Estudos Avançados', href: '/learn/enrichment-extension' },
    image: { src: img(6), alt: 'Artes Mágicas Avançadas' },
    imageSide: 'right' as const,
  },
];

export const cta = {
  eyebrow: 'Matrículas & Cartas de Admissão',
  title: 'A Carta de Hogwarts',
  text: 'A jornada mágica do seu jovem bruxo em Hogwarts começa aqui.',
  button: { label: 'Inscrever Aluno', href: '/enrolments/apply' },
};

export const leadership = {
  title: '*Liderança* com Propósito. *Magia* com Honra.',
  text: 'Hogwarts capacita cada estudante a desenvolver sua própria identidade de liderança, preparando-os para conduzir o futuro do mundo bruxo com coragem, sabedoria e integridade.',
  cta: { label: 'Ver Atividades Extracurriculares', href: '/co-curricular' },
  cards: [
    {
      icon: 'plant' as const,
      title: 'Bases do Caráter Bruxo (1º ao 3º Ano)',
      text: 'Nos primeiros anos, os alunos desenvolvem valores fundamentais de coragem, lealdade e curiosidade mágica, participando de torneios acadêmicos e integrando-se à vida das quatro casas.',
    },
    {
      icon: 'star' as const,
      title: 'Monitores de Casa (4º e 5º Ano)',
      text: 'No 5º ano, estudantes com conduta exemplar são nomeados Monitores por suas Casas, orientando calouros nos dormitórios e zelando pela disciplina e pontuação na Taça das Casas.',
    },
    {
      icon: 'globe' as const,
      title: 'Monitores-Chefes & Ordem de Merlin (6º e 7º Ano)',
      text: 'Nos anos finais, os alunos mais notáveis são escolhidos como Monitores-Chefes, trabalhando diretamente com o Diretor e o Corpo Docente em grandes projetos de feitiçaria e cooperação internacional.',
    },
  ],
};

export const imageCloud = {
  eyebrow: 'Experiências Lendárias',
  title: '*Educação* *Extraordinária*.<br/>Dentro e *fora* das salas de aula',
  cta: { label: 'Expedições a Hogsmeade & Floresta', href: '/co-curricular/outdoor-camps-international' },
  center: { src: img(13), alt: 'Experiências Mágicas em Hogwarts' },
  side: [img(10), img(11), img(12), img(14)],
};

export const gallery = {
  eyebrow: 'Mundo Mágico em Movimento',
  title: '*Visões & Mistérios* do Castelo',
  text: 'Uma jornada visual imersiva pelos salões ancestrais, florestas e torres de Hogwarts. Arraste ou clique nas setas para transmutar entre as visões do mundo bruxo com metamorfose mágica.',
  items: [
    { image: img(1), caption: 'Castelo de Hogwarts ao Entardecer sob o Céu Escocês' },
    { image: img(2), caption: 'O Grande Salão Comunal Iluminado pelas Velas Flutuantes' },
    { image: img(3), caption: 'Aulas Práticas de Transfiguração e Feitiços' },
    { image: img(4), caption: 'A Seção Reservada da Biblioteca Ancestral' },
    { image: img(5), caption: 'Treinamento e Voos no Campo de Quadribol' },
    { image: img(6), caption: 'Observatório Cósmico na Torre de Astronomia' },
  ],
};

export const news = {
  eyebrow: 'Crônicas de Hogwarts · 2026',
  title: 'Notícias & Crônicas',
  text: 'O registro diário dos acontecimentos, pesquisas e mistérios de Hogwarts. Role para folhear a pilha — cada nota se fixa e a próxima desliza sobre ela.',
  items: [
    {
      date: 'Publicado em 18 de Julho de 2026',
      tag: 'Banquete Principal',
      image: img(15),
      body: 'Grande Banquete de Boas-Vindas ilumina o Salão Principal de Hogwarts sob o teto encantado e centenas de velas flutuantes dando início ao novo ano letivo.',
    },
    {
      date: 'Publicado há 6 dias',
      tag: 'Quadribol',
      image: img(16),
      body: 'Abertura oficial da temporada da Copa de Quadribol: seletivas abertas para artilheiros, batedores e apanhadores em todos os campos das quatro casas.',
    },
    {
      date: 'Publicado em 30 de Junho de 2026',
      tag: 'Biblioteca Arcana',
      image: img(17),
      body: 'Nova exposição de manuscritos arcanos e pergaminhos raros de alquimia medieval na Seção Reservada da Biblioteca do Castelo.',
    },
    {
      date: 'Publicado em 12 de Junho de 2026',
      tag: 'Astronomia',
      image: img(18),
      body: 'Noite de observação cósmica e alinhamento de Júpiter na Torre Leste sob a orientação direta dos mestres de astrologia e feitiçaria.',
    },
    {
      date: 'Publicado em 28 de Maio de 2026',
      tag: 'Clube de Duelos',
      image: img(19),
      body: 'Inscrições abertas para o tradicional Torneio do Clube de Duelos com demonstrações avançadas de feitiços de defesa e contra-ataque.',
    },
    {
      date: 'Publicado em 9 de Maio de 2026',
      tag: 'Hogsmeade',
      image: img(20),
      body: 'Fim de semana autorizado para visita dos estudantes à pitoresca aldeia bruxa de Hogsmeade com paradas no Três Vassouras e Dedosdemel.',
    },
  ],
};

export const nextPages = [
  { title: 'Currículo & Disciplinas Mágicas', href: '/learn/curriculum-pathways', image: img(19) },
  { title: 'As Quatro Casas', href: '/about/student-wellbeing', image: img(20) },
];

export const footer = {
  subtitle: 'Escola de Magia e Bruxaria',
  about:
    'A Escola de Magia e Bruxaria de Hogwarts honra a sabedoria ancestral de seus fundadores Godric Gryffindor, Salazar Slytherin, Rowena Ravenclaw e Helga Hufflepuff. Formando as mentes mais brilhantes do mundo bruxo desde 990 d.C. Sob a chancela do Ministério da Magia e da Confederação Internacional dos Bruxos.',
  legal: ['Registro Ministerial: MM-HOG-990', 'Selo da Confederação Internacional dos Bruxos'],
  credit: 'Feito com Magia em Hogwarts',
};
