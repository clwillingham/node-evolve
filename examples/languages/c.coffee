{C} = require 'cello'
{mutable, mutateNow} = require 'evolve'

console.log C -> mutateNow -> 
  include 'stdio.h'
  include 'stdlib.h'

  int x = mutable 40

  main = ->
   int y = mutable 43 + x
   printf "hello"
