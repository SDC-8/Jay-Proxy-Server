const House = require("./database/House.js");

const resolvers = {
  Query: {
    async allHouses() {
      return await House.find();
    },
    async getSome(dummy, numObj) {
      return await House.find({ id: { $in: numObj.num } });
    }
  },
  Mutation: {
    async deleteHouse(_, { id }) {
      return await House.deleteOne({ id: id });
    },
    async updateHouse(_, { input }) {
      return await House.update({ id: input.id }, input, { multi: false });
    },
    async createHouse(_, { input }) {
      return await House.create(input);
    }
  }
};

module.exports = resolvers;
