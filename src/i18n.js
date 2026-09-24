const STORAGE_KEY = 'looma-language';
const LOCALES = ['en', 'zh'];

const messages = {
  en: {
    'brand.studio': 'MATERIAL STUDIO',
    'page.title': 'LOOMA — Material Studio',
    'page.description': 'Exceptional fabrics. Extraordinary possibilities. Discover considered silks, linens and cottons from Looma Material Studio.',
    'a11y.home': 'Looma Material Studio home',
    'a11y.mainNavigation': 'Main navigation',
    'a11y.switchLanguage': 'Switch language',
    'a11y.openKit': 'Open your sample kit',
    'a11y.openNavigation': 'Open navigation',
    'a11y.closeNavigation': 'Close navigation',
    'a11y.benefits': 'Looma benefits',
    'a11y.filterFabrics': 'Filter fabrics',
    'a11y.viewProduct': 'View {name} details',
    'a11y.removeProduct': 'Remove {name}',
    'a11y.reduceQuantity': 'Reduce quantity',
    'a11y.addQuantity': 'Add quantity',
    'a11y.closeDetails': 'Close details',
    'language.button': '中文',
    'nav.collections': 'Collections',
    'nav.craft': 'Our craft',
    'nav.about': 'About us',
    'nav.requestSwatches': 'Request swatches',
    'hero.eyebrow': 'Exceptional fabrics. Extraordinary possibilities.',
    'hero.title': 'Feel the<br /><em>difference.</em>',
    'hero.description': 'Thoughtful textiles for the things you make, and the lives lived in them.',
    'hero.explore': 'Explore the collection',
    'hero.story': 'Our story',
    'hero.watchFilm': 'Watch the film',
    'hero.captionTitle': 'AERIS SILK',
    'hero.captionDetail': '100% mulberry silk&nbsp; · &nbsp;22 momme',
    'hero.artLabel': 'Sculptural folds of champagne silk',
    'hero.edit': 'THE AERIS EDIT',
    'hero.editCount': '01 — 03',
    'hero.bottomLeft': 'TEXTILES TO LIVE WITH',
    'hero.bottomRight': 'EST. WITH INTENTION&nbsp; · &nbsp;2024',
    'promise.title': 'Built for <em>beautiful things.</em>',
    'promise.one': 'Low minimums',
    'promise.two': 'Worldwide shipping',
    'promise.three': 'Made to be felt',
    'collection.eyebrow': 'A considered collection',
    'collection.title': 'Good things<br /><em>start with touch.</em>',
    'collection.intro': 'Natural fibres, beautiful drape, and the kind of quality you notice before you know why.',
    'filter.all': 'All fabrics',
    'filter.silk': 'Silk',
    'filter.linen': 'Linen',
    'filter.cotton': 'Cotton',
    'result.featured': 'FEATURED FABRICS',
    'result.fabric': '{category} FABRIC{plural}',
    'product.quickView': 'Quick view&nbsp; ↗',
    'product.from': 'from ${price}',
    'product.perMetre': 'per metre',
    'collection.smallBatches': 'SMALL BATCHES. OPEN POSSIBILITIES.',
    'collection.specific': 'Need something specific?',
    'craft.eyebrow': 'Made with intention',
    'craft.pointOfView': 'THE LOOMA POINT OF VIEW&nbsp; / &nbsp;01—04',
    'craft.title': 'The way it falls.<br /><em>The way it feels.</em>',
    'craft.copy': 'Some things make sense the moment you touch them. A little more weight. A softer finish. The quiet confidence of a natural fibre, chosen well.',
    'craft.about': 'A little about us',
    'craft.swatch': 'NATURAL LINEN<br />235 GSM',
    'craft.swatchIndex': '02 <span> / NATURAL, NEVER ORDINARY</span>',
    'craft.statOne': 'Touch comes first',
    'craft.statTwo': 'Made to move with you',
    'craft.statThree': 'Considered, always',
    'about.eyebrow': 'A material point of view',
    'about.aside': 'GOOD MATERIAL<br />CHANGES EVERYTHING.',
    'about.title': 'A little more<br /><em>considered.</em>',
    'about.lead': 'Looma began with a simple belief: the materials we choose shape the things we make, and the way they feel to live with.',
    'about.copy': 'We work closely with small mills and makers who care about the details. Natural fibres, thoughtful finishes, honest advice. A collection that gives you room to make something your own.',
    'about.link': 'Get to know Looma',
    'about.years': 'YEARS IN TEXTILES',
    'about.countries': 'COUNTRIES REACHED',
    'about.fabrics': 'FABRICS, CHOSEN WELL',
    'contact.eyebrow': 'The first step is a conversation',
    'contact.title': 'Your next idea<br /><em>starts here.</em>',
    'contact.intro': 'Tell us what you’re making. We’ll help you find the right feel.',
    'form.name': 'Your name',
    'form.email': 'Email address',
    'form.company': 'Company or studio',
    'form.optional': 'OPTIONAL',
    'form.project': 'A little about your project',
    'form.namePlaceholder': 'Name',
    'form.emailPlaceholder': 'you@studio.com',
    'form.companyPlaceholder': 'Where you make things',
    'form.messagePlaceholder': 'What are you working on?',
    'form.submit': 'Send an enquiry',
    'form.note': 'Concept form for demonstration.<br />Your details are not sent or stored.',
    'form.invalid': 'Please add your name, a valid email and a few words about your project.',
    'form.success': 'Thanks — your enquiry has been saved in this demo. Nothing was sent.',
    'footer.tagline': 'Materials with a little more meaning.',
    'footer.backTop': 'BACK TO TOP ↑',
    'footer.copyright': '© 2024 LOOMA MATERIAL STUDIO',
    'footer.contact': 'Contact',
    'footer.instagram': 'Instagram ↗',
    'footer.tiktok': 'TikTok ↗',
    'footer.pinterest': 'Pinterest ↗',
    'footer.replay': 'Replay intro ↗',
    'footer.disclaimer': 'Concept website. Products and company information are illustrative.',
    'intro.skip': 'Skip intro',
    'intro.overline': 'AN OPENING NOTE &nbsp; / &nbsp; NO. 001',
    'intro.title': '<span>IT STARTS</span><em>WITH A</em><span>FEELING.</span>',
    'intro.endline': 'EXCEPTIONAL MATERIALS. ENDLESS POSSIBILITIES.',
    'intro.progress': 'MADE TO BE FELT',
    'drawer.close': 'Close details',
    'drawer.index': 'LOOMA / FABRIC NO. {number}',
    'drawer.colour': 'Colour',
    'drawer.quantity': 'Quantity',
    'drawer.metres': 'METRES',
    'drawer.composition': 'COMPOSITION',
    'drawer.weight': 'WEIGHT',
    'drawer.minimum': 'MINIMUM',
    'drawer.minimumValue': '1 metre',
    'drawer.addKit': 'Add to sample kit',
    'drawer.askFabric': 'Ask us about this fabric',
    'kit.titleEyebrow': 'Your selection',
    'kit.title': 'Sample kit',
    'kit.description': 'A few good things to start with.',
    'kit.request': 'Request these swatches',
    'kit.continue': 'Continue exploring',
    'kit.remove': 'Remove {name}',
    'kit.metres': '{quantity} metre{plural}',
    'toast.empty': 'Your sample kit is empty.',
    'toast.ready': 'Your sample kit is ready for something lovely.',
    'toast.added': '{name} added to your sample kit.',
    'toast.socialDemo': 'Social links are a concept in this demo.',
    'category.silk': 'Silk',
    'category.linen': 'Linen',
    'category.cotton': 'Cotton',
    'category.all': 'All',
    'category.materials': '{category} / LOOMA MATERIALS',
    'category.materialsZh': '',
    'spec.perMetre': 'From ${price} / metre',
    'product.aerisDescription': 'A fluid, luminous silk with a soft hand and graceful drape. Made for pieces that feel as special as they look.',
    'product.formaDescription': 'Beautifully breathable linen with a relaxed texture that softens with every wash. Woven for everyday rituals.',
    'product.cloudDescription': 'A gentle, balanced cotton with a smooth finish and just enough structure. The quiet essential you keep reaching for.',
    'fibre.mulberry': '100% mulberry silk',
    'fibre.europeanFlax': '100% European flax linen',
    'fibre.longStaple': '100% long-staple cotton',
    'weight.aeris': '22 momme',
    'weight.forma': '235 gsm',
    'weight.cloud': '180 gsm',
    'colour.champagne': 'Champagne',
    'colour.moss': 'Moss',
    'colour.ink': 'Ink',
    'colour.natural': 'Natural',
    'colour.olive': 'Olive',
    'colour.clay': 'Clay',
    'colour.softIvory': 'Soft ivory',
    'colour.sky': 'Sky',
    'colour.sand': 'Sand',
    'product.aeris.name': 'Aeris Silk',
    'product.aeris.color': 'Champagne',
    'product.aeris.fibre': '100% mulberry silk',
    'product.aeris.weight': '22 momme',
    'product.aeris.description': 'A fluid, luminous silk with a soft hand and graceful drape. Made for pieces that feel as special as they look.',
    'product.forma.name': 'Forma Linen',
    'product.forma.color': 'Natural',
    'product.forma.fibre': '100% European flax linen',
    'product.forma.weight': '235 gsm',
    'product.forma.description': 'Beautifully breathable linen with a relaxed texture that softens with every wash. Woven for everyday rituals.',
    'product.cloud.name': 'Cloud Cotton',
    'product.cloud.color': 'Soft ivory',
    'product.cloud.fibre': '100% long-staple cotton',
    'product.cloud.weight': '180 gsm',
    'product.cloud.description': 'A gentle, balanced cotton with a smooth finish and just enough structure. The quiet essential you keep reaching for.',
  },
  zh: {
    'brand.studio': '面料工作室',
    'page.title': 'LOOMA — 面料工作室',
    'page.description': '甄选面料，织就更多可能。探索 LOOMA 面料工作室精心挑选的真丝、亚麻与棉。',
    'a11y.home': 'LOOMA 面料工作室首页',
    'a11y.mainNavigation': '主导航',
    'a11y.switchLanguage': '切换到英文',
    'a11y.openKit': '打开您的面料样卡袋',
    'a11y.openNavigation': '打开导航',
    'a11y.closeNavigation': '关闭导航',
    'a11y.benefits': 'LOOMA 的服务优势',
    'a11y.filterFabrics': '筛选面料',
    'a11y.viewProduct': '查看{name}详情',
    'a11y.removeProduct': '移除{name}',
    'a11y.reduceQuantity': '减少数量',
    'a11y.addQuantity': '增加数量',
    'a11y.closeDetails': '关闭详情',
    'language.button': 'EN',
    'nav.collections': '精选面料',
    'nav.craft': '织造匠心',
    'nav.about': '关于我们',
    'nav.requestSwatches': '索取面料样卡',
    'hero.eyebrow': '甄选面料，织就更多可能。',
    'hero.title': '触见<br /><em>不同。</em>',
    'hero.description': '为每一件作品，也为与之相伴的生活，甄选恰到好处的织物。',
    'hero.explore': '探索精选面料',
    'hero.story': '品牌故事',
    'hero.watchFilm': '观看片头',
    'hero.captionTitle': 'AERIS 真丝',
    'hero.captionDetail': '100% 桑蚕丝&nbsp; · &nbsp;22 姆米',
    'hero.artLabel': '香槟金真丝的雕塑般褶皱',
    'hero.edit': 'AERIS 丝语系列',
    'hero.editCount': '01 — 03',
    'hero.bottomLeft': '让织物融入日常',
    'hero.bottomRight': '始于用心&nbsp; · &nbsp;2024',
    'promise.title': '为<em>美好之物</em>而织。',
    'promise.one': '小批量起订',
    'promise.two': '全球配送',
    'promise.three': '触感自有答案',
    'collection.eyebrow': '用心甄选，每一种质地',
    'collection.title': '美好之作<br /><em>始于触感。</em>',
    'collection.intro': '天然纤维，优雅垂坠；有些品质，无需言明，触手便知。',
    'filter.all': '全部面料',
    'filter.silk': '真丝',
    'filter.linen': '亚麻',
    'filter.cotton': '棉',
    'result.featured': '精选面料',
    'result.fabric': '{category}面料',
    'product.quickView': '快速查看&nbsp; ↗',
    'product.from': '起价 ${price}',
    'product.perMetre': '每米',
    'collection.smallBatches': '小批量起订 · 留白更多可能',
    'collection.specific': '有特别的需求？',
    'craft.eyebrow': '以心意织就',
    'craft.pointOfView': 'LOOMA 的材质主张&nbsp; / &nbsp;01—04',
    'craft.title': '垂坠之间。<br /><em>触感之上。</em>',
    'craft.copy': '有些好，触手即知。多一点分量，柔和一些的肌理，还有天然纤维被妥善甄选后的从容。',
    'craft.about': '认识 LOOMA',
    'craft.swatch': '天然亚麻<br />235 克/平方米',
    'craft.swatchIndex': '02 <span> / 天然质地，不止寻常</span>',
    'craft.statOne': '触感，始终优先',
    'craft.statTwo': '随心而动，自在相伴',
    'craft.statThree': '每一处，都经考量',
    'about.eyebrow': '关于材质的想法',
    'about.aside': '好材料<br />让一切不同。',
    'about.title': '多一点<br /><em>从容考量。</em>',
    'about.lead': 'LOOMA 始于一个朴素的信念：所选择的材质，塑造着作品，也影响着日常相伴的感受。',
    'about.copy': '我们与重视细节的小型织坊和匠人紧密合作。天然纤维、用心整理、坦诚建议。让这份甄选，为你的创作留出自己的空间。',
    'about.link': '认识 LOOMA',
    'about.years': '深耕纺织行业',
    'about.countries': '服务覆盖国家',
    'about.fabrics': '甄选面料品类',
    'contact.eyebrow': '从一次交流开始',
    'contact.title': '下一个灵感，<br /><em>从这里开始。</em>',
    'contact.intro': '告诉我们你的构想，我们一起找到合适的质感。',
    'form.name': '姓名',
    'form.email': '电子邮箱',
    'form.company': '公司或工作室',
    'form.optional': '选填',
    'form.project': '聊聊你的项目',
    'form.namePlaceholder': '怎么称呼你',
    'form.emailPlaceholder': 'you@studio.com',
    'form.companyPlaceholder': '你的创作所在',
    'form.messagePlaceholder': '你正在构思什么？',
    'form.submit': '发送咨询',
    'form.note': '演示用概念表单。<br />信息不会发送或保存。',
    'form.invalid': '请填写姓名、有效邮箱，并简单介绍一下你的项目。',
    'form.success': '感谢留言！本次演示已记录你的咨询，但不会发送任何内容。',
    'footer.tagline': '让材质，多一点意味。',
    'footer.backTop': '返回顶部 ↑',
    'footer.copyright': '© 2024 LOOMA 面料工作室',
    'footer.contact': '联系 LOOMA',
    'footer.instagram': 'Instagram ↗',
    'footer.tiktok': 'TikTok ↗',
    'footer.pinterest': 'Pinterest ↗',
    'footer.replay': '重播开场 ↗',
    'footer.disclaimer': '概念网站。产品与公司信息仅用于示意。',
    'intro.skip': '跳过开场',
    'intro.overline': '开场序言 &nbsp; / &nbsp; 第 001 号',
    'intro.title': '<span>始于</span><em>一种</em><span>感受。</span>',
    'intro.endline': '甄选材质。织就无限可能。',
    'intro.progress': '触感，自有答案',
    'drawer.close': '关闭详情',
    'drawer.index': 'LOOMA / 面料编号 {number}',
    'drawer.colour': '颜色',
    'drawer.quantity': '数量',
    'drawer.metres': '米数',
    'drawer.composition': '成分',
    'drawer.weight': '克重',
    'drawer.minimum': '起订量',
    'drawer.minimumValue': '1 米',
    'drawer.addKit': '加入样卡袋',
    'drawer.askFabric': '咨询这款面料',
    'kit.titleEyebrow': '已选面料',
    'kit.title': '面料样卡袋',
    'kit.description': '从几种心仪质地开始。',
    'kit.request': '索取这些样卡',
    'kit.continue': '继续探索',
    'kit.remove': '移除{name}',
    'kit.metres': '{quantity} 米',
    'toast.empty': '样卡袋还是空的。',
    'toast.ready': '样卡袋已就绪，选几款心仪的质地吧。',
    'toast.added': '已将{name}加入样卡袋。',
    'toast.socialDemo': '社交媒体入口为演示概念。',
    'category.silk': '真丝',
    'category.linen': '亚麻',
    'category.cotton': '棉',
    'category.all': '全部',
    'category.materials': '{category} / LOOMA 面料',
    'category.materialsZh': '',
    'spec.perMetre': '起价 ${price} / 米',
    'product.aerisDescription': '流动而莹润的真丝，触感柔和，垂坠自然。为那些值得被珍视的作品而织。',
    'product.formaDescription': '轻盈透气的亚麻，肌理松弛自在，越洗越柔软。为日常时刻织就。',
    'product.cloudDescription': '温柔平衡的棉，表面细腻，并保有恰好的挺括。成为你总想再次选用的日常之选。',
    'fibre.mulberry': '100% 桑蚕丝',
    'fibre.europeanFlax': '100% 欧洲亚麻',
    'fibre.longStaple': '100% 长绒棉',
    'weight.aeris': '22 姆米',
    'weight.forma': '235 克/平方米',
    'weight.cloud': '180 克/平方米',
    'colour.champagne': '香槟金',
    'colour.moss': '苔绿',
    'colour.ink': '墨色',
    'colour.natural': '原麻色',
    'colour.olive': '橄榄绿',
    'colour.clay': '陶土色',
    'colour.softIvory': '柔象牙白',
    'colour.sky': '晴空蓝',
    'colour.sand': '沙色',
    'product.aeris.name': 'Aeris Silk',
    'product.aeris.color': '香槟金',
    'product.aeris.fibre': '100% 桑蚕丝',
    'product.aeris.weight': '22 姆米',
    'product.aeris.description': '流动而莹润的真丝，触感柔和，垂坠自然。为那些值得被珍视的作品而织。',
    'product.forma.name': 'Forma Linen',
    'product.forma.color': '原麻色',
    'product.forma.fibre': '100% 欧洲亚麻',
    'product.forma.weight': '235 克/平方米',
    'product.forma.description': '轻盈透气的亚麻，肌理松弛自在，越洗越柔软。为日常时刻织就。',
    'product.cloud.name': 'Cloud Cotton',
    'product.cloud.color': '柔象牙白',
    'product.cloud.fibre': '100% 长绒棉',
    'product.cloud.weight': '180 克/平方米',
    'product.cloud.description': '温柔平衡的棉，表面细腻，并保有恰好的挺括。成为你总想再次选用的日常之选。',
  },
};

// Fixed, trusted presentation strings for the hand-authored page. Dynamic
// product, kit, validation, and toast copy is exposed through t() below.
const staticNodes = [
  ['.wordmark > span', 'brand.studio'],
  ['.footer-wordmark > span', 'brand.studio'],
  ['.intro-wordmark-small > span', 'brand.studio'],
  ['.main-nav a:nth-child(1)', 'nav.collections'],
  ['.main-nav a:nth-child(2)', 'nav.craft'],
  ['.main-nav a:nth-child(3)', 'nav.about'],
  ['.header-cta', 'nav.requestSwatches'],
  ['.hero .eyebrow', 'hero.eyebrow'],
  ['#hero-title', 'hero.title', 'html'],
  ['.hero-description', 'hero.description'],
  ['.hero-actions .button', 'hero.explore'],
  ['.hero-actions .text-link', 'hero.story'],
  ['.hero-film-link', 'hero.watchFilm'],
  ['.hero-caption strong', 'hero.captionTitle'],
  ['.hero-caption small', 'hero.captionDetail', 'html'],
  ['.hero-art', 'hero.artLabel', 'aria'],
  ['.hero-art-note span:first-child', 'hero.edit'],
  ['.hero-art-note span:last-child', 'hero.editCount'],
  ['.hero-bottom span:first-child', 'hero.bottomLeft'],
  ['.hero-bottom span:last-child', 'hero.bottomRight', 'html'],
  ['.promise-strip', 'a11y.benefits', 'aria'],
  ['.promise-strip p', 'promise.title', 'html'],
  ['.promise-strip > span:nth-of-type(1)', 'promise.one'],
  ['.promise-strip > span:nth-of-type(2)', 'promise.two'],
  ['.promise-strip > span:nth-of-type(3)', 'promise.three'],
  ['.collection .section-heading .eyebrow', 'collection.eyebrow'],
  ['#collection-title', 'collection.title', 'html'],
  ['.section-intro', 'collection.intro'],
  ['.filter-row', 'a11y.filterFabrics', 'aria'],
  ['.filter-chip[data-filter="all"]', 'filter.all'],
  ['.filter-chip[data-filter="silk"]', 'filter.silk'],
  ['.filter-chip[data-filter="linen"]', 'filter.linen'],
  ['.filter-chip[data-filter="cotton"]', 'filter.cotton'],
  ['.result-count', 'result.featured', 'result'],
  ['.collection-foot > span', 'collection.smallBatches'],
  ['.collection-foot .text-link', 'collection.specific'],
  ['.craft-top .eyebrow', 'craft.eyebrow'],
  ['.craft-top > span', 'craft.pointOfView', 'html'],
  ['#craft-title', 'craft.title', 'html'],
  ['.craft-copy > p', 'craft.copy'],
  ['.craft-copy .button', 'craft.about'],
  ['.swatch-caption', 'craft.swatch', 'html'],
  ['.swatch-index', 'craft.swatchIndex', 'html'],
  ['.craft-stats > div:nth-child(1) span', 'craft.statOne'],
  ['.craft-stats > div:nth-child(2) span', 'craft.statTwo'],
  ['.craft-stats > div:nth-child(3) span', 'craft.statThree'],
  ['.about-aside .eyebrow', 'about.eyebrow'],
  ['.about-aside > p:last-child', 'about.aside', 'html'],
  ['#about-title', 'about.title', 'html'],
  ['.about-lead', 'about.lead'],
  ['.about-main > p:nth-of-type(2)', 'about.copy'],
  ['.about-main .text-link', 'about.link'],
  ['.about-numbers > div:nth-child(1) small', 'about.years'],
  ['.about-numbers > div:nth-child(2) small', 'about.countries'],
  ['.about-numbers > div:nth-child(3) small', 'about.fabrics'],
  ['.contact-heading .eyebrow', 'contact.eyebrow'],
  ['#contact-title', 'contact.title', 'html'],
  ['.contact-heading > p:last-child', 'contact.intro'],
  ['.contact-form label:nth-child(1)', 'form.name', 'label'],
  ['.contact-form label:nth-child(2)', 'form.email', 'label'],
  ['.contact-form .form-row + label', 'form.company', 'label-company'],
  ['.contact-form .form-row + label .optional', 'form.optional'],
  ['.contact-form > label:last-of-type', 'form.project', 'label'],
  ['input[name="name"]', 'form.namePlaceholder', 'placeholder'],
  ['input[name="email"]', 'form.emailPlaceholder', 'placeholder'],
  ['input[name="company"]', 'form.companyPlaceholder', 'placeholder'],
  ['textarea[name="message"]', 'form.messagePlaceholder', 'placeholder'],
  ['.contact-form [type="submit"]', 'form.submit'],
  ['.form-note', 'form.note', 'html'],
  ['.footer-main > p', 'footer.tagline'],
  ['.back-top', 'footer.backTop'],
  ['.footer-links > span', 'footer.copyright'],
  ['.footer-links > div:first-of-type a[href="#collections"]', 'nav.collections'],
  ['.footer-links > div:first-of-type a[href="#craft"]', 'nav.craft'],
  ['.footer-links > div:first-of-type a[href="#about"]', 'nav.about'],
  ['.footer-links > div:first-of-type a[href="#contact"]', 'footer.contact'],
  ['.footer-social[data-demo-social="TikTok"]', 'footer.tiktok'],
  ['.footer-social[data-demo-social="Instagram"]', 'footer.instagram'],
  ['.replay-intro', 'footer.replay'],
  ['.disclaimer', 'footer.disclaimer'],
  ['.skip-intro', 'intro.skip'],
  ['.intro-overline', 'intro.overline', 'html'],
  ['.intro-copy h2', 'intro.title', 'html'],
  ['.intro-end > p', 'intro.endline'],
  ['.intro-progress > span', 'intro.progress'],
  ['.drawer-close', 'drawer.close', 'aria'],
  ['.drawer-index', 'drawer.index', 'formatted'],
  ['.option-heading > span:first-child', 'drawer.colour'],
  ['.product-details > .option-block:nth-of-type(3) .option-heading > span:first-child', 'drawer.quantity'],
  ['.product-details > .option-block:nth-of-type(3) .option-heading > span:nth-child(2)', 'drawer.metres'],
  ['.drawer-specs', 'drawer.specLabels', 'spec-labels'],
  ['.add-to-kit', 'drawer.addKit'],
  ['.drawer-enquiry:not(.kit-continue)', 'drawer.askFabric'],
  ['.kit-view .eyebrow', 'kit.titleEyebrow'],
  ['.kit-view h2', 'kit.title'],
  ['.kit-view > .drawer-description', 'kit.description'],
  ['.kit-enquiry', 'kit.request'],
  ['.kit-continue', 'kit.continue'],
];

let locale = 'en';
let initialized = false;

export function getLocale() {
  return locale;
}

export function t(key, params = {}) {
  const template = messages[locale]?.[key] ?? messages.en[key] ?? key;
  return String(template).replace(/\{([\w]+)\}/g, (_, name) => String(params[name] ?? `{${name}}`));
}

export function setLocale(nextLocale) {
  if (!LOCALES.includes(nextLocale) || nextLocale === locale) return locale;
  locale = nextLocale;
  try { window.localStorage.setItem(STORAGE_KEY, locale); } catch { /* storage may be disabled */ }
  applyStaticText();
  window.dispatchEvent(new CustomEvent('looma:languagechange', { detail: { locale } }));
  return locale;
}

function setLabelText(element, text, keepOptional = false) {
  const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) textNode.textContent = `${text}${keepOptional ? ' ' : ''}`;
}

function setTextPreservingChildren(element, text) {
  const textNodes = [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE);
  if (textNodes.length) {
    textNodes[0].textContent = text;
    textNodes.slice(1).forEach((node) => { if (node.textContent.trim()) node.textContent = ''; });
  } else element.textContent = text;
}

function applyStaticText() {
  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
  document.title = t('page.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('page.description'));
  document.querySelector('.wordmark')?.setAttribute('aria-label', t('a11y.home'));
  document.querySelector('.main-nav')?.setAttribute('aria-label', t('a11y.mainNavigation'));
  document.querySelector('.language-switch')?.setAttribute('aria-label', locale === 'en' ? 'Switch to Chinese' : '切换到英文');
  document.querySelector('.bag-button')?.setAttribute('aria-label', t('a11y.openKit'));
  const menu = document.querySelector('.menu-toggle');
  if (menu) menu.setAttribute('aria-label', menu.getAttribute('aria-expanded') === 'true' ? t('a11y.closeNavigation') : t('a11y.openNavigation'));
  document.querySelector('.drawer-close')?.setAttribute('aria-label', t('a11y.closeDetails'));
  document.querySelector('.quantity-control [data-qty="-1"]')?.setAttribute('aria-label', t('a11y.reduceQuantity'));
  document.querySelector('.quantity-control [data-qty="1"]')?.setAttribute('aria-label', t('a11y.addQuantity'));

  for (const [selector, key, mode] of staticNodes) {
    if (mode === 'result' || mode === 'spec-labels' || mode === 'formatted') continue;
    const element = document.querySelector(selector);
    if (!element) continue;
    const value = t(key);
    if (mode === 'aria') element.setAttribute('aria-label', value);
    else if (mode === 'placeholder') element.setAttribute('placeholder', value);
    else if (mode === 'label') setLabelText(element, value);
    else if (mode === 'label-company') setLabelText(element, value, true);
    else if (mode === 'html') element.innerHTML = value;
    else setTextPreservingChildren(element, value);
  }

  document.querySelectorAll('[data-i18n]').forEach((element) => setTextPreservingChildren(element, t(element.dataset.i18n)));
  document.querySelectorAll('[data-i18n-html]').forEach((element) => { element.innerHTML = t(element.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => element.setAttribute('placeholder', t(element.dataset.i18nPlaceholder)));
  document.querySelectorAll('[data-i18n-aria]').forEach((element) => element.setAttribute('aria-label', t(element.dataset.i18nAria)));

  const switchButton = document.querySelector('.language-switch');
  if (switchButton) switchButton.textContent = t('language.button');
  const count = document.querySelector('.result-count');
  if (count) {
    const active = document.querySelector('.filter-chip.is-active')?.dataset.filter ?? 'all';
    const visible = active === 'all' ? 3 : 1;
    count.innerHTML = `${String(visible).padStart(2, '0')} <span> / ${active === 'all' ? t('result.featured') : t('result.fabric', { category: t(`category.${active}`).toUpperCase(), plural: '' })}</span>`;
  }
  const specs = document.querySelector('.drawer-specs');
  if (specs?.children.length) {
    const labels = [t('drawer.composition'), t('drawer.weight'), t('drawer.minimum')];
    [...specs.children].forEach((row, index) => { if (row.children[0]) row.children[0].textContent = labels[index] ?? ''; });
  }
  const drawerIndex = document.querySelector('.drawer-index');
  if (drawerIndex) {
    const match = drawerIndex.textContent.match(/(?:NO\.|编号)\s*(\d+)/i);
    drawerIndex.textContent = t('drawer.index', { number: match?.[1] ?? '01' });
  }
  const quantityUnit = document.querySelector('.quantity-unit');
  if (quantityUnit) quantityUnit.textContent = locale === 'zh' ? '米' : 'm';
  document.querySelectorAll('.colour-choice').forEach((button) => {
    const colourKeys = { Champagne: 'colour.champagne', Moss: 'colour.moss', Ink: 'colour.ink', Natural: 'colour.natural', Olive: 'colour.olive', Clay: 'colour.clay', 'Soft ivory': 'colour.softIvory', Sky: 'colour.sky', Sand: 'colour.sand' };
    const colourKey = colourKeys[button.dataset.colour];
    if (colourKey) button.setAttribute('aria-label', messages[locale][colourKey] ?? button.dataset.colour);
  });
}

export function initI18n() {
  if (initialized || typeof document === 'undefined') return;
  initialized = true;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (LOCALES.includes(saved)) locale = saved;
  } catch { /* storage may be disabled */ }
  applyStaticText();
  document.querySelector('.language-switch')?.addEventListener('click', () => setLocale(locale === 'en' ? 'zh' : 'en'));
}
