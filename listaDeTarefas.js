const novaTarefa = document.querySelector('[data-form-bt]');
const tbTarefa = document.querySelector('[data-form-tb]');


var cont = contRandom(0, 1000);

 // metodo listener para o evento click chamado uma função anonima que executa um console.log
// novaTarefa.addEventListener('click', ()=> {console.log('fui clicado')})

tbTarefa.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) { // 13 é o codigo do enter
        novaTarefa.click();
    }
  });
novaTarefa.addEventListener('click', ()=>{criarTarefa(tbTarefa, 0)});

function criarTarefa(textBox, estado) {
  console.log("ME CONTRATE hugolindoso.c@gmail.com / https://github.com/HugoLc/");
  var texto = getTextoTarefa(textBox);
  var estado;

  if (texto != '') {
    var conteudo = `<li id="li_${cont}" class="task" data-id = ${cont}>
                      <p id="p_${cont}" class="content">
                        ${texto}
                      </p>
                      <div class="acoes-tarefa">
                        <i id="i_conc_${cont}" onclick="concluirTarefa('p_${cont}', 'i_conc_${cont}', 'li_${cont}', ${cont})" class="fas fa-check" data-concluido = ${estado}></i>
                        <i onclick="excluirTarefa(${cont})" class="fas fa-trash" ></i>
                      </div>
                    </li>` // estudar template string
    var lista = document.querySelector('[data-lista]');
    lista.innerHTML += conteudo;

    //se o estado vier como concluído
    if (estado == 1) {
      //marcar li como concluido
      var paragrafo = document.getElementById('p_'+cont);
      var icone = document.getElementById('i_conc_'+cont);
      var li_tarefa = document.getElementById('li_'+cont);

      paragrafo.style.textDecoration = 'line-through';
      li_tarefa.style.opacity = '0.5';
      icone.dataset.concluido = 1;
      estado = icone.dataset.concluido;
    }


    salvarStorage(cont, estado, texto);
    cont = contRandom(0, 100);

  }
}

function getTextoTarefa(textBox){
  var texto = textBox.value;
  textBox.value = ''; // limpar campo
  return texto;
}

function concluirTarefa(p_id, i_conc_id, li_id, cont_id){
  // console.log(id);
  var paragrafo = document.getElementById(p_id);
  var icone = document.getElementById(i_conc_id);
  var li_tarefa = document.getElementById(li_id);

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
  valor[1] = estado;
  localStorage.setItem(id, JSON.stringify(valor));
  console.log(valor);
}
