const API_URL = "https://livraria-w0xi.onrender.com";

const livros = [
  {
    codigo: 1,
    titulo: "Livro velho",
    disponiveis: 12,
    autor: "Marcos Oliveira",
    genero: ["Literatura"],
    preco: 39.9,
    paginas: 180,
    publicacao: "2020-03-15",
    vendas: 0,
    source: "/livro1.jpg",
  },
  {
    codigo: 2,
    titulo: "Livro moderno",
    disponiveis: 15,
    autor: "Lucas Martins",
    genero: ["Ficção"],
    preco: 49.9,
    paginas: 220,
    publicacao: "2022-06-10",
    vendas: 0,
    source: "/livro2.jpg",
  },
  {
    codigo: 3,
    titulo: "Xadrez",
    disponiveis: 8,
    autor: "André Costa",
    genero: ["Estratégia"],
    preco: 34.9,
    paginas: 150,
    publicacao: "2021-08-20",
    vendas: 0,
    source: "/livro3.jpg",
  },
  {
    codigo: 4,
    titulo: "Magia",
    disponiveis: 10,
    autor: "Rafael Mendes",
    genero: ["Fantasia"],
    preco: 44.9,
    paginas: 240,
    publicacao: "2023-02-12",
    vendas: 0,
    source: "/livro4.jpg",
  },
  {
    codigo: 5,
    titulo: "Névoa",
    disponiveis: 7,
    autor: "Gabriel Souza",
    genero: ["Mistério"],
    preco: 42.9,
    paginas: 200,
    publicacao: "2024-05-18",
    vendas: 0,
    source: "/livro5.jpg",
  },
  {
    codigo: 6,
    titulo: "Natura",
    disponiveis: 14,
    autor: "Helena Martins",
    genero: ["Natureza"],
    preco: 54.9,
    paginas: 280,
    publicacao: "2022-09-05",
    vendas: 0,
    source: "/livro6.jpg",
  },
  {
    codigo: 7,
    titulo: "Apple",
    disponiveis: 9,
    autor: "Felipe Rocha",
    genero: ["Tecnologia"],
    preco: 59.9,
    paginas: 190,
    publicacao: "2023-11-14",
    vendas: 0,
    source: "/livro7.jpg",
  },
  {
    codigo: 8,
    titulo: "Flow",
    disponiveis: 11,
    autor: "Bruno Almeida",
    genero: ["Desenvolvimento pessoal"],
    preco: 36.9,
    paginas: 160,
    publicacao: "2021-04-22",
    vendas: 0,
    source: "/livro8.jpg",
  },
  {
    codigo: 9,
    titulo: "Mengo",
    disponiveis: 18,
    autor: "Pedro Carvalho",
    genero: ["Esportes"],
    preco: 29.9,
    paginas: 130,
    publicacao: "2020-07-30",
    vendas: 0,
    source: "/livro9.jpg",
  },
  {
    codigo: 10,
    titulo: "Tubarão",
    disponiveis: 6,
    autor: "Eduardo Lima",
    genero: ["Aventura"],
    preco: 47.9,
    paginas: 210,
    publicacao: "2024-01-16",
    vendas: 0,
    source: "/livro10.jpg",
  },
  {
    codigo: 11,
    titulo: "Escultura",
    disponiveis: 5,
    autor: "Camila Ferreira",
    genero: ["Arte"],
    preco: 64.9,
    paginas: 300,
    publicacao: "2023-07-09",
    vendas: 0,
    source: "/livro11.jpg",
  },
  {
    codigo: 12,
    titulo: "Batman",
    disponiveis: 13,
    autor: "Daniel Ribeiro",
    genero: ["Quadrinhos"],
    preco: 69.9,
    paginas: 250,
    publicacao: "2025-02-11",
    vendas: 0,
    source: "/livro12.jpg",
  },
];

async function cadastrarLivros() {
  try {
    console.log("Consultando livros já cadastrados...");

    const resposta = await fetch(`${API_URL}/livros/buscar`);

    let cadastrados = [];

    if (resposta.ok) {
      cadastrados = await resposta.json();
    } else if (resposta.status !== 404) {
      throw new Error(
        `Erro ao consultar livros: ${resposta.status} - ${await resposta.text()}`,
      );
    }

    const codigosExistentes = new Set(
      cadastrados.map((livro) => Number(livro.codigo)),
    );

    for (const livro of livros) {
      if (codigosExistentes.has(livro.codigo)) {
        console.log(`Já existe: ${livro.titulo} (código ${livro.codigo})`);
        continue;
      }

      const resultado = await fetch(`${API_URL}/livros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livro),
      });

      if (!resultado.ok) {
        console.error(
          `Erro ao cadastrar ${livro.titulo}:`,
          resultado.status,
          await resultado.text(),
        );
        continue;
      }

      console.log(`Cadastrado: ${livro.titulo}`);
    }

    console.log("Processo finalizado!");
  } catch (erro) {
    console.error("Falha no processo:", erro.message);
  }
}

cadastrarLivros();
