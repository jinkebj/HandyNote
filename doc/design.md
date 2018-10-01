--- Put some draft design idea here

### Convention
```
Root Folder id: {ownerid}-Root
Root Folder name: My Folders
Special folder: {ownerid}-Search {ownerid}-Recent {ownerid}-Starred {ownerid}-Trash
```

### Simplify Trash Rule
if sub item(note or folder) & parent folder both got deleted, treat them as one trash item with parent folder's id

### HandyNote-Web Message System
```
NoteDetail:
listen: loadNoteWithId(noteId) // noteId === '' means no content
listen: showImgDetail(src)
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
listen: searchNote(searchStr)
emit: loadNoteWithId(noteId)
emit: refreshFolderList(selectedFolderId)

NoteFolder:
listen: refreshFolderList(selectedFolderId)
listen: selectSearch(searchStr)
emit: searchNote(searchStr)
emit: refreshNoteList(selectedFolderId, selectedNoteId)

ImageHandler:
emit: showImgDetail(src)

ImageDetail:
emit to parent component: updateImage

Header:
emit: switchViewType(viewType)
emit: selectSearch(searchStr)

Layout:
listen: switchViewType(viewType) // 1: 1 column, 2: 2 columns, 3: 3 columns
```

### HandyNote-Mobile Message System
```
FolderItem:
emit: refreshFolderList
listen: refreshFolderList (pop up event to parent component: FolderItem or FolderList)

FolderList:
listen: refreshFolderList

FolderSelectItem:
emit: selectFolder(folderId)
listen: selectFolder(folderId) (pop up event to parent component: FolderItem or FolderList)

FolderSelect:
listen: selectFolder(folderId)

ImageHandler:
emit: showImgDetail(src)

NoteDetail:
listen: showImgDetail(src)

TopBar:
emit: syncFinished

NoteList:
listen: syncFinished

FolderList:
listen: syncFinished
```

### HandyNote-Web Local Storage
```
hn-pane-sizes: array of 3 column size percentage, default value: [17, 23, 60]
hn-token: current user token
hn-user: current user name
```

### HandyNote-Mobile Local Storage
```
hn-token: current user token
hn-user: current user name
hn-local-usn: local update sequence number for current user
hn-base-api-url: base api url of connected HandyNote-Service
hn-folder-list-cache: local folder list cache
```

### HandyNote-Web el-tree Node Structure
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
HANDYNOTE_CERT_PATH

# for build HandyNote-Web & HandyNote-Mobile
HANDYNOTE_SERVICE_API
```

### Sync Mechanism

DB schema:
```
1. collection "notes", "folders", "users" have a field "usn" (update sequence number)
2. each time note/folder got created/updated/deleted, get new usn value by increase "users -> usn"
3. also save this new usn to note/folder who got created/updated/deleted
```

HandyNote-Service API:
```
1. GET /notes?skip_usn={num} to return notes with usn > skip_usn
2. GET /folders?skip_usn={num} to return folders with usn > skip_usn
3. GET /profiles return fields "latestUsn" to indicate the latest update sequence number on server
4. POST /notes/action with {action: "filter_non_exist", ids: "xxx,yyy"} to get non-exist node id from the given ids
5. POST /folders/action with {action: "filter_non_exist", ids: "xxx,yyy"} to get non-exist folder id from the given ids
```

HandyNote-Mobile:
```
1. use local storage "hn-local-usn" to save local update sequence number for current user
2. compare local usn with server usn to determin if local data is up-to-date
3. get non-exist notes/folders in local data via HandyNote-Service API and delete them
4. get notes/folders with usn > hn-local-usn via HandyNote-Service API and update them to local data
5. update "hn-local-usn" to server "latestUsn"
```
