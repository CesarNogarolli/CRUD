let nameHero, surnameHero, fantasy, locale;
let urlPadrao = "http://localhost:5156/Personagens";

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
  const url = !id ? urlPadrao : `${urlPadrao}/${id}`;

  const APIresponse = await fetch(url);

  if (APIresponse.status === 200) {
    const dados = await APIresponse.json();
    return dados;
  }
};

const buscaHerois = async () => {
  const dados = await fetchRPG();

  if (dados) renderiza(dados);
};

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

  fetch(urlPadrao, options)
    .then((Resp) => {
      Resp.json();
    })
    .then((dados) => {
      renderiza(dados);
    })
    .catch((error) => {
      alert(error.toString());
    });
};

const renderiza = (dados) => {
  if (!dados) {
    const div = document.getElementById("tabela");
    div.style.display = "none";
  } else {
    let table = document.getElementById("tabelaHerois");
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    // Cria a estrutura que receberá os valores.
    // Aqui, cria o bloco que tem o cabelalho
    let tituloLinha = document.createElement("tr");

    // Aqui, o texto dos cabeçalhos
    let titulo1 = document.createElement("th");
    titulo1.textContent = "Nome";
    let titulo2 = document.createElement("th");
    titulo2.textContent = "Sobrenome";
    let titulo3 = document.createElement("th");
    titulo3.textContent = "Fantasia";
    let titulo4 = document.createElement("th");
    titulo4.textContent = "Local";

    // Adiciona o texto dos cabeçalhos na linha
    tituloLinha.appendChild(titulo1);
    tituloLinha.appendChild(titulo2);
    tituloLinha.appendChild(titulo3);
    tituloLinha.appendChild(titulo4);

    // adiciona a linha na tabela
    table.appendChild(tituloLinha);

    dados.forEach((heroi) => {
      let dadosLinha = document.createElement("tr");

      let dados1 = document.createElement("td");
      dados1.textContent = heroi.nome;
      let dados2 = document.createElement("td");
      dados2.textContent = heroi.sobrenome;
      let dados3 = document.createElement("td");
      dados3.textContent = heroi.fantasia;
      let dados4 = document.createElement("td");
      dados4.textContent = heroi.local;

      let editar = document.createElement("img");
      editar.onclick = function () {
        alert("Editando o herói de id " + heroi.id);
      };

      let excluir = document.createElement("img");
      excluir.onclick = function () {
        alert("Excluindo o herói de id " + heroi.id);
      };

      editar.src = "img/editar.png";
      excluir.src = "img/lixeira.png";

      let dados5 = document.createElement("td");
      dados5.appendChild(editar);
      let dados6 = document.createElement("td");
      dados6.appendChild(excluir);

      dadosLinha.appendChild(dados1);
      dadosLinha.appendChild(dados2);
      dadosLinha.appendChild(dados3);
      dadosLinha.appendChild(dados4);
      dadosLinha.appendChild(dados5);
      dadosLinha.appendChild(dados6);

      table.appendChild(dadosLinha);
    });
  }
};

buscaHerois();
