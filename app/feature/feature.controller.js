(function() {
	"use strict";

	angular
		.module("feature")
		.controller("Feature", Feature);

	function Feature($q, tasksDataService) {

		let $ctrl = this;

		// tasksDataService.getTasksNew()
		// 	// .then(getTasksSuccess, getTasksError, getTasksNotify);
		// 	.then(getTasksSuccess)
		// 	.then(getOtherTask)
		// 	.catch( getTasksError)
		// 	.finally(getTasksComplete);
        //
		// tasksDataService.getUsers()
		// 	.then(getUsersSuccess);

		let tasksPromise = tasksDataService.getTasksNew(),
			usersPromise = tasksDataService.getUsers();

		$q.all([tasksPromise, usersPromise, $q.when(20)])
			.then(getAllDataSuccess)
			.catch( getTasksError)
			.finally(getTasksComplete);

		function getAllDataSuccess(dataArray) {
			$ctrl.tasks = dataArray[0];
			$ctrl.users = dataArray[1];
			console.log(dataArray[2]);
		}
		
		function getUsersSuccess (users) {
			$ctrl.users = users;
		}

		function getTasksSuccess(tasks) {
			$ctrl.tasks = tasks;
			return 10;
		}

		function getOtherTask(data) {
			console.log('DATA', data);
		}

		function getTasksError(reason) {
			console.log(reason);
		}

		function getTasksNotify(msg) {
			console.log(msg);
		}

		function getTasksComplete() {
			console.log("Get Tasks is Completed");
		}
		
	}
	
})();
