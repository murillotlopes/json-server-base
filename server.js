const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;

const rules = auth.rewriter({
  users: 600, // O usuário deve possuir o recurso para gravar ou ler o recurso
  brinquedos: 664, // O usuário deve estar logado para gravar o recurso. Todos podem ler o recurso
  fichas: 644 // O usuário deve possuir o recurso para gravar o recurso. Todos podem ler o recurso.
});

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port);

console.log("Server is running on port:", port);

/* A senha do Kenzinho é 123456 */
