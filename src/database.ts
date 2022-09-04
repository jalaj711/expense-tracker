import { openDB, DBSchema } from "idb";

interface TransactionType {
    title: string,
    amount: number,
    date: Date,
    description?: string,
  }
  interface ProfileType {
    name: string,
    amount: number,
  }

  interface Database extends DBSchema {
    transactions: {
        key: number,
        value: TransactionType,
        indexes: { date: Date }
    },
    profiles: {
        key: number,
        value: ProfileType,
        indexes: { 'by-name': string }
    }
  }

const getDatabase = () => {
  return openDB<Database>("expenseTracker", 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      const transactionStore = db.createObjectStore('transactions', {
          keyPath: 'id',
          autoIncrement: true,
        });
        transactionStore.createIndex('date', 'date');
        const profileStore = db.createObjectStore('profiles', {
            keyPath: 'id',
            autoIncrement: true,
          });
          profileStore.createIndex('by-name', 'name');
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
