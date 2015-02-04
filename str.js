
// A String Prototype Extension Library.  It might be a good idea to
// update some of these functions with regular expressions functionality.

var str = {};

(function () {

  'use strict';

  // Return true if String is a substring of str and there is at least
  // one character in String, false otherwise.
  String.prototype.isSubstringOf = function (str) {
    return (str.search(this) !== -1 && this.length > 0) ? true : false;
  };


  // Return true if String has a substring of regex and there is at least
  // one character in regex, false otherwise.
  String.prototype.hasSubstring = function (regex) {
    return (this.search(regex) !== -1 && regex.length > 0) ? true : false;
  };


  // Return true if all characters in the val string are members
  // of the chars string, false otherwise.
  String.prototype.isBuiltFrom = function (chars) {
    var len = this.length;
    if (len === 0) { return false; }
    for (var i = 0; i < len; i++) {
      if (!this[i].isSubstringOf(chars)) { return false; }
    }
    return true;
  };


  // Return true if all cased characters in the string are lowercase
  // and there is at least one cased character, false otherwise.
  String.prototype.isLower = function () {
    return this.isBuiltFrom('abcdefghijklmnopqrstuvwxyz');
  };


  // Return true if all cased characters in the string are uppercase
  // and there is at least one cased character, false otherwise.
  String.prototype.isUpper = function () {
    return this.isBuiltFrom('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  };


  // Return true if all characters in the string are digits
  // and there is at least one character, false otherwise.
  String.prototype.isDigit = function () {
    return this.isBuiltFrom('0123456789');
  };


  // Return true if there are only whitespace characters in the string
  // and there is at least one character, false otherwise.
  String.prototype.isSpace = function () {
    return this.isBuiltFrom(' ');
  };


  // Return true if all characters in the string are alphanumeric
  // and there is at least one character, false otherwise.
  String.prototype.isAlpha = function () {
    var len = this.length;
    if (len === 0) { return false; }
    for (var i = 0; i < len; i++) {
      if (!this[i].isLower() && !this[i].isUpper()) { return false; }
    }
    return true;
  };


  // Return true if all characters in the string are alphanumeric
  // and there is at least one character, false otherwise.
  String.prototype.isAlphaNum = function () {
    var len = this.length;
    if (len === 0) { return false; }
    for (var i = 0; i < len; i++) {
      if (!this[i].isAlpha() && !this[i].isDigit()) { return false; }
    }
    return true;
  };


  // Return true if the string is titlecased and there is at least one
  // character, false otherwise (e.g. first character in all words must
  // be uppercase and all other characters must be lower case).
  // Non-alphabetic characters are permitted in any position.
  String.prototype.isTitle = function () {
    var len = this.length;
    if (len === 0 || this[0].isLower()) { return false; }
    for (var i = 0; i < len; i++) {
      if (this[i].isSpace() && this[i+1].isLower()) { return false; }
    }
    return true;
  };


  var isDelimitedBy = function (str, char) {
    var len = str.length;
    if (len === 0 || char.length !== 1 ||
        !str[0].isLower() || !str[len-1].isLower() ||
        !char.isSubstringOf(str)) {
      return false;
    }
    for (var i = 0; i < len; i++) {
      if (!str[i].isLower() && !str[i].hasSubstring(char)) { return false; }
      if (str[i].hasSubstring(char) && !str[i+1].isLower()) { return false; }
    }
    return true;
  };

  // Return true if the string is spinal-case and there are at least
  // three characters, false otherwise (e.g. no spaces and only lowercase
  // with hyphens separating words).  At least one hyphen is required.
  String.prototype.isSpinal = function () {
    return isDelimitedBy(this, '-');
  };


  // Return true if the string is snake_case and there are at least
  // three characters, false otherwise (e.g. no spaces and only lowercase
  // with underscores separating words).  At least one underscore is required.
  String.prototype.isSnake = function () {
    return isDelimitedBy(this, '_');
  };

}());

