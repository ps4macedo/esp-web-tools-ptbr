#!/usr/bin/env node
// translate.js  –  converte todas as strings visíveis para PT‑BR
// Execute:  npm install globby   &&   node translate.js

const fs = require("fs");
const path = require("path");
const { globby } = require("globby");

// Carrega o dicionário EN→PT‑BR
const dict = JSON.parse(fs.readFileSync(path.resolve(__dirname, "ptbr.json"), "utf8"));

// Ordena as chaves pelo tamanho (evita trocar “Install” antes de “Installing…”)
const entries = Object.entries(dict).sort((a, b) => b[0].length - a[0].length);

(async () => {
  // Arquivos‑alvo
  const files = await globby(["index.html", "src/**/*.ts"]);

  for (const file of files) {
    const original = fs.readFileSync(file, "utf8");
    let translated = original;

    for (const [en, pt] of entries) {
      // Escapa regex para texto literal
      const re = new RegExp(en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
      translated = translated.replace(re, pt);
    }

    if (translated !== original) {
      fs.writeFileSync(file, translated);
      console.log(`✔  ${file}`);
    }
  }

  console.log("Tradução concluída!");
})();
