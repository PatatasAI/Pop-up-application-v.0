// ================= SHARED ELEMENT & TEMPLATE LIBRARY =================
// Used by both index.html (user editor) and admin.html (admin "create popup for user").

const ELEMENT_TYPES = [
    { type: 'heading', icon: 'fa-heading', label: 'Heading', defaultText: 'New Heading', defaultStyle: { tag: 'h2', className: 'text-2xl font-bold text-slate-800' } },
    { type: 'text', icon: 'fa-paragraph', label: 'Text', defaultText: 'Lorem ipsum dolor sit amet, consectetur.', defaultStyle: { tag: 'p', className: 'text-slate-600' } },
    { type: 'button', icon: 'fa-square', label: 'Button', defaultText: 'Click Me', defaultStyle: { tag: 'button', className: 'px-4 py-2 bg-indigo-600 text-white rounded font-bold' } },
    { type: 'image', icon: 'fa-image', label: 'Image', defaultStyle: { tag: 'img', src: 'https://placehold.co/150x100' } },
    { type: 'video', icon: 'fa-video', label: 'Video', defaultText: 'Video Placeholder', defaultStyle: { tag: 'div', className: 'bg-black text-white flex items-center justify-center text-xs', w: 200, h: 120 } },
    { type: 'divider', icon: 'fa-minus', label: 'Divider', defaultStyle: { tag: 'hr', className: 'border-t-2 border-slate-300', w: 300 } },
    { type: 'spacer', icon: 'fa-arrows-alt-v', label: 'Spacer', defaultStyle: { tag: 'div', w: 300, h: 40 } },
    { type: 'social', icon: 'fa-share-alt', label: 'Social', defaultStyle: { tag: 'div', className: 'flex gap-3 text-lg text-indigo-500', html: '<i class="fab fa-facebook"></i><i class="fab fa-twitter"></i><i class="fab fa-instagram"></i>' } },
    { type: 'input', icon: 'fa-i-cursor', label: 'Input Field', defaultStyle: { tag: 'input', placeholder: 'Enter your email', className: 'w-full p-2 border border-slate-300 rounded text-sm', w: 220 } },
    { type: 'checkbox', icon: 'fa-check-square', label: 'Checkbox', defaultStyle: { tag: 'label', className: 'flex items-center gap-2 text-xs text-slate-600', html: '<input type="checkbox"> I agree to receive emails' } },
    { type: 'icon', icon: 'fa-star', label: 'Icon', defaultStyle: { tag: 'div', className: 'text-3xl text-indigo-500', html: '<i class="fas fa-star"></i>' } },
    { type: 'rating', icon: 'fa-star-half-alt', label: 'Star Rating', defaultStyle: { tag: 'div', className: 'text-lg text-amber-400', html: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>' } },
    { type: 'countdown', icon: 'fa-clock', label: 'Countdown', defaultStyle: { tag: 'div', className: 'font-mono font-bold text-lg text-red-600', html: '23:59:59', w: 120 } },
    { type: 'progress', icon: 'fa-chart-bar', label: 'Progress Bar', defaultStyle: { tag: 'div', className: 'bg-slate-200 rounded-full overflow-hidden', html: '<div style="width:65%;background:#4f46e5;height:100%"></div>', w: 220, h: 12 } },
    { type: 'badge', icon: 'fa-tag', label: 'Coupon Code', defaultStyle: { tag: 'div', className: 'px-3 py-1.5 border-2 border-dashed border-indigo-400 rounded text-indigo-600 font-bold text-sm text-center', html: 'SAVE20', w: 120 } },
    { type: 'embed', icon: 'fa-code', label: 'HTML Embed', defaultStyle: { tag: 'div', className: 'p-2 border border-dashed border-slate-300 text-[10px] text-slate-400 text-center', html: 'Custom HTML block', w: 220, h: 60 } }
];

function buildBlockElement(b) {
    const def = ELEMENT_TYPES.find(e => e.type === b.type) || {};
    const style = Object.assign({}, def.defaultStyle || {}, b.style || {});
    const tag = style.tag || 'div';
    const el = document.createElement(tag);
    el.classList.add('absolute', 'cursor-move');
    if (style.className) el.className += ' ' + style.className;

    if (tag === 'img') {
        el.src = style.src || 'https://placehold.co/150x100';
        el.style.width = (style.w || 150) + 'px';
    } else if (tag === 'input') {
        el.type = 'email';
        el.placeholder = style.placeholder || 'Enter text';
        el.style.width = (style.w || 200) + 'px';
    } else if (tag === 'hr') {
        el.style.width = (style.w || 300) + 'px';
    } else if (style.html) {
        el.innerHTML = style.html;
    } else if (b.text !== undefined) {
        el.innerText = b.text;
    } else if (def.defaultText) {
        el.innerText = def.defaultText;
    }

    if (style.w && tag !== 'hr' && tag !== 'img' && tag !== 'input') el.style.width = style.w + 'px';
    if (style.h) el.style.height = style.h + 'px';
    return el;
}

// Each template: key, name, category (for the "type" filter feel), icon+colors for thumbnails,
// canvas width/height/bg/position, and a list of stacked blocks rendered top-to-bottom.
const TEMPLATES = [
    { key: 'newsletter', name: 'Newsletter', category: 'Email Capture', icon: 'fa-envelope', swatch: '#eef2ff', accent: '#4f46e5', width: 420, height: 380, bg: '#ffffff', position: 'center', blocks: [
        { type: 'icon', style: { html: '<i class="fas fa-envelope-open-text"></i>', className: 'text-4xl text-indigo-500' }, left: 170, top: 30, blockHeight: 60 },
        { type: 'heading', text: 'Join Our Newsletter', style: { className: 'text-2xl font-bold text-slate-800 text-center', w: 340 }, left: 40, blockHeight: 40 },
        { type: 'text', text: 'Get the latest updates sent straight to your inbox.', style: { className: 'text-slate-500 text-center text-sm', w: 340 }, left: 40, blockHeight: 40 },
        { type: 'input', style: { w: 340 }, left: 40, blockHeight: 44 },
        { type: 'button', text: 'Subscribe', style: { className: 'w-full py-2.5 bg-indigo-600 text-white font-bold rounded text-center', w: 340 }, left: 40, blockHeight: 50 }
    ]},
    { key: 'discount', name: 'Flash Discount', category: 'Sales', icon: 'fa-percent', swatch: '#fef2f2', accent: '#dc2626', width: 420, height: 340, bg: '#fef2f2', position: 'center', blocks: [
        { type: 'heading', text: 'FLASH SALE', style: { className: 'text-red-600 font-extrabold text-3xl text-center', w: 340 }, left: 40, top: 40, blockHeight: 50 },
        { type: 'heading', text: '50% OFF EVERYTHING', style: { className: 'text-red-500 font-bold text-lg text-center', w: 340 }, left: 40, blockHeight: 40 },
        { type: 'badge', style: { w: 140, html: 'CODE: SAVE50' }, left: 140, blockHeight: 50 },
        { type: 'button', text: 'Shop Now', style: { className: 'bg-red-600 text-white font-bold rounded shadow-lg px-8 py-3 text-center', w: 180 }, left: 120, blockHeight: 60 }
    ]},
    { key: 'welcome', name: 'Welcome Offer', category: 'Onboarding', icon: 'fa-gift', swatch: '#ecfdf5', accent: '#16a34a', width: 420, height: 320, bg: '#ffffff', position: 'center', blocks: [
        { type: 'icon', style: { html: '<i class="fas fa-hand-sparkles"></i>', className: 'text-4xl text-green-500' }, left: 170, top: 30, blockHeight: 55 },
        { type: 'heading', text: 'Welcome!', style: { className: 'text-2xl font-bold text-green-600 text-center', w: 340 }, left: 40, blockHeight: 40 },
        { type: 'text', text: 'Thanks for stopping by — here is 10% off your first order.', style: { className: 'text-slate-600 text-center text-sm', w: 340 }, left: 40, blockHeight: 40 },
        { type: 'button', text: 'Get Started', style: { className: 'bg-green-600 text-white rounded px-6 py-2.5 font-bold text-center', w: 180 }, left: 120, blockHeight: 50 }
    ]},
    { key: 'announcement', name: 'Announcement', category: 'Notice', icon: 'fa-bell', swatch: '#eff6ff', accent: '#2563eb', width: 480, height: 140, bg: '#1e3a8a', position: 'top-center', blocks: [
        { type: 'icon', style: { html: '<i class="fas fa-bullhorn"></i>', className: 'text-white text-2xl' }, left: 20, top: 45, blockHeight: 0 },
        { type: 'text', text: 'New feature just dropped — check out our latest release!', style: { className: 'text-white font-medium', w: 300 }, left: 60, top: 50, blockHeight: 0 },
        { type: 'button', text: 'Learn More', style: { className: 'bg-white text-blue-700 font-bold rounded px-4 py-2 text-sm text-center', w: 100 }, left: 370, top: 40, blockHeight: 0 }
    ]},
    { key: 'countdown', name: 'Countdown', category: 'Urgency', icon: 'fa-clock', swatch: '#fff7ed', accent: '#ea580c', width: 420, height: 340, bg: '#fff7ed', position: 'center', blocks: [
        { type: 'heading', text: 'Offer Ends Soon', style: { className: 'text-orange-600 font-bold text-2xl text-center', w: 340 }, left: 40, top: 30, blockHeight: 45 },
        { type: 'countdown', style: { className: 'font-mono font-bold text-3xl text-orange-700 text-center', html: '02 : 14 : 59', w: 340 }, left: 40, blockHeight: 55 },
        { type: 'button', text: 'Claim Deal', style: { className: 'bg-orange-600 text-white font-bold rounded px-8 py-3 text-center', w: 180 }, left: 120, blockHeight: 55 }
    ]},
    { key: 'consultation', name: 'Book a Consultation', category: 'Lead Gen', icon: 'fa-calendar-check', swatch: '#f5f3ff', accent: '#7c3aed', width: 440, height: 420, bg: '#ffffff', position: 'center', blocks: [
        { type: 'heading', text: 'Book a Free Consultation', style: { className: 'text-xl font-bold text-violet-700 text-center', w: 360 }, left: 40, top: 30, blockHeight: 40 },
        { type: 'text', text: '30 minutes, no obligation. Let\'s talk about your goals.', style: { className: 'text-slate-500 text-sm text-center', w: 360 }, left: 40, blockHeight: 35 },
        { type: 'input', style: { placeholder: 'Full name', w: 360 }, left: 40, blockHeight: 44 },
        { type: 'input', style: { placeholder: 'Email address', w: 360 }, left: 40, blockHeight: 44 },
        { type: 'button', text: 'Schedule Now', style: { className: 'w-full py-2.5 bg-violet-600 text-white font-bold rounded text-center', w: 360 }, left: 40, blockHeight: 50 }
    ]},
    { key: 'productlaunch', name: 'Product Launch', category: 'Marketing', icon: 'fa-rocket', swatch: '#111827', accent: '#facc15', width: 460, height: 380, bg: '#111827', position: 'center', blocks: [
        { type: 'icon', style: { html: '<i class="fas fa-rocket"></i>', className: 'text-4xl text-yellow-400' }, left: 190, top: 30, blockHeight: 55 },
        { type: 'heading', text: 'Introducing Our New Product', style: { className: 'text-white font-bold text-xl text-center', w: 380 }, left: 40, blockHeight: 45 },
        { type: 'text', text: 'Be the first to try it. Early access starts today.', style: { className: 'text-slate-300 text-center text-sm', w: 380 }, left: 40, blockHeight: 35 },
        { type: 'button', text: 'Get Early Access', style: { className: 'bg-yellow-400 text-slate-900 font-bold rounded px-6 py-2.5 text-center', w: 200 }, left: 130, blockHeight: 55 }
    ]},
    { key: 'holiday', name: 'Holiday Sale', category: 'Seasonal', icon: 'fa-snowflake', swatch: '#f0fdfa', accent: '#0d9488', width: 420, height: 360, bg: '#ecfeff', position: 'center', blocks: [
        { type: 'icon', style: { html: '<i class="fas fa-snowflake"></i>', className: 'text-4xl text-teal-500' }, left: 170, top: 30, blockHeight: 55 },
        { type: 'heading', text: 'Holiday Sale is Here', style: { className: 'text-teal-700 font-bold text-2xl text-center', w: 340 }, left: 40, blockHeight: 45 },
        { type: 'text', text: 'Up to 40% off site-wide, this week only.', style: { className: 'text-slate-600 text-center text-sm', w: 340 }, left: 40, blockHeight: 35 },
        { type: 'button', text: 'Shop the Sale', style: { className: 'bg-teal-600 text-white font-bold rounded px-6 py-2.5 text-center', w: 180 }, left: 120, blockHeight: 55 }
    ]},
    { key: 'exitintent', name: 'Exit Intent', category: 'Retention', icon: 'fa-door-open', swatch: '#fef9c3', accent: '#ca8a04', width: 440, height: 340, bg: '#fffbeb', position: 'center', blocks: [
        { type: 'heading', text: 'Wait — Don\'t Go Yet!', style: { className: 'text-amber-700 font-bold text-2xl text-center', w: 360 }, left: 40, top: 30, blockHeight: 45 },
        { type: 'text', text: 'Grab 15% off before you leave.', style: { className: 'text-slate-600 text-center text-sm', w: 360 }, left: 40, blockHeight: 35 },
        { type: 'badge', style: { html: 'STAY15', w: 140 }, left: 150, blockHeight: 50 },
        { type: 'button', text: 'Apply Discount', style: { className: 'bg-amber-500 text-white font-bold rounded px-6 py-2.5 text-center', w: 200 }, left: 120, blockHeight: 50 }
    ]},
    { key: 'booking', name: 'Table Booking', category: 'Hospitality', icon: 'fa-utensils', swatch: '#fdf4ff', accent: '#a21caf', width: 440, height: 420, bg: '#ffffff', position: 'center', blocks: [
        { type: 'icon', style: { html: '<i class="fas fa-utensils"></i>', className: 'text-4xl text-fuchsia-600' }, left: 190, top: 30, blockHeight: 55 },
        { type: 'heading', text: 'Reserve Your Table', style: { className: 'text-xl font-bold text-fuchsia-700 text-center', w: 360 }, left: 40, blockHeight: 40 },
        { type: 'input', style: { placeholder: 'Name', w: 360 }, left: 40, blockHeight: 44 },
        { type: 'input', style: { placeholder: 'Party size & date', w: 360 }, left: 40, blockHeight: 44 },
        { type: 'button', text: 'Book Now', style: { className: 'w-full py-2.5 bg-fuchsia-600 text-white font-bold rounded text-center', w: 360 }, left: 40, blockHeight: 50 }
    ]},
    { key: 'socialfollow', name: 'Social Follow', category: 'Social', icon: 'fa-heart', swatch: '#eef2ff', accent: '#4338ca', width: 400, height: 280, bg: '#ffffff', position: 'bottom-right', blocks: [
        { type: 'heading', text: 'Follow Us', style: { className: 'text-lg font-bold text-slate-800 text-center', w: 320 }, left: 40, top: 25, blockHeight: 35 },
        { type: 'text', text: 'Stay in the loop with our latest news.', style: { className: 'text-slate-500 text-xs text-center', w: 320 }, left: 40, blockHeight: 30 },
        { type: 'social', style: { className: 'flex gap-4 text-2xl text-indigo-600 justify-center', w: 320 }, left: 40, blockHeight: 50 }
    ]},
    { key: 'ratingask', name: 'Rate Your Experience', category: 'Feedback', icon: 'fa-star', swatch: '#fffbeb', accent: '#d97706', width: 420, height: 300, bg: '#ffffff', position: 'center', blocks: [
        { type: 'heading', text: 'How was your experience?', style: { className: 'text-lg font-bold text-slate-800 text-center', w: 340 }, left: 40, top: 30, blockHeight: 40 },
        { type: 'rating', style: { className: 'text-3xl text-amber-400 text-center', w: 340 }, left: 40, blockHeight: 50 },
        { type: 'button', text: 'Submit Feedback', style: { className: 'bg-amber-500 text-white font-bold rounded px-6 py-2.5 text-center', w: 200 }, left: 120, blockHeight: 55 }
    ]},
    { key: 'progresswheel', name: 'Almost There', category: 'Gamified', icon: 'fa-chart-bar', swatch: '#eff6ff', accent: '#1d4ed8', width: 420, height: 320, bg: '#ffffff', position: 'center', blocks: [
        { type: 'heading', text: 'You\'re Almost There!', style: { className: 'text-lg font-bold text-blue-700 text-center', w: 340 }, left: 40, top: 30, blockHeight: 40 },
        { type: 'progress', style: { w: 340, html: '<div style="width:80%;background:#1d4ed8;height:100%"></div>' }, left: 40, blockHeight: 30 },
        { type: 'text', text: 'Spend $20 more for free shipping.', style: { className: 'text-slate-500 text-xs text-center', w: 340 }, left: 40, blockHeight: 30 },
        { type: 'button', text: 'Continue Shopping', style: { className: 'bg-blue-700 text-white font-bold rounded px-6 py-2.5 text-center', w: 220 }, left: 100, blockHeight: 50 }
    ]},
    { key: 'webannounce', name: 'Site-Wide Banner', category: 'Banner', icon: 'fa-flag', swatch: '#0f172a', accent: '#38bdf8', width: 700, height: 70, bg: '#0f172a', position: 'top-center', blocks: [
        { type: 'text', text: '🎉 Free shipping on orders over $50 — today only!', style: { className: 'text-white font-medium', w: 460 }, left: 20, top: 22, blockHeight: 0 },
        { type: 'button', text: 'Shop Now', style: { className: 'bg-sky-400 text-slate-900 font-bold rounded px-4 py-2 text-sm text-center', w: 110 }, left: 560, top: 15, blockHeight: 0 }
    ]},
    { key: 'emailsignup', name: 'Simple Email Signup', category: 'Email Capture', icon: 'fa-at', swatch: '#f8fafc', accent: '#334155', width: 400, height: 260, bg: '#ffffff', position: 'center', blocks: [
        { type: 'heading', text: 'Stay Updated', style: { className: 'text-xl font-bold text-slate-800 text-center', w: 320 }, left: 40, top: 30, blockHeight: 40 },
        { type: 'input', style: { w: 320 }, left: 40, blockHeight: 44 },
        { type: 'checkbox', style: { w: 320 }, left: 40, blockHeight: 30 },
        { type: 'button', text: 'Sign Up', style: { className: 'w-full py-2.5 bg-slate-800 text-white font-bold rounded text-center', w: 320 }, left: 40, blockHeight: 45 }
    ]},
    { key: 'specialoffer', name: 'Special Offer', category: 'Sales', icon: 'fa-star', swatch: '#fef2f2', accent: '#e11d48', width: 420, height: 300, bg: '#ffffff', position: 'center', blocks: [
        { type: 'badge', style: { html: 'SPECIAL OFFER', className: 'px-3 py-1 border-2 border-dashed border-rose-400 rounded-full text-rose-600 font-bold text-xs text-center', w: 160 }, left: 130, top: 30, blockHeight: 40 },
        { type: 'heading', text: '20% off your first order', style: { className: 'text-xl font-bold text-slate-800 text-center', w: 340 }, left: 40, blockHeight: 45 },
        { type: 'button', text: 'Shop Now', style: { className: 'bg-rose-600 text-white font-bold rounded px-8 py-3 text-center', w: 180 }, left: 120, blockHeight: 55 }
    ]},
    { key: 'simplecta', name: 'Simple CTA', category: 'General', icon: 'fa-arrow-right', swatch: '#f1f5f9', accent: '#0f172a', width: 380, height: 220, bg: '#ffffff', position: 'center', blocks: [
        { type: 'heading', text: 'Ready to get started?', style: { className: 'text-lg font-bold text-slate-800 text-center', w: 300 }, left: 40, top: 30, blockHeight: 40 },
        { type: 'button', text: 'Get Started →', style: { className: 'bg-slate-900 text-white font-bold rounded px-6 py-2.5 text-center', w: 180 }, left: 100, blockHeight: 50 }
    ]},
    { key: 'ghlform', name: 'GHL Form Embed', category: 'Form', icon: 'fa-form', swatch: '#ecfeff', accent: '#0891b2', width: 440, height: 400, bg: '#ffffff', position: 'center', blocks: [
        { type: 'heading', text: 'Get Your Free Quote', style: { className: 'text-xl font-bold text-cyan-700 text-center', w: 360 }, left: 40, top: 25, blockHeight: 40 },
        { type: 'embed', style: { html: '&lt;iframe src="your-ghl-form-url"&gt;&lt;/iframe&gt;', className: 'p-4 border border-dashed border-cyan-300 text-xs text-cyan-600 text-center rounded', w: 360, h: 220 }, left: 40, blockHeight: 240 }
    ]},
    { key: 'referral', name: 'Refer a Friend', category: 'Growth', icon: 'fa-user-plus', swatch: '#f0fdf4', accent: '#15803d', width: 420, height: 340, bg: '#ffffff', position: 'center', blocks: [
        { type: 'icon', style: { html: '<i class="fas fa-user-plus"></i>', className: 'text-4xl text-green-600' }, left: 170, top: 30, blockHeight: 55 },
        { type: 'heading', text: 'Give 10%, Get 10%', style: { className: 'text-xl font-bold text-green-700 text-center', w: 340 }, left: 40, blockHeight: 40 },
        { type: 'text', text: 'Share your link and both of you save.', style: { className: 'text-slate-500 text-sm text-center', w: 340 }, left: 40, blockHeight: 35 },
        { type: 'button', text: 'Get My Link', style: { className: 'bg-green-600 text-white font-bold rounded px-6 py-2.5 text-center', w: 180 }, left: 120, blockHeight: 50 }
    ]},
    { key: 'webinar', name: 'Webinar Signup', category: 'Events', icon: 'fa-video', swatch: '#eef2ff', accent: '#4f46e5', width: 440, height: 400, bg: '#312e81', position: 'center', blocks: [
        { type: 'icon', style: { html: '<i class="fas fa-video"></i>', className: 'text-4xl text-indigo-300' }, left: 190, top: 30, blockHeight: 55 },
        { type: 'heading', text: 'Free Live Webinar', style: { className: 'text-white font-bold text-xl text-center', w: 360 }, left: 40, blockHeight: 40 },
        { type: 'text', text: 'Thursday 2PM EST — seats are limited.', style: { className: 'text-indigo-200 text-center text-sm', w: 360 }, left: 40, blockHeight: 35 },
        { type: 'input', style: { placeholder: 'Your email', w: 360 }, left: 40, blockHeight: 44 },
        { type: 'button', text: 'Save My Seat', style: { className: 'w-full py-2.5 bg-white text-indigo-700 font-bold rounded text-center', w: 360 }, left: 40, blockHeight: 50 }
    ]}
];
