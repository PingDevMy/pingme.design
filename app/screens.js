/*
 * PingMe screen registry: the single source of truth for the prototype site
 * and for the status tracker in docs/requirements/README.md.
 *
 * To mark progress, change a screen's `status`, then run
 *   node scripts/build-tracker.mjs
 * to refresh the tracker table.
 *
 * status:
 *   todo       – no design yet
 *   reference  – a reference/sketch exists (design reference/), redesign pending
 *   design     – being redesigned
 *   done       – final design approved
 *
 * refs:  images under "design reference/" shown in the phone frame.
 * html:  optional path to an HTML screen; when set it replaces the reference image.
 */
window.PINGME = {
  product: {
    name: "PingMe",
    tagline: "Vendors keep clients posted on every service order, from drop-off to done.",
    version: "Prototype v1",
  },

  statuses: {
    todo: { label: "Not started" },
    reference: { label: "Reference only" },
    design: { label: "In design" },
    done: { label: "Done" },
  },

  roles: [
    { id: "start", label: "Get started" },
    { id: "customer", label: "Customer app" },
    { id: "vendor", label: "Vendor app" },
    { id: "shared", label: "Both apps" },
  ],

  modules: [
    {
      id: "AUTH",
      role: "start",
      name: "Onboarding & Auth",
      doc: "docs/requirements/01-onboarding-auth.md",
      screens: [
        {
          id: "AUTH-01",
          name: "Splash",
          status: "design",
          summary: "Brand splash shown while the app boots and restores the session.",
          points: [
            "PingMe logo with a short intro animation on first open",
            "Restores a saved session and routes straight to the right home (Customer or Vendor)",
            "Falls through to Onboarding on first install, Sign In otherwise",
          ],
          criteria: [
            "Splash never shows longer than 2 s on a warm start",
            "Animation plays once per install; later launches show a static logo",
          ],
          refs: [],
          html: "screens/auth/auth-01-splash.html",
          note: "Tap the splash to continue. The intro plays on the first open of a browser session; later opens show the static logo (Replay intro restarts it).",
        },
        {
          id: "AUTH-02",
          name: "Onboarding",
          status: "design",
          summary: "Four swipeable intro slides that explain PingMe to customers and vendors.",
          points: [
            "Slides: Book with Confidence, Grow Your Business, Discover Local Services, Connect with Ease",
            "Page dots, Next button, Skip on early slides",
            "Last slide: Get Started plus 'Already have an account? Sign in'",
          ],
          criteria: [
            "Swipe and Next both advance; Skip jumps to Role Selection",
            "Shown only until the user finishes or skips it once",
          ],
          refs: ["design reference/authentication/Screenshot 2026-10-13 135118.png"],
          html: "screens/auth/auth-02-onboarding.html",
        },
        {
          id: "AUTH-03",
          name: "Role Selection",
          status: "design",
          summary: "New users choose whether they are a Customer or a Vendor before signing up.",
          points: [
            "Two cards: I am a Customer, I am a Vendor, each with a one-line explanation",
            "Continue is disabled until one card is selected",
            "Help icon and 'Already have an account? Sign In'",
          ],
          criteria: [
            "Selected role carries into Sign Up and decides which sign-up form opens",
          ],
          refs: ["design reference/authentication/Screenshot 2026-10-13 135051.png"],
          html: "screens/auth/auth-03-role.html",
        },
        {
          id: "AUTH-04",
          name: "Sign In",
          status: "design",
          summary: "Returning users sign in with email or phone, choosing Customer or Vendor mode.",
          points: [
            "Role toggle: Customer (track and follow my orders) or Vendor (manage shop and orders)",
            "Email or phone, password with show/hide, Forgot? link",
            "Primary button names the role: 'Sign In to Customer' / 'Sign In to Vendor'",
            "Social sign-in (Google plus Apple or GitHub; final pair to be decided)",
            "Footer: Sign Up link, app version, Privacy Policy, Terms of Service",
          ],
          criteria: [
            "Wrong credentials show an inline error without clearing the email field",
            "An account holding both roles lands on the role picked in the toggle",
          ],
          refs: [
            "design reference/authentication/Screenshot 2026-10-13 135010.png",
            "design reference/authentication/Screenshot 2026-10-13 135028.png",
            "design reference/authentication/Screenshot 2026-10-13 135046.png",
            "design reference/Customer/Screenshot 2026-10-13 134125.png",
            "design reference/Customer/Screenshot 2026-10-06 152222.png",
            "design reference/Customer/Screenshot 2026-10-06 152155.png",
          ],
          html: "screens/auth/auth-04-sign-in.html",
          note: "Prototype: any email or phone signs in; the password \"wrong\" shows the failed sign-in state. Social pair shown as Google + Apple until the open question is settled.",
        },
        {
          id: "AUTH-05",
          name: "Customer Sign Up",
          status: "design",
          summary: "Customer creates an account with name, email, phone and password.",
          points: [
            "Full name, email, phone number, password, confirm password",
            "Terms of Service and Privacy Policy checkbox",
            "Create Account button, social sign-up (Google, Apple)",
            "Phone number is verified with a Security Code before first use",
          ],
          criteria: [
            "Create Account stays disabled until all fields validate and terms are ticked",
            "Phone number links any orders a vendor already created for that number",
          ],
          refs: ["design reference/authentication/Screenshot 2026-10-13 135038.png"],
          html: "screens/auth/auth-05-customer-sign-up.html",
        },
        {
          id: "AUTH-06",
          name: "Vendor Sign Up",
          status: "design",
          summary: "Vendor creates an account and a basic shop profile in one flow.",
          points: [
            "Owner name, email, phone, password",
            "Shop name, service category (Laundry, Tailoring, Repair, Cleaning, HVAC, Other), address, opening hours",
            "Shop logo upload (optional, can be done later)",
          ],
          criteria: [
            "Vendor can create orders right after sign-up; profile can be finished later",
          ],
          refs: [],
          html: "screens/auth/auth-06-vendor-sign-up.html",
        },
        {
          id: "AUTH-07",
          name: "Forgot Password",
          status: "design",
          summary: "User requests a password reset link by email.",
          points: [
            "Email address field, Send Reset Link button",
            "'Remembered your password? Sign In' link",
          ],
          criteria: [
            "Always shows the same confirmation whether or not the email exists",
          ],
          refs: ["design reference/authentication/Screenshot 2026-10-13 135100.png"],
          html: "screens/auth/auth-07-forgot-password.html",
        },
        {
          id: "AUTH-08",
          name: "Security Code",
          status: "design",
          summary: "Six-digit code sent by SMS to verify a phone number or a sign-in.",
          points: [
            "Masked phone number with 'Wrong number? Edit'",
            "Six digit boxes with auto-advance and paste support",
            "Resend countdown, Resend SMS, Call me instead",
            "Verify Now button",
          ],
          criteria: [
            "Resend is locked until the countdown ends",
            "Code expires after 10 minutes; five wrong tries locks for 15 minutes",
          ],
          refs: ["design reference/authentication/Screenshot 2026-10-13 135106.png"],
          html: "screens/auth/auth-08-security-code.html",
          note: "Prototype: 000000 is treated as a wrong code (five tries, then locked); any other six digits verify and show the success state.",
        },
      ],
    },

    {
      id: "CHOME",
      role: "customer",
      name: "Customer Home",
      doc: "docs/requirements/02-customer-home.md",
      screens: [
        {
          id: "CHOME-01",
          name: "Home",
          status: "design",
          summary: "Customer landing screen: a greeting, how many orders are active, and each order's progress.",
          points: [
            "Greeting 'Hi {name}' and 'Manage your active service order here'",
            "Active tracking card: count of active orders",
            "Track Your Order Now (opens the most recent active order)",
            "Your Order list with Pending / Completed tabs",
            "Each order card: vendor, service, status pill, step X of Y, % complete, order number, date, Details",
            "Bottom nav: Home, Scan (centre), Profile",
          ],
          notify: [
            "Card updates live when the vendor changes status",
          ],
          criteria: [
            "Empty state explains that orders appear when a vendor adds your phone number",
            "Pull to refresh",
          ],
          refs: ["design reference/Customer/Screenshot 2026-10-13 134146.png"],
          html: "screens/customer/chome-01-home.html",
          note: "Tap a card or Track Your Order Now to open tracking. A few seconds after opening, The Tailor Studio starts an order to show a live update. Pull down to refresh; the link under the list previews the empty state.",
        },
        {
          id: "CHOME-02",
          name: "Scan Order QR",
          status: "design",
          summary: "Customer scans the QR on a vendor's receipt to claim an order into their app.",
          points: [
            "Camera viewfinder with torch toggle",
            "Manual entry fallback for the order code (e.g. PINGME-1204-X99)",
            "Success sheet showing the claimed order",
          ],
          criteria: [
            "An order can only be claimed by one customer account",
          ],
          refs: [],
          html: "screens/customer/chome-02-scan.html",
          note: "Tap the viewfinder to simulate a scan. Under Enter order code, any code like PINGME-1204-X99 works; a code ending in TAKEN shows the already-claimed error.",
        },
      ],
    },

    {
      id: "CTRK",
      role: "customer",
      name: "Order Tracking",
      doc: "docs/requirements/03-customer-order-tracking.md",
      screens: [
        {
          id: "CTRK-01",
          name: "Order Tracking (drop-off)",
          status: "design",
          summary: "Live status of a drop-off order such as laundry or tailoring.",
          points: [
            "Estimated ready time",
            "Vendor card: name, address, call and chat buttons, Navigate, View Shop",
            "Order lifecycle: Order Created, Processing Service, Ready for Pickup, Order Completed with timestamps",
            "Vendor's latest note, e.g. 'You will be notified once ready for pickup'",
            "Pickup QR to show at the counter once status is Ready",
          ],
          notify: [
            "Push on every status change",
            "Push when the order is Ready for Pickup",
          ],
          criteria: [
            "Timeline matches the vendor's status history exactly",
          ],
          refs: ["design reference/Customer/Screenshot 2026-10-13 134157.png"],
          html: "screens/customer/ctrk-01-tracking.html",
          note: "Shows the order picked on Home. The link at the bottom simulates the shop's next update: In Progress, then Ready (pickup QR), then Completed (rating prompt).",
        },
        {
          id: "CTRK-02",
          name: "Service Status (on-site)",
          status: "design",
          summary: "Live status of an on-site service, such as an HVAC repair, with the assigned technician.",
          points: [
            "Stepper: Received, In Progress, QC, Done",
            "Estimated completion countdown",
            "Technician card with rating, chat and call",
            "Recent updates feed with times",
            "Service information: vendor, service type, location",
            "'Need to change?' Manage (reschedule or cancel)",
            "Tabs: Status, History, Support",
          ],
          notify: [
            "Push when a technician is assigned, on the way, and on arrival",
          ],
          criteria: [
            "Cancel is only allowed before In Progress",
          ],
          refs: ["design reference/Customer/Screenshot 2026-10-13 134224.png"],
          html: "screens/customer/ctrk-02-service.html",
          note: "The countdown ticks live. Manage is locked while the technician is working; the link at the bottom shows the visit before work starts, where reschedule and cancel are allowed.",
        },
        {
          id: "CTRK-03",
          name: "Order History",
          status: "design",
          summary: "All past orders, searchable, with re-order and rating.",
          points: [
            "List grouped by month with vendor, service, amount and final status",
            "Search by vendor or order number",
            "Rate the vendor on completed orders that are not yet rated",
          ],
          criteria: [],
          refs: [],
          html: "screens/customer/ctrk-03-history.html",
          note: "Search by shop or order number. Rate opens Rate & Review for that order; tapping a row opens its tracking page.",
        },
        {
          id: "CTRK-04",
          name: "Rate & Review",
          status: "design",
          summary: "Customer rates a completed order and leaves feedback for the vendor.",
          points: [
            "Star rating, optional text, optional photo",
            "Prompted once after the order is completed",
          ],
          criteria: ["One review per order; editable for 7 days"],
          refs: [],
          html: "screens/customer/ctrk-04-rate.html",
          note: "Opens for the picked completed order (PingClean Express by default). An order already rated opens in edit mode.",
        },
        {
          id: "CTRK-05",
          name: "Public Tracking Link (web)",
          status: "design",
          summary: "Web page the SMS link opens, so customers without the app can still follow an order.",
          points: [
            "Order number, vendor, current status and timeline",
            "Banner inviting the customer to install PingMe",
          ],
          criteria: [
            "Link is unguessable and stops working 30 days after completion",
          ],
          refs: [],
          html: "screens/customer/ctrk-05-public-link.html",
          note: "Web page, shown with mobile browser chrome. The link at the bottom shows the expired-link state.",
        },
      ],
    },

    {
      id: "SHOP",
      role: "customer",
      name: "Shop Profile",
      doc: "docs/requirements/04-shop-profile.md",
      screens: [
        {
          id: "SHOP-01",
          name: "Shop Profile",
          status: "design",
          summary: "Public page for a vendor: who they are, where they are, and what customers say.",
          points: [
            "Logo, shop name, category, Open now / Closed badge",
            "Address and opening hours",
            "Social proof: average rating, review count, 5-to-1 star breakdown",
            "Recent feedback with name, rating, text, time and Helpful",
            "Owner view adds edit, Manage All Reviews and Customer Messaging",
          ],
          criteria: [
            "Customer sees the same page without the owner controls",
          ],
          refs: ["design reference/Customer/Screenshot 2026-10-13 134211.png"],
          html: "screens/customer/shop-01-profile.html",
          note: "Shows the shop of the picked order. Open / Closed follows the real time of day against opening hours. The link at the bottom shows the owner view.",
        },
        {
          id: "SHOP-02",
          name: "All Reviews",
          status: "design",
          summary: "Full list of reviews with filters by star rating.",
          points: [
            "Filter chips: All, 5, 4, 3, 2, 1, With photos",
            "Vendor can reply publicly to a review (owner view)",
          ],
          criteria: [],
          refs: [],
          html: "screens/customer/shop-02-reviews.html",
          note: "The link at the bottom shows the owner view, where unanswered reviews get a public Reply.",
        },
      ],
    },

    {
      id: "NOTI",
      role: "shared",
      name: "Notifications",
      doc: "docs/requirements/05-notifications.md",
      screens: [
        {
          id: "NOTI-01",
          name: "Notification Inbox",
          status: "design",
          summary: "Every ping a user has received, newest first, with unread markers.",
          points: [
            "Grouped Today / Earlier, unread dot, mark all as read",
            "Tapping opens the related order",
            "Customer: status changes and vendor messages. Vendor: new reviews, claimed orders, customer replies",
          ],
          criteria: ["Bell icon badge equals unread count"],
          refs: [],
          html: "screens/shared/noti-01-inbox.html",
          note: "Customer view. Tapping a ping opens its order; the rating ping opens Rate & Review. The unread count matches the bell badge on Home.",
        },
        {
          id: "NOTI-02",
          name: "Notification Preferences",
          status: "design",
          summary: "User chooses which pings arrive by push, SMS or email.",
          points: [
            "Per-event toggles for push, SMS and email",
            "Quiet hours",
          ],
          criteria: ["Order-ready pings cannot be fully turned off (at least one channel)"],
          refs: [],
          html: "screens/shared/noti-02-preferences.html",
          note: "Customer view. Try turning off both channels for Ready for pickup.",
        },
      ],
    },

    {
      id: "VHOME",
      role: "vendor",
      name: "Vendor Dashboard",
      doc: "docs/requirements/06-vendor-dashboard.md",
      screens: [
        {
          id: "VHOME-01",
          name: "Dashboard",
          status: "reference",
          summary: "Vendor landing screen: revenue this month, workload, and the latest orders.",
          points: [
            "Shop name header with settings",
            "Monthly revenue with change versus last month",
            "Counters: Active Orders, Ready for Pickup",
            "Recent orders: customer, order number, service, items, status pill, amount, Manage",
            "Floating + button to Create New Order",
            "Bottom nav: Dash, Orders, Shop",
          ],
          criteria: [
            "Counters tap through to Order Management with the matching filter",
          ],
          refs: [
            "design reference/vendor/Screenshot 2026-10-13 134513.png",
            "design reference/vendor/Screenshot 2026-10-13 134527.png",
          ],
          note: "Two dashboard sketches exist (The Iron Press and ServiceHub). The redesign should merge them into one.",
        },
      ],
    },

    {
      id: "VORD",
      role: "vendor",
      name: "Order Management",
      doc: "docs/requirements/07-vendor-orders.md",
      screens: [
        {
          id: "VORD-01",
          name: "Order List",
          status: "reference",
          summary: "Every order the vendor is handling, filtered by status, with one-tap actions.",
          points: [
            "Filter chips: All, Created, In Progress, Ready, Completed",
            "Total count and sort by date",
            "Order card: number, item, category tag, customer, status pill",
            "Notify button (send a message to the customer)",
            "Next-step button that changes with status: Start Work, Mark Ready, Complete",
            "Search and floating + Create Order",
          ],
          notify: [
            "Start Work, Mark Ready and Complete each send the customer a push or SMS",
          ],
          criteria: [
            "The next-step button moves the order forward one step and updates the card in place",
          ],
          refs: ["design reference/vendor/Screenshot 2026-10-13 134456.png"],
        },
        {
          id: "VORD-02",
          name: "Update Status Sheet",
          status: "reference",
          summary: "Bottom sheet to set any status and attach a note the customer will see.",
          points: [
            "Status options: Received, In Progress, Ready to Collect, each with a short explanation",
            "Optional status note, e.g. 'Technician started the diagnostic process'",
            "Update Status and Cancel",
          ],
          notify: [
            "Customer gets the new status and the note",
          ],
          criteria: [],
          refs: ["design reference/vendor/Screenshot 2026-10-13 134505.png"],
        },
        {
          id: "VORD-03",
          name: "Notify Customer Sheet",
          status: "todo",
          summary: "Send a free-text or template message to the customer without changing status.",
          points: [
            "Templates from Customer Messaging (e.g. 'Running 30 min late')",
            "Channel shown: push if the customer has the app, SMS otherwise",
            "Message preview before sending",
          ],
          notify: ["The message itself"],
          criteria: ["Sent messages appear in the order's activity log"],
          refs: [],
        },
        {
          id: "VORD-04",
          name: "Create New Order",
          status: "reference",
          summary: "Vendor logs a new job, captures proof photos and generates the order QR.",
          points: [
            "Order title",
            "Customer details: full name and phone number",
            "Service category: Laundry, Tailoring, Repair (mandatory)",
            "Quantity and unit price",
            "Upload item proof: photo of the item's condition at drop-off",
            "Generate Order QR, Save as Draft",
          ],
          notify: [
            "Customer gets an SMS tracking link when a phone number is given",
          ],
          criteria: [
            "Generating creates a unique order number and QR code",
            "Drafts do not notify the customer",
          ],
          refs: ["design reference/vendor/Screenshot 2026-10-13 134432.png"],
        },
        {
          id: "VORD-05",
          name: "Order Details",
          status: "reference",
          summary: "Everything about one order: customer, payment, pickup QR, proof photo and activity.",
          points: [
            "Header card: service, category, status, customer, items and weight, paid amount, date",
            "Pickup QR code and code text, Share Link",
            "Mark as Picked Up",
            "Service proof image with capture time",
            "Activity log of every status change and message",
          ],
          criteria: [
            "Mark as Picked Up is only available when status is Ready",
          ],
          refs: ["design reference/vendor/Screenshot 2026-10-13 134450.png"],
        },
        {
          id: "VORD-06",
          name: "Scan Pickup QR",
          status: "todo",
          summary: "Vendor scans the customer's QR at the counter to confirm handover.",
          points: [
            "Camera viewfinder, manual code entry",
            "Confirms the order and marks it Picked Up",
          ],
          notify: ["Customer gets an 'Order collected' receipt"],
          criteria: ["Scanning a QR from another shop shows an error"],
          refs: [],
        },
      ],
    },

    {
      id: "VREV",
      role: "vendor",
      name: "Revenue & Analytics",
      doc: "docs/requirements/08-vendor-revenue.md",
      screens: [
        {
          id: "VREV-01",
          name: "Revenue Analytics",
          status: "reference",
          summary: "How much the shop earned and from which orders.",
          points: [
            "Range chips: Today, 7D, 30D, All Time",
            "Download Report",
            "Total revenue with change versus previous period",
            "Daily revenue bar chart",
            "Tiles: Net Earnings, Total Orders, Avg. Value, Fees & Taxes",
            "Recent transactions with status (Settled, Processing) and See All",
          ],
          criteria: [
            "Report downloads as CSV for the selected range",
          ],
          refs: ["design reference/vendor/Screenshot 2026-10-13 134521.png"],
        },
        {
          id: "VREV-02",
          name: "Transactions",
          status: "todo",
          summary: "Full list of payments with search and filters.",
          points: ["Filter by status and date", "Tap opens the related order"],
          criteria: [],
          refs: [],
        },
      ],
    },

    {
      id: "VSHOP",
      role: "vendor",
      name: "Shop Settings",
      doc: "docs/requirements/09-vendor-shop-settings.md",
      screens: [
        {
          id: "VSHOP-01",
          name: "Edit Shop Profile",
          status: "todo",
          summary: "Vendor edits what customers see on the Shop Profile.",
          points: [
            "Logo, cover, name, category, description",
            "Address with map pin, opening hours per day",
            "Services offered with default prices",
          ],
          criteria: ["Changes show on the public Shop Profile immediately"],
          refs: [],
        },
        {
          id: "VSHOP-02",
          name: "Customer Messaging",
          status: "todo",
          summary: "Vendor sets the automatic messages sent at each status change, plus quick-reply templates.",
          points: [
            "One message per status (Created, In Progress, Ready, Completed) with placeholders like {customer} and {order}",
            "Toggle SMS fallback for customers without the app",
            "Quick-reply templates used by the Notify sheet",
          ],
          criteria: ["Preview shows the message as the customer will see it"],
          refs: [],
        },
        {
          id: "VSHOP-03",
          name: "Staff & Technicians",
          status: "todo",
          summary: "Vendor invites staff and assigns technicians to on-site jobs.",
          points: ["Invite by phone, role (Admin, Staff, Technician), remove"],
          criteria: [],
          refs: [],
        },
      ],
    },

    {
      id: "ACCT",
      role: "shared",
      name: "Account",
      doc: "docs/requirements/10-account.md",
      screens: [
        {
          id: "ACCT-01",
          name: "Profile",
          status: "design",
          summary: "User's own details and entry point to settings.",
          points: [
            "Photo, name, phone, email, edit",
            "Switch to Vendor / Customer when the account has both roles",
            "Links: Notification preferences, Help & Support, Privacy, Terms",
            "Sign out, delete account",
          ],
          criteria: ["Delete account asks for confirmation and a security code"],
          refs: [],
          html: "screens/shared/acct-01-profile.html",
          note: "Customer view. Delete account asks for confirmation, then a security code (000000 is treated as wrong).",
        },
        {
          id: "ACCT-02",
          name: "Help & Support",
          status: "design",
          summary: "FAQ and a way to contact PingMe support.",
          points: ["Searchable FAQ", "Contact form with order picker"],
          criteria: [],
          refs: [],
          html: "screens/shared/acct-02-help.html",
          note: "Search filters the FAQ. The order picker hides for topics that aren't about an order.",
        },
      ],
    },
  ],
};
