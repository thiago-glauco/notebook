/**
 * Just a simple note class
 */
class Note {
    id;
    title;
    owner;
    content;
    timestamp;

    constructor( title, content, owner, timestamp, id ) {
        this.title = title;
        this.content = content;
        this.owner = owner;
        this.timestamp = timestamp ? timestamp : undefined;
        this.id = id ? id : undefined;
    }


}

module.exports = Note