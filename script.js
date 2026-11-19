(function () {
  "use strict";

  const SAVE_KEY = "barya_to_bilyon_save_v1";
  const DAY_DURATION_MS = 15000;
  const TARGET_TRILLION = 1000000000000;
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const LIFESTYLES = [
    {
      id: "bedspace",
      name: "Shared Bedspace",
      rent: 3500,
      food: 4200,
      utilities: 1000,
      load: 300,
      energyRegen: 38,
      healthRegen: 4,
      happyDelta: 0
    },
    {
      id: "studio",
      name: "Solo Studio Room",
      rent: 8500,
      food: 6500,
      utilities: 2200,
      load: 600,
      energyRegen: 46,
      healthRegen: 6,
      happyDelta: 1
    },
    {
      id: "condo",
      name: "1BR Makati Condo",
      rent: 22000,
      food: 14000,
      utilities: 4500,
      load: 1200,
      energyRegen: 56,
      healthRegen: 9,
      happyDelta: 2
    },
    {
      id: "penthouse",
      name: "BGC Executive Residence",
      rent: 85000,
      food: 45000,
      utilities: 15000,
      load: 3000,
      energyRegen: 70,
      healthRegen: 14,
      happyDelta: 4
    }
  ];

  const COURSES = [
    {
      id: "comm",
      name: "Communication Training",
      tuition: 3500,
      sessions: 5,
      energyCost: 18,
      desc: "English fluency, customer care & call-handling fundamentals."
    },
    {
      id: "bookkeeping",
      name: "Bookkeeping Course",
      tuition: 8500,
      sessions: 8,
      energyCost: 20,
      desc: "TESDA-aligned accounting, payroll & BIR tax filing basics."
    },
    {
      id: "tech",
      name: "Tech Degree",
      tuition: 45000,
      sessions: 15,
      energyCost: 22,
      desc: "Full-stack software engineering, cloud & systems design."
    },
    {
      id: "bizmgmt",
      name: "Business Management",
      tuition: 65000,
      sessions: 18,
      energyCost: 22,
      desc: "Operations leadership, supply chain & P&L management."
    },
    {
      id: "mba",
      name: "MBA",
      tuition: 180000,
      sessions: 24,
      energyCost: 24,
      desc: "Executive strategy, corporate finance & M&A leadership."
    }
  ];

  const JOBS = [
    {
      id: "crew",
      title: "Service Crew / Cashier",
      salary: 16500,
      reqExp: 0,
      reqCourse: null,
      shiftPay: 180,
      energyCost: 24,
      desc: "Frontline food & retail operations. Builds foundational discipline."
    },
    {
      id: "bpo",
      title: "BPO Call Center Agent",
      salary: 24000,
      reqExp: 3,
      reqCourse: "comm",
      shiftPay: 260,
      energyCost: 26,
      desc: "International voice & chat support with night-diff allowance."
    },
    {
      id: "admin",
      title: "Administrative / Accounting Staff",
      salary: 32000,
      reqExp: 12,
      reqCourse: "bookkeeping",
      shiftPay: 340,
      energyCost: 24,
      desc: "Handles corporate payables, invoicing & BIR compliance."
    },
    {
      id: "supervisor",
      title: "Store Supervisor / Team Lead",
      salary: 48000,
      reqExp: 24,
      reqCourse: null,
      shiftPay: 480,
      energyCost: 27,
      desc: "Leads branch schedules, KPIs & floor customer satisfaction."
    },
    {
      id: "it",
      title: "Senior Software / IT Specialist",
      salary: 85000,
      reqExp: 36,
      reqCourse: "tech",
      shiftPay: 850,
      energyCost: 25,
      desc: "Architects scalable enterprise platforms & cloud services."
    },
    {
      id: "ops",
      title: "Operations Manager",
      salary: 140000,
      reqExp: 60,
      reqCourse: "bizmgmt",
      shiftPay: 1400,
      energyCost: 28,
      desc: "Oversees multi-branch logistics, margins & regional targets."
    },
    {
      id: "vp",
      title: "Corporate VP / Executive Director",
      salary: 280000,
      reqExp: 96,
      reqCourse: "mba",
      shiftPay: 2600,
      energyCost: 30,
      desc: "Directs company-wide strategy, board reporting & expansion."
    }
  ];

  const BUSINESS_TYPES = [
    {
      id: "laundry",
      name: "Neighborhood Laundry & Water Refilling Station",
      capital: 180000,
      baseRevenue: 74000,
      fixedOverhead: 23000,
      restockCost: 900,
      desc: "Commercial washers & purified water system serving dense residential blocks."
    },
    {
      id: "coffee",
      name: "Specialty Coffee Shop & Bakery",
      capital: 650000,
      baseRevenue: 225000,
      fixedOverhead: 74000,
      restockCost: 2800,
      desc: "High-margin espresso bar and fresh-baked pastries near offices."
    },
    {
      id: "cstore",
      name: "24/7 Convenience Store Franchise",
      capital: 1800000,
      baseRevenue: 540000,
      fixedOverhead: 195000,
      restockCost: 7500,
      desc: "Round-the-clock retail franchise with bills payment & hot meals."
    },
    {
      id: "gym",
      name: "Modern Fitness Gym & Wellness Hub",
      capital: 4500000,
      baseRevenue: 1220000,
      fixedOverhead: 430000,
      restockCost: 14000,
      desc: "Recurring monthly memberships, personal training & recovery lounge."
    },
    {
      id: "logistics",
      name: "Logistics & Provincial Trucking Fleet",
      capital: 15000000,
      baseRevenue: 3900000,
      fixedOverhead: 1480000,
      restockCost: 45000,
      desc: "B2B cold-chain and provincial freight contracts across Luzon & Visayas."
    },
    {
      id: "bpo_firm",
      name: "BPO & Software Outsourcing Firm",
      capital: 65000000,
      baseRevenue: 16800000,
      fixedOverhead: 6300000,
      restockCost: 160000,
      desc: "Multi-seat global outsourcing & software delivery center in Metro Manila."
    },
    {
      id: "mall",
      name: "Regional Shopping Mall & Commercial Complex",
      capital: 450000000,
      baseRevenue: 108000000,
      fixedOverhead: 39000000,
      restockCost: 950000,
      desc: "Anchor retail mall collecting steady tenant leases & foot-traffic revenue."
    },
    {
      id: "telco",
      name: "National Telecommunications & Energy Corp",
      capital: 25000000000,
      baseRevenue: 5600000000,
      fixedOverhead: 2050000000,
      restockCost: 42000000,
      desc: "Nationwide fiber broadband, 5G towers & renewable power generation."
    }
  ];

  const STAFF_ROLES = [
    { key: "cashier", label: "Cashier / Staff", marketSalary: 17500, minSal: 16000, maxSal: 23000, benefit: "+15% customer throughput" },
    { key: "comanager", label: "Co-Manager", marketSalary: 28000, minSal: 24000, maxSal: 36000, benefit: "-45% daily wear & morale buffer" },
    { key: "manager", label: "Store Manager", marketSalary: 42000, minSal: 35000, maxSal: 55000, benefit: "Automates daily inventory restocking" },
    { key: "guard", label: "Security Guard", marketSalary: 19500, minSal: 17000, maxSal: 25000, benefit: "Prevents shrinkage (+5% revenue)" },
    { key: "accountant", label: "Accountant", marketSalary: 46000, minSal: 38000, maxSal: 65000, benefit: "+8% net margin optimization" }
  ];

  const FILIPINO_FIRST_NAMES = [
    "Mark Anthony", "Jessa Mae", "Carlo", "Rhea", "Paolo", "Kristine", "Jerome", "Maricar",
    "Rafael", "Lovely", "Angelo", "Camille", "Bryan", "Clarisse", "Dennis", "Trisha",
    "Vincent", "Hannah", "Kevin", "Nicole", "Gabriel", "Bianca", "Miguel", "Patricia"
  ];
  const FILIPINO_LAST_NAMES = [
    "Santos", "Reyes", "Cruz", "Bautista", "Ocampo", "Garcia", "Mendoza", "Torres",
    "Villanueva", "Ramos", "Navarro", "Aquino", "Pascual", "Dela Cruz", "Castro", "Rivera",
    "Salazar", "Castillo", "Morales", "Flores", "Soriano", "Perez"
  ];

  const PROPERTIES = [
    {
      id: "studio_condo",
      name: "Studio Condo in Metro Manila",
      price: 3500000,
      monthlyRent: 22000,
      appreciationAnnual: 0.045,
      location: "Mandaluyong / Ortigas",
      desc: "High-demand urban residential unit near central business districts."
    },
    {
      id: "qc_townhouse",
      name: "Modern Townhouse in Quezon City",
      price: 9200000,
      monthlyRent: 56000,
      appreciationAnnual: 0.05,
      location: "New Manila, QC",
      desc: "Three-story family residence leased to corporate executives."
    },
    {
      id: "warehouse",
      name: "Commercial Warehouse",
      price: 28000000,
      monthlyRent: 195000,
      appreciationAnnual: 0.055,
      location: "Calamba, Laguna",
      desc: "Industrial logistics facility along SLEX serving e-commerce hubs."
    },
    {
      id: "resort",
      name: "Beachfront Resort in Cebu / Palawan",
      price: 350000000,
      monthlyRent: 2850000,
      appreciationAnnual: 0.065,
      location: "El Nido / Mactan",
      desc: "Luxury eco-resort capturing year-round international tourism."
    },
    {
      id: "makati_floor",
      name: "Makati Ayala Corporate Floor",
      price: 2400000000,
      monthlyRent: 20500000,
      appreciationAnnual: 0.065,
      location: "Ayala Ave, Makati",
      desc: "PEZA-accredited Grade A office floor leased to multinational banks."
    },
    {
      id: "bgc_tower",
      name: "BGC Office Skyscraper",
      price: 12000000000,
      monthlyRent: 105000000,
      appreciationAnnual: 0.07,
      location: "Bonifacio Global City",
      desc: "Flagship 48-story commercial tower anchoring Fortune 500 headquarters."
    },
    {
      id: "port_energy",
      name: "Archipelago Logistics & Clean Energy Grid",
      price: 120000000000,
      monthlyRent: 1120000000,
      appreciationAnnual: 0.075,
      location: "Subic · Batangas · Cebu",
      desc: "Deep-water container terminals paired with utility-scale solar farms."
    },
    {
      id: "sovereign_island",
      name: "Private Island & Sovereign Infrastructure Holdings",
      price: 1000000000000,
      monthlyRent: 9800000000,
      appreciationAnnual: 0.08,
      location: "Philippine Archipelago",
      desc: "Crown-jewel ₱1 Trillion private island estate & national infrastructure stake."
    }
  ];

  const RANDOM_EVENTS = [
    {
      id: "typhoon_delay",
      title: "Typhoon Supply Chain Delay",
      body: "A strong tropical storm disrupted provincial highway deliveries. Suppliers warn of a 4-day stock delay unless you arrange priority logistics.",
      optionA: {
        label: "Pay Priority Courier",
        hint: "-₱4,500 · +5 Reputation · Keep operations smooth",
        apply: function (s) {
          s.cash -= 4500;
          s.reputation += 5;
          s.businesses.forEach(function (b) { b.condition = Math.min(100, b.condition + 6); });
          return { msg: "Priority courier kept shelves stocked (+5 Rep).", delta: -4500 };
        }
      },
      optionB: {
        label: "Wait Out the Weather",
        hint: "₱0 · Business Condition -12% · Slight sales dip",
        apply: function (s) {
          s.businesses.forEach(function (b) { b.condition = Math.max(15, b.condition - 12); });
          s.happiness = clamp(s.happiness - 3, 0, 100);
          return { msg: "Waited for roads to clear. Business condition dipped.", delta: 0 };
        }
      }
    },
    {
      id: "meralco_hike",
      title: "Meralco Electricity Rate Hike",
      body: "Monthly power generation charges spiked by 14% this billing cycle. Upgrading to inverter equipment can cushion future bills.",
      optionA: {
        label: "Install Inverter / LED Upgrade",
        hint: "-₱12,000 · +4 Happiness · +8% Business Awareness",
        apply: function (s) {
          s.cash -= 12000;
          s.happiness = clamp(s.happiness + 4, 0, 100);
          s.reputation += 4;
          s.businesses.forEach(function (b) { b.awareness = Math.min(100, b.awareness + 8); });
          return { msg: "Upgraded to energy-efficient units (+4 Rep).", delta: -12000 };
        }
      },
      optionB: {
        label: "Absorb Rate Spike",
        hint: "-₱3,200 surcharge · -4 Energy",
        apply: function (s) {
          s.cash -= 3200;
          s.energy = clamp(s.energy - 4, 0, 100);
          return { msg: "Paid higher utility surcharge this month.", delta: -3200 };
        }
      }
    },
    {
      id: "bir_audit",
      title: "BIR Tax Audit & Compliance Check",
      body: "Bureau of Internal Revenue officers scheduled a routine receipt and ledger verification check.",
      optionA: {
        label: "Hire External CPA Review",
        hint: "-₱8,500 (Free if you employ an Accountant) · +8 Reputation",
        apply: function (s) {
          const hasAcct = s.businesses.some(function (b) { return b.staff && b.staff.accountant; });
          const fee = hasAcct ? 0 : 8500;
          s.cash -= fee;
          s.reputation += 8;
          return {
            msg: hasAcct ? "Your Accountant cleared the BIR audit with zero fees (+8 Rep)." : "CPA cleared your books cleanly (+8 Rep).",
            delta: -fee
          };
        }
      },
      optionB: {
        label: "File Self-Audit & Spend Time",
        hint: "-22 Energy · Penalty risk if unorganized",
        apply: function (s) {
          s.energy = clamp(s.energy - 22, 0, 100);
          const penalty = s.businesses.length > 0 && Math.random() < 0.45 ? 6000 : 0;
          s.cash -= penalty;
          return {
            msg: penalty > 0 ? "Minor receipt discrepancy cost ₱6,000 in penalties." : "Self-audit passed after a long day of paperwork.",
            delta: -penalty
          };
        }
      }
    },
    {
      id: "viral_review",
      title: "Viral Social Media Review Boost",
      body: "A local food & lifestyle vlogger praised your work ethic and customer service, drawing massive online attention.",
      optionA: {
        label: "Launch Welcome Promo",
        hint: "-₱3,000 · +14 Reputation · +18% Business Awareness",
        apply: function (s) {
          s.cash -= 3000;
          s.reputation += 14;
          s.happiness = clamp(s.happiness + 8, 0, 100);
          s.businesses.forEach(function (b) { b.awareness = Math.min(100, b.awareness + 18); });
          return { msg: "Viral promo boosted awareness and +14 Reputation!", delta: -3000 };
        }
      },
      optionB: {
        label: "Maintain Steady Quality",
        hint: "+₱5,500 sales surge · +6 Reputation",
        apply: function (s) {
          s.cash += 5500;
          s.reputation += 6;
          s.happiness = clamp(s.happiness + 5, 0, 100);
          return { msg: "Steady word-of-mouth brought ₱5,500 in extra sales.", delta: 5500 };
        }
      }
    },
    {
      id: "poached_manager",
      title: "Key Manager Poached by Competitor",
      body: "A rival chain offered your top team lead a higher compensation package to jump ship next week.",
      optionA: {
        label: "Offer Retention Bonus",
        hint: "-₱10,000 · +15 Staff Morale · +5 Reputation",
        apply: function (s) {
          s.cash -= 10000;
          s.reputation += 5;
          s.businesses.forEach(function (b) {
            STAFF_ROLES.forEach(function (r) {
              if (b.staff[r.key]) {
                b.staff[r.key].morale = clamp(b.staff[r.key].morale + 15, 0, 100);
              }
            });
          });
          return { msg: "Team loyalty strengthened (+15 Staff Morale).", delta: -10000 };
        }
      },
      optionB: {
        label: "Wish Them Well & Restructure",
        hint: "₱0 · -10 Staff Morale · -12 Energy handling handover",
        apply: function (s) {
          s.energy = clamp(s.energy - 12, 0, 100);
          s.businesses.forEach(function (b) {
            STAFF_ROLES.forEach(function (r) {
              if (b.staff[r.key]) {
                b.staff[r.key].morale = clamp(b.staff[r.key].morale - 10, 0, 100);
              }
            });
          });
          return { msg: "Handled staff transition without extra spend.", delta: 0 };
        }
      }
    },
    {
      id: "equipment_breakdown",
      title: "Critical Equipment Breakdown",
      body: "Your main commercial compressor/POS server failed mid-shift during peak customer hours.",
      optionA: {
        label: "Authorized Technician Repair",
        hint: "-₱7,500 · Restores +20% Business Condition",
        apply: function (s) {
          s.cash -= 7500;
          s.businesses.forEach(function (b) { b.condition = Math.min(100, b.condition + 20); });
          return { msg: "Equipment restored to peak factory condition.", delta: -7500 };
        }
      },
      optionB: {
        label: "DIY Quick Fix",
        hint: "-₱1,200 · -18 Energy · Condition -8%",
        apply: function (s) {
          s.cash -= 1200;
          s.energy = clamp(s.energy - 18, 0, 100);
          s.businesses.forEach(function (b) { b.condition = Math.max(15, b.condition - 8); });
          return { msg: "Temporary repair kept things running for now.", delta: -1200 };
        }
      }
    }
  ];

  const SoundEngine = {
    ctx: null,
    init: function () {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(function () {});
      }
    },
    playClick: function () {
      if (state.settings.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.045);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    },
    playCash: function () {
      if (state.settings.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [880, 1318.5].forEach(function (freq, idx) {
        const osc = SoundEngine.ctx.createOscillator();
        const gain = SoundEngine.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.065);
        gain.gain.setValueAtTime(0.07, now + idx * 0.065);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.065 + 0.16);
        osc.connect(gain);
        gain.connect(SoundEngine.ctx.destination);
        osc.start(now + idx * 0.065);
        osc.stop(now + idx * 0.065 + 0.17);
      });
    },
    playAlert: function () {
      if (state.settings.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [587.33, 783.99].forEach(function (freq, idx) {
        const osc = SoundEngine.ctx.createOscillator();
        const gain = SoundEngine.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.06, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.2);
        osc.connect(gain);
        gain.connect(SoundEngine.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.21);
      });
    },
    playError: function () {
      if (state.settings.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(170, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.14);
      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  };

  function createDefaultState() {
    return {
      day: 1,
      month: 1,
      year: 1,
      age: 18,
      totalDays: 1,
      cash: 2500,
      savings: 0,
      health: 100,
      energy: 100,
      happiness: 80,
      reputation: 0,
      lifestyleId: "bedspace",
      jobId: null,
      experienceMonths: 0,
      shiftsThisMonth: 0,
      workedToday: false,
      jobWarnings: 0,
      completedCourses: [],
      courseProgress: {},
      businesses: [],
      properties: [],
      netWorthHistory: [{ label: "Y1 M1", value: 2500 }],
      lastMonthLedger: null,
      activityLog: [
        { date: "Y1 M1 D1", text: "Moved into a shared bedspace in Manila with ₱2,500." }
      ],
      settings: {
        theme: "dark",
        muted: false,
        clockRunning: true,
        devUnlocked: false
      },
      lastEventDay: 0
    };
  }

  let state = loadState();
  let activeTab = "home";
  let modalOpen = false;
  let activeModalKind = null;
  let activeBusinessUid = null;
  let activeHireSlot = null;
  let hireCandidates = [];
  let activeEventObj = null;
  let devTapCount = 0;
  let toastTimer = null;

  let displayedCash = state.cash;
  let displayedNetWorth = calcNetWorth(state);
  let animFrameId = null;

  let dayElapsedMs = 0;
  let lastTickTs = performance.now();

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function formatPeso(amount) {
    const rounded = Math.round(Number(amount) || 0);
    if (rounded < 0) {
      return "-₱" + Math.abs(rounded).toLocaleString("en-US");
    }
    return "₱" + rounded.toLocaleString("en-US");
  }

  function formatDateShort(s) {
    const mName = MONTHS[(s.month - 1) % 12];
    return mName + " " + s.day + ", Y" + s.year;
  }

  function getLifestyle(id) {
    return LIFESTYLES.find(function (l) { return l.id === id; }) || LIFESTYLES[0];
  }

  function getJob(id) {
    return JOBS.find(function (j) { return j.id === id; }) || null;
  }

  function getCourse(id) {
    return COURSES.find(function (c) { return c.id === id; }) || null;
  }

  function getBizType(id) {
    return BUSINESS_TYPES.find(function (b) { return b.id === id; }) || BUSINESS_TYPES[0];
  }

  function getPropDef(id) {
    return PROPERTIES.find(function (p) { return p.id === id; }) || PROPERTIES[0];
  }

  function getBizValue(biz) {
    const def = getBizType(biz.typeId);
    const levelBonus = 1 + (biz.level - 1) * 0.4;
    const maturityBonus = Math.min(biz.monthsOpen, 12) * 0.015;
    return Math.round(def.capital * (0.85 * levelBonus + maturityBonus));
  }

  function calcNetWorth(s) {
    let total = (s.cash || 0) + (s.savings || 0);
    (s.businesses || []).forEach(function (b) {
      total += getBizValue(b);
    });
    (s.properties || []).forEach(function (p) {
      total += p.currentValue || 0;
    });
    return Math.round(total);
  }

  function calcMonthlyBizMetrics(biz) {
    const def = getBizType(biz.typeId);
    let rampFactor = 1.05;
    if (biz.monthsOpen === 0) rampFactor = 0.56;
    else if (biz.monthsOpen === 1) rampFactor = 0.66;
    else if (biz.monthsOpen === 2) rampFactor = 0.77;
    else if (biz.monthsOpen === 3) rampFactor = 0.88;
    else if (biz.monthsOpen === 4) rampFactor = 0.96;
    else if (biz.monthsOpen === 5) rampFactor = 1.02;

    let priceTraffic = 1.0;
    let priceMargin = 1.0;
    if (biz.pricing === "budget") {
      priceTraffic = 1.22;
      priceMargin = 0.82;
    } else if (biz.pricing === "premium") {
      priceTraffic = 0.82;
      priceMargin = 1.3;
    }

    const levelMult = 1 + (biz.level - 1) * 0.45;
    const condMult = 0.6 + (biz.condition / 100) * 0.45;
    const awareMult = 0.8 + (biz.awareness / 100) * 0.35;

    let staffPayroll = 0;
    let staffThroughput = 1.0;
    let securityBonus = 1.0;
    let marginBoost = 1.0;
    let slackPenalty = 1.0;
    let staffCount = 0;

    STAFF_ROLES.forEach(function (role) {
      const emp = biz.staff[role.key];
      if (emp) {
        staffCount += 1;
        staffPayroll += emp.salary;
        const skillFactor = emp.skill / 100;
        if (role.key === "cashier") staffThroughput += 0.12 + skillFactor * 0.08;
        if (role.key === "guard") securityBonus += 0.05;
        if (role.key === "accountant") marginBoost += 0.08;
        if (emp.morale < 40) slackPenalty -= 0.06;
      }
    });

    const ownerFocusFactor = staffCount === 0 && biz.monthsOpen > 0 ? 0.9 : 1.0;
    const gross = Math.round(
      def.baseRevenue *
      rampFactor *
      priceTraffic *
      priceMargin *
      levelMult *
      condMult *
      awareMult *
      staffThroughput *
      securityBonus *
      ownerFocusFactor *
      Math.max(0.7, slackPenalty)
    );

    const overhead = Math.round(def.fixedOverhead * (1 + (biz.level - 1) * 0.32));
    const netBeforeTaxOpt = gross - overhead - staffPayroll;
    const net = netBeforeTaxOpt > 0 ? Math.round(netBeforeTaxOpt * marginBoost) : netBeforeTaxOpt;

    return {
      gross: gross,
      overhead: overhead,
      payroll: staffPayroll,
      net: net,
      rampFactor: rampFactor
    };
  }

  function addLog(text) {
    state.activityLog.unshift({
      date: "Y" + state.year + " M" + state.month + " D" + state.day,
      text: text
    });
    if (state.activityLog.length > 18) {
      state.activityLog.length = 18;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (e) {
      // Storage quota fallback
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return createDefaultState();
      const parsed = JSON.parse(raw);
      const base = createDefaultState();
      return Object.assign(base, parsed, {
        settings: Object.assign(base.settings, parsed.settings || {})
      });
    } catch (e) {
      return createDefaultState();
    }
  }

  function applyTheme() {
    const html = document.documentElement;
    if (state.settings.theme === "light") {
      html.classList.remove("theme-dark");
      html.classList.add("theme-light");
    } else {
      html.classList.remove("theme-light");
      html.classList.add("theme-dark");
    }
  }

  function showToast(msg, type) {
    const el = document.getElementById("toast-banner");
    if (!el) return;
    el.textContent = msg;
    el.className = "toast-banner visible " + (type ? "toast-" + type : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove("visible");
    }, 3200);
  }

  function spawnDelta(amount) {
    const rounded = Math.round(amount);
    if (!rounded) return;
    const container = document.getElementById("floating-deltas");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "delta-popup num " + (rounded > 0 ? "delta-pos" : "delta-neg");
    el.textContent = (rounded > 0 ? "+" : "-") + "₱" + Math.abs(rounded).toLocaleString("en-US");
    container.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1200);
  }

  function animateHeaderNumbers() {
    const targetCash = Math.round(state.cash);
    const targetNw = calcNetWorth(state);
    const startCash = displayedCash;
    const startNw = displayedNetWorth;
    if (startCash === targetCash && startNw === targetNw) {
      updateHeaderStatic();
      return;
    }
    if (animFrameId) cancelAnimationFrame(animFrameId);
    const startTs = performance.now();
    const dur = 340;

    function step(now) {
      const p = Math.min(1, (now - startTs) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      displayedCash = Math.round(startCash + (targetCash - startCash) * ease);
      displayedNetWorth = Math.round(startNw + (targetNw - startNw) * ease);
      const cashEl = document.getElementById("hdr-cash");
      const nwEl = document.getElementById("hdr-networth");
      if (cashEl) {
        cashEl.textContent = formatPeso(displayedCash);
        cashEl.className = "finance-value num " + (displayedCash < 0 ? "text-red" : "text-emerald");
      }
      if (nwEl) {
        nwEl.textContent = formatPeso(displayedNetWorth);
      }
      if (p < 1) {
        animFrameId = requestAnimationFrame(step);
      } else {
        displayedCash = targetCash;
        displayedNetWorth = targetNw;
      }
    }
    animFrameId = requestAnimationFrame(step);
    updateHeaderStatic();
  }

  function updateHeaderStatic() {
    const calEl = document.getElementById("hdr-calendar");
    if (calEl) {
      calEl.textContent = "Age " + state.age + " · " + formatDateShort(state);
    }
    const clockBtn = document.getElementById("btn-toggle-clock");
    const pauseIcon = document.getElementById("icon-clock-pause");
    const playIcon = document.getElementById("icon-clock-play");
    if (clockBtn && pauseIcon && playIcon) {
      if (state.settings.clockRunning) {
        pauseIcon.classList.remove("hidden");
        playIcon.classList.add("hidden");
        clockBtn.classList.remove("is-paused");
      } else {
        pauseIcon.classList.add("hidden");
        playIcon.classList.remove("hidden");
        clockBtn.classList.add("is-paused");
      }
    }
  }

  function renderHeader() {
    animateHeaderNumbers();
  }

  function checkBurnout() {
    if (state.health > 0 && state.energy > 0) return false;
    const isHealthCrisis = state.health <= 0;
    const bill = isHealthCrisis ? 4500 : 2500;
    let billNote = "";

    if (state.cash >= bill) {
      state.cash -= bill;
      spawnDelta(-bill);
      billNote = "Paid " + formatPeso(bill) + " clinic bill from cash.";
    } else if (state.cash + state.savings >= bill) {
      const fromCash = Math.max(0, state.cash);
      const fromSav = bill - fromCash;
      state.cash -= fromCash;
      state.savings -= fromSav;
      spawnDelta(-bill);
      billNote = "Covered " + formatPeso(bill) + " hospital bill using BayadVault savings.";
    } else {
      state.cash -= bill;
      spawnDelta(-bill);
      billNote = "Emergency hospital bill of " + formatPeso(bill) + " left cash in temporary deficit.";
    }

    state.health = Math.max(65, state.health);
    state.energy = Math.max(70, state.energy);
    state.happiness = clamp(state.happiness - 10, 15, 100);

    addLog((isHealthCrisis ? "Hospitalized" : "Exhaustion burnout") + ": lost 3 days (" + formatPeso(bill) + " bill).");
    SoundEngine.playError();

    for (let i = 0; i < 3; i++) {
      advanceDayInternal(true);
    }

    openModal("burnout", isHealthCrisis ? "Medical Emergency" : "Severe Burnout", function () {
      return (
        '<p class="card-subtitle" style="font-size:13.5px;color:var(--text-primary);margin:0;">' +
        (isHealthCrisis
          ? "Your Health dropped to 0. Doctors ordered 3 days of hospital bed rest."
          : "Your Energy collapsed to 0. You suffered severe exhaustion and lost 3 days recovering.") +
        "</p>" +
        '<div class="card" style="padding:12px;">' +
        '<div class="ledger-row"><span>Productivity Lost</span><span class="num text-gold">3 In-Game Days</span></div>' +
        '<div class="ledger-row"><span>Medical Bill</span><span class="num text-red">' + formatPeso(bill) + "</span></div>" +
        '<div class="ledger-row"><span>Recovery Status</span><span class="num text-emerald">Health ' + state.health + "% · Energy " + state.energy + "%</span></div>" +
        "</div>" +
        '<p class="card-subtitle">' + billNote + "</p>" +
        '<button class="btn btn-primary btn-full" type="button" data-action="close-modal">Continue Recovering</button>'
      );
    });
    return true;
  }

  function advanceDayInternal(skipRandomEvent) {
    state.day += 1;
    state.totalDays += 1;
    state.workedToday = false;

    const life = getLifestyle(state.lifestyleId);
    state.energy = clamp(state.energy + life.energyRegen, 0, 100);
    state.health = clamp(state.health + life.healthRegen, 0, 100);
    state.happiness = clamp(state.happiness + life.happyDelta, 0, 100);

    state.businesses.forEach(function (biz) {
      biz.daysOpen += 1;
      const hasCoManager = Boolean(biz.staff.comanager);
      const hasManager = Boolean(biz.staff.manager);

      if (hasManager && !biz.restockedToday) {
        const def = getBizType(biz.typeId);
        const autoCost = Math.round(def.restockCost * 0.65);
        if (state.cash >= autoCost) {
          state.cash -= autoCost;
          biz.condition = Math.min(100, biz.condition + 8);
          biz.awareness = Math.min(100, biz.awareness + 0.5);
        }
      }
      biz.restockedToday = false;

      const dailyWear = hasCoManager ? 2.2 : 4.2;
      biz.condition = clamp(biz.condition - dailyWear, 10, 100);

      if (biz.pricing === "premium" && biz.condition > 65) {
        state.reputation += 0.15;
      }

      STAFF_ROLES.forEach(function (role) {
        const emp = biz.staff[role.key];
        if (!emp) return;
        let moraleDelta = 0;
        if (emp.salary < role.marketSalary * 0.92) moraleDelta -= 2.2;
        else if (emp.salary >= role.marketSalary * 1.05) moraleDelta += 0.8;
        if (biz.condition < 40) moraleDelta -= 1.8;
        if (hasCoManager && role.key !== "comanager") moraleDelta += 0.5;
        emp.morale = clamp(emp.morale + moraleDelta, 0, 100);

        if (emp.morale < 40 && Math.random() < 0.08) {
          const shortage = Math.min(2500, Math.round(emp.salary * 0.08));
          state.cash -= shortage;
          addLog(emp.name + " had a " + formatPeso(shortage) + " register shortage at " + biz.name + ".");
        }
        if (emp.morale < 20 && Math.random() < 0.35) {
          const resignedName = emp.name;
          biz.staff[role.key] = null;
          addLog(resignedName + " (" + role.label + ") resigned from " + biz.name + " due to low morale.");
          showToast(resignedName + " resigned from " + biz.name + "!", "warn");
        }
      });
    });

    state.reputation = Math.round(state.reputation * 100) / 100;

    if (state.day > 30) {
      state.day = 1;
      state.month += 1;
      if (state.month > 12) {
        state.month = 1;
        state.year += 1;
        state.age += 1;
        addLog("Happy Birthday! Turned Age " + state.age + ".");
      }
      processMonthlyCycle();
    }

    if (!skipRandomEvent && !modalOpen && state.totalDays - state.lastEventDay >= 5) {
      const chance = state.businesses.length > 0 ? 0.15 : 0.09;
      if (Math.random() < chance) {
        state.lastEventDay = state.totalDays;
        triggerRandomEvent();
      }
    }
  }

  function processMonthlyCycle() {
    let totalIncome = 0;
    let salaryIncome = 0;
    let bizNetTotal = 0;
    let rentIncome = 0;
    let interestEarned = 0;

    const job = getJob(state.jobId);
    if (job) {
      if (state.shiftsThisMonth >= 10) {
        const perfBonus = state.shiftsThisMonth >= 18 ? Math.round(job.salary * 0.1) : 0;
        salaryIncome = job.salary + perfBonus;
        state.cash += salaryIncome;
        state.experienceMonths += 1;
        state.jobWarnings = 0;
        totalIncome += salaryIncome;
      } else {
        state.jobWarnings += 1;
        if (state.jobWarnings >= 2) {
          addLog("Terminated from " + job.title + " due to missed monthly shifts.");
          showToast("Fired from " + job.title + " (missed shifts).", "error");
          state.jobId = null;
          state.jobWarnings = 0;
        } else {
          salaryIncome = Math.round(job.salary * 0.35);
          state.cash += salaryIncome;
          totalIncome += salaryIncome;
          addLog("HR Warning: low shifts at " + job.title + ". Partial pay issued.");
          showToast("HR Warning: Work at least 10 shifts/month!", "warn");
        }
      }
    }
    state.shiftsThisMonth = 0;

    if (state.savings > 0) {
      interestEarned = Math.round(state.savings * (0.045 / 12));
      state.savings += interestEarned;
      totalIncome += interestEarned;
    }

    state.businesses.forEach(function (biz) {
      const metrics = calcMonthlyBizMetrics(biz);
      biz.monthsOpen += 1;
      biz.lastMonthProfit = metrics.net;
      biz.totalProfit += metrics.net;
      biz.awareness = clamp(biz.awareness + 4, 0, 100);
      state.cash += metrics.net;
      bizNetTotal += metrics.net;
      totalIncome += metrics.net;
    });

    state.properties.forEach(function (prop) {
      const def = getPropDef(prop.propId);
      prop.monthsOwned += 1;
      prop.currentValue = Math.round(prop.currentValue * (1 + def.appreciationAnnual / 12));
      state.cash += def.monthlyRent;
      rentIncome += def.monthlyRent;
      totalIncome += def.monthlyRent;
    });

    const life = getLifestyle(state.lifestyleId);
    const livingCost = life.rent + life.food + life.utilities + life.load;
    state.cash -= livingCost;

    const netCashFlow = totalIncome - livingCost;
    state.lastMonthLedger = {
      period: "Y" + state.year + " M" + state.month,
      salary: salaryIncome,
      bizNet: bizNetTotal,
      rentIncome: rentIncome,
      interest: interestEarned,
      livingCost: livingCost,
      netCashFlow: netCashFlow
    };

    state.netWorthHistory.push({
      label: "Y" + state.year + " M" + state.month,
      value: calcNetWorth(state)
    });
    if (state.netWorthHistory.length > 36) {
      state.netWorthHistory.shift();
    }

    addLog("Monthly settlement: Net cash flow " + (netCashFlow >= 0 ? "+" : "") + formatPeso(netCashFlow) + ".");
    if (netCashFlow > 0) {
      SoundEngine.playCash();
    }
    spawnDelta(netCashFlow);
    showToast("Month Settled · Net: " + (netCashFlow >= 0 ? "+" : "") + formatPeso(netCashFlow), netCashFlow >= 0 ? "success" : "warn");
  }

  function advanceDay(manual) {
    dayElapsedMs = 0;
    advanceDayInternal(false);
    saveState();
    renderAll();
    if (manual) {
      SoundEngine.playClick();
    }
  }

  function triggerRandomEvent() {
    const idx = Math.floor(Math.random() * RANDOM_EVENTS.length);
    activeEventObj = RANDOM_EVENTS[idx];
    SoundEngine.playAlert();
    openModal("event", activeEventObj.title, function () {
      return (
        '<p style="margin:0;font-size:13.5px;color:var(--text-primary);line-height:1.5;">' + activeEventObj.body + "</p>" +
        '<div class="card" style="padding:12px;gap:10px;">' +
        '<button class="btn btn-primary btn-full" type="button" data-action="event-choice" data-choice="A">' + activeEventObj.optionA.label + "</button>" +
        '<div class="card-subtitle" style="text-align:center;">' + activeEventObj.optionA.hint + "</div>" +
        '<div class="divider"></div>' +
        '<button class="btn btn-secondary btn-full" type="button" data-action="event-choice" data-choice="B">' + activeEventObj.optionB.label + "</button>" +
        '<div class="card-subtitle" style="text-align:center;">' + activeEventObj.optionB.hint + "</div>" +
        "</div>"
      );
    });
  }

  function buildNetWorthSvg(history) {
    const pts = history.length >= 2 ? history : [history[0], history[0]];
    const width = 380;
    const height = 140;
    const padX = 8;
    const padY = 14;
    const values = pts.map(function (p) { return p.value; });
    let minV = Math.min.apply(null, values);
    let maxV = Math.max.apply(null, values);
    if (minV === maxV) {
      minV = Math.max(0, minV - 1000);
      maxV = maxV + 1000;
    }
    const span = maxV - minV;

    const coords = pts.map(function (p, i) {
      const x = padX + (i / (pts.length - 1)) * (width - padX * 2);
      const y = height - padY - ((p.value - minV) / span) * (height - padY * 2);
      return { x: x.toFixed(1), y: y.toFixed(1), label: p.label, value: p.value };
    });

    const linePath = coords.map(function (c, i) {
      return (i === 0 ? "M " : "L ") + c.x + " " + c.y;
    }).join(" ");

    const areaPath =
      linePath +
      " L " + coords[coords.length - 1].x + " " + (height - padY) +
      " L " + coords[0].x + " " + (height - padY) + " Z";

    const last = coords[coords.length - 1];
    const dots = coords.map(function (c, idx) {
      if (idx !== coords.length - 1 && coords.length > 12 && idx % 2 !== 0) return "";
      return '<circle cx="' + c.x + '" cy="' + c.y + '" r="' + (idx === coords.length - 1 ? 4 : 2.5) + '" fill="var(--accent-emerald)"></circle>';
    }).join("");

    return (
      '<div class="chart-wrap">' +
      '<svg class="chart-svg" viewBox="0 0 ' + width + " " + height + '" preserveAspectRatio="none" aria-label="Net worth growth chart">' +
      "<defs>" +
      '<linearGradient id="nwGrad" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="var(--accent-emerald)" stop-opacity="0.32"></stop>' +
      '<stop offset="100%" stop-color="var(--accent-emerald)" stop-opacity="0.0"></stop>' +
      "</linearGradient>" +
      "</defs>" +
      '<line x1="0" y1="' + padY + '" x2="' + width + '" y2="' + padY + '" stroke="var(--border)" stroke-dasharray="3 3" stroke-width="1"></line>' +
      '<line x1="0" y1="' + (height / 2) + '" x2="' + width + '" y2="' + (height / 2) + '" stroke="var(--border)" stroke-dasharray="3 3" stroke-width="1"></line>' +
      '<line x1="0" y1="' + (height - padY) + '" x2="' + width + '" y2="' + (height - padY) + '" stroke="var(--border)" stroke-width="1"></line>' +
      '<path d="' + areaPath + '" fill="url(#nwGrad)"></path>' +
      '<path d="' + linePath + '" fill="none" stroke="var(--accent-emerald)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>' +
      dots +
      '<circle cx="' + last.x + '" cy="' + last.y + '" r="7" fill="var(--accent-emerald)" fill-opacity="0.2"></circle>' +
      "</svg>" +
      '<div class="chart-axis-row num">' +
      "<span>Low: " + formatPeso(Math.min.apply(null, values)) + "</span>" +
      "<span>Peak: " + formatPeso(Math.max.apply(null, values)) + "</span>" +
      "</div>" +
      "</div>"
    );
  }

  function renderHomeTab() {
    const life = getLifestyle(state.lifestyleId);
    const job = getJob(state.jobId);
    const nw = calcNetWorth(state);
    const trillionPct = Math.min(100, (nw / TARGET_TRILLION) * 100);
    const monthlyLifeCost = life.rent + life.food + life.utilities + life.load;

    const activityHtml = state.activityLog.slice(0, 6).map(function (item) {
      return (
        '<div class="activity-item">' +
        "<span>" + item.text + "</span>" +
        '<span class="activity-date num">' + item.date + "</span>" +
        "</div>"
      );
    }).join("");

    return (
      '<section class="card">' +
      '<div class="card-header">' +
      "<div>" +
      '<h1 class="card-title">Life Overview</h1>' +
      '<div class="meta-line">' +
      "<span>" + life.name + "</span>" +
      '<span aria-hidden="true">·</span>' +
      "<span>" + (job ? job.title : "Unemployed") + "</span>" +
      "</div>" +
      "</div>" +
      '<div style="text-align:right;">' +
      '<div class="finance-label">Reputation</div>' +
      '<div class="num" style="font-weight:700;font-size:15px;">' + Math.floor(state.reputation).toLocaleString("en-US") + "</div>" +
      "</div>" +
      "</div>" +

      '<div class="vitals-grid">' +
      renderVitalBar("Health", state.health, "fill-health") +
      renderVitalBar("Energy", state.energy, "fill-energy") +
      renderVitalBar("Happiness", state.happiness, "fill-happiness") +
      renderVitalBar("Exp (Mos)", Math.min(100, Math.round((state.experienceMonths / 96) * 100)), "fill-reputation", state.experienceMonths + " mos") +
      "</div>" +

      '<button class="btn btn-emerald btn-full" type="button" data-action="advance-day">' +
      '<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"></path></svg>' +
      "Advance Day / Rest" +
      "</button>" +
      "</section>" +

      '<section class="card">' +
      '<div class="card-header">' +
      "<div>" +
      '<h2 class="card-title">Daily Self-Care</h2>' +
      '<p class="card-subtitle">Monthly living cost: <span class="num">' + formatPeso(monthlyLifeCost) + "</span></p>" +
      "</div>" +
      "</div>" +
      '<div class="action-grid-2">' +
      '<button class="action-tile" type="button" data-action="selfcare" data-id="meal">' +
      '<span class="action-tile-title">Hot Meal & Coffee</span>' +
      '<span class="action-tile-sub num">-₱120 · +16 Energy · +4 HP</span>' +
      "</button>" +
      '<button class="action-tile" type="button" data-action="selfcare" data-id="clinic">' +
      '<span class="action-tile-title">Clinic & Vitamins</span>' +
      '<span class="action-tile-sub num">-₱650 · +25 Health · +6 Happy</span>' +
      "</button>" +
      '<button class="action-tile" type="button" data-action="selfcare" data-id="hangout">' +
      '<span class="action-tile-title">Weekend Chill</span>' +
      '<span class="action-tile-sub num">-₱350 · +18 Happy · -6 Energy</span>' +
      "</button>" +
      '<button class="action-tile" type="button" data-action="selfcare" data-id="jog">' +
      '<span class="action-tile-title">Morning Jog</span>' +
      '<span class="action-tile-sub num">Free · +8 Health · -12 Energy</span>' +
      "</button>" +
      "</div>" +
      "</section>" +

      '<section class="card">' +
      '<div class="card-header">' +
      "<div>" +
      '<h2 class="card-title">Net Worth Trajectory</h2>' +
      '<p class="card-subtitle">Target: <span class="num">₱1,000,000,000,000</span></p>' +
      "</div>" +
      '<span class="num text-emerald" style="font-size:12px;font-weight:700;">' + trillionPct.toFixed(6) + "%</span>" +
      "</div>" +
      buildNetWorthSvg(state.netWorthHistory) +
      "</section>" +

      '<section class="card">' +
      '<h2 class="card-title">Recent Timeline</h2>' +
      '<div class="activity-list">' + activityHtml + "</div>" +
      "</section>"
    );
  }

  function renderVitalBar(label, pct, cls, customText) {
    const safePct = clamp(Math.round(pct), 0, 100);
    const barClass = safePct <= 20 && cls !== "fill-reputation" ? "fill-danger" : cls;
    return (
      '<div class="vital-item">' +
      '<div class="vital-top">' +
      '<span class="vital-name">' + label + "</span>" +
      '<span class="vital-val num">' + (customText || safePct + "%") + "</span>" +
      "</div>" +
      '<div class="progress-track"><div class="progress-fill ' + barClass + '" style="width:' + safePct + '%"></div></div>' +
      "</div>"
    );
  }

  function renderCareerTab() {
    const currentJob = getJob(state.jobId);
    let activeJobHtml = "";

    if (currentJob) {
      const shiftPct = Math.min(100, Math.round((state.shiftsThisMonth / 10) * 100));
      activeJobHtml =
        '<section class="card">' +
        '<div class="card-header">' +
        "<div>" +
        '<h1 class="card-title">' + currentJob.title + "</h1>" +
        '<div class="meta-line">' +
        '<span class="num text-emerald" style="font-weight:700;">' + formatPeso(currentJob.salary) + " / mo</span>" +
        '<span aria-hidden="true">·</span>' +
        '<span class="num">Exp: ' + state.experienceMonths + " mos</span>" +
        "</div>" +
        "</div>" +
        '<button class="btn btn-danger btn-sm" type="button" data-action="resign-job">Resign</button>' +
        "</div>" +
        '<div class="vital-item">' +
        '<div class="vital-top">' +
        '<span class="vital-name">Monthly Shifts Completed (10 min. required)</span>' +
        '<span class="vital-val num">' + state.shiftsThisMonth + " / 10</span>" +
        "</div>" +
        '<div class="progress-track"><div class="progress-fill fill-health" style="width:' + shiftPct + '%"></div></div>' +
        "</div>" +
        '<button class="btn btn-primary btn-full" type="button" data-action="work-shift" ' + (state.workedToday ? "disabled" : "") + ">" +
        (state.workedToday
          ? "Shift Completed Today"
          : "Work Daily Shift (+" + formatPeso(currentJob.shiftPay) + " · -" + currentJob.energyCost + " Energy)") +
        "</button>" +
        "</section>";
    } else {
      activeJobHtml =
        '<section class="card">' +
        '<h1 class="card-title">Unemployed</h1>' +
        '<p class="card-subtitle">Apply for a legal career below to earn a monthly salary and build work experience. Current experience: <span class="num">' + state.experienceMonths + " months</span>.</p>" +
        "</section>";
    }

    const jobsHtml = JOBS.map(function (job) {
      const isCurrent = state.jobId === job.id;
      const hasExp = state.experienceMonths >= job.reqExp;
      const reqCourseObj = job.reqCourse ? getCourse(job.reqCourse) : null;
      const hasCourse = !job.reqCourse || state.completedCourses.indexOf(job.reqCourse) !== -1;
      const eligible = hasExp && hasCourse && !isCurrent;

      return (
        '<div class="card">' +
        '<div class="card-header">' +
        "<div>" +
        '<div class="card-title">' + job.title + "</div>" +
        '<div class="meta-line">' +
        '<span class="num text-emerald" style="font-weight:700;">' + formatPeso(job.salary) + " / mo</span>" +
        '<span aria-hidden="true">·</span>' +
        '<span class="num">+' + formatPeso(job.shiftPay) + "/shift</span>" +
        "</div>" +
        "</div>" +
        '<button class="btn ' + (isCurrent ? "btn-secondary" : eligible ? "btn-emerald" : "btn-secondary") + ' btn-sm" type="button" data-action="apply-job" data-id="' + job.id + '" ' + (isCurrent ? "disabled" : "") + ">" +
        (isCurrent ? "Current" : "Apply") +
        "</button>" +
        "</div>" +
        '<p class="card-subtitle">' + job.desc + "</p>" +
        '<div class="meta-line">' +
        '<span class="' + (hasExp ? "text-emerald" : "text-red") + '">Exp: ' + job.reqExp + " mos</span>" +
        (reqCourseObj
          ? '<span aria-hidden="true">·</span><span class="' + (hasCourse ? "text-emerald" : "text-gold") + '">Cert: ' + reqCourseObj.name + "</span>"
          : '<span aria-hidden="true">·</span><span>No degree required</span>') +
        "</div>" +
        "</div>"
      );
    }).join("");

    const coursesHtml = COURSES.map(function (course) {
      const completed = state.completedCourses.indexOf(course.id) !== -1;
      const prog = state.courseProgress[course.id];
      const enrolled = typeof prog === "number" && !completed;
      const pct = completed ? 100 : enrolled ? Math.round((prog / course.sessions) * 100) : 0;

      let btnHtml = "";
      if (completed) {
        btnHtml = '<button class="btn btn-secondary btn-sm" type="button" disabled>Certified</button>';
      } else if (enrolled) {
        btnHtml = '<button class="btn btn-primary btn-sm" type="button" data-action="study-course" data-id="' + course.id + '">Study (-' + course.energyCost + " EN)</button>";
      } else {
        btnHtml = '<button class="btn btn-emerald btn-sm" type="button" data-action="enroll-course" data-id="' + course.id + '">Enroll (' + formatPeso(course.tuition) + ")</button>";
      }

      return (
        '<div class="card">' +
        '<div class="card-header">' +
        "<div>" +
        '<div class="card-title">' + course.name + "</div>" +
        '<div class="meta-line">' +
        '<span class="num">' + formatPeso(course.tuition) + "</span>" +
        '<span aria-hidden="true">·</span>' +
        '<span class="num">' + course.sessions + " study sessions</span>" +
        "</div>" +
        "</div>" +
        btnHtml +
        "</div>" +
        '<p class="card-subtitle">' + course.desc + "</p>" +
        (enrolled || completed
          ? '<div class="progress-track"><div class="progress-fill fill-energy" style="width:' + pct + '%"></div></div>'
          : "") +
        "</div>"
      );
    }).join("");

    return (
      activeJobHtml +
      '<div class="section-heading-row"><h2 class="section-heading">Career Ladder</h2><span class="section-meta">7 Philippine Roles</span></div>' +
      jobsHtml +
      '<div class="section-heading-row"><h2 class="section-heading">Education & Certifications</h2><span class="section-meta">' + state.completedCourses.length + " / " + COURSES.length + " Done</span></div>" +
      coursesHtml
    );
  }

  function renderNegosyoTab() {
    let ownedHtml = "";
    if (state.businesses.length === 0) {
      ownedHtml =
        '<section class="card">' +
        '<h1 class="card-title">Registered Enterprises</h1>' +
        '<p class="card-subtitle">You do not own a commercial business yet. Save capital from your career or BayadVault savings to launch your first registered establishment below.</p>' +
        "</section>";
    } else {
      ownedHtml = state.businesses.map(function (biz) {
        const def = getBizType(biz.typeId);
        const m = calcMonthlyBizMetrics(biz);
        const staffCount = STAFF_ROLES.reduce(function (acc, r) {
          return acc + (biz.staff[r.key] ? 1 : 0);
        }, 0);
        const hasManager = Boolean(biz.staff.manager);
        const phaseText = biz.monthsOpen < 6 ? "Ramp-up M" + (biz.monthsOpen + 1) + "/6" : "Established";

        return (
          '<section class="card">' +
          '<div class="card-header">' +
          "<div>" +
          '<h2 class="card-title">' + biz.name + "</h2>" +
          '<div class="meta-line">' +
          "<span>Lvl " + biz.level + "</span>" +
          '<span aria-hidden="true">·</span>' +
          "<span>" + phaseText + "</span>" +
          '<span aria-hidden="true">·</span>' +
          "<span>" + staffCount + "/5 Staff" + (hasManager ? " (Auto)" : "") + "</span>" +
          "</div>" +
          "</div>" +
          '<div style="text-align:right;">' +
          '<div class="finance-label">Est. Monthly Net</div>' +
          '<div class="num ' + (m.net >= 0 ? "text-emerald" : "text-red") + '" style="font-weight:700;">' + (m.net >= 0 ? "+" : "") + formatPeso(m.net) + "</div>" +
          "</div>" +
          "</div>" +

          '<div class="vitals-grid">' +
          renderVitalBar("Condition", biz.condition, "fill-health") +
          renderVitalBar("Awareness", biz.awareness, "fill-happiness") +
          "</div>" +

          '<div class="segmented" role="group" aria-label="Pricing tier">' +
          '<button class="seg-btn ' + (biz.pricing === "budget" ? "active" : "") + '" type="button" data-action="set-pricing" data-id="' + biz.uid + '" data-val="budget">Budget</button>' +
          '<button class="seg-btn ' + (biz.pricing === "standard" ? "active" : "") + '" type="button" data-action="set-pricing" data-id="' + biz.uid + '" data-val="standard">Standard</button>' +
          '<button class="seg-btn ' + (biz.pricing === "premium" ? "active" : "") + '" type="button" data-action="set-pricing" data-id="' + biz.uid + '" data-val="premium">Premium</button>' +
          "</div>" +

          '<div class="action-grid-2">' +
          '<button class="btn btn-secondary btn-sm" type="button" data-action="restock-biz" data-id="' + biz.uid + '" ' + (biz.restockedToday ? "disabled" : "") + ">" +
          (biz.restockedToday ? "Restocked Today" : "Restock (" + formatPeso(def.restockCost) + ")") +
          "</button>" +
          '<button class="btn btn-primary btn-sm" type="button" data-action="manage-staff" data-id="' + biz.uid + '">Manage Staff (' + staffCount + ")</button>" +
          "</div>" +

          '<div class="action-grid-2">' +
          '<button class="btn btn-secondary btn-sm" type="button" data-action="upgrade-biz" data-id="' + biz.uid + '" ' + (biz.level >= 5 ? "disabled" : "") + ">" +
          (biz.level >= 5 ? "Max Level 5" : "Upgrade (" + formatPeso(Math.round(def.capital * 0.55 * biz.level)) + ")") +
          "</button>" +
          '<button class="btn btn-danger btn-sm" type="button" data-action="sell-biz" data-id="' + biz.uid + '">Sell (' + formatPeso(getBizValue(biz)) + ")</button>" +
          "</div>" +
          "</section>"
        );
      }).join("");
    }

    const catalogHtml = BUSINESS_TYPES.map(function (b) {
      const canAfford = state.cash >= b.capital;
      return (
        '<div class="card">' +
        '<div class="card-header">' +
        "<div>" +
        '<div class="card-title">' + b.name + "</div>" +
        '<div class="meta-line">' +
        '<span class="num text-gold" style="font-weight:700;">Capital: ' + formatPeso(b.capital) + "</span>" +
        '<span aria-hidden="true">·</span>' +
        '<span class="num">Rev ~' + formatPeso(b.baseRevenue) + "/mo</span>" +
        "</div>" +
        "</div>" +
        '<button class="btn ' + (canAfford ? "btn-emerald" : "btn-secondary") + ' btn-sm" type="button" data-action="buy-biz" data-id="' + b.id + '">Establish</button>' +
        "</div>" +
        '<p class="card-subtitle">' + b.desc + "</p>" +
        "</div>"
      );
    }).join("");

    return (
      '<div class="section-heading-row"><h2 class="section-heading">My Negosyo Portfolio</h2><span class="section-meta num">' + state.businesses.length + " Active</span></div>" +
      ownedHtml +
      '<div class="section-heading-row"><h2 class="section-heading">Commercial Ventures</h2><span class="section-meta">Permits Included</span></div>' +
      catalogHtml
    );
  }

  function renderAssetsTab() {
    const ownedValue = state.properties.reduce(function (sum, p) { return sum + p.currentValue; }, 0);
    const ownedRent = state.properties.reduce(function (sum, p) { return sum + getPropDef(p.propId).monthlyRent; }, 0);

    const lifestyleHtml = LIFESTYLES.map(function (l) {
      const active = state.lifestyleId === l.id;
      const totalCost = l.rent + l.food + l.utilities + l.load;
      return (
        '<div class="staff-row">' +
        '<div class="staff-top">' +
        "<div>" +
        '<div class="staff-name">' + l.name + "</div>" +
        '<div class="meta-line num">' +
        "<span>" + formatPeso(totalCost) + "/mo</span>" +
        '<span aria-hidden="true">·</span>' +
        "<span>+" + l.energyRegen + " EN/day</span>" +
        "</div>" +
        "</div>" +
        '<button class="btn ' + (active ? "btn-emerald" : "btn-secondary") + ' btn-sm" type="button" data-action="set-lifestyle" data-id="' + l.id + '" ' + (active ? "disabled" : "") + ">" +
        (active ? "Current" : "Move In") +
        "</button>" +
        "</div>" +
        "</div>"
      );
    }).join("");

    const ownedPropsHtml = state.properties.length === 0
      ? '<p class="card-subtitle">No properties acquired yet. Invest in Philippine real estate and infrastructure below.</p>'
      : state.properties.map(function (p) {
          const def = getPropDef(p.propId);
          const sellPrice = Math.round(p.currentValue * 0.95);
          return (
            '<div class="staff-row">' +
            '<div class="staff-top">' +
            "<div>" +
            '<div class="staff-role">' + def.location + "</div>" +
            '<div class="staff-name">' + def.name + "</div>" +
            '<div class="meta-line num">' +
            '<span class="text-emerald">+' + formatPeso(def.monthlyRent) + "/mo rent</span>" +
            '<span aria-hidden="true">·</span>' +
            "<span>Val: " + formatPeso(p.currentValue) + "</span>" +
            "</div>" +
            "</div>" +
            '<button class="btn btn-danger btn-sm" type="button" data-action="sell-prop" data-id="' + p.uid + '">Sell (' + formatPeso(sellPrice) + ")</button>" +
            "</div>" +
            "</div>"
          );
        }).join("");

    const marketPropsHtml = PROPERTIES.map(function (prop) {
      const canAfford = state.cash >= prop.price;
      return (
        '<div class="card">' +
        '<div class="card-header">' +
        "<div>" +
        '<div class="card-title">' + prop.name + "</div>" +
        '<div class="meta-line">' +
        "<span>" + prop.location + "</span>" +
        '<span aria-hidden="true">·</span>' +
        '<span class="num text-emerald">+' + formatPeso(prop.monthlyRent) + "/mo</span>" +
        "</div>" +
        "</div>" +
        '<button class="btn ' + (canAfford ? "btn-emerald" : "btn-secondary") + ' btn-sm" type="button" data-action="buy-prop" data-id="' + prop.id + '">Buy</button>' +
        "</div>" +
        '<div class="num text-gold" style="font-size:14px;font-weight:700;">' + formatPeso(prop.price) + "</div>" +
        '<p class="card-subtitle">' + prop.desc + " Appreciates ~" + (prop.appreciationAnnual * 100).toFixed(1) + "%/yr.</p>" +
        "</div>"
      );
    }).join("");

    return (
      '<section class="card">' +
      '<div class="card-header">' +
      "<div>" +
      '<h1 class="card-title">Real Estate & Holdings</h1>' +
      '<p class="card-subtitle">Portfolio Value: <span class="num text-primary">' + formatPeso(ownedValue) + "</span></p>" +
      "</div>" +
      '<div style="text-align:right;">' +
      '<div class="finance-label">Rental Yield</div>' +
      '<div class="num text-emerald" style="font-weight:700;">+' + formatPeso(ownedRent) + "/mo</div>" +
      "</div>" +
      "</div>" +
      ownedPropsHtml +
      "</section>" +

      '<section class="card">' +
      '<h2 class="card-title">Living Standard & Residence</h2>' +
      '<p class="card-subtitle">Higher tiers cost more monthly but improve daily energy & health recovery.</p>' +
      lifestyleHtml +
      "</section>" +

      '<div class="section-heading-row"><h2 class="section-heading">Property Market</h2><span class="section-meta">Millions to ₱1 Trillion</span></div>' +
      marketPropsHtml
    );
  }

  function renderBankTab() {
    const job = getJob(state.jobId);
    const life = getLifestyle(state.lifestyleId);
    const estSalary = job ? job.salary : 0;
    const estBizNet = state.businesses.reduce(function (sum, b) {
      return sum + calcMonthlyBizMetrics(b).net;
    }, 0);
    const estRent = state.properties.reduce(function (sum, p) {
      return sum + getPropDef(p.propId).monthlyRent;
    }, 0);
    const estInterest = Math.round(state.savings * (0.045 / 12));
    const estExpenses = life.rent + life.food + life.utilities + life.load;
    const estMonthlyNet = estSalary + estBizNet + estRent + estInterest - estExpenses;

    const bizEquity = state.businesses.reduce(function (s, b) { return s + getBizValue(b); }, 0);
    const propEquity = state.properties.reduce(function (s, p) { return s + p.currentValue; }, 0);

    const existingInput = document.getElementById("bank-amount-input");
    const preservedVal = existingInput ? existingInput.value : "";

    return (
      '<section class="vault-card">' +
      '<div class="vault-top">' +
      '<span class="vault-brand">BayadVault Digital Bank</span>' +
      '<span class="vault-apy num">4.5% APY</span>' +
      "</div>" +
      "<div>" +
      '<div class="vault-balance-label">High-Yield Savings Balance</div>' +
      '<div class="vault-balance num">' + formatPeso(state.savings) + "</div>" +
      "</div>" +
      '<div class="vault-footer num">' +
      "<span>Cash on Hand: " + formatPeso(state.cash) + "</span>" +
      "<span>Est. Interest: +" + formatPeso(estInterest) + "/mo</span>" +
      "</div>" +
      "</section>" +

      '<section class="card">' +
      '<h2 class="card-title">Instant Transfer</h2>' +
      '<p class="card-subtitle">Move pesos freely between Wallet Cash and BayadVault Savings. Debt/loans are disabled.</p>' +
      '<div class="input-group">' +
      '<input id="bank-amount-input" class="text-input num" type="number" min="1" step="1" placeholder="Enter exact amount in ₱" value="' + preservedVal.replace(/"/g, "") + '" />' +
      '<div class="quick-row">' +
      '<button class="btn btn-secondary btn-sm" type="button" data-action="bank-pct" data-pct="0.25">25%</button>' +
      '<button class="btn btn-secondary btn-sm" type="button" data-action="bank-pct" data-pct="0.5">50%</button>' +
      '<button class="btn btn-secondary btn-sm" type="button" data-action="bank-pct" data-pct="1">Max Cash</button>' +
      '<button class="btn btn-secondary btn-sm" type="button" data-action="bank-pct-sav" data-pct="1">Max Sav</button>' +
      "</div>" +
      '<div class="action-grid-2">' +
      '<button class="btn btn-emerald" type="button" data-action="bank-deposit">Deposit to Bank</button>' +
      '<button class="btn btn-primary" type="button" data-action="bank-withdraw">Withdraw Cash</button>' +
      "</div>" +
      "</div>" +
      "</section>" +

      '<section class="card">' +
      '<h2 class="card-title">Monthly Cash Flow Ledger</h2>' +
      '<div class="ledger-row"><span>Career Salary</span><span class="num text-emerald">+' + formatPeso(estSalary) + "</span></div>" +
      '<div class="ledger-row"><span>Business Net Profit/Loss</span><span class="num ' + (estBizNet >= 0 ? "text-emerald" : "text-red") + '">' + (estBizNet >= 0 ? "+" : "") + formatPeso(estBizNet) + "</span></div>" +
      '<div class="ledger-row"><span>Property Rental Yield</span><span class="num text-emerald">+' + formatPeso(estRent) + "</span></div>" +
      '<div class="ledger-row"><span>Savings Interest (4.5% p.a.)</span><span class="num text-emerald">+' + formatPeso(estInterest) + "</span></div>" +
      '<div class="divider"></div>' +
      '<div class="ledger-row"><span>Rent (' + life.name + ')</span><span class="num text-red">-' + formatPeso(life.rent) + "</span></div>" +
      '<div class="ledger-row"><span>Food & Groceries</span><span class="num text-red">-' + formatPeso(life.food) + "</span></div>" +
      '<div class="ledger-row"><span>Electricity & Water</span><span class="num text-red">-' + formatPeso(life.utilities) + "</span></div>" +
      '<div class="ledger-row"><span>Mobile Data / Load</span><span class="num text-red">-' + formatPeso(life.load) + "</span></div>" +
      '<div class="divider"></div>' +
      '<div class="ledger-row" style="font-weight:700;"><span>Projected Monthly Net</span><span class="num ' + (estMonthlyNet >= 0 ? "text-emerald" : "text-red") + '">' + (estMonthlyNet >= 0 ? "+" : "") + formatPeso(estMonthlyNet) + "</span></div>" +
      "</section>" +

      '<section class="card">' +
      '<h2 class="card-title">Asset Allocation & Net Worth</h2>' +
      '<div class="ledger-row"><span>Cash on Hand</span><span class="num">' + formatPeso(state.cash) + "</span></div>" +
      '<div class="ledger-row"><span>BayadVault Savings</span><span class="num">' + formatPeso(state.savings) + "</span></div>" +
      '<div class="ledger-row"><span>Business Equity</span><span class="num">' + formatPeso(bizEquity) + "</span></div>" +
      '<div class="ledger-row"><span>Real Estate Holdings</span><span class="num">' + formatPeso(propEquity) + "</span></div>" +
      '<div class="divider"></div>' +
      '<div class="ledger-row" style="font-weight:700;"><span>Total Net Worth</span><span class="num text-emerald">' + formatPeso(calcNetWorth(state)) + "</span></div>" +
      buildNetWorthSvg(state.netWorthHistory) +
      "</section>"
    );
  }

  function renderMainTab() {
    const main = document.getElementById("main-content");
    if (!main) return;
    const focusedId = document.activeElement ? document.activeElement.id : "";
    let selStart = null;
    if (focusedId === "bank-amount-input" && document.activeElement.selectionStart !== undefined) {
      selStart = document.activeElement.selectionStart;
    }

    let html = "";
    if (activeTab === "home") html = renderHomeTab();
    else if (activeTab === "career") html = renderCareerTab();
    else if (activeTab === "negosyo") html = renderNegosyoTab();
    else if (activeTab === "assets") html = renderAssetsTab();
    else if (activeTab === "bank") html = renderBankTab();

    main.innerHTML = html;

    if (focusedId === "bank-amount-input") {
      const inp = document.getElementById("bank-amount-input");
      if (inp) {
        inp.focus();
        if (selStart !== null && inp.setSelectionRange) {
          try { inp.setSelectionRange(selStart, selStart); } catch (e) {}
        }
      }
    }
  }

  function renderAll() {
    applyTheme();
    renderHeader();
    renderMainTab();
  }

  function openModal(kind, title, bodyBuilder) {
    activeModalKind = kind;
    modalOpen = true;
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-body").innerHTML = bodyBuilder();
    document.getElementById("modal-overlay").classList.remove("hidden");
  }

  function closeModal() {
    modalOpen = false;
    activeModalKind = null;
    document.getElementById("modal-overlay").classList.add("hidden");
  }

  function refreshStaffModal() {
    const biz = state.businesses.find(function (b) { return b.uid === activeBusinessUid; });
    if (!biz) {
      closeModal();
      return;
    }
    openModal("staff", "Staff · " + biz.name, function () {
      const m = calcMonthlyBizMetrics(biz);
      const rows = STAFF_ROLES.map(function (role) {
        const emp = biz.staff[role.key];
        if (!emp) {
          return (
            '<div class="staff-row">' +
            '<div class="staff-top">' +
            "<div>" +
            '<div class="staff-role">' + role.label + "</div>" +
            '<div class="card-subtitle">Vacant · Market ~' + formatPeso(role.marketSalary) + "/mo · " + role.benefit + "</div>" +
            "</div>" +
            '<button class="btn btn-emerald btn-sm" type="button" data-action="open-hire" data-slot="' + role.key + '">Hire</button>' +
            "</div>" +
            "</div>"
          );
        }
        const moraleColor = emp.morale >= 65 ? "text-emerald" : emp.morale >= 40 ? "text-gold" : "text-red";
        return (
          '<div class="staff-row">' +
          '<div class="staff-top">' +
          "<div>" +
          '<div class="staff-role">' + role.label + " · " + role.benefit + "</div>" +
          '<div class="staff-name">' + emp.name + "</div>" +
          '<div class="meta-line num">' +
          "<span>" + formatPeso(emp.salary) + "/mo</span>" +
          '<span aria-hidden="true">·</span>' +
          "<span>Skill " + emp.skill + "</span>" +
          '<span aria-hidden="true">·</span>' +
          '<span class="' + moraleColor + '">Morale ' + Math.round(emp.morale) + "%</span>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="staff-actions">' +
          '<button class="btn btn-secondary btn-sm" type="button" data-action="emp-raise" data-slot="' + role.key + '">+10% Raise</button>' +
          '<button class="btn btn-secondary btn-sm" type="button" data-action="emp-train" data-slot="' + role.key + '">Train (₱6,000)</button>' +
          '<button class="btn btn-danger btn-sm" type="button" data-action="emp-fire" data-slot="' + role.key + '">Fire</button>' +
          "</div>" +
          "</div>"
        );
      }).join("");

      return (
        '<div class="meta-line num">' +
        "<span>Monthly Payroll: " + formatPeso(m.payroll) + "</span>" +
        '<span aria-hidden="true">·</span>' +
        "<span>Est. Net: " + formatPeso(m.net) + "</span>" +
        "</div>" +
        rows
      );
    });
  }

  function generateCandidatesForSlot(slotKey) {
    const role = STAFF_ROLES.find(function (r) { return r.key === slotKey; });
    const list = [];
    for (let i = 0; i < 3; i++) {
      const fn = FILIPINO_FIRST_NAMES[Math.floor(Math.random() * FILIPINO_FIRST_NAMES.length)];
      const ln = FILIPINO_LAST_NAMES[Math.floor(Math.random() * FILIPINO_LAST_NAMES.length)];
      const skill = 58 + Math.floor(Math.random() * 36);
      const ratio = 0.88 + (skill - 58) / 140;
      const salary = Math.round(clamp(role.marketSalary * ratio, role.minSal, role.maxSal) / 500) * 500;
      list.push({
        id: "cand_" + i,
        name: fn + " " + ln,
        skill: skill,
        salary: salary,
        morale: 78 + Math.floor(Math.random() * 14)
      });
    }
    return list;
  }

  function openHireModal(slotKey) {
    activeHireSlot = slotKey;
    hireCandidates = generateCandidatesForSlot(slotKey);
    const role = STAFF_ROLES.find(function (r) { return r.key === slotKey; });

    openModal("hire", "Hire " + role.label, function () {
      const cards = hireCandidates.map(function (c, idx) {
        return (
          '<div class="staff-row">' +
          '<div class="staff-top">' +
          "<div>" +
          '<div class="staff-name">' + c.name + "</div>" +
          '<div class="meta-line num">' +
          '<span class="text-gold">' + formatPeso(c.salary) + "/mo</span>" +
          '<span aria-hidden="true">·</span>' +
          "<span>Skill " + c.skill + "</span>" +
          '<span aria-hidden="true">·</span>' +
          '<span class="text-emerald">Morale ' + c.morale + "%</span>" +
          "</div>" +
          "</div>" +
          '<button class="btn btn-emerald btn-sm" type="button" data-action="confirm-hire" data-idx="' + idx + '">Hire</button>' +
          "</div>" +
          "</div>"
        );
      }).join("");
      return (
        '<p class="card-subtitle">Role Benefit: ' + role.benefit + ". Market rate: <span class=\"num\">" + formatPeso(role.marketSalary) + "/mo</span></p>" +
        cards +
        '<button class="btn btn-secondary btn-full" type="button" data-action="back-to-staff">Back to Staff Roster</button>'
      );
    });
  }

  function openSettingsModal() {
    devTapCount = 0;
    openModal("settings", "Settings & Save Data", function () {
      const devHtml = state.settings.devUnlocked
        ? '<div class="dev-panel">' +
          '<h3 class="dev-panel-title">Developer Mode</h3>' +
          '<div class="dev-grid">' +
          '<button class="btn btn-secondary btn-sm" type="button" data-action="dev-cash" data-amt="1000000">+₱1,000,000</button>' +
          '<button class="btn btn-secondary btn-sm" type="button" data-action="dev-cash" data-amt="1000000000">+₱1,000,000,000</button>' +
          '<button class="btn btn-secondary btn-sm" type="button" data-action="dev-cash" data-amt="100000000000">+₱100,000,000,000</button>' +
          '<button class="btn btn-secondary btn-sm" type="button" data-action="dev-restore">Restore 100% Stats</button>' +
          '<button class="btn btn-secondary btn-sm" type="button" data-action="dev-month">Advance +1 Month</button>' +
          '<button class="btn btn-secondary btn-sm" type="button" data-action="dev-year">Advance +1 Year</button>' +
          "</div>" +
          '<button class="btn btn-gold btn-sm btn-full" type="button" data-action="dev-event">Trigger Random Real-Life Event</button>' +
          "</div>"
        : "";

      return (
        '<div class="setting-row">' +
        "<div>" +
        '<div style="font-weight:600;font-size:14px;">Display Theme</div>' +
        '<div class="card-subtitle">' + (state.settings.theme === "dark" ? "AMOLED Pure Black" : "AMOLED Pure White") + "</div>" +
        "</div>" +
        '<button class="btn btn-secondary btn-sm" type="button" data-action="toggle-theme">' +
        (state.settings.theme === "dark" ? "Switch to White" : "Switch to Black") +
        "</button>" +
        "</div>" +

        '<div class="setting-row">' +
        "<div>" +
        '<div style="font-weight:600;font-size:14px;">Sound Effects</div>' +
        '<div class="card-subtitle">' + (state.settings.muted ? "Muted" : "Web Audio Active") + "</div>" +
        "</div>" +
        '<button class="btn btn-secondary btn-sm" type="button" data-action="toggle-mute">' +
        (state.settings.muted ? "Unmute" : "Mute") +
        "</button>" +
        "</div>" +

        '<div class="card" style="padding:12px;">' +
        '<div style="font-weight:600;font-size:14px;">Save Code Backup</div>' +
        '<div class="action-grid-2">' +
        '<button class="btn btn-secondary btn-sm" type="button" data-action="export-save">Export Save Code</button>' +
        '<button class="btn btn-primary btn-sm" type="button" data-action="import-save">Import Save Code</button>' +
        "</div>" +
        '<textarea id="save-code-box" class="text-input textarea-input" placeholder="Paste Base64 save code here to import, or click Export to generate..."></textarea>' +
        "</div>" +

        '<button class="btn btn-danger btn-full" type="button" data-action="prompt-reset">Hard Reset Game</button>' +
        devHtml +
        '<div class="build-version-tap" data-action="tap-build">Build v1.0.0</div>'
      );
    });
  }

  function encodeSaveCode(obj) {
    const json = JSON.stringify(obj);
    const bytes = new TextEncoder().encode(json);
    let bin = "";
    for (let i = 0; i < bytes.length; i++) {
      bin += String.fromCharCode(bytes[i]);
    }
    return btoa(bin);
  }

  function decodeSaveCode(code) {
    const bin = atob(code.trim());
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  }

  function handleAction(action, target) {
    if (action === "close-modal") {
      SoundEngine.playClick();
      closeModal();
      return;
    }

    if (action === "advance-day") {
      advanceDay(true);
      return;
    }

    if (action === "selfcare") {
      const id = target.getAttribute("data-id");
      if (id === "meal") {
        if (state.cash < 120) { SoundEngine.playError(); showToast("Need ₱120 cash for meal.", "error"); return; }
        state.cash -= 120;
        state.energy = clamp(state.energy + 16, 0, 100);
        state.health = clamp(state.health + 4, 0, 100);
        state.happiness = clamp(state.happiness + 3, 0, 100);
        spawnDelta(-120);
        SoundEngine.playClick();
        showToast("Ate a hot meal (+16 Energy).", "success");
      } else if (id === "clinic") {
        if (state.cash < 650) { SoundEngine.playError(); showToast("Need ₱650 cash for clinic visit.", "error"); return; }
        state.cash -= 650;
        state.health = clamp(state.health + 25, 0, 100);
        state.happiness = clamp(state.happiness + 6, 0, 100);
        spawnDelta(-650);
        SoundEngine.playClick();
        showToast("Clinic checkup & vitamins (+25 Health).", "success");
      } else if (id === "hangout") {
        if (state.cash < 350) { SoundEngine.playError(); showToast("Need ₱350 cash.", "error"); return; }
        state.cash -= 350;
        state.happiness = clamp(state.happiness + 18, 0, 100);
        state.energy = clamp(state.energy - 6, 0, 100);
        spawnDelta(-350);
        SoundEngine.playClick();
        showToast("Recharged socially (+18 Happiness).", "success");
      } else if (id === "jog") {
        state.health = clamp(state.health + 8, 0, 100);
        state.energy = clamp(state.energy - 12, 0, 100);
        state.happiness = clamp(state.happiness + 6, 0, 100);
        SoundEngine.playClick();
        showToast("Morning jog complete (+8 Health).", "success");
      }
      if (!checkBurnout()) {
        saveState();
        renderAll();
      }
      return;
    }

    if (action === "apply-job") {
      const job = getJob(target.getAttribute("data-id"));
      if (!job) return;
      if (state.experienceMonths < job.reqExp) {
        SoundEngine.playError();
        showToast("Requires " + job.reqExp + " months work experience.", "error");
        return;
      }
      if (job.reqCourse && state.completedCourses.indexOf(job.reqCourse) === -1) {
        SoundEngine.playError();
        showToast("Requires " + getCourse(job.reqCourse).name + ".", "error");
        return;
      }
      state.jobId = job.id;
      state.shiftsThisMonth = 0;
      state.jobWarnings = 0;
      addLog("Hired as " + job.title + " (" + formatPeso(job.salary) + "/mo).");
      SoundEngine.playCash();
      showToast("Hired as " + job.title + "!", "success");
      saveState();
      renderAll();
      return;
    }

    if (action === "resign-job") {
      const job = getJob(state.jobId);
      if (job) {
        addLog("Resigned from " + job.title + ".");
        state.jobId = null;
        state.shiftsThisMonth = 0;
        state.jobWarnings = 0;
        SoundEngine.playClick();
        showToast("Resigned from " + job.title + ".", "warn");
        saveState();
        renderAll();
      }
      return;
    }

    if (action === "work-shift") {
      const job = getJob(state.jobId);
      if (!job || state.workedToday) return;
      state.workedToday = true;
      state.shiftsThisMonth += 1;
      state.energy = clamp(state.energy - job.energyCost, 0, 100);
      state.health = clamp(state.health - 1, 0, 100);
      state.reputation += 0.5;
      state.cash += job.shiftPay;
      spawnDelta(job.shiftPay);
      SoundEngine.playCash();
      showToast("Shift complete! +" + formatPeso(job.shiftPay) + " allowance.", "success");
      if (!checkBurnout()) {
        saveState();
        renderAll();
      }
      return;
    }

    if (action === "enroll-course") {
      const course = getCourse(target.getAttribute("data-id"));
      if (!course) return;
      if (state.cash < course.tuition) {
        SoundEngine.playError();
        showToast("Need " + formatPeso(course.tuition) + " cash for tuition.", "error");
        return;
      }
      state.cash -= course.tuition;
      state.courseProgress[course.id] = 0;
      spawnDelta(-course.tuition);
      addLog("Enrolled in " + course.name + " (" + formatPeso(course.tuition) + ").");
      SoundEngine.playClick();
      showToast("Enrolled in " + course.name + "!", "success");
      saveState();
      renderAll();
      return;
    }

    if (action === "study-course") {
      const course = getCourse(target.getAttribute("data-id"));
      if (!course) return;
      if (state.energy < course.energyCost) {
        SoundEngine.playError();
        showToast("Low energy! Rest or advance day first.", "warn");
        return;
      }
      state.energy = clamp(state.energy - course.energyCost, 0, 100);
      state.courseProgress[course.id] = (state.courseProgress[course.id] || 0) + 1;
      if (state.courseProgress[course.id] >= course.sessions) {
        state.completedCourses.push(course.id);
        state.reputation += 5;
        addLog("Graduated: " + course.name + " (+5 Rep).");
        SoundEngine.playCash();
        showToast("Completed " + course.name + "!", "success");
      } else {
        SoundEngine.playClick();
        showToast("Studied " + course.name + " (" + state.courseProgress[course.id] + "/" + course.sessions + ").", "success");
      }
      if (!checkBurnout()) {
        saveState();
        renderAll();
      }
      return;
    }

    if (action === "buy-biz") {
      const def = getBizType(target.getAttribute("data-id"));
      if (state.cash < def.capital) {
        SoundEngine.playError();
        showToast("Need " + formatPeso(def.capital) + " cash on hand.", "error");
        return;
      }
      state.cash -= def.capital;
      const countSame = state.businesses.filter(function (b) { return b.typeId === def.id; }).length;
      const bizName = countSame > 0 ? def.name + " #" + (countSame + 1) : def.name;
      state.businesses.push({
        uid: "biz_" + Date.now() + "_" + Math.floor(Math.random() * 999),
        typeId: def.id,
        name: bizName,
        level: 1,
        monthsOpen: 0,
        daysOpen: 0,
        pricing: "standard",
        condition: 90,
        awareness: 35,
        restockedToday: false,
        staff: { cashier: null, comanager: null, manager: null, guard: null, accountant: null },
        lastMonthProfit: 0,
        totalProfit: 0
      });
      state.reputation += 8;
      spawnDelta(-def.capital);
      addLog("Established " + bizName + " for " + formatPeso(def.capital) + ".");
      SoundEngine.playCash();
      showToast("Launched " + bizName + "!", "success");
      saveState();
      renderAll();
      return;
    }

    if (action === "set-pricing") {
      const uid = target.getAttribute("data-id");
      const val = target.getAttribute("data-val");
      const biz = state.businesses.find(function (b) { return b.uid === uid; });
      if (biz) {
        biz.pricing = val;
        SoundEngine.playClick();
        saveState();
        renderAll();
      }
      return;
    }

    if (action === "restock-biz") {
      const uid = target.getAttribute("data-id");
      const biz = state.businesses.find(function (b) { return b.uid === uid; });
      if (!biz || biz.restockedToday) return;
      const def = getBizType(biz.typeId);
      if (state.cash < def.restockCost) {
        SoundEngine.playError();
        showToast("Need " + formatPeso(def.restockCost) + " to restock.", "error");
        return;
      }
      state.cash -= def.restockCost;
      biz.restockedToday = true;
      biz.condition = clamp(biz.condition + 15, 0, 100);
      biz.awareness = clamp(biz.awareness + 3, 0, 100);
      state.energy = clamp(state.energy - 8, 0, 100);
      spawnDelta(-def.restockCost);
      SoundEngine.playClick();
      showToast("Restocked " + biz.name + " (+15% Condition).", "success");
      if (!checkBurnout()) {
        saveState();
        renderAll();
      }
      return;
    }

    if (action === "upgrade-biz") {
      const uid = target.getAttribute("data-id");
      const biz = state.businesses.find(function (b) { return b.uid === uid; });
      if (!biz || biz.level >= 5) return;
      const def = getBizType(biz.typeId);
      const cost = Math.round(def.capital * 0.55 * biz.level);
      if (state.cash < cost) {
        SoundEngine.playError();
        showToast("Need " + formatPeso(cost) + " to upgrade.", "error");
        return;
      }
      state.cash -= cost;
      biz.level += 1;
      biz.condition = 100;
      biz.awareness = clamp(biz.awareness + 10, 0, 100);
      state.reputation += 6;
      spawnDelta(-cost);
      addLog("Upgraded " + biz.name + " to Level " + biz.level + ".");
      SoundEngine.playCash();
      showToast(biz.name + " upgraded to Level " + biz.level + "!", "success");
      saveState();
      renderAll();
      return;
    }

    if (action === "sell-biz") {
      const uid = target.getAttribute("data-id");
      const idx = state.businesses.findIndex(function (b) { return b.uid === uid; });
      if (idx === -1) return;
      const biz = state.businesses[idx];
      const val = getBizValue(biz);
      state.businesses.splice(idx, 1);
      state.cash += val;
      spawnDelta(val);
      addLog("Sold " + biz.name + " for " + formatPeso(val) + ".");
      SoundEngine.playCash();
      showToast("Sold " + biz.name + " for " + formatPeso(val) + ".", "success");
      saveState();
      renderAll();
      return;
    }

    if (action === "manage-staff") {
      activeBusinessUid = target.getAttribute("data-id");
      SoundEngine.playClick();
      refreshStaffModal();
      return;
    }

    if (action === "open-hire") {
      SoundEngine.playClick();
      openHireModal(target.getAttribute("data-slot"));
      return;
    }

    if (action === "back-to-staff") {
      SoundEngine.playClick();
      refreshStaffModal();
      return;
    }

    if (action === "confirm-hire") {
      const idx = parseInt(target.getAttribute("data-idx"), 10);
      const cand = hireCandidates[idx];
      const biz = state.businesses.find(function (b) { return b.uid === activeBusinessUid; });
      if (!biz || !cand) return;
      biz.staff[activeHireSlot] = {
        name: cand.name,
        salary: cand.salary,
        skill: cand.skill,
        morale: cand.morale
      };
      addLog("Hired " + cand.name + " at " + biz.name + ".");
      SoundEngine.playCash();
      showToast("Hired " + cand.name + "!", "success");
      saveState();
      renderAll();
      refreshStaffModal();
      return;
    }

    if (action === "emp-raise") {
      const slot = target.getAttribute("data-slot");
      const biz = state.businesses.find(function (b) { return b.uid === activeBusinessUid; });
      if (!biz || !biz.staff[slot]) return;
      const emp = biz.staff[slot];
      emp.salary = Math.round(emp.salary * 1.1);
      emp.morale = clamp(emp.morale + 18, 0, 100);
      SoundEngine.playCash();
      showToast("Raised " + emp.name + "'s pay to " + formatPeso(emp.salary) + "/mo.", "success");
      saveState();
      renderAll();
      refreshStaffModal();
      return;
    }

    if (action === "emp-train") {
      const slot = target.getAttribute("data-slot");
      const biz = state.businesses.find(function (b) { return b.uid === activeBusinessUid; });
      if (!biz || !biz.staff[slot]) return;
      if (state.cash < 6000) {
        SoundEngine.playError();
        showToast("Need ₱6,000 cash for staff training.", "error");
        return;
      }
      state.cash -= 6000;
      const emp = biz.staff[slot];
      emp.skill = clamp(emp.skill + 8, 1, 100);
      emp.morale = clamp(emp.morale + 10, 0, 100);
      spawnDelta(-6000);
      SoundEngine.playClick();
      showToast(emp.name + " trained (+8 Skill, +10 Morale).", "success");
      saveState();
      renderAll();
      refreshStaffModal();
      return;
    }

    if (action === "emp-fire") {
      const slot = target.getAttribute("data-slot");
      const biz = state.businesses.find(function (b) { return b.uid === activeBusinessUid; });
      if (!biz || !biz.staff[slot]) return;
      const name = biz.staff[slot].name;
      biz.staff[slot] = null;
      addLog("Dismissed " + name + " from " + biz.name + ".");
      SoundEngine.playClick();
      showToast("Dismissed " + name + ".", "warn");
      saveState();
      renderAll();
      refreshStaffModal();
      return;
    }

    if (action === "set-lifestyle") {
      const id = target.getAttribute("data-id");
      const life = getLifestyle(id);
      state.lifestyleId = life.id;
      addLog("Moved to " + life.name + ".");
      SoundEngine.playClick();
      showToast("Lifestyle updated: " + life.name, "success");
      saveState();
      renderAll();
      return;
    }

    if (action === "buy-prop") {
      const prop = getPropDef(target.getAttribute("data-id"));
      if (state.cash < prop.price) {
        SoundEngine.playError();
        showToast("Need " + formatPeso(prop.price) + " cash on hand.", "error");
        return;
      }
      state.cash -= prop.price;
      state.properties.push({
        uid: "prop_" + Date.now() + "_" + Math.floor(Math.random() * 999),
        propId: prop.id,
        purchasePrice: prop.price,
        currentValue: prop.price,
        monthsOwned: 0
      });
      state.reputation += 15;
      spawnDelta(-prop.price);
      addLog("Acquired " + prop.name + " for " + formatPeso(prop.price) + ".");
      SoundEngine.playCash();
      showToast("Acquired " + prop.name + "!", "success");
      saveState();
      renderAll();
      return;
    }

    if (action === "sell-prop") {
      const uid = target.getAttribute("data-id");
      const idx = state.properties.findIndex(function (p) { return p.uid === uid; });
      if (idx === -1) return;
      const prop = state.properties[idx];
      const def = getPropDef(prop.propId);
      const sellVal = Math.round(prop.currentValue * 0.95);
      state.properties.splice(idx, 1);
      state.cash += sellVal;
      spawnDelta(sellVal);
      addLog("Sold " + def.name + " for " + formatPeso(sellVal) + ".");
      SoundEngine.playCash();
      showToast("Sold " + def.name + " for " + formatPeso(sellVal) + ".", "success");
      saveState();
      renderAll();
      return;
    }

    if (action === "bank-pct") {
      const pct = parseFloat(target.getAttribute("data-pct"));
      const inp = document.getElementById("bank-amount-input");
      if (inp) {
        inp.value = Math.max(0, Math.floor(state.cash * pct));
        SoundEngine.playClick();
      }
      return;
    }

    if (action === "bank-pct-sav") {
      const pct = parseFloat(target.getAttribute("data-pct"));
      const inp = document.getElementById("bank-amount-input");
      if (inp) {
        inp.value = Math.max(0, Math.floor(state.savings * pct));
        SoundEngine.playClick();
      }
      return;
    }

    if (action === "bank-deposit") {
      const inp = document.getElementById("bank-amount-input");
      const amt = Math.floor(Number(inp ? inp.value : 0));
      if (!amt || amt <= 0) { SoundEngine.playError(); showToast("Enter a valid amount.", "error"); return; }
      if (state.cash < amt) { SoundEngine.playError(); showToast("Insufficient cash on hand.", "error"); return; }
      state.cash -= amt;
      state.savings += amt;
      if (inp) inp.value = "";
      spawnDelta(-amt);
      SoundEngine.playCash();
      showToast("Deposited " + formatPeso(amt) + " to BayadVault.", "success");
      saveState();
      renderAll();
      return;
    }

    if (action === "bank-withdraw") {
      const inp = document.getElementById("bank-amount-input");
      const amt = Math.floor(Number(inp ? inp.value : 0));
      if (!amt || amt <= 0) { SoundEngine.playError(); showToast("Enter a valid amount.", "error"); return; }
      if (state.savings < amt) { SoundEngine.playError(); showToast("Insufficient BayadVault savings.", "error"); return; }
      state.savings -= amt;
      state.cash += amt;
      if (inp) inp.value = "";
      spawnDelta(amt);
      SoundEngine.playCash();
      showToast("Withdrew " + formatPeso(amt) + " to Cash.", "success");
      saveState();
      renderAll();
      return;
    }

    if (action === "event-choice") {
      if (!activeEventObj) { closeModal(); return; }
      const choiceKey = target.getAttribute("data-choice");
      const opt = choiceKey === "A" ? activeEventObj.optionA : activeEventObj.optionB;
      const res = opt.apply(state);
      if (res.delta) spawnDelta(res.delta);
      addLog(activeEventObj.title + ": " + res.msg);
      showToast(res.msg, res.delta < 0 ? "warn" : "success");
      SoundEngine.playClick();
      activeEventObj = null;
      closeModal();
      if (!checkBurnout()) {
        saveState();
        renderAll();
      }
      return;
    }

    if (action === "toggle-theme") {
      state.settings.theme = state.settings.theme === "dark" ? "light" : "dark";
      SoundEngine.playClick();
      saveState();
      renderAll();
      openSettingsModal();
      return;
    }

    if (action === "toggle-mute") {
      state.settings.muted = !state.settings.muted;
      SoundEngine.playClick();
      saveState();
      openSettingsModal();
      return;
    }

    if (action === "export-save") {
      const box = document.getElementById("save-code-box");
      const code = encodeSaveCode(state);
      if (box) box.value = code;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function () {
          showToast("Save code copied to clipboard!", "success");
        }).catch(function () {
          showToast("Save code generated below. Copy manually.", "success");
        });
      } else {
        showToast("Save code generated below. Copy manually.", "success");
      }
      SoundEngine.playClick();
      return;
    }

    if (action === "import-save") {
      const box = document.getElementById("save-code-box");
      const code = box ? box.value.trim() : "";
      if (!code) { SoundEngine.playError(); showToast("Paste a valid save code first.", "error"); return; }
      try {
        const loaded = decodeSaveCode(code);
        if (typeof loaded.cash !== "number" || typeof loaded.age !== "number") {
          throw new Error("Invalid save format");
        }
        const base = createDefaultState();
        state = Object.assign(base, loaded, {
          settings: Object.assign(base.settings, loaded.settings || {})
        });
        saveState();
        closeModal();
        renderAll();
        SoundEngine.playCash();
        showToast("Save restored successfully!", "success");
      } catch (e) {
        SoundEngine.playError();
        showToast("Invalid or corrupted save code.", "error");
      }
      return;
    }

    if (action === "prompt-reset") {
      SoundEngine.playClick();
      openModal("confirm-reset", "Confirm Hard Reset", function () {
        return (
          '<p style="margin:0;font-size:13.5px;color:var(--text-primary);">Reset all progress, businesses, properties, and savings back to Age 18 with ₱2,500?</p>' +
          '<div class="action-grid-2">' +
          '<button class="btn btn-secondary" type="button" data-action="close-modal">Cancel</button>' +
          '<button class="btn btn-danger" type="button" data-action="confirm-reset">Yes, Reset All</button>' +
          "</div>"
        );
      });
      return;
    }

    if (action === "confirm-reset") {
      const keepTheme = state.settings.theme;
      const keepMute = state.settings.muted;
      state = createDefaultState();
      state.settings.theme = keepTheme;
      state.settings.muted = keepMute;
      displayedCash = state.cash;
      displayedNetWorth = calcNetWorth(state);
      dayElapsedMs = 0;
      saveState();
      closeModal();
      renderAll();
      SoundEngine.playClick();
      showToast("Started a fresh life at Age 18.", "success");
      return;
    }

    if (action === "tap-build") {
      SoundEngine.playClick();
      if (state.settings.devUnlocked) return;
      devTapCount += 1;
      if (devTapCount >= 7) {
        state.settings.devUnlocked = true;
        saveState();
        SoundEngine.playCash();
        showToast("Developer Mode unlocked!", "success");
        openSettingsModal();
      }
      return;
    }

    if (action === "dev-cash") {
      const amt = parseInt(target.getAttribute("data-amt"), 10);
      state.cash += amt;
      state.netWorthHistory.push({
        label: "Y" + state.year + " M" + state.month,
        value: calcNetWorth(state)
      });
      if (state.netWorthHistory.length > 36) state.netWorthHistory.shift();
      spawnDelta(amt);
      SoundEngine.playCash();
      showToast("Dev: Added " + formatPeso(amt), "success");
      saveState();
      renderAll();
      return;
    }

    if (action === "dev-restore") {
      state.health = 100;
      state.energy = 100;
      state.happiness = 100;
      SoundEngine.playCash();
      showToast("Dev: Stats restored to 100%", "success");
      saveState();
      renderAll();
      return;
    }

    if (action === "dev-month") {
      for (let i = 0; i < 30; i++) advanceDayInternal(true);
      SoundEngine.playClick();
      saveState();
      renderAll();
      return;
    }

    if (action === "dev-year") {
      for (let i = 0; i < 360; i++) advanceDayInternal(true);
      SoundEngine.playClick();
      saveState();
      renderAll();
      return;
    }

    if (action === "dev-event") {
      closeModal();
      triggerRandomEvent();
      return;
    }
  }

  document.addEventListener("click", function (e) {
    const navBtn = e.target.closest(".nav-btn");
    if (navBtn) {
      const tab = navBtn.getAttribute("data-tab");
      if (tab && tab !== activeTab) {
        activeTab = tab;
        document.querySelectorAll(".nav-btn").forEach(function (b) {
          b.classList.toggle("active", b.getAttribute("data-tab") === activeTab);
        });
        SoundEngine.playClick();
        renderMainTab();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const actionEl = e.target.closest("[data-action]");
    if (actionEl) {
      handleAction(actionEl.getAttribute("data-action"), actionEl);
      return;
    }
  });

  document.getElementById("btn-toggle-clock").addEventListener("click", function () {
    state.settings.clockRunning = !state.settings.clockRunning;
    lastTickTs = performance.now();
    SoundEngine.playClick();
    saveState();
    updateHeaderStatic();
    showToast(state.settings.clockRunning ? "Simulation clock resumed." : "Simulation clock paused.", "success");
  });

  document.getElementById("btn-open-settings").addEventListener("click", function () {
    SoundEngine.playClick();
    openSettingsModal();
  });

  document.getElementById("btn-close-modal").addEventListener("click", function () {
    if (activeModalKind === "event") return;
    SoundEngine.playClick();
    closeModal();
  });

  document.getElementById("modal-overlay").addEventListener("click", function (e) {
    if (e.target === this && activeModalKind !== "event") {
      SoundEngine.playClick();
      closeModal();
    }
  });

  document.addEventListener("visibilitychange", function () {
    lastTickTs = performance.now();
  });

  setInterval(function () {
    const now = performance.now();
    const dt = now - lastTickTs;
    lastTickTs = now;

    if (!state.settings.clockRunning || document.hidden || modalOpen) {
      return;
    }

    const safeDt = Math.min(dt, 1000);
    dayElapsedMs += safeDt;

    const fill = document.getElementById("day-progress-fill");
    if (fill) {
      fill.style.width = Math.min(100, (dayElapsedMs / DAY_DURATION_MS) * 100).toFixed(1) + "%";
    }

    if (dayElapsedMs >= DAY_DURATION_MS) {
      dayElapsedMs = 0;
      advanceDay(false);
    }
  }, 250);

  renderAll();
})();
