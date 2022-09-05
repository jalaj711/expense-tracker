import { openDB, DBSchema } from "idb";

interface TransactionType {
  title: string;
  amount: number;
  date: Date;
  profile: string;
  description?: string;
  id?: number;
}
interface ProfileType {
  id: string;
  name: string;
  amount: number;
}

interface Database extends DBSchema {
  transactions: {
    key: number;
    value: TransactionType;
    indexes: { "by-date": Date; "by-profile": string };
  };
  profiles: {
    key: string;
    value: ProfileType;
    indexes: { "by-name": string };
  };
}

const getDatabase = () => {
  return openDB<Database>("expenseTracker", 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      const transactionStore = db.createObjectStore("transactions", {
        keyPath: "id",
        autoIncrement: true,
      });
      transactionStore.createIndex("by-date", "date");
      transactionStore.createIndex("by-profile", "profile");
      const profileStore = db.createObjectStore("profiles", {
        keyPath: "id",
        autoIncrement: false,
      });
      profileStore.createIndex("by-name", "name");
    },
    blocked() {
      // …
    },
    blocking() {
      // …
    },
    terminated() {
      // …
    },
  });
};

export type { ProfileType, TransactionType };
export default getDatabase;
