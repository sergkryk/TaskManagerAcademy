import {createSiteMenuTemplate} from './components/site-menu';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createSortingTemplate} from './components/sorting';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';

import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

render(siteHeaderElement, createSiteMenuTemplate(), 'beforeend');

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteMainElement, createFilterTemplate(filters), 'beforeend');
render(siteMainElement, createBoardTemplate(), 'beforeend');

const taskListElement = siteMainElement.querySelector('.board__tasks');
render(taskListElement, createTaskEditTemplate(tasks[0]), 'beforeend');

for (let i = 1; i < tasks.length; i++) {
  render(taskListElement, createTaskTemplate(tasks[i]), 'beforeend');
}

const boardElement = siteMainElement.querySelector('.board');
render(boardElement, createLoadMoreButtonTemplate(), 'beforeend');
render(boardElement, createSortingTemplate(), 'afterbegin');
