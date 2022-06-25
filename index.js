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
    let myNotebook = result;
    myNotebook.createNote( 'Nota de Teste3', 'Apenas testando a criação de notas', 'Thiago' );
})
.catch( err => console.log( err ) );

//console.log( allNb.notebooks );

let myNote = new Note( 'Nota de Teste 2', 'Olá, essa é uma nota de testes', 'Thiago' );
console.log( myNote );