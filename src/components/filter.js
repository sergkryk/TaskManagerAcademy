const createFilterMarkup = (filter, isChecked = false) => {
  const {name, count} = filter;
  return (`<input
    type="radio"
    id="filter__${name}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? 'checked' : ''}
  />
  <label for="filter__${name}" class="filter__label">
  ${name}<span class="filter__${name}-count">${count}</span></label
  >`);
};

export const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => {
    return createFilterMarkup(it, i === 0);
  }).join('');
  return (
    `<section class="main__filter filter container">
       ${filtersMarkup}
     </section>`
  );
};
