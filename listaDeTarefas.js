const novaTarefa = document.querySelector('[data-form-bt]');
const tbTarefa = document.querySelector('[data-form-tb]');

 // metodo listener para o evento click chamado uma função anonima que executa um console.log
// novaTarefa.addEventListener('click', ()=> {console.log('fui clicado')})
novaTarefa.addEventListener('click', ()=>{getTextoTarefa(tbTarefa)});


function getTextoTarefa(textBox){
  var texto = textBox.value;
  console.log(texto);
  textBox.value = '';
}
