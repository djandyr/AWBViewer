'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /preview when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/preview");
  });


  describe('preview', function() {

    beforeEach(function() {
      browser.get('index.html#!/preview');
    });


    it('should render preview when user navigates to /preview', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('designer', function() {

    beforeEach(function() {
      browser.get('index.html#!/designer');
    });


    it('should render designer when user navigates to /designer', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
