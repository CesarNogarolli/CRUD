let nameHero, surnameHero, fantasy, locale;

const formulario = document.querySelector(".form");
const inputNome = document.getElementById("nome");
const inputSobrenome = document.getElementById("sobrenome");
const inputFantasia = document.getElementById("fantasia");
const inputLocal = document.getElementById("local");

function addNome() {
  nameHero = inputNome.value;
}

function addSobrenome() {
  surnameHero = inputSobrenome.value;
}

function addFantasia() {
  fantasy = inputFantasia.value;
}

function addLocal() {
  locale = inputLocal.value;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  registrar();
});

const fetchRPG = async (id) => {
  const url = !id
    ? "http://localhost:5156/Personagens"
    : `http://localhost:5156/Personagens/${id}`;

  const APIresponse = await fetch(url);

  if (APIresponse.status === 200) {
    const dados = await APIresponse.json();
    return dados;
  }
};

const buscaHerois = () => {};

const registrar = async () => {
  let dadosfinais = {
    id: 0,
    nome: nameHero.toString(),
    sobrenome: surnameHero.toString(),
    fantasia: fantasy.toString(),
    local: locale.toString(),
  };

  let options = {
    method: "POST",
    Headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosfinais),
  };

  fetch("http://localhost:5156/Personagens", options)
    .then((Resp) => {
      Resp.json();
    })
    .then((dados) => {
      buscaHerois(dados);
    })
    .catch((error) => {
      alert(error.toString());
    });
};
