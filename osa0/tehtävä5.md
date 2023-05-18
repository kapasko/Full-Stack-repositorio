```mermaid
sequenceDiagram
	participant browser
	participant server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server->>browser: HTML-tiedosto
    deactivate browser

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
	activate server
	server-->>browser: CSS-tiedosto
	deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
	activate server
	server-->>browser: JavaScript-tiedosto
	deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
	activate server
	server-->>browser: JSON-tiedosto
	deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/favicon.ico
	activate server
	server-->>browser: Selaimen favicon, jota ei näytä olevan.
	deactivate server
	
```