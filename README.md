# Tree-sitter parser for Soluna

Since the project isn't mature enough to be pulled in [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter), you'll need to manually install this.

## Manual install

1. Add this to Lazy.

```lua
{
	"https://github.com/L0Wigh/tree-sitter-soluna",
	config = function ()
		vim.api.nvim_create_autocmd("FileType", {
			pattern = "soluna",
			callback = function()
				local install_path = vim.fn.stdpath("data") .. "/tree-sitter-soluna" 
				if vim.fn.isdirectory(install_path) == 1 then
					vim.opt_local.runtimepath:append(install_path)
				end
			end,
		})
		require("nvim-treesitter.parsers").get_parser_configs().soluna = {
			install_info = {
				url = "https://github.com/L0Wigh/tree-sitter-soluna",
				files = { "src/parser.c" },
				branch = "master"
			},
			filetype = "soluna"
		}
		vim.filetype.add({
			extension = {
				luna = "soluna",
			},
		})
	end
},
```

2. Restart Neovim to install the package.

3. `:TSInstall soluna`

4. You should be ready to open a `.luna` file.
