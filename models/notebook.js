const Note = require( "./note");
const sqlite = require("sqlite3");
const queries = require("../libs/sqlite_templates");

/**
 * Class used to open a notebook
 */

class Notebook {
    notes = [];
    name;
    #db;
    #loadNotesStm;
    constructor( book = '', db ) {
        this.name = book;
        this.#db = db;
        this.#loadNotesStm = this.#db.prepare( queries.getNotes( this.name ) );
        this.#loadNotes( );
    }

    #loadNotes( ) {
        this.#loadNotesStm.all( (err, rows) => console.log( rows ) );
        
    }

    addNote( msg ) {

    }

    delNote( msg ) {

    }
}

module.exports = Notebook;