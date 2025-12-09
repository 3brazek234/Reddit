// D:\microservices\Reddit\post-service\index.js
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { startGrpcServer } = require("./grpc/grpcServer");
const postServices = require("./grpc/postServices");
const db = require("./config/db");

const PROTO_PATH = path.join(__dirname, "protos/post.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const post_proto = grpc.loadPackageDefinition(packageDefinition);
let targetService;

if (post_proto.post && post_proto.post.PostService) {
    targetService = post_proto.post.PostService.service;
} 
// الاحتمال الثاني: لو مش عامل package
else if (post_proto.PostService) {
    targetService = post_proto.PostService.service;
} 
else {
    console.error("❌ FATAL: Could not find PostService definition.");
    console.log("Loaded Proto structure:", Object.keys(post_proto));
    process.exit(1); 
}

console.log("🔄 Attempting to start server...");
db().then(() => {
    console.log("🔄 Starting gRPC Server...");
    startGrpcServer(targetService, postServices);
});