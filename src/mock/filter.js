const filterNames = ['all', 'overdue', 'today', 'favorites', 'repeating', 'archive'];
const MAX_COUNT = 10;

const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * MAX_COUNT),
    };
  });
};

export {
  generateFilters
};
