PictoPost Application Documentation
Overview
PictoPost is a social media platform allowing users to create posts with images and accompanying text. Users can upload images via file upload or provide an image URL. The application is built using Node.js, Express.js, EJS templating, and Bootstrap for styling.

Features
View all posts in a grid layout with username, image, and context.

Create new posts with username, text, and image (upload or URL).

Edit existing posts, including updating text and image.

Delete posts.

Responsive design powered by Bootstrap.

Project Structure
text
/your-project-root
├── /public
│   └── /images           # Default/static images
│   └── /uploads          # Uploaded images by users
├── /views                # EJS templates
│   ├── index.ejs         # Posts listing page
│   ├── new.ejs           # New post form
│   ├── edit.ejs          # Edit post form
│   └── view.ejs          # Single post display
├── index.js              # Main Express server
├── package.json          # Project dependencies and scripts
└── README.md             # This documentation file
Dependencies
Express

EJS

Multer (for file uploads)

Method-override (for PUT/PATCH/DELETE method support in forms)

UUID (to create unique IDs for posts)

Bootstrap (via CDN for styling)

Server Setup (index.js)
Middleware
express.json() and express.urlencoded() to parse JSON and form data

method-override to support HTTP verbs such as PATCH and DELETE via forms

multer for handling multipart file uploads stored under public/uploads

Static file serving from public directory

View engine set to EJS

Routes
1. Home Route
js
app.get("/", (req, res) => {
  res.send("server working well!");
});
2. Posts Listing (GET /posts)
Renders index.ejs with all posts.

3. New Post Form (GET /posts/new)
Renders new.ejs with a form for creating posts.

4. Create Post (POST /posts)
Handles new post creation. Accepts uploaded image file or image URL. Assigns default image if none provided.

5. View Post (GET /posts/:id)
Renders view.ejs showing a single post’s details.

6. Edit Post Form (GET /posts/:id/edit)
Renders edit.ejs form pre-filled with post data.

7. Update Post (PATCH /posts/:id)
Updates post context and optionally updates image via file or URL.

8. Delete Post (DELETE /posts/:id)
Deletes post by ID.

Frontend Templates (EJS)
Layout
Bootstrap 5 used for responsiveness and styling

Cards display posts with images, usernames, and text content

Buttons for View, Edit, Delete on each post card

Key Files
index.ejs — posts grid with action buttons

new.ejs — new post form with image upload or URL input

edit.ejs — edit post form with current data and optional new image

view.ejs — single post detail view with image and text

Image Handling
Static images stored in public/images

User uploads saved to public/uploads

Posts store image path or full URL in url property

Frontend shows image using <img src="<%= post.url %>" />

Usage
Start server with node index.js or nodemon index.js

Access app at http://localhost:8080/posts

Add, view, edit, and delete posts via UI

Notes
Data stored in-memory; restarting the server resets posts.

For production, integrate a database for persistence.