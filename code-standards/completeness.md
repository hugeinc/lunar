<a name="code-completeness"></a>
## 2. Code Completeness

<a name="code-completeness-quality"></a>
### 2.1 Quality
- Code passes linting
- Copy reflects latest copy decks
- Automated tests have been written, existing tests pass
- Code is documented
- Code is peer reviewed
- No hacks or workarounds present
- No jokes or potentially offensive placeholders exist
- No console.log messages are being recorded / logged
- Mocked API integrated, if needed

<a name="code-completeness-errors"></a>
### 2.2 Javascript errors

- No javascript errors should be present in the console. If there are, it could mean your latest addition has unwanted side-effects, or has broken a teammate's code. 

<a name="code-completeness-linting"></a>
### 2.3 Code passes linting

- Formatting is enforced by ensuring all code passes desired linting tool (JSHint, JSCS) prior to being checked in. 
    - Pre-commit hooks can enforce linting
- This can be integrated into a build process so that the build fails when linting doesn't pass. 

<a name="code-completeness-tests"></a>
### 2.4 Automated Tests

- All features have test coverage for the basic functionality of the component, as well as any other areas which are particulary error prone. 
- Existing automated tests should pass to ensure nobody else's code was broken by your updates.

<a name="code-completeness-documented"></a>
### 2.5 Code is documented

- Javascript is marked up with JSDoc/ngDoc style annotations
- README.md to be present in all builds
or to checking in a reasonably large feature, or a global change review the update with a peer or teammate. 

<a name="code-completeness-hacks"></a>
### 2.6 No hacks or workarounds present

- Code should not contain temporary fixes. Hacks will likely break and need to be fixed again later. Do it right or do it twice.

<a name="code-completeness-jokes"></a>
### 2.7 No jokes or potentially offensive placeholders exist

- Keep dummy content professional, you never know who will be viewing your work. 

<a name="code-completeness-logs"></a>
### 2.8 No console.log messages are being recorded / logged

- Logging is good for debugging, however detailed logging outside of development environments give hackers great insight into what's going on with your code. Keep it secret, keep it safe. 

<a name="code-completeness-api"></a>
### 2.9 Mocked API data integrated

- All data required for the feature is successfully integrated.
- Conditions are present to handle edge cases like null values.