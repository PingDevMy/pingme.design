# 01 · Onboarding & Auth (`AUTH`)

**Role:** Shared · **Goal:** get a new user into the one PingMe app with a verified phone number and into the right mode (Customer or Vendor), and get returning users back in fast.

Customers and vendors download the same app. There is one sign-up form and one account; Vendor mode is unlocked by adding a shop to that account, at sign-up or later.

## Flow

```text
Splash ─┬─ first open ─► Onboarding ─► Create Account ─► Security Code ─► Choose Mode ─┬─► Customer Home
        │                                                                              └─► Set Up Your Shop ─► Vendor Dashboard
        └─ returning ──► Sign In ─► home of the last-used mode (Customer Home or Vendor Dashboard)
```

## Requirements

- **AUTH-R1** First launch shows Onboarding, then Create Account. Later launches go to Sign In, or straight to the last-used mode's home if a session exists.
- **AUTH-R2** Sign in accepts email *or* phone plus password. Social sign-in is offered (Google plus one of Apple/GitHub).
- **AUTH-R3** Sign In has no Customer / Vendor choice. It opens the mode used last; an account without a shop always opens Customer Home.
- **AUTH-R4** Every account verifies its phone number with a 6-digit SMS code. The phone number is how vendors reach customers, so it is required.
- **AUTH-R5** When a phone number is verified, any orders vendors already created for that number are attached to the account. This applies to every account, since shop owners can also be customers.
- **AUTH-R6** After verifying, Choose Mode asks where to start: Track my orders (Customer Home) or Run my shop (Set Up Your Shop). The choice is not a lock-in.
- **AUTH-R7** Set Up Your Shop creates a minimal shop (name, category, address; hours and logo optional) and turns on Vendor mode. It asks for nothing the account already has. It is also reachable later from Profile.
- **AUTH-R8** Password reset is by email link. The response never reveals whether an email is registered.
- **AUTH-R9** Sessions persist until sign-out; tokens refresh silently. The last-used mode is remembered per device.

## Data

User: id, full name, email, phone (verified flag), password hash, avatar, last mode [customer, vendor], created at.
Shop: id, owner user id, name, category, address, opening hours, logo. An account is a vendor when it owns (or is staff of) a shop.

## Removed in the single-app redesign

- **Customer Sign Up** and **Vendor Sign Up** were two forms that asked for the same name, email, phone and password. They are now one Create Account form (AUTH-04), and the vendor-only part became Set Up Your Shop (AUTH-07).
- **Role Selection before sign-up** became Choose Mode after verification (AUTH-06): it only decides where you land.
- **The Customer / Vendor toggle on Sign In** is gone; the app remembers the last-used mode.

## Open questions

- Apple or GitHub as the second social provider? (References show both.)
- Is email required, or is phone-only sign-up allowed?
- Should staff invited to a shop (VSHOP-03) land straight in Vendor mode for that shop on first sign-in?

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `AUTH-01` Splash · 🟢 Done

Brand splash shown while the app boots and restores the session.

- PingMe logo with a short intro animation on first open
- Restores a saved session and routes straight to the home of the last-used mode (Customer or Vendor)
- Falls through to Onboarding on first install, Sign In otherwise

**Acceptance:**

- [ ] Splash never shows longer than 2 s on a warm start
- [ ] Animation plays once per install; later launches show a static logo

> Tap the splash to continue. The intro plays on the first open of a browser session; later opens show the static logo (Replay intro restarts it).

### `AUTH-02` Onboarding · 🟢 Done

Four swipeable intro slides that explain PingMe to customers and vendors.

- Slides: Book with Confidence, Grow Your Business, Discover Local Services, Connect with Ease
- Page dots, Next button, Skip on early slides
- Last slide: Get Started plus 'Already have an account? Sign in'

**Acceptance:**

- [ ] Swipe and Next both advance; Skip and Get Started open Create Account
- [ ] Shown only until the user finishes or skips it once

Reference: [1](../../design%20reference/authentication/Screenshot%202026-10-13%20135118.png)

### `AUTH-03` Sign In · 🔵 In design

Returning users sign in once and land back in the mode they used last.

- Email or phone, password with show/hide, Forgot? link
- One Sign In button: no Customer / Vendor toggle, because one account holds both modes
- Line under the button says where you'll land (your orders, or your shop dashboard)
- Social sign-in (Google plus Apple or GitHub; final pair to be decided)
- Footer: Create an account link, app version, Privacy Policy, Terms of Service

**Acceptance:**

- [ ] Wrong credentials show an inline error without clearing the email field
- [ ] Lands on the home of the last-used mode; accounts without a shop always land on Customer Home

> Prototype: any email or phone signs in; the password "wrong" shows the failed sign-in state. You land in the mode last opened in this browser session (Vendor if you were just on a vendor screen).

Reference: [1](../../design%20reference/authentication/Screenshot%202026-10-13%20135010.png) · [2](../../design%20reference/authentication/Screenshot%202026-10-13%20135028.png) · [3](../../design%20reference/authentication/Screenshot%202026-10-13%20135046.png) · [4](../../design%20reference/Customer/Screenshot%202026-10-13%20134125.png) · [5](../../design%20reference/Customer/Screenshot%202026-10-06%20152222.png) · [6](../../design%20reference/Customer/Screenshot%202026-10-06%20152155.png)

### `AUTH-04` Create Account · 🔵 In design

One sign-up form for everyone: the same account follows orders and, later, runs a shop.

- Full name, email, phone number, password, confirm password
- Terms of Service and Privacy Policy checkbox
- Create Account button, social sign-up (Google, Apple)
- Step 1 of 3: account, verify phone, choose where to start

**Acceptance:**

- [ ] Create Account stays disabled until all fields validate and terms are ticked
- [ ] No role is asked here; shop details are only asked if the user picks Run my shop

> Replaces the separate Customer Sign Up and Vendor Sign Up forms, which asked for the same owner details twice.

Reference: [1](../../design%20reference/authentication/Screenshot%202026-10-13%20135038.png)

### `AUTH-05` Security Code · 🟢 Done

Six-digit code sent by SMS to verify the phone number at sign-up or after changing it.

- Masked phone number with 'Wrong number? Edit'
- Six digit boxes with auto-advance and paste support
- Resend countdown, Resend SMS, Call me instead
- Verify Now button; success shows orders shops already made for this number

**Acceptance:**

- [ ] Resend is locked until the countdown ends
- [ ] Code expires after 10 minutes; five wrong tries locks for 15 minutes
- [ ] After sign-up it continues to Choose Mode; after a phone change it returns to Profile

> Prototype: 000000 is treated as a wrong code (five tries, then locked); any other six digits verify and show the success state.

Reference: [1](../../design%20reference/authentication/Screenshot%202026-10-13%20135106.png)

### `AUTH-06` Choose Mode · 🔵 In design

After verifying, new users pick where to start: their orders or their shop. Both stay one tap apart.

- Two cards: Track my orders (Customer mode), Run my shop (Vendor mode)
- Button names the next step: See my orders, or Set up my shop
- 'Set up a shop later' link and a help sheet explaining that one account does both

**Acceptance:**

- [ ] Track my orders opens Customer Home; Run my shop opens Set Up Your Shop
- [ ] Shown once per account; the choice can be changed any time from Profile

> Moved from before sign-up to after it: the role no longer decides which form you fill in, only where you land.

Reference: [1](../../design%20reference/authentication/Screenshot%202026-10-13%20135051.png)

### `AUTH-07` Set Up Your Shop · 🔵 In design

Adds Vendor mode to the account with a minimal shop, from Choose Mode or later from Profile.

- Shop name, service category (Laundry, Tailoring, Repair, Cleaning, HVAC, Other), address
- Opening hours and shop logo (optional, can be done later)
- Vendor Terms checkbox; no owner name, phone or password (the account already has them)
- Success: shop is ready, next steps, Go to my shop

**Acceptance:**

- [ ] Vendor can create orders right after setup; profile can be finished later in the Shop tab
- [ ] Back returns to where it was opened from (Choose Mode or Profile)

### `AUTH-08` Forgot Password · 🟢 Done

User requests a password reset link by email.

- Email address field, Send Reset Link button
- 'Remembered your password? Sign In' link

**Acceptance:**

- [ ] Always shows the same confirmation whether or not the email exists

Reference: [1](../../design%20reference/authentication/Screenshot%202026-10-13%20135100.png)

<!-- screens:end -->
