const sqlite = require("sqlite3").verbose( );
const queries = require("../libs/sqlite_templates");
const Notebook = require( "./notebook" );

class BigBook {
    /**
     * Métodos públicos:
     *  getNotebooks
     *  findNotebooks
     *  createNotebook
     *  deleteNotebook
     *  renameNotebook
     *  cleanAll
     *  openNotebook
     *  closeNotebook
     */
    
    #db
    #sthGetNotebooks
    notebooks
    openedNotebooks

    constructor( ) {
        this.#db = new sqlite.Database( 'C:\\Users\\thiag.LAPTOP-8A3IHU16\\mozilla\\notebook\\notebooks' );
        this.#sthGetNotebooks = this.#db.prepare( queries.getNotebooksSQL, ( err ) => {
            if( err ) {
                console.log( err );
            }
        } );
        this.#getNotebooks( )
        this.openedNotebooks = [];
    }

    #getNotebooks( ) {
        this.#sthGetNotebooks.all( (err, rows) => {
            if( err ) {
                console.log( err );
            } else {
                this.notebooks = rows.map( row => { return row.tbl_name } );
            }
        })
    }

    createNotebook( notebookName ) {
        notebookName = this.#normalizeNotebookname( notebookName );
        if( notebookName ) {
            let createNotebookQuerie = queries.createTableSTR( notebookName );
            return this.#execDDQuery( createNotebookQuerie );
        } else {
            return new Promise( ( resolve, reject ) => {
                reject( 'Invalide notebook name');
            })
        }
    }

    openNotebook( notebookName ) {
        if( this.openedNotebooks.find( el => el.name === notebookName ) ) {
            console.log( 'Notebook Already Opened' );
            return undefined;
        } else if( this.notebooks.find( el => el === notebookName ) ) {
            let nb = new Notebook( notebookName, this.#db );
            this.openedNotebooks.push( nb );
            return nb;
        } else {
            console.log( 'Notebook Does Not Exists!' );
            return undefined
        }
    }

    deleteNotebook( notebookName ) {
        let deleteNotebookQuerie = queries.dropTableSTR( notebookName );
        return this.#execDDQuery( deleteNotebookQuerie );
    }

    cleanAll( ) {
        let promiseArray = [];
        let allNotebooks = this.notebooks;
        allNotebooks.forEach( notebook => {
            promiseArray.push( this.#execDDQuery( queries.dropTableSTR( notebook ) ) );
        });
        return new Promise( ( resolve, reject ) => {
            Promise.all( promiseArray )
            .then( result => {
                resolve( 'ok' );
            })
            .catch( err => reject( err ) );
        })
        
    }


    #execDDQuery( query ) {
        let that = this;
        return new Promise( ( resolve, reject ) => {
            that.#db.run( query, ( err ) => {
                if ( err ) {
                    reject( err )
                } else {
                    this.getNotebooks( )
                    .then( ( ) => {
                        resolve( 'ok' )
                    } )
                    .catch( err => {
                        reject( err );
                    })
                }
            })
        })
    }

    #normalizeNotebookname( notebookName ) {
        let initialRegex = /^\d+/;
        let excludeRanges = /[!-/:-@\[-^`{-¿×ØÝ-ß÷þ]/
        let invalidChar = excludeRanges.exec( notebookName )
        if( invalidChar ) {
           return false;
        }
        return initialRegex.exec( notebookName ) ? notebookName.replace( /(^\d+)/, '_$1' ) : notebookName;
    }

}

module.exports = BigBook;