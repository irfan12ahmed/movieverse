// routes.js
export const publicRoutes = [
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> }
  ];
  
  export const protectedRoutes = [
    { path: '/dashboard', element: <Dashboard /> }
  ];