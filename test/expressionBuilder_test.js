/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
/*global _ */
(function($, _) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message]) 
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */
  var subExpressions = [
    {'groupName': 'Composite Comparisons',
      'values': [
        {'displayName': '!', 'displayNameParens':'Not', 'description': 'Returns true if the value on the right is evaluates to false', 'returnType': 'BOOLEAN', 'rightType': 'BOOLEAN'},
        {'displayName': 'and', 'description': 'Returns true if BOTH the value on the right and left evaluate to true', 'returnType': 'BOOLEAN', 'leftType': 'BOOLEAN', 'rightType': 'BOOLEAN'},
        {'displayName': 'or', 'description': 'Returns true if EITHER the value on the right and left evaluate to true', 'returnType': 'BOOLEAN', 'leftType': 'BOOLEAN', 'rightType': 'BOOLEAN'}
      ]
    },
    {'groupName': 'Equals/Not Equals',
      'values': [
        {'displayName': 'not equals', 'description': 'Returns true if the two values are not equal', 'returnType': 'BOOLEAN', 'leftType': ['NUMBER', 'TEMPORAL', 'TEXT', 'OPTION'], 'rightType': ['NUMBER', 'TEMPORAL', 'TEXT', 'OPTION']},
        {'displayName': 'equals', 'description': 'Returns true if the two values are equal', 'returnType': 'BOOLEAN', 'leftType': ['NUMBER', 'TEMPORAL', 'TEXT', 'OPTION'], 'rightType': ['NUMBER', 'TEMPORAL', 'TEXT', 'OPTION']}
      ]
    },
    {'groupName': 'Number Comparisons',
      'values': [
        {'displayName': '<', 'displayNameParens': 'Less Than', 'expressionValue':'<', 'description': 'Returns true if the number on the left is less than that on the right', 'returnType': 'BOOLEAN', 'leftType': 'NUMBER', 'rightType': 'NUMBER'},
        {'displayName': '<=', 'displayNameParens': 'Less Than Or Equals', 'expressionValue':'<=', 'description': 'Returns true if the number on the left is less than or equal to that on the right', 'returnType': 'BOOLEAN', 'leftType': 'NUMBER', 'rightType': 'NUMBER'},
        {'displayName': '>', 'displayNameParens': 'Greater Than', 'expressionValue':'>', 'description': 'Returns true if the number on the left is greater than that on the right', 'returnType': 'BOOLEAN', 'leftType': 'NUMBER', 'rightType': 'NUMBER'},
        {'displayName': '>=', 'displayNameParens': 'Greater Than Or Equals', 'expressionValue':'>=', 'description': 'Returns true if the number on the left is greater than or equal to that on the right', 'returnType': 'BOOLEAN', 'leftType': 'NUMBER', 'rightType': 'NUMBER'}
      ]
    },
    {'groupName': 'Date Comparisons',
      'values': [
        {'displayName': 'is before', 'expressionValue':'<', 'description': 'Returns true if the date on the left is before that on the right', 'returnType': 'BOOLEAN', 'leftType': 'TEMPORAL', 'rightType': 'TEMPORAL'},
        {'displayName': 'is before or on', 'expressionValue':'<=', 'description': 'Returns true if the date on the left is before or the same date as that on the right', 'returnType': 'BOOLEAN', 'leftType': 'TEMPORAL', 'rightType': 'TEMPORAL'},
        {'displayName': 'is after', 'expressionValue':'>', 'description': 'Returns true if the date on the left is after that on the right', 'returnType': 'BOOLEAN', 'leftType': 'TEMPORAL', 'rightType': 'TEMPORAL'},
        {'displayName': 'is after or on', 'expressionValue':'>=', 'description': 'Returns true if the date on the left is after or the same date as that on the right', 'returnType': 'BOOLEAN', 'leftType': 'TEMPORAL', 'rightType': 'TEMPORAL'}
      ]
    },
    {'groupName': 'Option List Comparisons',
      'values': [
        {'displayName': 'in', 'description': 'Returns true if the option on the left is in the list of options on the right', 'returnType': 'BOOLEAN', 'leftType': 'OPTION', 'rightType': '{OPTION}'},
        {'displayName': 'not in', 'description': 'Returns true if the option on the left is not in the list of options on the right', 'returnType': 'BOOLEAN', 'leftType': 'OPTION', 'rightType': '{OPTION}'}
      ]
    },
    {'groupName': 'Number Operators',
     'values': [
       {'displayName': '+', 'displayNameParens':'Addition', 'description': 'Add two numbers together', 'returnType': 'NUMBER', 'leftType': 'NUMBER', 'rightType': 'NUMBER'},
       {'displayName': '-', 'displayNameParens':'Subtraction', 'description': 'Subtract two numbers', 'returnType': 'NUMBER', 'leftType': 'NUMBER', 'rightType': 'NUMBER'},
       {'displayName': '*', 'displayNameParens':'Multiplication', 'description': 'Multiple two numbers together', 'returnType': 'NUMBER', 'leftType': 'NUMBER', 'rightType': 'NUMBER'},
       {'displayName': '/', 'displayNameParens':'Division', 'description': 'Divide two numbers', 'returnType': 'NUMBER', 'leftType': 'NUMBER', 'rightType': 'NUMBER'}
     ]
   },
   {'groupName': 'Fields',
     'values': [
       {'displayName': 'Number Field 1', 'expressionValue': 'number_field_1', 'description': 'The field with label Number Field 1 in Section First', 'returnType': 'NUMBER'},
       {'displayName': 'Number Field 2', 'expressionValue': 'number_field_2', 'description': 'The field with label Number Field 2 in Section First', 'returnType': 'NUMBER'},
       {'displayName': 'Date Field 1', 'expressionValue': 'date_field_1', 'description': 'The field with label Date Field 1 in Section First', 'returnType': 'TEMPORAL'},
       {'displayName': 'Date Field 2', 'expressionValue': 'date_field_2', 'description': 'The field with label Date Field 2 in Section First', 'returnType': 'TEMPORAL'}
     ]
   },
   {'groupName': 'Options',
     'values': [
      {'displayName': 'Pizza', 'description': 'The Pizza selection in Favorite Food selector', 'returnType': 'OPTION'},
      {'displayName': 'Ice Cream', 'description': 'The Ice Cream selection in Favorite Food selector', 'returnType': 'OPTION'},
      {'displayName': 'Spaghetti', 'description': 'The Spaghetti selection in Favorite Food selector', 'returnType': 'OPTION'}
     ]
   },
   {'groupName': 'Numerical Aggregate Functions',
     'values': [
       {'displayName': 'Average', 'expressionValue':'avg', 'description': 'Get the average of a list of numbers', 'rightType': '(NUMBER...)', 'returnType': 'NUMBER'},
       {'displayName': 'Sum', 'expressionValue':'sum', 'description': 'Get the sum of a list of numbers', 'rightType': '(NUMBER...)', 'returnType': 'NUMBER'},
       {'displayName': 'Min', 'expressionValue':'min', 'description': 'Get the minimum number from a list of numbers', 'rightType': '(NUMBER...)', 'returnType': 'NUMBER'},
       {'displayName': 'Max', 'expressionValue':'max', 'description': 'Get the maximum number from a list of numbers', 'rightType': '(NUMBER...)', 'returnType': 'NUMBER'}
     ]
   },
   {'groupName': 'Temporal Functions',
     'values': [
       {'displayName': 'MinutesBetween', 'expressionValue':'minutesBetween', 'description': 'Get the number of minutes between date 1 and date 2', 'rightType': '(TEMPORAL, TEMPORAL)', 'returnType': 'NUMBER'},
       {'displayName': 'HoursBetween', 'expressionValue':'hoursBetween', 'description': 'Get the number of hours between date 1 and date 2', 'rightType': '(TEMPORAL, TEMPORAL)', 'returnType': 'NUMBER'},
       {'displayName': 'DaysBetween', 'expressionValue':'daysBetween', 'description': 'Get the number of days between date 1 and date 2', 'rightType': '(TEMPORAL, TEMPORAL)', 'returnType': 'NUMBER'},
       {'displayName': 'MonthsBetween', 'expressionValue':'monthsBetween', 'description': 'Get the number of months between date 1 and date 2', 'rightType': '(TEMPORAL, TEMPORAL)', 'returnType': 'NUMBER'},
       {'displayName': 'YearsBetween', 'expressionValue':'yearsBetween', 'description': 'Get the number of years between date 1 and date 2', 'rightType': '(TEMPORAL, TEMPORAL)', 'returnType': 'NUMBER'},
       {'displayName': 'Now', 'expressionValue':'now', 'description': 'Get the current date', 'rightType': '()', 'returnType': 'TEMPORAL'}
     ]
   },
    {'groupName': 'Number Functions',
     'values': [
       {'displayName': 'Round', 'expressionValue':'round', 'description': 'Round a number half up', 'rightType': '(NUMBER)', 'returnType': 'NUMBER'},
       {'displayName': 'Ceiling', 'expressionValue':'ceiling', 'description': 'Get the ceiling of a number', 'rightType': '(NUMBER)', 'returnType': 'NUMBER'},
       {'displayName': 'Floor', 'expressionValue':'floor', 'description': 'Return the floor of a number', 'rightType': '(NUMBER)', 'returnType': 'NUMBER'},
       {'displayName': 'Exponent', 'expressionValue':'exp', 'description': 'Return a number raised to an exponent', 'rightType': '(NUMBER, NUMBER)', 'returnType': 'NUMBER'}
      ]
    },
    {
    'groupName': 'Utility Functions',
     'values': [
       {'displayName': 'IsBlank', 'expressionValue':'isBlank', 'description': 'Returns true if the value is null or whitespace', 'rightType': '(ANY)', 'returnType': 'BOOLEAN'},
       {'displayName': 'IsNotBlank', 'expressionValue':'isNotBlank', 'description': 'Returns true if the value is not null and not whitespace', 'rightType': '(ANY)', 'returnType': 'BOOLEAN'}
      ]
    }
  ];
  module('jQuery#expressionBuilder default config', {
    setup: function() {
      this.divFixture = $('div#qunit-fixture');
      this.exprBldr = this.divFixture.expressionBuilder(subExpressions, {});
    },
    teardown: function() {
      this.divFixture.empty();
      window.localStorage.setItem('ebTemplates', '[]');
      $('.select2-drop').remove();
      this.divFixture.removeData('expressionBuilder');
    }
  });

  //basic jquery tests
  test('jquery#expressionBuilder is exposed as a jquery plugin', 1, function() {
    ok($.fn.expressionBuilder, 'Expression builder is a jquery plugin');
  });

  test('is chainable', 1, function() {
    this.exprBldr.addClass("test-class");
    ok(this.divFixture.hasClass("test-class"), 'Div fixture has test-class');
  });

  //begin core plugin tests
  test('Expression Builder Object is set as data', 1, function() {
    ok(this.divFixture.data('expressionBuilder'), 'Expression builder is attached as data');
  });

  test('should append a select2 box to div', 1, function() {
    //select2 selector constains a div with select2-drop class
    ok(this.divFixture.data('expressionBuilder').$elem.length, 'Select2 was appended to div');
  });

  /* Phantom.js seems to have an issue with focus-- commenting out for now
  test('focusing on sub-expr input should focus to sub-expr selector', 1, function() {
    this.divFixture.find('.subExpr').on("select2-focus", function()
    {
        ok(true, "select2 is focused");
    });
    this.divFixture.find('div.exprInner input').focus();
    //ok($('div.exprInner input').is(":focus"), 'Select2 was appended to div');
  });
  */
  var visInput = 'div.exprInner > input:visible';
  test('Sub-expression start input has default return type', function() {
    equal($(visInput).data('returnType'), 'NUMBER', 'sub expression input in Number');
  });

  test('Sub-expression has subExprActive class', function() {
    ok($(visInput).hasClass('subExprActive', 'sub expression input has subExprActive class'));
  });

  var testReturnTypeIsNumber = function() {
    var subExprWithNumberReturnType =
      _.filter(_.flatten(_.map(subExpressions, function (seg) { return seg.values; })), function (subExpr) { return subExpr.returnType === 'NUMBER'; }).length;
    //there are system defined number sub expressions: Grouping and Number Literal (String Literal Should be filtered out since it's type is TEXT)
    equal($('li.select2-result:not(.select2-result-with-children)').length, subExprWithNumberReturnType + 2, 'Sub-expr select has correct options');
  };

  test('Sub-expressions selections are filtered by return type of active sub-expression input', testReturnTypeIsNumber);

  function selectOption (id) {
    //select addition
    $('input.subExpr').select2('val', id);
  }

  test('Inputs, spans are added to expression when subexpression is selected', function () {
    selectOption('+');

    equal($(visInput).length, 2, 'There is an input appended for left and right types');
    equal($('div.exprInner > span').length, 1, 'There is a span appended for sub expression');

    equal($('div.exprInner > input:visible:eq(0)').data('returnType'), 'NUMBER', 'The left type is a number');
    equal($('div.exprInner > span').text(), '+', 'The span text is set');
    equal($('div.exprInner > input:not(:visible)').eq(0).data('subExpr').expressionValue, '+', 'Subexpression data is set');
    equal($('div.exprInner > input:visible:eq(1)').data('returnType'), 'NUMBER', 'The right type is a number');
  });

  test('Select2 is cleared and far left subexpression is active when subexpression is selected', function () {
    selectOption('+');

    ok($('div.exprInner > input:visible:eq(0)').hasClass('subExprActive'), 'The left sub expression is active');
    equal($('input.subExpr').select2('val'), '', 'Select2 has been cleared');
  });

  var visInSel = 'div.exprInner > *:visible';
  test('Static lists work as intended', function () {
    selectOption('DaysBetween');
    // should append the following items <span - DaysBetween(>, <input Date>, <span ,>, <input Date> and <span )>
    // first span
    equal($(visInSel).eq(0).text(), 'DaysBetween', 'The first span display is correct');
    equal($('div.exprInner > input:not(:visible)').eq(0).data('subExpr').expressionValue, 'daysBetween', 'Subexpression data is set');
    equal($('div.exprInner > input:not(:visible)').eq(0).data('subExpr').rightComponent.expandableInputs.length, 2, 'Right component is set');

    // first span
    equal($(visInSel).eq(1).text(), '(', 'The second span display is correct');

    //Date input
    equal($(visInSel).eq(2).data('returnType'), 'TEMPORAL', 'The second input is correct');
    //list seperator span
    equal($(visInSel).eq(3).text(), ',', 'The comma seperator spans display is correct');
    //Date input
    equal($(visInSel).eq(4).data('returnType'), 'TEMPORAL', 'The second input is correct');
    //right paren span
    equal($(visInSel).eq(5).text(), ')', 'The right paren spans display is correct');
  });

  test('When expression is complete select is disabled', function () {
    selectOption('Number Field 1');
    ok($('.select2-container-disabled').length, 'Select2 is disabled');
  });

  test('Subexpression can be grouped', function () {
    selectOption('Grouping');
    equal($(visInSel).eq(0).text(), '(', 'The second span display is correct');
    equal($(visInSel).eq(1).data('returnType'), 'NUMBER', 'The return type of the grouped item is correct');
    equal($(visInSel).eq(2).text(), ')', 'The right paren spans display is correct');
  });

  test('Element with a multisized list appends an input', function () {
    selectOption('Sum');
    equal($(visInput).length, 1, 'There is one input for sum argument');
    ok($(visInput).data('isMultiSized'), 'It has the isMultiSized data element set (1)');
    selectOption('Number Field 1');
    equal($(visInput).length, 1, 'There is another element appended');
    ok($(visInput).data('isMultiSized'), 'It has the isMultiSized data element set (2)');
    selectOption('Close List');
    equal($(visInput).length, 0, 'The list can be closed');
  });

  module('jQuery#expressionBuilder boolean start expression', {
    setup: function() {
      this.divFixture = $('div#qunit-fixture');
      this.exprBldr = this.divFixture.expressionBuilder(subExpressions, {'returnType': 'BOOLEAN'});
    },
    teardown: function() {
      this.divFixture.empty();
      window.localStorage.setItem('ebTemplates', '[]');
      $('.select2-drop').remove();
      this.divFixture.removeData('expressionBuilder');
    }
  });

  test('Sub-expressions are added to select from config', 1, function() {
    //start expression return type can be changed
    equal($(visInput).data('returnType'), 'BOOLEAN', 'sub expression input is BOOLEAN');
  });

  test('Subexpressions with an Array of valid types filters correctly', 1, function() {
    selectOption('equals');
    var subExprWithNumberReturnType =
      _.filter(_.flatten(_.map(subExpressions, function (seg) { return seg.values; })), function (subExpr) { return _.contains(['NUMBER', 'TEMPORAL', 'TEXT', 'OPTION'], subExpr.returnType); }).length;
    equal($('li.select2-result:not(.select2-result-with-children)').length, subExprWithNumberReturnType + 3, 'Sub-expr fitlers with Array return type');
  });

  test('Subexpressions with an Array of valid types filters correctly', 1, function() {
    selectOption('equals');
    selectOption('Number Field 1');
    equal($(visInput).eq(0).data('returnType'), 'NUMBER', 'The Other Operands type is filtered based on the selection of the first');
  });
  /*
  test('After adding a subExpression eb-subexpression-add is fired', 1, function() {
    this.divFixture.on('eb-subexpression-add', function (e, subExpression) {
      equal(subExpression.displayText, 'is before', 'eb-subexpression-add was fired and subexpression was passed back');
    });
    selectOption('is before');
  });
  */
  test('On complete event is fired', 1, function() {
    this.divFixture.on('eb-expression-complete', function (e, expression) {
      equal(expression, 'date_field_1 < date_field_2', 'eb-expresssion-complete was fired and expression was passed back');
    });
    selectOption('is before');
    selectOption('Date Field 1');
    selectOption('Date Field 2');
  });

  module('Test API', {
    setup: function() {
      this.divFixture = $('div#qunit-fixture');
      this.exprBldr = this.divFixture.expressionBuilder(subExpressions, {'returnType': 'BOOLEAN'});
    },
    teardown: function() {
      this.divFixture.empty();
      window.localStorage.setItem('ebTemplates', '[]');
      $('.select2-drop').remove();
      this.divFixture.removeData('expressionBuilder');
    }
  });

  test('GetExpressionValue method returns the expression value', function() {
    selectOption('is before');
    selectOption('Date Field 1');
    selectOption('Date Field 2');
    equal(this.divFixture.expressionBuilder('getExpressionValue'), 'date_field_1 < date_field_2', 'The expression is correct on get');
  });

  test('GetJSON returns a json rep of current expression', function() {
    selectOption('is before');
    selectOption('Date Field 1');
    selectOption('Date Field 2');
    var json = this.divFixture.expressionBuilder('getExpressionJSON');
    //it is hard to test every property of the JSON, just test a few key ones
    equal(json.expressionValue, '<', 'Expresion value is set in json');
    equal(json.leftComponent.expressionValue, 'date_field_1', 'Left component is set in json');
    equal(json.rightComponent.expressionValue, 'date_field_2', 'Right component is set in json');
  });

  test('Can save templates', function() {
    selectOption('is before');
    this.divFixture.expressionBuilder('saveAsTemplate', 'Is Before Template');
    //equal(this.divFixture.expressionBuilder('getTemplates').length, 1, 'Template was added');
    equal(this.divFixture.expressionBuilder('getTemplates').displayName, 'Is Before Template', 'Template was added');
    equal(this.divFixture.expressionBuilder('getTemplates').displayText, 'is before', 'Templates diplayText is correct');
  });

  test('Expression return type can be changed', function() {
    selectOption('is before');
    this.divFixture.expressionBuilder('setReturnType', 'NUMBER');
    testReturnTypeIsNumber.call();
  });

  test('Expression can be cleared and eb-clear event is fired', 4, function() {
    this.divFixture.on('eb-clear', function (e) {
      ok(true, 'Event was fired');
    });
    selectOption('is before');
    //verify 2 inputs before clear
    equal($(visInput).length, 2, 'There are two inputs before clear');
    this.divFixture.expressionBuilder('clearExpression');
    equal($(visInput).length, 1, 'There is one input after');
    equal($(visInput).data('returnType'), 'BOOLEAN', 'The return type is reset after clear');
  });
/*
  test('Back functionality works', function() {
    selectOption('is before');
    selectOption('Date Field 1');
    selectOption('Date Field 2');
    equal($(visInput).length, 0, 'There are no inputs before calling back');
    this.divFixture.expressionBuilder('back');
    //back should remove Date Field 2 and replace it with a TEMPORAL typed input
    equal($(visInput).length, 1, 'There are 1 input after calling back');
    equal($(visInput).eq(0).data('returnType'), 'TEMPORAL', 'The input put back has the return type still set');
  });

  test('eb-back event is triggered', function() {
    this.divFixture.on('eb-back', function (e) {
      ok(true, 'Event was fired');
    });
    selectOption('is before');
    this.divFixture.expressionBuilder('back');
  });
*/
}(jQuery, _));
