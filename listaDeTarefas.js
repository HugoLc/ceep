const novaTarefa = document.querySelector('[data-form-bt]');
const tbTarefa = document.querySelector('[data-form-tb]');
var cont = 0;

 // metodo listener para o evento click chamado uma função anonima que executa um console.log
// novaTarefa.addEventListener('click', ()=> {console.log('fui clicado')})
novaTarefa.addEventListener('click', ()=>{criarTarefa(tbTarefa)});

function criarTarefa(textBox) {
  var texto = getTextoTarefa(textBox);
  console.log(texto);
  var conteudo = `<li id="li-${cont}" class="task">
                    <p id="p-${cont}" class="content">
                      ${texto}
                    </p>
                    <div class="acoes-tarefa">
                      <i onclick="concluirTarefa('p-${cont}')" class="fas fa-check"></i>
                      <i onclick="excluirTarefa('li-${cont}')" class="fas fa-trash"></i>
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

function concluirTarefa(id){
  console.log(id);
  var elemento = document.getElementById(id);
  var textoP = elemento.innerHTML;
  elemento.innerHTML = textoP.strike();
}

function excluirTarefa(id){
  console.log(id);
}
