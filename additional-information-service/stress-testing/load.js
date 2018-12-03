import http from "k6/http";

export let options = {
  duration: "30s",
  vus: 125
};

// let headers = { "Content-Type": "application/json" };

export default function() {
  http.get("");
}
