import { useState, useEffect, useRef } from 'react';
import { CONTACT, SOCIAL, COMPANY } from './config.js';
import { MILESTONES, ORIGIN_PHOTOS, TEAM, SERVICES, PRODUCTS } from './content.js';
/* Ícones no traço do Lucide, desenhados aqui para não depender de pacote extra. */
const icon = (children) => ({ size = 20, strokeWidth = 1.5, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
       strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{children}</svg>
);
const Menu = icon(<><path d="M4 9h16"/><path d="M4 15h16"/></>);
const X = icon(<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>);
const ArrowRight = icon(<><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>);
const ArrowUpRight = icon(<><path d="M7 7h10v10"/><path d="M7 17 17 7"/></>);

/* ------------------------------ LOGO ------------------------------ */
const LS = 40, LR = 20.4, LD = 12.6;
const logoCenters = Array.from({ length: 5 }, (_, k) => {
  const a = (-90 + k * 72) * Math.PI / 180;
  return { x: LS + LD * Math.cos(a), y: LS + LD * Math.sin(a) };
});
const logoCorePoints = Array.from({ length: 5 }, (_, k) => {
  const a = (-90 + k * 72) * Math.PI / 180;
  return `${LS + 8.5 * Math.cos(a)},${LS + 8.5 * Math.sin(a)}`;
}).join(' ');

const BrandSymbol = ({ className = '' }) => (
  <svg viewBox="0 0 80 80" className={`brand-symbol ${className}`} aria-hidden="true">
    {logoCenters.map((c, k) => (
      <circle key={`logo-fill-${k}`} cx={c.x} cy={c.y} r={LR} fill="rgba(61,220,151,.11)" />
    ))}
    {logoCenters.map((c, k) => (
      <circle key={`logo-stroke-${k}`} cx={c.x} cy={c.y} r={LR} fill="none" stroke="rgba(61,220,151,.8)" strokeWidth="0.9" />
    ))}
    <polygon points={logoCorePoints} fill="#52F0B8" />
  </svg>
);

const Wordmark = ({ className = '' }) => (
  <span className={`brand-word leading-none tracking-[-0.035em] text-ink ${className}`}>
    <span className="font-extrabold">ESP</span><span className="font-semibold">tech</span>
  </span>
);

const Logo = ({ className = '' }) => (
  <a href="#topo" className={`inline-flex items-center gap-3 rounded-full text-ink ${className}`} aria-label="ESPtech, início">
    <BrandSymbol className="h-9 w-9 shrink-0" />
    <Wordmark className="text-[28px] sm:text-[30px]" />
  </a>
);

/* ---------------------------- HEADER ---------------------------- */
const NAV = [
  { label: 'Origem', href: '#origem' },
  { label: 'Time', href: '#time' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Produtos', href: '#produtos' },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className="fixed inset-x-0 z-50" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      <div className={`gutter border-b transition-colors duration-500
                       ${open ? 'border-white/10 bg-[#0A0F0D]/95 backdrop-blur-xl'
                         : scrolled ? 'border-white/10 bg-[#0A0F0D]/80 backdrop-blur-xl' : 'border-transparent'}`}>
        <nav className="mx-auto flex h-[88px] max-w-[1320px] items-center justify-between">
          <Logo />
          <div className="flex items-center gap-10">
            <ul className="hidden items-center gap-10 md:flex">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[14px] font-light text-ink/60 transition-colors hover:text-ink">{item.label}</a>
                </li>
              ))}
            </ul>
            <a href="#contato" className="group hidden items-center gap-1.5 text-[14px] font-light text-ink sm:inline-flex">
              Contato
              <ArrowUpRight size={15} className="text-lime transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button id="menu-toggle" type="button" onClick={() => setOpen(!open)}
                    className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
                    aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {open && (
          <div id="mobile-menu" className="mx-auto max-w-[1320px] pb-8 md:hidden">
            <ul className="border-t" style={{ borderColor: 'var(--rule)' }}>
              {[...NAV, { label: 'Contato', href: '#contato' }].map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)}
                     className="flex items-baseline justify-between border-b py-5 text-[32px] font-extralight tracking-[-0.03em] text-ink"
                     style={{ borderColor: 'var(--rule)' }}>
                    {item.label}<ArrowUpRight size={18} className="text-lime" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------
   OS CINCO AROS E O NÚCLEO
   Cinco círculos de mesmo raio, com centros num pentágono ao redor do eixo.
   Como a distância ao eixo (D) é menor que o raio (R), os cinco discos
   compartilham uma área comum no meio: o núcleo, pintado de menta sólido.
   Cinco repertórios diferentes, um núcleo sólido. (Proporção D/R = 0,62, a da opção 3.)
------------------------------------------------------------------- */
const C = 500, R = 230, D = 143;
const centers = Array.from({ length: 5 }, (_, k) => {
  const a = (-90 + k * 72) * Math.PI / 180;
  return { x: C + D * Math.cos(a), y: C + D * Math.sin(a) };
});
// cruzamento externo de cada par de aros vizinhos
const nodes = centers.map((c, k) => {
  const n = centers[(k + 1) % 5];
  const mx = (c.x + n.x) / 2, my = (c.y + n.y) / 2;
  const half = Math.hypot(n.x - c.x, n.y - c.y) / 2;
  const s = Math.sqrt(R * R - half * half);
  const ux = (mx - C) / Math.hypot(mx - C, my - C), uy = (my - C) / Math.hypot(mx - C, my - C);
  return { x: mx + ux * s, y: my + uy * s };
});

function Rings() {
  // interseção dos cinco discos: grupos aninhados, cada um recortado por um disco
  const core = (fill, extra = {}) => (
    <g clipPath="url(#disc-0)"><g clipPath="url(#disc-1)"><g clipPath="url(#disc-2)"><g clipPath="url(#disc-3)">
      <circle cx={centers[4].x} cy={centers[4].y} r={R} fill={fill} {...extra} />
    </g></g></g></g>
  );
  return (
    <svg viewBox="0 0 1000 1000" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        {centers.map((c, k) => (
          <clipPath key={k} id={`disc-${k}`}><circle cx={c.x} cy={c.y} r={R} /></clipPath>
        ))}
      </defs>

      <g className="orbit">
        <circle cx={C} cy={C} r={R + D - 6} fill="rgba(61,220,151,.08)" />

        {centers.map((c, k) => (
          <circle key={`fill-${k}`} cx={c.x} cy={c.y} r={R} fill="rgba(61,220,151,.12)" />
        ))}

        {/* núcleo: só a área comum aos cinco discos, em menta sólido */}
        <g className="core">{core('#52F0B8')}</g>

        <polygon
          points={Array.from({ length: 5 }, (_, k) => {
            const a = (-90 + k * 72) * Math.PI / 180;
            return `${C + 68 * Math.cos(a)},${C + 68 * Math.sin(a)}`;
          }).join(' ')}
          fill="#62FFD0"
          className="core"
        />

        {/* círculo envolvente, quase invisível */}
        <circle cx={C} cy={C} r={R + D} fill="none" stroke="rgba(61,220,151,.34)" strokeWidth="1" pathLength="1"
                className="ring" style={{ animationDelay: '0s', animationDuration: '5s' }} />

        {/* os cinco aros */}
        {centers.map((c, k) => (
          <circle key={`line-${k}`} cx={c.x} cy={c.y} r={R} fill="none" pathLength="1"
                  stroke={k === 0 ? 'rgba(61,220,151,.92)' : 'rgba(61,220,151,.62)'} strokeWidth={k === 0 ? 1.5 : 1.25}
                  className="ring" style={{ animationDelay: `${0.35 + k * 0.3}s` }}
                  transform={`rotate(${-90 + k * 72} ${c.x} ${c.y})`} />
        ))}

        {/* nós nos cruzamentos externos */}
        {nodes.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.4" fill="rgba(98,255,208,.9)"
                className="appear" style={{ animationDelay: `${3 + i * 0.12}s` }} />
        ))}
      </g>
    </svg>
  );
}

/* ----------------------------- HERO ----------------------------- */
function Hero() {
  const ref = useRef(null);

  // a luz segue o cursor com um leve atraso
  useEffect(() => {
    const el = ref.current;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0, tx = 68, ty = 46, cx = 68, cy = 46;
    const tick = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      el.style.setProperty('--mx', cx + '%'); el.style.setProperty('--my', cy + '%');
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    el.addEventListener('pointermove', onMove);
    return () => { el.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="topo" ref={ref} className="grain relative isolate overflow-hidden">
      {/* malha de gradiente: petróleo no alto, menta e lime ao fundo à direita */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[20%] -top-[30%] h-[80%] w-[70%] rounded-full bg-petrol opacity-50 blur-[160px]"></div>
        <div className="absolute -bottom-[25%] right-[5%] h-[60%] w-[45%] rounded-full bg-mint opacity-[0.16] blur-[150px]"></div>
        <div className="absolute -right-[12%] top-[18%] h-[45%] w-[30%] rounded-full bg-lime opacity-[0.10] blur-[140px]"></div>
        <div className="cursor-glow absolute inset-0"></div>
        <div className="dots-lit absolute inset-0"></div>
      </div>

      {/* aros: à direita no desktop, por trás e mais apagados no celular */}
      <div aria-hidden="true"
         className="pointer-events-none absolute -z-[5] opacity-70
                      left-1/2 top-[42%] w-[150vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2
                      lg:left-auto lg:right-[-6%] lg:top-1/2 lg:w-[62vw] lg:max-w-[920px] lg:translate-x-0 lg:opacity-100">
        <Rings />
      </div>

      <div className="gutter relative z-[2]">
        <div className="mx-auto max-w-[1320px] pb-16 pt-[170px] sm:pt-[200px] lg:pb-20 lg:pt-[230px]">
          <h1 className="rise max-w-[14ch] text-[clamp(46px,7.6vw,120px)] font-extralight leading-[0.98] tracking-[-0.045em] text-ink"
              style={{ animationDelay: '.2s' }}>
            Cinco especialistas. Um só time.{' '}
            <span className="text-ink/45">Nenhum problema</span>{' '}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-mint">grande demais.</span>
          </h1>

          <div className="rise mt-16 flex flex-wrap items-center gap-x-10 gap-y-6 sm:mt-20" style={{ animationDelay: '.6s' }}>
            <a href="#contato"
               className="group inline-flex items-center gap-4 rounded-full bg-mint px-7 py-4 text-[15px] font-medium text-abyss transition-colors duration-300 hover:bg-lime">
              Conte seu desafio
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#time" className="group text-[15px] font-light text-ink/80 transition-colors hover:text-ink">
              Conheça o time
              <span className="mt-1 block h-px w-full origin-left scale-x-50 bg-ink/40 transition-transform duration-500 group-hover:scale-x-100 group-hover:bg-lime"></span>
            </a>
          </div>

          {/* régua fina com a assinatura, como no NEXO */}
          <div className="mt-[120px] flex items-center gap-6 sm:mt-[160px]">
            <span className="h-px flex-1" style={{ background: 'var(--rule)' }}></span>
            <div className="inline-flex items-center gap-2.5 text-ink/90">
              <BrandSymbol className="h-6 w-6" />
              <Wordmark className="text-[20px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   PÁGINA SILENCIOSA
   Daqui para baixo: uma cor só, régua fina de 1px e rótulo à direita
   (a assinatura de seção do NEXO), grade de 12 colunas invisível.
------------------------------------------------------------------- */

function SectionRule({ label, index }) {
  return (
    <div className="flex items-center gap-6">
      <span className="text-[12px] font-light tabular-nums tracking-[0.2em] text-ink/40">{index}</span>
      <span className="h-px flex-1 bg-white/10"></span>
      <span className="text-[12px] font-light uppercase tracking-[0.28em] text-ink/60">{label}</span>
    </div>
  );
}

/* ----------------------------- 3. ORIGEM ----------------------------- */


/* Seis fotos em ordem cronológica, em grade assimétrica, sempre em P&B (ganham cor ao passar o mouse). */


function OriginPhotos() {
  return (
    <div className="mt-24 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-32 lg:grid-cols-12 lg:gap-y-20">
      {ORIGIN_PHOTOS.map((p, i) => (
        <figure key={i} className={`group min-w-0 ${p.span}`}>
          <div className={`photo-slot relative w-full max-w-full overflow-hidden border border-white/10 ${p.ratio}`}>
            {p.src ? (
              <img src={p.src} alt={p.alt} loading="lazy" style={{ objectPosition: p.pos }}
                   className="h-full w-full object-cover grayscale contrast-[1.08] transition-[filter] duration-700 group-hover:grayscale-0 group-hover:contrast-100" />
            ) : (
              <span className="absolute bottom-3 left-3 text-[10px] font-light uppercase tracking-[0.2em] text-ink/35">
                {p.alt} · P&amp;B
              </span>
            )}
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-white/10 pt-3">
            <span className="text-[13px] font-light text-ink/60">{p.caption}</span>
            <span className="shrink-0 text-[11px] font-light tabular-nums tracking-[0.2em] text-ink/30">0{i + 1}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function Origin() {
  return (
    <section id="origem" className="gutter">
      <div className="mx-auto max-w-[1320px] pb-32 pt-28 sm:pb-44 sm:pt-36">
        <SectionRule index="01" label="Origem" />

        <div className="mt-20 grid grid-cols-1 gap-y-14 lg:mt-28 lg:grid-cols-12 lg:gap-x-8">
          <h2 className="text-[13px] font-light uppercase tracking-[0.28em] text-ink/50 lg:col-span-3 lg:pt-4">
            Como começamos
          </h2>
          <p className="text-[clamp(28px,3.6vw,52px)] font-extralight leading-[1.14] tracking-[-0.03em] text-ink lg:col-span-9">
            Começamos vencendo o Hackathon de Saúde Senac/Unimed com um painel de leitos com IA. Dali nasceu a ESPtech, e desde então seguimos{' '}
            <span className="font-serif font-normal italic tracking-[-0.01em] text-mint">competindo e vencendo</span>,{' '}
            da saúde à Web3.
          </p>
        </div>

        <OriginPhotos />

        <div className="mt-24 grid grid-cols-1 gap-y-12 border-t border-white/10 pt-12 lg:mt-32 lg:grid-cols-12 lg:gap-x-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-4">
            <p className="max-w-[38ch] text-[16px] font-light leading-[1.75] text-ink/60">
              Depois da vitória, abrimos a startup para validar o painel com a Unimed. Com ela, conquistamos o 3º lugar no Tech Business.
            </p>
            <p className="max-w-[38ch] text-[16px] font-light leading-[1.75] text-ink/60">
              Seguimos testando o time em novos desafios: vencemos o hackathon da Solana com o Cursor e o hackathon universitário da Superteam BR.
              Em outubro, passamos duas semanas de imersão no The Garage e saímos com três projetos que hoje competem no Colosseum.
            </p>
          </div>
        </div>

        <div className="mt-24 flex items-baseline justify-between gap-6 lg:mt-32">
          <h3 className="text-[13px] font-light uppercase tracking-[0.28em] text-ink/50">Trajetória</h3>
          <span className="text-[13px] font-light text-ink/40">
            <span className="text-mint">4</span> pódios em 2026
          </span>
        </div>
        <ol className="mt-8 border-t border-white/10">
          {MILESTONES.map((m, i) => (
            <li key={i}
                className="group grid grid-cols-[96px_1fr] items-baseline gap-x-6 gap-y-2 border-b border-white/10 py-7
                           sm:grid-cols-[140px_1fr_auto] lg:grid-cols-12 lg:gap-x-8">
              <span className={`text-[12px] font-light uppercase tracking-[0.22em] lg:col-span-2 ${m.win ? 'text-mint' : 'text-ink/40'}`}>{m.tag}</span>
              <span className="min-w-0 lg:col-span-6">
                <span className="block text-[clamp(20px,2vw,28px)] font-extralight leading-snug tracking-[-0.02em] text-ink transition-transform duration-500 group-hover:translate-x-1.5">{m.what}</span>
                {m.note && <span className="mt-1 block text-[14px] font-light text-ink/45">{m.note}</span>}
              </span>
              <span className="col-start-2 text-[12px] font-light uppercase tracking-[0.22em] text-ink/35 sm:col-start-auto sm:text-right lg:col-span-4">{m.area}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------- 4. O TIME ----------------------------- */


function Team() {
  return (
    <section id="time" className="gutter">
      <div className="mx-auto max-w-[1320px] pb-32 pt-12 sm:pb-44">
        <SectionRule index="02" label="Time" />

        <div className="mt-20 grid grid-cols-1 items-end gap-y-10 lg:mt-28 lg:grid-cols-12 lg:gap-x-8">
          <h2 className="text-[clamp(56px,10vw,160px)] font-extralight leading-[0.9] tracking-[-0.055em] text-ink lg:col-span-8">
            O <span className="font-serif font-normal italic tracking-[-0.03em] text-mint">Time</span>
          </h2>
          <p className="max-w-[34ch] text-[16px] font-light leading-[1.75] text-ink/60 lg:col-span-4 lg:pb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cinco repertórios, um núcleo.
          </p>
        </div>

        {/* cabeçalho da tabela, só no desktop */}
        <div className="mt-20 hidden grid-cols-12 gap-x-8 border-b border-white/10 pb-4 text-[11px] font-light uppercase tracking-[0.24em] text-ink/40 lg:mt-28 lg:grid">
          <span className="col-span-2">Retrato</span>
          <span className="col-span-4">Fundador</span>
          <span className="col-span-2">Stack</span>
          <span className="col-span-4">Em uma frase</span>
        </div>

        <ul className="mt-16 border-t border-white/10 lg:mt-0 lg:border-t-0">
          {TEAM.map((p, i) => (
            <li key={i} className="person group grid grid-cols-[96px_1fr] gap-x-6 gap-y-8 border-b border-white/10 py-10
                                   sm:grid-cols-[132px_1fr] lg:grid-cols-12 lg:gap-x-8 lg:py-12">
              {/* espaço para a foto P&B */}
              <div className="photo-slot relative aspect-[4/5] w-full overflow-hidden border border-white/10 lg:col-span-2 lg:max-w-[150px]">
                {p.photo
                  ? <img src={p.photo} alt={`Retrato de ${p.name}`} loading="lazy" style={{ objectPosition: p.pos }}
                         className="h-full w-full object-cover grayscale contrast-[1.08] transition-[filter] duration-700 group-hover:grayscale-0 group-hover:contrast-100" />
                  : <span className="absolute bottom-2 left-2 text-[10px] font-light uppercase tracking-[0.2em] text-ink/35">P&amp;B</span>}
              </div>

              <div className="min-w-0 self-end lg:col-span-4 lg:self-start">
                {p.role && <p className="text-[12px] font-light uppercase tracking-[0.24em] text-ink/50">{p.role}</p>}
                <h3 className="mt-3 first:mt-0 text-[clamp(30px,3.2vw,46px)] font-extralight leading-[1.02] tracking-[-0.035em] text-ink transition-colors duration-300 group-hover:text-mint">
                  {p.name}
                </h3>
                {(p.github || p.linkedin) && (
                  <div className="mt-5 flex gap-5 text-[13px] font-light text-ink/50">
                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="border-b border-white/15 pb-0.5 transition-colors hover:border-mint hover:text-ink">GitHub</a>}
                    {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="border-b border-white/15 pb-0.5 transition-colors hover:border-mint hover:text-ink">LinkedIn</a>}
                  </div>
                )}
              </div>

              <ul className="col-span-2 flex flex-wrap gap-x-4 gap-y-1 text-[15px] font-light text-ink/75 lg:col-span-2 lg:flex-col">
                {p.stack.length ? p.stack.map((s) => <li key={s}>{s}</li>) : <li className="text-ink/30">A definir</li>}
              </ul>

              <p className="col-span-2 max-w-[30ch] font-serif text-[22px] italic leading-[1.35] text-ink/80 lg:col-span-4 lg:text-[24px]">
                “{p.line}”
              </p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}

/* ----------------------------- 5. SERVIÇOS -----------------------------
   Cada frente traz um mini diagrama dos cinco aros: o aro aceso é o
   fundador que lidera aquela frente. Discovery acende o núcleo, porque
   é feito pelos cinco juntos. */


const MC = 40, MR = 18.4, MD = 11.4;
const miniCenters = Array.from({ length: 5 }, (_, k) => {
  const a = (-90 + k * 72) * Math.PI / 180;
  return { x: MC + MD * Math.cos(a), y: MC + MD * Math.sin(a) };
});

function MiniVenn({ lead, id }) {
  return (
    <svg viewBox="0 0 80 80" className="h-14 w-14 shrink-0 sm:h-16 sm:w-16" aria-hidden="true">
      <defs>
        {miniCenters.slice(0, 4).map((c, k) => (
          <clipPath key={k} id={`${id}-${k}`}><circle cx={c.x} cy={c.y} r={MR} /></clipPath>
        ))}
      </defs>
      {lead === 'core' && (
        <g clipPath={`url(#${id}-0)`}><g clipPath={`url(#${id}-1)`}><g clipPath={`url(#${id}-2)`}><g clipPath={`url(#${id}-3)`}>
          <circle cx={miniCenters[4].x} cy={miniCenters[4].y} r={MR} fill="#52F0B8" />
        </g></g></g></g>
      )}
      {miniCenters.map((c, k) => (
        <circle key={`mini-fill-${k}`} cx={c.x} cy={c.y} r={MR} fill={lead === k || lead === 'core' ? 'rgba(61,220,151,.22)' : 'rgba(61,220,151,.08)'} />
      ))}
      {miniCenters.map((c, k) => (
        <circle key={`mini-stroke-${k}`} cx={c.x} cy={c.y} r={MR} fill="none"
                stroke={lead === k ? '#52F0B8' : 'rgba(61,220,151,.45)'} strokeWidth={lead === k ? 1.5 : 1} />
      ))}
      <polygon
        points={Array.from({ length: 5 }, (_, k) => {
          const a = (-90 + k * 72) * Math.PI / 180;
          return `${MC + 5.6 * Math.cos(a)},${MC + 5.6 * Math.sin(a)}`;
        }).join(' ')}
        fill={lead === 'core' ? '#62FFD0' : 'rgba(98,255,208,.55)'}
      />
    </svg>
  );
}

function Services() {
  return (
    <section id="servicos" className="gutter">
      <div className="mx-auto max-w-[1320px] pb-32 pt-12 sm:pb-44">
        <SectionRule index="03" label="Serviços" />

        <div className="mt-20 grid grid-cols-1 items-end gap-y-10 lg:mt-28 lg:grid-cols-12 lg:gap-x-8">
          <h2 className="text-[clamp(40px,6vw,92px)] font-extralight leading-[0.98] tracking-[-0.045em] text-ink lg:col-span-8">
            Uma equipe,{' '}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-mint">todas</span>{' '}
            as camadas da tecnologia.
          </h2>
          <p className="max-w-[34ch] text-[16px] font-light leading-[1.75] text-ink/60 lg:col-span-4 lg:pb-3">
            Não somos presos a uma ferramenta. Escolhemos a stack pelo problema, e dizemos quando a solução mais simples é a melhor.
          </p>
        </div>

        <ul className="mt-20 border-t border-white/10 lg:mt-28">
          {SERVICES.map((s, i) => (
            <li key={s.title}
                className="group grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-6 border-b border-white/10 py-10
                           lg:grid-cols-12 lg:gap-x-8 lg:py-12">
              <div className="lg:col-span-1"><MiniVenn lead={s.lead} id={`mv${i}`} /></div>
              <h3 className="min-w-0 self-center text-[clamp(28px,3.4vw,52px)] font-extralight leading-[1.02] tracking-[-0.035em] text-ink
                             transition-transform duration-500 group-hover:translate-x-2 lg:col-span-5">
                {s.title}
              </h3>
              <p className="col-span-2 max-w-[42ch] text-[16px] font-light leading-[1.75] text-ink/65 lg:col-span-4 lg:pt-2">{s.text}</p>
              <ul className="col-span-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-light text-ink/45 lg:col-span-2 lg:flex-col lg:pt-3">
                {s.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-10 flex items-center gap-3 text-[13px] font-light text-ink/45">
          <MiniVenn lead={0} id="legend" />
          O aro aceso indica quem lidera a frente. No Discovery, os cinco trabalham juntos.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------- 6. PRODUTOS ----------------------------- */
function ProductLinks({ product }) {
  const links = [
    { label: 'Site', href: product.siteUrl },
    { label: 'Caso de uso', href: product.caseUrl },
    { label: 'GitHub', href: product.githubUrl },
  ];

  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-light text-ink/55">
      {links.map((item) => (
        <li key={item.label}>
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white/15 pb-0.5 transition-colors hover:border-mint hover:text-ink"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-ink/30">{item.label}: a definir</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function Products() {
  return (
    <section id="produtos" className="gutter">
      <div className="mx-auto max-w-[1320px] pb-32 pt-12 sm:pb-44">
        <SectionRule index="04" label="Produtos" />

        <div className="mt-20 grid grid-cols-1 items-end gap-y-10 lg:mt-28 lg:grid-cols-12 lg:gap-x-8">
          <h2 className="text-[clamp(40px,6vw,92px)] font-extralight leading-[0.98] tracking-[-0.045em] text-ink lg:col-span-8">
            Produtos que já
            {' '}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-mint">entregamos</span>.
          </h2>
          <p className="max-w-[34ch] text-[16px] font-light leading-[1.75] text-ink/60 lg:col-span-4 lg:pb-3">
            Cada projeto aponta para seu próprio site, caso de uso e repositório. Atualize os links em <span className="text-ink">content.js</span>.
          </p>
        </div>

        <ul className="mt-20 border-t border-white/10 lg:mt-28">
          {PRODUCTS.map((product, i) => (
            <li
              key={product.name}
              className="grid grid-cols-1 gap-x-8 gap-y-8 border-b border-white/10 py-10 lg:grid-cols-12 lg:py-12"
            >
              <span className="text-[12px] font-light tabular-nums tracking-[0.2em] text-ink/35 lg:col-span-1">
                0{i + 1}
              </span>

              <div className="lg:col-span-5">
                <h3 className="text-[clamp(28px,3.2vw,48px)] font-extralight leading-[1.02] tracking-[-0.035em] text-ink">
                  {product.name}
                </h3>
                <p className="mt-4 max-w-[42ch] text-[16px] font-light leading-[1.75] text-ink/65">{product.summary}</p>
              </div>

              <div className="lg:col-span-4 lg:pt-2">
                <ProductLinks product={product} />
              </div>

              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-light text-ink/45 lg:col-span-2 lg:flex-col lg:pt-2">
                {(product.tags || []).map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------- 7. CONTATO ----------------------------- */
function Field({ id, label, type = 'text', placeholder, textarea = false, autoComplete }) {
  const cls = 'mt-3 block w-full border-0 border-b border-white/15 bg-transparent px-0 pb-3 text-[20px] font-light text-ink placeholder:text-ink/25 transition-colors focus:border-mint focus:outline-none focus:ring-0';
  return (
    <div>
      <label htmlFor={id} className="text-[11px] font-light uppercase tracking-[0.24em] text-ink/50">{label}</label>
      {textarea
        ? <textarea id={id} name={id} rows="3" required placeholder={placeholder} className={`${cls} resize-none leading-relaxed`}></textarea>
        : <input id={id} name={id} type={type} required placeholder={placeholder} autoComplete={autoComplete} className={cls} />}
    </div>
  );
}

function Contact() {
  // idle | sending | sent | mailto | error
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(CONTACT.email); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch (e) {
      const r = document.createRange(); r.selectNodeContents(document.getElementById('email-text'));
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return; // campo invisível: só robôs preenchem

    const subject = `Novo contato pelo site: ${data.empresa}`;
    const body = `Nome: ${data.nome}\nE-mail: ${data.email}\nEmpresa: ${data.empresa}\n\nDesafio:\n${data.desafio}`;

    // Sem serviço de formulário configurado: abre o app de e-mail com a mensagem pronta.
    if (!CONTACT.formEndpoint) {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nome: data.nome, email: data.email, empresa: data.empresa, desafio: data.desafio,
          _subject: subject, _template: 'table', _captcha: 'false',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false || json.success === 'false') throw new Error(json.message || 'Falha no envio');
      form.reset();
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const done = status === 'sent' || status === 'mailto';

  return (
    <section id="contato" className="gutter">
      <div className="mx-auto max-w-[1320px] pb-32 pt-12 sm:pb-40">
        <SectionRule index="05" label="Contato" />

        <h2 className="mt-20 max-w-[16ch] text-[clamp(44px,7vw,112px)] font-extralight leading-[0.98] tracking-[-0.045em] text-ink lg:mt-28">
          Tem um problema{' '}
          <span className="font-serif font-normal italic tracking-[-0.02em] text-mint">complexo?</span>{' '}
          <span className="text-ink/45">É exatamente o que a gente procura.</span>
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-y-16 border-t border-white/10 pt-14 lg:mt-28 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col gap-12 lg:col-span-4">
            <p className="max-w-[32ch] text-[16px] font-light leading-[1.75] text-ink/60">
              Conte o desafio em poucas linhas. Em até 24h um dos fundadores responde, e não um robô. O diagnóstico inicial é gratuito.
            </p>
            <dl className="flex flex-col gap-8">
              <div>
                <dt className="text-[11px] font-light uppercase tracking-[0.24em] text-ink/40">E-mail</dt>
                <dd className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <a id="email-text" href={`mailto:${CONTACT.email}`} className="break-all text-[20px] font-light text-ink transition-colors hover:text-mint">{CONTACT.email}</a>
                  <button id="copy-email" type="button" onClick={copyEmail}
                          className="text-[12px] font-light text-ink/50 underline decoration-white/20 underline-offset-4 transition-colors hover:text-mint">
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                </dd>
              </div>
              {CONTACT.whatsapp && (
                <div>
                  <dt className="text-[11px] font-light uppercase tracking-[0.24em] text-ink/40">WhatsApp</dt>
                  <dd className="mt-2 text-[20px] font-light text-ink">
                    {CONTACT.whatsappUrl
                      ? <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-mint">{CONTACT.whatsapp}</a>
                      : CONTACT.whatsapp}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {done ? (
              <div className="flex min-h-[420px] flex-col justify-center gap-6 border-l border-white/10 pl-8" role="status">
                <MiniVenn lead="core" id="sent" />
                {status === 'sent' ? (
                  <>
                    <p className="max-w-[22ch] text-[32px] font-extralight leading-[1.15] tracking-[-0.03em] text-ink">
                      Mensagem <span className="font-serif italic text-mint">recebida.</span>
                    </p>
                    <p className="max-w-[40ch] text-[15px] font-light leading-[1.7] text-ink/55">
                      Um dos fundadores responde em até 24h no e-mail que você informou.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="max-w-[22ch] text-[32px] font-extralight leading-[1.15] tracking-[-0.03em] text-ink">
                      Sua mensagem está <span className="font-serif italic text-mint">pronta.</span>
                    </p>
                    <p className="max-w-[40ch] text-[15px] font-light leading-[1.7] text-ink/55">
                      Abrimos seu app de e-mail com o texto preenchido. É só enviar por lá. Se nada abriu, escreva para {CONTACT.email}.
                    </p>
                  </>
                )}
                <button id="reset-form" type="button" onClick={() => setStatus('idle')}
                        className="w-fit text-[14px] font-light text-ink/70 underline decoration-white/20 underline-offset-4 hover:text-ink">
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
                <Field id="nome" label="Nome" placeholder="Seu nome" autoComplete="name" />
                <Field id="email" label="E-mail corporativo" type="email" placeholder="voce@empresa.com" autoComplete="email" />
                <div className="sm:col-span-2"><Field id="empresa" label="Empresa" placeholder="Nome da empresa" autoComplete="organization" /></div>
                <div className="sm:col-span-2"><Field id="desafio" label="Qual problema você quer resolver?" placeholder="Em poucas linhas, o que está travando hoje" textarea /></div>
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" disabled={status === 'sending'}
                          className="group inline-flex w-fit items-center gap-4 rounded-full bg-mint px-7 py-4 text-[15px] font-medium text-abyss transition-colors duration-300 hover:bg-lime disabled:cursor-wait disabled:opacity-60">
                    {status === 'sending' ? 'Enviando…' : 'Quero meu diagnóstico gratuito'}
                    <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <span className="text-[13px] font-light text-ink/40">Resposta em até 24h</span>
                </div>
                {status === 'error' && (
                  <p role="alert" className="border-l border-lime/60 pl-4 text-[14px] font-light leading-relaxed text-ink/75 sm:col-span-2">
                    Não conseguimos enviar agora. Tente de novo em instantes ou escreva direto para{' '}
                    <a href={`mailto:${CONTACT.email}`} className="text-mint underline underline-offset-4">{CONTACT.email}</a>.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 8. RODAPÉ ----------------------------- */
function Footer() {
  const cols = [
    { title: 'Navegação', items: [['Origem', '#origem'], ['Time', '#time'], ['Serviços', '#servicos'], ['Produtos', '#produtos'], ['Contato', '#contato']] },
    { title: 'Redes', items: SOCIAL.filter((s) => s.url).map((s) => [s.label, s.url]) },
    { title: 'Estúdio', items: [['Quer construir com a gente?', '#contato']] },
  ];
  return (
    <footer className="gutter border-t border-white/10">
      <div className="mx-auto max-w-[1320px] pt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-12">
          <p className="col-span-2 max-w-[24ch] text-[22px] font-extralight leading-snug tracking-[-0.02em] text-ink/80 sm:col-span-3 lg:col-span-6">
            Cinco cabeças, <span className="font-serif italic text-mint">uma entrega.</span>
          </p>
          {cols.filter((c) => c.items.length).map((c) => (
            <div key={c.title} className="lg:col-span-2">
              <p className="text-[11px] font-light uppercase tracking-[0.24em] text-ink/40">{c.title}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {c.items.map(([label, href]) => (
                  <li key={label}><a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-[15px] font-light text-ink/70 transition-colors hover:text-mint">{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* assinatura em escala total */}
        <div aria-hidden="true" className="mt-24 flex items-end gap-5 text-ink sm:gap-8">
          <BrandSymbol className="h-[clamp(56px,9vw,180px)] w-[clamp(56px,9vw,180px)]" />
          <Wordmark className="whitespace-nowrap text-[clamp(64px,19.5vw,300px)] leading-[0.78]" />
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 py-8 text-[12px] font-light text-ink/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} ESPtech{COMPANY.cnpj ? ` · CNPJ ${COMPANY.cnpj}` : ''}</span>
          <span>{COMPANY.city}</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <main className="min-h-full overflow-x-hidden">
      <Header />
      <Hero />
      <div className="quiet grain relative">
        <Origin />
        <Team />
        <Services />
        <Products />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

export default App;
