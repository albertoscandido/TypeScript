import Author from './database/models/AuthorModel';

(async () => {
  const authors = await Author.findAll();
  console.table(authors.map((author) => author.toJSON()));

  process.exit(0);
})();