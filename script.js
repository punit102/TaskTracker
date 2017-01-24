var todoList = {
  todo: [],
  display: function() {
    if (this.todo.length === 0) {
      console.log('Empty todos');
    } else {
      console.log('My Todos:');
      for (var i = 0; i < this.todo.length; i++) {
        if (this.todo[i].completeNote === true) {
          console.log('(X)', this.todo[i].todoText);
        } else {
          console.log('( )', this.todo[i].todoText);
        }
      }
    }
  },
  addTodo: function(addtodo) {
    this.todo.push({
      todoText: addtodo,
      completeNote: false
    });
    this.display();
  },
  changeTodo: function(position, todoText) {
    this.todo[position].todoText = todoText;
    this.display();
  },
  deleteTodo: function(position) {
    this.todo.splice(position, 1);
    this.display();
  },
  toggleComplete: function(position) {
    var ttodo = this.todo[position];
    ttodo.completeNote = !ttodo.completeNote;
    this.display();
  },
  toggleAll: function() {
    var totalTodos = this.todo.length;
    var completedTodo = 0;
    for (var i = 0; i < totalTodos; i++) {
      if (this.todo[i].completeNote === true) {
        completedTodo++;
      }
    }
  //  case 1: if all true then de select it
    if (totalTodos === completedTodo) {
      for ( i = 0; i < totalTodos; i++) {
        this.todo[i].completeNote = false;
      }
    }
  // case 2: otherwise make everything is true  
    else 
    {
    for (i = 0; i < totalTodos; i++) {
        this.todo[i].completeNote = true;
      }
    }
    this.display();
  }
};


var handler={
  displayTodo: function(){
  todoList.display();
  },
 toggleAll: function(){
  todoList.toggleAll();
  view.display();
  },
  addTodo: function(){
    var inputText = document.getElementById('todoText');
    todoList.addTodo(inputText.value);
    inputText.value = '';
    view.display();
  },
  changeTodo: function(){
    var positionIndex = document.getElementById('positionIndex');
    var modifyValue = document.getElementById('modifyValue');
    todoList.changeTodo(positionIndex.value,modifyValue.value);
    positionIndex.value = '';
    modifyValue.value = '';
    view.display();
  },
  deleteTodo: function(){
    var deletePosition = document.getElementById('deletePosition');
    todoList.deleteTodo(deletePosition.value);
    deletePosition.value = '';
    view.display();
  },
  toggleTodo: function(){
    var togglePosition = document.getElementById('togglePosition');
    todoList.toggleComplete(togglePosition.value);
    togglePosition.value = '';
    view.display();
  }
};


var view ={
  display: function(){
    var todoUl = document.querySelector('ul');
    todoUl.innerHTML='';
    for (var i = 0; i < todoList.todo.length;i++)
    {
        var todoLi = document.createElement('li');
        var todoTextWithCompleted = '';
        
        if(todoList.todo[i].completeNote === true)
        {
          todoTextWithCompleted = '(X)' + todoList.todo[i].todoText; 
        }else
        {
          todoTextWithCompleted = '( )' + todoList.todo[i].todoText;
        }
		
        todoLi.id = i;
        todoLi.textContent = todoTextWithCompleted;
        todoUl.appendChild(todoLi);
        todoLi.appendChild(this.createDeleteButton());
    }
  },  
 createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListener : function(){
    var todoUl = document.querySelector('ul');

      todoUl.addEventListener('click',function(event){
        console.log(event.target.parentNode.id);
        var elementClicked = event.target;
        if(elementClicked.className === 'deleteButton')
          handler.deleteTodo(parseInt(elementClicked.parentNode.id));
      });
  }
};

view.setUpEventListener();




