const faker = require("faker");
// const mongoose = require("mongoose");
// const House = require("./House.js");
// const db = require("./index.js");
const fs = require("fs");
const csv = require("fast-csv");

const random = num => Math.ceil(Math.random() * num);
const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min - 1) + min);

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

const seedFunc = i => {
  const id = count;
  count++;

  // const zestimate = zestHistory();
  return {
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
    csvStream.write(seedFunc());
  }
  csvStream.end();
  console.timeEnd("makedata");
};

// const makeArray = () => {
//   let arr = [];
//   for (let i = 0; i < 10000000; i++) {
//     arr.push(seedFunc());
//   }

//   let transformStream = jsonstream.stringify();
//   let outputStream = fs.createWriteStream("data.js");
//   transformStream.pipe(outputStream);
//   arr.forEach(transformStream.write);
//   transformStream.end();

//   outputStream.on("finish", () => {
//     console.log("finished writing data");
//   });
// };

makeCSV();
// makeArray();
