# Todo List Application

React application demonstrating data fetching, custom hooks, design patterns, and performance optimization.

## Component Tree

App (composition root)
└── TodoList (container)
    ├── SearchBar (presentational)
    ├── TodoItem (presentational, memoized)
    └── Pagination (presentational)

## Data Flow

- `useTodos` custom hook encapsulates all data logic (fetching, search, pagination, CRUD)
- Data flows downward via props
- Events flow upward via callback functions
- Search is applied client-side to the currently fetched page of todos

## Used React Design Patterns

- **Custom Hooks Pattern** - `useTodos` encapsulates all data logic
- **Container / Presentational Components** - Clear separation between logic and UI
- **Composition over Inheritance** - Components are composed together
- **State Colocation** - Edit state lives in `TodoItem` where it's used
- **Unidirectional Data Flow** - Props down, callbacks up
- **Controlled Components** - Form inputs controlled by React state

## Performance Optimization (Lab 17)

Optimizations applied:

- **React.memo** used for `TodoItem` to prevent unnecessary re-renders when parent updates
- **useCallback** used to stabilize callback props passed to memoized components (`handleEdit`, `handleDelete`)
- **useMemo** used to optimize expensive search filtering and provide stable references
- Pagination controls also use `useCallback` for stable references

These optimizations reduce unnecessary renders caused by parent component updates.

## CRUD Functionality

CRUD functionality (edit and delete) was preserved from previous labs to maintain feature completeness.

## API Integration

- Uses DummyJSON fake REST API (https://dummyjson.com/todos)
- GET request with pagination (`limit` and `skip` parameters)
- PUT request for editing todo titles
- DELETE request for removing todos

## Project Structure

```
src/
├── hooks/
│   └── useTodos.js          # Custom hook with all data logic
├── components/
│   ├── TodoList.jsx         # Container component
│   ├── TodoItem.jsx         # Presentational component (memoized)
│   ├── SearchBar.jsx        # Presentational component
│   └── Pagination.jsx       # Presentational component
├── App.jsx                  # Composition root
└── main.jsx
```

## Features

- ✅ Fetch todos from API with pagination
- ✅ Search todos (client-side filtering)
- ✅ Edit todo titles
- ✅ Delete todos
- ✅ Navigate between pages
- ✅ Loading and error states
- ✅ Performance optimized with React.memo, useMemo, useCallback