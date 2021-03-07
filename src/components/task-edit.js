import {MONTH_NAMES, DAYS, COLORS, TAGS} from '../const';
import {formatTime, createMarkup} from '../utils';


export const createTaskEditTemplate = (task) => {
  const {color, description, dueDate} = task;

  const createRepeatingDayMarkup = (day, isChecked = false) => {
    return `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day}-4" name="repeat" value="${day}" ${isChecked ? 'checked' : ''}/>
            <label class="card__repeat-day" for="repeat-${day}-4" >${day}</label>`;
  };

  const createColorMarkup = (colorName) => {
    return `<input type="radio" id="color-${colorName}-4" class="card__color-input card__color-input--${colorName} visually-hidden" name="color" value="${colorName}"/>
            <label for="color-${colorName}-4" class="card__color card__color--${colorName}">${colorName}</label>`;
  };

  const createRemoveHashtagButtonMarkup = () => {
    return '<button type="button" class="card__hashtag-delete">delete</button>';
  };

  const createHashtagMarkup = (tag) => {
    const removeButton = createRemoveHashtagButtonMarkup();
    return (
      `<span class="card__hashtag-inner">
        <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input"/>
        <p class="card__hashtag-name">
          #${tag}
        </p>
        ${removeButton}
      </span>`);
  };

  const repeatingDaysMarkup = createMarkup(DAYS, createRepeatingDayMarkup);
  const colorsMarkup = createMarkup(COLORS, createColorMarkup);
  const hashtagsMarkup = createMarkup(TAGS, createHashtagMarkup);

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : '';
  const time = isDateShowing ? formatTime(dueDate) : '';

  const repeatClass = 'card--repeat';
  const deadlineClass = isExpired ? 'card--deadline' : '';

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
       <form class="card__form" method="get">
         <div class="card__inner">
           <div class="card__color-bar">
             <svg class="card__color-bar-wave" width="100%" height="10">
               <use xlink:href="#wave"></use>
             </svg>
           </div>

           <div class="card__textarea-wrap">
             <label>
               <textarea
                 class="card__text"
                 placeholder="Start typing your text here..."
                 name="text"
               >${description}</textarea>
             </label>
           </div>

           <div class="card__settings">
             <div class="card__details">
               <div class="card__dates">
                 <button class="card__date-deadline-toggle" type="button">
                   date: <span class="card__date-status">yes</span>
                 </button>
                ${
    isDateShowing ?
      `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder=""
            name="date"
            value="${date} ${time}"
          />
        </label>
      </fieldset>` : ''
    }

                 <button class="card__repeat-toggle" type="button">
                   repeat:<span class="card__repeat-status">yes</span>
                 </button>

                 <fieldset class="card__repeat-days">
                   <div class="card__repeat-days-inner">
                     ${repeatingDaysMarkup}
                   </div>
                 </fieldset>
               </div>

               <div class="card__hashtag">
                 <div class="card__hashtag-list">
                    ${hashtagsMarkup}
                 </div>

                 <label>
                   <input
                     type="text"
                     class="card__hashtag-input"
                     name="hashtag-input"
                     placeholder="Type new hashtag here"
                   />
                 </label>
               </div>
             </div>

             <div class="card__colors-inner">
               <h3 class="card__colors-title">Color</h3>
               <div class="card__colors-wrap">
                 ${colorsMarkup}
               </div>
             </div>
           </div>

           <div class="card__status-btns">
             <button class="card__save" type="submit">save</button>
             <button class="card__delete" type="button">delete</button>
           </div>
         </div>
       </form>
     </article>`
  );
};
