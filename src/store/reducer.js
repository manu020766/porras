import { combineReducers } from 'redux'

import {
  popularsControl,
  postsEntities,
  recentControl,
  trendingControl,
} from '../posts/reducers'

import {
  shoutsEntities,
} from '../shouts/reducers'

const entities = combineReducers({
  posts: postsEntities,
  shouts: shoutsEntities,
})

const control = combineReducers({
  populars: popularsControl,
  recent: recentControl,
  trending: trendingControl,
})

export default combineReducers({
  control,
  entities
})
