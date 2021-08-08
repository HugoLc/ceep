const novaTarefa = document.querySelector('[data-form-bt]');
const tbTarefa = document.querySelector('[data-form-tb]');

 // metodo listener para o evento click chamado uma função anonima que executa um console.log
// novaTarefa.addEventListener('click', ()=> {console.log('fui clicado')})
novaTarefa.addEventListener('click', ()=>{criarTarefa(tbTarefa)});

function criarTarefa(textBox) {
  var texto = getTextoTarefa(textBox);
  console.log(texto);
  var conteudo = `<li class="task">
                    <p class="content">
                      ${texto}
                    </p>
                    <div class="acoes-tarefa">
                      <i class="fas fa-check"></i>
                      <i class="fas fa-trash"></i>
                    </div>
                  </li>` // estudar template string
  var lista = document.querySelector('[data-lista]');
  lista.innerHTML += conteudo;
}

function getTextoTarefa(textBox){
  var texto = textBox.value;
  console.log(texto);
  textBox.value = ''; // limpar campo
  return texto;
}
