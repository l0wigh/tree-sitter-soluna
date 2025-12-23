package tree_sitter_soluna_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_soluna "github.com/l0wigh/tree-sitter-soluna/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_soluna.Language())
	if language == nil {
		t.Errorf("Error loading Soluna grammar")
	}
}
