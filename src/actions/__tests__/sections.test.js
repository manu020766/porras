import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as types from '../../types/sections'
import * as actions from '../sections'

describe('Sections Actions', () => {
  it('creates an action to start fetching sections', () => {
    expect(actions.fetchRequest(1)).toEqual({
      type: types.FETCH_REQUEST,
      id: 1
    })
  })

  it('creates an action to end fetching sections with success', () => {
    expect(actions.fetchSuccess(1, [1, 2, 3])).toEqual({
      type:types.FETCH_SUCCESS,
      id: 1,
      posts: [1, 2, 3]
    })
  })

  it('creates an action to end fetching sections with failure', () => {
    expect(actions.fetchFailure(1, 'error message')).toEqual({
      type:types.FETCH_FAILURE,
      id: 1,
      message: 'error message'
    })
  })

  const data = [
    { id: 1, foo: 'foo' },
    { id: 2, foo: 'bar' },
    { id: 3, foo: 'baz' }
  ]

  const middlewares = [thunk.withExtraArgument(axios)]
  const mockStore = configureMockStore(middlewares)
  const mock = new MockAdapter(axios)

  describe('Fetch sections async', () => {
    afterEach(() => {
      mock.reset()
    })

    it('returns success', () => {
      mock.onGet('/post/recent/view/foo')
        .reply(200, data)

      const store = mockStore()

      return store.dispatch(actions.fetch(1, 'foo', 1)).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.FETCH_REQUEST, id: 1 },
          { type: 'posts/ADD', posts: data },
          { type: types.FETCH_SUCCESS, id: 1, posts: [1, 2, 3] }
        ])
      })
    })

    it('returns success with trending section', () => {
      mock.onGet('/post/trending/view')
        .reply(200, data)

      const store = mockStore()

      return store.dispatch(actions.fetch(1, 'foo', 1, true)).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.FETCH_REQUEST, id: 1 },
          { type: 'posts/ADD', posts: data },
          { type: types.FETCH_SUCCESS, id: 1, posts: [1, 2, 3] }
        ])
      })
    })

    it('returns failure', () => {
      mock.onGet('/post/recent/view/foo')
        .networkError()

      const store = mockStore()

      return store.dispatch(actions.fetch(1, 'foo', 1)).then(() => {
        expect(store.getActions()).toEqual([
          { type: types.FETCH_REQUEST, id: 1 },
          { type: types.FETCH_FAILURE, id: 1, message: 'Network Error' }
        ])
      })
    })
  })
})