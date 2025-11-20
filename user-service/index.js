const { getGrpcServer, startGrpcServer } = require("./grpc");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const PROTO_PATH = __dirname + "/user.proto";
// Convert the proto file to a package definition "Javascript Object"
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  defaults: true,
  oneofs: true,
});
const user_proto = grpc.loadPackageDefinition(packageDefinition);
startGrpcServer();
const server = getGrpcServer();
server.addService(user_proto.UserService.service, {});
