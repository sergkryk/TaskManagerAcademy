import {MONTH_NAMES, TAGS} from '../const';
import {formatTime, createMarkup} from '../utils';

export const createTaskTemplate = (task) => {
  const {color, description, dueDate, isArchive, isFavorite} = task;

  const createHashtagMarkup = (tag) => {
    return (
      `<span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${tag}
      </span>
    </span>`);
  };

  const hashtagsMarkup = createMarkup(TAGS, createHashtagMarkup);

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : '';
  const time = isDateShowing ? formatTime(dueDate) : '';

  const repeatClass = 'card--repeat';
  const deadlineClass = isExpired ? 'card--deadline' : '';

  const archiveButtonInactiveClass = isArchive ? '' : 'card__btn--disabled';
  const favoriteButtonInactiveClass = isFavorite ? '' : 'card__btn--disabled';

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
       <div class="card__form">
         <div class="card__inner">
           <div class="card__control">
             <button type="button" class="card__btn card__btn--edit">
               edit
             </button>
             <button type="button" class="card__btn card__btn--archive ${archiveButtonInactiveClass}">
               archive
             </button>
             <button
               type="button"
               class="card__btn card__btn--favorites ${favoriteButtonInactiveClass}"
             >
               favorites
             </button>
           </div>

           <div class="card__color-bar">
             <svg class="card__color-bar-wave" width="100%" height="10">
               <use xlink:href="#wave"></use>
             </svg>
           </div>

           <div class="card__textarea-wrap">
             <p class="card__text">${description}</p>
           </div>

           <div class="card__settings">
             <div class="card__details">
               <div class="card__dates">
                 <div class="card__date-deadline">
                   <p class="card__input-deadline-wrap">
                     <span class="card__date">${date}</span>
                     <span class="card__time">${time} PM</span>
                   </p>
                 </div>
               </div>

               <div class="card__hashtag">
                 <div class="card__hashtag-list">
                    ${hashtagsMarkup}
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </article>`
  );
};
