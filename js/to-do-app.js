
jQuery(document).ready(function(){
	var myToDoArray = [];
	var baseContainer = jQuery("#to-do-app-container");
	var toDoListContainer = baseContainer.find(".to-do-list-container");
	
	var user = null;
	
	var addToDo = function(toDoToAdd) {
		myToDoArray.push(toDoToAdd);
		saveToDos();
	}

	var saveToDos = function() {
		var serializedData = JSON.stringify(myToDoArray);
		localStorage.setItem("toDoAppData", serializedData);
	}

	var retrieveToDos = function() {
		var serializedData = localStorage.getItem("toDoAppData");
		myToDoArray = JSON.parse(serializedData);
	}

	var removeToDo = function(toDoId) {
		var filteredArray = [];

		for (var index in myToDoArray) {
			var targetToDo = myToDoArray[index];
			if (targetToDo.id != toDoId) {
				filteredArray.push(targetToDo);
			}
		}
		myToDoArray = filteredArray;
		saveToDos();
	}

	var findToDoById = function(id) {
		for (var index in myToDoArray) {
			var targetToDo = myToDoArray[index];
			if (targetToDo.id === parseInt(id)) {
				return targetToDo;
			}
		}
	}

	var findToDoByDescription = function(description) {
		for (var index in myToDoArray) {
			var targetToDo = myToDoArray[index];
			if (targetToDo.description.toLowerCase() === description.trim().toLowerCase()) {
				return targetToDo;
			}
		}
	}

	var renderToDos = function(container) {
		container.empty();
		for (var index in myToDoArray) {
			var targetToDo = myToDoArray[index];
			renderToDo(container, targetToDo);
		}
	}

	var renderToDo = function(container, toDo) {
		var template = jQuery('<li><input class="to-do-checkbox" type="checkbox" /> <span class="to-do-label"></span> <span class="remove-todo">Remove</span></li>');
		template.find(".to-do-label").html(toDo.description);
		template.attr("data-id", toDo.id);
		if (toDo.completed === true) {
			template.addClass("completed");
			template.find(".to-do-checkbox").attr("checked", "checked");
		}
		container.append(template);
	}



	baseContainer.find(".header .new-imput-source").on('keyup', function(event){
		if (event.keyCode === 13) {
			if (validateInput(this.value)) {
				var newToDo = {
					id:new Date().getTime(),
					description:this.value.trim(),
					completed:false
				}
				addToDo(newToDo);
				renderToDos(toDoListContainer);
				// clear input
				this.value = "";
			} else {
				alert('Not valid input');
			}
		}
	});

	var validateInput = function(input) {
		if (typeof(input) != "undefined" && input.trim().length > 0 && !findToDoByDescription(input)) {
			return true;
		}
		return false;
	}

	toDoListContainer.on('click', '.remove-todo', function(event) {
		var target = jQuery(event.target);
		var targetToDoElement = target.parents("li");
		var toDoId = targetToDoElement.attr("data-id");
		removeToDo(toDoId);
		renderToDos(toDoListContainer);
	});

	toDoListContainer.on('click', '.to-do-checkbox', function(event) {
		var target = jQuery(event.target);
		var toDoState = target.is(":checked");
		var targeId = target.parents("li").attr("data-id");

		var targetToDo = findToDoById(targeId);
		if (targetToDo) {
			targetToDo.completed = toDoState;
			saveToDos();
			renderToDos(toDoListContainer);
		}
		
	});

	userIdentificationModule.handleUserIdentification();
	retrieveToDos();
	renderToDos(toDoListContainer);
});