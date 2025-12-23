(identifier) @variable.parameter

["while" "do" "case" "if" "try" "each"] @keyword.control

["defvar" "function" "defmacro" "lambda"] @keyword.function

["map" "filter"] @function.builtin

(operator) @keyword.operator
"&rest" @keyword.operator

(builtin) @function.builtin

(list . (identifier) @function.call)
(list . (builtin) @function.builtin)

(func_definition name: (identifier) @function)
(macro_definition name: (identifier) @function.macro)
(var_definition name: (identifier) @variable.parameter)
(map_definition function: (identifier) @function)
(filter_definition function: (identifier) @function)

(parameters (identifier) @variable.parameter)
(try_error_handler_definition variable: (identifier) @variable.parameter)

(number) @number
(string) @string
(boolean) @constant.builtin
(keyword) @keyword
(default) @constant.builtin
(comment) @comment
["(" ")"] @punctuation.bracket
["`" "," ",@"] @punctuation.special
