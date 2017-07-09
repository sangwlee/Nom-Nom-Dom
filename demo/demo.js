document.addEventListener('DOMContentLoaded', () => {
  $l('.addToDo').on('click', () => {
    const input = $l('.userInput').elements[0].value;
    const button = $l('button');

    if (input !== '') {
      $l('.list').append(`<li>${input}<button type="button" class='completedToDo'>Completed</button></li>`);
      $l('.userInput').elements[0].value = '';
    }

    $l('.completedToDo').on('click', e => {
      return $l(e.currentTarget).elements[0].parentElement.remove();
    }
    );
  });
});
