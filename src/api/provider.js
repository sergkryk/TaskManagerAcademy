import nanoid from "nanoid";
import Task from "../models/task";

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getTasks() {
    if (this._isOnLine()) {
      return this._api.getTasks();
    }

    return Promise.resolve(Task.parseTasks([]));
  }

  createTask(task) {
    if (this._isOnLine()) {
      return this._api.createTask(task);
    }

    // Нюанс в том, что при создании мы не указываем id задачи, нам его в ответе присылает сервер.
    // Но на случай временного хранения мы должны позаботиться и о временном id
    const fakeNewTaskId = nanoid();
    const fakeNewTask = Task.parseTask(Object.assign({}, task.toRAW(), {id: fakeNewTaskId}));

    return Promise.resolve(fakeNewTask);
  }

  updateTask(id, task) {
    if (this._isOnLine()) {
      return this._api.updateTask(id, task);
    }

    return Promise.resolve(task);
  }

  deleteTask(id) {
    if (this._isOnLine()) {
      return this._api.deleteTask(id);
    }

    return Promise.resolve();
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
