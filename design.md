--- Put some draft design idea here

### Convention
```
Root Folder id: {ownerid}-Root
Root Folder name: My Folders
Special folder: {ownerid}-Recent {ownerid}-Starred {ownerid}-Trash
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
          selectedFolderId === '{ownerid}-Starred' means load starred notes
          selectedFolderId === '{ownerid}-Trash' means load trash
          selectedNoteId === '' means select the first note
listen: updateNote(noteData)
listen: deleteNote(noteId)
emit: loadNoteWithId(noteId)
emit: refreshFolderList(selectedFolderId)

NoteFolder:
listen: refreshFolderList(selectedFolderId)
emit: refreshNoteList(selectedFolderId, selectedNoteId)

Header:
emit: switchViewType(viewType)

Layout:
listen: switchViewType(viewType) // 1: 1 column, 2: 2 columns, 3: 3 columns
```

### HandyNote-Mobile Message System
```
TopBar:
emit: syncFinished

NoteList:
FolderList:
listen: syncFinished
```

### HandyNote-Web Local Storage
```
hn-pane-sizes: array of 3 column size, eg: [12, 20, 68]
hn-token: current user token (expire in 1 day)
hn-user: current user name
```

### el-tree Node Structure
```
folderRoot: {
  type: 0, // only set for root node
  id: '{ownerid}-Root',
  label: 'My Folders',
  ancestor_ids: [],
  children: [],
  note_count_cur: 0, // count of notes under current folder
  note_count_all: 0 // count of notes under current folder and all sub folders
}
```

### Build Env
```
# for build HandyNote-Service
HANDYNOTE_SERVICE_PORT
HANDYNOTE_MONGO_URL
HANDYNOTE_STATIC_ROOT

# for build HandyNote-Web & HandyNote-Mobile
HANDYNOTE_WEB_PORT (only apply for debug mode)
HANDYNOTE_SERVICE_API
```
