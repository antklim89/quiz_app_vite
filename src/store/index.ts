import {
    createStore,
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
    useStore as baseUseStore,
} from 'vuex';

import { Actions, actions, ActionTypes } from './actions';
import { Getters, getters } from './getters';
import { Mutations, mutations, MutationTypes } from './mutations';
import { State, state } from './state';


export const store = createStore<State>({
    state: () => state,
    actions,
    mutations,
    getters,
});

export { ActionTypes, MutationTypes };


export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1] extends undefined ? null : Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export const useStore = () => baseUseStore() as Store;
