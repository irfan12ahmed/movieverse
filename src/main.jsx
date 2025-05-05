import { AuthProvider } from './AuthContext';

// Wrap your App component
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);