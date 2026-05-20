import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    year: Int
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
    author(id: ID!): Author
  }

  type Mutation {
    createBook(title: String!, authorId: ID!, year: Int): Book!
    createAuthor(name: String!): Author!
  }
`;

const authors = [
  { id: '1', name: 'Агата Кристи' },
  { id: '2', name: 'Артур Конан Дойл' },
  { id: '3', name: 'Даниэль Дефо' },
  { id: '4', name: 'Эдгар Аллан По' },
  { id: '5', name: 'Джон Диксон Карр' },
];

const books = [
  { id: '1', title: 'Убийство в Восточном экспрессе', authorId: '1', year: 1934 },
  { id: '2', title: 'Десять негритят', authorId: '1', year: 1939 },
  { id: '3', title: 'Собака Баскервилей', authorId: '2', year: 1902 },
  { id: '4', title: 'Этюд в багровых тонах', authorId: '2', year: 1887 },
  { id: '5', title: 'Знак четырёх', authorId: '2', year: 1890 },
  { id: '6', title: 'Молли Магуайрс', authorId: '3', year: 1722 },
  { id: '7', title: 'Убийство на улице Морг', authorId: '4', year: 1841 },
  { id: '8', title: 'Золотой жук', authorId: '4', year: 1843 },
  { id: '9', title: 'Тайна Жёлтой комнаты', authorId: '5', year: 1907 },
];

const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find(b => b.id === id),
    authors: () => authors,
    author: (_, { id }) => authors.find(a => a.id === id),
  },
  Book: {
    author: (parent) => authors.find(a => a.id === parent.authorId),
  },
  Author: {
    books: (parent) => books.filter(b => b.authorId === parent.id),
  },
  Mutation: {
    createBook: (_, { title, authorId, year }) => {
      const newBook = {
        id: String(books.length + 1),
        title,
        authorId,
        year: year || null,
      };
      books.push(newBook);
      return newBook;
    },
    createAuthor: (_, { name }) => {
      const newAuthor = {
        id: String(authors.length + 1),
        name,
      };
      authors.push(newAuthor);
      return newAuthor;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🕵️ Детективный GraphQL сервер готов: ${url}`);
