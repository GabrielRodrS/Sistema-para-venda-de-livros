DROP TABLE IF EXISTS pedido CASCADE;
DROP TABLE IF EXISTS carrinho CASCADE;
DROP TABLE IF EXISTS pesquisa CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;

CREATE TABLE IF NOT EXISTS livro (
    codigo INTEGER PRIMARY KEY,
    titulo VARCHAR(100),
    disponiveis INTEGER,
    autor VARCHAR(100),
    genero TEXT[],
    preco FLOAT,
    paginas INTEGER,
    publicacao DATE,
    vendas INTEGER,
    source VARCHAR(100) -- diretório do livro
);


INSERT INTO livro (codigo, titulo, disponiveis, autor, genero, preco, paginas, publicacao, vendas, source)
VALUES
    (11, 'Filosofia', 7, 'Piton', ARRAY['Filosofia'], 273.99, 364, '2014-01-29', 2, '/livro11.jpg'),
    (12, 'Bat', 27, 'DesCe', ARRAY['Graphic Novel/HQs', 'Fantasia', 'Romance'], 114.99, 178, '2025-03-12', 5, '/livro12.jpg'),
    (10, 'Tubarão', 2, 'Kids', ARRAY['Infantil'], 12.99, 80, '2023-03-13', 11, '/livro10.jpg'),
    (1, 'Livro Mofado', 12, 'Robson', ARRAY['Biografia'], 14.99, 97, '2022-09-25', 5, '/livro1.jpg'),
    (7, 'Apple', 6, 'Steve Jobs', ARRAY['Biografia', 'História', 'Ficção Científica'], 67.99, 189, '2016-01-03', 6, '/livro7.jpg'),
    (8, 'Flow', 16, 'Flow', ARRAY['História', 'Fantasia', 'Aventura e Ação', 'Infantil'], 62.99, 149, '2020-06-13', 18, '/livro8.jpg'),
    (4, 'Receitas', 3, 'Le Blanc', ARRAY['Suspense', 'Religioso'], 21.59, 205, '2019-03-19', 5, '/livro4.jpg'),
    (5, 'Segredos', 14, 'Claudemir Mínimo', ARRAY['Suspense', 'Terror', 'História'], 67.99, 165, '2018-11-02', 6, '/livro5.jpg'),
    (6, 'Plantas', 24, 'Zóio', ARRAY['Ciência e Tecnologia', 'História'], 67.99, 123, '2025-03-05', 4, '/livro6.jpg'),
    (3, 'Xadrez', 100, 'Deschk', ARRAY['História', 'Religioso'], 34.59, 217, '2024-03-19', 7, '/livro3.jpg'),
    (9, 'Flamengo', 16, 'Gabigol', ARRAY['História', 'Biografia'], 104.99, 259, '2022-08-13', 5, '/livro9.jpg'),
    (2, 'Livro Rústico', 21, 'Renata', ARRAY['Poesia', 'Filosofia'], 24.99, 122, '2025-01-19', 11, '/livro2.jpg');

CREATE TABLE IF NOT EXISTS usuario (
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100) UNIQUE PRIMARY KEY,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS pesquisa (
    id SERIAL PRIMARY KEY,
    texto VARCHAR(200),
    data DATE,
    "usuarioEmail" VARCHAR(100) NOT NULL,
    CONSTRAINT fk_pesquisa_usuario FOREIGN KEY ("usuarioEmail") REFERENCES usuario(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS carrinho (
    idCarrinho SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    preco FLOAT,
    quantidade INTEGER,
    source VARCHAR(100),
    "usuarioEmail" VARCHAR(100),
    "livroCodigo" INTEGER,
    CONSTRAINT fk_carrinho_usuario FOREIGN KEY ("usuarioEmail") REFERENCES usuario(email) ON DELETE CASCADE,
    CONSTRAINT fk_carrinho_livro FOREIGN KEY ("livroCodigo") REFERENCES livro(codigo) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS pedido (
    idPedido SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    preco FLOAT,
    codigo INTEGER,
    paginas INTEGER,
    autor VARCHAR(100),
    data DATE,
    quantidade INTEGER,
    status VARCHAR(100),
    source VARCHAR(100),
    genero TEXT[],
    "usuarioEmail" VARCHAR(100),
    "livroCodigo" INTEGER,
    CONSTRAINT fk_pedido_usuario FOREIGN KEY ("usuarioEmail") REFERENCES usuario(email) ON DELETE CASCADE,
    CONSTRAINT fk_pedido_livro FOREIGN KEY ("livroCodigo") REFERENCES livro(codigo) ON DELETE SET NULL
);
