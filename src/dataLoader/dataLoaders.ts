import { Collection, ObjectId, ObjectID } from 'mongodb';

import DataLoader from 'dataloader';

// 1
async function batchUsers(Users: Collection, keys: any) {
  return await Users.find({ _id: { $in: keys } }).toArray();
}

// 2
export default ({ Users }: { Users: Collection }) => ({
  // 3
  userLoader: new DataLoader((keys: any) => batchUsers(Users, keys), {
    cacheKeyFn: (key: any) => key.toString()
  })
});
