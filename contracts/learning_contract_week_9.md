# Learning Contract: Integrate and Verify My Learning

Student: Neil Pack  
Date: November 12, 2026  
Target assessment date: November 19, 2026

## Primary competency

My primary competency is **integrating and verifying my learning through debugging, refactoring, and testing**. By the end of this contract, I will be able to:

**I can review my project as a whole, investigate a real problem with evidence, improve one area for clarity or maintainability, and explain how I verified that my changes work.**

## Specific slices in this contract

For this contract, I am focusing on these parts of the Week 9 competency:

- Evidence-based debugging and troubleshooting
- Independent testing and regression checking
- Refactoring code for clarity and maintainability
- Reviewing the project for quality and prioritizing improvements
- Responsible AI-assisted development and verification, if AI is used

I am not claiming that this contract makes my project perfect or completes every possible professional development practice. I am focusing on making one meaningful improvement, documenting the investigation, and verifying that the improvement did not break existing functionality.

## My starting point

I already know/can:

- I can run my project and use its main features.
- I can read the HTML, CSS, and JavaScript well enough to make focused changes.
- I can use the browser console and developer tools to look for errors and inspect the page.
- I have practiced building features such as navigation, dynamic content, forms, API or asynchronous behavior, and responsive layouts during earlier contracts.

I still need to learn or improve:

- I need to become more systematic when moving from an observed bug to a verified cause instead of changing code by trial and error.
- I need more practice separating a small refactor from a feature change so that I can explain exactly what changed.
- I need to check existing features after a fix instead of assuming that a successful change could not have caused a regression.
- I need to improve how I document AI suggestions and distinguish useful evidence from an unverified guess.

## My learning plan

I will use these resources:

- The Week 9 recommended path and the project requirements or competency checklist
- Browser developer tools, including the console, Elements panel, Network panel when relevant, and responsive viewport tools
- MDN documentation for the HTML, CSS, and JavaScript features involved in the problem I investigate
- My existing project notes, test cases, and earlier learning contracts
- Instructor or peer feedback if I reach a point where my evidence does not identify the cause

I will practice by:

1. Reviewing the project as a whole and making a short list of quality issues, then prioritizing one issue based on user impact and risk.
2. Writing a bug report that records the expected behavior, actual behavior, steps to reproduce the problem, and the evidence I collected.
3. Recording an initial hypothesis about the cause before changing the code.
4. Testing the hypothesis with a focused inspection, experiment, or temporary diagnostic output.
5. Fixing the problem and refactoring one related area for clearer naming, smaller responsibilities, less duplication, or easier maintenance.
6. Testing the original problem again and completing a small regression checklist for the project’s important user flows.
7. Recording what I changed, what evidence supported or rejected my original hypothesis, and what I would improve next if more time were available.

My first milestone, due **November 15, 2026**, is:

I will complete the project quality review, select one high-priority issue, and create a bug report containing the expected behavior, actual behavior, reproduction steps, evidence, and an initial hypothesis. I will also identify the project features that must be included in my regression check.

## Evidence of learning

I will submit or demonstrate:

- A project quality review with several possible improvements and an explanation of why I prioritized one of them
- A bug report showing the expected behavior, actual behavior, reproduction steps, evidence, and initial hypothesis
- Evidence from the investigation, such as console output, screenshots, browser inspection, network information, or a focused experiment
- The code fix and one related refactor, with a short explanation of how the change improves clarity or maintainability
- A verification record showing that the original bug is fixed and that the important existing user flows still work
- A short explanation of whether my initial hypothesis was correct, how it changed if necessary, and what I learned from the investigation
- An AI-use and verification note, if I use AI during the process

I will know I am ready when:

- I can reproduce the original problem or explain the exact test that exposed it, and I can show evidence for the cause rather than only describing a guess.
- The fix works in the original failure case and the project still passes my regression checklist without new console errors.
- I can explain the refactor, why I made it, and how it improves the code without relying on an AI-generated explanation.
- I can identify which suggestions or conclusions were supported by documentation, tests, or browser evidence.

## Support and risks

The help I may need is:

I may need an instructor or peer conference if the bug has more than one plausible cause or if my test does not isolate the problem. Before asking for help, I will bring the reproduction steps, expected and actual behavior, evidence gathered, and my current hypothesis so that the conversation can focus on the next useful experiment.

A risk to my plan is:

I may spend too much time trying to fix several issues at once or polishing code that is not related to the main problem. I will respond by choosing one issue, keeping the change small, and using a written regression checklist. If I discover a larger issue, I will document it as a future task instead of expanding the scope of this contract.

## AI use, if applicable

I expect to use AI for:

I may use AI for debugging questions, possible explanations of an error, comparisons between refactoring options, and feedback on my testing plan. I may also ask it to help me think of edge cases. I will not treat an AI response as proof that a cause or solution is correct.

I will verify AI suggestions by:

I will record the important prompts and summarize the suggestions that affected my work. I will compare those suggestions with project requirements and official documentation, test the proposed explanation in my own project, and reject suggestions that are incorrect, insecure, inaccessible, or unnecessary. I will keep only changes that I can explain and verify through browser testing, console or network evidence, and regression checks.
