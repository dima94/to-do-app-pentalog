var userIdentificationModule = {};

jQuery(document).ready(function(){
	var localStorageKey = "user";
	var avatarDomain = "https://robohash.org/";
	var userModalContainer = jQuery("#modal-main-container");

	var targetUserInput = userModalContainer.find("#target-user-input");


	var getUserFromLocalStorage = function() {
		var targetUserAsString = localStorage.getItem(localStorageKey);
		return typeof(targetUserAsString) != "undefined" ? JSON.parse(targetUserAsString) : null
	}

	var saveUserToLocalStorage = function(user) {
		localStorage.setItem(localStorageKey, JSON.stringify(user));
	}

	var constrcutUser = function(username) {
		return new User(username);
	}

	var User = function(username) {
		this.username = username;
		this.avatar = avatarDomain + username;
	}


	targetUserInput.on("keypress", function(e) {
		// add code logic here
		// 1. Check if key press is enter
		// 2. Extarct input value in a "username" variable;
		// 3. Check if value is valid (trim, no spaces, and is defined)
		// 4. if all good, call saveUserToLocalStorage(new User(username));
	});

	userIdentificationModule.handleUserIdentification= function() {
		user = getUserFromLocalStorage();
		if (!user) {
			userModalContainer.show();
		}
	}
});