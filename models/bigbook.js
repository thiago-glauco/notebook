const sqlite = require("sqlite3");
const queries = require("../libs/sqlite_templates");

class BigBook {
    /**
     * Métodos públicos:
     *  getNotebooks
     *  findNotebooks
     *  create notebook
     *  delete notebook
     *  renameNotebook
     *  cleanAll
     */
    
    #db
    #sthGetNotebooks
    notebooks

    constructor( ) {
        this.#db = new sqlite.Database( 'C:\\Users\\thiag.LAPTOP-8A3IHU16\\mozilla\\notebook\\notebooks' );
        this.#sthGetNotebooks = this.#db.prepare( queries.getNotebooksSQL );
        this.getNotebooks( )
        .then( res => {
            this.notebooks = res
        })
        .catch( err => console.log ( err ) );
    }

    getNotebooks( filterStr, sorting ) {
        let that = this;
        return new Promise( (resolve, reject ) => {
            that.#sthGetNotebooks.all( (err, rows) => {
                if( err ) {
                    reject( err )
                } else {
                    this.notebooks = rows.map( row => { return row.tbl_name } );
                    resolve( this.notebooks );
                }
            })
        })
        
    }

    createNotebook( notebookName ) {
        let createNotebookQuerie = queries.createTableSTR( notebookName );
        return this.#execDDQuery( createNotebookQuerie )
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

}

module.exports = BigBook;