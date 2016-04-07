/**
 * Created by Abhishek Dey on 2-9-15.
 */


    // Define CreditCard class
    //define like factory function in food me
var CreditCard = $resource('/user/:userId/card/:cardId',
    {userId:123, cardId:'@id'},
    {charge: {method:'POST', params:{charge:true}}
    }
);

// We can retrieve a collection from the server
var cards = CreditCard.query(function() {
    // GET: /user/123/card
    // server returns: [ {id:456, number:'1234', name:'Smith'} ];

    var card = cards[0];
    // each item is an instance of CreditCard
    expect(card instanceof CreditCard).toEqual(true);
    card.name = "J. Smith";  //updating the credit card owner name

    // non GET methods are mapped onto the instances
    card.$save(); //need to commit in database for persistence
    // POST: /user/123/card/456 {id:456, number:'1234', name:'J. Smith'}
    // server returns: {id:456, number:'1234', name: 'J. Smith'};

    // our custom method is mapped as well.
    card.$charge({amount:9.99});
    // POST: /user/123/card/456?amount=9.99&charge=true {id:456, number:'1234', name:'J. Smith'}
});

// we can create an instance as well
var newCard = new CreditCard({number:'0123'});
newCard.name = "Mike Smith";
newCard.$save();
// POST: /user/123/card {number:'0123', name:'Mike Smith'}
// server returns: {id:789, number:'0123', name: 'Mike Smith'};
expect(newCard.id).toEqual(789);