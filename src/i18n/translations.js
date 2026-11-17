export const TRANSLATIONS = {
  en: {
    langName: 'English',
    metaTitle: 'Can I Run Unity? PC System Requirements Checker',
    metaDesc: 'Free Unity system requirements checker: see if your PC can run Unity 6, URP, HDRP, VR and local AI. Detects GPU, CPU and RAM in your browser.',
    metaKeywords: 'can i run unity, unity 6 system requirements, unity pc checker, unity urp hdrp hardware, unity vr requirements, unity sentis gpu, local llm unity rider, figarist, sivochka',
    navWorkflows: 'Workflows',
    navMatrix: 'Matrix',
    navUpgrades: 'Upgrades',
    navDoctor: 'Doctor',
    navGuide: 'Guide & FAQ',
    navHub: 'sivochka.com',
    localPill: '100% LOCAL',
    heroKicker: 'LOCAL HARDWARE ANALYZER · ZERO SERVER UPLOADS',
    heroTitle: 'Can I Run Unity?',
    heroLead: 'Instant client-side check for Unity 6, 2022 LTS, URP/HDRP, VR/XR, and local AI coding models running alongside Unity Editor.',
    factWebgl: 'WebGL2 & WebGPU',
    factUnity: 'Unity 6 & 2022 LTS',
    factAi: 'Sentis & Local LLM',
    factZero: 'Private · In-Browser',
    btnDetect: 'Re-Detect My PC',
    btnBench: '3s GPU/CPU Stress Test',
    benchRunning: 'Running Stress Test...',
    benchResult: 'Measured: {fps} FPS shader · {cpu} ops/s CPU',
    presetsLabel: 'Quick Reference Rigs:',
    presetSchool: 'School Laptop',
    presetSchoolMeta: '8 GB · Intel UHD · SATA',
    presetMac: 'MacBook Air M2',
    presetMacMeta: '8 GB Unified · Metal',
    presetIndie: 'Indie Dev PC',
    presetIndieMeta: '16 GB · RTX 3060 12G',
    presetPro: 'Pro AI & 3D Rig',
    presetProMeta: '32 GB · RTX 4070 Super',
    specOs: 'Operating System',
    specCpu: 'CPU / Threads',
    specGpu: 'GPU (Graphics)',
    specVram: 'VRAM (GB)',
    specRam: 'System RAM',
    specDisk: 'Storage Drive',
    specIde: 'Code Editor (IDE)',
    snapRamLabel: 'Quick RAM:',
    snapVramLabel: 'Quick VRAM:',
    ramCapNote: 'Browser privacy caps deviceMemory at 8 GB. Inferred {ram} GB from your GPU — adjust if needed:',
    detectedRaw: 'Detected GPU:',
    scoreTitle: 'Unity Readiness Score',
    bestPickLabel: 'Best Match for Your PC',
    bestMatchTag: 'BEST MATCH',
    ramBarTitle: 'System RAM Budget (Editor + IDE)',
    vramBarTitle: 'GPU VRAM Pool (Viewport / Bake / AI)',
    ramUsedLabel: 'OS {os}G + Unity {unity}G + IDE {ide}G',
    ramFreeLabel: '{free} GB free headroom',
    vramFreeLabel: '{free} GB left for Lightmap / AI',
    btnCopyLink: 'Copy PC Link',
    btnCopyReport: 'Copy Mentor Report',
    copiedToast: 'Copied to clipboard!',
    mentorCtaTitle: 'Want to learn Unity & C# on this PC?',
    mentorCtaDesc: '1-on-1 mentoring with Ihor Sivochka (Figarist). Send your copied hardware report to pick the best Unity version and starter project.',
    mentorCtaBtn: 'Book sivochka.com',
    workflowsTitle: 'Best Choice by Unity Workflow',
    workflowsSub: 'Evaluated for Scene View FPS, C# Domain Reload speed, and memory headroom.',
    matrixTitle: 'Browse All Unity Versions, Pipelines & AI',
    matrixSub: 'Filter 30+ real-world Unity 6 / LTS targets, packages, and local LLMs running alongside the Editor.',
    tabAll: 'All',
    tabVersions: 'Unity Versions',
    tabPipelines: 'Render & Lightmap',
    tabPackages: 'Packages & XR',
    tabAi: 'AI & Local LLM',
    tabTools: 'IDEs & Tools',
    searchPlaceholder: 'Search Unity 6, HDRP, Sentis, Qwen, Rider...',
    filterAllStatus: 'All Statuses',
    statusCanRun: 'Runs Great',
    statusSlow: 'Runs (Moderate)',
    statusTight: 'Tight / Caveats',
    statusCannot: 'Not Recommended',
    colTarget: 'Unity Target / Workload',
    colGrade: 'Grade',
    colStatus: 'Status',
    colPerf: 'Est. Scene / Compile',
    colNotes: 'Bottlenecks & Notes',
    upgradesTitle: 'What If I Upgrade?',
    upgradesSub: 'Simulated score boost and newly unlocked Unity capabilities.',
    upgradeFromTo: '{from} → {to} (Grade {grade})',
    doctorTitle: 'Unity Doctor: Speed Up This PC',
    doctorSub: 'Actionable Editor settings tailored to your current hardware bottlenecks.',
    seoKicker: 'ENGINEERING GUIDE & SYSTEM REQUIREMENTS',
    seoTitle: 'How Unity 6, Render Pipelines, Storage & Local AI Scale on Real Hardware',
    seoLead: 'Can I Run Unity? combines WebGL2/WebGPU probing with practical thresholds observed across Unity 6 (6000.x), 2022.3 LTS, Android/Wear OS builds, OpenXR headsets, and local ONNX/LLM inference.',
    seoCards: [
      {
        title: '1. Built-in vs URP vs HDRP',
        body: 'Built-in and URP 2D run smoothly even on Intel UHD or Apple M1/M2 with 8 GB RAM. URP 3D with Shader Graph & Volumetric Fog targets 4–6 GB VRAM, while HDRP 17.x + Hardware Raytracing requires 8–12+ GB VRAM and 32 GB system RAM.'
      },
      {
        title: '2. Why RAM, IDE & NVMe SSD Matter',
        body: 'In Unity, compile speed depends heavily on NVMe random I/O for Library/Bee and Assembly Definitions. Keeping Rider (3.6 GB) or Visual Studio (2.8 GB) open alongside Editor easily saturates 8 GB laptops—switching to VS Code saves ~2 GB.'
      },
      {
        title: '3. Sentis, ML-Agents & Local LLMs',
        body: 'Running Unity Sentis (ONNX) in-game or Qwen-Coder 7B–14B locally via Ollama while Unity is open shares your VRAM pool. Reserve ~2.5 GB VRAM for Unity URP viewport before estimating remaining model headroom.'
      }
    ],
    seoTableTitle: 'Reference Hardware Matrix by Unity Workload',
    seoTableCols: ['Workload', 'CPU & Storage', 'RAM & IDE', 'GPU / VRAM Target'],
    seoTableRows: [
      ['2D / Mobile / Wear OS', '4+ Threads · SATA/NVMe SSD', '8–16 GB · VS Code', '2 GB VRAM / iGPU / M1+'],
      ['3D Indie (Unity 6 URP)', '6+ Cores (12T) · NVMe SSD', '16 GB · VS2022 / Rider', '6–8 GB (RTX 3060 / RX 6600)'],
      ['VR / XR (Quest & PICO)', '8 Cores · NVMe SSD', '16–32 GB · Rider', '8–12 GB (RTX 3070 / 4070)'],
      ['HDRP + Local Qwen-Coder 14B', '8–12+ Cores · PCIe 4.0 NVMe', '32–64 GB · Rider', '12–24 GB (RTX 4070S / 4090)']
    ],
    seoEcoTitle: 'Figarist GameDev & EdTech Ecosystem',
    seoEcoLead: 'Built by Ihor Sivochka (Figarist) as part of an open toolkit for indie game developers, teachers, and students:',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    footerMade: 'Made by Ihor Sivochka (Figarist) for game developers and students.',
    wfNames: {
      'wf-2d-mobile': '2D, Mobile & Wear OS',
      'wf-3d-indie': '3D Indie & Stylized',
      'wf-multiplayer': '3D Multiplayer & FPS',
      'wf-hdrp': 'AAA Photorealistic (HDRP)',
      'wf-xr': 'VR / XR (Quest & PICO)',
      'wf-ai': 'AI: Sentis, ML-Agents & Local LLM',
      'wf-edu': 'School / Starter Laptop'
    },
    bottlenecks: {
      os_not_desktop: 'Unity Editor requires Windows, macOS, or Linux desktop.',
      ram_low: 'RAM {actual} GB < {req} GB minimum (risk of OOM crashes).',
      ram_tight: 'RAM {actual} GB < {req} GB recommended (close browser tabs).',
      vram_low: 'VRAM {actual} GB < {req} GB minimum.',
      vram_tight: 'VRAM {actual} GB < {req} GB recommended (lower texture mipmaps).',
      cpu_low: 'CPU threads below tier {req} (slower C# & IL2CPP builds).',
      gpu_low: 'GPU tier below {req} for smooth Scene View.',
      hdd_slow: 'HDD slows Library import & Domain Reload by 2–4×.',
      no_rt: 'GPU lacks hardware Raytracing cores.',
      no_dx12: 'DX12 hardware Raytracing requires Windows.',
      no_fp16: 'GPU lacks fast FP16 compute for neural inference.',
      rider_8gb: 'JetBrains Rider uses ~3.6 GB RAM; VS Code is safer on 8 GB.'
    },
    doctorTipsMap: {
      doc_low_ram_ide: 'Switch from Rider/Visual Studio to VS Code / Antigravity to save ~2 GB RAM alongside Unity.',
      doc_enter_play_mode: 'Enable "Enter Play Mode Options" (Project Settings → Editor) to skip Domain Reload and test 5× faster.',
      doc_hdd_ssd: 'Move your Unity project and Library/ folder to an SSD/NVMe — HDD bottlenecks asset imports.',
      doc_urp_low_vram: 'Use URP instead of HDRP and set Quality → Texture Mipmap Limit to Half Res for smooth viewport FPS.',
      doc_asmdef: 'Split C# scripts into Assembly Definitions (.asmdef) so Unity recompiles only changed modules.',
      doc_gpu_lightmapper: 'Switch Lighting → Lightmapper to "Progressive GPU" to bake scenes 4–8× faster on your GPU.',
      doc_pro_optimal: 'Your rig is optimal! You can enable Progressive GPU Lightmapper, Multiplayer Play Mode, and local Qwen-Coder 7B+ alongside Unity.'
    },
    faqItems: [
      {
        q: 'Does Can I Run Unity? upload my hardware specs to any external server?',
        a: 'No. WebGL2/WebGPU probing, the 60ms/3s CPU & shader benchmarks, and the compatibility scoring run 100% locally in your browser memory.'
      },
      {
        q: 'Why does auto-detect sometimes show 8 GB RAM on a 16 GB or 32 GB PC?',
        a: 'To prevent fingerprinting, Chrome, Edge, and Brave cap navigator.deviceMemory at 8 GB. When 8 GB is reported alongside a mid/high-tier GPU (e.g., RTX 3060 or RTX 4070 Super), the tool infers realistic RAM and gives you 1-click RAM pills to override.'
      },
      {
        q: 'What is the difference in hardware requirements between Unity 6 and Unity 2022.3 LTS?',
        a: 'Unity 6 (6000.x) introduces Render Graph in URP/HDRP, GPU Resident Drawer, and updated shader compilers that benefit noticeably from an NVMe SSD and 16+ GB RAM. On 8 GB laptops with integrated graphics, Unity 2022.3 LTS with Built-in or URP 2D remains slightly lighter.'
      },
      {
        q: 'Can I use HDRP on an integrated GPU or an 8 GB laptop?',
        a: 'Not recommended. HDRP requires Shader Model 5.0+, high VRAM bandwidth (8+ GB dedicated VRAM recommended), and 16–32 GB RAM. For laptops and indie 3D games, URP delivers great visuals at 2–3× higher Scene View FPS.'
      },
      {
        q: 'How much RAM do I really need for Unity + JetBrains Rider or Visual Studio?',
        a: 'Windows/macOS takes ~3.5 GB, Unity Editor takes 2.5–4.5 GB, Rider takes ~3.6 GB, and Visual Studio takes ~2.8 GB. On an 8 GB machine, VS Code (~1 GB) leaves crucial headroom; 16 GB is comfortable for URP, and 32 GB is ideal for HDRP, Multiplayer Play Mode, or Blender + Unity.'
      },
      {
        q: 'Why does SSD vs HDD affect Unity Editor speed so much?',
        a: 'Unity projects contain thousands of small files in Assets/ and Library/Bee/. An HDD causes 2–4× slower project opening, package resolution, and C# Domain Reloads compared to an NVMe M.2 SSD.'
      },
      {
        q: 'Can I run a local AI coding model (Ollama / Qwen-Coder) alongside Unity Editor?',
        a: 'Yes! Reserve ~2.5 GB VRAM for Unity URP viewport. A 3B Q4_K_M model (~2.5 GB VRAM) fits on 6–8 GB GPUs, 7B–8B (~5.5 GB VRAM) fits comfortably on 8–12 GB GPUs, and 14B (~9.5 GB VRAM) shines on 12–16+ GB GPUs like RTX 3060 12GB / RTX 4070 Super or 24–32 GB Apple Silicon.'
      },
      {
        q: 'How well does Apple Silicon (M1, M2, M3, M4) run Unity?',
        a: 'Very well for 2D, iOS/Android builds, and URP 3D thanks to fast single-core CPU and unified Metal memory. However, 8 GB MacBooks still tighten up during IL2CPP builds or Rider usage (16–24+ GB Unified Memory is strongly recommended), and Windows-only DX12 raytracing is unavailable.'
      },
      {
        q: 'What specs are required for VR / XR development (Meta Quest Link & PICO SDK)?',
        a: 'You can build Android APKs for standalone Quest/PICO on a mid-range laptop, but testing live inside Unity Editor over Quest Link / PCVR requires high stereo framerate (72–90 Hz), 16+ GB RAM, and at least an RTX 3060 / 4060 class GPU with 6–8+ GB VRAM.'
      },
      {
        q: 'How can I use the Mentor Report if I want to start learning Unity & C#?',
        a: 'Click "Copy Mentor Report" in the telemetry card and send it via Info or when booking 1-on-1 tutoring at sivochka.com/. It summarizes your OS, CPU, GPU, RAM, score, and ideal starter Unity version.'
      },
      {
        q: 'What are the minimum system requirements for Unity 6?',
        a: 'Unity publishes its own official requirements, so check the Unity documentation for those. This checker uses its own thresholds: for Unity 6.0 LTS it expects at least 8 GB RAM, 2 GB VRAM and GPU tier 2 of 10, and recommends 16 GB RAM, 4 GB VRAM and GPU tier 5 for a smooth Scene View.'
      },
      {
        q: 'Do I need a gaming PC to learn Unity?',
        a: 'Not for 2D projects. In this checker the 2D and School / Starter workflows ask for only 8 GB RAM, 1 GB VRAM and an entry-level GPU, so an ordinary school laptop is a fine start. Stronger hardware matters for heavy 3D, HDRP, VR and local AI.'
      }
    ],
    // Static, crawlable requirements section. Table numbers come from src/data/unity-targets.js (see src/content/static-requirements.js).
    reqSection: {
      title: 'Unity system requirements',
      intro: 'Can your PC run Unity? The checker scores your hardware against seven Unity workflows, from 2D and school projects to HDRP, VR and local AI. This table is generated from the same data the tool uses.',
      caption: 'Minimum / recommended per workflow. CPU and GPU are tool tiers from 1 to 10.',
      cols: [
        'Workflow',
        'RAM (min / rec)',
        'VRAM (min / rec)',
        'CPU tier',
        'GPU tier',
        'Fast SSD'
      ],
      ssdYes: 'NVMe preferred',
      ssdNo: 'Not required',
      notes: [
        'Graphics API and GPU: the checker reads your graphics card through WebGL2 and, where supported, WebGPU. Some targets add hard conditions: hardware ray tracing needs an RT-capable GPU and DirectX 12 (Windows only), and Sentis flags GPUs without FP16 support.',
        'CPU: shown as a tier from 1 to 10 (tier: cores, {cpuTiers}).',
        'GPU: tier 1 is a software renderer and tier 10 is a flagship RTX card. VRAM is scored separately from the GPU tier.',
        'RAM and disk: the RAM budget includes the OS and your code editor, so Rider needs more headroom than VS Code. A hard drive (HDD) lowers the score for targets that prefer NVMe.',
        'Phones, tablets and ChromeOS cannot run the Unity Editor, and the checker reports that as "cannot run".'
      ],
      howTitle: 'How the check works',
      howBody: [
        'The check runs locally in your browser. On load it reads your graphics card name from WebGL2 (and WebGPU where available), your CPU thread count and the memory your browser reports, then matches them against a built-in hardware table and scores each Unity workflow on the spot.',
        'Your hardware details are not uploaded. Browsers cap reported memory at 8 GB, so the tool infers RAM from your GPU and lets you correct RAM, VRAM, storage and editor by hand. The optional 3-second stress test also runs entirely on your device.',
        'The page uses GoatCounter for anonymous visit and click statistics; your detected hardware is not part of them.'
      ],
      learnTitle: 'Learning Unity: do you need a gaming PC?',
      learnBody: [
        'For 2D projects, usually not. In this checker the 2D and School / Starter workflows have the lowest bar: from {ram} GB RAM, {vram} GB VRAM and GPU tier {gpu}, with no NVMe drive required. A child learning Unity and C# can start on an ordinary school laptop or an older PC.',
        'Heavy 3D, HDRP, VR and local AI are where stronger hardware starts to matter. Run the check first, then choose a project that fits the result.',
        'Parents and learners can get help choosing a Unity version and a first project in 1-on-1 Unity lessons.'
      ],
      learnLink: '1-on-1 Unity tutoring'
    },
    reportTemplate: 'Can I Run Unity? Hardware Report\nScore: {score}/100 (Grade {grade})\nOS: {os} | CPU: {cpu} | GPU: {gpu} ({vram} GB VRAM)\nRAM: {ram} GB | Storage: {disk} | IDE: {ide}\nBest Match: {bestWf} ({bestVer})'
  },

  uk: {
    langName: 'Українська',
    metaTitle: 'Can I Run Unity? Системні вимоги Unity 6 і перевірка ПК',
    metaDesc: 'Безкоштовна перевірка: чи потягне ваш ПК Unity 6, URP, HDRP, VR та локальний AI. Системні вимоги Unity, автодетект GPU, CPU і RAM у браузері.',
    metaKeywords: 'чи потягне пк unity, системні вимоги unity 6, перевірка пк для юніті, unity urp hdrp вимоги, unity vr вимоги, unity sentis локальний ai, sivochka, figarist',
    navWorkflows: 'Сценарії',
    navMatrix: 'Матриця',
    navUpgrades: 'Апгрейд',
    navDoctor: 'Оптимізація',
    navGuide: 'Гід та FAQ',
    navHub: 'sivochka.com',
    localPill: '100% ЛОКАЛЬНО',
    heroKicker: 'ЛОКАЛЬНИЙ АНАЛІЗАТОР ЗАЛІЗА · БЕЗ ВІДПРАВКИ НА СЕРВЕР',
    heroTitle: 'Чи потягне мій ПК Unity?',
    heroLead: 'Миттєва перевірка у браузері для Unity 6, 2022 LTS, URP/HDRP, VR/XR та одночасного запуску локальних AI-моделей коду разом із Unity Editor.',
    factWebgl: 'WebGL2 та WebGPU',
    factUnity: 'Unity 6 і 2022 LTS',
    factAi: 'Sentis і Local LLM',
    factZero: 'Приватно · Без серверів',
    btnDetect: 'Перевизначити ПК',
    btnBench: 'Точний GPU/CPU тест (3 сек)',
    benchRunning: 'Виконується стрес-тест...',
    benchResult: 'Виміряно: {fps} FPS шейдер · {cpu} оп/с CPU',
    presetsLabel: 'Швидкі пресети ПК:',
    presetSchool: 'Шкільний ноутбук',
    presetSchoolMeta: '8 ГБ · Intel UHD · SATA',
    presetMac: 'MacBook Air M2',
    presetMacMeta: '8 ГБ Unified · Metal',
    presetIndie: 'Інді-ПК',
    presetIndieMeta: '16 ГБ · RTX 3060 12G',
    presetPro: 'Pro AI & 3D ПК',
    presetProMeta: '32 ГБ · RTX 4070 Super',
    specOs: 'Операційна система',
    specCpu: 'Процесор (потоки)',
    specGpu: 'Відеокарта (GPU)',
    specVram: 'Відеопам’ять (VRAM)',
    specRam: 'Оперативна пам’ять (RAM)',
    specDisk: 'Накопичувач',
    specIde: 'Редактор коду (IDE)',
    snapRamLabel: 'Швидко RAM:',
    snapVramLabel: 'Швидко VRAM:',
    ramCapNote: 'Браузер обрізає deviceMemory на 8 ГБ для приватності. Оцінено {ram} ГБ за вашим GPU — змініть за потреби:',
    detectedRaw: 'Визначено GPU:',
    scoreTitle: 'Індекс готовності до Unity',
    bestPickLabel: 'Найкращий вибір для вашого ПК',
    bestMatchTag: 'ТОП ВИБІР',
    ramBarTitle: 'Бюджет RAM (Unity Editor + IDE)',
    vramBarTitle: 'Пул VRAM відеокарти (В’юпорт / Бейк / AI)',
    ramUsedLabel: 'ОС {os}Г + Unity {unity}Г + IDE {ide}Г',
    ramFreeLabel: '{free} ГБ вільного запасу',
    vramFreeLabel: '{free} ГБ вільно для Lightmap / AI',
    btnCopyLink: 'Скопіювати посилання на ПК',
    btnCopyReport: 'Звіт для ментора / Info',
    copiedToast: 'Скопійовано в буфер обміну!',
    mentorCtaTitle: 'Хочеш вивчати Unity та C# на цьому ПК?',
    mentorCtaDesc: 'Індивідуальне менторство з Ігорем Сівочкою (Figarist). Скопіюй звіт вище, щоб ми разом обрали оптимальну версію Unity та перший проєкт.',
    mentorCtaBtn: 'Записатися на заняття 1-на-1',
    workflowsTitle: 'Оптимальний сценарій у Unity',
    workflowsSub: 'Оцінка FPS у Scene View, швидкості компіляції C# (Domain Reload) та запасу пам’яті.',
    matrixTitle: 'Повна матриця: версії Unity, рендер та AI',
    matrixSub: '30+ реальних сценаріїв: Unity 6 / LTS, пакети, VR та одночасний запуск локальних LLM із редактором.',
    tabAll: 'Усі',
    tabVersions: 'Версії Unity',
    tabPipelines: 'Рендер і світло',
    tabPackages: 'Пакети та XR',
    tabAi: 'AI та Local LLM',
    tabTools: 'IDE та інструменти',
    searchPlaceholder: 'Пошук Unity 6, HDRP, Sentis, Qwen, Rider...',
    filterAllStatus: 'Усі статуси',
    statusCanRun: 'Йде ідеально',
    statusSlow: 'Йде (помірно)',
    statusTight: 'На межі / нюанси',
    statusCannot: 'Не рекомендовано',
    colTarget: 'Ціль / Пакет Unity',
    colGrade: 'Оцінка',
    colStatus: 'Статус',
    colPerf: 'Очік. FPS / Комп.',
    colNotes: 'Обмеження та поради',
    upgradesTitle: 'Що дасть апгрейд ПК?',
    upgradesSub: 'Симуляція приросту балів та розблокованих можливостей Unity.',
    upgradeFromTo: '{from} → {to} (рівень {grade})',
    doctorTitle: 'Unity Doctor: як прискорити на цьому ПК',
    doctorSub: 'Конкретні налаштування Unity Editor під ваші вузькі місця.',
    seoKicker: 'ТЕХНІЧНИЙ ДОВІДНИК І ВИМОГИ',
    seoTitle: 'Як Unity 6, рендер-пайплайни, SSD і локальний AI працюють на реальному залізі',
    seoLead: 'Can I Run Unity? поєднує браузерну діагностику WebGL2/WebGPU з практичними вимогами Unity 6 (6000.x), 2022.3 LTS, Android/Wear OS білдів, OpenXR-шоломів і локального інференсу ONNX/LLM.',
    seoCards: [
      {
        title: '1. Built-in проти URP та HDRP',
        body: 'Built-in і URP 2D плавно працюють навіть на Intel UHD або Apple M1/M2 з 8 ГБ RAM. URP 3D із Shader Graph потребує 4–6 ГБ VRAM, тоді як HDRP 17.x і Raytracing — від 8–12+ ГБ VRAM та 32 ГБ оперативної пам’яті.'
      },
      {
        title: '2. Чому RAM, IDE та NVMe SSD критичні',
        body: 'Швидкість компіляції в Unity залежить від випадкового доступу NVMe для папок Library/Bee. Відкритий Rider (3.6 ГБ) чи Visual Studio (2.8 ГБ) миттєво заповнює 8 ГБ ноутбуки — перехід на VS Code вивільняє ~2 ГБ RAM.'
      },
      {
        title: '3. Sentis, ML-Agents і Local LLM',
        body: 'Запуск Unity Sentis (ONNX) або локальної Qwen-Coder 7B–14B через Ollama ділить VRAM із вікном Scene View. Спершу резервується ~2.5 ГБ VRAM під Unity URP, а решта йде під ваги нейромережі.'
      }
    ],
    seoTableTitle: 'Орієнтовні вимоги за типом проєктів у Unity',
    seoTableCols: ['Сценарій', 'CPU і накопичувач', 'RAM та IDE', 'Відеокарта / VRAM'],
    seoTableRows: [
      ['2D / Mobile / Wear OS', '4+ потоки · SATA/NVMe SSD', '8–16 ГБ · VS Code', '2 ГБ VRAM / iGPU / M1+'],
      ['3D Інді (Unity 6 URP)', '6+ ядер (12T) · NVMe SSD', '16 ГБ · VS2022 / Rider', '6–8 ГБ (RTX 3060 / RX 6600)'],
      ['VR / XR (Quest та PICO)', '8 ядер · NVMe SSD', '16–32 ГБ · Rider', '8–12 ГБ (RTX 3070 / 4070)'],
      ['HDRP + Local Qwen-Coder 14B', '8–12+ ядер · PCIe 4.0 NVMe', '32–64 ГБ · Rider', '12–24 ГБ (RTX 4070S / 4090)']
    ],
    seoEcoTitle: 'Екосистема геймдев та EdTech інструментів Figarist',
    seoEcoLead: 'Створив Ігор Сівочка (Figarist) як частину відкритого набору інструментів для розробників ігор, вчителів та учнів:',
    faqTitle: 'Часті запитання (FAQ)',
    footerMade: 'Створив Ігор Сівочка (Figarist) для геймдев-розробників та учнів.',
    wfNames: {
      'wf-2d-mobile': '2D, Mobile та Wear OS',
      'wf-3d-indie': '3D Інді та стилізовані ігри',
      'wf-multiplayer': '3D Мультиплеєр та FPS',
      'wf-hdrp': 'AAA Фотореалізм (HDRP)',
      'wf-xr': 'VR / XR (Quest та PICO)',
      'wf-ai': 'AI: Sentis, ML-Agents та Local LLM',
      'wf-edu': 'Школа / Навчання / Ноутбук'
    },
    bottlenecks: {
      os_not_desktop: 'Unity Editor потребує десктопної ОС (Windows, macOS або Linux).',
      ram_low: 'RAM {actual} ГБ < {req} ГБ мін. (ризик вильотів при білді).',
      ram_tight: 'RAM {actual} ГБ < {req} ГБ рек. (закрийте зайві вкладки браузера).',
      vram_low: 'VRAM {actual} ГБ < {req} ГБ мін.',
      vram_tight: 'VRAM {actual} ГБ < {req} ГБ рек. (зменште якість текстур у в’юпорті).',
      cpu_low: 'Слабкий CPU (повільна компіляція C# та IL2CPP).',
      gpu_low: 'GPU нижче рівня {req} для плавної роботи в Scene View.',
      hdd_slow: 'HDD уповільнює імпорт асетів і Domain Reload у 2–4 рази.',
      no_rt: 'Відеокарта не підтримує апаратний Raytracing.',
      no_dx12: 'Апаратний DX12 Raytracing доступний лише на Windows.',
      no_fp16: 'GPU не має швидкого FP16 для нейромереж.',
      rider_8gb: 'JetBrains Rider бере ~3.6 ГБ RAM; на 8 ГБ краще обрати VS Code.'
    },
    doctorTipsMap: {
      doc_low_ram_ide: 'Замініть Rider або Visual Studio на VS Code / Antigravity — це звільнить ~2 ГБ RAM для Unity.',
      doc_enter_play_mode: 'Увімкніть "Enter Play Mode Options" (Project Settings → Editor), щоб прибрати Domain Reload і тестувати в 5× швидше.',
      doc_hdd_ssd: 'Перенесіть проєкт і папку Library/ на SSD/NVMe — HDD критично гальмує імпорт.',
      doc_urp_low_vram: 'Використовуйте URP замість HDRP і виставте Texture Mipmap Limit = Half Res у Quality Settings.',
      doc_asmdef: 'Розбийте C#-скрипти на Assembly Definitions (.asmdef), щоб Unity перекомпілював лише змінений код.',
      doc_gpu_lightmapper: 'Увімкніть Progressive GPU Lightmapper у вікні Lighting — запікання світла стане швидшим у 4–8 разів.',
      doc_pro_optimal: 'Ваш ПК у топі! Сміливо вмикайте GPU Lightmapper, Multiplayer Play Mode (2–4 вікна) та локальний Qwen-Coder 7B+.'
    },
    faqItems: [
      {
        q: 'Чи передаються дані про мій ПК на зовнішній сервер?',
        a: 'Ні. Увесь автодетект WebGL2/WebGPU, 60 мс та 3-секундний бенчмарк, а також підрахунок рейтингу виконуються на 100% локально у вашому браузері.'
      },
      {
        q: 'Чому автодетект іноді показує 8 ГБ RAM, якщо в мене 16 або 32 ГБ?',
        a: 'Заради захисту від фінгерпринтингу Chrome і Edge обмежують navigator.deviceMemory на рівні 8 ГБ. Інструмент автоматично підказує реалістичний об’єм RAM за класом відеокарти (наприклад, RTX 3060 → 16 ГБ, RTX 4070 Super → 32 ГБ) і дозволяє змінити його в один клік.'
      },
      {
        q: 'Чим відрізняються системні вимоги Unity 6 від Unity 2022.3 LTS?',
        a: 'Unity 6 (6000.x) додає Render Graph в URP/HDRP, GPU Resident Drawer та оновлені компілятори шейдерів, що відчутно прискорюються на NVMe SSD і 16+ ГБ RAM. На бюджетних 8 ГБ ноутбуках з інтегрованою графікою Unity 2022.3 LTS (Built-in / URP 2D) залишається трохи легшою.'
      },
      {
        q: 'Чи можна комфортно працювати з HDRP на ноутбуці з інтегрованою графікою?',
        a: 'Не рекомендовано. HDRP вимагає Shader Model 5.0+, 8+ ГБ відеопам’яті та 16–32 ГБ RAM. Для ноутбуків та більшості інді-ігор краще обрати URP — він дає у 2–3 рази вищий FPS у Scene View.'
      },
      {
        q: 'Скільки RAM реально потрібно для Unity разом із JetBrains Rider чи Visual Studio?',
        a: 'ОС займає ~3.5 ГБ, Unity Editor — 2.5–4.5 ГБ, Rider — ~3.6 ГБ, Visual Studio — ~2.8 ГБ. На 8 ГБ ПК безпечніше використовувати VS Code (~1 ГБ), 16 ГБ комфортно для URP, а 32 ГБ ідеально для HDRP, мультиплеєрних тестів чи Blender поруч.'
      },
      {
        q: 'Чому SSD чи NVMe настільки важливий для швидкості Unity?',
        a: 'Проєкт Unity містить тисячі дрібних файлів у Assets/ та Library/Bee/. На звичайному HDD відкриття проєкту, імпорт пакетів та C# Domain Reload відбуваються у 2–4 рази повільніше, ніж на NVMe M.2 SSD.'
      },
      {
        q: 'Чи потягне мій ПК локальний AI-асистент коду (Ollama / Qwen-Coder) разом із Unity?',
        a: 'Так! Під в’юпорт Unity URP резервується ~2.5 ГБ VRAM. Модель Qwen 3B (~2.5 ГБ VRAM) поміститься на 6–8 ГБ GPU, 7B–8B (~5.5 ГБ) — на 8–12 ГБ GPU, а 14B (~9.5 ГБ) — на 12–16+ ГБ відеокартах на кшталт RTX 3060 12GB чи RTX 4070 Super.'
      },
      {
        q: 'Як працює Unity на Mac Apple Silicon (M1, M2, M3, M4)?',
        a: 'Дуже швидко в 2D, мобільних білдах та URP 3D завдяки високій продуктивності на ядро та Metal. Проте на 8 ГБ моделях під час IL2CPP-білдів або роботи з Rider відчувається дефіцит пам’яті — для комфорту краще 16–24+ ГБ Unified Memory (і немає апаратного DX12 Raytracing).'
      },
      {
        q: 'Яке залізо потрібне для розробки під VR / XR (Meta Quest Link, PICO SDK, OpenXR)?',
        a: 'Збирати APK під автономний Quest/PICO можна і на середньому ноутбуці, але для живого тестування сцени в шоломі через Link/PCVR потрібні 72–90 FPS у стерео, 16+ ГБ RAM та відеокарта рівня RTX 3060/4060 із 6–8+ ГБ VRAM.'
      },
      {
        q: 'Як використати "Звіт для ментора" перед стартом навчання Unity та C#?',
        a: 'Натисніть кнопку «Звіт для ментора / Info» у картці результату та надішліть скопійований текст при записі на індивідуальні заняття на sivochka.com/. Це допоможе миттєво підібрати правильну версію Unity та формат занять під ваш ПК.'
      },
      {
        q: 'Які мінімальні системні вимоги Unity 6?',
        a: 'Офіційні вимоги публікує сама Unity, тому дивіться їх у документації Unity. Ця перевірка використовує власні пороги: для Unity 6.0 LTS вона очікує щонайменше 8 ГБ RAM, 2 ГБ VRAM і GPU рівня 2 з 10, а для плавного Scene View радить 16 ГБ RAM, 4 ГБ VRAM і GPU рівня 5.'
      },
      {
        q: 'Чи потрібен ігровий ПК, щоб вчити Unity?',
        a: 'Для 2D-проєктів ні. У цій перевірці сценарії 2D та «Школа / Навчання» вимагають лише 8 ГБ RAM, 1 ГБ VRAM і відеокарту початкового рівня, тож звичайний шкільний ноутбук — хороший старт. Потужніше залізо важливе для важкого 3D, HDRP, VR і локального AI.'
      }
    ],
    reqSection: {
      title: 'Системні вимоги Unity',
      intro: 'Чи потягне ваш комп’ютер Unity? Перевірка оцінює залізо за сімома сценаріями Unity: від 2D і шкільних проєктів до HDRP, VR та локального AI. Ця таблиця генерується з тих самих даних, що використовує сам інструмент.',
      caption: 'Мінімум / рекомендовано для кожного сценарію. CPU і GPU — рівні інструмента від 1 до 10.',
      cols: [
        'Сценарій',
        'RAM (мін / рек)',
        'VRAM (мін / рек)',
        'Рівень CPU',
        'Рівень GPU',
        'Швидкий SSD'
      ],
      ssdYes: 'Бажано NVMe',
      ssdNo: 'Не обов’язково',
      notes: [
        'Графічний API та GPU: інструмент читає відеокарту через WebGL2 і, якщо доступно, WebGPU. Деякі цілі мають жорсткі умови: апаратне трасування променів потребує GPU з підтримкою RT і DirectX 12 (лише Windows), а Sentis позначає GPU без підтримки FP16.',
        'CPU: показується як рівень від 1 до 10 (рівень: ядра, {cpuTiers}).',
        'GPU: рівень 1 — програмний рендерер, рівень 10 — флагманська RTX. VRAM оцінюється окремо від рівня GPU.',
        'RAM і диск: бюджет RAM враховує ОС і редактор коду, тому для Rider потрібен більший запас, ніж для VS Code. Жорсткий диск (HDD) знижує оцінку для цілей, яким потрібен NVMe.',
        'Телефони, планшети та ChromeOS не запускають редактор Unity, і перевірка показує це як «не запуститься».'
      ],
      howTitle: 'Як працює перевірка',
      howBody: [
        'Перевірка виконується локально у вашому браузері. Після завантаження сторінка зчитує назву відеокарти через WebGL2 (і WebGPU, якщо він доступний), кількість потоків CPU та обсяг пам’яті, який повідомляє браузер, зіставляє їх із вбудованою таблицею заліза й одразу оцінює кожен сценарій Unity.',
        'Дані про ваше залізо нікуди не надсилаються. Браузери обмежують повідомлену пам’ять до 8 ГБ, тому інструмент оцінює RAM за відеокартою, а RAM, VRAM, диск і редактор можна виправити вручну. Необов’язковий 3-секундний стрес-тест також виконується лише на вашому пристрої.',
        'Сторінка використовує GoatCounter для анонімної статистики відвідувань і кліків; виявлене залізо до неї не потрапляє.'
      ],
      learnTitle: 'Навчання Unity: чи потрібен ігровий ПК?',
      learnBody: [
        'Для 2D-проєктів зазвичай ні. У цій перевірці сценарії 2D та «Школа / Навчання» мають найнижчу планку: від {ram} ГБ RAM, {vram} ГБ VRAM і GPU рівня {gpu}, без обов’язкового NVMe. Дитина, яка вчить Unity і C#, може почати на звичайному шкільному ноутбуці чи старішому ПК.',
        'Важке 3D, HDRP, VR та локальний AI — це там, де потужніше залізо справді важливе. Спершу запустіть перевірку, а потім оберіть проєкт, що підходить до результату.',
        'Батьки та учні можуть отримати допомогу з вибором версії Unity і першого проєкту на індивідуальних уроках Unity.'
      ],
      learnLink: 'Індивідуальні уроки Unity'
    },
    reportTemplate: 'Звіт ПК для Unity (Can I Run Unity?)\nОцінка: {score}/100 (Рівень {grade})\nОС: {os} | CPU: {cpu} | GPU: {gpu} ({vram} ГБ VRAM)\nRAM: {ram} ГБ | Диск: {disk} | IDE: {ide}\nНайкраще підходить: {bestWf} ({bestVer})'
  },

  ru: {
    langName: 'Русский',
    metaTitle: 'Can I Run Unity? Системные требования Unity 6 и проверка ПК',
    metaDesc: 'Бесплатная проверка: потянет ли ваш ПК Unity 6, URP, HDRP, VR и локальный AI. Системные требования Unity, автодетект GPU, CPU и RAM в браузере.',
    metaKeywords: 'потянет ли пк unity, системные требования unity 6, проверка пк для юнити, unity urp hdrp требования, unity vr требования, локальный ai unity, sivochka, figarist',
    navWorkflows: 'Сценарии',
    navMatrix: 'Матрица',
    navUpgrades: 'Апгрейд',
    navDoctor: 'Оптимизация',
    navGuide: 'Гайд и FAQ',
    navHub: 'sivochka.com',
    localPill: '100% ЛОКАЛЬНО',
    heroKicker: 'ЛОКАЛЬНЫЙ АНАЛИЗАТОР ЖЕЛЕЗА · БЕЗ ОТПРАВКИ НА СЕРВЕР',
    heroTitle: 'Потянет ли мой ПК Unity?',
    heroLead: 'Мгновенная проверка в браузере для Unity 6, 2022 LTS, URP/HDRP, VR/XR и одновременного запуска локальных AI-моделей кода вместе с Unity Editor.',
    factWebgl: 'WebGL2 и WebGPU',
    factUnity: 'Unity 6 и 2022 LTS',
    factAi: 'Sentis и Local LLM',
    factZero: 'Приватно · Без серверов',
    btnDetect: 'Переопределить ПК',
    btnBench: 'Точный GPU/CPU тест (3 сек)',
    benchRunning: 'Идёт стресс-тест...',
    benchResult: 'Измерено: {fps} FPS шейдер · {cpu} оп/с CPU',
    presetsLabel: 'Быстрые пресеты ПК:',
    presetSchool: 'Школьный ноутбук',
    presetSchoolMeta: '8 ГБ · Intel UHD · SATA',
    presetMac: 'MacBook Air M2',
    presetMacMeta: '8 ГБ Unified · Metal',
    presetIndie: 'Инди-ПК',
    presetIndieMeta: '16 ГБ · RTX 3060 12G',
    presetPro: 'Pro AI & 3D ПК',
    presetProMeta: '32 ГБ · RTX 4070 Super',
    specOs: 'Операционная система',
    specCpu: 'Процессор (потоки)',
    specGpu: 'Видеокарта (GPU)',
    specVram: 'Видеопамять (VRAM)',
    specRam: 'Оперативная память (RAM)',
    specDisk: 'Накопитель',
    specIde: 'Редактор кода (IDE)',
    snapRamLabel: 'Быстро RAM:',
    snapVramLabel: 'Быстро VRAM:',
    ramCapNote: 'Браузер ограничивает deviceMemory на 8 ГБ. Оценено {ram} ГБ по вашему GPU — измените при необходимости:',
    detectedRaw: 'Определён GPU:',
    scoreTitle: 'Индекс готовности к Unity',
    bestPickLabel: 'Лучший выбор для вашего ПК',
    bestMatchTag: 'ТОП ВЫБОР',
    ramBarTitle: 'Бюджет RAM (Unity Editor + IDE)',
    vramBarTitle: 'Пул VRAM видеокарты (Вьюпорт / Бейк / AI)',
    ramUsedLabel: 'ОС {os}Г + Unity {unity}Г + IDE {ide}Г',
    ramFreeLabel: '{free} ГБ свободного запаса',
    vramFreeLabel: '{free} ГБ свободно для Lightmap / AI',
    btnCopyLink: 'Скопировать ссылку на ПК',
    btnCopyReport: 'Отчёт для ментора / Info',
    copiedToast: 'Скопировано в буфер обмена!',
    mentorCtaTitle: 'Хочешь изучать Unity и C# на этом ПК?',
    mentorCtaDesc: 'Индивидуальное менторство с Игорем Сивочкой (Figarist). Скопируй отчёт выше, чтобы подобрать оптимальную версию Unity и первый проект.',
    mentorCtaBtn: 'Записаться на занятия 1-на-1',
    workflowsTitle: 'Оптимальный сценарий в Unity',
    workflowsSub: 'Оценка FPS в Scene View, скорости компиляции C# и запаса памяти.',
    matrixTitle: 'Полная матрица: версии Unity, рендер и AI',
    matrixSub: '30+ реальных сценариев: Unity 6 / LTS, пакеты, VR и одновременный запуск локальных LLM с редактором.',
    tabAll: 'Все',
    tabVersions: 'Версии Unity',
    tabPipelines: 'Рендер и свет',
    tabPackages: 'Пакеты и XR',
    tabAi: 'AI и Local LLM',
    tabTools: 'IDE и инструменты',
    searchPlaceholder: 'Поиск Unity 6, HDRP, Sentis, Qwen, Rider...',
    filterAllStatus: 'Все статусы',
    statusCanRun: 'Идёт отлично',
    statusSlow: 'Идёт (умеренно)',
    statusTight: 'Впритык / нюансы',
    statusCannot: 'Не рекомендуется',
    colTarget: 'Цель / Пакет Unity',
    colGrade: 'Оценка',
    colStatus: 'Статус',
    colPerf: 'Ожид. FPS / Комп.',
    colNotes: 'Ограничения и советы',
    upgradesTitle: 'Что даст апгрейд ПК?',
    upgradesSub: 'Симуляция прироста баллов и новых возможностей Unity.',
    upgradeFromTo: '{from} → {to} (уровень {grade})',
    doctorTitle: 'Unity Doctor: как ускорить на этом ПК',
    doctorSub: 'Конкретные настройки Unity Editor под ваши узкие места.',
    seoKicker: 'ТЕХНИЧЕСКИЙ ГАЙД И ТРЕБОВАНИЯ',
    seoTitle: 'Как Unity 6, рендер-пайплайны, SSD и локальный AI работают на реальном железе',
    seoLead: 'Can I Run Unity? объединяет диагностику WebGL2/WebGPU с практическими порогами для Unity 6 (6000.x), 2022.3 LTS, Android/Wear OS билдов, OpenXR-шлемов и локального инференса ONNX/LLM.',
    seoCards: [
      {
        title: '1. Built-in против URP и HDRP',
        body: 'Built-in и URP 2D плавно работают даже на Intel UHD или Apple M1/M2 с 8 ГБ RAM. URP 3D с Shader Graph требует 4–6 ГБ VRAM, а HDRP 17.x и Raytracing — от 8–12+ ГБ VRAM и 32 ГБ оперативной памяти.'
      },
      {
        title: '2. Почему RAM, IDE и NVMe SSD критичны',
        body: 'Скорость компиляции в Unity зависит от случайного доступа NVMe к папке Library/Bee. Открытый Rider (3.6 ГБ) или Visual Studio (2.8 ГБ) легко переполняет 8 ГБ ноутбуки — переход на VS Code экономит ~2 ГБ RAM.'
      },
      {
        title: '3. Sentis, ML-Agents и Local LLM',
        body: 'Запуск Unity Sentis (ONNX) или локальной Qwen-Coder 7B–14B через Ollama делит VRAM с окном Scene View. Под вьюпорт Unity URP резервируется ~2.5 ГБ VRAM, а остаток уходит под веса модели.'
      }
    ],
    seoTableTitle: 'Ориентировочные требования по типам задач в Unity',
    seoTableCols: ['Сценарий', 'CPU и накопитель', 'RAM и IDE', 'Видеокарта / VRAM'],
    seoTableRows: [
      ['2D / Mobile / Wear OS', '4+ потока · SATA/NVMe SSD', '8–16 ГБ · VS Code', '2 ГБ VRAM / iGPU / M1+'],
      ['3D Инди (Unity 6 URP)', '6+ ядер (12T) · NVMe SSD', '16 ГБ · VS2022 / Rider', '6–8 ГБ (RTX 3060 / RX 6600)'],
      ['VR / XR (Quest и PICO)', '8 ядер · NVMe SSD', '16–32 ГБ · Rider', '8–12 ГБ (RTX 3070 / 4070)'],
      ['HDRP + Local Qwen-Coder 14B', '8–12+ ядер · PCIe 4.0 NVMe', '32–64 ГБ · Rider', '12–24 ГБ (RTX 4070S / 4090)']
    ],
    seoEcoTitle: 'Экосистема геймдев и EdTech инструментов Figarist',
    seoEcoLead: 'Создал Игорь Сивочка (Figarist) как часть открытого набора инструментов для разработчиков игр, учителей и учеников:',
    faqTitle: 'Частые вопросы (FAQ)',
    footerMade: 'Создал Игорь Сивочка (Figarist) для разработчиков игр и учеников.',
    wfNames: {
      'wf-2d-mobile': '2D, Mobile и Wear OS',
      'wf-3d-indie': '3D Инди и стилизованные игры',
      'wf-multiplayer': '3D Мультиплеер и FPS',
      'wf-hdrp': 'AAA Фотореализм (HDRP)',
      'wf-xr': 'VR / XR (Quest и PICO)',
      'wf-ai': 'AI: Sentis, ML-Agents и Local LLM',
      'wf-edu': 'Школа / Обучение / Ноутбук'
    },
    bottlenecks: {
      os_not_desktop: 'Unity Editor требует десктопной ОС (Windows, macOS или Linux).',
      ram_low: 'RAM {actual} ГБ < {req} ГБ мин. (риск вылетов при билде).',
      ram_tight: 'RAM {actual} ГБ < {req} ГБ рек. (закройте лишние вкладки браузера).',
      vram_low: 'VRAM {actual} ГБ < {req} ГБ мин.',
      vram_tight: 'VRAM {actual} ГБ < {req} ГБ рек. (снизьте качество текстур во вьюпорте).',
      cpu_low: 'Слабый CPU (медленная компиляция C# и IL2CPP).',
      gpu_low: 'GPU ниже уровня {req} для плавной работы в Scene View.',
      hdd_slow: 'HDD замедляет импорт ассетов и Domain Reload в 2–4 раза.',
      no_rt: 'Видеокарта не поддерживает аппаратный Raytracing.',
      no_dx12: 'Аппаратный DX12 Raytracing доступен только на Windows.',
      no_fp16: 'GPU не имеет быстрого FP16 для нейросетей.',
      rider_8gb: 'JetBrains Rider берёт ~3.6 ГБ RAM; на 8 ГБ лучше выбрать VS Code.'
    },
    doctorTipsMap: {
      doc_low_ram_ide: 'Замените Rider или Visual Studio на VS Code / Antigravity — это освободит ~2 ГБ RAM.',
      doc_enter_play_mode: 'Включите "Enter Play Mode Options" (Project Settings → Editor), чтобы отключить Domain Reload и тестировать в 5× быстрее.',
      doc_hdd_ssd: 'Перенесите проект и папку Library/ на SSD/NVMe — HDD критически тормозит импорт.',
      doc_urp_low_vram: 'Используйте URP вместо HDRP и поставьте Texture Mipmap Limit = Half Res в Quality Settings.',
      doc_asmdef: 'Разбейте C#-скрипты на Assembly Definitions (.asmdef), чтобы перекомпилировался только изменённый код.',
      doc_gpu_lightmapper: 'Включите Progressive GPU Lightmapper в окне Lighting — запекание света ускорится в 4–8 раз.',
      doc_pro_optimal: 'Ваш ПК в топе! Смело включайте GPU Lightmapper, Multiplayer Play Mode и локальный Qwen-Coder 7B+.'
    },
    faqItems: [
      {
        q: 'Отправляются ли данные о моём ПК на внешний сервер?',
        a: 'Нет. Весь автодетект WebGL2/WebGPU, 60 мс и 3-секундный бенчмарк, а также расчёт баллов выполняются на 100% локально в браузере.'
      },
      {
        q: 'Почему автодетект иногда показывает 8 ГБ RAM, если у меня 16 или 32 ГБ?',
        a: 'Для защиты приватности Chrome и Edge ограничивают navigator.deviceMemory на уровне 8 ГБ. Инструмент подсказывает реалистичный объём RAM по классу GPU и позволяет изменить его в один клик.'
      },
      {
        q: 'Чем отличаются требования Unity 6 от Unity 2022.3 LTS?',
        a: 'Unity 6 (6000.x) добавляет Render Graph и GPU Resident Drawer, которые заметно выигрывают от NVMe SSD и 16+ ГБ RAM. На 8 ГБ ноутбуках со встроенной графикой Unity 2022.3 LTS (Built-in / URP 2D) остаётся чуть легче.'
      },
      {
        q: 'Можно ли использовать HDRP на ноутбуке со встроенной графикой?',
        a: 'Не рекомендуется. HDRP требует 8+ ГБ видеопамяти и 16–32 ГБ RAM. Для ноутбуков и большинства инди-игр лучше выбрать URP — он даёт в 2–3 раза более высокий FPS во вьюпорте.'
      },
      {
        q: 'Сколько RAM нужно для Unity вместе с JetBrains Rider или Visual Studio?',
        a: 'ОС занимает ~3.5 ГБ, Unity Editor — 2.5–4.5 ГБ, Rider — ~3.6 ГБ, Visual Studio — ~2.8 ГБ. На 8 ГБ лучше выбрать VS Code (~1 ГБ), 16 ГБ комфортно для URP, а 32 ГБ идеально для HDRP или Blender рядом.'
      },
      {
        q: 'Почему SSD/NVMe настолько критичен для скорости Unity?',
        a: 'Проект Unity содержит тысячи мелких файлов в Assets/ и Library/Bee/. На HDD открытие проекта, импорт пакетов и Domain Reload проходят в 2–4 раза медленнее, чем на NVMe SSD.'
      },
      {
        q: 'Потянет ли ПК локальный AI-ассистент (Ollama / Qwen-Coder) вместе с Unity?',
        a: 'Да! Под вьюпорт Unity URP резервируется ~2.5 ГБ VRAM. Модель 3B (~2.5 ГБ) поместится на 6–8 ГБ GPU, 7B–8B (~5.5 ГБ) — на 8–12 ГБ GPU, а 14B (~9.5 ГБ) — на RTX 3060 12GB / RTX 4070 Super или 24–32 ГБ Apple Silicon.'
      },
      {
        q: 'Как работает Unity на Mac Apple Silicon (M1, M2, M3, M4)?',
        a: 'Очень быстро в 2D, мобильных билдах и URP 3D благодаря высокой производительности на ядро и Metal. Однако на 8 ГБ моделях при IL2CPP-билдах не хватает памяти — комфортнее 16–24+ ГБ Unified Memory.'
      },
      {
        q: 'Какое железо нужно для разработки под VR / XR (Meta Quest Link, PICO SDK)?',
        a: 'Собирать APK для автономного Quest/PICO можно и на среднем ноутбуке, но для живого теста сцены в шлеме нужны 72–90 FPS в стерео, 16+ ГБ RAM и видеокарта уровня RTX 3060/4060 с 6–8+ ГБ VRAM.'
      },
      {
        q: 'Как использовать "Отчёт для ментора" перед началом обучения Unity и C#?',
        a: 'Нажмите «Отчёт для ментора / Info» и отправьте скопированный текст при записи на занятия 1-на-1 на sivochka.com/ — это поможет сразу подобрать оптимальную версию Unity.'
      },
      {
        q: 'Каковы минимальные системные требования Unity 6?',
        a: 'Официальные требования публикует сама Unity, поэтому смотрите их в документации Unity. Эта проверка использует собственные пороги: для Unity 6.0 LTS она ожидает не менее 8 ГБ RAM, 2 ГБ VRAM и GPU уровня 2 из 10, а для плавного Scene View рекомендует 16 ГБ RAM, 4 ГБ VRAM и GPU уровня 5.'
      },
      {
        q: 'Нужен ли игровой ПК, чтобы учить Unity?',
        a: 'Для 2D-проектов нет. В этой проверке сценарии 2D и «Школа / Обучение» требуют всего 8 ГБ RAM, 1 ГБ VRAM и видеокарту начального уровня, так что обычный школьный ноутбук — хороший старт. Более мощное железо важно для тяжёлого 3D, HDRP, VR и локального AI.'
      }
    ],
    reqSection: {
      title: 'Системные требования Unity',
      intro: 'Потянет ли ваш компьютер Unity? Проверка оценивает железо по семи сценариям Unity: от 2D и школьных проектов до HDRP, VR и локального AI. Эта таблица генерируется из тех же данных, которые использует сам инструмент.',
      caption: 'Минимум / рекомендовано для каждого сценария. CPU и GPU — уровни инструмента от 1 до 10.',
      cols: [
        'Сценарий',
        'RAM (мин / рек)',
        'VRAM (мин / рек)',
        'Уровень CPU',
        'Уровень GPU',
        'Быстрый SSD'
      ],
      ssdYes: 'Желателен NVMe',
      ssdNo: 'Не обязателен',
      notes: [
        'Графический API и GPU: инструмент читает видеокарту через WebGL2 и, если доступно, WebGPU. У некоторых целей есть жёсткие условия: аппаратная трассировка лучей требует GPU с поддержкой RT и DirectX 12 (только Windows), а Sentis отмечает GPU без поддержки FP16.',
        'CPU: показывается как уровень от 1 до 10 (уровень: ядра, {cpuTiers}).',
        'GPU: уровень 1 — программный рендерер, уровень 10 — флагманская RTX. VRAM оценивается отдельно от уровня GPU.',
        'RAM и диск: бюджет RAM учитывает ОС и редактор кода, поэтому для Rider нужен больший запас, чем для VS Code. Жёсткий диск (HDD) снижает оценку для целей, которым желателен NVMe.',
        'Телефоны, планшеты и ChromeOS не запускают редактор Unity, и проверка показывает это как «не запустится».'
      ],
      howTitle: 'Как работает проверка',
      howBody: [
        'Проверка выполняется локально в вашем браузере. После загрузки страница считывает название видеокарты через WebGL2 (и WebGPU, если он доступен), число потоков CPU и объём памяти, который сообщает браузер, сопоставляет их со встроенной таблицей железа и сразу оценивает каждый сценарий Unity.',
        'Данные о вашем железе никуда не отправляются. Браузеры ограничивают сообщаемую память до 8 ГБ, поэтому инструмент оценивает RAM по видеокарте, а RAM, VRAM, диск и редактор можно поправить вручную. Необязательный 3-секундный стресс-тест тоже выполняется только на вашем устройстве.',
        'Страница использует GoatCounter для анонимной статистики посещений и кликов; обнаруженное железо в неё не попадает.'
      ],
      learnTitle: 'Изучение Unity: нужен ли игровой ПК?',
      learnBody: [
        'Для 2D-проектов обычно нет. В этой проверке сценарии 2D и «Школа / Обучение» имеют самую низкую планку: от {ram} ГБ RAM, {vram} ГБ VRAM и GPU уровня {gpu}, без обязательного NVMe. Ребёнок, который учит Unity и C#, может начать на обычном школьном ноутбуке или старом ПК.',
        'Тяжёлое 3D, HDRP, VR и локальный AI — это то, где более мощное железо действительно важно. Сначала запустите проверку, а затем выберите проект, подходящий под результат.',
        'Родители и ученики могут получить помощь с выбором версии Unity и первого проекта на индивидуальных уроках Unity.'
      ],
      learnLink: 'Индивидуальные уроки Unity'
    },
    reportTemplate: 'Отчёт ПК для Unity (Can I Run Unity?)\nОценка: {score}/100 (Уровень {grade})\nОС: {os} | CPU: {cpu} | GPU: {gpu} ({vram} ГБ VRAM)\nRAM: {ram} ГБ | Диск: {disk} | IDE: {ide}\nЛучший выбор: {bestWf} ({bestVer})'
  },

  ko: {
    langName: '한국어',
    metaTitle: 'Can I Run Unity? 유니티 6 권장 사양·요구 사양 검사기',
    metaDesc: '내 PC에서 Unity 6, URP, HDRP, VR, 로컬 AI가 돌아갈까요? 무료 Unity 시스템 요구 사양 검사기로 GPU, CPU, RAM을 브라우저에서 자동 감지해 확인하세요. 하드웨어 정보는 서버로 업로드되지 않습니다.',
    metaKeywords: '유니티 사양, unity 6 권장사양, unity pc 호환성, unity urp hdrp 사양, unity vr 사양, 로컬 llm unity, sivochka, figarist',
    navWorkflows: '워크플로',
    navMatrix: '전체 매트릭스',
    navUpgrades: '업그레이드',
    navDoctor: '최적화',
    navGuide: '가이드 & FAQ',
    navHub: 'sivochka.com',
    localPill: '100% 로컬 처리',
    heroKicker: '로컬 하드웨어 분석기 · 서버 전송 없음',
    heroTitle: '내 PC에서 Unity가 돌아갈까?',
    heroLead: 'Unity 6, 2022 LTS, URP/HDRP, VR/XR 및 에디터와 함께 실행하는 로컬 AI 코딩 모델 호환성을 브라우저에서 바로 확인하세요.',
    factWebgl: 'WebGL2 & WebGPU',
    factUnity: 'Unity 6 & 2022 LTS',
    factAi: 'Sentis & 로컬 LLM',
    factZero: '개인정보 보호 · 서버 미전송',
    btnDetect: '하드웨어 다시 감지',
    btnBench: '3초 GPU/CPU 스트레스 테스트',
    benchRunning: '테스트 중...',
    benchResult: '측정값: {fps} FPS 셰이더 · {cpu} ops/s CPU',
    presetsLabel: '빠른 기준 프리셋:',
    presetSchool: '학생용 노트북',
    presetSchoolMeta: '8 GB · Intel UHD · SATA',
    presetMac: 'MacBook Air M2',
    presetMacMeta: '8 GB 통합메모리 · Metal',
    presetIndie: '인디 PC',
    presetIndieMeta: '16 GB · RTX 3060 12G',
    presetPro: '프로 AI & 3D 사양',
    presetProMeta: '32 GB · RTX 4070 Super',
    specOs: '운영체제',
    specCpu: 'CPU / 스레드',
    specGpu: '그래픽카드 (GPU)',
    specVram: 'VRAM (GB)',
    specRam: '시스템 RAM',
    specDisk: '저장장치',
    specIde: '코드 에디터 (IDE)',
    snapRamLabel: '빠른 RAM:',
    snapVramLabel: '빠른 VRAM:',
    ramCapNote: '브라우저 개인정보 보호로 deviceMemory가 8 GB로 제한됩니다. GPU 등급 기반 {ram} GB 추정 — 필요시 수정하세요:',
    detectedRaw: '감지된 GPU:',
    scoreTitle: 'Unity 준비 점수',
    bestPickLabel: '내 PC에 가장 적합한 구성',
    bestMatchTag: '최적 추천',
    ramBarTitle: '예상 RAM 사용량 (Editor + IDE)',
    vramBarTitle: 'GPU VRAM 풀 (뷰포트 / 베이크 / AI)',
    ramUsedLabel: 'OS {os}G + Unity {unity}G + IDE {ide}G',
    ramFreeLabel: '여유 공간 {free} GB',
    vramFreeLabel: 'Lightmapper / AI 여유분 {free} GB',
    btnCopyLink: 'PC 링크 복사',
    btnCopyReport: '멘토용 리포트 복사',
    copiedToast: '클립보드에 복사되었습니다!',
    mentorCtaTitle: '이 PC로 Unity & C#을 배우고 싶나요?',
    mentorCtaDesc: 'Ihor Sivochka (Figarist)와 1:1 멘토링. 위 리포트를 복사해 보내주시면 가장 알맞은 Unity 버전과 첫 프로젝트를 추천해 드립니다.',
    mentorCtaBtn: '1:1 멘토링 신청하기',
    workflowsTitle: '워크플로별 추천 등급',
    workflowsSub: 'Scene View FPS, C# Domain Reload 속도 및 메모리 여유도를 기준으로 평가합니다.',
    matrixTitle: 'Unity 버전, 렌더 파이프라인 & AI 전체 보기',
    matrixSub: 'Unity 6 / LTS, 패키지, XR 및 로컬 LLM 동시 실행까지 30개 이상의 항목을 필터링하세요.',
    tabAll: '전체',
    tabVersions: 'Unity 버전',
    tabPipelines: '렌더 & 라이트맵',
    tabPackages: '패키지 & XR',
    tabAi: 'AI & 로컬 LLM',
    tabTools: 'IDE & 도구',
    searchPlaceholder: 'Unity 6, HDRP, Sentis, Qwen, Rider 검색...',
    filterAllStatus: '모든 상태',
    statusCanRun: '원활함',
    statusSlow: '보통 (실행 가능)',
    statusTight: '빠듯함 / 주의',
    statusCannot: '권장하지 않음',
    colTarget: 'Unity 대상 / 작업',
    colGrade: '등급',
    colStatus: '상태',
    colPerf: '예상 FPS / 컴파일',
    colNotes: '병목 및 참고사항',
    upgradesTitle: '업그레이드 시뮬레이터',
    upgradesSub: '부품 업그레이드 시 예상 점수 상승폭과 새로 열릴 기능을 확인하세요.',
    upgradeFromTo: '{from} → {to} ({grade} 등급)',
    doctorTitle: 'Unity Doctor: 이 PC 최적화 팁',
    doctorSub: '현재 하드웨어 병목에 맞춘 실전 Unity Editor 설정 가이드입니다.',
    seoKicker: '엔지니어링 가이드 및 시스템 요구 사양',
    seoTitle: '실제 하드웨어에서의 Unity 6, 렌더 파이프라인, SSD 및 로컬 AI 성능',
    seoLead: 'Can I Run Unity?는 WebGL2/WebGPU 진단과 Unity 6 (6000.x), 2022.3 LTS, Android/Wear OS 빌드, OpenXR 및 로컬 ONNX/LLM 추론의 실전 요구 사양을 결합합니다.',
    seoCards: [
      {
        title: '1. Built-in vs URP vs HDRP',
        body: 'Built-in과 URP 2D는 Intel UHD나 8 GB RAM의 Apple M1/M2에서도 원활합니다. Shader Graph가 포함된 URP 3D는 4~6 GB VRAM을 권장하며, HDRP 17.x 및 레이트레이싱은 8~12+ GB VRAM과 32 GB RAM이 필요합니다.'
      },
      {
        title: '2. RAM, IDE 및 NVMe SSD가 중요한 이유',
        body: 'Unity 컴파일 속도는 Library/Bee 폴더의 NVMe 랜덤 I/O에 크게 좌우됩니다. Rider(3.6 GB)나 Visual Studio(2.8 GB)를 함께 켜면 8 GB 노트북은 금방 부족해지며 VS Code 사용 시 ~2 GB를 절약할 수 있습니다.'
      },
      {
        title: '3. Sentis, ML-Agents 및 로컬 LLM',
        body: '게임 내 Unity Sentis(ONNX)나 Ollama를 통한 Qwen-Coder 7B~14B 실행 시 Unity 뷰포트와 VRAM을 공유합니다. Unity URP용 ~2.5 GB를 제외한 나머지 VRAM으로 모델 크기를 결정합니다.'
      }
    ],
    seoTableTitle: '작업 유형별 Unity 권장 사양 요약표',
    seoTableCols: ['작업 유형', 'CPU 및 저장장치', 'RAM 및 IDE', 'GPU / VRAM 목표'],
    seoTableRows: [
      ['2D / 모바일 / Wear OS', '4+ 스레드 · SATA/NVMe SSD', '8–16 GB · VS Code', '2 GB VRAM / iGPU / M1+'],
      ['3D 인디 (Unity 6 URP)', '6+ 코어 (12T) · NVMe SSD', '16 GB · VS2022 / Rider', '6–8 GB (RTX 3060 / RX 6600)'],
      ['VR / XR (Quest & PICO)', '8 코어 · NVMe SSD', '16–32 GB · Rider', '8–12 GB (RTX 3070 / 4070)'],
      ['HDRP + 로컬 Qwen-Coder 14B', '8–12+ 코어 · PCIe 4.0 NVMe', '32–64 GB · Rider', '12–24 GB (RTX 4070S / 4090)']
    ],
    seoEcoTitle: 'Figarist 게임 개발 & 에듀테크 생태계',
    seoEcoLead: 'Ihor Sivochka (Figarist)가 인디 게임 개발자, 교사 및 학생을 위해 제작한 오픈 웹 도구입니다:',
    faqTitle: '자주 묻는 질문 (FAQ)',
    footerMade: '게임 개발자와 학생들을 위해 Ihor Sivochka (Figarist)가 제작했습니다.',
    wfNames: {
      'wf-2d-mobile': '2D, 모바일 & Wear OS',
      'wf-3d-indie': '3D 인디 & 스타일라이즈드',
      'wf-multiplayer': '3D 멀티플레이 & FPS',
      'wf-hdrp': 'AAA 실사 그래픽 (HDRP)',
      'wf-xr': 'VR / XR (Quest & PICO)',
      'wf-ai': 'AI: Sentis, ML-Agents & 로컬 LLM',
      'wf-edu': '학교 / 입문용 노트북'
    },
    bottlenecks: {
      os_not_desktop: 'Unity Editor는 Windows, macOS 또는 Linux 데스크톱이 필요합니다.',
      ram_low: 'RAM {actual} GB < 최소 {req} GB (빌드 중 종료 위험).',
      ram_tight: 'RAM {actual} GB < 권장 {req} GB (브라우저 탭을 닫으세요).',
      vram_low: 'VRAM {actual} GB < 최소 {req} GB.',
      vram_tight: 'VRAM {actual} GB < 권장 {req} GB (텍스처 해상도를 낮추세요).',
      cpu_low: 'CPU 성능 부족 (C# 및 IL2CPP 빌드 속도 저하).',
      gpu_low: '원활한 Scene View를 위한 GPU 등급 {req} 미만.',
      hdd_slow: 'HDD는 에셋 임포트와 Domain Reload를 2~4배 느리게 만듭니다.',
      no_rt: '하드웨어 레이트레이싱 코어가 없는 GPU입니다.',
      no_dx12: 'DX12 레이트레이싱은 Windows에서만 지원됩니다.',
      no_fp16: '신경망 추론용 고속 FP16 연산이 부족합니다.',
      rider_8gb: 'JetBrains Rider는 ~3.6 GB RAM을 사용합니다. 8 GB 환경에서는 VS Code를 권장합니다.'
    },
    doctorTipsMap: {
      doc_low_ram_ide: 'Rider/Visual Studio 대신 VS Code / Antigravity를 사용하면 RAM을 ~2 GB 절약할 수 있습니다.',
      doc_enter_play_mode: '"Enter Play Mode Options"(Project Settings → Editor)를 켜서 Domain Reload를 건너뛰세요.',
      doc_hdd_ssd: 'Unity 프로젝트와 Library/ 폴더를 SSD/NVMe로 옮기세요.',
      doc_urp_low_vram: 'HDRP 대신 URP를 사용하고 Quality Settings에서 Texture Mipmap Limit을 Half Res로 설정하세요.',
      doc_asmdef: 'C# 스크립트를 Assembly Definitions(.asmdef)로 분리하여 컴파일 시간을 단축하세요.',
      doc_gpu_lightmapper: 'Lighting 창에서 Progressive GPU Lightmapper를 켜면 라이트 베이킹이 4~8배 빨라집니다.',
      doc_pro_optimal: '최상급 사양입니다! GPU Lightmapper, Multiplayer Play Mode 및 로컬 Qwen-Coder 7B+를 여유롭게 실행할 수 있습니다.'
    },
    faqItems: [
      {
        q: '내 PC 사양 정보가 외부 서버로 전송되나요?',
        a: '아니요. WebGL2/WebGPU 감지, 60ms/3초 스트레스 테스트 및 점수 계산은 모두 브라우저 내에서 100% 로컬로 처리됩니다.'
      },
      {
        q: '실제 RAM이 16 GB 또는 32 GB인데 왜 8 GB로 감지될 수 있나요?',
        a: '브라우저 개인정보 보호 정책으로 navigator.deviceMemory가 최대 8 GB로 제한되기 때문입니다. GPU 등급을 바탕으로 현실적인 RAM을 추정하며 클릭 한 번으로 수정할 수 있습니다.'
      },
      {
        q: 'Unity 6와 Unity 2022.3 LTS의 하드웨어 요구 사양 차이는 무엇인가요?',
        a: 'Unity 6(6000.x)는 Render Graph와 GPU Resident Drawer를 도입하여 NVMe SSD 및 16 GB 이상 RAM에서 성능 이점이 큽니다. 8 GB 내장 그래픽 노트북에서는 Unity 2022.3 LTS(Built-in / URP 2D)가 약간 더 가볍습니다.'
      },
      {
        q: '내장 그래픽 노트북에서도 HDRP를 사용할 수 있나요?',
        a: '권장하지 않습니다. HDRP는 8 GB 이상 VRAM과 16~32 GB RAM이 필요합니다. 노트북이나 인디 3D 개발에는 Scene View FPS가 2~3배 높은 URP를 추천합니다.'
      },
      {
        q: 'Unity + JetBrains Rider 또는 Visual Studio 사용 시 RAM이 얼마나 필요한가요?',
        a: 'OS ~3.5 GB, Unity Editor 2.5~4.5 GB, Rider ~3.6 GB, Visual Studio ~2.8 GB를 사용합니다. 8 GB PC에서는 VS Code(~1 GB)가 안전하며, URP에는 16 GB, HDRP나 Blender 병행에는 32 GB가 이상적입니다.'
      },
      {
        q: 'Unity 속도에서 SSD/NVMe가 왜 그렇게 중요한가요?',
        a: 'Unity 프로젝트의 Assets/ 및 Library/Bee/에는 수천 개의 작은 파일이 있습니다. HDD는 NVMe SSD보다 프로젝트 열기 및 C# Domain Reload가 2~4배 느립니다.'
      },
      {
        q: 'Unity와 로컬 AI 코딩 모델(Ollama / Qwen-Coder)을 동시에 돌릴 수 있나요?',
        a: '네! Unity URP 뷰포트용 ~2.5 GB VRAM을 제외하고 3B(~2.5 GB)는 6~8 GB GPU, 7B~8B(~5.5 GB)는 8~12 GB GPU, 14B(~9.5 GB)는 RTX 3060 12GB / RTX 4070 Super 또는 24~32 GB Apple Silicon에서 원활합니다.'
      },
      {
        q: 'Apple Silicon(M1, M2, M3, M4) Mac에서 Unity 성능은 어떤가요?',
        a: '단일 코어 속도와 Metal 통합 메모리 덕분에 2D, 모바일 빌드 및 URP 3D가 매우 빠릅니다. 단, 8 GB 모델은 IL2CPP 빌드 시 여유가 부족하므로 16~24+ GB 통합 메모리를 권장합니다.'
      },
      {
        q: 'VR / XR(Meta Quest Link & PICO SDK) 개발에는 어떤 사양이 필요한가요?',
        a: '스탠드얼론 APK 빌드는 일반 노트북에서도 가능하지만, 에디터에서 Link/PCVR로 실시간 테스트하려면 72~90 Hz 스테레오 FPS, 16+ GB RAM, RTX 3060/4060(6~8+ GB VRAM) 이상이 필요합니다.'
      },
      {
        q: 'Unity & C# 학습을 시작할 때 멘토 리포트를 어떻게 활용하나요?',
        a: '상단 카드의 "멘토용 리포트 복사" 버튼을 눌러 복사한 뒤 sivochka.com/ 상담 시 전달하면 PC에 딱 맞는 Unity 버전과 첫 프로젝트를 추천해 드립니다.'
      },
      {
        q: 'Unity 6의 최소 시스템 요구 사양은 무엇인가요?',
        a: '공식 요구 사양은 Unity가 직접 공개하므로 Unity 문서를 확인하세요. 이 검사기는 자체 기준을 사용합니다. Unity 6.0 LTS는 RAM 8GB, VRAM 2GB, GPU 등급 2/10 이상을 요구하고, 쾌적한 Scene View를 위해 RAM 16GB, VRAM 4GB, GPU 등급 5를 권장합니다.'
      },
      {
        q: 'Unity를 배우려면 게이밍 PC가 꼭 필요한가요?',
        a: '2D 프로젝트라면 필요하지 않습니다. 이 검사기에서 2D 및 학교/입문용 작업은 RAM 8GB, VRAM 1GB, 보급형 GPU만 요구하므로 일반 학교용 노트북으로도 충분히 시작할 수 있습니다. 고사양 3D, HDRP, VR, 로컬 AI에서는 더 강한 하드웨어가 중요합니다.'
      }
    ],
    reqSection: {
      title: 'Unity 시스템 요구 사양',
      intro: '내 PC에서 Unity가 돌아갈까요? 이 검사기는 2D와 학교 수업용 프로젝트부터 HDRP, VR, 로컬 AI까지 Unity 작업 유형 7가지를 기준으로 하드웨어를 평가합니다. 아래 표는 도구가 실제로 사용하는 데이터에서 그대로 생성됩니다.',
      caption: '작업 유형별 최소 / 권장 사양입니다. CPU와 GPU는 도구가 사용하는 1~10 등급입니다.',
      cols: [
        '작업 유형',
        'RAM (최소 / 권장)',
        'VRAM (최소 / 권장)',
        'CPU 등급',
        'GPU 등급',
        '빠른 SSD'
      ],
      ssdYes: 'NVMe 권장',
      ssdNo: '필수 아님',
      notes: [
        '그래픽 API와 GPU: 검사기는 WebGL2와, 지원되는 경우 WebGPU로 그래픽카드를 읽습니다. 일부 항목에는 필수 조건이 있습니다. 하드웨어 레이 트레이싱은 RT 지원 GPU와 DirectX 12(Windows 전용)가 필요하고, Sentis는 FP16을 지원하지 않는 GPU를 경고합니다.',
        'CPU: 1~10 등급으로 표시됩니다 (등급: 코어 수, {cpuTiers}).',
        'GPU: 1등급은 소프트웨어 렌더러, 10등급은 플래그십 RTX 카드입니다. VRAM은 GPU 등급과 별도로 평가됩니다.',
        'RAM과 디스크: RAM 예산에는 운영체제와 코드 에디터가 포함되므로 Rider는 VS Code보다 여유 메모리가 더 필요합니다. 하드디스크(HDD)는 NVMe를 권장하는 항목의 점수를 낮춥니다.',
        '휴대폰, 태블릿, ChromeOS에서는 Unity 에디터를 실행할 수 없으며, 검사기는 이를 \'실행 불가\'로 표시합니다.'
      ],
      howTitle: '검사 방식',
      howBody: [
        '검사는 브라우저 안에서 로컬로 실행됩니다. 페이지가 열리면 WebGL2(가능하면 WebGPU)에서 그래픽카드 이름을, 브라우저에서 CPU 스레드 수와 보고된 메모리 용량을 읽고, 내장 하드웨어 표와 대조해 Unity 작업 유형별 점수를 바로 계산합니다.',
        '하드웨어 정보는 업로드되지 않습니다. 브라우저는 보고되는 메모리를 8GB로 제한하므로 도구가 그래픽카드를 기준으로 RAM을 추정하며, RAM, VRAM, 저장장치, 에디터는 직접 수정할 수 있습니다. 선택 사항인 3초 스트레스 테스트도 전부 내 기기에서만 실행됩니다.',
        '이 페이지는 익명 방문 및 클릭 통계에 GoatCounter를 사용하며, 감지된 하드웨어 정보는 여기에 포함되지 않습니다.'
      ],
      learnTitle: 'Unity 배우기: 게이밍 PC가 꼭 필요할까요?',
      learnBody: [
        '2D 프로젝트라면 보통 필요하지 않습니다. 이 검사기에서 2D 및 학교/입문용 작업은 기준이 가장 낮아 RAM {ram}GB, VRAM {vram}GB, GPU {gpu}등급부터 가능하며 NVMe도 필수가 아닙니다. Unity와 C#을 배우는 아이도 일반 학교용 노트북이나 오래된 PC에서 시작할 수 있습니다.',
        '고사양 3D, HDRP, VR, 로컬 AI에서는 더 강한 하드웨어가 중요해집니다. 먼저 검사를 실행한 뒤 결과에 맞는 프로젝트를 고르세요.',
        '학부모와 학습자는 1:1 Unity 수업에서 Unity 버전과 첫 프로젝트를 고르는 도움을 받을 수 있습니다.'
      ],
      learnLink: '1:1 Unity 수업'
    },
    reportTemplate: 'Can I Run Unity? 하드웨어 리포트\n점수: {score}/100 ({grade} 등급)\nOS: {os} | CPU: {cpu} | GPU: {gpu} ({vram} GB VRAM)\nRAM: {ram} GB | 저장장치: {disk} | IDE: {ide}\n최적 워크플로: {bestWf} ({bestVer})'
  }
};
