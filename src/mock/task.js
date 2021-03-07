const generateTask = () => {
  return {
    color: 'black',
    description: 'Example default task with default color.',
    dueDate: new Date(),
    repeatingDays: null,
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill('')
    .map(generateTask);
};

export {generateTask, generateTasks};
