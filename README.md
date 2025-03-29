# QueryFlow

## OveryFlow
QueryFlow is a web-based SQL query editor that allows users to write, execute, and visualize SQL queries in an intuitive interface. It provides predefined table schemas, multiple query tabs, and resizable panels for an enhanced user experience. The application is designed to be highly performant, with optimized rendering and efficient state management.

## Tech Stack
- **Framework:** React with Vite
- **UI Library:** Material-UI
- **Performance Optimization:** react-window, useMemo, useCallback, React Lazy & Suspense

## Features
- **Navbar & Sidebar:** Includes a menu toggle button, theme switcher (light/dark mode), and a cheat sheet with predefined SQL queries.
- **Table Schema Display:** Shows table structures with columns and data types.
- **Workspace Management:** Users can create and manage multiple workspaces efficiently.
- **Query Editor:** Users can manually input SQL queries or copy them from the cheat sheet.
- **Query Execution:** Displays results along with execution time in a toast notification.
- **Resizable Panels:** Allows users to adjust the editor and results section as needed.
- **Multiple Query Tabs:** Users can open and switch between multiple query tabs.
- **Font Size Adjustment:** Improves readability with font scaling options.
- **Scrollable & Filterable Results:** Users can scroll horizontally/vertically and filter results by column.
- **Export Results:** Query results can be exported for further analysis.
- **Performance Optimizations:** Implemented lazy loading, code splitting, and virtualized rendering.

## Performance Metrics
The application's performance was tested using Google Lighthouse, achieving:
- **Performance Score:** 100
- **Accessibility Score:** 95
- **Best Practices Score:** 100
- **SEO Score:** 91

### Page Load Time
- **First Contentful Paint (FCP):** 0.6s
- **Largest Contentful Paint (LCP):** 0.6s
- **Total Blocking Time (TBT):** 0ms
- **Speed Index:** 0.6s
- **Cumulative Layout Shift (CLS):** 0.001

## Optimizations
### Vite's Built-in Tree Shaking
Vite automatically performs tree shaking during the build process, removing unused code and dependencies from the final bundle. This results in smaller bundle sizes and faster load times for QuerFlow.

### Utilizing `useCallback` and `useMemo` Hooks
- **`useCallback`** optimizes event handler functions to prevent unnecessary re-creation on every render.
- **`useMemo`** memoizes expensive computations to avoid redundant calculations and improve responsiveness.
- These optimizations ensure a smooth experience, especially when dealing with complex queries and large datasets.

### Lazy Loading and Code Splitting
- QuerFlow defers loading of non-essential components using **React Lazy & Suspense**.
- The **react-ace editor** is imported lazily to prevent it from impacting the initial load time.
- This reduces the initial bundle size and improves first paint times.

### Virtualized Rendering with `react-window`
Instead of rendering all table rows at once, QuerFlow uses **react-window** to dynamically render only visible rows. This improves performance, especially when handling large datasets.

### Efficient State Management
- **`useMemo`** and **`useCallback`** minimize re-renders and redundant computations.
- Components are structured efficiently to avoid unnecessary updates.

## Deployment
- The application is deployed on **Vercel**, ensuring fast global load times with automatic optimizations.
