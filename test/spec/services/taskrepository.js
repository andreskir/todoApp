'use strict';

describe('Service: taskRepository', function () {
  var savedTask, Task;

  // mock service dependencies
  beforeEach(function(){
    module(function ($provide){

      var allTasks = JSON.stringify({1: {id: 1, text: 'resolver este ejercicio', date: '2014-09-29T13:03:06.030Z'}});

      var mockedLocalStorage = {
        get: function(){
          return JSON.parse(allTasks);
        },
        set: function(value) {
          allTasks = JSON.stringify(value);
        }
      };

      $provide.value('localStorageService', mockedLocalStorage);
    });
  });

  // instantiate service
  var taskRepository;
  beforeEach(inject(function (_taskRepository_,_Task_) {
    taskRepository = _taskRepository_;
    Task = _Task_;
    savedTask = taskRepository.get()[0];
  }));

  it('should return an array of tasks when get is called', function () {
    expect(taskRepository.get().length).toBe(1);
    expect(taskRepository.get()[0]).toDeepEqual(new Task({id: 1, text: 'resolver este ejercicio', date: '2014-09-29T13:03:06.030Z'}));
  });


  describe("when add is called", function(){
    var newTask;

    beforeEach(function(){
      newTask = new Task({text: 'soy una nueva tarea'});
      taskRepository.add(newTask);
    });

    it('should store the task', function () {
      expect(taskRepository.get().length).toBe(2);
    });

    it('should set the following id to the new task when add is called', function () {
      expect(newTask.id).toBe(2);
    });

    it('should set the task as pristine', function () {
      expect(newTask.isDirty()).toBeFalsy();
    });

  });

  describe("when update is called", function(){
    var newText;

    beforeEach(function(){
      newText = 'texto editado';
      savedTask.text = newText;
      savedTask.setAsDirty();
      taskRepository.update(savedTask);
    });

    it('should save the task', function () {
      expect(taskRepository.get()[0].text).toBe(newText);
    });

    it('should set the task as pristine', function () {
      expect(savedTask.isDirty()).toBeFalsy();
    });
  });

  it('should throw an exception when a new task is updated', function () {
    var update = function() { taskRepository.update(new Task({text: 'nueva tarea'})); };
    expect(update).toThrow("cannot update a new task");
  });

  it('can delete a task', function () {
    taskRepository.delete(savedTask);
    expect(taskRepository.get().length).toBe(0);
  });

  it('should throw an exception when a new task is deleted', function () {
    var deleteFn = function() { taskRepository.delete(new Task({text: 'nueva tarea'})); };
    expect(deleteFn).toThrow("cannot delete a new task");
  });

});
