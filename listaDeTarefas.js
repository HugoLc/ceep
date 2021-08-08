const novaTarefa = document.querySelector('[data-form-bt]');
const tbTarefa = document.querySelector('[data-form-tb]');
var cont = 0;


 // metodo listener para o evento click chamado uma função anonima que executa um console.log
// novaTarefa.addEventListener('click', ()=> {console.log('fui clicado')})

tbTarefa.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) { // 13 é o codigo do enter
        novaTarefa.click();
    }
  });
novaTarefa.addEventListener('click', ()=>{criarTarefa(tbTarefa)});

function criarTarefa(textBox) {
  console.log("ME CONTRATE hugolindoso.c@gmail.com / https://github.com/HugoLc/");
  var texto = getTextoTarefa(textBox);
  if (texto != '') {
    var conteudo = `<li id="li_${cont}" class="task">
                      <p id="p_${cont}" class="content">
                        ${texto}
                      </p>
                      <div class="acoes-tarefa">
                        <i id="i_conc_${cont}" onclick="concluirTarefa('p_${cont}', 'i_conc_${cont}', 'li_${cont}')" class="fas fa-check" data-concluido = 0></i>
                        <i onclick="excluirTarefa('li_${cont}')" class="fas fa-trash"></i>
                      </div>
                    </li>` // estudar template string
    var lista = document.querySelector('[data-lista]');
    lista.innerHTML += conteudo;
    cont++;
  }
}

function getTextoTarefa(textBox){
  var texto = textBox.value;
  textBox.value = ''; // limpar campo
  return texto;
}

function concluirTarefa(p_id, i_conc_id, li_id){
  // console.log(id);
  var paragrafo = document.getElementById(p_id);
  var icone = document.getElementById(i_conc_id);
  var li_tarefa = document.getElementById(li_id);

  var icone_data = icone.dataset.concluido;

  if (icone_data == 0) {
    paragrafo.style.textDecoration = 'line-through';
    li_tarefa.style.opacity = '0.5';
    icone.dataset.concluido = 1;
  }
  else {
    paragrafo.style.textDecoration = 'none';
    li_tarefa.style.opacity = '1';
    icone.dataset.concluido = 0;
  }
}

function excluirTarefa(li_id){
  console.log(li_id);
  var elemento = document.getElementById(li_id);
  elemento.remove();
}
