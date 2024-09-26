
// src/pages/LoginPage.js
import  { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log("Login submitted:", { email, password });
        // Your login logic here (e.g., API call)
        navigate("/"); // Redirect after login
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">Logga in</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>E-postadress</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ange din e-postadress"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ange ditt lösenord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Logga in
                </Button>
            </Form>
        </Container>
    );
};

export default LoginPage;
