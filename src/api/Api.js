import axios from "axios";

axios.defaults.baseURL = "https://api.jsonbin.io/b/601db51bc033606410a7f18f";
// axios.defaults.headers = {
//   "secret-key": "$2b$10$smdXgZXOVoJ.0kS/lwTdQuKTGQz./wsG.kQEWvqWihEBga9cMdj1W",
//   name: "banks",
// };
export async function fetchBanks() {
  return await axios.get("/banks/");
}
export async function AddBanks(item) {
  return await axios.put("/banks/", item);
}
