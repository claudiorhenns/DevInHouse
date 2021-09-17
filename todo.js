
// criação do array de tarefas, array que consulta no local storage se existem tarefas
const tarefasArray = JSON.parse(localStorage.getItem("tarefas")) || [];

// função que imprime as tarefas do array de tarefas
function showTasks(clearTasks = false){
    const listaDiv = document.getElementById("lista-tarefas");
    // se o parametro clearTasks for verdadeiro, ele apaga tudo na div para poder imprimir as novas tarefas
    if(clearTasks){
       listaDiv.innerHTML="";
    }

    if(tarefasArray.length>0){
        tarefasArray.forEach((tarefa) =>{
        // verifica se a tarefa está com o parametro cumprida como não
        if(tarefa.cumprida=="nao"){
          listaDiv.innerHTML = listaDiv.innerHTML + `<li id="${tarefa.tarefa}" name="lista"><input class = "caixa" type="checkbox" id="${tarefa.tarefa}"></input>${tarefa.tarefa}<span class="close" id="${tarefa.tarefa}">x</span></li><br>`;
          closeButtonActivity();
        }
        // se a tarefa estiver com o parametro cumprida como sim, mudamos a classe da lista para a classe com efeitos de cumprida
        if(tarefa.cumprida=="sim"){
          listaDiv.innerHTML = listaDiv.innerHTML + `<li id="${tarefa.tarefa}" name="lista" class="checked"><input class = "caixa" type="checkbox" id="${tarefa.tarefa}" checked></input>${tarefa.tarefa}<span class="close" id="${tarefa.tarefa}">x</span></li><br>`;
          closeButtonActivity();
          }
      });    
    }else{
      // se não existem tarefas, essa mensagem é apresentada
      listaDiv.innerHTML='<li class="semTarefas">Ufaa! Não existem tarefas cadastradas 😅</li>';
    }
}


// Lista todos os botões que possuem a clase close e adiciona uma função onClick para detectar quando houve ação
var close = document.getElementsByClassName("close");

function closeButtonActivity(){
    // roda um laço para add as funções nos botões
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
      // se determinado botão for clicado ele apaga o display dele  
      var div = this.parentElement;
      div.style.display = "none";
        // nesse laço verificamos qual tarefa corresponde ao id do botão clicado
        for(var i =0;i<tarefasArray.length;i++){
            if(tarefasArray[i].tarefa== this.id){
              // ao encontrar a tarefa, ela é removida do array e o novo array sem a tarefa é carregado no local storage
               tarefasArray.splice(i,1);
               localStorage.setItem("tarefas",JSON.stringify(tarefasArray));
               // a função de mostrar as tarefas é chamada novamente, com o parametro true para apagar tudo e imprimir novamente
               showTasks(true);
            }
        }    
      }
    }
}

// Adiciona os efeitos de check quando é marcado

// Verifica se algum elemento dentro da lista ul foi clicado
var list = document.querySelector('ul');
list.addEventListener('click', function(event) {
  //  verifica se quem foi clicado foi o checkbox, pois ele tem a classe caixa
  if (event.target.className === 'caixa') {
    // se foi o checkbox clicado, lista todos os elementos de lista
    var li = document.getElementsByName("lista");
    // um laço percorre todos esses itens de lista
    for(var i=0;i<li.length;i++){
        // a lista tem o mesmo id da tarefa, quando esse laço as encontra, então mudamos a classe da LI para a classe com efeitos de checada
        if(li[i].id == event.target.id){
            li[i].classList.toggle('checked');
            // esse laço encontra a tarefa correspondente do array com a lista marca, pois os 2 possuem o mesmo id tbm
            //após isso, ele muda o parametro da tarefa para cumprida e slava no localstorage
            for(var ind=0;tarefasArray.length;ind++){
              if(tarefasArray[ind].tarefa==li[i].id){
                tarefasArray[ind].cumprida="sim";
                localStorage.setItem("tarefas",JSON.stringify(tarefasArray));
                showTasks(true);
              }
            }

        }
    }
      
  }
}, false);


// Função para criação de um novo item de tarefa, essa função é chamado ao clicar no botão "Adicionar tarefa"
function novaTarefa() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  var alerta = document.getElementById("alert");

  // cria o objeto tarefa, pegando o valor digitado e setando ela como não cumprida
  let  tarefa ={};
  tarefa.tarefa = inputValue;
  tarefa.cumprida = "nao";

  li.appendChild(t);
      // verifica se foi digitada alguma coisa no input ao clicar no botao adicionar, senão foi apresenta a mensagem abaixo
      if (inputValue === '') {
         alerta.innerHTML ="Você deve inserir uma tarefa";
      } else {
         document.getElementById("lista-tarefas").appendChild(li);
         alerta.innerHTML ="";
        //adiciona o objeto tarefa no array de tarefas e salva o array no local storage
        tarefasArray.push(tarefa);
        localStorage.setItem("tarefas",JSON.stringify(tarefasArray));
        showTasks(true);
      }
  document.getElementById("myInput").value = "";
  
}

// chamar a função ao carregar a pagina
window.onload = function(){
  showTasks();
}