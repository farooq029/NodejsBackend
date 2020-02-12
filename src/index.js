var fastify = require("fastify");
var { Client } = require("pg");
var fastifyCors = require("fastify-cors");
const server = fastify({ logger: true });
const client = new Client({
  connectionString: process.env.DATABASE
});

server.register(fastifyCors, {});

server.get("/", async (request, reply) => {
  const sql = "SELECT *FROM portfolio";
  const result = await client.query(sql);
  reply.send(result.rows);
});

server.listen(8080);
client.connect();
