/*module.exports.createTableSTR = ( notebookName ) => {
    return `create table "${notebookName}" (
    title text not null check( length( title ) <= 100 ),
    owner text not null check( length( owner ) <= 100 ),
    note  text check( length( note ) <= 500 ),
    created_at text dafault CURRENT_TIMESTAMP
    );`
};
*/

module.exports.createTableSTR = ( notebookName ) => {
    return `create table if not exists "${notebookName}" (
    title text not null unique check( length( title ) <= 100 ),
    owner text not null check( length( owner ) <= 100 ),
    note  text check( length( note ) <= 500 ),
    created_at text dafault CURRENT_TIMESTAMP
    );`
};

module.exports.dropTableSTR = ( notebookName ) => {
    return `drop table if exists "${notebookName}";`
};

module.exports.insertNote = ( notebookName ) => {
    return `insert into "${notebookName}" (title, owner, note, created_at) values(?,?,?, datetime( 'now' ) );`
}

module.exports.getNotes = ( notebookName ) => {
    return `select * from "${notebookName}";`
}

module.exports.getNotebooksSQL = `select * from sqlite_schema order by tbl_name asc`;