import test from 'tape'
import {VFile} from 'vfile'
import {unified} from '../index.js'

test('async function transformer () {}', function (t) {
  var givenFile = new VFile('alpha')
  var givenNode = {type: 'bravo'}
  var modifiedNode = {type: 'charlie'}

  t.plan(5)

  unified()
    .use(plugin)
    .run(givenNode, givenFile, function (error, tree, file) {
      t.error(error, 'should’t fail')
      t.equal(tree, modifiedNode, 'passes given tree to `done`')
      t.equal(file, givenFile, 'passes given file to `done`')
    })

  function plugin() {
    return transformer
  }

  async function transformer(tree, file) {
    t.equal(tree, givenNode, 'passes correct tree to an async function')
    t.equal(file, givenFile, 'passes correct file to an async function')
    return modifiedNode
  }
})
