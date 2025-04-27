### Specification for File Upload Web Application

#### Overview
The application is a web-based file upload system that allows users to upload files, view upload history, and download previously uploaded files. It includes a server-side implementation using Node.js and Express, and a client-side interface built with HTML, CSS, and JavaScript.

---

### Functional Requirements

#### 1. **File Upload**
- Users can upload files through a form on the webpage.
- The uploaded file is saved in the `uploads` directory on the server.
- The server responds with the file name, file path, and upload timestamp.

#### 2. **File Download**
- Users can download previously uploaded files by clicking on the file name in the upload history.

#### 3. **Upload History**
- The webpage displays a list of previously uploaded files.
- Each entry in the history includes:
    - File name (as a clickable download link).
    - Upload timestamp.

#### 4. **File Preview**
- If the uploaded file is an image (`.jpg`, `.jpeg`, `.png`, `.gif`), it is displayed in the preview section.
- Non-image files are displayed as text with their file name.

#### 5. **Error Handling**
- Displays an error message if:
    - No file is selected for upload.
    - The upload fails.
    - The upload history cannot be fetched.

#### 6. **Automatic Browser Launch**
- The server automatically opens the application in the default browser when started.

#### 7. **Graceful Shutdown**
- Pressing the `Q` key in the terminal stops the server and exits the process.

---

### Non-Functional Requirements

#### 1. **Performance**
- The server should handle multiple file uploads without crashing.
- The upload history should load quickly.

#### 2. **Compatibility**
- The application should work on modern browsers.
- The server should run on Node.js v22.15.0 or compatible versions.

#### 3. **Security**
- Only files uploaded through the form are saved to the server.
- Uploaded files are stored in a dedicated `uploads` directory.

#### 4. **Usability**
- The interface is user-friendly, with clear instructions and feedback for actions.
- The layout is responsive and adapts to different screen sizes.

---

### API Endpoints

#### 1. **POST `/upload`**
- **Description**: Handles file uploads.
- **Request**: Multipart form data with the file.
- **Response**: JSON containing:
    - `fileName`: Name of the uploaded file.
    - `filePath`: Path to the uploaded file.
    - `uploadTime`: Timestamp of the upload.

#### 2. **GET `/uploads/:fileName`**
- **Description**: Serves uploaded files for download.
- **Request**: File name as a URL parameter.
- **Response**: File download or 404 if the file is not found.

#### 3. **GET `/history`**
- **Description**: Fetches the upload history (to be implemented).
- **Response**: JSON array of uploaded files (file name, path, and timestamp).

---

### User Interface

#### 1. **File Upload Form**
- Input field for selecting a file.
- Submit button to upload the file.
- Error message area for invalid uploads.

#### 2. **Upload History**
- List of previously uploaded files with download links.
- Timestamp for each file.

#### 3. **File Preview**
- Displays uploaded images or file names.

---

### Dependencies

#### 1. **Server-Side**
- `express`: Web framework.
- `multer`: Middleware for handling file uploads.
- `path`: For file path operations.
- `fs`: For file system operations.
- `cors`: To enable cross-origin requests.
- `open`: To open the browser automatically.

#### 2. **Client-Side**
- HTML, CSS, and JavaScript for the user interface.

---

### Assumptions
- The `uploads` directory exists or is created at runtime.
- The server runs on `http://localhost:3000`.
- The `open` module is correctly installed and compatible with the Node.js version.