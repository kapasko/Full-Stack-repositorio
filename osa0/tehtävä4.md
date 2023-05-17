```mermaid
sequenceDiagram
	participant browser
	participant server

	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes
	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
	server->>browser: HTML dokumentti, joka sisältää uuden lisäyksen
	
```
