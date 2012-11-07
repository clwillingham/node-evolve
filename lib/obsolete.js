// Generated by CoffeeScript 1.4.0
(function() {
  var P, THIS_CODE_CAN_BE_MUTATED_TOO, async, callable_functions, callable_functions_ast, callable_variables, clone, code_to_ast, deck, fidelity, fs, getNodes, inspect, isArray, isBoolean, isFunction, isNumber, isString, isUndefined, jsp, k, main, mutate, mutateFile, mutateSrc, optimize_ast, options, pro, v, writable_functions, writable_variables,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  jsp = require("../node_modules/uglify-js/lib/parse-js");

  pro = require("../node_modules/uglify-js/lib/process");

  fs = require('fs');

  inspect = require('util').inspect;

  async = require('ragtime').async;

  deck = require('deck');

  /*
  TODO substitute numbers, variables, called functions.. by
  themselves
  also: delete them, or duplicate them
  or add a random new one
  */


  clone = function(a) {
    return JSON.parse(JSON.stringify(a));
  };

  P = function(p) {
    if (p == null) {
      p = 0.5;
    }
    return +(Math.random() < p);
  };

  isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  };

  isUndefined = function(obj) {
    return typeof obj === 'undefined';
  };

  isArray = function(obj) {
    return Array.isArray(obj);
  };

  isString = function(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
  };

  isNumber = function(obj) {
    return (obj === +obj) || toString.call(obj) === '[object Number]';
  };

  isBoolean = function(obj) {
    return obj === true || obj === false;
  };

  isString = function(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
  };

  options = {};

  code_to_ast = function(code) {
    return function(cb) {
      return async(function() {
        return cb(jsp.parse(code, options.strict_semicolons));
      });
    };
  };

  optimize_ast = function(ast) {
    return function(cb) {
      return async(function() {
        ast = pro.ast_mangle(ast, options.mangle_options);
        return async(function() {
          ast = pro.ast_squeeze(ast, options.squeeze_options);
          return async(function() {
            return cb(ast);
          });
        });
      });
    };
  };

  getNodes = function(root) {
    var nodes, parse;
    nodes = [];
    parse = function(list) {
      var item, _i, _j, _len, _len1, _results;
      if (isArray(list)) {
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          item = list[_i];
          nodes.push(item);
        }
        _results = [];
        for (_j = 0, _len1 = list.length; _j < _len1; _j++) {
          item = list[_j];
          if (isArray) {
            _results.push(parse(item));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };
    parse(root);
    return {
      nodes: nodes
    };
  };

  callable_variables = {
    x1: 10,
    x2: 10,
    x3: 10,
    x4: 10,
    x5: 10,
    x6: 10
  };

  writable_variables = {
    x1: 10,
    x2: 10,
    x3: 10,
    x4: 10,
    x5: 10,
    x6: 10
  };

  writable_functions = {
    f1: 10,
    f2: 10,
    f3: 10,
    f4: 10,
    f5: 10,
    f6: 10
  };

  callable_functions_ast = {
    f1: ['name', 'f1'],
    f2: ['name', 'f2'],
    f3: ['name', 'f3'],
    f4: ['name', 'f4'],
    f5: ['name', 'f5'],
    f6: ['name', 'f6'],
    'Math.cos': ['dot', ['name', 'Math'], 'cos'],
    'Math.sin': ['dot', ['name', 'Math'], 'sin']
  };

  callable_functions = {};

  for (k in callable_functions_ast) {
    v = callable_functions_ast[k];
    callable_functions[k] = 10;
  }

  fidelity = 0.95;

  THIS_CODE_CAN_BE_MUTATED_TOO = {
    mutateNumber: function(value) {
      var action, numOperations;
      if (P(fidelity)) {
        return value;
      }
      numOperations = {
        mult: 5000
      };
      action = deck.pick(numOperations);
      switch (action) {
        case 'mult':
          console.log("MUTATION: NUMBER " + value + " * Math.random()");
          return value * Math.random();
      }
      return value;
    },
    substituteValueNode: function(value, values) {
      var ast;
      if (P(fidelity)) {
        return value;
      } else {
        ast = deck.pick(values);
        if (isUndefined(ast)) {
          return value;
        } else {
          return ast;
        }
      }
    },
    substituteCallableFunctionAST: function(value) {
      var f;
      if (P(fidelity)) {
        return value;
      } else {
        f = deck.pick(callable_functions);
        return callable_functions_ast[f];
      }
    },
    substituteCallableFunctionName: function(value) {
      if (P(fidelity)) {
        return value;
      } else {
        return deck.pick(callable_functions);
      }
    },
    substituteWritableFunctionName: function(value) {
      if (P(fidelity)) {
        return value;
      } else {
        return ['name', deck.pick(writable_functions)];
      }
    },
    substituteWritableVariableName: function(value) {
      var varName;
      if (P(fidelity)) {
        return value;
      } else {
        varName = deck.pick(writable_variables);
        if (varName !== void 0) {
          return ['name', varName];
        }
        return value;
      }
    },
    substituteCallableVariableName: function(value) {
      if (P(fidelity)) {
        return value;
      } else {
        return ['name', deck.pick(callable_variables)];
      }
    },
    substituteBinaryOperator: function(value) {
      var operators;
      if (P(fidelity)) {
        return value;
      } else {
        operators = {
          '+': 100,
          '/': 50,
          '-': 100,
          '*': 150,
          '^': 5
        };
        return deck.pick(operators);
      }
    }
  };

  mutate = function(options) {
    return async(function() {
      var addReplaceOrDitchLoop, algo, clipboard, copy, cutOrCopyLoop, header, i, mutateLoop, new_ast, new_code, node, nodes, old_ast, res, values, _i, _j, _k, _len, _ref, _ref1, _ref2, _ref3;
      console.log("mutate " + options.src);
      copy = [];
      old_ast = jsp.parse(options.src);
      if (options.debug) {
        console.log("old: " + (inspect(old_ast, false, 20, true)));
      }
      nodes = getNodes(old_ast).nodes;
      values = [['num', 0], ['num', 1]];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        if (isArray(node)) {
          if ((_ref = node[0]) === 'call' || _ref === 'name' || _ref === 'num') {
            if (node[0] === 'name') {
              if (_ref1 = node[1], __indexOf.call(callable_variables, _ref1) < 0) {
                continue;
              }
            }
            k = "" + node[0];
            values.push(node);
          }
        }
      }
      algo = THIS_CODE_CAN_BE_MUTATED_TOO;
      cutOrCopyLoop = function(node) {
        var clipboard, inputs, outputs, root, statements, variables, _cutOrCopyLoop;
        clipboard = [];
        _cutOrCopyLoop = function(parent, id) {
          var i, nodeType, r, varName, _j, _ref2;
          console.log("\n1. parent: " + (inspect(parent)) + "  id: " + id);
          node = parent[id];
          console.log("2. node: " + (inspect(node)));
          if (isArray(node)) {
            console.log("node is array (lenght: " + node.length + ")");
            if (node.length === 0) {
              console.log("but node length is 0");
              return node;
            }
            if (node.length === 1) {
              console.log("node is length 1: going inside");
              node[0] = _cutOrCopyLoop(node, 0);
            }
            nodeType = node[0];
            console.log("node type: " + nodeType);
            if (nodeType === 'var') {
              return node;
            }
            if (nodeType === 'assign') {
              varName = node[2][1];
            }
            if (nodeType === 'binary') {
              if (P(0.5)) {
                console.log("copying");
              }
              if (P(0.5)) {
                console.log("deleting");
              }
            }
            if (nodeType === 'num') {
              0;

            }
            if (nodeType === 'call') {
              varName = node[1][1];
              if (varName in callable_variables) {
                0;

              } else if (varName in callable_functions) {
                0;

              }
            }
            console.log("don't iterate inside strings!");
            console.log("IGNORE MAIN ROOT FUNCTION, TOO!");
            if (node.length > 1) {
              console.log("iterating over children");
            }
            for (i = _j = 1, _ref2 = node.length; 1 <= _ref2 ? _j <= _ref2 : _j >= _ref2; i = 1 <= _ref2 ? ++_j : --_j) {
              console.log("child " + i + ": " + node[i]);
              if (isArray(node[i])) {
                console.log("child " + i + " is an array, calling recursive function");
                r = _cutOrCopyLoop(node, i);
                if (r !== void 0) {
                  console.log("overwriting child");
                  node[i] = r;
                }
              }
            }
          }
          return node;
        };
        console.log("node: " + (inspect(node)) + " id: 0");
        root = node[1][0][1][0][1];
        inputs = root[2];
        statements = root[3];
        variables = root[3][0][1];
        outputs = root[3].slice(-1)[1];
        console.log("root: " + (inspect(root)));
        console.log("statements: " + (inspect(statements, false, 20, true)) + "\n");
        console.log("inputs: " + (inspect(inputs)));
        console.log("variables: " + (inspect(variables)));
        console.log("outputs: " + (inspect(outputs)));
        node[0][0] = [node[0][0][0]].concat(_cutOrCopyLoop(node, 1));
        return {
          node: node,
          clipboard: clipboard
        };
      };
      addReplaceOrDitchLoop = function(node, clipboard) {
        var element, _addReplaceOrDitchLoop, _j, _len1;
        console.log("addReplaceOrDitchLoop. Clipboard:");
        for (_j = 0, _len1 = clipboard.length; _j < _len1; _j++) {
          element = clipboard[_j];
          console.log("  " + (inspect(element)));
        }
        _addReplaceOrDitchLoop = function(node, whatToDo, parent) {
          if (whatToDo == null) {
            whatToDo = '';
          }
          if (parent == null) {
            parent = false;
          }
        };
        return node;
      };
      mutateLoop = function(node, parent) {
        var i, nodeType, r, varName, _j, _ref2;
        if (parent == null) {
          parent = false;
        }
        if (isArray(node)) {
          if (node.length === 0) {
            return node;
          }
          nodeType = node[0];
          if (node.length === 1) {
            node[0] = mutateLoop(node[0], node);
          }
          if (nodeType === 'var') {
            return node;
          }
          if (nodeType === 'assign') {
            varName = node[2][1];
            if (varName in writable_variables) {
              node[2] = algo.substituteWritableVariableName(node[2]);
            } else if (varName in writable_functions) {
              node[2] = algo.substituteWritableFunctionName(node[2]);
            }
          }
          if (nodeType === 'binary') {
            node[1] = algo.substituteBinaryOperator(node[1]);
            node[2] = algo.substituteValueNode(node[2], values);
            node[3] = algo.substituteValueNode(node[3], values);
          }
          if (nodeType === 'num') {
            node[1] = algo.mutateNumber(node[1]);
          }
          if (nodeType === 'call') {
            varName = node[1][1];
            if (varName in callable_variables) {
              node[1] = algo.substituteCallableVariableName(node[1]);
            } else if (varName in callable_functions) {
              node[1] = algo.substituteCallableFunctionAST(node[1]);
            }
          }
          for (i = _j = 1, _ref2 = node.length; 1 <= _ref2 ? _j <= _ref2 : _j >= _ref2; i = 1 <= _ref2 ? ++_j : --_j) {
            if (isArray(node[i])) {
              r = mutateLoop(node[i], node);
              if (r !== void 0) {
                node[i] = r;
              }
            }
          }
        }
        return node;
      };
      if (options.debug) {
        console.log("" + (inspect(old_ast, false, 20, true)));
      }
      console.log("mutate loop");
      console.log("cut or copy loop");
      res = cutOrCopyLoop(old_ast);
      new_ast = res.new_ast;
      clipboard = res.clipboard;
      console.log("add, replace or ditch clipboard element loop");
      if (options.debug) {
        console.log("copy: " + (inspect(new_ast, false, 20, true)));
      }
      try {
        new_code = pro.gen_code(new_ast, {
          beautify: options.beautify,
          indent_start: 0,
          indent_level: 4,
          quote_keys: false,
          space_colon: false
        });
        header = "\n\n/* Global memory */ \n\nvar ";
        for (i = _j = 1, _ref2 = options.nbVariables; 1 <= _ref2 ? _j <= _ref2 : _j >= _ref2; i = 1 <= _ref2 ? ++_j : --_j) {
          header += "x" + i + "=0,";
        }
        header += "\n";
        for (i = _k = 1, _ref3 = options.nbFunctions; 1 <= _ref3 ? _k <= _ref3 : _k >= _ref3; i = 1 <= _ref3 ? ++_k : --_k) {
          header += "f" + i + "=function(){ return 0; },";
        }
        header = "" + header.slice(0, -1) + ";\n\n";
        new_code = "" + header + " /* Program */\n\n " + new_code;
        return async(function() {
          return options.onComplete(new_code);
        });
      } catch (e) {
        if (options.tentatives < options.max_tentatives) {
          options.tentatives += 1;
          return async(function() {
            return mutate(options, function(new_code) {
              return options.onComplete(new_code);
            });
          });
        } else {
          console.log("aborting after " + options.tentatives + " tentatives: " + e);
          return async(function() {
            return options.onComplete(options.src);
          });
        }
      }
    });
  };

  /*
  optimizeAST = exports.optimizeAST = (options = {}) -> async ->
    #ast = pro.ast_mangle ast
    ast = pro.ast_squeeze ast,
      make_seq: yes # 
      dead_code: yes # don't remove junk code, it may have a purpose
  
    async -> options.onComplete ast
  */


  mutateSrc = exports.mutateSrc = function(options) {
    if (options == null) {
      options = {};
    }
    return async(function() {
      var opts;
      console.log("mutateSrc");
      opts = {
        src: "",
        nbVariables: 6,
        nbFunctions: 6,
        debug: false,
        insist: false,
        beautify: false,
        tentatives: 0,
        max_tentatives: 1,
        onError: function(err) {
          throw err;
        },
        onComplete: function(src) {}
      };
      for (k in options) {
        v = options[k];
        opts[k] = v;
      }
      console.log("options: " + (inspect(options)));
      return mutate(opts);
    });
  };

  mutateFile = exports.mutateFile = function(options) {
    if (options == null) {
      options = {};
    }
    return async(function() {
      var opts;
      console.log("mutateFile");
      opts = {
        file: process.argv[1],
        debug: false,
        insist: false,
        beautify: false,
        nbVariables: 6,
        nbFunctions: 6,
        max_tentatives: 1,
        encoding: 'utf-8',
        onError: function(err) {
          console.log("default mutate file onError: " + err);
          throw err;
        },
        onComplete: function(src) {}
      };
      for (k in options) {
        v = options[k];
        opts[k] = v;
      }
      return fs.readFile(opts.file, opts.encoding, function(err, src) {
        console.log("loaded : ");
        if (err) {
          console.log("couldn't load file: " + err);
          async(function() {
            return opts.onError(err);
          });
          return;
        }
        console.log("calling mutateSrc");
        return mutateSrc({
          src: src,
          debug: opts.debug,
          max_tentatives: opts.max_tentatives,
          beautify: opts.beautify,
          nbVariables: opts.nbVariables,
          nbFunctions: opts.nbFunctions,
          onError: opts.onError,
          onComplete: opts.onComplete
        });
      });
    });
  };

  exports.cli = main = function() {
    if (process.argv.length > 2) {
      return mutateFile({
        debug: (__indexOf.call(process.argv, 'debug') >= 0),
        max_tentatives: (__indexOf.call(process.argv, 'insist') >= 0) ? 3 : 1,
        beautify: (__indexOf.call(process.argv, 'pretty') >= 0),
        encoding: 'utf-8',
        file: process.argv[2],
        onError: function(err) {
          console.log("error: " + err);
          throw err;
        },
        onComplete: function(src) {
          return console.log(src);
        }
      });
    } else {
      return mutateSrc({
        src: fs.readFileSync('/dev/stdin').toString(),
        debug: (__indexOf.call(process.argv, 'debug') >= 0),
        max_tentatives: (__indexOf.call(process.argv, 'insist') >= 0) ? 3 : 1,
        beautify: (__indexOf.call(process.argv, 'pretty') >= 0),
        onError: function(err) {
          console.log("error: " + err);
          throw err;
        },
        onComplete: function(src) {
          return console.log(src);
        }
      });
    }
  };

}).call(this);