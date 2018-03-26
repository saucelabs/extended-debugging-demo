/* global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc').controller('TodoCtrl', function TodoCtrl ($scope, $routeParams, $filter, store) {
    var todos = $scope.todos = store.todos

    $scope.newTodo = ''
    $scope.editedTodo = null

    function foo (i) {
        return i * Math.random()
    }

    for (var i = 0; i < 10e4; ++i) {
        foo(i)
        document.onclick = () => console.log('foo')
    }

    $scope.$watch('todos', function () {
        $scope.remainingCount = $filter('filter')(todos, { completed: false }).length
        $scope.completedCount = todos.length - $scope.remainingCount
        $scope.allChecked = !$scope.remainingCount
    }, true)

    // Monitor the current route for changes and adjust the filter accordingly.
    $scope.$on('$routeChangeSuccess', function () {
        var status = $scope.status = $routeParams.status || ''

        $scope.statusFilter = (status === 'active')
            ? { completed: false }
            : (status === 'completed')
                ? { completed: true } : null
    })

    $scope.addTodo = function () {
        var newTodo = {
            title: $scope.newTodo.trim(),
            completed: false
        }

        if (!newTodo.title) {
            return
        }

        $scope.saving = true
        store.insert(newTodo)
            .then(function success (wasSuccessful) {
                $scope.newTodo = ''

                if (!wasSuccessful) {
                    return window.logEvent('addTodoError', 'pageEvent', 'useraction')
                }

                window.logEvent('addTodo', 'pageEvent', 'useraction')
            })
            .finally(function () {
                $scope.saving = false
            })
    }

    $scope.editTodo = function (todo) {
        window.logEvent('editTodo', 'pageEvent', 'useraction')
        $scope.editedTodo = todo
        // Clone the original todo to restore it on demand.
        $scope.originalTodo = angular.extend({}, todo)
    }

    $scope.saveEdits = function (todo, event) {
        // Blur events are automatically triggered after the form submit event.
        // This does some unfortunate logic handling to prevent saving twice.
        if (event === 'blur' && $scope.saveEvent === 'submit') {
            $scope.saveEvent = null
            return
        }

        $scope.saveEvent = event

        if ($scope.reverted) {
            // Todo edits were reverted-- don't save.
            $scope.reverted = null
            return
        }

        todo.title = todo.title.trim()

        if (todo.title === $scope.originalTodo.title) {
            return
        }

        store[todo.title ? 'put' : 'delete'](todo)
            .then(function success () {}, function error () {
                todo.title = $scope.originalTodo.title
            })
            .finally(function () {
                $scope.editedTodo = null
            })
    }

    $scope.revertEdits = function (todo) {
        todos[todos.indexOf(todo)] = $scope.originalTodo
        $scope.editedTodo = null
        $scope.originalTodo = null
        $scope.reverted = true
    }

    $scope.removeTodo = function (todo) {
        window.logEvent('removeTodo', 'pageEvent', 'useraction')
        store.delete(todo)
    }

    $scope.saveTodo = function (todo) {
        window.logEvent('saveTodo', 'pageEvent', 'useraction')
        store.put(todo)
    }

    $scope.toggleCompleted = function (todo, completed) {
        window.logEvent('toggleCompleted', 'pageEvent', 'useraction')
        if (angular.isDefined(completed)) {
            todo.completed = completed
        }
        store.put(todo, todos.indexOf(todo))
            .then(function success () {}, function error () {
                todo.completed = !todo.completed
            })
    }

    $scope.clearCompletedTodos = function () {
        window.logEvent('clearCompletedTodos', 'pageEvent', 'useraction')
        store.clearCompleted()
    }

    $scope.markAll = function (completed) {
        todos.forEach(function (todo) {
            if (todo.completed !== completed) {
                $scope.toggleCompleted(todo, completed)
            }
        })
    }
})
