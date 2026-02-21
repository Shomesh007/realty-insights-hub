# Lykaconnect Wealth Voyage: Feature Implementation & Core Details

This document provides a comprehensive breakdown of how every feature in the codebase is implemented, including UI, business logic, routing, state management, hooks, utilities, and minute details. Use this as a reference for UX redesign or migration.

---

## 1. Routing & Page Structure
- **src/App.tsx**: Uses `HashRouter` and `Routes` from `react-router-dom` to define navigation.
  - Main routes:
    - `/` → `Index`
    - `/properties` → `Properties`
    - `/ai-wealth-forecast` → `AIWealthForecast`
    - `/tamil-investment-analysis` → `TamilInvestmentAnalysis`
    - `/tamil-investment-results` → `TamilInvestmentResults`
    - `/ai-features` → `AIFeatures`
    - `/portfolio-optimizer` → `PortfolioOptimizer`
    - `/capital-appreciation-estimator` → `CapitalAppreciationEstimator`
    - `/capital-appreciation-results` → `CapitalAppreciationResults`
    - `/blog` → `BlogSection`
    - `/archives` → `Archives`
    - `/contact` → `Contact`
    - `/real-estate-risk-calculator` → `RealEstateRiskCalculator`
    - `/real-estate-risk-results` → `RealEstateRiskResults`
    - `/uae-investor-visa` → `UAEInvestorVisaInfo`
    - `/mortgage-emi-calculator` → `MortgageEMICalculator`
    - `/mortgage-emi-results` → `MortgageEMIResults`
  - **BottomNavBar** is always rendered for navigation.

---

## 2. Navigation
- **src/components/BottomNavBar.tsx**: Defines nav items with icons and paths. Uses `useLocation` and `useNavigate` to highlight active section and handle navigation.
- **src/components/Header.tsx**: Responsive header with logo, desktop nav, and mobile menu toggle.

---

## 3. Home & Landing
- **src/pages/Index.tsx**: Renders `HomeSection`, `AIFeatures`, and `BlogSection`.
- **src/components/HomeSection.tsx**: Contains hero, call-to-action, and "Millionaire Countdown" button.

---

## 4. AI Features
- **src/components/AIFeatures.tsx**:
  - Defines `features` array: icon, title, description, button text, route.
  - Renders feature cards, with navigation on button click.
  - Responsive: checks mobile, scrolls to next section if needed.
  - Filters visible and extra features for layout.

---

## 5. Blog & Content
- **src/components/BlogSection.tsx**: Renders blog cards with title, excerpt, image, category, author, date, read time. `showMore` state toggles extra content.

---

## 6. Property Listings
- **src/pages/Properties.tsx**: Handles navigation and scroll to listings. Button scrolls to tools section.

---

## 7. Calculators & Estimators
- **src/components/CapitalAppreciationEstimator.tsx**:
  - Form for property details, scenario, growth factors.
  - Calls `fetchGeminiAnswer` (AI API) with formatted prompt.
  - Parses AI result, navigates to results page.
- **src/components/MortgageEMICalculator.tsx**: Mortgage calculation logic, form, and results.
- **src/components/RealEstateRiskCalculator.tsx**:
  - Form for investment, duration, focus, risk.
  - State management for input, validation, navigation.

---

## 8. Tamil Investment Analysis
- **src/components/TamilInvestmentAnalysis.tsx**:
  - Form for Tamil investors: name, email, phone, property type, location, bedrooms, price.
  - Calls `fetchGeminiAnswer` for AI-powered analysis.
  - Parses and displays detailed results: rent, appreciation, ROI, millionaire timeline, score, summary.

---

## 9. Client Dashboard
- **src/components/ClientDashboard.tsx**:
  - Displays portfolio data: total value, monthly income, properties, ROI, growth.
  - Renders cards for each metric, property list, millionaire progress.

---

## 10. UI Components
- **src/components/ui/**: Contains reusable UI primitives (accordion, alert, badge, button, calendar, card, carousel, checkbox, collapsible, dialog, drawer, dropdown-menu, form, hover-card, input, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle-group, toggle, tooltip).
  - Most use Radix UI, custom styling, and utility functions (`cn` from `lib/utils.ts`).

---

## 11. Hooks & Utilities
- **src/hooks/use-mobile.tsx**: Detects mobile device for responsive logic.
- **src/hooks/use-toast.ts**: Toast notification logic.
- **src/lib/utils.ts**: Utility functions (e.g., `cn` for classnames).
- **src/utils/geminiApi.ts**: Handles AI API calls (Google Gemini).

---

## 12. Data & State
- Portfolio, property, and blog data are hardcoded or fetched via API (AI for estimators).
- State managed via React hooks (`useState`, `useEffect`).
- Navigation via `useNavigate` from `react-router-dom`.

---

## 13. Styling
- Uses Tailwind CSS (see `tailwind.config.ts`).
- Custom gradients, colors, and font families (Poppins, Inter).
- Responsive layouts via Tailwind and JS checks.

---

## 14. Minute Details
- All forms validate input, handle loading, errors, and navigation.
- Feature cards use SVG icons, custom colors, and shadows.
- Progress bars, badges, and tooltips for UX feedback.
- Scroll-to-section logic for smooth navigation.
- AI estimators use formatted prompts and parse structured responses.
- Blog and dashboard use cards for visual grouping.
- Mobile menu toggles, overlays, and transitions for responsive UX.

---

## 15. Miscellaneous
- Sitemap and robots.txt in `public/` for SEO.
- JSON data files for property/rent/yield info.
- ESLint, PostCSS, Vite config for build tooling.

---

## 16. Core Flow Summary
- User lands on home → sees hero, features, blog.
- Navigates via bottom nav or header.
- Accesses calculators, estimators, dashboards.
- Inputs data, gets AI-powered results.
- Views blog, property listings, contact info.
- All UI is responsive, styled, and interactive.

---

## 17. Deep Dive: Tamil Investment Analysis & Results

### User Input Flow
- User fills a form (name, email, phone, property type, location, bedrooms, price).
- Input is managed by React state (`form`, `countryCode`).
- On submit, input is validated (e.g., price formatting, phone saved to localStorage).

### AI Prompt & API Call
- A detailed prompt is constructed, including:
  - User's property details
  - Market data (hardcoded: appreciation rates, rental yields by location/bedroom)
  - Strict instructions: use only provided data, no estimation, English only, clear section headings.
- The prompt is sent to Google Gemini API via `fetchGeminiAnswer` (see `src/utils/geminiApi.ts`).
  - POST request, returns AI-generated text answer.

### Output Calculation & Parsing
- On success:
  - Loading state is stopped.
  - Navigates to `/tamil-investment-results` with `{ form, aiResult }` in router state.
- On error:
  - Loading state is stopped.
  - Navigates to results page with error message in `aiResult`.

### Results Page Rendering (`TamilInvestmentResults.tsx`)
- Receives `form` and `aiResult` from router state.
- If missing, redirects back to analysis form.
- Currency toggle (AED/USD/INR) with conversion and formatting.
- Millionaire timeline:
  - Calculates when user reaches AED 3.67M in total wealth (property + rent).
  - If not reached in 10 years, shows projected wealth after 10 years.
- Wealth growth chart:
  - Uses recharts LineChart to plot property value, cumulative rent, total wealth for each year.
  - Slider lets user select year (1-10), updates all calculations.
- Info cards:
  - Projected Rental Income: monthly, annual, total rent for selected years.
  - Capital Appreciation: rate, value in N years, total gain.
  - ROI Summary: overall ROI, total expected return.
- AI Investment Summary:
  - Extracted from AI output using regex, cleaned and displayed in a styled card.

### Output Calculation Details
- All calculations (appreciation, rent, ROI, millionaire year) are done in JS using user input and hardcoded rates.
- AI output is parsed for summary/timeline, but all numbers shown in cards/charts are calculated locally for accuracy and consistency.

### Error Handling & Loading
- Loading overlay with animated spinner and rotating messages is shown while waiting for AI response.
- On API/network error, user is shown a friendly error message in the results page.
- All navigation is handled via `useNavigate` from `react-router-dom`.

---

## 18. Deep Dive: Capital Appreciation Estimator & Results

### User Input Flow
- User fills a form (name, email, property type, location, current price, area, horizon, scenario, growth factors).
- Input is managed by React state (`form`).
- On submit, input is validated and formatted.

### AI Prompt & API Call
- A structured prompt is built with all user input and selected growth factors.
- Prompt instructs the AI to respond in a strict format (future value, assumptions, location insight, growth justification, chart data).
- Sent to Google Gemini API via `fetchGeminiAnswer`.

### Output Calculation & Parsing
- On success:
  - Loading state is stopped.
  - AI response is parsed by `parseGeminiResult` to extract all required fields.
  - Navigates to `/capital-appreciation-results` with parsed data in router state.
- On error:
  - Loading state is stopped.
  - Navigates to results page with error message in state.

### Results Page Rendering (`CapitalAppreciationResults.tsx`)
- Receives parsed data from router state.
- If missing or error, shows friendly error and back button.
- Renders a set of SectionCards for:
  - Estimated Future Value
  - Assumption Adjustment
  - Location Insight
  - Growth Justification
- Renders a LineChart (recharts) for projected value growth (years 0-4).
- All values are displayed as returned by the AI, with additional UI hints and progress bars.

### Output Calculation Details
- All chart data and projections are parsed from the AI's response.
- No additional calculations are performed in JS; the AI's numbers are trusted for this tool.

### Error Handling & Loading
- Loading state is managed with a spinner overlay while waiting for AI response.
- On API/network error, user is shown a friendly error message and a back button.
- All navigation is handled via `useNavigate` from `react-router-dom`.

---

## 19. Deep Dive: Portfolio Optimizer

### User Input Flow
- User fills a form (name, email, budget, risk tolerance, investment horizon, investment goals).
- Input is managed by React state (`form`).
- On submit, input is validated and formatted.

### AI Prompt & API Call
- A prompt is constructed with all user input, requesting an optimal Dubai real estate portfolio allocation and strategy.
- Prompt includes all form fields and selected goals.
- Sent to Google Gemini API via `fetchGeminiAnswer`.

### Output Calculation & Parsing
- On submit, result state is set to "Analyzing..."
- On success:
  - AI response (portfolio recommendation and explanation) is set in `result` state.
- On error:
  - `result` is set to a friendly error message.

### Results Rendering
- The AI's response is displayed in a styled card below the form.
- No further parsing or calculation is done; the AI's text is shown as-is.

### Error Handling & Loading
- While waiting for AI, shows "Analyzing..." message.
- On API/network error, user is shown a friendly error message in the result area.
- All navigation is handled via `useNavigate` from `react-router-dom`.

---

## 20. Deep Dive: Real Estate Risk Calculator & Results

### User Input Flow
- User fills a form (investment amount, goal duration, investment focus, risk appetite).
- Input is managed by React state.
- On submit, input is validated and, if valid, user is navigated to results page with parameters in the URL.

### Output Calculation & Parsing
- No AI is used; all calculations are performed in JS based on user input.
- High risk scenario: investment × 5
- Low risk scenario: investment × 3.5
- Visa eligibility: investment ≥ 750,000 AED
- Progress bars and eligibility messages are calculated and rendered based on these values.

### Results Page Rendering (`RealEstateRiskResults.tsx`)
- Reads parameters from URL (investment, duration, focus, risk).
- Calculates and displays:
  - Visa eligibility and progress bar
  - Projected returns for high and low risk strategies
  - Visual bar graphs for investment and returns
  - Smart suggestions for low investment
  - Modal for user to request a safe plan (with email/phone input)
- All UI is styled with custom gradients, progress bars, and cards.

### Output Calculation Details
- All numbers and progress bars are calculated in JS using user input and fixed multipliers.
- No external data or AI is used for these calculations.

### Error Handling & Loading
- If required parameters are missing or invalid, shows fallback values or disables results.
- All navigation is handled via `useNavigate` from `react-router-dom`.

---

**For UX migration:**
- Reference this file for every feature, UI element, and logic.
- All business logic, navigation, and state management are detailed above.
- For minute details, see UI component files and hooks.

---

*Generated by GitHub Copilot (GPT-4.1) on 2026-02-21.*
