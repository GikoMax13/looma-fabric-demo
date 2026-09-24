import '../style.css';
import { mountFabricScene } from './fabric-scene.js';
import { getLocale, initI18n, t } from './i18n.js';
initI18n();

const products = [
  { id: 'aeris', name: 'Aeris Silk', category: 'silk', colour: 'Champagne', weight: '22 momme', fibre: '100% mulberry silk', price: 24, imagePosition: 'left center', description: 'A fluid, luminous silk with a soft hand and graceful drape. Made for pieces that feel as special as they look.', colours: [{ name: 'Champagne', hex: '#c9a77d' }, { name: 'Moss', hex: '#827c67' }, { name: 'Ink', hex: '#373633' }] },
  { id: 'forma', name: 'Forma Linen', category: 'linen', colour: 'Natural', weight: '235 gsm', fibre: '100% European flax linen', price: 16, imagePosition: 'center center', description: 'Beautifully breathable linen with a relaxed texture that softens with every wash. Woven for everyday rituals.', colours: [{ name: 'Natural', hex: '#b7a58b' }, { name: 'Olive', hex: '#737362' }, { name: 'Clay', hex: '#a47b68' }] },
  { id: 'cloud', name: 'Cloud Cotton', category: 'cotton', colour: 'Soft ivory', weight: '180 gsm', fibre: '100% long-staple cotton', price: 12, imagePosition: 'right center', description: 'A gentle, balanced cotton with a smooth finish and just enough structure. The quiet essential you keep reaching for.', colours: [{ name: 'Soft ivory', hex: '#e8e2d6' }, { name: 'Sky', hex: '#a6b2b5' }, { name: 'Sand', hex: '#c4ab8b' }] },
];
const fabricImage = `${import.meta.env.BASE_URL}images/fabric-editorial-still-life.png`;
let activeProduct = products[0];
let quantity = 1;
let returnFocus = null;
let introCleanup = null;
let introTimers = [];
let introProgressTimer = null;
let introTriggerFocus = null;
const sampleKit = [];
const colourKeys = { Champagne: 'colour.champagne', Moss: 'colour.moss', Ink: 'colour.ink', Natural: 'colour.natural', Olive: 'colour.olive', Clay: 'colour.clay', 'Soft ivory': 'colour.softIvory', Sky: 'colour.sky', Sand: 'colour.sand' };
let activeFilter = 'all';
let lastFormMessage = '';
let lastToast = '';
const drawer = document.querySelector('.product-drawer');
const scrim = document.querySelector('.drawer-scrim');
const intro = document.querySelector('#intro');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderProducts(filter = activeFilter) {
  activeFilter = filter;
  const grid = document.querySelector('#product-grid');
  const visible = products.filter((product) => filter === 'all' || product.category === filter);
  grid.innerHTML = visible.map((product) => `
    <article class="product-card reveal is-visible" data-category="${product.category}">
      <div class="product-visual fabric-${product.category}" role="button" tabindex="0" aria-label="${t('a11y.viewProduct', { name: t(`product.${product.id}.name`) })}" data-product="${product.id}">
        <div class="fallback-silk" aria-hidden="true"></div>
        <img class="product-photo" src="${fabricImage}" alt="${t('a11y.viewProduct', { name: t(`product.${product.id}.name`) })}" style="object-position:${product.imagePosition}" onload="this.parentElement.classList.add('photo-ready')" />
        <span class="visual-label">0${products.indexOf(product) + 1} &nbsp; / &nbsp; ${t(`product.${product.id}.fibre`).toUpperCase()}</span>
        <button class="quick-view" type="button" data-product="${product.id}">${t('product.quickView')}</button>
      </div>
      <div class="product-meta"><div><h3>${t(`product.${product.id}.name`)}</h3><p>${t(`product.${product.id}.color`)} &nbsp; · &nbsp; ${t(`product.${product.id}.weight`)}</p></div><div class="product-price">${t('product.from', { price: product.price })}<span>${t('product.perMetre')}</span></div></div>
    </article>`).join('');
  const resultLabel = filter === 'all' ? t('result.featured') : t('result.fabric', { category: t(`category.${filter}`).toUpperCase(), plural: getLocale() === 'zh' || visible.length === 1 ? '' : 'S' });
  document.querySelector('.result-count').innerHTML = `${visible.length.toString().padStart(2, '0')} <span> / ${resultLabel}</span>`;
  grid.querySelectorAll('[data-product]').forEach((target) => {
    target.addEventListener('click', (event) => { event.stopPropagation(); openProduct(target.dataset.product, target); });
    target.addEventListener('keydown', (event) => { if ((event.key === 'Enter' || event.key === ' ') && target.classList.contains('product-visual')) { event.preventDefault(); openProduct(target.dataset.product, target); } });
  });
}

function openProduct(id, source) {
  activeProduct = products.find((product) => product.id === id) || products[0];
  quantity = 1;
  returnFocus = source;
  drawer.querySelector('.product-details').hidden = false;
  drawer.querySelector('.kit-view').hidden = true;
  drawer.setAttribute('aria-labelledby', 'drawer-title');
  drawer.querySelector('.drawer-category').textContent = t('category.materials', { category: t(`category.${activeProduct.category}`).toUpperCase() });
  drawer.querySelector('#drawer-title').textContent = t(`product.${activeProduct.id}.name`);
  const productNumber = String(products.indexOf(activeProduct) + 1).padStart(2, '0');
  drawer.querySelector('.drawer-index').textContent = t('drawer.index', { number: productNumber });
  drawer.querySelector('.drawer-description').textContent = t(`product.${activeProduct.id}.description`);
  drawer.querySelector('.drawer-price').textContent = t('spec.perMetre', { price: activeProduct.price });
  drawer.querySelector('.selected-colour').textContent = t(colourKeys[activeProduct.colours[0].name]);
  drawer.querySelector('.drawer-fabric').style.backgroundImage = `linear-gradient(130deg,rgba(37,33,30,.06),rgba(37,33,30,.06)),url('${fabricImage}')`;
  drawer.querySelector('.drawer-fabric').style.backgroundSize = 'cover';
  drawer.querySelector('.drawer-fabric').style.backgroundPosition = activeProduct.imagePosition;
  drawer.querySelector('.colour-options').innerHTML = activeProduct.colours.map((colour, index) => `<button type="button" class="colour-choice ${index === 0 ? 'is-selected' : ''}" aria-label="${t(colourKeys[colour.name])}" aria-pressed="${index === 0}" data-colour="${colour.name}"><span class="colour-dot" style="background:${colour.hex}"></span></button>`).join('');
  drawer.querySelector('.drawer-specs').innerHTML = `<div><span>${t('drawer.composition')}</span><span>${t(`product.${activeProduct.id}.fibre`)}</span></div><div><span>${t('drawer.weight')}</span><span>${t(`product.${activeProduct.id}.weight`)}</span></div><div><span>${t('drawer.minimum')}</span><span>${t('drawer.minimumValue')}</span></div>`;
  drawer.querySelector('.quantity-value').textContent = quantity;
  drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false');
  scrim.classList.add('is-open'); document.body.classList.add('drawer-open');
  document.querySelector('.site-shell').inert = true;
  document.querySelector('.site-shell').setAttribute('aria-hidden', 'true');
  window.setTimeout(() => drawer.focus(), 60);
}

function openKit(source) {
  returnFocus = source;
  drawer.querySelector('.product-details').hidden = true;
  drawer.querySelector('.kit-view').hidden = false;
  drawer.setAttribute('aria-labelledby', 'kit-title');
  drawer.querySelector('.kit-list').innerHTML = sampleKit.map((item, index) => `<div class="kit-item"><span class="kit-item-index">0${index + 1}</span><div><strong>${t(`product.${item.productId}.name`)}</strong><small>${t(colourKeys[item.colour])} &nbsp; · &nbsp; ${t('kit.metres', { quantity: item.quantity, plural: item.quantity === 1 ? '' : 's' })}</small></div><button type="button" class="remove-kit-item" data-remove-kit="${index}" aria-label="${t('kit.remove', { name: t(`product.${item.productId}.name`) })}">×</button></div>`).join('');
  drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false');
  scrim.classList.add('is-open'); document.body.classList.add('drawer-open');
  document.querySelector('.site-shell').inert = true;
  document.querySelector('.site-shell').setAttribute('aria-hidden', 'true');
  window.setTimeout(() => drawer.focus(), 60);
}

function closeDrawer() {
  if (!drawer.classList.contains('is-open')) return;
  drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true');
  scrim.classList.remove('is-open'); document.body.classList.remove('drawer-open');
  document.querySelector('.site-shell').inert = false;
  document.querySelector('.site-shell').removeAttribute('aria-hidden');
  if (returnFocus?.isConnected) returnFocus.focus();
}

function showToast(key, params = {}) {
  lastToast = { key, params };
  const toast = document.querySelector('.toast');
  toast.textContent = t(key, params); toast.classList.add('is-visible');
  window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2500);
}

function stopIntro(skipped = false) {
  introTimers.forEach(window.clearTimeout); introTimers = [];
  window.clearInterval(introProgressTimer); introProgressTimer = null;
  introCleanup?.(); introCleanup = null;
  intro.classList.add('is-hidden'); intro.classList.remove('is-playing', 'is-leaving');
  intro.setAttribute('aria-hidden', 'true');
  document.querySelector('.site-shell').inert = false;
  document.querySelector('.site-shell').removeAttribute('aria-hidden');
  const primaryCta = document.querySelector('.hero-actions .button');
  const focusTarget = skipped ? primaryCta : (introTriggerFocus && introTriggerFocus !== document.body ? introTriggerFocus : primaryCta);
  if (focusTarget?.isConnected) focusTarget.focus({ preventScroll: true });
  introTriggerFocus = null;
}

function setIntro(trigger = document.querySelector('.hero-actions .button')) {
  if (prefersReducedMotion) { intro.classList.add('is-hidden'); intro.setAttribute('aria-hidden', 'true'); return; }
  introCleanup?.(); introCleanup = null;
  introTimers.forEach(window.clearTimeout); introTimers = [];
  introTriggerFocus = trigger?.isConnected ? trigger : document.querySelector('.hero-actions .button');
  const stage = document.querySelector('#intro-fabric-stage');
  intro.classList.remove('is-hidden', 'is-leaving', 'is-playing');
  intro.classList.remove('has-intro-webgl');
  intro.setAttribute('aria-hidden', 'false');
  document.querySelector('.site-shell').inert = true;
  document.querySelector('.site-shell').setAttribute('aria-hidden', 'true');
  void intro.offsetWidth;
  intro.classList.add('is-playing');
  try { introCleanup = mountFabricScene(stage, { variant: 'intro', duration: 4800 }); intro.classList.add('has-intro-webgl'); }
  catch (error) { console.info('Looma is using the local intro fallback.', error); }
  window.dispatchEvent(new Event('looma:replay-intro'));
  document.querySelector('.skip-intro').focus({ preventScroll: true });
  const progress = intro.querySelector('.intro-progress strong');
  let progressValue = 0;
  progress.textContent = '00%';
  window.clearInterval(introProgressTimer);
  introProgressTimer = window.setInterval(() => { progressValue = Math.min(100, progressValue + 1); progress.textContent = `${String(progressValue).padStart(2, '0')}%`; }, 46);
  introTimers.push(window.setTimeout(() => intro.classList.add('is-leaving'), 4300));
  introTimers.push(window.setTimeout(stopIntro, 4800));
}

try {
  mountFabricScene(document.querySelector('#fabric-stage'));
  document.querySelector('.hero-art').classList.add('has-webgl');
} catch (error) {
  console.info('Looma is using the local fabric fallback.', error);
}

renderProducts();
if (sessionStorage.getItem('looma-intro-film-v1-seen')) intro.classList.add('is-hidden');
else { sessionStorage.setItem('looma-intro-film-v1-seen', 'true'); setIntro(document.querySelector('.hero-actions .button')); }

document.querySelectorAll('.filter-chip').forEach((chip) => chip.addEventListener('click', () => {
  document.querySelectorAll('.filter-chip').forEach((item) => { item.classList.toggle('is-active', item === chip); item.setAttribute('aria-pressed', item === chip ? 'true' : 'false'); });
  renderProducts(chip.dataset.filter);
}));
document.querySelector('.drawer-close').addEventListener('click', closeDrawer);
scrim.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { if (drawer.classList.contains('is-open')) closeDrawer(); else if (!intro.classList.contains('is-hidden')) stopIntro(true); return; }
  if (event.key !== 'Tab' || !drawer.classList.contains('is-open')) return;
  const focusable = [...drawer.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter((item) => !item.closest('[hidden]'));
  if (!focusable.length) { event.preventDefault(); drawer.focus(); return; }
  const first = focusable[0]; const last = focusable.at(-1);
  if (event.shiftKey && (document.activeElement === first || document.activeElement === drawer)) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
document.querySelector('.skip-intro').addEventListener('click', () => stopIntro(true));
drawer.addEventListener('click', (event) => {
  const qtyButton = event.target.closest('[data-qty]');
  if (qtyButton) { quantity = Math.max(1, Math.min(99, quantity + Number(qtyButton.dataset.qty))); drawer.querySelector('.quantity-value').textContent = quantity; }
  const colourButton = event.target.closest('[data-colour]');
  if (colourButton) { drawer.querySelectorAll('.colour-choice').forEach((button) => { const selected = button === colourButton; button.classList.toggle('is-selected', selected); button.setAttribute('aria-pressed', String(selected)); }); drawer.querySelector('.selected-colour').textContent = t(colourKeys[colourButton.dataset.colour]); }
  const removeButton = event.target.closest('[data-remove-kit]');
  if (removeButton) { sampleKit.splice(Number(removeButton.dataset.removeKit), 1); document.querySelector('.bag-count').textContent = sampleKit.length; if (sampleKit.length) openKit(returnFocus); else { closeDrawer(); showToast('toast.empty'); } }
});
drawer.querySelector('.add-to-kit').addEventListener('click', () => {
  const colour = drawer.querySelector('.selected-colour').textContent;
  const selectedEnglishColour = Object.keys(colourKeys).find((name) => t(colourKeys[name]) === colour) ?? colour;
  sampleKit.push({ productId: activeProduct.id, colour: selectedEnglishColour, quantity });
  document.querySelector('.bag-count').textContent = sampleKit.length;
  closeDrawer(); showToast('toast.added', { name: t(`product.${activeProduct.id}.name`) });
});
drawer.querySelector('.drawer-enquiry').addEventListener('click', () => { closeDrawer(); document.querySelector('#contact').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' }); });
document.querySelector('[data-open-kit]').addEventListener('click', () => {
  if (!sampleKit.length) { showToast('toast.ready'); return; }
  openKit(document.querySelector('[data-open-kit]'));
});
drawer.querySelector('.kit-enquiry').addEventListener('click', () => { closeDrawer(); document.querySelector('#contact').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' }); });
drawer.querySelector('.kit-continue').addEventListener('click', closeDrawer);
document.querySelector('.menu-toggle').addEventListener('click', (event) => {
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  event.currentTarget.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  document.querySelector('.main-nav').classList.toggle('is-open', !expanded);
});
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => { document.querySelector('.main-nav').classList.remove('is-open'); document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false'); }));
function replayIntro(event) { window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }); setIntro(event.currentTarget); }
document.querySelector('.replay-intro').addEventListener('click', replayIntro);
document.querySelector('.hero-film-link').addEventListener('click', replayIntro);

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.footer-social').forEach((button) => button.addEventListener('click', () => showToast('toast.socialDemo')));
document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const feedback = form.querySelector('.form-feedback');
  const email = form.elements.email;
  if (!form.elements.name.value.trim() || !email.validity.valid || !form.elements.message.value.trim()) {
    lastFormMessage = 'form.invalid';
    feedback.textContent = t(lastFormMessage);
    (!form.elements.name.value.trim() ? form.elements.name : !email.validity.valid ? email : form.elements.message).focus();
    return;
  }
  lastFormMessage = 'form.success';
  feedback.textContent = t(lastFormMessage);
  form.reset();
});

window.addEventListener('looma:languagechange', () => {
  renderProducts(activeFilter);
  if (drawer.classList.contains('is-open')) {
    if (!drawer.querySelector('.product-details').hidden) {
      const previousQuantity = quantity;
      const previousColour = drawer.querySelector('.colour-choice.is-selected')?.dataset.colour;
      returnFocus = document.querySelector(`.product-visual[data-product="${activeProduct.id}"]`) ?? document.querySelector('[data-open-kit]');
      openProduct(activeProduct.id, returnFocus);
      quantity = previousQuantity;
      drawer.querySelector('.quantity-value').textContent = quantity;
      if (previousColour) drawer.querySelector(`.colour-choice[data-colour="${previousColour}"]`)?.click();
    } else openKit(returnFocus);
  }
  if (lastFormMessage) document.querySelector('.form-feedback').textContent = t(lastFormMessage);
  if (lastToast && document.querySelector('.toast').classList.contains('is-visible')) document.querySelector('.toast').textContent = t(lastToast.key, lastToast.params);
});
