# ORM TypeScript e PostgreSQL

Uma simples aplicação de controle de estoque, utilizando ORM e o banco de dados PostgreSQL.

## Documentação da API

#### Cadastra um novo Produto

```http
  POST /produtos
```

#### Retorna todos os Produtos

```http
  GET /produtos
```

#### Retorna um Produto

```http
  GET /produtos/idProduto
```

#### Atualiza um Produto

```http
  PUT /produtos/idProduto
```

#### Remove um Produto

```http
  DELETE /produtos/idProduto
```

#### Retorna o nível de estoque de todos os Produtos

```http
  GET /produtos/verificar
```

#### Retorna o nível de estoque de todos os Produtos

```http
  GET /produtos/verificar
```

#### Retorna o nível de estoque de todos os Produtos

```http
  GET /produtos/verificar
```

#### Retorna o inventario de todos os Produtos cadastrados

```http
  GET /produtos/inventario
```

#### Retorna o inventario de um Produto cadastrado

```http
  GET /produtos/inventario/idProduto
```

#### Aumenta o estoque de um Produto cadastrado

```http
PUT /aumentar-estoque/idProduto
```

#### Diminui o estoque de um Produto cadastrado

```http
PUT /diminuir-estoque/idProduto
```

## Autor

- [@Ramonsouzadasilva](https://github.com/Ramonsouzadasilva)

## Stack utilizada

**Back-end:** Node, Express, TypeScript
