# Contract Review

**Contract:** Week 7 Contract  
**Date:** November 7, 2026  
**Peer Conversation Partner:** Daphne Pack (my wife)  
**Slices Reviewed:** Page titles and meta descriptions, heading hierarchy and meaningful link text, image alternative text and content structure, WCAG-informed semantic and visual checks, color contrast and visible focus, reflow and zoom behavior, and keyboard-only navigation and interaction

---

## 1. What I Demonstrated Across the Contract

I demonstrated that I can review a page for SEO and accessibility using an evidence-based checklist instead of only checking whether it looks correct. Instead of adding to the hiking guide, I built a minimal week 7 page (`week7.html`) with placeholder content. Each section of the page focuses on one slice of the contract.

The page has a descriptive title (46 characters) and meta description (135 characters), one `h1` with no skipped heading levels, and navigation links that name the section they lead to. It uses landmarks such as `header`, `nav`, `main`, `section`, and `footer`. It includes an informative image with descriptive alternative text inside a `figure` with a `figcaption`, and a decorative image marked with `alt=""` so screen readers skip it. I also built a contrast checker that calculates the WCAG contrast ratio between two colors, a visible focus outline on every control, a layout that reflows into one column at narrow widths, and keyboard-operable controls. These include a skip link, a menu button that responds to `Enter`, `Space`, and `Escape`, filter checkboxes with a reset button, and status messages that screen readers announce.

## 2. Evidence I Showed

- **Artifact:** My week 7 page, made up of `pages/week7.html`, `styles/week7.css`, and `scripts/week7.js`.
- **Test or Verification:** I ran the page's built-in audit, which checks the page language, title length, meta description length, single `h1`, heading order, landmarks, image `alt` attributes, link text, form labels, button names, unique IDs, and text contrast. All 12 checks passed, and the lowest text contrast ratio on the page was 6.57:1, above the AA minimum of 4.5:1. I also tested the page at a 320 CSS pixel viewport and confirmed there was no horizontal scrolling. In the keyboard walkthrough, I used the focus order log to record each element as I pressed `Tab`, and I confirmed that `Escape` closes the menu and returns focus to the menu button.
- **Explanation, Challenge, or Decision:** I explained how the contrast checker connects to WCAG Success Criterion 1.4.3 (Contrast Minimum). It converts each color to relative luminance and compares the lighter and darker values to find the ratio. A design decision I made was to show audit results as the words "Pass" or "Fail" with color only as a reinforcement, so the results do not rely on color alone (WCAG 1.4.1, Use of Color). A challenge was that my automated test browser would not shrink below about 500 pixels, so I had to use device emulation to test a true 320 pixel width.

## 3. What My Peer Helped Me Notice

Daphne went through each slice with me and confirmed that the page met all of them. She helped me notice that an automated audit passing 12 out of 12 checks does not mean the page is fully accessible. The audit can confirm that an image has an `alt` attribute, but a person still has to judge whether the alt text actually describes the image well. The same goes for focus: the audit cannot tell whether a focus indicator is easy to see. That is why the page also has a manual checklist for the checks that need a person. We also noticed that I had not yet tested the status messages with a real screen reader, so I can only say that they are set up to be announced, not that I have heard them announced.

## 4. What I Learned by Asking Questions or Listening

It became clearer to me that SEO and accessibility often support each other. A descriptive title, a logical heading structure, meaningful link text, and good alternative text help search engines understand the page, and they also help screen reader users understand and navigate it. I also learned that keyboard accessibility is more than being able to reach every control with `Tab`. The focus order has to make sense, the focus indicator has to be visible, and the user must never get stuck. The skip link and the `Escape` behavior on the menu button are examples of making keyboard navigation easier, not just possible.

## 5. Review Status

Every slice reviewed.

## 6. My Next Step

My next step is to finish the manual checklist by testing the page with a screen reader to confirm that the filter, audit, and manual checklist status messages are announced, and by zooming the page to 200% and 400% in a regular browser window. After that, I will apply the same audit process to my Neil Land Hiking Guide and compare its before-and-after results.
