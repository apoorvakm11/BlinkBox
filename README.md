# BlinkBox - Secure Sharing in blink

PeerLink is a peer-to-peer file sharing application that allows users to share files directly between devices using a simple invite code system.

## Features

- Drag and drop file upload
- File sharing via invite codes (port numbers)
- File downloading using invite codes
- Modern, responsive UI
- Direct peer-to-peer file transfer

## How It Works

1. **File Upload**:
   - User uploads a file through the UI
   - The file is sent to the Java backend
   - The backend assigns a unique port number (invite code)
   - The backend starts a file server on that port

2. **File Sharing**:
   - The user shares the invite code with another user
   - The other user enters the invite code in their UI

3. **File Download**:
   - The UI connects to the specified port
   - The file is transferred directly from the host to the recipient

## Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│  Next.js UI │◄────►│ Java Server │◄────►│ Peer Device │
│             │      │             │      │             │
└─────────────┘      └─────────────┘      └─────────────┘


### Component Details

1. **Frontend Components**
   - `NextJSApp`: Main application component managing state and routing
   - `FileUploadComponent`: Handles drag-and-drop file uploads
   - `FileDownloadComponent`: Manages file downloads using invite codes

2. **Backend Components**
   - `App`: Main application entry point and server initialization
   - `FileController`: REST API endpoints for file operations
   - `FileService`: Core business logic for file handling
   - `FileUtils`: Utility functions for file validation and port management

3. **Data Flow**
   - File uploads are handled through drag-and-drop
   - Invite codes (port numbers) are generated for sharing
   - Direct peer-to-peer file transfer using WebSocket connections

## Security Considerations

- This is a demo application and does not include encryption or authentication
- For production use, consider adding:
  - File encryption
  - User authentication
  - HTTPS support
  - Port validation and security


