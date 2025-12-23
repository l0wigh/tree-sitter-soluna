import XCTest
import SwiftTreeSitter
import TreeSitterSoluna

final class TreeSitterSolunaTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_soluna())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Soluna grammar")
    }
}
