<template>
  <div class="space-y-8">
    <!-- 1. Top Header Dossier Card -->
    <div
      class="paper-card p-6 sm:p-9 relative overflow-hidden border-2 border-slate-900 dark:border-slate-700 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,0.25)] transition-all duration-200"
    >
      <!-- Technical Corner Marks -->
      <div class="absolute top-2.5 left-2.5 text-[10px] font-mono text-slate-400 dark:text-slate-600 select-none pointer-events-none uppercase font-bold">
        [ 03 / CREDENTIALS DOSSIER ]
      </div>
      <div class="absolute top-2.5 right-2.5 text-[10px] font-mono text-slate-400 dark:text-slate-600 select-none pointer-events-none uppercase font-bold">
        [ MULTI-VENDOR VERIFIED REGISTRY ]
      </div>

      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b-2 border-slate-900/15 dark:border-slate-800 mt-2">
        <div class="flex items-start sm:items-center gap-3.5">
          <!-- Award Diploma Stamp -->
          <div
            class="w-12 h-12 rounded-none bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-bold border-2 border-slate-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0"
          >
            <svg class="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>

          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                Цифрові сертифікати & Кваліфікації
              </h3>
              <span class="paper-pill border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[11px]">
                {{ certificates.length }} Верифіковані програми
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              Офіційний реєстр міжнародних сертифікацій: The Linux Foundation та майбутні партнерські компанії.
            </p>
          </div>
        </div>

        <!-- Badges & Verification Status -->
        <div class="flex flex-wrap items-center gap-2">
          <span class="px-3 py-1 rounded-none text-xs font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-mono flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-none bg-emerald-500 animate-pulse"></span>
            <span>100% VERIFIED REGISTRY</span>
          </span>
          <span class="px-3 py-1 rounded-none text-xs font-bold uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-mono">
            MULTI-COMPANY READY
          </span>
        </div>
      </div>

      <!-- Overview text -->
      <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed my-5 font-normal max-w-4xl">
        Нижче представлені офіційні сертифікати Володимира Шаміна. Кожен документ має власний унікальний ідентифікатор у глобальному реєстрі відповідної організації, доступний для миттєвого повноекранного перегляду без сторонніх панелей браузера, завантаження оригінального PDF-файлу та прямої онлайн-верифікації.
      </p>

      <!-- Registry Metadata Bar -->
      <div class="p-3.5 rounded-none bg-slate-50 dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-none bg-blue-600"></span>
          <span>Власник сертифікатів: <strong class="text-slate-900 dark:text-slate-200">Володимир Шамін (Baneronetwo)</strong></span>
        </div>
        <div class="flex items-center gap-3">
          <span>Організацій у портфоліо: <strong class="text-blue-600 dark:text-blue-400">{{ Object.keys(activeIssuersCount).length }}</strong></span>
          <span class="text-slate-400 dark:text-slate-600">•</span>
          <span>Режим відображення: <strong class="text-emerald-600 dark:text-emerald-400">Векторний SVG + Вільний скролінг</strong></span>
        </div>
      </div>
    </div>

    <!-- 2. Interactive Filter & Search Controls -->
    <div class="space-y-4">
      <!-- Company / Issuer Tabs -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-1.5 p-1 rounded-none bg-slate-100 dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] font-mono text-xs">
          <button
            type="button"
            @click="selectedIssuer = 'all'"
            class="px-3 py-1.5 rounded-none uppercase transition-all duration-150 cursor-pointer select-none font-bold"
            :class="[
              selectedIssuer === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
            ]"
          >
            Всі компанії ({{ certificates.length }})
          </button>

          <button
            v-for="(count, issuerId) in activeIssuersCount"
            :key="issuerId"
            type="button"
            @click="selectedIssuer = issuerId"
            class="px-3 py-1.5 rounded-none uppercase transition-all duration-150 cursor-pointer select-none font-bold flex items-center gap-1.5"
            :class="[
              selectedIssuer === issuerId
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
            ]"
          >
            <span>{{ ISSUERS[issuerId]?.shortName || issuerId }}</span>
            <span class="text-[10px] opacity-80 font-normal">({{ count }})</span>
          </button>

          <!-- Future Partners Tag -->
          <button
            type="button"
            @click="selectedIssuer = 'future'"
            class="px-3 py-1.5 rounded-none uppercase transition-all duration-150 cursor-pointer select-none font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30"
            :class="[
              selectedIssuer === 'future'
                ? 'bg-amber-500 text-white dark:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                : ''
            ]"
          >
            + Інші компанії
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full sm:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Пошук (Rust, API, LFEL...)"
            class="w-full px-3 py-2 pl-8 rounded-none border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
          />
          <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <button
            v-if="searchQuery"
            type="button"
            @click="searchQuery = ''"
            class="absolute right-2 top-2 text-xs font-mono text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          v-for="cat in CATEGORIES"
          :key="cat.id"
          type="button"
          @click="selectedCategory = cat.id"
          class="px-2.5 py-1 text-[11px] font-mono rounded-none border transition-colors cursor-pointer select-none uppercase font-bold"
          :class="[
            selectedCategory === cat.id
              ? 'bg-blue-600 text-white border-blue-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-500'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- 3. Certificates Cards Grid -->
    <div v-if="filteredCertificates.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div
        v-for="cert in filteredCertificates"
        :key="cert.id"
        class="paper-card p-6 flex flex-col justify-between relative group border-2 border-slate-900 dark:border-slate-700 shadow-[5px_5px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-[7px_7px_0px_0px_rgba(37,99,235,0.35)] dark:hover:shadow-[7px_7px_0px_0px_rgba(59,130,246,0.3)] transition-all duration-200"
      >
        <div>
          <!-- Header Bar of Certificate Card -->
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-2.5">
              <!-- Color Code Stamp -->
              <div
                class="w-10 h-10 rounded-none flex items-center justify-center font-mono font-black text-xs text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-slate-900 shrink-0"
                :class="cert.badgeBg"
              >
                {{ cert.codeShort }}
              </div>
              <div>
                <span class="text-[10px] font-mono tracking-wider uppercase text-blue-600 dark:text-blue-400 font-bold block truncate max-w-[170px]">
                  {{ cert.issuerName }}
                </span>
                <span class="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  {{ cert.code }}
                </span>
              </div>
            </div>

            <span class="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
              VERIFIED
            </span>
          </div>

          <!-- Mini Certificate Visual Thumbnail Preview (Clickable) -->
          <div
            v-if="cert.previewSvg"
            @click="openModal(cert)"
            class="w-full aspect-[1650/1276] overflow-hidden border-2 border-slate-900 dark:border-slate-700 mb-4 bg-slate-100 dark:bg-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] cursor-pointer group/thumb relative select-none"
            title="Натисніть для перегляду у повноекранному режимі"
          >
            <img
              :src="cert.previewSvg"
              :alt="cert.title"
              class="w-full h-full object-cover transition-transform duration-200 group-hover/thumb:scale-102"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-blue-600/0 group-hover/thumb:bg-blue-600/15 transition-colors flex items-center justify-center">
              <span class="opacity-0 group-hover/thumb:opacity-100 transition-opacity px-2.5 py-1 bg-slate-900/90 text-white font-mono text-[10px] font-bold border border-white uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                🔍 Переглянути
              </span>
            </div>
          </div>

          <!-- Certificate Title -->
          <h4 class="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {{ cert.title }}
          </h4>

          <!-- Summary Description -->
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-4">
            {{ cert.description }}
          </p>

          <!-- Skills tags -->
          <div class="flex flex-wrap items-center gap-1.5 mb-5">
            <span
              v-for="skill in cert.skills"
              :key="skill"
              class="px-2 py-0.5 rounded-none text-[10px] font-mono border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase"
            >
              {{ skill }}
            </span>
          </div>

          <!-- Metadata Box (Date & ID) -->
          <div class="p-3 rounded-none bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 mb-5 font-mono text-[11px] space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">Дата видачі:</span>
              <span class="font-bold text-slate-900 dark:text-slate-200">{{ cert.date }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">ID сертифіката:</span>
              <span class="font-bold text-blue-600 dark:text-blue-400 select-all">{{ cert.verifyId }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons: Preview PDF & Download -->
        <div class="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            @click="openModal(cert)"
            class="paper-btn-primary flex-1 py-2 text-xs"
            title="Переглянути сертифікат у повноекранному режимі"
          >
            <svg class="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>Переглянути</span>
          </button>

          <a
            :href="cert.fileUrl"
            :download="cert.fileName"
            class="paper-btn-secondary px-3 py-2 text-xs shrink-0"
            title="Завантажити оригінальний PDF файл"
          >
            <svg class="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>

          <a
            :href="cert.verifyUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="paper-btn-secondary px-3 py-2 text-xs shrink-0"
            title="Перевірити у реєстрі вендора"
          >
            <svg class="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Extensible Placeholder Card (Ready for other companies) -->
      <div
        v-if="selectedIssuer === 'all' || selectedIssuer === 'future'"
        class="paper-card p-6 flex flex-col justify-between border-2 border-dashed border-slate-400 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 text-left relative"
      >
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="w-8 h-8 rounded-none border border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-black text-sm flex items-center justify-center">
              +
            </span>
            <span class="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              IN PROGRESS
            </span>
          </div>

          <h4 class="text-base font-black tracking-tight text-slate-800 dark:text-slate-200 uppercase mb-2">
            Нові партнерські сертифікації
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal mb-4">
            Портфоліо постійно доповнюється. Заплановані нові кваліфікаційні іспити та програми від провідних технологічних компаній: Cisco Systems, Cloud Native Computing Foundation, Google Cloud та AWS.
          </p>

          <div class="space-y-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-none bg-amber-500"></span>
              <span>Cisco Systems (Мережі та Безпека)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-none bg-blue-500"></span>
              <span>CNCF / Kubernetes (Хмарна інженерія)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-none bg-cyan-500"></span>
              <span>Google Cloud & AWS Архітектура</span>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-400">
          <span>Слот готовий для інтеграції наступних PDF</span>
        </div>
      </div>
    </div>

    <!-- Empty Filter Results -->
    <div
      v-else
      class="paper-card p-10 text-center space-y-3 border-2 border-slate-900 dark:border-slate-700"
    >
      <div class="w-12 h-12 mx-auto rounded-none bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-mono text-lg font-bold">
        ?
      </div>
      <h4 class="text-base font-black uppercase text-slate-900 dark:text-white">
        Сертифікати за обраними фільтрами не знайдені
      </h4>
      <p class="text-xs font-mono text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        Спробуйте змінити пошуковий запит або скинути фільтри організації та категорій.
      </p>
      <button
        type="button"
        @click="resetFilters"
        class="paper-btn-primary text-xs mx-auto mt-2"
      >
        Скинути всі фільтри
      </button>
    </div>

    <!-- ============================================================= -->
    <!-- 4. FLAWLESS FULLSCREEN VIEWER (NATURAL SCROLLING & VECTOR SVG)-->
    <!-- ============================================================= -->
    <!-- ============================================================= -->
    <!-- 4. FLAWLESS FULLSCREEN VIEWER (TELEPORTED TO BODY DIRECTLY) -->
    <!-- ============================================================= -->
    <Teleport to="body" v-if="isMounted">
      <Transition name="fade">
        <div
          v-if="selectedCert"
          class="fixed inset-0 z-[99999] w-screen h-screen bg-slate-950/95 backdrop-blur-md flex flex-col justify-between select-none"
          @click.self="closeModal"
        >
        <!-- Modal Top Header Bar (Fixed h-14, shrink-0, ALWAYS pinned at top: 0) -->
        <header class="h-14 px-3 sm:px-6 bg-slate-100 dark:bg-slate-900 border-b-2 border-slate-900 dark:border-slate-700 flex items-center justify-between gap-3 shrink-0 font-mono z-30">
          <!-- Left: Certificate Title & Index -->
          <div class="flex items-center gap-3 truncate">
            <span class="w-2.5 h-2.5 rounded-none bg-blue-600 shrink-0"></span>
            <div class="truncate">
              <span class="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase truncate">
                {{ selectedCert.code }}: {{ selectedCert.title }}
              </span>
              <span class="hidden md:inline ml-2 text-[11px] text-blue-600 dark:text-blue-400 font-bold">
                [{{ selectedCert.verifyId }}]
              </span>
            </div>
          </div>

          <!-- Right: Viewer Mode Switcher, Zoom & Actions -->
          <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <!-- Mode Toggle: Vector SVG / PDF Viewer -->
            <div class="hidden sm:flex items-center border border-slate-400 dark:border-slate-700 rounded-none overflow-hidden text-[10px]">
              <button
                type="button"
                @click="viewerMode = 'vector'"
                class="px-2.5 py-1 uppercase font-bold transition-colors cursor-pointer"
                :class="viewerMode === 'vector' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950' : 'bg-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'"
                title="Чистий векторний режим"
              >
                Векторний вид
              </button>
              <button
                type="button"
                @click="viewerMode = 'iframe'"
                class="px-2.5 py-1 uppercase font-bold transition-colors cursor-pointer"
                :class="viewerMode === 'iframe' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950' : 'bg-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'"
                title="PDF плагін браузера зі скролінгом"
              >
                PDF Viewer
              </button>
            </div>

            <!-- Zoom Controls (for Vector Mode) -->
            <div v-if="viewerMode === 'vector'" class="flex items-center gap-1 font-mono">
              <button
                type="button"
                @click="zoomOut"
                class="w-7 h-7 rounded-none border border-slate-400 dark:border-slate-700 text-xs font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white cursor-pointer select-none"
                title="Зменшити (-)"
              >
                -
              </button>
              <span class="px-1 text-[11px] font-bold text-slate-600 dark:text-slate-400 min-w-[38px] text-center select-none">
                {{ Math.round(zoomScale * 100) }}%
              </span>
              <button
                type="button"
                @click="zoomIn"
                class="w-7 h-7 rounded-none border border-slate-400 dark:border-slate-700 text-xs font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white cursor-pointer select-none"
                title="Збільшити (+)"
              >
                +
              </button>
              <button
                type="button"
                @click="toggleFitMode"
                class="hidden sm:inline-flex px-2 h-7 rounded-none border text-[10px] font-bold items-center justify-center cursor-pointer select-none transition-colors"
                :class="isFitMode ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-400 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'"
                title="Вписати сертифікат у висоту екрана (F)"
              >
                {{ isFitMode ? '✓ Вписано' : 'Вписати' }}
              </button>
              <button
                type="button"
                @click="resetZoom"
                class="px-1.5 h-7 rounded-none border border-slate-400 dark:border-slate-700 text-[10px] font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer select-none"
                title="100% масштаб (0)"
              >
                100%
              </button>
            </div>

            <!-- Download Button -->
            <a
              :href="selectedCert.fileUrl"
              :download="selectedCert.fileName"
              class="paper-btn-secondary px-2.5 sm:px-3 py-1.5 text-xs font-mono"
              title="Завантажити оригінальний PDF"
            >
              <span class="hidden sm:inline">Завантажити</span>
              <svg class="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>

            <!-- Close Button -->
            <button
              type="button"
              @click="closeModal"
              class="paper-btn-primary px-3 py-1.5 text-xs font-mono bg-red-600 hover:bg-red-700 text-white border-red-700 cursor-pointer"
              title="Закрити вікно (Esc)"
            >
              <span>✕ Закрити</span>
            </button>
          </div>
        </header>

        <!-- Main Body: Pinned between header & footer, flex-1 min-h-0 overflow-y-auto overflow-x-auto -->
        <!-- Natural mouse wheel & trackpad scrolling works unconditionally without any negative coordinate clipping! -->
        <main
          ref="viewerContainerRef"
          class="flex-1 min-h-0 overflow-y-auto overflow-x-auto bg-slate-950 p-2 sm:p-6 flex flex-col focus:outline-none overscroll-contain"
          tabindex="0"
          @wheel="handleViewerWheel"
          @click.self="closeModal"
        >
          <!-- 1. Pure Vector Mode: m-auto centers when smaller, collapses to 0 padding when overflowing -->
          <div
            v-show="viewerMode === 'vector'"
            class="m-auto py-4 sm:py-8 px-2 sm:px-4 flex flex-col items-center justify-center shrink-0"
            @click.self="closeModal"
          >
            <!-- Certificate Board Container with real calculated width and aspect ratio -->
            <div
              class="relative border-4 border-slate-900 dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden shrink-0 transition-[width] duration-150 ease-out select-none"
              :style="certContainerStyle"
            >
              <img
                :src="selectedCert.previewSvg || selectedCert.fileUrl"
                :alt="selectedCert.title"
                class="w-full h-full object-contain block pointer-events-none select-none"
                draggable="false"
              />
            </div>
          </div>

          <!-- 2. Fallback Iframe Mode with Working Scrolling (#view=FitH) -->
          <div v-show="viewerMode === 'iframe'" class="w-full h-full max-w-5xl m-auto min-h-[65vh] border-2 border-slate-700">
            <iframe
              :src="selectedCert.fileUrl + '#view=FitH'"
              class="w-full h-full border-none"
              title="Certificate PDF Viewer"
            ></iframe>
          </div>

          <!-- Floating Navigation Buttons (Centered vertically on screen sides) -->
          <button
            v-if="filteredCertificates.length > 1"
            type="button"
            @click.stop="prevCert"
            class="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-none bg-slate-900/90 hover:bg-slate-900 text-white border-2 border-white flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 z-40 cursor-pointer"
            title="Попередній сертифікат (←)"
          >
            <svg class="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            v-if="filteredCertificates.length > 1"
            type="button"
            @click.stop="nextCert"
            class="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-none bg-slate-900/90 hover:bg-slate-900 text-white border-2 border-white flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 z-40 cursor-pointer"
            title="Наступний сертифікат (→)"
          >
            <svg class="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </main>

        <!-- Modal Bottom Footer (Fixed h-12, shrink-0, ALWAYS pinned at bottom: 0) -->
        <footer class="h-12 px-4 bg-slate-100 dark:bg-slate-900 border-t-2 border-slate-900 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0 z-30">
          <div class="flex items-center gap-3">
            <span>{{ selectedCert.issuerName }} • Офіційний цифровий сертифікат</span>
            <span class="hidden sm:inline text-slate-400 dark:text-slate-600">/</span>
            <span class="hidden sm:inline">Видано: <strong>{{ selectedCert.date }}</strong></span>
          </div>

          <div class="flex items-center gap-4">
            <a
              :href="selectedCert.verifyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>Верифікувати в базі даних 🛡️</span>
            </a>
            <a
              :href="selectedCert.fileUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>Відкрити чистий PDF ↗</span>
            </a>
          </div>
        </footer>
      </div>
    </Transition>
  </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { CERTIFICATES, ISSUERS, CATEGORIES, type Certificate } from '../data/certificates';

const certificates = ref<Certificate[]>(CERTIFICATES);
const selectedIssuer = ref<string>('all');
const selectedCategory = ref<string>('all');
const searchQuery = ref<string>('');

// Count available certificates per issuer
const activeIssuersCount = computed(() => {
  const map: Record<string, number> = {};
  for (const cert of certificates.value) {
    map[cert.issuerId] = (map[cert.issuerId] || 0) + 1;
  }
  return map;
});

// Filtered list based on company, category, and real-time search
const filteredCertificates = computed(() => {
  return certificates.value.filter(cert => {
    // 1. Company filter
    if (selectedIssuer.value !== 'all' && selectedIssuer.value !== 'future') {
      if (cert.issuerId !== selectedIssuer.value) return false;
    }

    // 2. Category filter
    if (selectedCategory.value !== 'all') {
      if (cert.category !== selectedCategory.value) return false;
    }

    // 3. Search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim();
      const matchTitle = cert.title.toLowerCase().includes(q);
      const matchCode = cert.code.toLowerCase().includes(q);
      const matchVerify = cert.verifyId.toLowerCase().includes(q);
      const matchDesc = cert.description.toLowerCase().includes(q);
      const matchSkills = cert.skills.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchCode && !matchVerify && !matchDesc && !matchSkills) {
        return false;
      }
    }

    return true;
  });
});

const resetFilters = () => {
  selectedIssuer.value = 'all';
  selectedCategory.value = 'all';
  searchQuery.value = '';
};

// Modal State & Zoom
const isMounted = ref<boolean>(false);
const selectedCert = ref<Certificate | null>(null);
const viewerMode = ref<'vector' | 'iframe'>('vector');
const zoomScale = ref<number>(1);
const isFitMode = ref<boolean>(true); // DEFAULT: Always opens fitted right in front of user's face!
const viewerContainerRef = ref<HTMLDivElement | null>(null);

const windowWidth = ref<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
const windowHeight = ref<number>(typeof window !== 'undefined' ? window.innerHeight : 800);

const updateWindowDimensions = () => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  }
};

// Compute base width for comfortable reading or fitting screen
const baseWidth = computed(() => {
  const w = windowWidth.value;
  const h = windowHeight.value;
  // Available height for viewer (minus header 56px and footer 48px and padding ~40px)
  const availHeight = Math.max(h - 144, 260);
  const fitWidth = Math.round(availHeight * (1650 / 1276));

  if (isFitMode.value) {
    // Fits 100% inside the viewport both vertically and horizontally, centered right before face!
    return Math.min(fitWidth, Math.round(w * 0.94));
  }

  // 100% detailed scrollable view (e.g. 1080px wide, ~835px high)
  return Math.min(Math.max(Math.round(w * 0.95), 320), 1150);
});

// Dynamic physical width for natural, unclipped scrolling on all devices
const calculatedWidth = computed(() => {
  return Math.round(baseWidth.value * zoomScale.value);
});

const certContainerStyle = computed(() => {
  return {
    width: `${calculatedWidth.value}px`,
    aspectRatio: '1650 / 1276',
    maxWidth: 'none',
    maxHeight: 'none',
  };
});

const handleViewerWheel = (e: WheelEvent) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  }
  // Otherwise, native vertical mouse wheel scrolling occurs naturally on <main>
};

const openModal = (cert: Certificate) => {
  selectedCert.value = cert;
  zoomScale.value = 1;
  isFitMode.value = true; // Always opens fitted right in front of face!
  viewerMode.value = 'vector';
  updateWindowDimensions();
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }
  setTimeout(() => {
    if (viewerContainerRef.value) {
      viewerContainerRef.value.focus();
      viewerContainerRef.value.scrollTo({ top: 0, left: 0 });
    }
  }, 20);
};

const closeModal = () => {
  selectedCert.value = null;
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
};

const zoomIn = () => {
  if (isFitMode.value) {
    isFitMode.value = false;
    zoomScale.value = 1.2;
  } else if (zoomScale.value < 2.2) {
    zoomScale.value = parseFloat((zoomScale.value + 0.15).toFixed(2));
  }
};

const zoomOut = () => {
  if (isFitMode.value) {
    isFitMode.value = false;
    zoomScale.value = 0.85;
  } else if (zoomScale.value > 0.45) {
    zoomScale.value = parseFloat((zoomScale.value - 0.15).toFixed(2));
  }
};

const resetZoom = () => {
  isFitMode.value = false;
  zoomScale.value = 1;
};

const toggleFitMode = () => {
  isFitMode.value = !isFitMode.value;
  zoomScale.value = 1;
  setTimeout(() => {
    viewerContainerRef.value?.scrollTo({ top: 0, left: 0 });
  }, 10);
};

// Switch between certificates in modal
const currentIndex = computed(() => {
  if (!selectedCert.value) return -1;
  return filteredCertificates.value.findIndex(c => c.id === selectedCert.value?.id);
});

const prevCert = () => {
  const list = filteredCertificates.value;
  if (list.length === 0) return;
  const idx = currentIndex.value;
  const prevIdx = idx > 0 ? idx - 1 : list.length - 1;
  selectedCert.value = list[prevIdx];
  zoomScale.value = 1;
  isFitMode.value = false;
  setTimeout(() => {
    viewerContainerRef.value?.scrollTo({ top: 0, left: 0 });
  }, 10);
};

const nextCert = () => {
  const list = filteredCertificates.value;
  if (list.length === 0) return;
  const idx = currentIndex.value;
  const nextIdx = idx < list.length - 1 ? idx + 1 : 0;
  selectedCert.value = list[nextIdx];
  zoomScale.value = 1;
  isFitMode.value = false;
  setTimeout(() => {
    viewerContainerRef.value?.scrollTo({ top: 0, left: 0 });
  }, 10);
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!selectedCert.value) return;
  if (e.key === 'Escape') {
    closeModal();
  } else if (e.key === 'ArrowLeft') {
    prevCert();
  } else if (e.key === 'ArrowRight') {
    nextCert();
  } else if (e.key === '+' || e.key === '=') {
    zoomIn();
  } else if (e.key === '-') {
    zoomOut();
  } else if (e.key === 'f' || e.key === 'F') {
    toggleFitMode();
  } else if (e.key === '0') {
    resetZoom();
  }
};

onMounted(() => {
  isMounted.value = true;
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', updateWindowDimensions);
    updateWindowDimensions();
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('resize', updateWindowDimensions);
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
