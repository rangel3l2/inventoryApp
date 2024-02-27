export interface Departamento {
  id: number;
  nome: string;
  sigla: string;
  descricao: string;
  responsabilidades: string[];
}
export const departamentos: Departamento[] = [
    {
      id: 1,
      nome: "Diretoria",
      sigla: "DIR",
      descricao: "Responsável pela gestão estratégica da empresa.",
      responsabilidades: [
        "Definição da visão, missão e valores da empresa.",
        "Criação e implementação do planejamento estratégico.",
        "Gestão dos recursos financeiros da empresa.",
        "Tomada de decisões estratégicas.",
      ],
    },
    {
      id: 2,
      nome: "Recursos Humanos",
      sigla: "RH",
      descricao: "Responsável pela gestão de pessoas da empresa.",
      responsabilidades: [
        "Recrutamento e seleção de novos colaboradores.",
        "Treinamento e desenvolvimento de colaboradores.",
        "Gestão de benefícios e folha de pagamento.",
        "Manutenção do clima organizacional.",
      ],
    },
    {
      id: 3,
      nome: "Finanças",
      sigla: "FIN",
      descricao: "Responsável pela gestão financeira da empresa.",
      responsabilidades: [
        "Controle de receitas e despesas.",
        "Elaboração de orçamentos e previsões financeiras.",
        "Gestão do caixa e dos investimentos.",
        "Análise de indicadores financeiros.",
      ],
    },
    {
      id: 4,
      nome: "Marketing",
      sigla: "MKT",
      descricao: "Responsável pela promoção e venda dos produtos e serviços da empresa.",
      responsabilidades: [
        "Criação e implementação de campanhas de marketing.",
        "Gestão da marca da empresa.",
        "Pesquisa de mercado.",
        "Análise de dados de marketing.",
      ],
    },
    {
      id: 5,
      nome: "Vendas",
      sigla: "VEND",
      descricao: "Responsável pela venda dos produtos e serviços da empresa.",
      responsabilidades: [
        "Prospecção de novos clientes.",
        "Negociação e venda de produtos e serviços.",
        "Atendimento ao cliente.",
        "Gestão da carteira de clientes.",
      ],
    },
    {
      id: 6,
      nome: "Produção",
      sigla: "PROD",
      descricao: "Responsável pela produção dos produtos da empresa.",
      responsabilidades:
      [
        "Planejamento e controle da produção.",
        "Gestão de estoque de matéria-prima e produtos acabados.",
        "Manutenção de máquinas e equipamentos.",
        "Garantia da qualidade dos produtos.",
      ],
    },
    {
      id: 7,
      nome: "Tecnologia da Informação",
      sigla: "TI",
      descricao: "Responsável pela infraestrutura de TI da empresa.",
      responsabilidades:
      [
        "Gestão de redes e sistemas.",
        "Suporte técnico aos colaboradores.",
        "Desenvolvimento de software.",
        "Garantia da segurança da informação.",
      ],
    },
    {
      id: 8,
      nome: "Logística",
      sigla: "LOG",
      descricao: "Responsável pela distribuição dos produtos da empresa.",
      responsabilidades:
      [
        "Gestão de armazéns e transporte.",
        "Planejamento de rotas de entrega.",
        "Controle de estoque de produtos acabados.",
        "Garantia da entrega dos produtos no prazo.",
      ],
    },
    {
      id: 9,
      nome: "Jurídico",
      sigla: "JUR",
      descricao: "Responsável pela assessoria jurídica da empresa.",
      responsabilidades:
      [
        "Elaboração e análise de contratos.",
        "Assessoria em questões jurídicas.",
        "Representação da empresa em processos judiciais.",
        "Garantia da conformidade da empresa com a legislação.",
      ],
    },
  ];
  