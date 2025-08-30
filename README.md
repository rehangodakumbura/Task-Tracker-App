# Task Tracker App

A full-stack task management application built with React Native (Expo) frontend and Spring Boot backend.

## Project Overview

This is a complete task management solution featuring user authentication, CRUD operations for tasks, and a modern mobile interface. Users can sign up, log in, create tasks, mark them as complete, edit, and delete them.

## Tech Stack

### Frontend
- **React Native** with Expo
- **Redux Toolkit** for state management
- **React Navigation** for navigation
- **AsyncStorage** for local storage
- **Axios** for API calls
- **Expo Vector Icons** for UI icons

### Backend
- **Spring Boot 3.3.2** (Java 17)
- **Spring Security** with JWT authentication
- **Spring Data JPA** for database operations
- **SQLite** database
- **BCrypt** for password hashing
- **Lombok** for reducing boilerplate code

## Features

### Authentication
- User registration (signup)
- User login with JWT tokens
- Remember Me functionality (saves email for next login)
- Secure password hashing with BCrypt
- Auto-logout on invalid tokens

### Task Management
- Create new tasks with title and description
- View all tasks in an organized list
- Mark tasks as complete/incomplete
- Edit existing tasks
- Delete tasks
- Real-time task statistics (pending/completed/total)

### User Experience
- Responsive mobile design
- Pull-to-refresh functionality
- Loading states and error handling
- Form validation
- Intuitive navigation

## Project Structure

```
TaskTracker-Backend/
├── src/main/java/com/tasktracker/backend/
│   ├── config/
│   │   └── SecurityConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   └── TaskController.java
│   ├── model/
│   │   ├── User.java
│   │   └── Task.java
│   ├── repository/
│   │   ├── UserRepository.java
│   │   └── TaskRepository.java
│   ├── security/
│   │   ├── JwtAuthFilter.java
│   │   └── JwtUtils.java
│   └── TaskTrackerBackendApplication.java
├── src/main/resources/
│   └── application.properties
└── pom.xml

TaskTracker-Frontend/
├── src/
│   ├── components/
│   │   └── TaskItem.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── SignupScreen.js
│   │   ├── HomeScreen.js
│   │   └── AddEditTaskScreen.js
│   └── store/
│       ├── store.js
│       ├── authSlice.js
│       └── tasksSlice.js
├── App.js
└── package.json
```

## Setup Instructions

### Backend Setup

1. **Prerequisites**
   - Java 17 or higher
   - Maven 3.6+

2. **Clone and Run**
   ```bash
   cd TaskTracker-Backend
   mvn clean install
   mvn spring-boot:run
   ```

3. **Database**
   - SQLite database (`tasktracker.db`) will be created automatically
   - No additional database setup required

4. **API Endpoints**
   - Base URL: `http://localhost:8080/api`
   - Auth: `/auth/signup`, `/auth/login`
   - Tasks: `/tasks/{userId}` (GET, POST, PUT, DELETE)

### Frontend Setup

1. **Prerequisites**
   - Node.js 16+ and npm
   - Expo CLI: `npm install -g @expo/cli`
   - Expo Go app on your mobile device

2. **Install Dependencies**
   ```bash
   cd TaskTracker-Frontend
   npm install
   ```

3. **Update API URL**
   - Find your computer's IP address: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
   - Update the API_URL in both slice files:
     - `src/store/authSlice.js`
     - `src/store/tasksSlice.js`
   - Change `http://192.168.200.113:8080/api` to your IP

4. **Run the App**
   ```bash
   npx expo start
   ```
   - Scan QR code with Expo Go app
   - Make sure your phone and computer are on the same WiFi network

## API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
Register a new user
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /api/auth/login
Authenticate user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
Returns JWT token and user ID.

### Task Endpoints (Requires Authentication)

#### GET /api/tasks/{userId}
Get all tasks for a user

#### POST /api/tasks/{userId}
Create a new task
```json
{
  "title": "Complete project",
  "description": "Finish the task tracker app",
  "completed": false
}
```

#### PUT /api/tasks/{taskId}
Update an existing task

#### DELETE /api/tasks/{taskId}
Delete a task

## Security Features

- JWT-based authentication
- Password hashing with BCrypt
- Protected API endpoints
- Secure token storage in mobile app
- CORS configuration for cross-origin requests

## Database Schema

### Users Table
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password` (Hashed)

### Tasks Table
- `id` (Primary Key)
- `title`
- `description`
- `completed` (Boolean)
- `user_id` (Foreign Key)

## Development Notes

### Backend Configuration
- Server runs on port 8080
- SQLite database for easy development
- JWT tokens expire after 24 hours
- CORS enabled for frontend communication

### Frontend State Management
- Redux Toolkit for centralized state
- Separate slices for auth and tasks
- Async thunks for API calls
- Persistent login state with AsyncStorage

## Future Enhancements

Potential features to add:
- Task categories and priorities
- Due dates with notifications
- Dark mode theme
- Task search and filtering
- User profile management
- Task sharing between users

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure backend is running on port 8080
   - Check IP address in frontend API configuration
   - Verify same WiFi network for phone and computer

2. **JWT Token Errors**
   - Clear app data and login again
   - Check token expiration (24 hours)

3. **Build Errors**
   - Clear Metro cache: `npx expo start --clear`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

Built with ❤️ using React Native and Spring Boot
