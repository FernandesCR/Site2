const { Router } = require("express");
const { readdirSync } = require("fs");
const { join } = require("path");
const routes = Router();
const commandsJson = require("../commands.json");
const config = require("../config.json");
const api = require("./services/api");

// Rota Principal
routes.get("/", (req, res) => {
  return res.render("index.html", {
    title: "Jv e um simples bot de música",
    canon: `${config.url}`,
    desc:
      "Venha conhecer um dos melhores e mais completos bot de música do discord!",
  });
});

// Rota para mostrar comandos
routes.get("/commands", async (req, res) => {
  let commands = await api
    .get("/commandList")
    .then((response) => response.data)
    .catch((error) => commandsJson);

  commands.sort((a, b) => (a.name > b.name ? 1 : -1));

  return res.render("commands.html", {
    title: "Comandos do jv",
    canon: `${config.url}/commands`,
    desc:
      "Veja a lista completa de comandos do jv",
    commands: commands,
    total: commands.length,
  });
});

// Convite da Lilly
routes.get("/invite", (req, res) => {
  return res.redirect(
    "https://discord.com/oauth2/authorize?client_id=766808997982371871&permissions=37080128&scope=bot"
  );
});

routes.get("/support", (req, res) => {
  return res.redirect("https://discord.gg/e9cfqPSTK8");
});

routes.get("/community-terms", (req, res) => {
  return res.render("communityTerms.html", {
    title: "Termos de uso",
    canon: `${config.url}/community-terms`,
    desc:
      "Aqui estão todos as regras que devem ser seguidas pela comunidade.",
  });
});

routes.get("/privacy-policy", (req, res) => {
  return res.render("privacyPolicy.html", {
    title: "Políticas de Privacidade",
    canon: `${config.url}/privacy-policy`,
    desc:
      "Veja todas as políticas de privacidade.",
  });
});

routes.get("*", (req, res) => {
  res.status(404).render("404.html", {
    title: "Não encontrei nada por aqui!",
    canon: `${config.url}/404`,
    desc:
      "Eu não encontrei nada por aqui! Tem certeza que você está no lugar certo?",
  });
});

module.exports = routes;
