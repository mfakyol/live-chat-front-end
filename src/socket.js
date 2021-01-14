import io from "socket.io-client";
let token = JSON.parse(localStorage.getItem("token"));
const SERVER = "http://localhost:3001";
// const SERVER = "http://192.168.1.5:3001";
let socket = io(SERVER, {query: {token}});
export default socket;