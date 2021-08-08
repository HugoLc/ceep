const novaTarefa = document.querySelector('[data-form-bt]');
const tbTarefa = document.querySelector('[data-form-tb]');
var cont = 0;


 // metodo listener para o evento click chamado uma função anonima que executa um console.log
// novaTarefa.addEventListener('click', ()=> {console.log('fui clicado')})
novaTarefa.addEventListener('click', ()=>{criarTarefa(tbTarefa)});

function criarTarefa(textBox) {
  var texto = getTextoTarefa(textBox);
  console.log(texto);
  var conteudo = `<li id="li_${cont}" class="task">
                    <p id="p_${cont}" class="content">
                      ${texto}
                    </p>
                    <div class="acoes-tarefa">
                      <i id="i_conc_${cont}" onclick="concluirTarefa('p_${cont}', 'i_conc_${cont}')" class="fas fa-check" data-concluido = 0></i>
                      <i onclick="excluirTarefa('li_${cont}')" class="fas fa-trash"></i>
                    </div>
                  </li>` // estudar template string
  var lista = document.querySelector('[data-lista]');
  lista.innerHTML += conteudo;
  cont++;
}

function getTextoTarefa(textBox){
  var texto = textBox.value;
  console.log(texto);
  textBox.value = ''; // limpar campo
  return texto;
}

function concluirTarefa(p_id, i_conc_id){
  // console.log(id);
  var paragrafo = document.getElementById(p_id);
  var icone = document.getElementById(i_conc_id);
  var icone_data = icone.dataset.concluido;
  console.log(icone_data);

  if (icone_data == 0) {
    console.log("nao concluido");
    paragrafo.style.textDecoration = 'line-through';
    icone.dataset.concluido = 1;
  }
  else {
    console.log("concluido");
    paragrafo.style.textDecoration = 'none';
    icone.dataset.concluido = 0;
  }


}

function excluirTarefa(li_id){
  console.log(id);
  var elemento = document.getElementById(li_id);
  elemento.remove();
}
