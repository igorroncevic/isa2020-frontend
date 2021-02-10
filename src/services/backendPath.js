exports.getBackendPath = () => {
    return process.env.BACKEND_PATH ? "https://isa-pharmacy-team18-backend.herokuapp.com" : "http://localhost:8085"
}