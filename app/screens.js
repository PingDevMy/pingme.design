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

  // One app, one account, two modes. Modules are grouped by the mode they belong to.
  roles: [
    { id: "start", label: "Get started" },
    { id: "customer", label: "Customer mode" },
    { id: "vendor", label: "Vendor mode" },
    { id: "shared", label: "Both modes" },
  ],

  /*
   * The app's screen flow, drawn as the tree in the left panel and listed in the
   * tracker. A node is a screen ({ id, via, kids }) or a link to a screen in
   * another branch ({ to, via, label }). `via` is what the user taps or what happens to
   * get there. Shared screens (Notifications, Profile, Shop Profile) appear in
   * both modes; opening one from a mode's branch shows that mode's version.
   */
  flow: [
    {
      id: "start",
      label: "Get started",
      hint: "Launch, sign up and sign in",
      kids: [
        {
          id: "AUTH-01",
          kids: [
            { id: "AUTH-02", via: "First open", kids: [{ to: "AUTH-04", via: "Get started" }] },
            {
              id: "AUTH-03", via: "Returning",
              kids: [
                { id: "AUTH-08", via: "Forgot?" },
                { to: "AUTH-04", via: "New here" },
                { to: "CHOME-01", via: "Last used: Customer", label: "Customer Home" },
                { to: "VHOME-01", via: "Last used: Vendor", label: "Vendor Dashboard" },
              ],
            },
          ],
        },
        {
          id: "AUTH-04", via: "Sign up",
          kids: [
            {
              id: "AUTH-05", via: "Verify phone",
              kids: [
                {
                  id: "AUTH-06", via: "Verified",
                  kids: [
                    { to: "CHOME-01", via: "Track my orders", label: "Customer Home" },
                    { id: "AUTH-07", via: "Run my shop", kids: [{ to: "VHOME-01", via: "Shop ready", label: "Vendor Dashboard" }] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "customer",
      mode: "customer",
      label: "Customer mode",
      hint: "Tabs: Home, Scan, Profile",
      kids: [
        {
          id: "CHOME-01", via: "Tab",
          kids: [
            {
              id: "CTRK-01", via: "Drop-off order",
              kids: [
                { id: "SHOP-01", via: "View Shop", kids: [{ id: "SHOP-02", via: "See all" }] },
                { id: "CTRK-04", via: "Completed" },
              ],
            },
            { id: "CTRK-02", via: "On-site service" },
            { id: "CTRK-03", via: "See all history" },
            { id: "NOTI-01", via: "Bell" },
          ],
        },
        { id: "CHOME-02", via: "Tab", kids: [{ to: "CTRK-01", via: "Order claimed" }] },
        {
          id: "ACCT-01", via: "Tab",
          kids: [
            { id: "NOTI-02", via: "Preferences" },
            { id: "ACCT-02", via: "Help" },
            { to: "VHOME-01", via: "Switch to Vendor", label: "Vendor Dashboard" },
            { to: "AUTH-07", via: "No shop yet" },
          ],
        },
      ],
    },
    {
      id: "vendor",
      mode: "vendor",
      label: "Vendor mode",
      hint: "Tabs: Home, Orders, +, Revenue, Shop",
      kids: [
        { id: "VHOME-01", via: "Tab", kids: [{ id: "NOTI-01", via: "Bell" }] },
        {
          id: "VORD-01", via: "Tab",
          kids: [
            {
              id: "VORD-05", via: "Open order",
              kids: [
                { id: "VORD-02", via: "Sheet" },
                { id: "VORD-03", via: "Sheet" },
              ],
            },
            { id: "VORD-06", via: "Scan" },
          ],
        },
        { id: "VORD-04", via: "+ tab" },
        { id: "VREV-01", via: "Tab", kids: [{ id: "VREV-02", via: "See all" }] },
        {
          id: "VSHOP-01", via: "Tab",
          kids: [
            { id: "SHOP-01", via: "Preview", kids: [{ id: "SHOP-02", via: "Manage reviews" }] },
            { id: "VSHOP-02", via: "Settings" },
            { id: "VSHOP-03", via: "Settings" },
            { id: "NOTI-02", via: "Settings" },
            {
              id: "ACCT-01", via: "Account",
              kids: [
                { id: "ACCT-02", via: "Help" },
                { to: "CHOME-01", via: "Switch to Customer", label: "Customer Home" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "web",
      label: "Outside the app",
      hint: "For customers without PingMe installed",
      kids: [{ id: "CTRK-05", via: "SMS link" }],
    },
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
          status: "done",
          summary: "Brand splash shown while the app boots and restores the session.",
          points: [
            "PingMe logo with a short intro animation on first open",
            "Restores a saved session and routes straight to the home of the last-used mode (Customer or Vendor)",
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
          status: "done",
          summary: "Four swipeable intro slides that explain PingMe to customers and vendors.",
          points: [
            "Slides: Book with Confidence, Grow Your Business, Discover Local Services, Connect with Ease",
            "Page dots, Next button, Skip on early slides",
            "Last slide: Get Started plus 'Already have an account? Sign in'",
          ],
          criteria: [
            "Swipe and Next both advance; Skip and Get Started open Create Account",
            "Shown only until the user finishes or skips it once",
          ],
          refs: ["design reference/authentication/Screenshot 2026-10-13 135118.png"],
          html: "screens/auth/auth-02-onboarding.html",
        },
        {
          id: "AUTH-03",
          name: "Sign In",
          status: "design",
          summary: "Returning users sign in once and land back in the mode they used last.",
          points: [
            "Email or phone, password with show/hide, Forgot? link",
            "One Sign In button: no Customer / Vendor toggle, because one account holds both modes",
            "Line under the button says where you'll land (your orders, or your shop dashboard)",
            "Social sign-in (Google plus Apple or GitHub; final pair to be decided)",
            "Footer: Create an account link, app version, Privacy Policy, Terms of Service",
          ],
          criteria: [
            "Wrong credentials show an inline error without clearing the email field",
            "Lands on the home of the last-used mode; accounts without a shop always land on Customer Home",
          ],
          refs: [
            "design reference/authentication/Screenshot 2026-10-13 135010.png",
            "design reference/authentication/Screenshot 2026-10-13 135028.png",
            "design reference/authentication/Screenshot 2026-10-13 135046.png",
            "design reference/Customer/Screenshot 2026-10-13 134125.png",
            "design reference/Customer/Screenshot 2026-10-06 152222.png",
            "design reference/Customer/Screenshot 2026-10-06 152155.png",
          ],
          html: "screens/auth/auth-03-sign-in.html",
          note: "Prototype: any email or phone signs in; the password \"wrong\" shows the failed sign-in state. You land in the mode last opened in this browser session (Vendor if you were just on a vendor screen).",
        },
        {
          id: "AUTH-04",
          name: "Create Account",
          status: "design",
          summary: "One sign-up form for everyone: the same account follows orders and, later, runs a shop.",
          points: [
            "Full name, email, phone number, password, confirm password",
            "Terms of Service and Privacy Policy checkbox",
            "Create Account button, social sign-up (Google, Apple)",
            "Step 1 of 3: account, verify phone, choose where to start",
          ],
          criteria: [
            "Create Account stays disabled until all fields validate and terms are ticked",
            "No role is asked here; shop details are only asked if the user picks Run my shop",
          ],
          refs: ["design reference/authentication/Screenshot 2026-10-13 135038.png"],
          html: "screens/auth/auth-04-create-account.html",
          note: "Replaces the separate Customer Sign Up and Vendor Sign Up forms, which asked for the same owner details twice.",
        },
        {
          id: "AUTH-05",
          name: "Security Code",
          status: "done",
          summary: "Six-digit code sent by SMS to verify the phone number at sign-up or after changing it.",
          points: [
            "Masked phone number with 'Wrong number? Edit'",
            "Six digit boxes with auto-advance and paste support",
            "Resend countdown, Resend SMS, Call me instead",
            "Verify Now button; success shows orders shops already made for this number",
          ],
          criteria: [
            "Resend is locked until the countdown ends",
            "Code expires after 10 minutes; five wrong tries locks for 15 minutes",
            "After sign-up it continues to Choose Mode; after a phone change it returns to Profile",
          ],
          refs: ["design reference/authentication/Screenshot 2026-10-13 135106.png"],
          html: "screens/auth/auth-05-security-code.html",
          note: "Prototype: 000000 is treated as a wrong code (five tries, then locked); any other six digits verify and show the success state.",
        },
        {
          id: "AUTH-06",
          name: "Choose Mode",
          status: "design",
          summary: "After verifying, new users pick where to start: their orders or their shop. Both stay one tap apart.",
          points: [
            "Two cards: Track my orders (Customer mode), Run my shop (Vendor mode)",
            "Button names the next step: See my orders, or Set up my shop",
            "'Set up a shop later' link and a help sheet explaining that one account does both",
          ],
          criteria: [
            "Track my orders opens Customer Home; Run my shop opens Set Up Your Shop",
            "Shown once per account; the choice can be changed any time from Profile",
          ],
          refs: ["design reference/authentication/Screenshot 2026-10-13 135051.png"],
          html: "screens/auth/auth-06-choose-mode.html",
          note: "Moved from before sign-up to after it: the role no longer decides which form you fill in, only where you land.",
        },
        {
          id: "AUTH-07",
          name: "Set Up Your Shop",
          status: "design",
          summary: "Adds Vendor mode to the account with a minimal shop, from Choose Mode or later from Profile.",
          points: [
            "Shop name, service category (Laundry, Tailoring, Repair, Cleaning, HVAC, Other), address",
            "Opening hours and shop logo (optional, can be done later)",
            "Vendor Terms checkbox; no owner name, phone or password (the account already has them)",
            "Success: shop is ready, next steps, Go to my shop",
          ],
          criteria: [
            "Vendor can create orders right after setup; profile can be finished later in the Shop tab",
            "Back returns to where it was opened from (Choose Mode or Profile)",
          ],
          refs: [],
          html: "screens/auth/auth-07-shop-setup.html",
        },
        {
          id: "AUTH-08",
          name: "Forgot Password",
          status: "done",
          summary: "User requests a password reset link by email.",
          points: [
            "Email address field, Send Reset Link button",
            "'Remembered your password? Sign In' link",
          ],
          criteria: [
            "Always shows the same confirmation whether or not the email exists",
          ],
          refs: ["design reference/authentication/Screenshot 2026-10-13 135100.png"],
          html: "screens/auth/auth-08-forgot-password.html",
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
      role: "shared",
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
            "In Vendor mode the owner sees their own shop with edit, Manage All Reviews and Customer Messaging",
          ],
          criteria: [
            "Customer sees the same page without the owner controls",
            "Back returns to the order it was opened from, or to the Shop tab in Vendor mode",
          ],
          refs: ["design reference/Customer/Screenshot 2026-10-13 134211.png"],
          html: "screens/customer/shop-01-profile.html",
          note: "Customer mode shows the shop of the picked order. Open it from the Vendor mode branch (or Preview in the Shop tab) for the owner view. Open / Closed follows the real time of day against opening hours.",
        },
        {
          id: "SHOP-02",
          name: "All Reviews",
          status: "design",
          summary: "Full list of reviews with filters by star rating.",
          points: [
            "Filter chips: All, 5, 4, 3, 2, 1, With photos",
            "Vendor can reply publicly to a review (Vendor mode)",
          ],
          criteria: [],
          refs: [],
          html: "screens/customer/shop-02-reviews.html",
          note: "In Vendor mode unanswered reviews get a public Reply.",
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
            "Customer mode: status changes and shop messages. Vendor mode: customer replies, claimed orders, payments, new reviews",
          ],
          criteria: ["Bell icon badge equals unread count", "Each mode shows only its own pings; back returns to that mode's home"],
          refs: [],
          html: "screens/shared/noti-01-inbox.html",
          note: "Shows the inbox of the mode it was opened from. Customer: a ping opens its order and the rating ping opens Rate & Review. Vendor: a ping opens the order, the payment or the reviews.",
        },
        {
          id: "NOTI-02",
          name: "Notification Preferences",
          status: "design",
          summary: "User chooses which pings arrive by push, SMS or email.",
          points: [
            "Per-event toggles for push, SMS and email, with events for the current mode",
            "Quiet hours",
          ],
          criteria: ["Order-ready pings (customer) and customer replies (vendor) cannot be fully turned off (at least one channel)"],
          refs: [],
          html: "screens/shared/noti-02-preferences.html",
          note: "Customer mode is opened from Profile, Vendor mode from the Shop tab. Try turning off both channels for Ready for pickup.",
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
          status: "design",
          summary: "Vendor landing screen: revenue this month, workload, and the latest orders.",
          points: [
            "Shop name and rating header, with pickup scan and notifications",
            "Monthly revenue with change versus last month",
            "Counters: Active Orders, Ready for Pickup",
            "Recent orders: customer, order number, service, items, status pill, amount, Manage",
            "Raised + button in the tab bar to Create New Order",
            "Rating and sales over the last 7 days (from the ServiceHub sketch)",
            "Bottom nav: Home, Orders, + (new order), Revenue, Shop",
          ],
          criteria: [
            "Counters tap through to Order Management with the matching filter",
          ],
          refs: [
            "design reference/vendor/Screenshot 2026-10-13 134513.png",
            "design reference/vendor/Screenshot 2026-10-13 134527.png",
          ],
          html: "screens/vendor/vhome-01-dashboard.html",
          note: "The redesign merges both sketches: The Iron Press layout (revenue, two counters, recent orders) plus ServiceHub's rating and a 7-day sales chart. Counters and View all open Orders pre-filtered; tap a bar for that day's sales. The raised + in the tab bar creates an order from any tab.",
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
          status: "design",
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
          html: "screens/vendor/vord-01-orders.html",
          note: "Start Work, Mark Ready and Complete move the order one step and update the card in place. Notify opens the Notify Customer sheet. Search is behind the magnifier; changes carry over to the dashboard and order details.",
        },
        {
          id: "VORD-02",
          name: "Update Status Sheet",
          status: "design",
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
          html: "screens/vendor/vord-02-status.html",
          note: "Opens over the current order. The same sheet is used from Order Details (Update Status).",
        },
        {
          id: "VORD-03",
          name: "Notify Customer Sheet",
          status: "design",
          summary: "Send a free-text or template message to the customer without changing status.",
          points: [
            "Templates from Customer Messaging (e.g. 'Running 30 min late')",
            "Channel shown: push if the customer has the app, SMS otherwise",
            "Message preview before sending",
          ],
          notify: ["The message itself"],
          criteria: ["Sent messages appear in the order's activity log"],
          refs: [],
          html: "screens/vendor/vord-03-notify.html",
          note: "Opens over the current order. Pick a quick reply or type; the channel line says Push or SMS. Sent messages land in the activity log. The same sheet is used from the order list and details.",
        },
        {
          id: "VORD-04",
          name: "Create New Order",
          status: "design",
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
          html: "screens/vendor/vord-04-create.html",
          note: "Title and category are required; customer details are optional (the customer can claim by QR). Add photo opens the camera or a file picker. Generate QR shows the new code; Save as Draft notifies nobody.",
        },
        {
          id: "VORD-05",
          name: "Order Details",
          status: "design",
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
          html: "screens/vendor/vord-05-details.html",
          note: "Mark as Picked Up is enabled only when the order is Ready. Try the sample orders from the list: Wash & press (Ready), Silk suit (In Progress), Baju Melayu (Draft).",
        },
        {
          id: "VORD-06",
          name: "Scan Pickup QR",
          status: "design",
          summary: "Vendor scans the customer's QR at the counter to confirm handover.",
          points: [
            "Camera viewfinder, manual code entry",
            "Confirms the order and marks it Picked Up",
          ],
          notify: ["Customer gets an 'Order collected' receipt"],
          criteria: ["Scanning a QR from another shop shows an error"],
          refs: [],
          html: "screens/vendor/vord-06-scan.html",
          note: "Tap the viewfinder to scan the first Ready order's pass. Enter pickup code accepts e.g. PINGME-1198-X99; the link at the bottom shows the other-shop error.",
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
          status: "design",
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
          html: "screens/vendor/vrev-01-revenue.html",
          note: "Range chips change every figure. Hover or tap a bar for its value; Show as table lists the same numbers. Download Report saves a CSV of the selected range.",
        },
        {
          id: "VREV-02",
          name: "Transactions",
          status: "design",
          summary: "Full list of payments with search and filters.",
          points: ["Filter by status and date", "Tap opens the related order"],
          criteria: [],
          refs: [],
          html: "screens/vendor/vrev-02-transactions.html",
          note: "Filter by status and date or search. Tap a payment to open its order.",
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
          status: "design",
          summary: "Vendor edits what customers see on the Shop Profile.",
          points: [
            "Logo, cover, name, category, description",
            "Address with map pin, opening hours per day",
            "Services offered with default prices",
          ],
          criteria: ["Changes show on the public Shop Profile immediately"],
          refs: [],
          html: "screens/vendor/vshop-01-profile.html",
          note: "This is the Shop tab. Edits enable Save; Preview opens the public Shop Profile. Settings links to Customer Messaging, Staff, Notification preferences and Account (where you switch to Customer mode).",
        },
        {
          id: "VSHOP-02",
          name: "Customer Messaging",
          status: "design",
          summary: "Vendor sets the automatic messages sent at each status change, plus quick-reply templates.",
          points: [
            "One message per status (Created, In Progress, Ready, Completed) with placeholders like {customer} and {order}",
            "Toggle SMS fallback for customers without the app",
            "Quick-reply templates used by the Notify sheet",
          ],
          criteria: ["Preview shows the message as the customer will see it"],
          refs: [],
          html: "screens/vendor/vshop-02-messaging.html",
          note: "Pick a status to edit its message; placeholder chips insert at the cursor and the preview fills them in. Quick replies here are the ones offered in the Notify sheet.",
        },
        {
          id: "VSHOP-03",
          name: "Staff & Technicians",
          status: "design",
          summary: "Vendor invites staff and assigns technicians to on-site jobs.",
          points: ["Invite by phone, role (Admin, Staff, Technician), remove"],
          criteria: [],
          refs: [],
          html: "screens/vendor/vshop-03-staff.html",
          note: "Invite by phone with a role. Tap a member to change role or remove them; the owner row is fixed.",
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
            "Mode badge and a switch card: Switch to Vendor, Switch to Customer, or Run a shop? when the account has no shop yet",
            "Customer mode: it's the Profile tab. Vendor mode: opened from the Shop tab as Account, with the vendor tab bar",
            "Links: Order history (Customer mode), Notifications, Notification preferences, Help & Support, Privacy, Terms",
            "Sign out, delete account",
          ],
          criteria: ["Delete account asks for confirmation and a security code", "Switching mode keeps the user signed in and opens that mode's home"],
          refs: [],
          html: "screens/shared/acct-01-profile.html",
          note: "Shows the mode it was opened from. After signing up without a shop, the card offers Run a shop? instead. Delete account asks for confirmation, then a security code (000000 is treated as wrong).",
        },
        {
          id: "ACCT-02",
          name: "Help & Support",
          status: "design",
          summary: "FAQ and a way to contact PingMe support.",
          points: ["Searchable FAQ, including how to switch modes", "Contact form with order picker (your orders in Customer mode, your shop's orders in Vendor mode)"],
          criteria: [],
          refs: [],
          html: "screens/shared/acct-02-help.html",
          note: "Search filters the FAQ. The order picker hides for topics that aren't about an order.",
        },
      ],
    },
  ],
};
