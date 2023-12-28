const container = document.getElementById('container');

const modalContent = `
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Detalhes do Personagem</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="personagem-info">
          <img src="" alt="Imagem do Personagem" class="personagem-imagem">
          <p id="personagemNome"></p>
          <p id="personagemCasa"></p>
          <p id="personagemPatrono"></p>
        </div>
      </div>
    </div>
  </div>
</div>`;

container.innerHTML = modalContent;

fetch('https://hp-api.onrender.com/api/characters')
  .then((response) => response.json())
  .then((data) => listarPersonagens(data))
  .catch((error) => {
    console.error('Erro ao buscar a lista de personagens:', error);
  });

function listarPersonagens(personagens) {
  personagens.forEach((personagem) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <p class="card_title">${personagem.name}</p>
      <button type="button" class="btn card_button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="exibirInfo('${personagem.name}')">
        Informações
      </button>
    `;
    container.appendChild(card);
  });
}

async function exibirInfo(nomePersonagem) {
  try {
    const response = await fetch(`https://hp-api.onrender.com/api/characters?name=${nomePersonagem}`);
    const personagens = await response.json();
    const personagem = personagens.find(p => p.name === nomePersonagem);

    const personagemNome = document.getElementById('personagemNome');
    const personagemCasa = document.getElementById('personagemCasa');
    const personagemPatrono = document.getElementById('personagemPatrono');
    const personagemImagem = document.querySelector('.personagem-imagem');

    personagemNome.textContent = `Nome: ${personagem.name}`;
    personagemCasa.textContent = `Casa: ${personagem.house || 'Desconhecido'}`;
    personagemPatrono.textContent = `Patrono: ${personagem.patronus || 'Desconhecido'}`;
    personagemImagem.src = personagem.image;

  } catch (error) {
    console.error('Erro ao buscar informações do personagem:', error);
  }
}
