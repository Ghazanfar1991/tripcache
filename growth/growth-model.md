# Growth model

The model is: qualified organic discovery → landing or comparison page → store-intent click → install → activated customer → trial/subscription → retained MRR.

Each stage has an evidence gate. Search Console can measure discovery and landing-page demand. A GA4 web stream is required for store-intent conversion. App analytics measures activation. RevenueCat measures subscriptions, churn, and recurring revenue. The engine must not substitute one stage for another or claim causal lift from a single before/after observation.

Priority score = expected retained-revenue impact × evidence confidence × reversibility ÷ implementation effort. Data repair outranks experimentation when a critical funnel stage is unmeasurable.
