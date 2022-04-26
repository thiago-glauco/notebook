const AllNotebooks = require( './models/bigbook');
const Notebook = require( './models/notebook' );
const Note = require( './models/note' );

const allNb = new AllNotebooks( );

allNb.createNotebook( 'my notes' )
.then( ( result ) => {
    console.log( result );
    console.log( allNb.notebooks );
    return allNb.openNotebook( 'my notes' );
})
.then( ( result ) => {
    console.log( result );
    console.log( allNb.openedNotebooks );
})
.catch( err => console.log( err ) );

console.log( allNb.notebooks );