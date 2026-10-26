export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-5 px-6 py-16">
      <p className="text-sm font-semibold tracking-wide uppercase">Fundação local · Bloco A</p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Fomentoria</h1>
      <p className="max-w-xl text-lg leading-relaxed">
        Ambiente técnico em preparação. O catálogo, a administração e os recursos para clientes
        serão desenvolvidos em blocos posteriores, após seus respectivos aceites.
      </p>
      <p className="text-sm opacity-75" role="status">Nenhum edital ou serviço de inscrição está disponível neste ambiente.</p>
    </main>
  );
}
