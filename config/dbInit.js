const facade = require('facade/facade');

facade.recipePurge().then(() => {
    return facade.ratingPurge();
}).then(() => {
    facade.recipeCreate({
        name: 'Ackee and Saltfish',
        description: `Cover the saltfish in cold water. Let soak overnight (minimum 8 hours) changing the water several times (this removes most of the salt)
    Bring a pan of cold water to the boil and gently simmer the fish for 20 minutes (until the fish is tender).
    Chop the onion, sweet pepper, chilli pepper and tomato.
    Remove the fish from water and allow to cool.
    Remove all of bones and skin then flake the flesh of the fish.  
    Melt the butter in a frying pan and stir fry the onion, black pepper, sweet pepper, chilli and thyme for about 3 minutes. 
    Add the tomatoes and flaked fish and stir-fry for another 10 minutes
    Add the Ackee and cook until hot throughout. Stir gently to avoid breaking-up the Ackee
    Serve with yam, green banana, fried dumplings and Irish potato
    `,
        ingredients: ['1/2 lb Saltfish (dried, salted codfish)',
            '12 fresh ackees or 1 (drained) can of tinned ackees',
            ' 1 medium onion',
            '1/2 tsp black pepper',
            '3 tbsp of butter',
            '1/2 a hot chilli pepper (ideally Scotch Bonnet)',
            '1 sweet pepper',
            '1 chopped tomato',
            '1 sprig fresh thyme or 1 tsp dried thyme',
            '2 cloves of garlic',
            '4 Scallion (or spring onions)',
            '6 Slices of bacon',
        ],
    });
}).then(() => {
    facade.recipeCreate({
        name: 'Ackee with butter',
        description: 'Put ackee on a table and then put butter on it. Eat with mouth',
        ingredients: ['ackee', 'butter'],
    });
});
