// Three Clocks — original line-art pictograms, one per key event.
// Every drawing uses a 120×100 viewBox. Plain shapes are stroked and draw themselves in;
// class "f" is a soft colour fill and class "s" a solid accent, both fading in once the lines are done.
const ART = {
  scroll: `<rect class="f" x="30" y="22" width="60" height="56"/>
    <rect x="22" y="12" width="76" height="10" rx="5"/><rect x="22" y="78" width="76" height="10" rx="5"/>
    <path d="M30 22 V78 M90 22 V78"/><path d="M40 34 H80 M40 44 H80 M40 54 H70 M40 64 H76"/>`,

  mound: `<path class="f" d="M12 86 L28 64 H50 L56 50 H84 L102 86 Z"/>
    <path d="M6 86 H114"/><path d="M12 86 L28 64 H50 L56 50 H84 L102 86"/>
    <path d="M62 50 V38 H78 V50"/><path d="M58 38 L70 28 L82 38"/><circle cx="100" cy="22" r="7"/>`,

  crown: `<path class="f" d="M24 72 L18 32 L42 52 L60 24 L78 52 L102 32 L96 72 Z"/>
    <path d="M24 72 L18 32 L42 52 L60 24 L78 52 L102 32 L96 72 Z"/><rect x="24" y="72" width="72" height="12" rx="2"/>
    <circle cx="60" cy="18" r="4"/><circle cx="16" cy="27" r="3.5"/><circle cx="104" cy="27" r="3.5"/>`,

  snowfort: `<path class="f" d="M20 88 V40 H100 V88 Z"/>
    <path d="M20 88 V40 H32 V32 H42 V40 H54 V32 H66 V40 H78 V32 H88 V40 H100 V88"/><path d="M48 88 V68 A12 12 0 0 1 72 68 V88"/>
    <path d="M12 10 V24 M5 17 H19 M7 12 L17 22 M17 12 L7 22"/><path d="M104 8 V20 M98 14 H110 M100 10 L108 18 M108 10 L100 18"/>
    <path d="M60 6 V16 M55 11 H65"/><path d="M8 88 H112"/>`,

  kabuto: `<path class="f" d="M30 62 A30 28 0 0 1 90 62 Z"/>
    <path d="M30 62 A30 28 0 0 1 90 62"/><path d="M60 40 L40 10 M60 40 L80 10"/><circle cx="60" cy="44" r="5"/>
    <path d="M24 62 H96 L106 82 H14 Z"/><path d="M19 72 H101"/><path d="M30 62 L20 50 M90 62 L100 50"/>`,

  drown: `<path class="f" d="M38 54 L34 30 L50 42 L60 22 L70 42 L86 30 L82 54 Z" transform="rotate(-14 60 40)"/>
    <path d="M38 54 L34 30 L50 42 L60 22 L70 42 L86 30 L82 54 Z" transform="rotate(-14 60 40)"/>
    <path d="M6 66 C16 60 24 60 34 66 S52 72 62 66 S80 60 90 66 S106 72 114 66"/>
    <path d="M14 80 C22 75 30 75 38 80 S54 85 62 80 S78 75 86 80 S100 85 108 80"/>
    <path d="M30 92 C38 88 44 88 52 92 S66 96 74 92 S86 88 92 92"/>`,

  cliff: `<path class="f" d="M6 12 H114 V46 Q96 32 60 32 Q24 32 6 46 Z"/>
    <path d="M6 12 H114 V46 Q96 32 60 32 Q24 32 6 46 Z"/>
    <path d="M14 80 V60 H32 V80 M32 80 V52 H54 V80 M54 80 V62 H72 V80 M72 80 V56 H90 V80"/>
    <path d="M94 80 V58 A8 4 0 0 1 110 58 V80"/><path d="M40 60 H46 V66 H40 Z M60 68 H65 V74 H60 Z M20 66 H25 V71 H20 Z M78 62 H83 V68 H78 Z"/>
    <path d="M6 80 H114"/><path d="M6 80 L14 94 M114 80 L104 94"/>`,

  bow: `<path d="M44 10 Q6 50 44 90"/><path d="M44 10 Q50 8 50 14 M44 90 Q50 92 50 86"/><path d="M48 13 V87"/>
    <path d="M48 50 H110"/><path d="M110 50 L99 44 M110 50 L99 56"/><path d="M56 50 L50 43 M56 50 L50 57 M63 50 L57 43 M63 50 L57 57"/>`,

  storm: `<path class="f" d="M8 84 C24 84 26 58 46 58 C62 58 66 74 56 76 L52 84 Z"/>
    <circle cx="80" cy="30" r="8"/><path d="M72 30 C72 16 84 10 98 12 M88 30 C88 44 76 50 62 48"/>
    <path d="M8 84 C24 84 26 58 46 58 C62 58 66 74 56 76 C48 78 46 68 52 66"/>
    <path d="M60 84 C72 84 78 70 92 70 C104 70 108 80 114 80"/><path d="M6 90 H114"/>`,

  corn: `<path class="f" d="M60 14 C76 22 78 60 66 84 C62 90 58 90 54 84 C42 60 44 22 60 14 Z"/>
    <path d="M60 14 C76 22 78 60 66 84 C62 90 58 90 54 84 C42 60 44 22 60 14 Z"/>
    <path d="M51 32 H69 M49 44 H71 M49 56 H71 M51 68 H69 M60 18 V84"/>
    <path d="M54 86 C40 76 30 58 33 38 C42 56 50 66 58 76"/><path d="M66 86 C80 76 90 58 87 38 C78 56 70 66 62 76"/>`,

  skull: `<path class="f" d="M60 14 C34 14 26 36 30 54 C32 62 38 64 40 70 V80 H80 V70 C82 64 88 62 90 54 C94 36 86 14 60 14 Z"/>
    <path d="M60 14 C34 14 26 36 30 54 C32 62 38 64 40 70 V80 H80 V70 C82 64 88 62 90 54 C94 36 86 14 60 14 Z"/>
    <circle cx="47" cy="47" r="8"/><circle cx="73" cy="47" r="8"/><path d="M60 57 L55 66 H65 Z"/><path d="M50 80 V72 M60 80 V72 M70 80 V72"/>`,

  press: `<path d="M28 92 V12 M92 92 V12 M20 12 H100 M20 26 H100"/><path d="M60 26 V48"/>
    <path d="M54 30 L66 34 M54 36 L66 40 M54 42 L66 46"/><path d="M60 38 L90 32"/>
    <rect x="42" y="48" width="36" height="8" rx="1"/><rect class="f" x="40" y="62" width="40" height="8"/><path d="M20 70 H100"/>`,

  fire: `<path class="f" d="M60 8 C70 20 66 28 72 34 C76 28 82 32 80 40 C78 48 70 52 60 52 C50 52 42 48 41 40 C40 32 46 28 49 24 C51 30 55 30 55 25 C55 18 57 14 60 8 Z"/>
    <path d="M60 8 C70 20 66 28 72 34 C76 28 82 32 80 40 C78 48 70 52 60 52 C50 52 42 48 41 40 C40 32 46 28 49 24 C51 30 55 30 55 25 C55 18 57 14 60 8 Z"/>
    <path d="M30 50 C25 42 32 37 30 30 C38 36 40 44 36 50 M90 50 C95 42 88 37 90 30 C82 36 80 44 84 50"/>
    <path d="M12 62 Q34 58 44 54 H76 Q86 58 108 62"/><path d="M22 62 H98"/><path d="M30 62 V88 M50 62 V88 M70 62 V88 M90 62 V88"/><path d="M12 88 H108"/>`,

  longhouse: `<path class="f" d="M10 82 V54 C10 40 30 34 60 34 C90 34 110 40 110 54 V82 Z"/>
    <path d="M10 82 V54 C10 40 30 34 60 34 C90 34 110 40 110 54 V82"/><path d="M30 37 V82 M90 37 V82"/>
    <path d="M52 82 V66 A8 8 0 0 1 68 66 V82"/><path d="M42 34 C38 26 46 22 42 14 M78 34 C82 26 74 22 78 14"/><path d="M4 82 H116"/>`,

  caravel: `<path class="f" d="M14 66 H106 L96 82 H26 Z"/>
    <path d="M14 66 H106 L96 82 H26 Z"/><path d="M44 66 V16 M76 66 V24"/>
    <path d="M32 24 Q44 32 56 24 V46 Q44 54 32 46 Z"/><path d="M66 32 Q76 38 86 32 V52 Q76 58 66 52 Z"/><path d="M44 16 L56 20 L44 24"/>
    <path d="M6 90 C12 86 18 86 24 90 S36 94 42 90 S54 86 60 90 S72 94 78 90 S90 86 96 90 S108 94 114 90"/>`,

  globe: `<circle class="f" cx="60" cy="44" r="30"/><circle cx="60" cy="44" r="30"/><ellipse cx="60" cy="44" rx="12" ry="30"/>
    <path d="M30 44 H90 M35 29 H85 M35 59 H85"/><path d="M24 40 A36 36 0 0 0 86 72"/><path d="M60 80 V88 M44 92 H76"/>`,

  banners: `<path d="M30 92 V12 M60 92 V8 M90 92 V12"/>
    <path class="f" d="M30 16 H44 V56 H30 Z M60 12 H74 V52 H60 Z M90 16 H104 V56 H90 Z"/>
    <path d="M30 16 H44 V56 H30 M60 12 H74 V52 H60 M90 16 H104 V56 H90"/>
    <circle cx="37" cy="28" r="4"/><circle cx="67" cy="24" r="4"/><circle cx="97" cy="28" r="4"/><path d="M14 92 H106"/>`,

  book: `<path class="f" d="M60 26 C46 18 26 18 12 22 V82 C26 78 46 78 60 86 C74 78 94 78 108 82 V22 C94 18 74 18 60 26 Z"/>
    <path d="M60 26 C46 18 26 18 12 22 V82 C26 78 46 78 60 86 C74 78 94 78 108 82 V22 C94 18 74 18 60 26 Z M60 26 V86"/>
    <path d="M22 36 C32 34 42 34 50 38 M22 48 C32 46 42 46 50 50 M22 60 C32 58 42 58 50 62"/>
    <path d="M70 38 C78 34 88 34 98 36 M70 50 C78 46 88 46 98 48 M70 62 C78 58 88 58 98 60"/>`,

  anatomy: `<path class="f" d="M60 26 C46 18 26 18 12 22 V82 C26 78 46 78 60 86 C74 78 94 78 108 82 V22 C94 18 74 18 60 26 Z"/>
    <path d="M60 26 C46 18 26 18 12 22 V82 C26 78 46 78 60 86 C74 78 94 78 108 82 V22 C94 18 74 18 60 26 Z M60 26 V86"/>
    <path d="M22 36 C32 34 42 34 50 38 M22 48 C32 46 42 46 50 50 M22 60 C32 58 42 58 50 62"/>
    <circle cx="84" cy="30" r="5"/><path d="M84 35 V74"/>
    <path d="M84 42 C76 42 72 46 72 50 M84 42 C92 42 96 46 96 50 M84 52 C76 52 72 56 72 60 M84 52 C92 52 96 56 96 60 M84 62 C78 62 75 65 75 68 M84 62 C90 62 93 65 93 68"/>`,

  temple: `<path class="f" d="M16 88 V76 H24 V64 H32 V52 H40 V40 H80 V52 H88 V64 H96 V76 H104 V88 Z"/>
    <path d="M10 88 H110"/><path d="M16 88 V76 H24 V64 H32 V52 H40 V40 H80 V52 H88 V64 H96 V76 H104 V88"/>
    <path d="M52 40 V88 M68 40 V88 M52 52 H68 M52 64 H68 M52 76 H68"/>
    <path d="M42 40 V26 H56 V40 M64 40 V26 H78 V40 M40 26 L49 16 L58 26 M62 26 L71 16 L80 26"/>`,

  musket: `<path class="f" d="M36 50 H114 V56 H36 Z"/><path d="M36 50 H114 V56 H36"/>
    <path d="M36 50 H26 L6 66 L11 77 L32 63 H52 V56"/><path d="M46 56 Q41 66 49 70"/><path d="M56 63 Q58 71 52 74"/>
    <path d="M116 46 C122 40 114 36 118 28 C122 22 116 18 118 12"/>`,

  orbit: `<circle class="f" cx="60" cy="50" r="12"/><circle cx="60" cy="50" r="12"/>
    <path d="M60 30 V34 M60 66 V70 M40 50 H44 M76 50 H80 M46 36 L49 39 M71 61 L74 64 M74 36 L71 39 M49 61 L46 64"/>
    <ellipse cx="60" cy="50" rx="48" ry="26"/><circle cx="100" cy="36" r="6"/><circle cx="111" cy="27" r="2.5"/>`,

  compass: `<circle cx="60" cy="50" r="36"/><path class="f" d="M60 10 L66 44 L100 50 L66 56 L60 90 L54 56 L20 50 L54 44 Z"/>
    <path d="M60 10 L66 44 L100 50 L66 56 L60 90 L54 56 L20 50 L54 44 Z"/><path d="M41 31 L55 45 M79 31 L65 45 M41 69 L55 55 M79 69 L65 55"/>
    <circle cx="60" cy="50" r="3"/>`,

  scales: `<path d="M60 18 V86 M40 88 H80"/><circle cx="60" cy="14" r="4"/><path d="M22 28 H98"/>
    <path d="M24 28 L14 54 M24 28 L34 54 M96 28 L86 54 M96 28 L106 54"/>
    <path class="f" d="M12 54 H36 A12 8 0 0 1 12 54 Z M84 54 H108 A12 8 0 0 1 84 54 Z"/><path d="M12 54 H36 A12 8 0 0 1 12 54 M84 54 H108 A12 8 0 0 1 84 54"/>`,

  fort: `<path class="f" d="M24 90 V44 H96 V90 Z"/><path d="M24 90 V44 H34 V36 H44 V44 H56 V36 H66 V44 H76 V36 H86 V44 H96 V90"/>
    <path d="M50 90 V72 A10 10 0 0 1 70 72 V90"/><path d="M60 36 V8"/><path d="M60 8 L80 13 L60 18"/><path d="M8 90 H112"/>`,

  castle: `<path class="f" d="M18 92 L26 72 H94 L102 92 Z"/><path d="M18 92 L26 72 H94 L102 92 Z"/>
    <path d="M32 72 V62 H88 V72"/><path d="M20 62 Q44 58 48 52 H72 Q76 58 100 62"/>
    <path d="M40 52 V44 H80 V52"/><path d="M30 44 Q48 40 52 34 H68 Q72 40 90 44"/>
    <path d="M48 34 V28 H72 V34"/><path d="M42 28 Q56 24 60 14 Q64 24 78 28"/><path d="M44 67 H50 M70 67 H76 M54 48 H66"/>`,

  lock: `<rect class="f" x="30" y="44" width="60" height="44" rx="6"/><rect x="30" y="44" width="60" height="44" rx="6"/>
    <path d="M40 44 V30 A20 20 0 0 1 80 30 V44"/><circle cx="60" cy="62" r="5"/><path d="M60 67 V77"/>`,

  swords: `<path d="M22 84 L94 12 M98 84 L26 12"/><path d="M24 70 L36 82 M96 70 L84 82"/>
    <path d="M22 84 L14 92 M98 84 L106 92"/><circle class="s" cx="13" cy="93" r="3.5"/><circle class="s" cx="107" cy="93" r="3.5"/>`,

  house: `<path class="f" d="M24 88 V46 L60 18 L96 46 V88 Z"/><path d="M24 88 V46 L60 18 L96 46 V88"/>
    <path d="M24 46 H96 M24 64 H96 M42 46 V88 M78 46 V88 M24 64 L42 46 M42 64 L24 82 M96 64 L78 46 M78 64 L96 82"/>
    <path d="M54 88 V72 H66 V88"/><path d="M80 31 V16 H88 V37"/><path d="M12 88 H108"/>`,

  shield: `<path class="f" d="M60 12 L96 24 V50 C96 70 80 84 60 92 C40 84 24 70 24 50 V24 Z"/>
    <path d="M60 12 L96 24 V50 C96 70 80 84 60 92 C40 84 24 70 24 50 V24 Z"/><path d="M25 40 H95 M27 62 H93"/>`,

  fan: `<path class="f" d="M60 86 L14 40 A65 65 0 0 1 106 40 Z"/><path d="M60 86 L14 40 A65 65 0 0 1 106 40 Z"/>
    <path d="M60 86 L30 26 M60 86 L45 21 M60 86 L60 20 M60 86 L75 21 M60 86 L90 26"/><path d="M33 62 A38 38 0 0 1 87 62"/>
    <circle class="s" cx="60" cy="86" r="3.5"/>`,

  katana: `<path class="f" d="M38 70 C60 52 84 34 112 12 C88 38 64 56 42 74 Z"/>
    <path d="M38 70 C60 52 84 34 112 12 C88 38 64 56 42 74"/><ellipse cx="38" cy="73" rx="10" ry="5" transform="rotate(-40 38 73)"/>
    <path d="M33 77 L14 92 M37 81 L18 96 M14 92 L18 96"/><path d="M22 86 L26 90 M28 81 L32 85"/>`,

  kite: `<path class="f" d="M60 10 L84 34 L60 66 L36 34 Z"/><path d="M60 10 L84 34 L60 66 L36 34 Z M60 10 V66 M36 34 H84"/>
    <path d="M60 66 C66 74 54 80 60 90"/><path d="M58 74 L64 77 L64 71 Z M57 84 L63 87 L63 81 Z"/>
    <path d="M100 8 L90 28 H100 L88 50"/>`,

  heart: `<path class="f" d="M60 88 C30 68 14 52 14 36 C14 24 24 16 36 16 C46 16 54 22 60 32 C66 22 74 16 84 16 C96 16 106 24 106 36 C106 52 90 68 60 88 Z"/>
    <path d="M60 88 C30 68 14 52 14 36 C14 24 24 16 36 16 C46 16 54 22 60 32 C66 22 74 16 84 16 C96 16 106 24 106 36 C106 52 90 68 60 88 Z"/>
    <path d="M60 32 L52 46 L64 56 L54 70 L60 88"/>`,

  ruin: `<path class="f" d="M44 88 V40 L52 34 L60 42 L68 36 L76 52 V88 Z"/>
    <path d="M44 88 V40 L52 34 L60 42 L68 36 L76 52 V88"/><path d="M52 44 V84 M60 50 V84 M68 54 V84"/>
    <path d="M34 88 H86 M38 82 H82"/><path d="M88 88 L96 80 L104 88 Z"/><path d="M18 88 L24 82 L32 86"/>`,

  map: `<path class="f" d="M12 24 L44 14 L76 24 L108 14 V76 L76 86 L44 76 L12 86 Z"/>
    <path d="M12 24 L44 14 L76 24 L108 14 V76 L76 86 L44 76 L12 86 Z M44 14 V76 M76 24 V86"/>
    <path d="M22 70 C34 56 48 62 58 48 C66 38 80 44 90 32"/><path d="M88 24 L98 34 M98 24 L88 34"/>`,

  wave: `<path class="f" d="M8 86 C20 86 24 58 46 46 C64 36 86 40 92 54 C96 64 86 72 78 66 L70 86 Z"/>
    <path d="M8 86 C20 86 24 58 46 46 C64 36 86 40 92 54 C96 64 86 72 78 66 C72 62 76 54 82 56"/>
    <path d="M46 46 C47 38 55 33 60 36 M62 40 C64 32 72 30 77 34"/>
    <path d="M60 86 C70 80 76 76 86 78 C96 80 104 86 114 84"/><path d="M6 92 H114"/>`,

  flag: `<path d="M36 92 V12"/>
    <path class="f" d="M36 14 C52 8 64 22 82 16 C92 13 98 16 102 18 V48 C96 46 90 44 82 46 C64 52 52 38 36 44 Z"/>
    <path d="M36 14 C52 8 64 22 82 16 C92 13 98 16 102 18 V48 C96 46 90 44 82 46 C64 52 52 38 36 44"/>
    <path d="M36 24 C52 18 64 32 82 26 C92 23 98 26 102 28 M36 34 C52 28 64 42 82 36 C92 33 98 36 102 38"/>
    <path d="M14 92 L28 76 L46 80 L60 70 L76 78 L96 74 L108 92"/>`,

  goldpan: `<path d="M28 14 Q60 2 92 14 M60 9 L66 46"/>
    <path class="f" d="M16 66 A44 14 0 0 0 104 66 Z"/><ellipse cx="60" cy="66" rx="44" ry="14"/><ellipse cx="60" cy="63" rx="30" ry="7"/>
    <circle class="s" cx="50" cy="63" r="3.5"/><circle class="s" cx="64" cy="61" r="2.5"/><circle class="s" cx="72" cy="65" r="3"/>`,

  steamship: `<path class="f" d="M10 66 H110 L100 82 H20 Z"/><path d="M10 66 H110 L100 82 H20 Z"/>
    <path d="M24 66 V56 H54 V66"/><path d="M62 66 V30 H72 V66"/><path d="M66 26 C60 18 70 14 66 6 M76 24 C84 18 78 12 86 8"/>
    <path d="M80 66 A14 14 0 0 1 108 66"/><path d="M94 66 V52 M94 66 L84 56 M94 66 L104 56"/><path d="M18 66 V30"/>
    <path d="M4 90 C12 86 18 86 26 90 S40 94 48 90 S62 86 70 90 S84 94 92 90 S106 86 116 90"/>`,

  cannon: `<path class="f" d="M20 58 L92 36 L96 48 L26 70 Z"/><path d="M20 58 L92 36 L96 48 L26 70 Z"/><path d="M88 35 L94 53"/>
    <circle cx="40" cy="72" r="16"/><path d="M40 56 V88 M24 72 H56 M29 61 L51 83 M51 61 L29 83"/><path d="M40 72 L8 90"/>
    <circle cx="82" cy="86" r="5"/><circle cx="94" cy="86" r="5"/><circle cx="88" cy="77" r="5"/>`,

  sunrise: `<path class="f" d="M30 76 A30 30 0 0 1 90 76 Z"/><path d="M8 76 H112"/><path d="M30 76 A30 30 0 0 1 90 76"/>
    <path d="M60 36 V16 M38 44 L27 29 M82 44 L93 29 M27 60 L10 52 M93 60 L110 52"/><path d="M24 86 H52 M66 86 H96 M40 94 H80"/>`,

  pickelhaube: `<path class="f" d="M26 66 C26 40 42 30 60 30 C78 30 94 40 94 66 Z"/>
    <path d="M26 66 C26 40 42 30 60 30 C78 30 94 40 94 66"/><path d="M52 31 L60 8 L68 31"/>
    <path d="M18 66 H102"/><path d="M26 66 Q22 76 12 78 M94 66 Q100 74 110 74"/><path d="M60 40 L52 48 L60 56 L68 48 Z"/>
    <path d="M32 66 Q60 86 88 66"/>`,

  tophat: `<path class="f" d="M38 72 V22 H82 V72 Z"/><path d="M38 72 V22 H82 V72"/><path d="M20 72 Q60 86 100 72"/>
    <path d="M38 60 H82"/><path d="M34 22 H86"/>`,

  train: `<rect class="f" x="34" y="40" width="50" height="22" rx="4"/><rect x="34" y="40" width="50" height="22" rx="4"/>
    <path d="M84 62 V26 H106 V62"/><path d="M80 24 H110"/><rect x="90" y="32" width="10" height="10"/>
    <path d="M44 40 V26 H54 V40 M40 26 H58"/><path d="M34 62 L20 76 H34"/><path d="M34 62 H106"/>
    <circle cx="46" cy="74" r="10"/><circle cx="72" cy="74" r="10"/><circle cx="96" cy="76" r="8"/><path d="M8 88 H114"/>
    <path d="M46 20 A6 6 0 1 1 56 14 A7 7 0 1 1 68 16"/>`,

  warship: `<path class="f" d="M6 66 H114 L104 80 H16 Z"/><path d="M6 66 H114 L104 80 H16 Z"/>
    <path d="M34 66 V54 H80 V66 M44 54 V44 H70 V54"/><path d="M50 44 V28 H57 V44 M61 44 V30 H68 V44"/>
    <path d="M76 44 V14 M70 21 H82"/><path d="M18 62 H30 M24 59 H8 M90 62 H102 M96 59 H112"/>
    <path d="M4 88 C12 84 18 84 26 88 S40 92 48 88 S62 84 70 88 S84 92 92 88 S106 84 116 88"/>`,

  dove: `<path class="f" d="M18 58 C32 56 40 50 48 40 C56 52 70 58 90 56 L106 48 L100 60 C90 74 60 80 40 70 Z"/>
    <path d="M18 58 C32 56 40 50 48 40 C56 52 70 58 90 56 L106 48 L100 60 C90 74 60 80 40 70 Z"/>
    <path d="M50 46 C56 28 74 16 96 14 C86 26 80 38 74 54"/><circle class="s" cx="33" cy="54" r="2.2"/>
    <path d="M18 58 L6 64 M11 62 Q8 56 14 55 M10 63 Q12 69 6 70"/>`,

  atom: `<circle class="s" cx="60" cy="50" r="7"/><ellipse cx="60" cy="50" rx="46" ry="15"/>
    <ellipse cx="60" cy="50" rx="46" ry="15" transform="rotate(60 60 50)"/><ellipse cx="60" cy="50" rx="46" ry="15" transform="rotate(-60 60 50)"/>
    <circle class="s" cx="106" cy="50" r="3.5"/><circle class="s" cx="37" cy="10" r="3.5"/><circle class="s" cx="37" cy="90" r="3.5"/>`,

  notes: `<ellipse class="f" cx="40" cy="74" rx="11" ry="8" transform="rotate(-20 40 74)"/><ellipse class="f" cx="84" cy="64" rx="11" ry="8" transform="rotate(-20 84 64)"/>
    <ellipse cx="40" cy="74" rx="11" ry="8" transform="rotate(-20 40 74)"/><ellipse cx="84" cy="64" rx="11" ry="8" transform="rotate(-20 84 64)"/>
    <path d="M50 70 V20 M94 60 V12"/><path d="M50 20 L94 12 M50 30 L94 22"/><path d="M6 90 H114"/><path d="M14 30 C10 24 16 20 12 14"/>`,

  crack: `<path class="f" d="M14 70 V40 H32 V70 Z M80 70 V36 H98 V70 Z"/>
    <path d="M6 70 H46 L52 78 L58 70 L64 82 L70 70 H114"/><path d="M14 70 V40 H32 V70"/><path d="M38 70 L44 30 H60 L54 70"/>
    <path d="M80 70 V36 H98 V70"/><path d="M102 70 V50 H114 V70"/><path d="M19 48 H27 M19 58 H27 M85 44 H93 M85 54 H93"/>
    <path d="M8 26 Q12 22 8 18 M112 26 Q108 22 112 18 M60 18 Q64 14 60 10"/>`,

  wheelbarrow: `<path class="f" d="M24 48 H88 L78 70 H34 Z"/><path d="M24 48 H88 L78 70 H34 Z"/>
    <circle cx="88" cy="80" r="10"/><path d="M24 48 L8 40 M34 70 L30 88 M78 70 L88 80"/>
    <path d="M30 48 V34 H82 V48 M30 41 H82 M36 34 V26 H76 V34"/><circle cx="44" cy="41" r="2.5"/><circle cx="66" cy="41" r="2.5"/><circle cx="56" cy="30" r="2.5"/>`,

  skyscraper: `<path class="f" d="M44 92 V40 H76 V92 Z"/><path d="M44 92 V40 H76 V92"/><path d="M50 40 V30 H70 V40"/><path d="M54 30 V22 H66 V30"/>
    <path d="M60 22 V6"/><path d="M52 50 V86 M60 50 V86 M68 50 V86"/><path d="M20 92 V60 H38 V92 M82 92 V54 H100 V92"/><path d="M10 92 H110"/>`,

  moon: `<circle class="f" cx="64" cy="54" r="32"/><circle cx="64" cy="54" r="32"/>
    <circle cx="52" cy="44" r="6"/><circle cx="76" cy="64" r="8"/><circle cx="72" cy="36" r="4"/>
    <path d="M14 34 L28 20 L34 26 L20 40 Z"/><path d="M14 34 L8 36 L12 30 M20 40 L18 46 L24 42"/><path d="M104 12 V20 M100 16 H108"/>`,

  beetle: `<path class="f" d="M14 70 C14 58 22 54 30 52 C36 34 48 26 62 26 C78 26 90 36 96 52 C104 54 108 60 108 70 Z"/>
    <path d="M14 70 C14 58 22 54 30 52 C36 34 48 26 62 26 C78 26 90 36 96 52 C104 54 108 60 108 70 Z"/>
    <path d="M38 52 C42 40 50 34 58 34 V52 Z M66 34 C76 36 82 42 86 52 H66 Z"/>
    <circle cx="34" cy="72" r="10"/><circle cx="88" cy="72" r="10"/><path d="M4 84 H116"/>`,

  shinkansen: `<path class="f" d="M8 76 H98 C110 76 116 68 112 62 C104 50 80 42 58 42 H8 Z"/>
    <path d="M8 76 H98 C110 76 116 68 112 62 C104 50 80 42 58 42 H8"/><path d="M8 66 H110"/>
    <path d="M70 48 C82 48 92 52 98 58 H76 Z"/><path d="M14 54 H24 M30 54 H40 M46 54 H56"/>
    <path d="M4 86 H116"/><path d="M8 28 H40 M2 34 H28"/>`,

  wall: `<path class="f" d="M8 30 H50 L54 44 L48 56 L56 70 L50 92 H8 Z M72 30 H112 V92 H72 L76 70 L68 56 L74 44 Z"/>
    <path d="M8 30 H50 M72 30 H112 M8 92 H50 M72 92 H112 M8 30 V92 M112 30 V92"/>
    <path d="M50 30 L54 44 L48 56 L56 70 L50 92 M72 30 L68 44 L74 56 L68 70 L74 92"/>
    <path d="M8 46 H48 M76 46 H112 M8 62 H50 M70 62 H112 M8 78 H50 M72 78 H112"/>
    <path d="M28 30 V46 M92 30 V46 M20 46 V62 M100 46 V62 M30 62 V78 M92 62 V78"/>`,

  bubble: `<path d="M10 88 H112 M10 88 V12"/><path d="M10 80 L30 72 L46 62 L60 44 L72 30 L82 38 L92 64 L106 78"/>
    <circle class="f" cx="72" cy="22" r="12"/><circle cx="72" cy="22" r="12"/><path d="M88 8 L94 4 M90 16 H98 M84 2 L86 -2"/>`,

  aid: `<path class="f" d="M60 88 C30 68 14 52 14 36 C14 24 24 16 36 16 C46 16 54 22 60 32 C66 22 74 16 84 16 C96 16 106 24 106 36 C106 52 90 68 60 88 Z"/>
    <path d="M60 88 C30 68 14 52 14 36 C14 24 24 16 36 16 C46 16 54 22 60 32 C66 22 74 16 84 16 C96 16 106 24 106 36 C106 52 90 68 60 88 Z"/>
    <path d="M60 40 V66 M47 53 H73"/>`,

  turbine: `<path class="f" d="M14 88 C22 70 22 54 16 34 H46 C40 54 40 70 48 88 Z"/>
    <path d="M14 88 C22 70 22 54 16 34 H46 C40 54 40 70 48 88"/><path d="M24 28 C20 20 30 16 26 8 M38 28 C34 20 44 16 40 8"/>
    <path d="M85 88 L84 44 H88 L87 88"/><path d="M86 40 V8 M86 40 L114 56 M86 40 L58 56"/><circle class="s" cx="86" cy="40" r="3.5"/><path d="M4 88 H116"/>`,

  blossom: `<g class="f"><path d="M60 50 C48 40 48 22 56 14 L60 20 L64 14 C72 22 72 40 60 50 Z"/>
    <path d="M60 50 C48 40 48 22 56 14 L60 20 L64 14 C72 22 72 40 60 50 Z" transform="rotate(72 60 50)"/>
    <path d="M60 50 C48 40 48 22 56 14 L60 20 L64 14 C72 22 72 40 60 50 Z" transform="rotate(144 60 50)"/>
    <path d="M60 50 C48 40 48 22 56 14 L60 20 L64 14 C72 22 72 40 60 50 Z" transform="rotate(216 60 50)"/>
    <path d="M60 50 C48 40 48 22 56 14 L60 20 L64 14 C72 22 72 40 60 50 Z" transform="rotate(288 60 50)"/></g>
    <path d="M60 50 C48 40 48 22 56 14 L60 20 L64 14 C72 22 72 40 60 50 Z"/>
    <path d="M60 50 C48 40 48 22 56 14 L60 20 L64 14 C72 22 72 40 60 50 Z" transform="rotate(72 60 50)"/>
    <path d="M60 50 C48 40 48 22 56 14 L60 20 L64 14 C72 22 72 40 60 50 Z" transform="rotate(144 60 50)"/>
    <path d="M60 50 C48 40 48 22 56 14 L60 20 L64 14 C72 22 72 40 60 50 Z" transform="rotate(216 60 50)"/>
    <path d="M60 50 C48 40 48 22 56 14 L60 20 L64 14 C72 22 72 40 60 50 Z" transform="rotate(288 60 50)"/>
    <circle class="s" cx="60" cy="50" r="5"/>`,

  chart: `<path d="M10 90 H112"/><rect x="18" y="22" width="16" height="68"/><rect x="42" y="38" width="16" height="52"/>
    <rect class="f" x="66" y="52" width="16" height="38"/><rect x="66" y="52" width="16" height="38"/><rect x="90" y="56" width="16" height="34"/>
    <path d="M62 44 C70 34 84 34 92 42"/><path d="M92 42 L84 40 M92 42 L90 34"/>`,

  fireworks: `<path d="M40 38 V16 M40 38 V60 M40 38 H18 M40 38 H62 M40 38 L24 22 M40 38 L56 54 M40 38 L56 22 M40 38 L24 54"/>
    <path d="M86 56 V40 M86 56 V72 M86 56 H70 M86 56 H102 M86 56 L75 45 M86 56 L97 67 M86 56 L97 45 M86 56 L75 67"/>
    <circle class="s" cx="40" cy="38" r="3"/><circle class="s" cx="86" cy="56" r="2.5"/>
    <path d="M40 70 V94 M86 80 V94"/><path d="M104 14 V22 M100 18 H108 M14 76 V82 M11 79 H17"/>`,
};
