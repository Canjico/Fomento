import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FeedbackState, InfoChip, TextField } from "@/components/ui/primitives";

describe("design system — estados semânticos", () => {
  it("marca carregamento como ocupado e anuncia o estado", () => {
    const markup = renderToStaticMarkup(createElement(FeedbackState, {
      kind: "loading",
      title: "Carregando oportunidades",
      description: "Aguarde a atualização da lista",
    }));
    expect(markup).toContain('role="status"');
    expect(markup).toContain('aria-busy="true"');
    expect(markup).toContain("Carregando oportunidades");
  });

  it("erro tem anúncio assertivo e vazio não simula dados", () => {
    const error = renderToStaticMarkup(createElement(FeedbackState, {
      kind: "error",
      title: "Lista indisponível",
      description: "Não foi possível buscar oportunidades",
    }));
    const empty = renderToStaticMarkup(createElement(FeedbackState, {
      kind: "empty",
      title: "Nenhum edital",
      description: "Nenhum resultado disponível",
    }));
    expect(error).toContain('role="alert"');
    expect(empty).toContain('role="status"');
    expect(empty).not.toContain('aria-busy="true"');
  });

  it("chip e campo possuem conteúdo e rótulos sem ação fictícia", () => {
    const chip = renderToStaticMarkup(createElement(InfoChip, { tone: "accent" }, "Tecnologia"));
    const field = renderToStaticMarkup(createElement(TextField, {
      id: "pesquisa",
      label: "Buscar editais",
      hint: "Disponível futuramente",
      disabled: true,
    }));
    expect(chip).toContain("info-chip--accent");
    expect(chip).not.toContain("<button");
    expect(field).toContain('for="pesquisa"');
    expect(field).toContain('disabled=""');
    expect(field).toContain('aria-describedby="pesquisa-hint"');
  });
});
