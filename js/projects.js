/* ===================================================================
   Detalhes dos projetos + modal. Cada card (data-project) abre um
   painel com visão geral, funcionalidades, estrutura, stack e links.
   Conteúdo do "frotas" é anonimizado (sem nome de empresa/cidades).
   =================================================================== */
(function () {
  const PROJECTS = {
    bi: {
      title: 'Painel de Indicadores (BI)',
      type: 'Sistema',
      highlights: ['Acesso por perfil', 'Admin configura sem código'],
      overview: [
        'Painel interno que centraliza vários dashboards do Power BI num único lugar, ' +
        'atrás de login. Em vez de espalhar links de relatórios, a empresa acessa tudo ' +
        'por uma plataforma com controle de quem vê o quê.',
        'O administrador cadastra e organiza os links dos dashboards direto pela interface ' +
        '— sem precisar mexer no código a cada novo relatório.'
      ],
      features: [
        { group: 'Acesso & usuários', items: [
          'Autenticação com JWT e senhas com hash (bcrypt)',
          'Dois perfis: Admin (gestão total) e Gestor (visualização)',
          'Cadastro e gestão de contas de usuário'
        ]},
        { group: 'Dashboards', items: [
          'Catálogo de dashboards do Power BI configurável',
          'Admin adiciona/edita links sem alterar o código'
        ]}
      ],
      structure: [
        'Frontend em HTML, CSS e JavaScript puro (sem framework), na pasta Dash/',
        'Backend Node + Express organizado em controllers, middleware, routes e config',
        'Banco PostgreSQL para usuários e configuração dos dashboards'
      ],
      stack: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'bcrypt', 'HTML/CSS/JS'],
      links: [
        { label: 'Ver código', href: 'https://github.com/DaviSoftEng/Car-Station-Power-bi', primary: true }
      ]
    },

    barbearia: {
      title: 'Sistema para Barbearia',
      type: 'No ar', live: true,
      highlights: ['Em produção', 'Deploy no Railway'],
      overview: [
        'Plataforma de agendamento online para barbearia, em produção. Tem um site público ' +
        'onde o cliente reserva horário por serviço, e um painel administrativo onde a ' +
        'barbearia gerencia toda a operação.',
        'Os horários disponíveis são gerados automaticamente respeitando o horário de ' +
        'funcionamento, o intervalo de almoço, a duração de cada serviço e a janela de ' +
        'agendamento permitida.'
      ],
      features: [
        { group: 'Cliente (site público)', items: [
          'Reserva de horário por serviço',
          'Acompanhamento dos próprios agendamentos',
          'Geração automática de horários livres'
        ]},
        { group: 'Admin (painel)', items: [
          'Agenda em linha do tempo',
          'Métricas financeiras no dashboard',
          'Histórico de clientes',
          'Cadastro de serviços com upload de fotos'
        ]}
      ],
      structure: [
        'Arquitetura de serviço único: frontend e backend no mesmo deploy',
        'Banco SQLite em volume persistente',
        'Autenticação com JWT + bcryptjs'
      ],
      stack: ['React 18', 'Vite', 'React Router', 'Tailwind', 'Axios',
              'Node', 'Express', 'Prisma', 'SQLite', 'JWT', 'Railway'],
      links: [
        { label: 'Ver site', href: 'https://avance-barbearia-production.up.railway.app/', primary: true },
        { label: 'Ver código', href: 'https://github.com/DaviSoftEng/Avance-Barbearia' }
      ]
    },

    nail: {
      title: 'Sistema para Nail Designer',
      type: 'Sistema',
      highlights: ['Portfólio + agenda', 'Confirmação via WhatsApp'],
      overview: [
        'Plataforma de agendamento online para nail designers e designers de sobrancelha. ' +
        'O cliente reserva serviços e navega pelo portfólio; a profissional gerencia tudo ' +
        'por um painel administrativo.',
        'Mesma base do sistema da barbearia, adaptada para o fluxo de beleza: catálogo de ' +
        'serviços com preço e duração, galeria de trabalhos e confirmação por WhatsApp.'
      ],
      features: [
        { group: 'Cliente', items: [
          'Agendamento em 4 etapas, com janelas de 30 minutos',
          'Catálogo de serviços com preço e duração',
          'Galeria de portfólio com filtro e lightbox',
          'Confirmação de agendamento via WhatsApp'
        ]},
        { group: 'Admin', items: [
          'Dashboard com análise de faturamento',
          'Histórico de clientes',
          'Gestão de serviços e upload de fotos',
          'Horários, intervalos e janela de agendamento configuráveis'
        ]}
      ],
      structure: [
        'Arquitetura de serviço único (frontend + backend juntos)',
        'Banco SQLite em arquivo',
        'Segurança: rate limiting, headers via Helmet e log de auditoria'
      ],
      stack: ['React 18', 'Vite', 'Tailwind', 'Axios', 'React Router',
              'Node', 'Express', 'SQLite', 'JWT', 'Railway'],
      links: [
        { label: 'Ver código', href: 'https://github.com/DaviSoftEng/Naildesigner', primary: true }
      ]
    },

    frotas: {
      title: 'Sistema de Gestão de Frotas',
      type: 'Destaque',
      highlights: ['Em produção · uso diário', '4 filiais', '230+ commits', '7 versões', '300+ testes'],
      overview: [
        'Sistema interno real, <strong>em produção e em uso diário</strong> por uma empresa do ' +
        'setor de veículos elétricos. Centraliza toda a operação comercial de uma frota ' +
        'distribuída por 4 filiais.',
        'Substituiu um processo manual baseado em planilhas e formulários. Evoluiu de um CRUD ' +
        'simples para um sistema com regras de negócio complexas, fluxos de aprovação entre ' +
        'áreas, migração de dados legados e trilha de auditoria — entregue de forma ' +
        'incremental ao longo de 230+ commits e 7 versões.'
      ],
      features: [
        { group: 'Operação comercial', items: [
          'Gestão de frota: cadastro, status (disponível, reservado, em trânsito…) e arquivamento',
          'Disponibilidade em tempo real por filial',
          'Reservas com controle de período e validade automática',
          'Pedidos de venda e locação com formulário detalhado',
          'Pedidos em lote (carrinho) numa única operação'
        ]},
        { group: 'Aprovação entre áreas', items: [
          'Fluxo vendedor → PCP → comercial',
          'Expiração automática de pedidos pendentes (48h)',
          'Reencaminhamento para a base de PCP correta conforme a localidade'
        ]},
        { group: 'Transferências entre filiais', items: [
          'Registro de saída → trânsito → chegada, com condição em cada ponta',
          'Relatório com linha do tempo e duração total da movimentação'
        ]},
        { group: 'Histórico & auditoria', items: [
          'Histórico de demandas pesquisável, unificando dados legados e pedidos do sistema',
          'Auditoria que mostra o diff campo a campo de cada edição (não só "editado")'
        ]}
      ],
      structure: [
        'Application Factory + Blueprints por domínio (frota, pedidos, reservas, transferências, demandas, admin, financeiro…)',
        'Models: Veículo, Pedido, Reserva, Transferência, Cliente, Demanda, Usuário, Evento',
        'Auditoria com snapshot antes/depois em colunas JSON e diff legível gerado na comparação',
        'Migração de dados legados (Excel → JSON → banco) com upsert idempotente e deduplicação por data de corte',
        'Timestamps em UTC para cálculos de duração corretos independente do fuso',
        'Rate limiting por IP real (atrás de Cloudflare Tunnel) e Waitress como servidor WSGI'
      ],
      stack: ['Python 3.12', 'Flask 3.x', 'SQLAlchemy', 'Flask-Migrate', 'MariaDB 10.11',
              'Flask-Login', 'Flask-Limiter', 'Waitress', 'pandas', 'pytest', 'Docker', 'Cloudflare Tunnel'],
      security: [
        'Headers de segurança: CSP, X-Frame-Options, HSTS, Referrer-Policy',
        'Cookies de sessão com Secure e SameSite=Lax',
        'Rate limiting por IP real do cliente',
        'Bloqueio de conta após 10 tentativas de login falhas',
        'Mensagens genéricas no login (anti-enumeração de usuários)',
        'Senha mínima de 8 caracteres com troca obrigatória no 1º acesso',
        'Trilha de auditoria de todas as ações sensíveis'
      ],
      access: [
        'Administrador — acesso total + gestão de usuários + auditoria',
        'Comercial — aprovar/cancelar pedidos, criar reservas, ver histórico',
        'PCP — verificar pedidos e gerenciar transferências',
        'Gestor / Diretor — criar solicitações e visualizar a frota',
        'Vendedor — criar solicitações e acompanhar os próprios pedidos',
        'Financeiro — dashboard financeiro e histórico de demandas'
      ],
      note: 'Repositório proprietário e privado — sistema em produção. Detalhes técnicos disponíveis sob solicitação.'
    },

    refrigeracao: {
      title: 'Site Institucional — Refrigeração',
      type: 'Landing page',
      highlights: ['No ar', 'Responsivo'],
      overview: [
        'Site institucional para uma empresa de refrigeração, com foco em apresentar os ' +
        'serviços e converter visitantes em contato. Totalmente responsivo, leve e sem ' +
        'dependências de framework.'
      ],
      features: [
        { group: 'Destaques', items: [
          'Layout responsivo (desktop e mobile)',
          'Seções de serviços e apresentação da empresa',
          'Foco em contato e conversão'
        ]}
      ],
      stack: ['HTML', 'CSS', 'JavaScript'],
      links: [
        { label: 'Ver site', href: 'https://de-paula-silva-refrigera-o.vercel.app', primary: true },
        { label: 'Ver código', href: 'https://github.com/DaviSoftEng/De-Paula-Silva-Refrigera-o' }
      ]
    },

    odonto: {
      title: 'Sistema de Gestão Odontológica',
      type: 'Em breve',
      highlights: ['3 perfis de acesso', 'Em desenvolvimento'],
      overview: [
        'Sistema completo de gestão para clínicas odontológicas, cobrindo a rotina da ' +
        'clínica de ponta a ponta: atendimento, pacientes, financeiro e relatórios.'
      ],
      features: [
        { group: 'Atendimento', items: [
          'Dashboard geral da clínica',
          'Agenda de consultas',
          'Fichas de pacientes',
          'Lista de espera'
        ]},
        { group: 'Financeiro & relatórios', items: [
          'Despesas, vales e folha diária',
          'Relatórios',
          'Catálogo de procedimentos'
        ]}
      ],
      structure: [
        'Três perfis de acesso',
        'Log de auditoria',
        'Segurança: JWT, proteção CSRF e rate limiting'
      ],
      stack: ['React', 'TypeScript', 'Node', 'Prisma', 'PostgreSQL'],
      note: 'Repositório em breve no GitHub.'
    }
  };

  // ---------- montagem do conteúdo ----------
  function list(items) {
    return '<ul class="m-list">' + items.map((i) => '<li>' + i + '</li>').join('') + '</ul>';
  }

  function build(p) {
    let h = '';
    h += '<div class="modal-head">';
    h += '<span class="project-type' + (p.live ? ' project-type--live' : '') + '">' +
         (p.live ? '<span class="live-dot"></span>' : '') + p.type + '</span>';
    h += '<h2 id="modalTitle">' + p.title + '</h2>';
    if (p.highlights && p.highlights.length) {
      h += '<div class="m-chips">' + p.highlights.map((c) => '<span>' + c + '</span>').join('') + '</div>';
    }
    h += '</div>';

    if (p.overview) {
      h += '<div class="m-section">' + p.overview.map((t) => '<p>' + t + '</p>').join('') + '</div>';
    }

    if (p.features) {
      h += '<div class="m-section"><h3>Funcionalidades</h3>';
      p.features.forEach((f) => {
        h += '<h4>' + f.group + '</h4>' + list(f.items);
      });
      h += '</div>';
    }

    if (p.access) {
      h += '<div class="m-section"><h3>Perfis de acesso</h3>' + list(p.access) + '</div>';
    }

    if (p.structure) {
      h += '<div class="m-section"><h3>Estrutura &amp; decisões técnicas</h3>' + list(p.structure) + '</div>';
    }

    if (p.security) {
      h += '<div class="m-section"><h3>Segurança</h3>' + list(p.security) + '</div>';
    }

    if (p.stack) {
      h += '<div class="m-section"><h3>Stack</h3><ul class="m-stack">' +
           p.stack.map((t) => '<li>' + t + '</li>').join('') + '</ul></div>';
    }

    if (p.links && p.links.length) {
      h += '<div class="modal-links">' + p.links.map((l) =>
        '<a href="' + l.href + '" target="_blank" rel="noopener" class="' +
        (l.primary ? 'btn-primary' : 'btn-secondary') + '">' + l.label + '</a>'
      ).join('') + '</div>';
    }
    if (p.note) {
      h += '<p class="modal-note">' + p.note + '</p>';
    }
    return h;
  }

  // ---------- modal ----------
  const overlay = document.getElementById('projectModal');
  const body    = document.getElementById('modalBody');
  const closeBt = document.getElementById('modalClose');
  if (!overlay || !body) return;

  let lastFocus = null;

  function open(slug) {
    const p = PROJECTS[slug];
    if (!p) return;
    body.innerHTML = build(p);
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('show'));
    document.body.style.overflow = 'hidden';
    body.scrollTop = 0;
    lastFocus = document.activeElement;
    closeBt.focus();
  }

  function close() {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    const done = () => { overlay.hidden = true; overlay.removeEventListener('transitionend', done); };
    overlay.addEventListener('transitionend', done);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // abrir ao clicar no card (ignora cliques em links reais)
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card[data-project]');
    if (!card || e.target.closest('a')) return;
    open(card.getAttribute('data-project'));
  });

  // teclado: Enter/Espaço no card focado
  document.addEventListener('keydown', (e) => {
    const card = e.target.closest && e.target.closest('.project-card[data-project]');
    if (card && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      open(card.getAttribute('data-project'));
    }
    if (e.key === 'Escape' && !overlay.hidden) close();
  });

  closeBt.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
})();
