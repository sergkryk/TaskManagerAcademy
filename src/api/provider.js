import nanoid from "nanoid";
import Task from "../models/task";

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSynchronized = true;
  }

  getTasks() {
    if (this._isOnLine()) {
      return this._api.getTasks().then(
          (tasks) => {
            tasks.forEach((task) => this._store.setItem(task.id, task.toRAW()));
            return tasks;
          }
      );
    }

    const storeTasks = Object.values(this._store.getAll());

    this._isSynchronized = false;

    return Promise.resolve(Task.parseTasks(storeTasks));
  }

  createTask(task) {
    if (this._isOnLine()) {
      return this._api.createTask(task).then(
          (newTask) => {
            this._store.setItem(newTask.id, newTask.toRAW());
            return newTask;
          }
      );
    }

    // Нюанс в том, что при создании мы не указываем id задачи, нам его в ответе присылает сервер.
    // Но на случай временного хранения мы должны позаботиться и о временном id
    const fakeNewTaskId = nanoid();
    const fakeNewTask = Task.parseTask(Object.assign({}, task.toRAW(), {id: fakeNewTaskId}));

    this._isSynchronized = false;
    this._store.setItem(fakeNewTask.id, Object.assign({}, fakeNewTask.toRAW(), {offline: true}));

    return Promise.resolve(fakeNewTask);
  }

  updateTask(id, task) {
    if (this._isOnLine()) {
      return this._api.updateTask(id, task).then(
          (newTask) => {
            this._store.setItem(newTask.id, newTask.toRAW());
            return newTask;
          }
      );
    }

    const fakeUpdatedTask = Task.parseTask(Object.assign({}, task.toRAW(), {id}));

    this._isSynchronized = false;
    this._store.setItem(id, Object.assign({}, fakeUpdatedTask.toRAW(), {offline: true}));

    return Promise.resolve(fakeUpdatedTask);
  }

  deleteTask(id) {
    if (this._isOnLine()) {
      return this._api.deleteTask(id).then(
          () => {
            this._store.removeItem(id);
          }
      );
    }

    this._isSynchronized = false;
    this._store.removeItem(id);

    return Promise.resolve();
  }

  getSynchronize() {
    return this._isSynchronized;
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
