# 01 · Onboarding & Auth (`AUTH`)

**Role:** Shared · **Goal:** get a new user into the right side of the app (Customer or Vendor) with a verified phone number, and get returning users back in fast.

## Requirements

- **AUTH-R1** First launch shows Onboarding, then Role Selection. Later launches go to Sign In, or straight home if a session exists.
- **AUTH-R2** Sign in accepts email *or* phone plus password. Social sign-in is offered (Google plus one of Apple/GitHub).
- **AUTH-R3** The user picks Customer or Vendor at sign-in; the primary button reflects the choice ("Sign In to Customer").
- **AUTH-R4** Every account verifies its phone number with a 6-digit SMS code. The phone number is how vendors reach customers, so it is required.
- **AUTH-R5** When a customer verifies a phone number, any orders vendors already created for that number are attached to the account.
- **AUTH-R6** Vendor sign-up also creates a minimal shop (name, category, address). Everything else can be completed later in Shop Settings.
- **AUTH-R7** Password reset is by email link. The response never reveals whether an email is registered.
- **AUTH-R8** Sessions persist until sign-out; tokens refresh silently.

## Data

User: id, full name, email, phone (verified flag), password hash, roles [customer, vendor], avatar, created at.

## Open questions

- Apple or GitHub as the second social provider? (References show both.)
- Is email required, or is phone-only sign-up allowed for customers?

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `AUTH-01` Splash · 🔵 In design

Brand splash shown while the app boots and restores the session.

- PingMe logo with a short intro animation on first open
- Restores a saved session and routes straight to the right home (Customer or Vendor)
- Falls through to Onboarding on first install, Sign In otherwise

**Acceptance:**

- [ ] Splash never shows longer than 2 s on a warm start
- [ ] Animation plays once per install; later launches show a static logo

> Tap the splash to continue. The intro plays on the first open of a browser session; later opens show the static logo (Replay intro restarts it).

### `AUTH-02` Onboarding · 🔵 In design

Four swipeable intro slides that explain PingMe to customers and vendors.

- Slides: Book with Confidence, Grow Your Business, Discover Local Services, Connect with Ease
- Page dots, Next button, Skip on early slides
- Last slide: Get Started plus 'Already have an account? Sign in'

**Acceptance:**

- [ ] Swipe and Next both advance; Skip jumps to Role Selection
- [ ] Shown only until the user finishes or skips it once

Reference: [1](../../design%20reference/authentication/Screenshot%202026-10-13%20135118.png)

### `AUTH-03` Role Selection · 🔵 In design

New users choose whether they are a Customer or a Vendor before signing up.

- Two cards: I am a Customer, I am a Vendor, each with a one-line explanation
- Continue is disabled until one card is selected
- Help icon and 'Already have an account? Sign In'

**Acceptance:**

- [ ] Selected role carries into Sign Up and decides which sign-up form opens

Reference: [1](../../design%20reference/authentication/Screenshot%202026-10-13%20135051.png)

### `AUTH-04` Sign In · 🔵 In design

Returning users sign in with email or phone, choosing Customer or Vendor mode.

- Role toggle: Customer (track and follow my orders) or Vendor (manage shop and orders)
- Email or phone, password with show/hide, Forgot? link
- Primary button names the role: 'Sign In to Customer' / 'Sign In to Vendor'
- Social sign-in (Google plus Apple or GitHub; final pair to be decided)
- Footer: Sign Up link, app version, Privacy Policy, Terms of Service

**Acceptance:**

- [ ] Wrong credentials show an inline error without clearing the email field
- [ ] An account holding both roles lands on the role picked in the toggle

> Prototype: any email or phone signs in; the password "wrong" shows the failed sign-in state. Social pair shown as Google + Apple until the open question is settled.

Reference: [1](../../design%20reference/authentication/Screenshot%202026-10-13%20135010.png) · [2](../../design%20reference/authentication/Screenshot%202026-10-13%20135028.png) · [3](../../design%20reference/authentication/Screenshot%202026-10-13%20135046.png) · [4](../../design%20reference/Customer/Screenshot%202026-10-13%20134125.png) · [5](../../design%20reference/Customer/Screenshot%202026-10-06%20152222.png) · [6](../../design%20reference/Customer/Screenshot%202026-10-06%20152155.png)

### `AUTH-05` Customer Sign Up · 🔵 In design

Customer creates an account with name, email, phone and password.

- Full name, email, phone number, password, confirm password
- Terms of Service and Privacy Policy checkbox
- Create Account button, social sign-up (Google, Apple)
- Phone number is verified with a Security Code before first use

**Acceptance:**

- [ ] Create Account stays disabled until all fields validate and terms are ticked
- [ ] Phone number links any orders a vendor already created for that number

Reference: [1](../../design%20reference/authentication/Screenshot%202026-10-13%20135038.png)

### `AUTH-06` Vendor Sign Up · 🔵 In design

Vendor creates an account and a basic shop profile in one flow.

- Owner name, email, phone, password
- Shop name, service category (Laundry, Tailoring, Repair, Cleaning, HVAC, Other), address, opening hours
- Shop logo upload (optional, can be done later)

**Acceptance:**

- [ ] Vendor can create orders right after sign-up; profile can be finished later

### `AUTH-07` Forgot Password · 🔵 In design

User requests a password reset link by email.

- Email address field, Send Reset Link button
- 'Remembered your password? Sign In' link

**Acceptance:**

- [ ] Always shows the same confirmation whether or not the email exists

Reference: [1](../../design%20reference/authentication/Screenshot%202026-10-13%20135100.png)

### `AUTH-08` Security Code · 🔵 In design

Six-digit code sent by SMS to verify a phone number or a sign-in.

- Masked phone number with 'Wrong number? Edit'
- Six digit boxes with auto-advance and paste support
- Resend countdown, Resend SMS, Call me instead
- Verify Now button

**Acceptance:**

- [ ] Resend is locked until the countdown ends
- [ ] Code expires after 10 minutes; five wrong tries locks for 15 minutes

> Prototype: 000000 is treated as a wrong code (five tries, then locked); any other six digits verify and show the success state.

Reference: [1](../../design%20reference/authentication/Screenshot%202026-10-13%20135106.png)

<!-- screens:end -->
