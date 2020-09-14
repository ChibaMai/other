const container = document.getElementById('m-listContainer');
const lis = document.querySelectorAll('#m-listContainer li');

const renderPage = (firstIndex) => {
  lis.forEach((item, idx) => {
      const li = item;
      li.innerHTML = firstIndex + idx;
  });
};

renderPage(0);

const renderFunction = (firstIndex) => {
  renderPage(firstIndex);
};

const listScrollIns = new ListScroll({
  firstItemId: 'item-first',
  lastItemId: 'item-last',
  container,
  listSize: 21,
  itemHeight: 150,
  renderFunction
});

listScrollIns.startObserver();
