const container = document.getElementById('container');

const modalContent = `
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
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
          <table class="table table-bordered">
            <tr>
              <th>Espécie</th>
              <td id="species"></td>
            </tr>
            <tr>
              <th>Cor dos Olhos</th>
              <td id="eyeColour"></td>
            </tr>
            <tr>
              <th>Cor do Cabelo</th>
              <td id="hairColour"></td>
            </tr>
            <tr>
              <th>Data de Nascimento</th>
              <td id="dateOfBirth"></td>
            </tr>
            <tr>
              <th>Ancestral</th>
              <td id="ancestry"></td>
            </tr>
            <tr>
              <th>Casa</th>
              <td id="house"></td>
            </tr>
            <tr>
              <th>Gênero</th>
              <td id="gender"></td>
            </tr>
            <tr>
              <th>Patrono</th>
              <td id="patronus"></td>
            </tr>
          </table>
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


    document.getElementById('species').textContent = personagem.species || 'Desconhecido';
    document.getElementById('eyeColour').textContent = personagem.eyeColour || 'Desconhecido';
    document.getElementById('hairColour').textContent = personagem.hairColour || 'Desconhecido';
    document.getElementById('dateOfBirth').textContent = personagem.dateOfBirth || 'Desconhecido';
    document.getElementById('ancestry').textContent = personagem.ancestry || 'Desconhecido';
    document.getElementById('house').textContent = personagem.house || 'Desconhecido';
    document.getElementById('gender').textContent = personagem.gender || 'Desconhecido';
    document.getElementById('patronus').textContent = personagem.patronus || 'Desconhecido';

    const personagemImagem = document.querySelector('.personagem-imagem');
    personagemImagem.src = personagem.image;

  } catch (error) {
    console.error('Erro ao buscar informações do personagem:', error);
  }
}
