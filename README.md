# jQuery Expression Builder

A jQuery Plugin for constructing valid DSL expressions.  Expressions are constructed by recursively chosing sub-expressions until the expression is complete.
Support is included for saving Expression Templates (expressions with sub-expressions yet to be chosen).

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/jonmbake/jquery-expression-builder/master/dist/expressionBuilder.min.js
[max]: https://raw.github.com/jonmbake/jquery-expression-builder/master/dist/expressionBuilder.js

### Dependencies

The Expression Builder uses bootstrap 3 for styling, underscore.js as a javascipt utility library, and select2 for the sub-expression selector.

## Documentation

The best way to learn about the expression builder is to view the [Well-Commented Source](./src/expressionBuilder.js) or the [Demo](http://jonmbake.github.io/jquery-expression-builder/demo.html).

The basic idea of the Expression Builder is to use the type system of the language to build an expression in a more structured way.  This is done by recursively chosing a sub-expressions until the expression is complete. Sub-expressions available for selection are filtered by return type given the expected type of the element under selection, which prevents invalid expressions from being constructed.

For instance, if you wanted to construct the expression '4 + 5', if you first select the sub-expression '+', you know that both the left and right componenets must be sub-expressions that evaluate to a NUMBER (assuming '+' is not overloaded).  When chosing the left or right component, the sub-expression list can be filtered to allow the selection of only sub-expressions that evaluate to a NUMBER, which includes Number Literals.

### Defining the Set of Sub-Expressions

The first argument to the expression builder is JSON describing the set of sub-expressions available to construct an expression.  Sub-Expressions can
be grouped together.  Grouped sub-expressions will be displayed under the same Opt Group within the Sub-Expression selector.

The following properties can be used to described a sub-expression value:

Property    	     | Description
------------------ | -----------
displayName        | The text that will display in the sub-expression selector and as the value in the active expression after selecting the sub-expression.
displayNameParens  | Further describe a Sub-Expression.  Will dispaly in sub-expression selctor as text in parenthesises.
expressionValue    | Expression value of the sub-expression.  This will be returned when gettting the expression value of a completed expression.  If an expression value is not give, it will default to the displayName.
description 	     | Description of the sub-expression.  Shows in the help text when the sub-expression within the selector is highlighted.
returnType		     | Return type of the sub-expression.  The sub-expression select will be filtered by the return type of the currently selected expansion point in the active expression
rightType		       | Return type of the right component to the sub-expression (if it has one).  This can be left blank.  Right type can be defined as either a statically or dynamically sized list by surrounding the type in parens.  A dynamically sized list is notated by adding '...' before the right parens (see example).
leftType		       | Return type of the left component to the sub-expression (if it has one).  This can be left blank.  Left type can be defined as either a statically or dynamically sized list by surrounding the type in parens.  A dynamically sized list is notated by adding '...' before the right parens (see example).

### Options

The second argument to the expression builder is object of options.  The following table lists the options available:

Option             | Description                                                         | Defaults
------------------ | ------------------------------------------------------------------- | ---------
returnType         | Expression return type                                              | NUMBER
templateURL        | URL to POST to when saving a template or GET when getting templates | If a URL is not provided, will use local storage


### Built-In Types

There are a couple of built-in types, namely TEXT and NUMBER.  These were provided because there is built-in support for Text (String) and Number literals.

### Overloading Operators

An Array value of types can be supplied as either the right or left type.  This is primarily used for overloaded operators.  The Expression Builder will automaticlly change the alternative type when an sub-expression for the other side is chosen.  For instance, say the '+' operator is overloaded to both addition and string concatenation.  If we chose '4' as the left sub-expression element to the operator, the right type will automatically be changed to from an Array of 'NUMBER' and 'STRING' to just 'NUMBER'.

### Events

The following events are fired from within the Expression Builder.  To listen to the event use `$("div#exprBldr").on('eb-event', function (event, eventArgs) { ... });`

Event Name  		       | Description                           		   | Arguments
---------------------- | ------------------------------------------- | ----------
eb-expression-complete | Triggered when expression is complete.      | Expression Value
eb-subexpresion-add    | Triggered when a sub-expression is added.   | Sub-expression data of the added element.
eb-clear 			         | Triggered when the expression is cleared.   | NONE


### API

Methods can be invoked on the Expression Builder by using the following syntax: `$("div#exprBldr").expressionBuilder('method');`

The following methods are available:

Method             | Description                                                                                                    | Arguments
------------------ | -------------------------------------------------------------------------------------------------------------- | ---------
getExpressionValue | Get the expression value of the current expression.                                                            | NONE
getExpressionJSON  | Get the JSON representation of the current expression.  This is what gets saved when persisting a template.    | NONE
clearExpression    | Reset the current expression back to its starting state.                                                       | NONE 
saveAsTemplate     | Save the current expression as a template                                                                      | NONE
setReturnType      | Set the expression return type.                                                                                | type

## Release History
0.1.0 - Initial Release - Support for basic expression builder and saving templates.

## Known Issues
* A really long expression expands beyond containing div

## To Do 
* Support for ajax sub-expression loading
* Support for ignoring sub-expression when saving
* Support for mananging saved templates
* Upgrade Grunt to 0.4+
* Should Number and String Literals insert 0 and "", respectively when text is blank? (might be confusing to user)
* Return type instead of '?' as place holder for expandable inputs
* Get off of Bootstrap for styling... might be a little bit of overkill for such a small project.

