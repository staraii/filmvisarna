export const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next(); // User is authenticated, proceed
    }
    return res.status(401).json({ message: "Unauthorized" }); // User is not authenticated
};
//# sourceMappingURL=authmiddleware.js.map