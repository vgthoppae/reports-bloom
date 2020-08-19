// const dish = React.createElement('h1', null, 'Baked Salmon');
// const dessert = React.createElement('h2', null, 'Ice Cream');
// const nightCap = React.createElement('h3', null, 'Whisky');

// const section = React.createElement(
//   'ul',
//   null,
//   React.createElement('li', null, 'AWS AMplify'),
//   React.createElement('li', null, '2 lb salmon'),
//   React.createElement('li', null, '5 sprigs fresh rosemary'),
//   React.createElement('li', null, '2 tablespoons olive oil'),
//   React.createElement('li', null, '2 small lemons'),
//   React.createElement('li', null, '1 teaspoon kosher salt'),
//   React.createElement('li', null, '4 cloves of chopped garlic')
// );

// const items = [
//   'AWS AMplify',
//   '2 lb salmon',
//   '5 sprigs fresh rosemary',
//   '2 tablespoons olive oil',
//   '2 small lemons',
//   '1 teaspoon kosher salt',
//   '4 cloves of chopped garlic',
// ];

// const section = React.createElement(
//   'ul',
//   { className: 'ingredients' },
//   items.map((item, i) => React.createElement('li', { key: i }, item))
// );

// console.log(section);

// ReactDOM.render(section, document.getElementById('root'));

const secretIngredients = [
  '1 cup unsalted butter',
  '1 cup crunchy peanut butter',
  '1 cup brown sugar',
  '1 cup white sugar',
  '2 eggs',
  '2.5 cups all purpose flour',
  '1 teaspoon baking powder',
  '0.5 teaspoon salt',
];

function ingredientsList({ items }) {
  return React.createElement(
    'ul',
    { className: 'ingredients' },
    items.map((item, i) => React.createElement('li', { key: i }, item))
  );
}

ReactDOM.render(
  React.createElement(ingredientsList, { items: secretIngredients }, null),
  document.getElementById('root')
);
