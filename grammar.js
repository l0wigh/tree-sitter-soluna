/**
 * @file Parser for the Soluna language
 * @author L0Wigh <mathiotthomas@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "soluna",

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    source_file: $ => repeat($._expression),

    _expression: $ => choice(
      $.definition,
      $.list,
      $._atom,
      $.quoted_expression,
      $.quasiquoted_expression,
      $.unquoted_expression,
      $.unquote_splicing_expression,
      $.andrest_expression,
    ),

    _symbols: $ => choice(
      $.identifier,
      $.unquoted_expression,
      $.unquote_splicing_expression,
    ),

    definition: $ => choice(
      $.var_definition,
      $.lambda_definition,
      $.func_definition,
      $.macro_definition,
      $.while_definition,
      $.do_definition,
      $.case_definition,
      $.if_definition,
      $.try_definition,
      // $.try_error_handler_definition,
      $.each_definition,
      $.map_definition,
      $.filter_definition,
    ),


    var_definition: $ => seq(
      '(',
      'defvar',
      field('name', $._symbols),
      field('value', $._expression),
      ')',
    ),

    lambda_definition: $ => seq(
      '(',
      'lambda',
      field('parameters', $.parameters),
      field('body', repeat($._expression)),
      ')',
    ),

    func_definition: $ => seq(
      '(',
      'function',
      field('name', $._symbols),
      field('parameters', $.parameters),
      field('body', repeat($._expression)),
      ')',
    ),

    parameters: $ => seq(
      '(',
      repeat(choice($._symbols, $.andrest_expression)),
      ')',
    ),

    macro_definition: $ => seq(
      '(',
      'defmacro',
      field('name', $._symbols),
      field('parameters', $.parameters),
      field('body', repeat($._expression)),
      ')',
    ),

    while_definition: $ => seq(
      '(',
      'while',
      field('condition', $._expression),
      field('body', repeat($._expression)),
      ')',
    ),

    do_definition: $ => seq(
      '(',
      'do',
      repeat($._expression),
      ')',
    ),

    case_definition: $ => seq(
      '(',
      'case',
      repeat($._expression),
      ')',
    ),

    if_definition: $ => seq(
      '(',
      'if',
      field('condition', $._expression),
      field('istrue', $._expression),
      field('isfalse', $._expression),
      ')',
    ),

    try_definition: $ => seq(
      '(',
      'try',
      field('body', $._expression),
      field('handler', $.try_error_handler_definition),
      ')',
    ),

    try_error_handler_definition: $ => seq(
      '(',
      field('variable', $._symbols),
      field('err_body', repeat($._expression)),
      ')',
    ),

    each_definition: $ => seq(
      '(',
      'each',
      field('variable', $._symbols),
      field('list', $._expression),
      field('body', repeat($._expression)),
      ')',
    ),

    map_definition: $ => seq(
      '(',
      'map',
      field('function', $._symbols),
      field('list', $._expression),
      ')',
    ),

    filter_definition: $ => seq(
      '(',
      'filter',
      field('function', $._expression),
      field('list', $._expression),
      ')',
    ),

    list: $ => seq(
      '(',
      repeat($._expression),
      ')'
    ),

    quoted_expression: $ => seq(
      "'",
      $._expression
    ),

    quasiquoted_expression: $ => seq(
      "`",
      $._expression
    ),

    unquoted_expression: $ => seq(
      ",",
      $._expression
    ),

    unquote_splicing_expression: $ => seq(
      ",@",
      $._expression
    ),

    andrest_expression: $ => seq(
      "&rest",
      $._expression
    ),

    _atom: $ => choice(
      $.operator,
      $.builtin,
      $.identifier,
      $.number,
      $.string,
      $.boolean,
      $.keyword,
      $.default,
    ),

    operator: $ => choice(
      '+', '-', '*', '/', 'mod',
      '=', '!=', '<', '>', '<=', '>='
    ),

    builtin: $ => choice(
      "not", "type", "int", "float", "str", "eval", "length",
      "list", "cons", "fst", "rst", "get",
      "set", "null", "range", "concat", "reverse",
      "reduce", "explode",
      "implode", "split", "dict", "dict-set",
      "dict-get", "dict-ref", "dict-remove",
      "dict-contains", "dict-keys", "dict-values",
      "write", "writeln", "input", "read-file", "write-file"
    ),

    identifier: $ => /[a-zA-Z+\-*/?!<>=_][a-zA-Z0-9+\-*/?!<>=_\-]*/,

    keyword: $ => /:[a-zA-Z0-9+\-*/?!<>=_\-]+/,

    number: $ => /-?\d+(\.\d+)?/,

    default: $ => "default",

    string: $ => seq(
      '"',
      repeat(choice(
        /[^"\\]/,
        seq('\\', /./)
      )),
      '"'
    ),

    boolean: $ => choice("true", "false"),

    comment: $ => /;.*/,
  }
});
