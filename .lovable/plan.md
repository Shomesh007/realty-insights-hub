

# LykaRealty AI Investment Dashboard

## Overview
A sophisticated real estate investment intelligence dashboard with full backend functionality, featuring AI-powered rental income optimization, mortgage calculations, capital appreciation forecasting, and risk assessment tools.

---

## Core Features

### 1. Navigation & Layout
- **Sticky header** with LykaRealty branding and "AI Intelligence" tagline
- **Navigation links** - Dashboard (active), Reports, Market Data (placeholders for future designs)
- **User profile button** in the top right
- Clean, minimal design with the warm beige and burgundy/gold color palette from the design

### 2. Hero Section - Rental Intelligence
- **"Tamil Millionaire Journey"** headline with rental intelligence badge
- **82% Efficiency gauge** - Circular progress indicator
- **Monthly Income display** - Shows $18,450 with live formatting
- **Asset Score** - A+ rating with verified badge
- **"Analyze Income" button** - Triggers income analysis calculation

### 3. Mortgage & EMI Calculator
- **Interactive loan amount slider** - Adjustable up to custom limits
- **Down payment slider** - Percentage-based input
- **Real-time EMI calculation** using standard mortgage formulas
- **Calculate EMI button** - Shows detailed breakdown in a modal or inline

### 4. Capital Appreciation Chart
- **5-year growth projection visualization** with +32.5% forecast
- **Smooth curved line chart** with gradient fill
- **Year markers** (2023-2028) along timeline
- **Data point indicators** with hover states
- Built using Recharts for smooth, responsive charting

### 5. Investment Risk Estimator
- **Circular risk indicator** with concentric rings
- **Risk level display** (Low/Medium/High) in center
- **Calculate Risk button** - Analyzes based on input parameters
- Visual risk gradient effect

---

## Backend & Data Features

### Database Structure
- **User profiles** - Store preferences and saved calculations
- **Investment calculations** - Save EMI and risk calculations history
- **Asset data** - Store property/investment details

### Calculation Engine
- **EMI Formula** - Accurate monthly payment calculations with interest rates
- **Risk Assessment** - Algorithm considering loan-to-value ratio, income ratios
- **Capital Appreciation** - Growth projections based on input parameters

---

## Design System

### Colors (matching your design)
- **Primary (Burgundy)**: #6B1F4B
- **Secondary (Gold)**: #E9C46A
- **Background (Beige)**: #F6EFE4
- **Cards**: White with soft shadows

### Typography
- **Plus Jakarta Sans** font family
- Bold headlines, clean readable body text

### Components
- Soft rounded cards with subtle borders
- Interactive sliders with thumb indicators
- Circular progress/gauge components
- Smooth hover transitions on buttons

---

## Technical Approach
- **Lovable Cloud** for database and backend logic
- **React components** with TypeScript
- **Tailwind CSS** for styling (matching your color scheme)
- **Recharts** for the appreciation chart
- **Edge functions** for complex calculations if needed

