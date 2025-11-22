// grpc/userService.js
const grpc = require("@grpc/grpc-js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken"); // Note the path change
const db = require("../config/db");

const SALT_ROUNDS = 10;

const userImplementation = {
  createToken: async (call, callback) => {
    const { email, password } = call.request;
    try {
      const { rows } = await db.query(
        `SELECT email, username, password FROM users WHERE email =$1`,
        [email]
      );
      if (rows.length <= 0) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "user not found, try sign up",
        });
      }
      const isMatched = await bcrypt.compare(password, rows[0].password);
      if (!isMatched) {
        return callback({
          code: grpc.status.UNAUTHENTICATED,
          details: "wrong password",
        });
      }
      const token = generateToken(rows[0]);

      return callback(null, { token });
    } catch (err) {
      console.error("Error creating token:", err);
      return callback({
        code: grpc.status.INTERNAL,
        details: "internal server error",
      });
    }
  },

  getUser: async (call, callback) => {
    console.log(`Received GetUser request for ID: ${call.request.id}`);
    const { id } = call.request;

    try {
      const { rows } = await db.query(
        `SELECT id, username, email FROM users WHERE id = $1`,
        [id]
      );

      if (rows.length > 0) {
        callback(null, { user: rows[0] });
      } else {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: `User with ID ${id} not found.`,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error while fetching user data.",
      });
    }
  },
  createUser: async (call, callback) => {
    const { username, email, password } = call.request;
    try {
      const isExistingUser = await db.query(
        `SELECT id FROM users WHERE email = $1`,
        [email]
      );

      if (isExistingUser.rows.length > 0) {
        return callback({
          code: grpc.status.ALREADY_EXISTS,
          details: `User with email: ${email} already exists. Please try logging in.`,
        });
      }
    } catch (error) {
      console.error("Error checking existing user:", error);
      return callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error while checking for existing user.",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    } catch (hashError) {
      console.error("Error hashing password:", hashError);
      return callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error while processing password.",
      });
    }

    try {
      const { rows } = await db.query(
        `INSERT INTO users (email, password, username) VALUES($1, $2, $3) RETURNING id`,
        [email, hashedPassword, username]
      );

      if (rows.length > 0) {
        console.log(`User created successfully with ID: ${rows[0].id}`);
        callback(null, { id: rows[0].id });
      } else {
        throw new Error("Insert failed without returning an ID");
      }
    } catch (error) {
      console.error("Error inserting user:", error);
      return callback({
        code: grpc.status.INTERNAL,
        details: "Failed to create user record in database.",
      });
    }
  },
  // You also need to implement the IsAuthenticated service method!
  isAuthenticated: async (call, callback) => {
    // This function needs the logic from utils/generateToken.js to verify the token
    // You'll need a verifyToken function in that utility file.
    // Example placeholder:
    const { token } = call.request;
    try {
      const decodedUser = verifyToken(token); // Assuming you add this helper
      // Fetch full user details from DB if necessary or just return decoded info
      callback(null, { user: decodedUser, ok: true });
    } catch (error) {
      callback({ code: grpc.status.UNAUTHENTICATED, details: "Invalid token" });
    }
  },
};

module.exports = userImplementation;
