const { getGrpcServer, startGrpcServer } = require("./grpc/grpcServer");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const path = require("path");
const db = require("./config/db");
const userImplementation = require("./grpc/userService");

const PROTO_PATH = path.join(__dirname, "proto/user.proto");

// 1. Connect to DB
db.connect()
  .then(() => console.log("Connected to database successfully."))
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false, 
  longs: String,
  defaults: true,
  oneofs: true,
});

const user_package = grpc.loadPackageDefinition(packageDefinition);

const userServiceDefinition = user_package.user.UserService.service;
startGrpcServer();
const server = getGrpcServer();

server.addService(userServiceDefinition, userImplementation);

console.log("gRPC server initialized with UserService.");