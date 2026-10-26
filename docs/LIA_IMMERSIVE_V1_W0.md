# LIA Immersive Experience V1 — W0

Data: 2026-10-26 (America/Sao_Paulo).
Estado: auditoria inicial; implementação e aceitação visual pendentes.

## Base e isolamento

- Repositório: `atlashub-digital/levelab-frontend`.
- Branch de origem: `feat/levelab-v2-catalog-20261026`.
- HEAD confirmado via `git ls-remote` e GitHub Commits API: `8e0f7ae864f7a5269509a3fa644840ee1173a141`.
- Branch desta missão: `feat/lia-immersive-v1-20261026`, criada exatamente nesse SHA num clone separado.
- O checkout preexistente em `Downloads/WorkSpace_Claude/LeveLab/repos/levelab-frontend` permanece em `feat/levelab-visual-v2`, SHA abreviado `cd5a94c`, sem alterações observadas no início da auditoria. Não foi alterado.
- `main`, DNS, checkout comercial e produção não são alvos desta missão. O PR deve ter a branch de origem como base.

## PRs e sinais de escrita concorrente

Consulta ao GitHub encontrou três PRs abertos, todos DRAFT:

| PR | Branch | Escopo a preservar |
| --- | --- | --- |
| [#6](https://github.com/atlashub-digital/levelab-frontend/pull/6) | `feat/aro-v1-integration-20261015` | Checkout ARO e acesso; não ativar nem alterar nesta missão. |
| [#5](https://github.com/atlashub-digital/levelab-frontend/pull/5) | `content/levelab-amf-staging-20261014` | Ingestão editorial AMF. |
| [#4](https://github.com/atlashub-digital/levelab-frontend/pull/4) | `docs/lia-levelab-reconciliation-20261014` | Reconciliação documental. |

Os sete commits recentes exclusivos do catálogo V2 consultados têm autoria GitHub `atlashub-digital`; o último foi registado em 2026-10-26T05:22:06Z. O histórico anterior inclui `iahub360-stack`. São sinais de autoria, não prova de escritores simultâneos. A lista de chats disponível não revelou outra sessão ativa deste repositório; não permite excluir agentes externos. Não houve contacto com outros chats. Reconfirmar o HEAD remoto antes de integrar alterações; não fazer force-push.

## Entrada canónica em falta

O pacote referido na missão não está acessível nesta conversa. A procura por nomes em Downloads, Documents e projetos locais do Codex não encontrou `02_SCENE_MANIFEST.json` nem `01_lia_portal_REFERENCE_CANONICAL.png`; também não foram encontrados no checkout da base. Existem outras imagens LIA em Downloads, mas não foram assumidas como maquete aprovada.

Foi solicitado o caminho local ou link do pacote. Antes de W1, ler todos os seus ficheiros, abrir a imagem canónica, inventariar os assets e registar SHA256. A composição, os recortes da personagem, os URLs oficiais, o convite e as capas não devem ser reconstruídos por suposição.

Requisitos já explícitos na missão:

| Porta | Paleta obrigatória |
| --- | --- |
| EspelhoMeu | Rosa/pêssego claro |
| Me Sentir Leve | Verde profundo |
| Corpo | Marfim e areia |
| Mente & Calma | Verde sálvia |

Exatamente três livros: **Tomei Mounjaro. E Agora?**, **Corpo Forte — Além da Balança**, **Eu Sou Bela Do Meu Jeito**. **O Meu Corpo em Construção** integra Corpo Forte e não ocupa um quarto lugar. O catálogo contém os dois primeiros títulos; não foi encontrada uma entrada para o terceiro nos ficheiros de catálogo inspecionados.

## Runtime e integrações auditados

| Área | Evidência na base | Consequência |
| --- | --- | --- |
| Stack | `package.json`: Next `^16.0.0`, React/React DOM `^19.0.0`, TypeScript `^5.7.0`. | React Three Fiber 9, Three, Drei e GSAP ainda não são dependências. Resolver versões e documentação antes de implementar. |
| Layout | `app/[locale]/layout.tsx` inclui navegação e rodapé globais. | A experiência precisa de composição própria para evitar navegação duplicada, preservando as restantes páginas e locales. |
| LIA | `app/[locale]/lia/page.tsx` inclui `LiaChat` em `#conversar`. | Existe uma superfície reutilizável; não existe lobby tridimensional nesta base. |
| Proxy | `app/api/lia/chat/route.ts`: browser → servidor → `${LIA_API_URL}/api/v1/chat`, com `x-lia-service-token`. | Reutilizar o proxy. `LIA_API_URL` e `LIA_SERVICE_TOKEN` permanecem exclusivamente no servidor. Não copiar segredos do ambiente de produção. |
| Contrato | POST `{ message, history }`; limite de 2000 caracteres, 12 turnos; retorno `{ reply, action }`. | Preservar o contrato existente; validar respostas antes de as apresentar. |
| Erros | Proxy devolve 400, 429, 502, 503 e 504; timeout de upstream de 55 s. | Testar cada estado. O limitador em memória é por instância, não uma garantia global. |
| Demonstração indevida | `lib/lia/transport.ts`: resposta 503 executa `this.fallback.stream(...)` em `MockLiaTransport`; 429 também chega a `onDone` com texto local. | Eliminar a geração demonstrativa em runtime e distinguir erro de serviço de mensagem da assistente. Não inserir erros no histórico enviado ao Core. |
| Voz/anexos | `components/lia/LiaChat.tsx` tem botões Mic/Paperclip sem handlers; não foi encontrado fluxo de SpeechRecognition/getUserMedia nesse chat. | Não apresentar capacidades falsas. Preparar voz com suporte, consentimento explícito e texto disponível; ativação só após verificação real. |
| Redes | `config/site.ts`: Instagram, YouTube, LinkedIn e Spotify usam `href: '#'`. | Substituir apenas pelos destinos oficiais do manifesto; verificar respostas e destinos. |
| Comunidade | `getLiaLaunchGroupUrl()` usa `NEXT_PUBLIC_LIA_LAUNCH_GROUP_URL`, caso contrário null. | Falta reconciliar com o convite canónico. Não inventar convite ou QR. |
| Conteúdo | Rotas de Corpo Forte e Tomei Mounjaro existem; Reader e catálogo têm contratos próprios. | Manter o acesso premium e todos os gates comerciais; a navegação imersiva não concede direitos. |
| CI | `.github/workflows/ci.yml`: install, typecheck, build. `package.json` ainda contém `next lint`. | Não assumir que o script de lint valida Next 16. Não há suíte de interação declarada. |

O único check de GitHub retornado para o SHA base na consulta inicial foi **Vercel Preview Comments**, concluído com sucesso. Isso não comprova testes de runtime, fidelidade, acessibilidade ou disponibilidade de LIA Core.

## Plano de implementação e aceitação

### W1 — lobby

Após leitura do pacote: registar coordenadas e proporções da composição, aprovar correspondência com a referência em desktop e criar composição mobile própria. LIA, livros, quatro portas, topo e comunidade devem ter ações reais. Todos os elementos interativos recebem foco visível, nome acessível e alvo táctil adequado. Não publicar links provisórios.

### W2 — cena e navegação

Carregar o canvas apenas no cliente e de forma diferida. Construir geometria com espessura nos arcos, planos de profundidade, chão, luz e salas atrás das portas. Usar movimento real da câmara por GSAP através do plano do arco; não animar uma fotografia para simular a travessia. Evitar render contínuo quando a cena estiver imóvel, limitar DPR e sombras para dispositivos de menor capacidade e libertar recursos ao desmontar.

Representar a sala selecionada numa rota Next sob a área LIA, com estado coerente entre URL, histórico e câmara. Acesso direto deve abrir a sala correta; Voltar/Avançar e saída para o lobby devem ser verificados. Cancelar tweens ao navegar, desmontar ou mudar preferências. Disponibilizar navegação HTML completa antes do canvas e quando WebGL falhar, incluindo perda de contexto. Respeitar `prefers-reduced-motion` e teclado.

### W3 — chat

Balão junto de LIA visível em hover/foco, acionável por clique/toque. Abertura com gestão de foco, Escape, encerramento e retorno do foco. Mensagens de serviço em região de estado/alerta separada das respostas reais. Cobrir indisponibilidade, limite, timeout, resposta inválida, cancelamento e nova tentativa. Impedir respostas tardias após reset/desmontagem. Não enviar a saudação editorial como resposta do Core.

Preparar entrada de voz sem ativação automática: deteção de suporte e contexto seguro, explicação do uso do microfone, ação explícita, tratamento de recusa, cancelamento e revisão da transcrição antes de enviar. Manter a funcionalidade desligada se não houver prova de funcionamento no dispositivo alvo.

### W4 — evidência exigida

- Testes de build e TypeScript do SHA exato entregue; corrigir e repetir apenas após alterações pertinentes.
- Testes de URL direta, quatro portas, Voltar/Avançar, refresh, links de livros/topo/redes/comunidade e ausência de 404.
- Contrato do proxy com upstream controlado: sucesso e erros, nenhum segredo no cliente, nenhum fallback demonstrativo. Identificar testes simulados como tais.
- Teste real de LIA Core em preview com configuração autorizada; não confundir mocks com validação real.
- Desktop 1440×900 e mobile 390×844/360×800; orientação, overflow, toque, teclado, foco, contraste, reduced motion, sem WebGL e perda de contexto.
- Screenshots novos de lobby e salas, desktop/mobile, comparados com a maquete. Os screenshots históricos em `docs/screenshots` não são evidência desta missão.
- Gravação das quatro travessias e navegação de retorno; relatório de acessibilidade e medições de performance com dispositivo, condições e limitações.
- Preview isolado do SHA do PR, sem promover produção nem mudar domínios. Reconfirmar o estado dos writers e do HEAD base antes de integração.

## Estado da entrega

Este PR prepara W0. Não implementa o lobby, salas ou correções do chat; não altera runtime. W1–W4 permanecem pendentes do pacote canónico e da implementação subsequente. Preview funcional da experiência, novas capturas e gravações ainda não existem. Não considerar a missão concluída com um check de deploy verde.
