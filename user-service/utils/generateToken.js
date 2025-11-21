
const generateToken = (user) => {
    return jwt.sign(
        {
            username: user.username,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
};

module.exports = generateToken;
