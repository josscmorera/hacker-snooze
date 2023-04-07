let storiesContainer = document.getElementById('stories-container');

function fetchStoryDetails(storyId) {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`)
      .then((response) => response.json())
      .then((storyDetails) => {
        let storyCard = createStoryCard(
          storyDetails.title,
          storyDetails.url,
          storyDetails.score,
          storyDetails.descendants,
          storyDetails.by
        );
        storiesContainer.appendChild(storyCard);
      });
  }

fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
  .then((response) => response.json())
  .then((storyIds) => {
    let limitedStoryIds = storyIds.slice(0, 100);
    limitedStoryIds.forEach((storyId) => fetchStoryDetails(storyId));
  });

function createStoryCard(title, url, score, comments, author) {
  let card = document.createElement('div');
  card.className = 'card';

  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  let titleLink = document.createElement('a');
  titleLink.href = url;
  titleLink.className = 'card-title';
  titleLink.textContent = title;

  let scoreElement = document.createElement('p');
  scoreElement.className = 'card-text';
  scoreElement.textContent = `${score} points`;

  let commentsElement = document.createElement('p');
  commentsElement.className = 'card-text';
  commentsElement.textContent = `${comments} comments`;

  let authorElement = document.createElement('p');
  authorElement.className = 'card-text';
  authorElement.textContent = `submitted by ${author}`;

  cardBody.appendChild(titleLink);
  cardBody.appendChild(scoreElement);
  cardBody.appendChild(commentsElement);
  cardBody.appendChild(authorElement);

  card.appendChild(cardBody);

  return card;
}


