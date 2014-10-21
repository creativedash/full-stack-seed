## Behavior-Driven Development

The primary idea behind Behavior-Driven Development (BDD) is to define what the
code **should** do before writing it. BDD is a superset of Test-Driven Development – 
simply redefining the vocabulary from "expect" (TDD) to "should" (BDD). For example,
"Expect 10 to equal 10" compared to "10 should equal 10".

### Types of Tests

Full-stack javascript testing can be categorized into three types of tests:

* Unit Tests
* Integration Tests
* End-to-end (E2E) Tests

#### Unit Tests
Unit tests are designed to test independent modules (or units) of code. For example, you would write a unit test for an Express **controller** or **model** to confirm that they're doing what they should do.

#### Integration Tests
Once you connect two or more units together you should write an integration test. This could test **routes**, **uploaders**, or **API Endpoints**. Use [Supertest](https://github.com/tj/supertest) to make HTTP assertions.

#### E2E Tests
These will test functionality throughout the full stack – from Angular on down to Nginx. By using [Protractor]() we can simulate a user making their way through the app in a virtual headless browser. Again, these are very high-level tests and are best created after major blocks of functionality are completed between the front and back end.
