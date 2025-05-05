
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaSpinner, FaFilm, FaStar, FaTicketAlt } from 'react-icons/fa';
import "./LoginPage.css";
import { AuthContext } from './context/AuthContext';


const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u =>
                u.email === formData.email &&
                u.password === formData.password
            );

            if (!user) {
                setError('Invalid email or password. Please try again.');
                setLoading(false);
                return;
            }

            const sessionUser = {
                id: user.id,
                username: user.username,
                email: user.email
            };

            login(sessionUser);

            setFormData({ email: "", password: "" });
            setError("");  // Clear any old errors
            setLoading(false);

            navigate('/dashboard');
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', error);
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="left-section">
                <button 
                    className="back-button" 
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    <FaArrowLeft />
                </button>

                <div className="animated-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>

                <div className="trust-content">
                    <h1 className="trust-title">Your Movie Journey Begins Here</h1>
                    <div className="trust-features">
                        <div className="feature-item">
                            <div className="feature-icon"><FaFilm /></div>
                            <div className="feature-text">
                                <h3>Vast Collection</h3>
                                <p>Access thousands of movies</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><FaStar /></div>
                            <div className="feature-text">
                                <h3>Personalized Recommendations</h3>
                                <p>Discover your next favorite film</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><FaTicketAlt /></div>
                            <div className="feature-text">
                                <h3>Watch Anywhere</h3>
                                <p>Stream on all your devices</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right-section">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Welcome to MovieVerse</h2>

                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            disabled={loading}
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                disabled={loading}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="spinner" />
                                <span>Authenticating...</span>
                            </>
                        ) : "Start Watching"}
                    </button>

                    <p className="signup-link">
                        New to MovieVerse? <Link to="/signup">Join Now</Link>
                    </p>

                    <p className="forgot-password">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
