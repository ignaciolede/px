/* @ds-bundle: {"format":4,"namespace":"PX","components":[{"name":"Button"},{"name":"StageSwitch"},{"name":"Chip"},{"name":"TripCard"},{"name":"AvatarStack"},{"name":"PollOption"},{"name":"BalanceRow"},{"name":"ItineraryItem"},{"name":"TextField"},{"name":"BottomNav"},{"name":"Icon"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function omit(o, keys) { var r = {}; for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]; return r; }

  /* Íconos: trazo 2px, puntas redondas (reemplazo provisorio de Lucide). */
  var PATHS = {
    plus: [['path', { d: 'M12 5v14M5 12h14' }]],
    check: [['path', { d: 'M5 12.5l4.5 4.5L19 7' }]],
    chevron: [['path', { d: 'M9 6l6 6-6 6' }]],
    home: [['path', { d: 'M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z' }]],
    route: [['circle', { cx: 6, cy: 18, r: 2 }], ['circle', { cx: 18, cy: 6, r: 2 }], ['path', { d: 'M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7' }]],
    wallet: [['rect', { x: 3, y: 6, width: 18, height: 13, rx: 3 }], ['path', { d: 'M3 10h18M16 14.5h2' }]],
    user: [['circle', { cx: 12, cy: 8, r: 4 }], ['path', { d: 'M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5' }]],
    calendar: [['rect', { x: 3, y: 5, width: 18, height: 16, rx: 3 }], ['path', { d: 'M3 10h18M8 3v4M16 3v4' }]],
    pin: [['path', { d: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z' }], ['circle', { cx: 12, cy: 9.5, r: 2.5 }]],
    baul: [['rect', { x: 3, y: 7, width: 18, height: 13, rx: 3 }], ['path', { d: 'M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18' }]],
    vote: [['path', { d: 'M5 12l4 4 10-10' }], ['path', { d: 'M4 20h16' }]]
  };
  function Icon(p) {
    var size = p.size || 20;
    var parts = PATHS[p.name] || [];
    return h('svg', { className: cx('px-icon', p.className), width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': p.label ? undefined : 'true', role: p.label ? 'img' : undefined, 'aria-label': p.label },
      parts.map(function (e, i) { return h(e[0], Object.assign({ key: i }, e[1])); }));
  }

  function Button(p) {
    var variant = p.variant || 'primario', size = p.size || 'md';
    var rest = omit(p, ['variant', 'size', 'icon', 'iconRight', 'full', 'className', 'children']);
    return h('button', Object.assign({ type: 'button' }, rest, { className: cx('px-btn', 'px-btn--' + variant, 'px-btn--' + size, p.full && 'px-btn--full', p.className) }),
      p.icon && h(Icon, { name: p.icon }), p.children && h('span', null, p.children), p.iconRight && h(Icon, { name: p.iconRight }));
  }

  var STAGES = [{ id: 'previaje', label: 'Previaje' }, { id: 'viaje', label: 'Viaje' }, { id: 'post', label: 'Post-viaje' }];
  function StageSwitch(p) {
    var st = React.useState(p.defaultValue || 'previaje');
    var value = p.value !== undefined ? p.value : st[0];
    function pick(id) { if (p.value === undefined) st[1](id); if (p.onChange) p.onChange(id); }
    return h('div', { className: cx('px-stage', p.className), role: 'tablist', 'aria-label': 'Etapa del viaje' },
      STAGES.map(function (s) {
        var on = s.id === value;
        return h('button', { key: s.id, type: 'button', role: 'tab', 'aria-selected': on, className: cx('px-stage__tab', on && 'px-stage__tab--on px-tone-' + s.id), onClick: function () { pick(s.id); } },
          h('span', { className: 'px-stage__dot', 'aria-hidden': 'true' }), s.label);
      }));
  }

  function Chip(p) {
    var tone = p.tone || 'neutro';
    var rest = omit(p, ['tone', 'selected', 'className', 'children', 'icon']);
    return h('button', Object.assign({ type: 'button', 'aria-pressed': !!p.selected }, rest, { className: cx('px-chip', p.selected && 'px-chip--on', p.selected && 'px-tone-' + tone, p.className) }),
      p.selected ? h(Icon, { name: 'check', size: 16 }) : (p.icon && h(Icon, { name: p.icon, size: 16 })), h('span', null, p.children));
  }

  function initials(n) { return n.split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase(); }
  var AV_TONES = ['previaje', 'viaje', 'post', 'papel'];
  function AvatarStack(p) {
    var people = p.people || [], max = p.max || 4;
    var shown = people.slice(0, max), extra = people.length - shown.length;
    return h('div', { className: cx('px-avatars', p.className), 'aria-label': people.length + ' personas: ' + people.join(', ') },
      shown.map(function (n, i) { return h('span', { key: n + i, className: 'px-avatar px-avatar--' + AV_TONES[i % 4], title: n, 'aria-hidden': 'true' }, initials(n)); }),
      extra > 0 && h('span', { className: 'px-avatar px-avatar--mas', 'aria-hidden': 'true' }, '+' + extra));
  }

  var STAGE_LABEL = { previaje: 'Previaje', viaje: 'Viaje', post: 'Post-viaje' };
  function TripCard(p) {
    var stage = p.stage || 'previaje';
    var rest = omit(p, ['title', 'dates', 'stage', 'people', 'image', 'pending', 'className', 'place']);
    return h('a', Object.assign({ href: '#' }, rest, { className: cx('px-trip', p.className) }),
      h('div', { className: cx('px-trip__media', p.image ? 'px-trip__media--foto' : 'px-tone-' + stage + '-tinte'), style: p.image ? { backgroundImage: 'url(' + p.image + ')' } : undefined },
        h('span', { className: 'px-badge px-tone-' + stage }, STAGE_LABEL[stage]),
        p.place && h('span', { className: cx('px-trip__place', p.image && 'px-trip__place--foto') }, p.place)),
      h('div', { className: 'px-trip__body' },
        h('div', { className: 'px-trip__text' },
          h('h3', { className: 'px-trip__title' }, p.title),
          h('p', { className: 'px-trip__dates' }, h(Icon, { name: 'calendar', size: 16 }), p.dates)),
        h(AvatarStack, { people: p.people || [], max: 3 })),
      p.pending && h('p', { className: 'px-trip__pending' }, h('span', { className: 'px-trip__pending-dot', 'aria-hidden': 'true' }), p.pending));
  }

  function PollOption(p) {
    var pct = p.total ? Math.round((p.votes / p.total) * 100) : 0;
    return h('button', { type: 'button', className: cx('px-poll', p.voted && 'px-poll--on', p.className), 'aria-pressed': !!p.voted, onClick: p.onVote },
      h('span', { className: 'px-poll__bar', style: { width: pct + '%' }, 'aria-hidden': 'true' }),
      h('span', { className: 'px-poll__check', 'aria-hidden': 'true' }, p.voted && h(Icon, { name: 'check', size: 16 })),
      h('span', { className: 'px-poll__text' },
        h('span', { className: 'px-poll__label' }, p.label),
        p.detail && h('span', { className: 'px-poll__detail' }, p.detail)),
      h('span', { className: 'px-poll__count' }, p.votes + (p.votes === 1 ? ' voto' : ' votos')));
  }

  function money(n) { return '$ ' + Math.abs(n).toLocaleString('es-AR'); }
  function BalanceRow(p) {
    var dir = p.direction || (p.amount > 0 ? 'a-favor' : p.amount < 0 ? 'pendiente' : 'a-mano');
    var phrase = dir === 'a-favor' ? p.name + ' te tiene que devolver' : dir === 'pendiente' ? 'Te falta poner con ' + p.name : 'Están a mano con ' + p.name;
    var sign = dir === 'a-favor' ? '+ ' : dir === 'pendiente' ? '− ' : '';
    return h('div', { className: cx('px-balance', p.className) },
      h(AvatarStack, { people: [p.name], max: 1 }),
      h('span', { className: 'px-balance__text' }, phrase),
      h('span', { className: 'px-balance__amount px-balance__amount--' + dir }, dir === 'a-mano' ? h(Icon, { name: 'check', size: 18, label: 'a mano' }) : sign + money(p.amount)));
  }

  function ItineraryItem(p) {
    return h('div', { className: cx('px-iti', p.current && 'px-iti--now', p.done && 'px-iti--done', p.last && 'px-iti--last', p.className) },
      h('div', { className: 'px-iti__rail', 'aria-hidden': 'true' }, h('span', { className: 'px-iti__dot' }, p.done && h(Icon, { name: 'check', size: 14 }))),
      h('div', { className: 'px-iti__card' },
        h('span', { className: 'px-iti__time' }, p.time, p.current && h('span', { className: 'px-badge px-tone-viaje' }, 'Ahora')),
        h('span', { className: 'px-iti__title' }, p.title),
        p.place && h('span', { className: 'px-iti__place' }, h(Icon, { name: 'pin', size: 16 }), p.place)));
  }

  var fid = 0;
  function TextField(p) {
    var idRef = React.useRef(null); if (!idRef.current) idRef.current = p.id || 'px-f' + (++fid);
    var id = idRef.current, hint = p.error || p.hint;
    var rest = omit(p, ['label', 'hint', 'error', 'className', 'id']);
    return h('div', { className: cx('px-field', p.error && 'px-field--error', p.className) },
      h('label', { className: 'px-field__label', htmlFor: id }, p.label),
      h('input', Object.assign({}, rest, { id: id, className: 'px-field__input', 'aria-invalid': !!p.error, 'aria-describedby': hint ? id + '-h' : undefined })),
      hint && h('span', { id: id + '-h', className: 'px-field__hint' }, hint));
  }

  var NAV = [{ id: 'resumen', label: 'Resumen', icon: 'home' }, { id: 'plan', label: 'Plan', icon: 'route' }, { id: 'cuentas', label: 'Cuentas', icon: 'wallet' }, { id: 'baul', label: 'Baúl', icon: 'baul' }];
  function BottomNav(p) {
    var items = p.items || NAV;
    var st = React.useState(p.defaultActive || items[0].id);
    var active = p.active !== undefined ? p.active : st[0];
    return h('nav', { className: cx('px-nav', p.className), 'aria-label': 'Principal' },
      items.map(function (it) {
        var on = it.id === active;
        return h('button', { key: it.id, type: 'button', className: cx('px-nav__item', on && 'px-nav__item--on'), 'aria-current': on ? 'page' : undefined, onClick: function () { if (p.active === undefined) st[1](it.id); if (p.onChange) p.onChange(it.id); } },
          h(Icon, { name: it.icon, size: 22 }), h('span', null, it.label));
      }));
  }

  window.PX = Object.assign(window.PX || {}, { Button: Button, StageSwitch: StageSwitch, Chip: Chip, TripCard: TripCard, AvatarStack: AvatarStack, PollOption: PollOption, BalanceRow: BalanceRow, ItineraryItem: ItineraryItem, TextField: TextField, BottomNav: BottomNav, Icon: Icon });
})();
