'use client';
import { useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { CatalogIcon, type CatalogIconName } from './catalog-icons';
import { formatDate, formatMoney, statusLabels, type Opportunity } from '@/lib/demo-edicts';

type DetailTab = 'Visão geral' | 'Requisitos' | 'Linhas temáticas' | 'Documentos' | 'Cronograma' | 'Sobre a instituição';
const tabs: DetailTab[] = ['Visão geral', 'Requisitos', 'Linhas temáticas', 'Documentos', 'Cronograma', 'Sobre a instituição'];
function Fact({ icon, label, value }: { icon: CatalogIconName; label: string; value: string }) {
  return <div className="cat-fact"><CatalogIcon name={icon} size={24}/><div><span>{label}</span><strong>{value}</strong></div></div>;
}
function InfoCard({ title, children }: { title: string; children: React.ReactNode }) { return <section className="cat-detail-section"><h2>{title}</h2>{children}</section>; }

export function DemoOpportunityDetails({ edital }: { edital: Opportunity }) {
  const [tab, setTab] = useState<DetailTab>('Visão geral');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    setTab(tabs[next]);
    tabRefs.current[next]?.focus();
  }
  const [shareMessage, setShareMessage] = useState('');
  async function share() {
    const url = window.location.href;
    try { if (navigator.share) await navigator.share({ title: edital.title, url }); else { await navigator.clipboard.writeText(url); setShareMessage('Link copiado!'); } }
    catch { setShareMessage('Não foi possível compartilhar neste navegador.'); }
  }
  const themes = <div className="cat-accordion-list">{edital.themes.map((value,index)=><details key={value}><summary><span className={`cat-theme-number cat-theme-number-${index%4}`}>{index+1}</span>{value}<CatalogIcon name="chevron" size={17}/></summary><p>Área temática ilustrativa desta oportunidade fictícia. Consulte sempre o edital oficial quando disponível para verificar o regulamento.</p></details>)}</div>;
  const about = <InfoCard title="Sobre o edital"><p>{edital.description}</p><div className="cat-highlight"><span>✳</span><p><strong>Exemplo de uso</strong><br/>As informações exibidas são fictícias e servem exclusivamente para validar a navegação e a interface.</p></div></InfoCard>;
  return <div className="cat-shell cat-detail-page">
    <div className="cat-breadcrumb"><Link href="/editais"><CatalogIcon name="back" size={18}/> Editais</Link><span>›</span><span className="cat-breadcrumb-current">{edital.title}</span></div>
    <div className="cat-demo-notice cat-detail-demo"><CatalogIcon name="info" size={17}/><span><strong>Exemplo fictício.</strong> A instituição, o edital, valores e prazos deste registro não foram verificados em fontes oficiais.</span></div>
    <article className="cat-detail-hero">
      <div className="cat-detail-actionbar"><span className={`cat-status-badge cat-status-badge-${edital.status}`}><span className="cat-status-dot"/>{statusLabels[edital.status]}</span><div className="cat-detail-actions"><button type="button" onClick={share}><CatalogIcon name="share" size={15}/> Compartilhar</button><button type="button" disabled title="Favoritos serão implementados futuramente"><CatalogIcon name="bookmark" size={15}/> Salvar (em breve)</button></div></div>
      <div className="cat-detail-top"><div className="cat-detail-institution-logo" style={{ backgroundColor: edital.color }}>{edital.institutionAbbreviation}</div><div className="cat-detail-title"><h1>{edital.title}</h1><p>{edital.institution}</p><span>{edital.description}</span></div><div className="cat-detail-map"><div className="cat-map-symbol"><CatalogIcon name="globe" size={77}/></div><small>Abrangência</small><strong>{edital.location}</strong></div></div>
      <div className="cat-detail-cta"><button type="button" disabled aria-describedby="cat-unverified-url">Acessar edital oficial <CatalogIcon name="external" size={16}/></button><span id="cat-unverified-url">Não existe link oficial verificado para este edital fictício. Inscrições indisponíveis.</span></div>
      {shareMessage && <p className="cat-share-message" role="status">{shareMessage}</p>}
    </article>
    <div className="cat-tablist" role="tablist" aria-label="Seções do edital">{tabs.map((value)=><button key={value} id={`cat-tab-${tabs.indexOf(value)}`} type="button" role="tab" aria-selected={tab===value} aria-controls="cat-detail-panel" tabIndex={tab===value ? 0 : -1} ref={(el)=>{tabRefs.current[tabs.indexOf(value)] = el;}} onKeyDown={(event)=>onTabKeyDown(event, tabs.indexOf(value))} onClick={()=>setTab(value)}>{value}</button>)}</div>
    <div className="cat-detail-columns">
      <aside className="cat-detail-facts" aria-label="Ficha técnica do edital">
        <Fact icon="calendar" label="Inscrições até" value={formatDate(edital.deadline)}/>
        <Fact icon="wallet" label="Valor total" value={formatMoney(edital.amount)}/>
        <Fact icon="users" label="Público-alvo" value={edital.audience}/>
        <Fact icon="file" label="Formato de submissão" value={edital.submission}/>
        <Fact icon="folder" label="Categoria" value={edital.category}/>
        <Fact icon="pin" label="Localização" value={edital.location}/>
      </aside>
      <div id="cat-detail-panel" className="cat-detail-content" role="tabpanel" aria-labelledby={`cat-tab-${tabs.indexOf(tab)}`}>
        {tab === 'Visão geral' && <>{about}<InfoCard title="Linhas temáticas">{themes}</InfoCard></>}
        {tab === 'Requisitos' && <InfoCard title="Requisitos de participação"><p>Itens de demonstração, não substituem um regulamento.</p><ul className="cat-detail-checklist">{edital.eligibility.map((x)=><li key={x}><CatalogIcon name="check" size={17}/>{x}</li>)}</ul></InfoCard>}
        {tab === 'Linhas temáticas' && <InfoCard title="Linhas temáticas">{themes}</InfoCard>}
        {tab === 'Documentos' && <InfoCard title="Documentos necessários"><p>Lista fictícia para prévia da experiência.</p><ul className="cat-detail-checklist">{edital.requiredDocuments.map((x)=><li key={x}><CatalogIcon name="file" size={18}/>{x}</li>)}</ul></InfoCard>}
        {tab === 'Cronograma' && <InfoCard title="Cronograma"><ol className="cat-timeline">{edital.timeline.map((entry)=><li key={entry.label}><span>{entry.date}</span><strong>{entry.label}</strong></li>)}</ol></InfoCard>}
        {tab === 'Sobre a instituição' && <InfoCard title="Instituição responsável"><p><strong>{edital.institution}</strong></p><p>Nome fictício usado apenas para o protótipo. Nenhuma associação institucional ou parceria é alegada.</p></InfoCard>}
      </div>
    </div>
    <section className="cat-institution-card"><h2>Instituição responsável</h2><div className="cat-institution-body"><div className="cat-institution-mini" style={{backgroundColor:edital.color}}>{edital.institutionAbbreviation}</div><div><strong>{edital.institution}</strong><p>Entidade fictícia para demonstração. Referências oficiais serão cadastradas por administradores em uma etapa futura.</p></div><button type="button" disabled>Site oficial indisponível <CatalogIcon name="external" size={15}/></button></div></section>
    <Link href="/editais" className="cat-back-bottom"><CatalogIcon name="back" size={17}/> Voltar ao catálogo</Link>
  </div>;
}
