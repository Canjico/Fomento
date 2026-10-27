/**
 * Componente de apresentação para o futuro shell administrativo.
 * Não é montado em nenhuma rota: autenticação e autorização pertencem ao Bloco C.
 */
export function AdminShellPreview() {
  return (
    <section className="admin-preview" aria-label="Prévia conceitual da estrutura administrativa">
      <aside className="admin-preview__sidebar" aria-label="Áreas planejadas, indisponíveis">
        <p className="admin-preview__brand">fomentoria · estrutura</p>
        <ul>
          <li>Visão editorial — futuro</li>
          <li>Revisões — futuro</li>
          <li>Histórico — futuro</li>
        </ul>
      </aside>
      <div className="admin-preview__content">
        <h2>Administração em planejamento</h2>
        <p>Prévia estrutural sem sessão, dados, botões de publicação ou acesso funcional.</p>
      </div>
    </section>
  );
}
