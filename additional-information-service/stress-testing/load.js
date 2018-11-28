import http from "k6/http";
import { check, group, sleep } from "k6";
import { Rate } from "k6/metrics";

// // A custom metric to track failure rates
// var failureRate = new Rate("check_failure_rate");

// // Options
// export let options = {
//   stages: [
//     // Linearly ramp up from 1 to 50 VUs during first minute
//     { target: 50, duration: "1m" }
//     // Hold at 50 VUs for the next 3 minutes and 30 seconds
//     // { target: 100, duration: "3m30s" },
//     // // Linearly ramp down from 50 to 0 50 VUs over the last 30 seconds
//     // { target: 0, duration: "30s" }
//     // Total execution time will be ~5 minutes
//   ],
//   thresholds: {
//     // We want the 95th percentile of all HTTP request durations to be less than 500ms
//     http_req_duration: ["p(95)<500"],
//     // Requests with the staticAsset tag should finish even faster
//     "http_req_duration{staticAsset:yes}": ["p(99)<250"]
//     // Thresholds based on the custom metric we defined and use to track application failures
//     // check_failure_rate: [
//     //   // Global failure rate should be less than 1%
//     //   "rate<0.01",
//     //   // Abort the test early if it climbs over 5%
//     //   { threshold: "rate<=0.05", abortOnFail: true }
//     // ]
//   }
// };

// // Main function
// export default function() {
//   let response = http.get("http://localhost:8081/9999859");

//   // check() returns false if any of the specified conditions fail
//   let checkRes = check(response, {
//     "status is 200": r => r.status === 200,
//     "content is present": r =>
//       r.body.indexOf(
//         "The list price and Zestimate for this home are very different, so we might be missing something."
//       ) !== -1
//   });

//   // We reverse the check() result since we want to count the failures
//   failureRate.add(!checkRes);

//   // Load static assets, all requests
//   group("DB TEST", function() {
//     // Execute multiple requests in parallel like a browser, to fetch some static resources
//     let resps = http.batch([
//       [
//         "POST",
//         "http://localhost:8081/graphql",
//         {
//           operationName: 'Current',
//           query: 'query Current($num: [Int]!) { getSome(num: $num) { address city beds baths sqFt status taxAssessment __typename } }',
//           variables: {
//               num: {
//                   0: 9999860
//               }
//           }
//         }
//       ]
//     ]);
//     // Combine check() call with failure tracking
//     failureRate.add(
//       !check(resps, {
//         "status is 200": r => r[0].status === 200 && r[1].status === 200,
//         "reused connection": r => r[0].timings.connecting == 0
//       })
//     );
//   });

//   sleep(Math.random() * 3 + 2); // Random sleep between 2s and 5s
// }

export let options = {
  duration: "1m",
  vus: 10
};

// let headers = { "Content-Type": "application/json" };

export default function() {
  http.get(
    "http://localhost:8888/9999985"
    // JSON.stringify({
    //   operationName: "Current",
    //   query:
    //     "query Current($num: [Int]!) { getSome(num: $num) { address city beds baths sqFt status taxAssessment __typename } }",
    //   variables: {
    //     num: 9999860
    //   }
    // }),
    // { headers: headers }
  );
}

/*
http://localhost:8081/graphql/10?query=%23%20Welcome%20to%20GraphiQL%0A%23%0A%23%20GraphiQL%20is%20an%20in-browser%20tool%20for%20writing%2C%20validating%2C%20and%0A%23%20testing%20GraphQL%20queries.%0A%23%0A%23%20Type%20queries%20into%20this%20side%20of%20the%20screen%2C%20and%20you%20will%20see%20intelligent%0A%23%20typeaheads%20aware%20of%20the%20current%20GraphQL%20type%20schema%20and%20live%20syntax%20and%0A%23%20validation%20errors%20highlighted%20within%20the%20text.%0A%23%0A%23%20GraphQL%20queries%20typically%20start%20with%20a%20%22%7B%22%20character.%20Lines%20that%20starts%0A%23%20with%20a%20%23%20are%20ignored.%0A%23%0A%23%20An%20example%20GraphQL%20query%20might%20look%20like%3A%0A%23%0A%23%20%20%20%20%20%7B%0A%23%20%20%20%20%20%20%20field(arg%3A%20%22value%22)%20%7B%0A%23%20%20%20%20%20%20%20%20%20subField%0A%23%20%20%20%20%20%20%20%7D%0A%23%20%20%20%20%20%7D%0A%23%0A%23%20Keyboard%20shortcuts%3A%0A%23%0A%23%20%20Prettify%20Query%3A%20%20Shift-Ctrl-P%20(or%20press%20the%20prettify%20button%20above)%0A%23%0A%23%20%20%20%20%20%20%20Run%20Query%3A%20%20Ctrl-Enter%20(or%20press%20the%20play%20button%20above)%0A%23%0A%23%20%20%20Auto%20Complete%3A%20%20Ctrl-Space%20(or%20just%20start%20typing)%0A%23%0A%0A%7B%0A%20%20getSome(num%3A%209999999)%7B%0A%20%20%20%20id%0A%20%20%20%20address%0A%20%20%20%20city%0A%20%20%20%20beds%0A%20%20%20%20baths%0A%20%20%20%20sqFt%0A%20%20%20%20status%0A%20%20%20%20taxAssessment%0A%20%20%7D%0A%7D
*/
