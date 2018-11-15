const faker = require("faker");
// const mongoose = require("mongoose");
// const House = require("./House.js");
// const db = require("./index.js");
const fs = require("fs");
const csv = require("fast-csv");

const random = num => Math.ceil(Math.random() * num);

const zestHistory = () => {
  let total = 300000;
  const years = 8 + random(2);
  const months = random(12);
  let count = 0;
  const spike = [12, 7, 12, 5, 8, 5, 14, 3, 19, 1000];
  const slope = [
    -4000,
    -3000,
    -1000,
    2000,
    5000,
    2000,
    5000,
    3000,
    10000,
    7000,
    700,
    -700
  ];
  let moreSlope = 0;

  return Array.from({ length: years * 12 + months }, () => {
    count++;
    if (count % spike[0] === 0) {
      const rand = random(4);
      moreSlope = rand > 2 ? 2000 : rand === 2 ? -2000 : 0;
      if (spike[0] === 14) {
        moreSlope = 8000;
      }
      spike.shift();
    }
    total += slope[Math.floor(count / 12)] + moreSlope;

    return total + random(7000);
  });
};

let count = 0;

const seedFunc = () => {
  const id = count;
  count++;

  // const zestimate = zestHistory();
  return {
    _id: id.toString(),
    address: `${faker.address.streetAddress()}`,
    city: `${faker.address.county()}`,
    zip: 98100 + random(99),
    // zestimate,
    beds: 3 + Math.floor(Math.random() * 2.5),
    baths: 2.5 + 0.5 * Math.floor(Math.random() * 3),
    sqFt: 1150 + 10 * random(20),
    status: `${Math.random() < 0.5 ? "For Sale" : "Sold"}`
    // taxAssessment: zestimate[zestimate.length - 1] * 0.937
  };
};

const makeCSV = async () => {
  console.time("makedata");
  let csvStream = csv.createWriteStream({ headers: false });
  let writableStream = fs.createWriteStream("test-3.csv");

  writableStream.on("finish", () => {
    console.log("done");
  });
  csvStream.pipe(writableStream);
  for (let i = 0; i < 10000000; i++) {
    // const ableToWrite = csvStream.write(seedFunc());
    csvStream.write(seedFunc());
    // if (!ableToWrite) {
    //   await new Promise(resolve => {
    //     writableStream.once("drain", resolve);
    //   });
    // }
  }
  csvStream.end();
  console.timeEnd("makedata");
};

// const write = async (csvStream, writableStream) => {
//   for (let j = 0; j < 1000000; j++) {
//     await csvStream.write(seedFunc());
//   }
// };

makeCSV();
