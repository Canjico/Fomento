'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CatalogIcon } from './catalog-icons';
import { categoryOptions, demoOpportunities, filterDemoOpportunities, formatDate, formatMoney, statusLabels, type DemoFilters, type Opportunity } from '@/lib/demo-edicts';

const initialFilters: DemoFilters = { query: '', status: 'todas', category: 'todas', institution: 'todas', location: 'todas', sort: 'prazo' };
const institutions = [...new Set(demoOpportunities.map((item) => item.institutionAbbreviation))];
const locations = [...new Set(demoOpportunities.map((item) => item.location))];

function SelectFilter({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string)=>void }) {
  return <label className="cat-filter-field"><span>{label}</span><select value={value} onChange={(e)=>onChange(e.target.value)}>{options.map((option)=><option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}

function OpportunityRow({ item }: { item: Opportunity }) {
  return <Link href={`/editais/${item.slug}`} className="cat-opportunity-row" aria-label={`Ver detalhes do edital demonstrativo ${item.title}`}>
    <div className="cat-row-logo" style={{ backgroundColor: item.color }}><span>{item.institutionAbbreviation}</span></div>
    <div className="cat-row-content">
      <span className={`cat-category-tag cat-tag-${item.category.replace(/\s/g,'-').toLowerCase()}`}>{item.category}</span>
      <h3>{item.title}</h3><p className="cat-row-institution">{item.institution}</p>
      <div className="cat-row-meta"><span><CatalogIcon name="pin" size={14}/>{item.location}</span><span><CatalogIcon name="wallet" size={14}/>{formatMoney(item.amount)}</span><span><CatalogIcon name="users" size={14}/>{item.audience}</span></div>
    </div>
    <div className="cat-row-date"><span>{item.status === 'em-breve' ? 'Início previsto' : 'Inscrições até'}</span><strong>{formatDate(item.status === 'em-breve' ? item.opensAt : item.deadline)}</strong><small className={`cat-status-text cat-status-${item.status}`}>{statusLabels[item.status]}</small></div>
    <span className="cat-row-arrow" aria-hidden="true"><CatalogIcon name="arrow" size={21}/></span>
  </Link>;
}

export function CatalogList() {
  const [filters, setFilters] = useState<DemoFilters>(initialFilters);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const filtered = useMemo(()=>filterDemoOpportunities(demoOpportunities, filters), [filters]);
  function update<K extends keyof DemoFilters>(key: K, value: DemoFilters[K]) { setFilters((old)=>({ ...old, [key]: value })); }
  const hasFilters = filters.query || filters.status !== 'todas' || filters.category !== 'todas' || filters.institution !== 'todas' || filters.location !== 'todas';
  return <>
    <section className="cat-banner"><div className="cat-shell cat-banner-inner">
      <div><p className="cat-eyebrow">CATÁLOGO DE OPORTUNIDADES · DEMONSTRAÇÃO</p><h1>Editais que<br/><em>impulsionam ideias.</em></h1><p>Encontre oportunidades de fomento e programas em diversas áreas, com informações claras e organizadas.</p></div>
      <div className="cat-banner-note"><CatalogIcon name="file" size={41}/><strong>Acompanhe prazos,<br/>requisitos e valores<br/>em um só lugar.</strong></div>
      <div className="cat-banner-circle cat-banner-circle-one"/><div className="cat-banner-circle cat-banner-circle-two"/>
    </div></section>
    <section className="cat-shell cat-catalog-panel" aria-label="Busca e listagem de editais">
      <div className="cat-demo-notice"><CatalogIcon name="info" size={17}/><div><strong>Conteúdo demonstrativo.</strong> Os editais, instituições, valores e datas abaixo são fictícios. Nenhum representa uma oportunidade oficial verificada.</div></div>
      <div className="cat-searchbar"><label className="cat-searchfield"><CatalogIcon name="search" size={19}/><span className="cat-visually-hidden">Buscar edital, instituição ou tema</span><input type="search" placeholder="Buscar por edital, instituição, tema ou palavra-chave…" value={filters.query} onChange={(e)=>update('query',e.target.value)} /><CatalogIcon name="search" size={18}/></label><button className="cat-filter-toggle" type="button" aria-expanded={filtersOpen} aria-controls="filtros-editais" onClick={()=>setFiltersOpen(!filtersOpen)}><CatalogIcon name="filter" size={19}/> Filtros</button></div>
      {filtersOpen && <div className="cat-filters-grid" id="filtros-editais">
        <SelectFilter label="Situação" value={filters.status} onChange={(v)=>update('status',v)} options={[{value:'todas',label:'Todas'},...Object.entries(statusLabels).map(([value,label])=>({value,label}))]}/>
        <SelectFilter label="Categoria" value={filters.category} onChange={(v)=>update('category',v)} options={[{value:'todas',label:'Todas'},...categoryOptions.map((x)=>({value:x,label:x}))]}/>
        <SelectFilter label="Instituição" value={filters.institution} onChange={(v)=>update('institution',v)} options={[{value:'todas',label:'Todas'},...institutions.map((x)=>({value:x,label:x}))]}/>
        <SelectFilter label="Localidade" value={filters.location} onChange={(v)=>update('location',v)} options={[{value:'todas',label:'Todas'},...locations.map((x)=>({value:x,label:x}))]}/>
        <SelectFilter label="Ordenação" value={filters.sort} onChange={(v)=>update('sort',v)} options={[{value:'prazo',label:'Prazo mais próximo'}, {value:'valor-maior',label:'Maior valor'}, {value:'valor-menor',label:'Menor valor'}, {value:'nome',label:'Nome A–Z'}]}/>
      </div>}
      <div className="cat-chips" role="group" aria-label="Filtro rápido por categoria"><button aria-pressed={filters.category==='todas'} className={filters.category==='todas'?'cat-chip-active':''} onClick={()=>update('category','todas')}>Todos</button>{categoryOptions.map((category)=><button aria-pressed={filters.category===category} className={filters.category===category?'cat-chip-active':''} key={category} onClick={()=>update('category', filters.category===category ? 'todas':category)}>{category}</button>)}</div>
      <div className="cat-results-top"><div><strong>{filtered.length}</strong> {filtered.length===1?'edital demonstrativo encontrado':'editais demonstrativos encontrados'}</div>{hasFilters && <button type="button" className="cat-clear-filters" onClick={()=>setFilters(initialFilters)}>Limpar filtros <CatalogIcon name="close" size={14}/></button>}<span className="cat-results-order">Ordenar por: <strong>{filters.sort==='prazo'?'Prazo mais próximo':filters.sort==='nome'?'Nome A–Z':filters.sort==='valor-menor'?'Menor valor':'Maior valor'}</strong></span></div>
      {filtered.length ? <div className="cat-results-list">{filtered.map((item)=><OpportunityRow item={item} key={item.id}/>)}</div> : <div className="cat-empty-results"><CatalogIcon name="search" size={30}/><h2>Nenhum edital encontrado</h2><p>Experimente remover um filtro ou usar outra palavra-chave.</p><button type="button" onClick={()=>setFilters(initialFilters)}>Mostrar todos os exemplos</button></div>}
    </section>
    <div className="cat-catalog-bottom-note">Fomentoria · Prévia local do catálogo. Publicação de fontes oficiais e integração com o banco de dados pertencem a etapas futuras.</div>
  </>;
}
