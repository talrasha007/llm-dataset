import md5 from 'crypto-js/md5'
import type { Ref } from 'vue'
import { from } from 'rxjs'
import { useObservable } from '@vueuse/rxjs'

import Dexie, { liveQuery, type EntityTable } from 'dexie'
import dexieCloud from "dexie-cloud-addon";

const db = new Dexie('dataset', {addons: [dexieCloud]}) as Dexie & {
  datasets: EntityTable<Dataset, 'id'>;
  questions: EntityTable<Question, 'id'>;
};

db.version(1).stores({
  datasets: '@id, &name, ts, create_ts',
  questions: '@id, dataset_id, answer_key, ts, create_ts',
});

export interface Dataset {
  id?: string;
  name: string;
  description: string;
  ts: number;
  create_ts: number;
}

export interface Question {
  id?: string;
  dataset_id: string;
  question: string;
  answer: string;
  answer_key?: string;
  ts: number;
  create_ts: number;
}

db.questions.hook('creating', (_, question) => {
  question.answer_key = md5(question.answer).toString()
})

export default db;

export function useDatasets() {
  const datasets: Ref<Dataset[] | undefined> = useObservable(from(liveQuery(() => db.datasets.toArray())))
  return datasets
}

export function useQuestions(dataset_id: string) {
  const questions: Ref<Question[] | undefined> = useObservable(from(liveQuery(() => db.questions.where('dataset_id').equals(dataset_id).toArray())))
  return questions
}

export function updateDbSrc(url: string) {
  if (url) {
    db.cloud.configure({
      databaseUrl: url,
      requireAuth: true
    });
  }
}