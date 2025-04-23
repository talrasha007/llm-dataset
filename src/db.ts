import Dexie, { type EntityTable } from 'dexie'

const db = new Dexie('dataset');
db.version(1).stores({
  datasets: '++id, &name, description, ts, create_ts',
  questions: '++id, *dataset_id, question, answer, ts, create_ts',
});

export interface Dataset {
  id?: number;
  name: string;
  description: string;
  ts: number;
  create_ts: number;
}

export interface Question {
  id?: number;
  dataset_id: number;
  question: string;
  answer: string;
  ts: number;
  create_ts: number;
}

export default db as Dexie & {
  datasets: EntityTable<Dataset, 'id'>;
  questions: EntityTable<Question, 'id'>;
};