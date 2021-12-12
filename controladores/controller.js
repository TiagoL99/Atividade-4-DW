require("dotenv").config();
const axios = require('axios')
const cheerio = require('cheerio');

const sites = [
  {
      name: 'Variety',                                               //http://localhost:8050/boxoffice/Variety para aceder apenas ao conteudo deste site
      address: 'https://variety.com/v/film/box-office/',
      base: '',
  },

  {
      name: 'Hollywood Reporter',                                   //http://localhost:8050/boxoffice/Hollywood%20Reporter para aceder apenas ao conteudo deste site
      address: 'https://www.hollywoodreporter.com/t/box-office/',
      base: '',
  },
      
  {
      name: 'Deadline',                                            //http://localhost:8050/boxoffice/Deadline para aceder apenas ao conteudo deste site
      address: 'https://deadline.com/v/box-office/',
      base: '',
  },
      

  {
      name: 'The Numbers',                                         //http://localhost:8050/boxoffice/The%20Numbers para aceder apenas ao conteudo deste site
      address: 'https://www.the-numbers.com/news/',
      base: 'https://www.the-numbers.com',
  },

  {
      name: 'Box Office Pro',                                                    //http://localhost:8050/boxoffice/Box%20Office%20Pro para aceder apenas ao conteudo deste site
      address: 'https://www.boxofficepro.com/category/forecasts-tracking/',
      base: '',
  }
  
]

const artigos = []

const db = require("../models/nedb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.findAll =  (req,res) => {
   // authenticateToken(req, res);
   //if (req.email != null) {
        sites.forEach(site => {
            axios.get(site.address)
                .then(response => {
                    const html = response.data
                    const $ = cheerio.load(html)
    
                    $('a:contains("Box Office")', html).each(function (){
                        const title = $(this).text()
                        const url = $(this).attr('href')
    
                        artigos.push({
                            title,
                            url: site.base + url,
                            source: site.name
                        })
                    })
    
    
            })
    })
    res.json(artigos)
   // }
};



exports.findAll_specificSite = async (req,res) => {
  authenticateToken(req, res);
  if (req.email != null) {
        const siteID = req.params.siteID
    
        const enderecoNoticias = sites.filter(site => site.name == siteID)[0].address
        const siteBase =  sites.filter(site => site.name == siteID)[0].base
    
        axios.get(enderecoNoticias)
            .then(response => {
                const html = response.data 
                const $ = cheerio.load(html)
                const specificArticles = []
    
                $('a:contains("Box Office")', html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr('href')
                    specificArticles.push({
                        title,
                        url: siteBase + url,
                        source: siteID
                    })
                })
                res.json(specificArticles)
            }).catch(err => console.log(err))
    
            console.log(enderecoNoticias)
           console.log(req.headers["authorization"]);
   }
};

function authenticateToken(req, res) {
    console.log("A autenticar...");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      console.log("Token nula");
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.email = user;
    });
}
  
exports.registar = async (req, res) => {
    console.log("Registar novo utilizador");
    if (!req.body) {
      return res.status(400).send({
        message: "O conteúdo não pode ser vazio!",
      });
    }
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const email = req.body.email;
      const password = hashPassword;
      db.Crud_registar(email, password)
        .then((dados) => {
          res.status(201).send({ message: "Utilizador criado com sucesso!" });
          console.log("Dados: ");
          console.log(JSON.stringify(dados));
        });
    } catch {
      return res.status(400).send({ message: "Problemas ao criar utilizador" });
    }
};

exports.login = async (req, res) => {
    console.log("Autenticação de um utilizador");
    if (!req.body) {
      return res.status(400).send({
        message: "O conteúdo não pode ser vazio!",
      });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const email = req.body.email;
      const password = hashPassword;
      db.cRud_login(email) //
        .then(async (dados) => {
          if (dados == null) {
            console.log("Não encontrou o utilizador");
            return res.status(401).send({ erro: "Utilizador não encontrado!" });
          }
          if (await bcrypt.compare(req.body.password, dados.password)) {
            const user = { name: email };
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken: accessToken }); // aqui temos de enviar a token de autorização
            console.log("Dados: ");
            console.log(JSON.stringify(dados)); // para debug
          } else {
            console.log("Password incorreta");
            return res.status(401).send({ erro: "A senha não está correta!" });
          }
        });
    } catch {
      return res.status(400).send({ message: dados });
    }
};
  