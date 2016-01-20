import expect from 'expect'
import scrollTop from 'dom-helpers/query/scrollTop'

import useScrollToTop from '../useScrollToTop'

import { HISTORIES } from './config'
import { useRoutes } from './fixtures'
import run from './run'

describe('useScrollToTop', () => {
  HISTORIES.forEach(createHistory => {
    describe(createHistory.name, () => {
      let history, unlisten

      beforeEach(() => {
        history = useRoutes(useScrollToTop(createHistory))
      })

      afterEach(() => {
        if (unlisten) {
          unlisten()
        }
      })

      it('should scroll to top on PUSH', done => {
        unlisten = run(history, [
          () => {
            scrollTop(window, 15000)
            history.push('/detail')
          },
          () => {
            expect(scrollTop(window)).toBe(0)
            done()
          }
        ])
      })

      it('should scroll to top on POP', done => {
        unlisten = run(history, [
          () => {
            scrollTop(window, 15000)
            history.push('/detail')
          },
          () => {
            history.goBack()
          },
          () => {
            expect(scrollTop(window)).toBe(0)
            done()
          }
        ])
      })
    })
  })
})
