import configure from './'
import axios from 'axios'

describe('store', () => {
  it('returns initial state', () => {
    const store = configure()

    const sectionsState = {
      1: {
        category: null,
        count: 8,
        error: '',
        id: 1,
        name: 'Posts Populares',
        postsIds: [],
        status: 'success',
        trending: true
      },
      2: {
        category: 'humor',
        count: 8,
        error: '',
        id: 2,
        name: 'Humor',
        postsIds: [],
        status: 'success',
        trending: false
      },
      3: {
        category: 'juegos',
        count: 8,
        error: '',
        id: 3,
        name: 'Juegos',
        postsIds: [],
        status: 'success',
        trending: false
      },
      4: {
        category: 'imagenes',
        count: 8,
        error: '',
        id: 4,
        name: 'Imágenes',
        postsIds: [],
        status: 'success',
        trending: false
      }
    }

    expect(store.getState()).toEqual({
      entities: {
        posts: {},
        reader: {}
      },
      control: {
        sections: sectionsState,
        reader: {}
      }
    })
  })
})
