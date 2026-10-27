import { SiteHeader } from "@/components/shells/site-header";
import { SiteFooter } from "@/components/shells/site-footer";
import { ActionLink, SectionEyebrow, StatusLabel } from "@/components/ui/primitives";

const steps = [
  { number: "01", title: "Descobrir", description: "Encontrar oportunidades em uma lista organizada, sem perder tempo entre diferentes fontes." },
  { number: "02", title: "Entender", description: "Comparar informações essenciais e identificar os requisitos com mais clareza." },
  { number: "03", title: "Ir à origem", description: "Conferir condições e realizar a inscrição diretamente na página oficial responsável." },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <section className="hero site-container" aria-labelledby="hero-title">
          <div className="hero__copy">
            <SectionEyebrow>Fundação local · Bloco B</SectionEyebrow>
            <h1 id="hero-title">Onde a <em>inovação</em> encontra recurso<span className="hero__period">.</span></h1>
            <p className="hero__lead">A Fomentoria está preparando um jeito mais claro de descobrir e acompanhar oportunidades de fomento. A plataforma ainda está em construção.</p>
            <div className="hero__actions">
              <ActionLink href="/#como-funciona">Conheça a proposta <span aria-hidden="true">↗</span></ActionLink>
              <a className="text-link" href="/#catalogo">Ver situação do catálogo <span aria-hidden="true">↓</span></a>
            </div>
            <StatusLabel>Ambiente de demonstração local</StatusLabel>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__visual-head">PERSPECTIVA / 001</div>
            <div className="hero__visual-symbol">f<span>.</span></div>
            <div className="hero__visual-bottom"><span>IDEIAS EM MOVIMENTO</span><span>2026 / LOCAL</span></div>
          </div>
        </section>

        <section className="principles-band" id="sobre" aria-labelledby="principles-title">
          <div className="site-container principles-grid">
            <div className="principles-heading">
              <SectionEyebrow>O projeto</SectionEyebrow>
              <h2 id="principles-title">Menos ruído. Mais direção.</h2>
            </div>
            <p>Uma experiência pensada para conectar iniciativas inovadoras a editais, chamadas e programas — sempre com transparência sobre a fonte original das informações.</p>
          </div>
        </section>

        <section className="steps site-container" id="como-funciona" aria-labelledby="steps-title">
          <div className="section-heading">
            <div>
              <SectionEyebrow>Como vai funcionar</SectionEyebrow>
              <h2 id="steps-title">Da ideia à oportunidade, sem complicação.</h2>
            </div>
            <p>Etapas previstas para as próximas versões. Ainda não são funcionalidades disponíveis.</p>
          </div>
          <ol className="steps-grid">
            {steps.map((step) => (
              <li className="step" key={step.number}>
                <span className="step__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="catalogue-wrap" id="catalogo" aria-labelledby="catalogue-title">
          <div className="site-container">
            <div className="section-heading section-heading--catalogue">
              <div>
                <SectionEyebrow>Catálogo de oportunidades</SectionEyebrow>
                <h2 id="catalogue-title">Editais em breve.</h2>
              </div>
              <p>O catálogo real, a busca e os filtros serão disponibilizados em etapas posteriores do projeto.</p>
            </div>
            <div className="catalogue-table" aria-label="Estado atual do catálogo">
              <div className="catalogue-table__heading" aria-hidden="true">
                <span>Oportunidade</span><span>Categoria</span><span>Prazo</span>
              </div>
              <div className="catalogue-empty" role="status">
                <div className="catalogue-empty__symbol" aria-hidden="true">—</div>
                <div>
                  <h3>Nenhum edital disponível no momento.</h3>
                  <p>Esta é uma prévia visual, sem oportunidades fictícias ou inscrições simuladas. Quando o catálogo estiver pronto, as oportunidades serão exibidas em linhas.</p>
                </div>
                <span className="catalogue-empty__mark" aria-hidden="true">00</span>
              </div>
            </div>
            <p className="source-note"><span aria-hidden="true">ⓘ</span> Quando houver editais publicados, consulte sempre a fonte oficial para confirmar informações, prazos e critérios.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
