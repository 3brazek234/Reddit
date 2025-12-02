// src/grpcClient.js
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("dotenv").config();

// 1. تحديد مسارات ملفات الـ proto المختلفة
const USER_PROTO_PATH = path.join(__dirname, "../protos/user.proto");
const POST_PROTO_PATH = path.join(__dirname, "../protos/post.proto");
const SUBREDDIT_PROTO_PATH = path.join(__dirname, "../protos/subreddit.proto");
console.log(USER_PROTO_PATH);
// إعدادات التحميل المشتركة
const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const userPackageDefinition = protoLoader.loadSync(
  USER_PROTO_PATH,
  loaderOptions
);
const userProto = grpc.loadPackageDefinition(userPackageDefinition).user.UserService;
const userClient = new userProto(
  process.env.USER_SERVICE_URL,
  grpc.credentials.createInsecure()
);

const postPackageDefinition = protoLoader.loadSync(
  POST_PROTO_PATH,
  loaderOptions
);
const postProto = grpc.loadPackageDefinition(postPackageDefinition).post.PostService;
const postClient = new postProto(
  process.env.POST_SERVICE_URL,
  grpc.credentials.createInsecure()
);

const subredditPackageDefinition = protoLoader.loadSync(
  SUBREDDIT_PROTO_PATH,
  loaderOptions
);
const subredditProto = grpc.loadPackageDefinition(
  subredditPackageDefinition
).subreddit.SubredditService;
const subredditClient = new subredditProto(
  process.env.UBREDDIT_SERVIVE_URL, // تأكد من اسم المتغير في .env (SERVICE مش SERVIVE)
  grpc.credentials.createInsecure()
);

module.exports = { userClient, postClient, subredditClient };
