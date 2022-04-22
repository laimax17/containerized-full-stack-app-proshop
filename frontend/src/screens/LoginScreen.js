import React, { useState, useEffect } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Form, Button, Row, Col } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { login } from "../actions/userActions"


const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const [searchParms] = useSearchParams()
    const redirect = searchParms.get("redirect") || "/"

    useEffect(() => {
        if (userInfo) {
            navigate(`../${redirect}`)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    };

    return (
        <FormContainer>
            <br />
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <br />
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <br />
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <br />
                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer?{" "}
                    <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;