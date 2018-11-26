const faker = require("faker");
// const mongoose = require("mongoose");
// const House = require("./House.js");
// const db = require("./index.js");
const fs = require("fs");

const random = num => Math.ceil(Math.random() * num);
const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min - 1) + min);

// const zestHistory = () => {
//   let total = 300000;
//   const years = 8 + random(2);
//   const months = random(12);
//   let count = 0;
//   const spike = [12, 7, 12, 5, 8, 5, 14, 3, 19, 1000];
//   const slope = [
//     -4000,
//     -3000,
//     -1000,
//     2000,
//     5000,
//     2000,
//     5000,
//     3000,
//     10000,
//     7000,
//     700,
//     -700
//   ];
//   let moreSlope = 0;

//   return Array.from({ length: years * 12 + months }, () => {
//     count++;
//     if (count % spike[0] === 0) {
//       const rand = random(4);
//       moreSlope = rand > 2 ? 2000 : rand === 2 ? -2000 : 0;
//       if (spike[0] === 14) {
//         moreSlope = 8000;
//       }
//       spike.shift();
//     }
//     total += slope[Math.floor(count / 12)] + moreSlope;

//     return total + random(7000);
//   });
// };

let count = 0;

const seedFunc = i => {
  const id = count;
  count++;

  // const zestimate = zestHistory();
  let ourObj = {
    _id: id,
    address: `${faker.address.streetAddress()}`,
    city: `${faker.address.county()}`,
    zip: 98100 + random(99),
    // zestimate,
    beds: 3 + Math.floor(Math.random() * 2.5),
    baths: 2.5 + 0.5 * Math.floor(Math.random() * 3),
    sqFt: 1150 + 10 * random(20),
    status: `${Math.random() < 0.5 ? "For Sale" : "Sold"}`,
    taxAssessment: randomBetween(100000, 500000) * 0.937
  };

  return `${ourObj._id},${ourObj.address},${ourObj.city},${ourObj.zip},${
    ourObj.beds
  },${ourObj.baths},${ourObj.sqFt},${ourObj.status},${ourObj.taxAssessment}\n`;
};

// const makeCSV = async () => {
//   console.time("makedata");
//   // let csvStream = csv.createWriteStream({ headers: false });
//   // let readStream = fs.createReadStream(csvStream);
//   // let writableStream = fs.createWriteStream("test-4.csv");

//   // // writableStream.on("finish", () => {
//   // //   console.log("done");
//   // // });

//   // for (let i = 0; i < 10000000; i++) {
//   //   csvStream.write(seedFunc());
//   //   csvStream.pipe(readStream).pipe(writableStream);
//   // }
//   // csvStream.end();

//   console.timeEnd("makedata");
// };

const { Readable } = require("stream");
const inStream = new Readable({
  read() {
    this.push(seedFunc());
    if (count === 10000000) {
      this.push(null);
      console.timeEnd("MainTime");
    }
  }
});

console.time("MainTime");
let writableStream = fs.createWriteStream("test-4.csv");
inStream.pipe(writableStream);
