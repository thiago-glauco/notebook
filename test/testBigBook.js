const expect = require( 'chai').expect;
const allNoteBooks = require( '../models/bigbook' );

describe( 'Testing bigBook Class', ( ) => {
    let myNotebooks = new allNoteBooks( );
    it( 'Will create a notebook called important', ( ) => {
        return myNotebooks.createNotebook( 'important-' )
        .then( result => {
            console.log( result );
            expect( result ).to.be.a( 'string' );
            expect( result ).to.equals( 'ok' );
        })
    })
    it( 'Will get all Notebooks', ( ) =>{
        return myNotebooks.getNotebooks( )
        .then( result => {
            console.log( result );
            expect( result ).to.be.an( 'array' );
            expect( result ).contains( 'important')
        })
    })
    it( 'Will delete a Notebook', ( ) => {
        return myNotebooks.deleteNotebook( 'important' )
        .then( result => {
            console.log( result );
            expect( result ).to.be.a( 'string' );
            expect( result ).to.equals( 'ok' );
        })
    })
    it( 'Will delete all Notebooks', ( ) => {
        return myNotebooks.cleanAll( )
        .then( result => {
            console.log( result );
            expect( result ).to.be.a( 'string' );
            expect( result ).to.equals( 'ok' );
        })
    })
} )
