module.exports.createTableSTR = ( notebookName ) => {
    return `create table ${notebookName} (
    title text not null check( length( title ) <= 100 ),
    owner text not null check( length( owner ) <= 100 ),
    note  text check( length( note ) <= 500 )
    );`
};

module.exports.dropTableSTR = ( notebookName ) => {
    return `drop table if exists ${notebookName};`
};

module.exports.getNotebooksSQL = `select * from sqlite_schema order by tbl_name asc`;