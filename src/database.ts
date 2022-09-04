import { openDB, DBSchema } from "idb";

interface TransactionType {
    title: string,
    amount: number,
    date: Date,
    description?: string,
  }

  interface Database extends DBSchema {
    transactions: {
        key: number,
        value: TransactionType,
        indexes: { date: Date }
    },
    profiles: {
        key: string,
        value: number
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
          db.createObjectStore('profiles');
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

export default getDatabase;
