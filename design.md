--- Put some draft design idea here

### Convention
```
Root Folder id: {ownerid}-Root
Root Folder name: My Folders
Special folder: {ownerid}-Recent {ownerid}-Trash
```

### Simplify Trash Rule
if sub item(note or folder) & parent folder both got deleted, treat them as one trash item with parent folder's id

### HandyNote-Web Message System
```
NoteDetail:
listen: loadNoteWithId(noteId) // noteId === '' means no content
emit: updateNote(noteData)
emit: deleteNote(noteId)

NoteList:
listen: refreshNoteList(selectedFolderId, selectedNoteId)
          selectedFolderId === '{ownerid}-Recent' means load recent notes
          selectedFolderId === '{ownerid}-Trash' means load trash
          selectedNoteId === '' means select the first note
listen: updateNote(noteData)
listen: deleteNote(noteId)
emit: loadNoteWithId(noteId)
emit: refreshFolderList(selectedFolderId)

NoteFolder:
listen: refreshFolderList(selectedFolderId)
emit: refreshNoteList(selectedFolderId, selectedNoteId)
```

### Build Env
```
HANDYNOTE_SERVICE_PORT
HANDYNOTE_MONGO_URL

HANDYNOTE_WEB_PORT
HANDYNOTE_SERVICE_API
```
