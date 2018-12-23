import { AppContext } from "./../getContext";
import { withFilter } from "graphql-yoga";

export default {
  Query: {
    welcome: (_, { yourNickname }) => `Welcome, ${yourNickname || "here"}!`
  },
  Mutation: {
    testSubs: (_, { text }, { pubsub, authUser }: AppContext) => {
      // const channelName = `test-${authUser._id}`;
      pubsub.publish("test", { somethingChanged: { id: text } });
      return true;
    }
  },
  Subscription: {
    somethingChanged: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator("test")
    }
  }
};
