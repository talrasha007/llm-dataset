import type { Ref } from 'vue'
import { from } from 'rxjs'
import { useObservable } from '@vueuse/rxjs'

import Dexie, { liveQuery, type EntityTable } from 'dexie'

const db = new Dexie('dataset') as Dexie & {
  datasets: EntityTable<Dataset, 'id'>;
  questions: EntityTable<Question, 'id'>;
};

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

export default db;

export function useDatasets() {
  const datasets: Ref<Dataset[] | undefined> = useObservable(from(liveQuery(() => db.datasets.toArray())))
  return datasets
}

export function useQuestions(dataset_id: number) {
  const questions: Ref<Question[] | undefined> = useObservable(from(liveQuery(() => db.questions.where('dataset_id').equals(dataset_id).toArray())))
  return questions
}