const Note = require( "./note");
const sqlite = require("sqlite3");
const queries = require("../libs/sqlite_templates");

/**
 * Class used to open a notebook
 * loadNotes
 * openNote
 */

class Notebook {
    notes = [];
    name;
    #db;
    #loadNotesStm;
    #insertNoteStm;

    constructor( book = '', db ) {
        this.name = book;
        this.#db = db;
        this.#loadNotesStm = db.prepare( queries.getNotes( this.name ) );
        this.#loadNotes( );
        this.#insertNoteStm = db.prepare( queries.insertNote( book ) );
    }

    #loadNotes( ) {
        this.#loadNotesStm.all( (err, rows) => console.log( rows ) );
        
    }

    createNote( title, msg, user ) {
        let note = new Note( title, msg, user );
        console.log( note );
        return this.#saveNote( note )
        
    }

    #saveNote( note ) {
        return new Promise( ( resolve, reject ) => {
            if( note.id ) {
                //implement update
            } else {
                this.#insertNoteStm.run( note.title, note.owner, note.content, ( err ) => {
                    if( err ) {
                        reject( err );
                    } else {
                        this.#loadNotes( );
                        resolve( 'ok' );
                    }
                } )
            }
        })

    }

    delNote( msg ) {

    }
}

module.exports = Notebook;