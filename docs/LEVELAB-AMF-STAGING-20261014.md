# LeveLab — AMF staging / ingestão editorial (14 out 2026)

**Estado desta branch: apenas documentação de handoff, sem alteração de runtime, sem ficheiros de conteúdo publicados e sem autorização de venda.**

## Escopo (2 SKUs / 3 materiais)
- Força na Caneta — e-book v2.1 (38 páginas), 7 dias, 10 receitas, master Markdown humano.
- Corpo Forte Premium — Guia v2.0 (105 páginas), Workbook v2.0 (77 páginas); Markdown integral extraído com proveniência por página, a corrigir por copydesk.
- Produto bundle só mediante aprovação.

## Fontes canónicas
- Força na Caneta: https://drive.google.com/drive/folders/1xlnFuJrFZOwk_A2_ql8ZPBZFj74Ilh45
- Corpo Forte: https://drive.google.com/drive/folders/10Vwg2yk5vKakJHIhSO0NPwwZvjQmft1a
- Portfólio, QA e gates: https://docs.google.com/document/d/11VvGVSYnMOnIKf_mHnMKnGXorZdPuBnsvi38AWD8ZpM/edit

Pacotes de transferência produzidos nesta sessão (não comitados neste PR):
- LeveLab_AMF_PORTFOLIO_SOURCE_CANDIDATE_20261014.zip
- LeveLab_AMF_forca_na_caneta_SOURCE_CANDIDATE_20261014.zip
- LeveLab_AMF_corpo_forte_SOURCE_CANDIDATE_20261014.zip

O ZIP combinado tem 60 ficheiros enumerados com SHA-256. O draft de ContentManifest v0.2 contém 10 Publications, 1 Collection e 2 Programs (FNC: jornada de 7 dias; Corpo Forte: 8 módulos). Nenhum material premium está publicado; todos os statuses são draft e não há MediaAssets de uso comercial.

## Contrato de ingestão
Seguir a integração existente no Golden Pilot EspelhoMeu:
- @atlashub-digital/amf-content-schema@0.2.0
- @atlashub-digital/amf-experience-core@0.2.1
- SOURCE -> content:sync -> validate:content -> test/build -> Preview -> browser QA -> autorização humana.

**A estrutura JSON passou apenas em validação local de sintaxe/referências/hashes.** O Schema real, a Experience Core e o browser NÃO foram executados aqui. Não afirmar READY FOR AMF INGESTION final até passes reais.

## Plano de integração para Codex/Claude
- [ ] Colocar sources e hashes no Content Lab sob caminhos canónicos, mantendo IDs de produto/edição.
- [ ] Adaptar o conversor de Markdown; não codificar claims em componentes React.
- [ ] Validar manifesto com o package Schema 0.2.0 real; corrigir erros apenas depois de ler contrato.
- [ ] Validar o Program Corpo Forte de 8 units kind=module já incluído no manifesto; garantir navegação para capítulos individuais.
- [ ] Integrar preview em branch PR draft, sem merge, e fazer testes 1440/390px e links.
- [ ] Verificar gating de acesso para premium; não expor conteúdo da Publication draft.
- [ ] Registar screenshots, logs e SHA, separando QA técnico de QA comercial.

## Bloqueadores de SALES READY
- [ ] Nutricionista valida sete dias + dez receitas, conservações e alegações GLP-1.
- [ ] Saúde/movimento revisam Guia e Workbook Corpo Forte; corrigir referências científicas, QR placeholders e edição 1.1.
- [ ] Confirmar licenças de fotografias; completar arte final e PDF acessível.
- [ ] Copydesk integral e revisão de paginação nas três obras.
- [ ] Preço, fornecedor, termos, arrependimento, LGPD, entrega, checkout, recibo, access/reembolso, suporte, testes E2E.
- [ ] Aprovação documentada do responsável de conteúdo e comercial.

**Nota:** levelab.org já está em produção; lia.doctor não tem site. Não modificar DNS, secrets, database, checkouts ou produção nesta branch. **Não importar Produtos-Farma.**
