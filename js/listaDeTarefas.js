import InfoCard from '../js/info-card.js'

const infoCardParagrafo = `
    Projeto criado para praticar Javascript. Revisados conceitos de
    de manipulação do DOM, organização do código através de funções,
    armazenamento de informações no navegador utilizando a API Web Storage.
    <br><br>
    O objetivo do projeto foi implementar uma lista de tarefas com as funções
    de adicionar, remover e marcar como concluídas as tarefas adicionadas. As 
    tarefas são armazenadas e recuperadas pelo navegador com a utilização do 
    local storage.
`
var infoCard = new InfoCard(infoCardParagrafo);

document.addEventListener('click', () => {
    if(infoCard) {infoCard.excluirInfoCard();}
    infoCard = null;    
});

const novaTarefa = document.querySelector('[data-form-bt]');
const tbTarefa = document.querySelector('[data-form-tb]');


// var texto = ;
var cont = contRandom(0, 1000);


for (var i = 0; i < localStorage.length; i++) {
  var chave = localStorage.key(i);
  var valor = JSON.parse(localStorage.getItem(chave));
  criarTarefa(chave, valor[0], valor[1], false);
}

tbTarefa.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) { // 13 é o codigo do enter
        novaTarefa.click();
    }
  });
novaTarefa.addEventListener('click', ()=>{criarTarefa(cont,getTextoTarefa(tbTarefa), 0, true)});

function adicionarEvListenersNosBotoes(){
  const listaBotoesConcluir = document.getElementsByClassName('concluir');
  const listaBotoesExcluir = document.getElementsByClassName('excluir');

  console.log(listaBotoesConcluir);
  console.log(listaBotoesExcluir);

  for (const botao of listaBotoesConcluir) {
    let paiDiv = botao.parentElement;
    let avoLi = paiDiv.parentElement;
    let idTarefa = avoLi.dataset.id;

    console.log(idTarefa);

    botao.addEventListener('click', () => {
      concluirTarefa(`p_${idTarefa}`, `i_conc_${idTarefa}`, `li_${idTarefa}`, idTarefa);
    });
  }

  for (const botao of listaBotoesExcluir) {
    let paiDiv = botao.parentElement;
    let avoLi = paiDiv.parentElement;
    let idTarefa = avoLi.dataset.id;

    botao.addEventListener('click', () => {
      excluirTarefa(idTarefa);
    });
  }
}

function criarTarefa(id, texto, estado, tarefa_nova) {

  console.log("ME CONTRATE hugolindoso.c@gmail.com / https://github.com/HugoLc/");

  if (texto != '') {
    console.log("entrei")
    var conteudo = `<li id="li_${id}" class="task" data-id = ${id}>
                      <p id="p_${id}" class="content">
                        ${texto}
                      </p>
                      <div class="acoes-tarefa">
                        <i id="i_conc_${id}" class="fas fa-check concluir" data-concluido = ${estado}></i>
                        <i class="fas fa-trash excluir" ></i>
                      </div>
                    </li>` // estudar template string
    var lista = document.querySelector('[data-lista]');
    lista.innerHTML += conteudo;
    var conteudo = lista.innerHTML;
    console.log(conteudo);

    //se o estado vier como concluído
    if (estado == 1) {
      //marcar li como concluido
      var paragrafo = document.getElementById('p_'+id);
      var icone = document.getElementById('i_conc_'+id);
      var li_tarefa = document.getElementById('li_'+id);

      paragrafo.style.textDecoration = 'line-through';
      li_tarefa.style.opacity = '0.5';
      icone.dataset.concluido = 1;
      estado = icone.dataset.concluido;
    }

    if (tarefa_nova) {
      salvarStorage(cont, estado, texto);
    }
    cont = contRandom(0, 100);

  }

  adicionarEvListenersNosBotoes();
}

function getTextoTarefa(textBox){
  var texto = textBox.value;
  textBox.value = ''; // limpar campo
  return texto;
}

function concluirTarefa(p_id, i_conc_id, li_id, cont_id){
  console.log(cont_id);
  var paragrafo = document.getElementById(p_id);
  var icone = document.getElementById(i_conc_id);
  var li_tarefa = document.getElementById(li_id);

  console.log(paragrafo);

  var icone_data = icone.dataset.concluido;
  //se o estado atual for não concluido(0)
  if (icone_data == 0) {
    //marca como concluido
    paragrafo.style.textDecoration = 'line-through';
    li_tarefa.style.opacity = '0.5';
    icone.dataset.concluido = 1;

    //alterar valor do localstorage
    alterarStorage(cont_id, 1);
  }
  //se o estado atual for concluido
  else {
    //desmarca conclusão
    paragrafo.style.textDecoration = 'none';
    li_tarefa.style.opacity = '1';
    icone.dataset.concluido = 0;

    //alterar valor do localstorage
    alterarStorage(cont_id, 0);
  }
}

function excluirTarefa(id){
  console.log(id);
  var elemento = document.querySelector('#li_'+id);
  console.log(elemento);
  localStorage.removeItem(elemento.dataset.id);
  elemento.remove();
}

function salvarStorage(id, estado, texto){
  var lista = [texto, estado];
  localStorage.setItem(id, JSON.stringify(lista));

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function contRandom(min, max){
  var n_random = getRandomInt(min, max);
  console.log(n_random);
  console.log(localStorage.key(n_random))
  while (localStorage.key(n_random) != null) {
    n_random = Math.random();
  }
  return n_random;
}

function alterarStorage(id, estado){
  var valor = JSON.parse(localStorage.getItem(id));
  console.log('valor',id)
  valor[1] = estado;
  localStorage.setItem(id, JSON.stringify(valor));
  console.log(valor);
}
