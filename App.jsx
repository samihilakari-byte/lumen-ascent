import { useState, useEffect, useCallback, useRef } from "react";

const T = {
  fi: {
    appName:"Lumen Ascent", appSub:"Aligning Insight · PERMA+4",
    calendar:"Kalenteri", diary:"Päiväkirja", stats:"Tilastot", settings:"Asetukset",
    month:"Kuukausi", week:"Viikko", today:"↩ Tänään",
    newEvent:"Uusi tapahtuma", editEvent:"Muokkaa tapahtumaa",
    eventName:"Tapahtuman nimi *", desc:"Kuvaus (vapaaehtoinen)",
    starts:"Alkaa", ends:"Päättyy", delete:"Poista", save:"Tallenna tapahtuma",
    noEvents:"Ei tapahtumia — napauta päivää lisätäksesi.",
    repeat:"Toistuvuus", noRepeat:"Ei toistoa", daily:"Päivittäin", weekly:"Viikoittain",
    permaQ:"PERMA+4 — MIHIN LIITTYY?",
    wellbeing:"Päivän hyvinvointi", weakLabel:"Heikko", strongLabel:"Erinomainen",
    freeWrite:"✍️ Vapaa kirjoitus", freeAssess:"📊 Päivän arviointi",
    freeDiary:"VAPAA PÄIVÄKIRJA", freePlaceholder:"Mitä tänään tapahtui? Mitä ajatuksia, tunteita tai oivalluksia heräsi…",
    saveDay:"Tallenna päivä", saved:"✓ Päivä tallennettu!",
    searchDiary:"Hae päiväkirjamerkinnöistä…", searchResults:"hakutulosta", noResults:"Ei tuloksia haulle",
    streakLabel:(s)=>`${s} päivän putki`,
    streakMsg:(s)=>s===0?"Aloita tänään!":s<7?"Hyvä alku!":s<14?"Hieno viikko!":s<30?"Loistavaa!":"Hämmästyttävää! 🏆",
    avgLast:"VIIMEISEN", avgDays:"PÄIVÄN KESKIARVOT",
    trendTitle:"TRENDI — napauta osa-aluetta", bestWeek:"PARAS VIIKKOSI",
    bestWeekMsg:(w,sc,cat)=>`Viikolla ${w} hyvinvointisi oli huipussaan (${sc}/10) — erityisesti "${cat}". Mitä teit silloin?`,
    noData:"Ei vielä tarpeeksi dataa", noDataSub:"Täytä päiväkirja muutamana päivänä.",
    tagImpact:"TAPAHTUMATAGIEN VAIKUTUS",
    tagMsg:(label,w,wo)=>`Kalenterin ${label}-päivinä arvosanasi on ${w} vs. muina päivinä ${wo}.`,
    tagPositive:" Tämä tukee hyvinvointiasi! 🌟", tagNeutral:" Huomionarvoinen havainto.",
    noTagData:"Lisää PERMA+4-tageja kalenteritapahtumiin, niin korrelaatiot näkyvät tässä.",
    reminderTitle:"Päivittäinen muistutus", reminderSub:"Muistuttaa täyttämään päiväkirjan",
    reminderTime:"MUISTUTUSAIKA", reminderSave:"Tallenna asetukset",
    permDenied:"Ilmoituslupa on estetty. Salli se selaimesi asetuksista.",
    permDefault:"Ilmoituslupa tarvitaan muistutuksia varten.",
    permAllow:"Salli ilmoitukset", permGranted:"Ilmoituslupa myönnetty",
    language:"Kieli", showInfoIcons:"Näytä ohje-painikkeet (ⓘ)",
    exportData:"Vie data CSV-tiedostona", exportBtn:"Lataa CSV",
    weekSummary:"Viikkoyhteenveto sunnuntaisin",
    dataStorage:"Kaikki data tallennetaan vain tällä laitteella.",
    infoClose:"Selvä, kiitos!",
    months:["Tammikuu","Helmikuu","Maaliskuu","Huhtikuu","Toukokuu","Kesäkuu","Heinäkuu","Elokuu","Syyskuu","Lokakuu","Marraskuu","Joulukuu"],
    monthsShort:["Tammi","Helmi","Maalis","Huhti","Touko","Kesä","Heinä","Elo","Syys","Loka","Marras","Joulu"],
    weekdays:["Ma","Ti","Ke","To","Pe","La","Su"],
    weekdaysFull:["Maanantai","Tiistai","Keskiviikko","Torstai","Perjantai","Lauantai","Sunnuntai"],
    events:"TAPAHTUMAT", events_count:(n)=>`${n} meno${n>1?"a":""}`,
    reminderNotifTitle:"PERMA+4 Muistutus 📔", reminderNotifBody:"Aika täyttää päivän hyvinvointipäiväkirja!",
    library:"Tapahtumakirjasto", librarySave:"Tallenna mallipohjaksi",
    libraryDelete:"Poista mallipohja", libraryEmpty:"Ei vielä mallipohjia.",
    libraryEmptySub:"Tallenna tapahtuma mallipohjaksi — löydät sen täältä ensi kerralla.",
    libraryUse:"Käytä",
    sectionAppearance:"ULKOASU", sectionReminders:"MUISTUTUKSET", sectionData:"DATA",
    themeLabel:(d)=>d?"Tumma tila":"Vaalea tila", themeSub:(d)=>d?"Dark mode":"Light mode",
    savedSettings:"✓ Tallennettu!", diaryEntries:"päiväkirjamerkintää", eventsCount:"tapahtumaa",
    inAppReminder:"Muistutus aktivoitu sovelluksessa",
    inAppReminderSub:(h,m)=>`Sinut muistutetaan klo ${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`,
    // Legal & safety
    disclaimer:"Vastuuvapauslauseke",
    disclaimerText:"Lumen Ascent tukee hyvinvointia positiivisen psykologian keinoin. Se on tarkoitettu oman hyvinvoinnin seuraamisen ja kehittämisen tueksi. Sovellus ei korvaa lääketieteellistä, psykologista tai muuta ammatillista hoitoa. Jos sinulla on huoli omasta mielenterveydestäsi, suosittelemme ottamaan yhteyttä terveydenhuollon ammattilaiseen.",
    privacyTitle:"Tietosuoja",
    privacyText:"Yksityisyytesi on meille tärkeää. Kaikki päiväkirjamerkintäsi, arvosanasi ja tapahtumasi tallennetaan ainoastaan tähän laitteeseen. Emme kerää, tallenna tai jaa tietojasi ulkopuolisille. Voit poistaa kaikki tietosi milloin tahansa.",
    deleteAllData:"Poista kaikki tiedot", deleteConfirm:"Haluatko varmasti poistaa kaikki tiedot? Tätä ei voi peruuttaa.", deleteConfirmBtn:"Kyllä, poista kaikki", deleteCancelled:"Peruuta",
    crisisTitle:"Oletko okay?",
    crisisText:"Huomaamme, että sinulla on ollut raskaita päiviä viime aikoina. Se on täysin inhimillistä, eikä sinun tarvitse selviytyä yksin. Ammattilaisen tuki on aina saatavilla.",
    crisisLinks:[{label:"MIELI Kriisipuhelin",value:"09 2525 0111 (24h)"},{label:"Verkkokriisikeskus Tukinet",value:"tukinet.net"},{label:"Hätätilanteessa",value:"Soita 112"}],
    crisisClose:"Kiitos, jatkan sovelluksen käyttöä", crisisAck:"Ymmärrän, kiitos",
    growth:"Kasvu", growthSub:"Opi ja kehity",
    todaysInsight:"TÄMÄN PÄIVÄN OIVALLUS",
    areaMap:"PERMA+4 ALUEKARTTA",
    areaMapSub:"Napauta aluetta oppiaksesi lisää",
    myProfile:"OMA PROFIILINI",
    weekTheme:"VIIKON TEEMA",
    weekThemeSub:"Tällä viikolla keskitymme",
    reflectQ:"Pohdi tätä",
    insightOfDay:"Oivallus",
    strongAreas:"Vahvuutesi", developAreas:"Kehitysalueesi",
    profileSub:"Perustuu viimeisen 30 päivän päiväkirjadataasi",
    noProfileData:"Täytä päiväkirja muutamana päivänä, niin profiilisi ilmestyy tähän.",
    aboutApp:"Tietoa sovelluksesta",
    // Onboarding & Home
    onboardingSlogan:"Align With Purpose",
    onboardingNameQ:"Mikä on nimesi?",
    onboardingNamePlaceholder:"Kirjoita nimesi...",
    onboardingNext:"Jatka", onboardingStart:"Aloitetaan",
    ob1Title:"Tervetuloa", ob1Sub:"Hyvinvointi ei ole sattumaa. Se rakentuu pienistä päivittäisistä valinnoista ja tietoisuudesta.",
    ob2Title:"PERMA+4", ob2Sub:"Seuraat yhdeksää hyvinvoinnin osa-aluetta päivittäin. Ajan myötä opit mitä ne sinulle tarkoittavat.",
    ob3Title:"Miten aloitat", ob3Step1:"Kirjaa päivittäin miten voit", ob3Step2:"Näe miten tekemisesi vaikuttaa hyvinvointiisi", ob3Step3:"Tee pieniä suunnitelmia parempaan",
    greetingMorning:(n)=>`Hyvää huomenta${n?", "+n+"!":"!"}`,
    greetingDay:(n)=>`Hei${n?", "+n+"!":"!"}`,
    greetingEvening:(n)=>`Hyvää iltaa${n?", "+n+"!":"!"}`,
    homeStartDay:"Aloita päivä", homeDayDone:"Päivä kirjattu ✓", homeAddMore:"Lisää merkintä",
    homeTodayInsight:"TÄMÄN PÄIVÄN OIVALLUS", homeQuickLinks:"PIKAVALIKKO",
    gratitudeInline:"KOLME KIITOLLISUUTTA",
    gratitudePlaceholderInline:(n)=>`${n}. Mistä olet tänään kiitollinen?`,
    postAssessTitle:"Mitä haluaisit nostaa?", postAssessSub:"Valitse yksi osa-alue johon haluat keskittyä",
    postAssessSteps:"Anna 1-3 konkreettista tekoa", postAssessStepPlaceholder:"Mitä voit tehdä tänään tai tällä viikolla?",
    postAssessSave:"Tallenna suunnitelma", postAssessSkip:"Ohita tällä kertaa", postAssessSaved:"Suunnitelma tallennettu!",
    home:"Koti",
    dailyGreeting:"Päivä alkaa",
    dailyContinue:"Aloitetaan →",
    homePromptMorning:"Hyvä hetki kirjata aamun ajatukset.",
    homePromptDay:"Miten päivä on sujunut tähän mennessä?",
    homePromptEvening:"Aika reflektoida tätä päivää.",
    homeReadMore:"Lue lisää →",
    selectLanguage:"Valitse kieli", selectLanguageSub:"Voit muuttaa kielen myöhemmin asetuksista.",
    journalLibrary:"Päiväkirja-kirjasto", journalLibraryEmpty:"Ei vielä merkintöjä.",
    journalLibraryEmptySub:"Tallenna ensimmäinen päiväkirjamerkintä, niin se ilmestyy tänne.",
    readEntry:"Lue merkintä", closeEntry:"Sulje",
    // Action plan
    actionPlan:"🎯 Toimintasuunnitelma", gratitude:"🙏 Kiitollisuus",
    actionPlanTitle:"Toimintasuunnitelma", actionPlanSub:"Tunnista heikoin alue ja tee konkreettinen suunnitelma",
    weakestAreas:"KEHITETTÄVÄT OSA-ALUEET (7 pv keskiarvo)",
    noScoresYet:"Täytä ensin Päivän arviointi muutamana päivänä, jotta näet kehitettävät alueesi.",
    currentAvg:"Nykytaso", targetLabel:"Tavoite ensi viikolla",
    actionSteps:"KONKREETTISET TOIMENPITEET (1–3)",
    actionPlaceholder:"Mitä voit tehdä tänään tai tällä viikolla?",
    addAction:"+ Lisää toimenpide", saveActionPlan:"Tallenna suunnitelma",
    actionSaved:"✓ Suunnitelma tallennettu!",
    activeplan:"AKTIIVINEN SUUNNITELMA",
    planProgress:(done,total)=>`${done}/${total} tehty`,
    planDone:"Suunnitelma valmis! 🎉",
    planArea:"Alue", planCurrent:"Nykytaso", planTarget:"Tavoite",
    noPlan:"Ei aktiivista suunnitelmaa.", noPlanSub:"Valitse osa-alue ja tee toimintasuunnitelma.",
    newPlan:"Uusi suunnitelma",
    // I don't want / I want
    iDontWant:"💭 En halua / Haluan", challenges:"HAASTEET",
    challengeTitle:"Tilanne tai haaste",
    dontWantLabel:"En halua:", wantLabel:"Haluan sen sijaan:",
    challengeActions:"Mitä teen asian eteen?",
    saveChallenge:"Tallenna haaste", challengeSaved:"✓ Haaste tallennettu!",
    challengePlaceholder:"Kuvaile tilanne...",
    noChallenges:"Ei vielä haasteita.", noChallengesSub:"Lisää ensimmäinen 'En halua / Haluan' -haaste.",
    addChallenge:"+ Uusi haaste", deleteChallenge:"Poista",
    // Gratitude
    gratitudeTitle:"Kiitollisuuspäiväkirja", gratitudeSub:"Kolme asiaa joista olet kiitollinen tänään",
    gratitudePlaceholder:(n)=>`${n}. Asia joosta olen kiitollinen...`,
    saveGratitude:"Tallenna kiitollisuudet", gratitudeSaved:"✓ Tallennettu!",
    gratitudeStreak:"päivää peräkkäin", gratitudeHistory:"AIEMMAT MERKINNÄT",
    gratitudeEmpty:"Ei vielä kiitollisuusmerkintöjä.", gratitudeEmptySub:"Aloita tänään — kirjoita kolme asiaa joista olet kiitollinen.",
  },
  en: {
    appName:"Lumen Ascent", appSub:"Aligning Insight · PERMA+4",
    calendar:"Calendar", diary:"Journal", stats:"Statistics", settings:"Settings",
    month:"Month", week:"Week", today:"↩ Today",
    newEvent:"New event", editEvent:"Edit event",
    eventName:"Event name *", desc:"Description (optional)",
    starts:"Starts", ends:"Ends", delete:"Delete", save:"Save event",
    noEvents:"No events — tap a day to add one.",
    repeat:"Repeat", noRepeat:"No repeat", daily:"Daily", weekly:"Weekly",
    permaQ:"PERMA+4 — RELATED TO?",
    wellbeing:"Day's wellbeing", weakLabel:"Poor", strongLabel:"Excellent",
    freeWrite:"✍️ Free writing", freeAssess:"📊 Day assessment",
    freeDiary:"FREE JOURNAL", freePlaceholder:"What happened today? What thoughts, feelings or insights arose…",
    saveDay:"Save day", saved:"✓ Day saved!",
    searchDiary:"Search journal entries…", searchResults:"results", noResults:"No results",
    streakLabel:(s)=>`${s} day streak`,
    streakMsg:(s)=>s===0?"Start today!":s<7?"Good start!":s<14?"Great week!":s<30?"Excellent!":"Amazing! 🏆",
    avgLast:"LAST", avgDays:"DAYS AVERAGES",
    trendTitle:"TREND — tap a category", bestWeek:"YOUR BEST WEEK",
    bestWeekMsg:(w,sc,cat)=>`In week ${w} your wellbeing peaked (${sc}/10) — especially "${cat}". What did you do then?`,
    noData:"Not enough data yet", noDataSub:"Fill in the journal for a few days.",
    tagImpact:"CALENDAR TAG IMPACT",
    tagMsg:(label,w,wo)=>`On ${label} days your score is ${w} vs. other days ${wo}.`,
    tagPositive:" This supports your wellbeing! 🌟", tagNeutral:" Noteworthy observation.",
    noTagData:"Add PERMA+4 tags to calendar events and correlations will appear here.",
    reminderTitle:"Daily reminder", reminderSub:"Reminds you to fill in the journal",
    reminderTime:"REMINDER TIME", reminderSave:"Save settings",
    permDenied:"Notification permission denied. Allow it in your browser settings.",
    permDefault:"Notification permission is needed for reminders.",
    permAllow:"Allow notifications", permGranted:"Notification permission granted",
    language:"Language", showInfoIcons:"Show info buttons (ⓘ)",
    exportData:"Export data as CSV", exportBtn:"Download CSV",
    weekSummary:"Weekly summary on Sundays",
    dataStorage:"All data is stored only on this device.",
    infoClose:"Got it, thanks!",
    months:["January","February","March","April","May","June","July","August","September","October","November","December"],
    monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    weekdays:["Mo","Tu","We","Th","Fr","Sa","Su"],
    weekdaysFull:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    events:"EVENTS", events_count:(n)=>`${n} event${n>1?"s":""}`,
    reminderNotifTitle:"PERMA+4 Reminder 📔", reminderNotifBody:"Time to fill in your wellbeing journal!",
    library:"Event Library", librarySave:"Save as template",
    libraryDelete:"Delete template", libraryEmpty:"No templates yet.",
    libraryEmptySub:"Save an event as a template — find it here next time.",
    libraryUse:"Use",
    sectionAppearance:"APPEARANCE", sectionReminders:"REMINDERS", sectionData:"DATA",
    themeLabel:(d)=>d?"Dark mode":"Light mode", themeSub:(d)=>d?"Dark":"Light",
    savedSettings:"✓ Saved!", diaryEntries:"journal entries", eventsCount:"events",
    inAppReminder:"Reminder activated in app",
    inAppReminderSub:(h,m)=>`You will be reminded at ${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`,
    // Legal & safety
    disclaimer:"Disclaimer",
    disclaimerText:"Lumen Ascent supports wellbeing through the principles of positive psychology. It is designed to help you track and develop your personal wellbeing. This app does not replace medical, psychological or other professional care. If you have concerns about your mental health, we encourage you to reach out to a healthcare professional.",
    privacyTitle:"Privacy",
    privacyText:"Your privacy matters to us. All your journal entries, scores and events are stored only on this device. We do not collect, store or share your data with anyone. You can delete all your data at any time.",
    deleteAllData:"Delete all data", deleteConfirm:"Are you sure you want to delete all data? This cannot be undone.", deleteConfirmBtn:"Yes, delete everything", deleteCancelled:"Cancel",
    crisisTitle:"Are you okay?",
    crisisText:"We notice that you have been going through some difficult days recently. That is completely human, and you do not have to face it alone. Support and professional help are always available, no matter where you are.",
    crisisLinks:[{label:"International Helpline Finder",value:"findahelpline.com"},{label:"Befrienders Worldwide",value:"befrienders.org"},{label:"In immediate danger",value:"Contact local emergency services (112 / 911)"}],
    crisisClose:"I'm okay, continue", crisisAck:"Thank you, I understand",
    growth:"Growth", growthSub:"Learn and develop",
    todaysInsight:"TODAY'S INSIGHT",
    areaMap:"PERMA+4 AREA MAP",
    areaMapSub:"Tap an area to learn more",
    myProfile:"MY PROFILE",
    weekTheme:"WEEK THEME",
    weekThemeSub:"This week we focus on",
    reflectQ:"Reflect on this",
    insightOfDay:"Insight",
    strongAreas:"Your strengths", developAreas:"Areas to develop",
    profileSub:"Based on your last 30 days of journal data",
    noProfileData:"Fill in the journal for a few days and your profile will appear here.",
    aboutApp:"About this app",
    // Onboarding & Home
    onboardingSlogan:"Align With Purpose",
    onboardingNameQ:"What is your name?",
    onboardingNamePlaceholder:"Enter your name...",
    onboardingNext:"Continue", onboardingStart:"Let's begin",
    ob1Title:"Welcome", ob1Sub:"Wellbeing is not chance. It is built through small daily choices and self-awareness.",
    ob2Title:"PERMA+4", ob2Sub:"You track nine dimensions of wellbeing daily. Over time, you learn what they mean for you.",
    ob3Title:"How to start", ob3Step1:"Record how you feel each day", ob3Step2:"See how your activities affect your wellbeing", ob3Step3:"Make small plans for improvement",
    greetingMorning:(n)=>`Good morning${n?", "+n+"!":"!"}`,
    greetingDay:(n)=>`Hello${n?", "+n+"!":"!"}`,
    greetingEvening:(n)=>`Good evening${n?", "+n+"!":"!"}`,
    homeStartDay:"Start your day", homeDayDone:"Day recorded", homeAddMore:"Add entry",
    homeTodayInsight:"TODAY'S INSIGHT", homeQuickLinks:"QUICK ACCESS",
    gratitudeInline:"THREE GRATITUDES",
    gratitudePlaceholderInline:(n)=>`${n}. What are you grateful for today?`,
    postAssessTitle:"What would you like to lift?", postAssessSub:"Choose one area to focus on",
    postAssessSteps:"Give 1-3 concrete steps", postAssessStepPlaceholder:"What can you do today or this week?",
    postAssessSave:"Save plan", postAssessSkip:"Skip for now", postAssessSaved:"Plan saved!",
    home:"Home",
    dailyGreeting:"A new day",
    dailyContinue:"Let's go →",
    homePromptMorning:"A good moment to capture your morning thoughts.",
    homePromptDay:"How has your day been going?",
    homePromptEvening:"Time to reflect on today.",
    homeReadMore:"Read more →",
    selectLanguage:"Choose your language", selectLanguageSub:"You can change this later in settings.",
    journalLibrary:"Journal Library", journalLibraryEmpty:"No entries yet.",
    journalLibraryEmptySub:"Save your first journal entry and it will appear here.",
    readEntry:"Read entry", closeEntry:"Close",
    // Action plan
    actionPlan:"🎯 Action Plan", gratitude:"🙏 Gratitude",
    actionPlanTitle:"Action Plan", actionPlanSub:"Identify your weakest area and make a concrete plan",
    weakestAreas:"AREAS TO DEVELOP (7 day average)",
    noScoresYet:"First fill in the Day Assessment for a few days to see your development areas.",
    currentAvg:"Current level", targetLabel:"Goal for next week",
    actionSteps:"CONCRETE STEPS (1–3)",
    actionPlaceholder:"What can you do today or this week?",
    addAction:"+ Add step", saveActionPlan:"Save plan",
    actionSaved:"✓ Plan saved!",
    activeplan:"ACTIVE PLAN",
    planProgress:(done,total)=>`${done}/${total} done`,
    planDone:"Plan complete! 🎉",
    planArea:"Area", planCurrent:"Current", planTarget:"Target",
    noPlan:"No active plan.", noPlanSub:"Select an area and create an action plan.",
    newPlan:"New plan",
    // I don't want / I want
    iDontWant:"💭 I don't want / I want", challenges:"CHALLENGES",
    challengeTitle:"Situation or challenge",
    dontWantLabel:"I don't want:", wantLabel:"Instead I want:",
    challengeActions:"What will I do about it?",
    saveChallenge:"Save challenge", challengeSaved:"✓ Challenge saved!",
    challengePlaceholder:"Describe the situation...",
    noChallenges:"No challenges yet.", noChallengesSub:"Add your first 'I don't want / I want' challenge.",
    addChallenge:"+ New challenge", deleteChallenge:"Delete",
    // Gratitude
    gratitudeTitle:"Gratitude Journal", gratitudeSub:"Three things you are grateful for today",
    gratitudePlaceholder:(n)=>`${n}. Something I'm grateful for...`,
    saveGratitude:"Save gratitude", gratitudeSaved:"✓ Saved!",
    gratitudeStreak:"days in a row", gratitudeHistory:"PREVIOUS ENTRIES",
    gratitudeEmpty:"No gratitude entries yet.", gratitudeEmptySub:"Start today — write three things you are grateful for.",
  },
};

const CATS_DATA = {
  fi:[
    {id:"positive_emotions",label:"Positiiviset tunteet",section:"PERMA",color:"#F59E0B",emoji:"✨",info:"Kuinka paljon koit tänään iloa, kiitollisuutta tai innostusta? Positiiviset tunteet laajentavat ajatteluamme ja rakentavat psyykkistä kestävyyttä."},
    {id:"engagement",label:"Uppoutuminen / Flow",section:"PERMA",color:"#8B5CF6",emoji:"🌊",info:"Pääsitkö tilaan, jossa aika katosi ja olit täysin uppoutunut tekemiseesi? Flow syntyy, kun haaste ja taitotaso kohtaavat sopivasti."},
    {id:"relationships",label:"Ihmissuhteet",section:"PERMA",color:"#EC4899",emoji:"❤️",info:"Miten merkityksellisiltä ihmiskontaktisi tuntuivat tänään? Laadukkaat ihmissuhteet ovat vahvimpia hyvinvoinnin ennustajia."},
    {id:"meaning",label:"Merkitsevyys",section:"PERMA",color:"#0EA5E9",emoji:"🧭",info:"Koitko tekemisesi palvelevan jotain itseäsi suurempaa — arvoja, yhteisöä tai tarkoitusta? Merkitys antaa suunnan ja kestävyyden."},
    {id:"accomplishment",label:"Aikaansaaminen",section:"PERMA",color:"#10B981",emoji:"🏆",info:"Saavutitko tänään jotain, pientäkin? Edistymisen tunne — arjessakin — vahvistaa itseluottamusta ja motivaatiota."},
    {id:"physical_health",label:"Fyysinen terveys",section:"+4",color:"#EF4444",emoji:"💪",info:"Miten kehosi voi tänään? Uni, liike ja ravinto ovat hyvinvoinnin perusta, joka kannattelee kaikkia muita osa-alueita."},
    {id:"growth_mindset",label:"Kasvun asenne",section:"+4",color:"#F97316",emoji:"🌱",info:"Suhtauduitko haasteisiin oppimismahdollisuuksina? Kasvun asenne tarkoittaa uskoa siihen, että kykyjä voi kehittää harjoittelemalla."},
    {id:"environment",label:"Ympäristö",section:"+4",color:"#06B6D4",emoji:"🏡",info:"Tukeeko koti- ja työympäristösi hyvinvointiasi? Viihtyisä ja toimiva ympäristö vaikuttaa suoraan mielialaan ja tuottavuuteen."},
    {id:"economic_security",label:"Taloudellinen turva",section:"+4",color:"#64748B",emoji:"🔐",info:"Koetko taloudellisen tilanteesi riittävän turvalliseksi? Taloudellinen turva vapauttaa henkisiä resursseja muille hyvinvoinnin osa-alueille."},
  ],
  en:[
    {id:"positive_emotions",label:"Positive Emotions",section:"PERMA",color:"#F59E0B",emoji:"✨",info:"How much did you experience joy, gratitude or excitement today? Positive emotions broaden our thinking and build psychological resilience."},
    {id:"engagement",label:"Engagement / Flow",section:"PERMA",color:"#8B5CF6",emoji:"🌊",info:"Did you reach a state where time disappeared and you were fully absorbed? Flow occurs when challenge and skill level meet just right."},
    {id:"relationships",label:"Relationships",section:"PERMA",color:"#EC4899",emoji:"❤️",info:"How meaningful and warm did your human connections feel today? Quality relationships are among the strongest predictors of wellbeing."},
    {id:"meaning",label:"Meaning",section:"PERMA",color:"#0EA5E9",emoji:"🧭",info:"Did you feel that what you did served something larger than yourself — values, community or purpose? Meaning gives direction and endurance."},
    {id:"accomplishment",label:"Accomplishment",section:"PERMA",color:"#10B981",emoji:"🏆",info:"Did you achieve something today, even small? The feeling of progress — even in daily life — strengthens confidence and motivation."},
    {id:"physical_health",label:"Physical Health",section:"+4",color:"#EF4444",emoji:"💪",info:"How is your body doing today? Sleep, movement and nutrition are the foundation of wellbeing that supports all other areas."},
    {id:"growth_mindset",label:"Growth Mindset",section:"+4",color:"#F97316",emoji:"🌱",info:"Did you approach challenges as learning opportunities? Growth mindset means believing that abilities can be developed through practice."},
    {id:"environment",label:"Environment",section:"+4",color:"#06B6D4",emoji:"🏡",info:"Does your home and work environment support your wellbeing? A comfortable and functional environment directly affects mood and productivity."},
    {id:"economic_security",label:"Economic Security",section:"+4",color:"#64748B",emoji:"🔐",info:"Do you feel your financial situation is sufficiently secure? Financial security frees mental resources for other areas of wellbeing."},
  ],
};

const toDateStr=(d)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const todayStr=()=>toDateStr(new Date());
const daysInMonth=(y,m)=>new Date(y,m+1,0).getDate();
const firstWeekday=(y,m)=>{const d=new Date(y,m,1).getDay();return d===0?6:d-1;};
const addDays=(s,n)=>{const d=new Date(s);d.setDate(d.getDate()+n);return toDateStr(d);};
const getWeekMonday=(s)=>{const d=new Date(s);const day=d.getDay();d.setDate(d.getDate()+(day===0?-6:1-day));return toDateStr(d);};
const getWeekNumber=(s)=>{const d=new Date(s);d.setHours(0,0,0,0);d.setDate(d.getDate()+3-(d.getDay()+6)%7);const w=new Date(d.getFullYear(),0,4);return 1+Math.round(((d-w)/86400000-3+(w.getDay()+6)%7)/7);};
const formatFi=(s,months)=>{if(!s)return"";const[y,m,day]=s.split("-");return`${parseInt(day)}. ${months[parseInt(m)-1].toLowerCase()} ${y}`;};
const calcStreak=(diary)=>{let s=0,c=todayStr();if(!diary[c])c=addDays(c,-1);while(diary[c]){s++;c=addDays(c,-1);}return s;};
const moodEmoji=(avg)=>avg>=8.5?"🌟":avg>=7?"😊":avg>=5.5?"🙂":avg>=4?"😐":"😔";
const currentHourStr=()=>{const h=new Date().getHours();return`${String(h).padStart(2,"0")}:00`;};

const STORE_KEY="permaapp_v6";
const load=()=>{try{return JSON.parse(localStorage.getItem(STORE_KEY)||"{}");}catch{return{};}};
const save=(d)=>{try{localStorage.setItem(STORE_KEY,JSON.stringify(d));}catch{}};

const scheduleNotif=(hour,minute,t)=>{
  const fire=()=>{
    const now=new Date(),next=new Date();
    next.setHours(hour,minute,0,0);
    if(next<=now)next.setDate(next.getDate()+1);
    return setTimeout(()=>{if(Notification.permission==="granted")new Notification(t.reminderNotifTitle,{body:t.reminderNotifBody});fire();},next-now);
  };
  return fire();
};

const exportCSV=(data,CATS)=>{
  const diary=data.diary||{},events=data.events||{},catIds=CATS.map(c=>c.id);
  const header=["date","diary_text",...catIds,"event_title","event_tags"].join(",");
  const rows=[];
  Object.keys(diary).sort().forEach(date=>{const d=diary[date];rows.push([date,`"${(d.text||"").replace(/"/g,'""')}"`,catIds.map(id=>d.scores?.[id]||"").join(","),"",""].join(","));});
  Object.values(events).sort((a,b)=>a.date.localeCompare(b.date)).forEach(ev=>{rows.push([ev.date,"",catIds.map(()=>"").join(","),`"${ev.title}"`,`"${(ev.tags||[]).join("|")}"`].join(","));});
  const blob=new Blob([[header,...rows].join("\n")],{type:"text/csv"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download="perma4_data.csv";a.click();
  URL.revokeObjectURL(url);
};


// ── Crisis detection ─────────────────────────────────────────────────────────
const checkCrisis = (diary) => {
  const today = todayStr();
  const last5 = Array.from({length:5}, (_,i) => addDays(today, -(i+1)));
  const keyDimensions = ["positive_emotions", "meaning", "physical_health"];
  let lowDays = 0;
  last5.forEach(date => {
    const scores = diary[date]?.scores || {};
    const hasScores = keyDimensions.some(k => scores[k]);
    if (!hasScores) return;
    const avg = keyDimensions.map(k => scores[k] || 0).filter(v => v > 0);
    if (avg.length > 0 && (avg.reduce((a,b)=>a+b,0)/avg.length) < 4) lowDays++;
  });
  return lowDays >= 3;
};


// ── Crisis Modal ──────────────────────────────────────────────────────────────
function CrisisModal({dark, t, onClose}) {
  const card = dark ? "#1A2332" : "#FFFFFF";
  const border = dark ? "#2D3F55" : "#E8EEF4";
  const text = dark ? "#E2E8F0" : "#1E293B";
  const muted = "#94A3B8";
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-5"
      style={{background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)"}}>
      <div className="w-full max-w-sm rounded-3xl p-6 shadow-2xl"
        style={{background:card, border:`1.5px solid #8B5CF650`}}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{background:"#8B5CF620"}}>🤍</div>
          <div>
            <div className="font-black text-base" style={{color:text}}>{t.crisisTitle}</div>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-5" style={{color:muted}}>{t.crisisText}</p>
        <div className="rounded-2xl p-4 mb-5" style={{background:dark?"#0F1826":"#F8FAFC", border:`1px solid ${border}`}}>
          {t.crisisLinks.map((link, i) => (
            <div key={i} className={`flex items-start gap-3 ${i < t.crisisLinks.length-1 ? "mb-3 pb-3" : ""}`}
              style={{borderBottom: i < t.crisisLinks.length-1 ? `1px solid ${border}` : "none"}}>
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{background:"#8B5CF6"}}/>
              <div>
                <div className="text-xs font-bold" style={{color:text}}>{link.label}</div>
                <div className="text-xs mt-0.5" style={{color:"#8B5CF6"}}>{link.value}</div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={onClose}
          className="w-full py-3.5 rounded-2xl font-bold text-sm"
          style={{background:"#8B5CF6", color:"#fff"}}>
          {t.crisisAck}
        </button>
        <button type="button" onClick={onClose}
          className="w-full py-2.5 mt-2 rounded-2xl text-sm"
          style={{color:muted}}>
          {t.crisisClose}
        </button>
      </div>
    </div>
  );
}

// ── Confetti ──────────────────────────────────────────────────────────────────
function Confetti({active}){
  const p=useRef([...Array(56)].map((_,i)=>({id:i,x:Math.random()*100,delay:Math.random()*0.6,color:["#F59E0B","#8B5CF6","#EC4899","#0EA5E9","#10B981","#EF4444","#F97316","#06B6D4"][i%8],size:5+Math.random()*7,rot:Math.random()*360,dur:1.3+Math.random()*0.9})));
  if(!active)return null;
  return(<div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">{p.current.map(x=><div key={x.id} style={{position:"absolute",left:`${x.x}%`,top:"-20px",width:x.size,height:x.size,background:x.color,borderRadius:"2px",animation:`cf ${x.dur}s ${x.delay}s ease-in forwards`,transform:`rotate(${x.rot}deg)`}}/>)}<style>{`@keyframes cf{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}`}</style></div>);
}

function InfoModal({cat,onClose,dark,t}){
  return(<div className="fixed inset-0 z-[60] flex items-center justify-center p-5" style={{background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)"}} onClick={onClose}><div className="w-full max-w-sm rounded-3xl p-6 shadow-2xl" style={{background:dark?"#1E2A3B":"#fff",border:`1.5px solid ${cat.color}50`}} onClick={e=>e.stopPropagation()}><div className="flex items-center gap-3 mb-4"><div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl" style={{background:cat.color+"22"}}>{cat.emoji}</div><div><div className="text-xs font-semibold tracking-wider mb-0.5" style={{color:cat.color}}>{cat.section}</div><div className="font-bold text-sm" style={{color:dark?"#F1F5F9":"#1E293B"}}>{cat.label}</div></div></div><p className="text-sm leading-relaxed" style={{color:dark?"#94A3B8":"#64748B"}}>{cat.info}</p><button onClick={onClose} className="mt-5 w-full py-2.5 rounded-xl text-sm font-semibold" style={{background:cat.color+"22",color:cat.color}}>{t.infoClose}</button></div></div>);
}

function InfoBtn({cat,dark,t,showInfoIcons}){
  const [show,setShow]=useState(false);
  if(!showInfoIcons)return null;
  return(<>{<button onClick={e=>{e.stopPropagation();setShow(true);}} className="w-5 h-5 rounded-full text-xs flex items-center justify-center shrink-0" style={{background:cat.color+"25",color:cat.color}}>ⓘ</button>}{show&&<InfoModal cat={cat} onClose={()=>setShow(false)} dark={dark} t={t}/>}</>);
}

// Single open tooltip tracker — only one can be open at a time
const _tooltipState = {current: null, setter: null};

function TooltipTag({cat, dark}) {
  const [show, setShow] = useState(false);

  const open = () => {
    // Close previously open tooltip
    if (_tooltipState.setter && _tooltipState.current !== cat.id) {
      _tooltipState.setter(false);
    }
    _tooltipState.current = cat.id;
    _tooltipState.setter = setShow;
    setShow(true);
  };

  const close = () => {
    setShow(false);
    if (_tooltipState.current === cat.id) {
      _tooltipState.current = null;
      _tooltipState.setter = null;
    }
  };

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    show ? close() : open();
  };

  return (
    <div className="relative"
      onMouseEnter={open}
      onMouseLeave={close}
      onTouchStart={toggle}
      onTouchEnd={e=>e.preventDefault()}>
      <span className="text-xs px-1.5 py-0.5 rounded-full cursor-pointer select-none"
        style={{background:cat.color+"22", color:cat.color}}>{cat.emoji}</span>
      {show&&<div className="absolute bottom-full left-1/2 mb-1.5 z-50 pointer-events-none"
        style={{transform:"translateX(-50%)", whiteSpace:"nowrap"}}>
        <div className="px-2 py-1 rounded-lg text-xs font-semibold shadow-lg"
          style={{background:dark?"#1E2A3B":"#1E293B", color:"#fff", border:`1px solid ${cat.color}60`}}>
          {cat.label}
        </div>
        <div className="w-2 h-2 mx-auto -mt-1 rotate-45"
          style={{background:dark?"#1E2A3B":"#1E293B"}}/>
      </div>}
    </div>
  );
}

function PermaSlider({cat,value,onChange,dark,t,showInfoIcons}){
  const sub=dark?"#1E2A3B":"#F1F5F9",mutedC="#94A3B8";
  return(<div className="mb-4">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2"><span>{cat.emoji}</span><span className="text-sm font-medium" style={{color:dark?"#E2E8F0":"#334155"}}>{cat.label}</span><InfoBtn cat={cat} dark={dark} t={t} showInfoIcons={showInfoIcons}/></div>
      <div className="text-sm font-black px-2 py-0.5 rounded-lg" style={{background:cat.color+"20",color:cat.color}}>{value}/10</div>
    </div>
    <div className="grid grid-cols-10 gap-1">
      {[1,2,3,4,5,6,7,8,9,10].map(n=>{const sel=n===value,filled=n<=value;return(<button key={n} onClick={()=>onChange(n)} className="h-9 rounded-lg text-xs font-bold transition-all active:scale-95" style={{background:sel?cat.color:filled?cat.color+"35":sub,color:sel?"#fff":filled?cat.color:mutedC,border:"1.5px solid "+(sel?cat.color:filled?cat.color+"60":"transparent"),transform:sel?"scale(1.08)":"scale(1)"}}>{n}</button>);})}
    </div>
    <div className="flex justify-between mt-1.5"><span className="text-xs" style={{color:mutedC}}>{t.weakLabel}</span><span className="text-xs" style={{color:mutedC}}>{t.strongLabel}</span></div>
  </div>);
}

function TagPill({cat,selected,onToggle,dark,showInfoIcons,t}){
  return(<div className="flex items-center gap-1">
    <button onClick={()=>onToggle(cat.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all" style={{background:selected?cat.color+"30":dark?"#1E2A3B":"#F1F5F9",border:`1.5px solid ${selected?cat.color:dark?"#2D3F55":"#E2E8F0"}`,color:selected?cat.color:dark?"#8B9BB4":"#94A3B8"}}>
      <span>{cat.emoji}</span><span>{cat.label}</span>
    </button>
    {showInfoIcons&&t&&<InfoBtn cat={cat} dark={dark} t={t} showInfoIcons={showInfoIcons}/>}
  </div>);
}


// ── Wheel Column (shared by DatePicker & TimePicker) ─────────────────────────
function WheelCol({items, value, onChange, dark, width="flex-1"}) {
  const ITEM_H = 40;
  const REPEATS = 5;
  const ref = useRef(null);
  const isScrolling = useRef(false);
  const initialized = useRef(false);

  const getIdx = (val) => {
    const i = items.findIndex(x => String(x.val) === String(val));
    return Math.floor(REPEATS/2) * items.length + (i >= 0 ? i : 0);
  };

  const [selIdx, setSelIdx] = useState(() => getIdx(value));

  const doScroll = (idx) => {
    if (!ref.current) return false;
    ref.current.scrollTop = idx * ITEM_H;
    return Math.abs(ref.current.scrollTop - idx * ITEM_H) < 2;
  };

  // Retry scroll until element is visible and scroll works
  const ensureScroll = (idx) => {
    if (doScroll(idx)) return;
    let tries = 0;
    const t = setInterval(() => {
      if (doScroll(idx) || ++tries > 20) clearInterval(t);
    }, 30);
  };

  useEffect(() => {
    const idx = getIdx(value);
    setSelIdx(idx);
    ensureScroll(idx);
  }, [value]);

  // Also try on every render in case display changed from none to block
  useEffect(() => {
    if (!initialized.current) {
      ensureScroll(selIdx);
      initialized.current = true;
    }
  });

  const onScroll = () => {
    if (!ref.current) return;
    isScrolling.current = true;
    clearTimeout(ref.current._t);
    ref.current._t = setTimeout(() => {
      if (!ref.current) return;
      const i = Math.round(ref.current.scrollTop / ITEM_H);
      const clamped = Math.max(0, Math.min(i, items.length * REPEATS - 1));
      ref.current.scrollTop = clamped * ITEM_H;
      setSelIdx(clamped);
      onChange(items[clamped % items.length].val);
      isScrolling.current = false;
    }, 80);
  };

  const allItems = Array.from({length: REPEATS}, (_, r) =>
    items.map((item, i) => ({...item, _key:`${r}-${i}`, _abs: r * items.length + i}))
  ).flat();

  const bg = dark ? "#0F1826" : "#F8FAFC";
  const text = dark ? "#E2E8F0" : "#1E293B";
  const muted = dark ? "#4A5568" : "#A0AEC0";
  const selBg = dark ? "#1E3A5F" : "#DBEAFE";
  const selBorder = dark ? "#3B82F650" : "#3B82F640";

  return (
    <div className={width} style={{position:"relative", height:ITEM_H*5, overflow:"hidden"}}>
      <div style={{position:"absolute", top:ITEM_H*2, left:4, right:4,
        height:ITEM_H, background:selBg, borderRadius:8,
        border:`1px solid ${selBorder}`, pointerEvents:"none", zIndex:1}}/>
      <div style={{position:"absolute", top:0, left:0, right:0, height:ITEM_H*1.5,
        background:`linear-gradient(to bottom,${bg},${bg}cc,transparent)`,
        pointerEvents:"none", zIndex:3}}/>
      <div style={{position:"absolute", bottom:0, left:0, right:0, height:ITEM_H*1.5,
        background:`linear-gradient(to top,${bg},${bg}cc,transparent)`,
        pointerEvents:"none", zIndex:3}}/>
      <div ref={ref} onScroll={onScroll} style={{
        position:"absolute", top:0, left:0, right:0, bottom:0,
        overflowY:"scroll", overflowX:"hidden",
        scrollbarWidth:"none", WebkitOverflowScrolling:"touch",
        paddingTop:ITEM_H*2, paddingBottom:ITEM_H*2,
      }}>
        {allItems.map(item => {
          const isSel = item._abs === selIdx;
          return (
            <div key={item._key}
              onClick={() => { setSelIdx(item._abs); doScroll(item._abs); onChange(item.val); }}
              style={{
                height:ITEM_H, display:"flex", alignItems:"center", justifyContent:"center",
                fontSize: isSel?16:14, fontWeight: isSel?700:400,
                color: isSel?text:muted,
                cursor:"pointer", userSelect:"none", position:"relative", zIndex:2,
              }}>
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}


function DatePicker({value, onChange, dark}) {
  const [y,m,d] = value ? value.split("-") : [String(new Date().getFullYear()),"01","01"];
  const year = parseInt(y)||new Date().getFullYear();
  const month = parseInt(m)||1;
  const day = parseInt(d)||1;
  const daysInM = new Date(year, month, 0).getDate();
  const curY = new Date().getFullYear();

  const MONTH_NAMES = ["Tammi","Helmi","Maalis","Huhti","Touko","Kesä","Heinä","Elo","Syys","Loka","Marras","Joulu"];
  const dayItems = Array.from({length:daysInM},(_,i)=>({val:i+1,label:`${i+1}.`}));
  const monthItems = Array.from({length:12},(_,i)=>({val:i+1,label:MONTH_NAMES[i]}));
  const yearItems = Array.from({length:10},(_,i)=>({val:curY-2+i,label:String(curY-2+i)}));

  const update = (newY, newM, newD) => {
    const clampedD = Math.min(newD, new Date(newY, newM, 0).getDate());
    onChange(`${newY}-${String(newM).padStart(2,"0")}-${String(clampedD).padStart(2,"0")}`);
  };

  const bg = dark ? "#0F1826" : "#F8FAFC";
  const border = dark ? "#2D3F55" : "#E2E8F0";

  return (
    <div className="mb-3 rounded-xl overflow-hidden" style={{background:bg, border:`1px solid ${border}`}}>
      <div className="flex gap-0" style={{padding:"0 4px"}}>
        <WheelCol items={dayItems} value={day} onChange={v=>update(year,month,v)} dark={dark} width="w-16"/>
        <WheelCol items={monthItems} value={month} onChange={v=>update(year,v,day)} dark={dark} width="flex-1"/>
        <WheelCol items={yearItems} value={year} onChange={v=>update(v,month,day)} dark={dark} width="w-20"/>
      </div>
    </div>
  );
}

// ── Custom TimePicker ─────────────────────────────────────────────────────────
function TimePicker({value, onChange, dark, label, muted}) {
  const [h,m] = value ? value.split(":") : ["0","0"];
  const hour = h!==undefined&&h!==""?parseInt(h):0;
  const minute = m!==undefined&&m!==""?parseInt(m):0;

  const hourItems = Array.from({length:24},(_,i)=>({val:i,label:String(i).padStart(2,"0")}));
  const minuteItems = [0,5,10,15,20,25,30,35,40,45,50,55].map(m=>({val:m,label:String(m).padStart(2,"0")}));

  const bg = dark ? "#0F1826" : "#F8FAFC";
  const border = dark ? "#2D3F55" : "#E2E8F0";
  const text = dark ? "#E2E8F0" : "#1E293B";

  return (
    <div className="flex-1">
      {label && <div className="text-xs mb-1 font-medium" style={{color:muted}}>{label}</div>}
      <div className="rounded-xl overflow-hidden" style={{background:bg, border:`1px solid ${border}`}}>
        <div className="flex items-center" style={{padding:"0 4px"}}>
          <WheelCol items={hourItems} value={hour} onChange={v=>onChange(`${String(v).padStart(2,"0")}:${String(minute).padStart(2,"0")}`)} dark={dark}/>
          <div style={{color:text,fontWeight:700,fontSize:16,padding:"0 2px"}}>:</div>
          <WheelCol items={minuteItems} value={minute} onChange={v=>onChange(`${String(hour).padStart(2,"0")}:${String(v).padStart(2,"0")}`)} dark={dark}/>
        </div>
      </div>
    </div>
  );
}

// ── Event Modal ──────────────────────────────────────────────────────────
function EventModal({ev,onSave,onDelete,onClose,dark,t,CATS,templates,onSaveTemplate,onDeleteTemplate,showInfoIcons}){
  const [showLibrary,setShowLibrary]=useState(false);
  const [title,setTitle]=useState(ev?.title||"");
  const [date,setDate]=useState(ev?.date||todayStr());
  const [time,setTime]=useState(ev?.time||currentHourStr());
  const [endTime,setEndTime]=useState(ev?.endTime||"");
  const [desc,setDesc]=useState(ev?.desc||"");
  const [tags,setTags]=useState(ev?.tags||[]);
  const [repeat,setRepeat]=useState(ev?.repeat||"none");
  const [saveAsTemplate,setSaveAsTemplate]=useState(false);
  const toggle=(id)=>setTags(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const bg=dark?"#0F1826":"#F8FAFC",card=dark?"#1A2332":"#FFFFFF";
  const border=dark?"#2D3F55":"#E2E8F0",text=dark?"#E2E8F0":"#1E293B",muted="#94A3B8";
  const cs=dark?"dark":"light";
  const repeatOpts=[{v:"none",l:t.noRepeat},{v:"daily",l:t.daily},{v:"weekly",l:t.weekly}];
  const handleSave=(e)=>{
    if(e){e.preventDefault();e.stopPropagation();}
    if(!title.trim())return;
    const evData={
      title:title.trim(),
      date:date||todayStr(),
      time:time||currentHourStr(),
      endTime:endTime||"",
      desc:desc||"",
      tags:tags||[],
      repeat:repeat||"none",
      id:(ev&&ev.id)?ev.id:Date.now().toString()
    };
    if(saveAsTemplate)onSaveTemplate({id:Date.now().toString(),...evData});
    onSave(evData);
    onClose();
  };
  if(showLibrary)return(<div className="fixed inset-0 z-50 flex items-end justify-center" style={{background:"rgba(0,0,0,0.6)",backdropFilter:"blur(6px)"}} onClick={()=>setShowLibrary(false)}>
    <div className="w-full max-w-md rounded-t-3xl overflow-y-auto" style={{background:card,maxHeight:"80vh"}} onClick={e=>e.stopPropagation()}>
      <div className="px-5 pt-5 pb-3 flex items-center justify-between sticky top-0 z-10" style={{background:card}}>
        <button type="button" onClick={()=>setShowLibrary(false)} className="flex items-center gap-1 text-sm font-semibold" style={{color:"#3B82F6"}}>‹ {t.newEvent}</button>
        <h3 className="font-bold text-sm" style={{color:text}}>📚 {t.library}</h3>
        <button type="button" onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{background:dark?"#1E2A3B":"#F1F5F9",color:muted}}>×</button>
      </div>
      <div className="px-5 pb-8">
        {templates.length===0?(<div className="text-center py-10 rounded-2xl" style={{background:dark?"#1E2A3B":"#F8FAFC",border:`1px solid ${border}`}}><div className="text-4xl mb-3">📂</div><p className="text-sm font-semibold mb-1" style={{color:text}}>{t.libraryEmpty}</p><p className="text-xs px-4" style={{color:muted}}>{t.libraryEmptySub}</p></div>)
        :templates.map(tmpl=>(<div key={tmpl.id} className="flex items-start gap-2 p-3.5 rounded-2xl mb-2.5" style={{background:dark?"#1E2A3B":"#F8FAFC",border:`1px solid ${border}`}}>
          <div className="flex-1 min-w-0"><div className="text-sm font-bold mb-1.5" style={{color:text}}>{tmpl.title}</div>
          <div className="flex flex-wrap gap-1">{tmpl.time&&<span className="text-xs px-1.5 py-0.5 rounded-full" style={{background:dark?"#2D3F55":"#E2E8F0",color:muted}}>🕐 {tmpl.time}{tmpl.endTime?`–${tmpl.endTime}`:""}</span>}
          {(tmpl.tags||[]).slice(0,4).map(id=>{const c=CATS.find(x=>x.id===id);return c?<span key={id} className="text-xs px-1.5 py-0.5 rounded-full" style={{background:c.color+"22",color:c.color}}>{c.emoji} {c.label}</span>:null;})}</div></div>
          <div className="flex gap-1.5 shrink-0 mt-0.5">
            <button type="button" onClick={()=>onDeleteTemplate(tmpl.id)} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{background:dark?"#2D3F55":"#E8EEF4",color:muted}}>🗑</button>
            <button type="button" onClick={()=>{setTitle(tmpl.title||"");setTime(tmpl.time||currentHourStr());setEndTime(tmpl.endTime||"");setDesc(tmpl.desc||"");setTags(tmpl.tags||[]);setRepeat(tmpl.repeat||"none");setShowLibrary(false);}} className="px-3 py-1.5 rounded-xl text-xs font-bold" style={{background:"#3B82F6",color:"#fff"}}>{t.libraryUse}</button>
          </div>
        </div>))}
      </div>
    </div>
  </div>);

  return(<div className="fixed inset-0 z-50 flex items-end justify-center" style={{background:"rgba(0,0,0,0.6)",backdropFilter:"blur(6px)"}} onClick={onClose}>
    <div className="w-full max-w-md rounded-t-3xl overflow-y-auto" style={{background:card,maxHeight:"92vh"}} onClick={e=>e.stopPropagation()}>
      <div className="px-5 pt-5 pb-2 flex items-center justify-between sticky top-0 z-10" style={{background:card}}>
        <h3 className="font-bold text-base" style={{color:text}}>{ev?.id?t.editEvent:t.newEvent}</h3>
        <div className="flex items-center gap-2">
          {!ev?.id&&<button type="button" onClick={()=>setShowLibrary(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold" style={{background:templates.length>0?"#3B82F618":dark?"#1E2A3B":"#F1F5F9",border:`1px solid ${templates.length>0?"#3B82F640":border}`,color:templates.length>0?"#3B82F6":muted}}>
            📚 {t.library}{templates.length>0&&<span className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-black" style={{background:"#3B82F6",color:"#fff"}}>{templates.length}</span>}
          </button>}
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{background:dark?"#1E2A3B":"#F1F5F9",color:muted}}>×</button>
        </div>
      </div>
      <div className="px-5 pb-8">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder={t.eventName} className="w-full px-4 py-3 rounded-xl text-sm mb-3 outline-none" style={{background:bg,border:`1px solid ${border}`,color:text}}/>
        <DiaryDatePicker selDate={date} onSelect={setDate} dark={dark} t={t} diary={{}} onSearch={()=>{}} showSearch={false}/>
        <div className="flex items-center gap-2 mb-3">
          <TimePicker value={time} onChange={setTime} dark={dark} label={t.starts} muted={muted}/>
          <div className="text-sm mt-4" style={{color:muted}}>–</div>
          <TimePicker value={endTime} onChange={setEndTime} dark={dark} label={t.ends} muted={muted}/>
        </div>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder={t.desc} rows={2} className="w-full px-4 py-3 rounded-xl text-sm mb-3 outline-none resize-none" style={{background:bg,border:`1px solid ${border}`,color:text}}/>
        <p className="text-xs font-bold tracking-wider mb-2" style={{color:muted}}>{t.repeat.toUpperCase()}</p>
        <div className="flex gap-2 mb-4">{repeatOpts.map(o=><button type="button" key={o.v} onClick={()=>setRepeat(o.v)} className="flex-1 py-2 rounded-xl text-xs font-semibold" style={{background:repeat===o.v?"#3B82F620":bg,border:`1.5px solid ${repeat===o.v?"#3B82F6":border}`,color:repeat===o.v?"#3B82F6":muted}}>{o.l}</button>)}</div>
        <p className="text-xs font-bold tracking-wider mb-3" style={{color:muted}}>{t.permaQ}</p>
        <p className="text-xs mb-2 font-medium" style={{color:muted}}>PERMA</p>
        <div className="flex flex-wrap gap-2 mb-3">{CATS.filter(c=>c.section==="PERMA").map(c=><TagPill key={c.id} cat={c} selected={tags.includes(c.id)} onToggle={toggle} dark={dark} showInfoIcons={showInfoIcons} t={t}/>)}</div>
        <p className="text-xs mb-2 font-medium" style={{color:muted}}>+4</p>
        <div className="flex flex-wrap gap-2 mb-4">{CATS.filter(c=>c.section==="+4").map(c=><TagPill key={c.id} cat={c} selected={tags.includes(c.id)} onToggle={toggle} dark={dark} showInfoIcons={showInfoIcons} t={t}/>)}</div>
        {!ev?.id&&<button type="button" onClick={()=>setSaveAsTemplate(s=>!s)} className="w-full flex items-center gap-3 p-3 rounded-xl mb-4" style={{background:saveAsTemplate?"#3B82F615":dark?"#1E2A3B":"#F8FAFC",border:`1px solid ${saveAsTemplate?"#3B82F640":border}`}}>
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{background:saveAsTemplate?"#3B82F6":"transparent",border:`1.5px solid ${saveAsTemplate?"#3B82F6":muted}`}}>{saveAsTemplate&&<span className="text-xs" style={{color:"#fff"}}>✓</span>}</div>
          <span className="text-sm" style={{color:saveAsTemplate?"#3B82F6":muted}}>📚 {t.librarySave}</span>
        </button>}
        <div className="flex gap-2">
          {ev?.id&&<button type="button" onClick={()=>{onDelete(ev.id);onClose();}} className="px-4 py-3 rounded-2xl text-sm font-medium" style={{background:"#EF444418",color:"#EF4444",border:"1px solid #EF444430"}}>{t.delete}</button>}
          <button type="button" onClick={handleSave} className="flex-1 py-3 rounded-2xl text-sm font-bold" style={{background:"#3B82F6",color:"#fff"}}>{t.save}</button>
        </div>
      </div>
    </div>
  </div>);
}

function StreakBadge({streak,t}){
  if(!streak)return null;
  const icon=streak>=30?"🔥":streak>=14?"⚡":streak>=7?"✨":"🌱";
  return(<div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{background:"rgba(245,158,11,0.15)",border:"1px solid rgba(245,158,11,0.3)"}}><span className="text-xs">{icon}</span><span className="text-xs font-bold" style={{color:"#F59E0B"}}>{streak}</span></div>);
}

function TrendChart({diary,CATS,dark,t,showInfoIcons}){
  const [selCat,setSelCat]=useState(CATS[0].id);
  const cat=CATS.find(c=>c.id===selCat);
  const dates=Object.keys(diary).sort().slice(-30);
  if(dates.length<2)return null;
  const points=dates.map(d=>({date:d,val:diary[d]?.scores?.[selCat]||0})).filter(p=>p.val>0);
  if(points.length<2)return null;
  const W=320,H=80,pad=8;
  const xScale=i=>pad+(i/(points.length-1))*(W-pad*2);
  const yScale=v=>H-pad-((v-1)/9)*(H-pad*2);
  const pathD=points.map((p,i)=>`${i===0?"M":"L"}${xScale(i).toFixed(1)},${yScale(p.val).toFixed(1)}`).join(" ");
  const areaD=`${pathD} L${xScale(points.length-1).toFixed(1)},${H} L${xScale(0).toFixed(1)},${H} Z`;
  const card=dark?"#1A2332":"#FFFFFF",border=dark?"#2D3F55":"#E8EEF4",text=dark?"#E2E8F0":"#1E293B",muted="#94A3B8";
  return(<div className="rounded-2xl p-4 mb-4" style={{background:card,border:`1px solid ${border}`}}>
    <div className="flex items-center justify-between mb-3"><p className="text-xs font-bold tracking-wider" style={{color:muted}}>{t.trendTitle}</p><InfoBtn cat={cat} dark={dark} t={t} showInfoIcons={showInfoIcons}/></div>
    <div className="flex flex-wrap gap-1.5 mb-4">{CATS.map(c=><button key={c.id} onClick={()=>setSelCat(c.id)} className="px-2 py-1 rounded-full text-xs font-medium" style={{background:selCat===c.id?c.color+"30":dark?"#1E2A3B":"#F1F5F9",border:`1px solid ${selCat===c.id?c.color:dark?"#2D3F55":"#E2E8F0"}`,color:selCat===c.id?c.color:muted}}>{c.emoji}</button>)}</div>
    <div className="flex items-center gap-2 mb-3"><span>{cat.emoji}</span><span className="text-sm font-semibold" style={{color:text}}>{cat.label}</span></div>
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{overflow:"visible"}}>
      <defs><linearGradient id={`g-${cat.id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={cat.color} stopOpacity="0.3"/><stop offset="100%" stopColor={cat.color} stopOpacity="0"/></linearGradient></defs>
      {[2,4,6,8,10].map(v=><line key={v} x1={pad} y1={yScale(v)} x2={W-pad} y2={yScale(v)} stroke={dark?"#2D3F55":"#E8EEF4"} strokeWidth="0.5"/>)}
      <path d={areaD} fill={`url(#g-${cat.id})`}/><path d={pathD} fill="none" stroke={cat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {points.map((p,i)=><circle key={i} cx={xScale(i)} cy={yScale(p.val)} r="3" fill={cat.color} stroke={dark?"#1A2332":"#fff"} strokeWidth="1.5"/>)}
      {[1,5,10].map(v=><text key={v} x={pad-2} y={yScale(v)+3} fontSize="7" fill={muted} textAnchor="end">{v}</text>)}
    </svg>
    <div className="flex justify-between mt-1"><span className="text-xs" style={{color:muted}}>{dates[0]?.slice(5).replace("-",".")||""}</span><span className="text-xs" style={{color:muted}}>{dates[dates.length-1]?.slice(5).replace("-",".")||""}</span></div>
  </div>);
}

function BestWeekCard({diary,CATS,dark,t}){
  const dates=Object.keys(diary).sort();
  if(dates.length<7)return null;
  const weeks={};
  dates.forEach(d=>{const wk=getWeekMonday(d);if(!weeks[wk])weeks[wk]={scores:[],cats:{}};const sc=diary[d]?.scores||{};weeks[wk].scores.push(CATS.map(c=>sc[c.id]||5).reduce((a,b)=>a+b,0)/CATS.length);CATS.forEach(c=>{weeks[wk].cats[c.id]=(weeks[wk].cats[c.id]||0)+(sc[c.id]||5);});});
  const wa=Object.entries(weeks).map(([wk,v])=>({wk,avg:v.scores.reduce((a,b)=>a+b,0)/v.scores.length,cats:v.cats,days:v.scores.length})).filter(w=>w.days>=3);
  if(!wa.length)return null;
  const best=wa.reduce((a,b)=>a.avg>b.avg?a:b);
  const bestCat=CATS.find(c=>c.id===Object.entries(best.cats).sort((a,b)=>b[1]-a[1])[0]?.[0]);
  const border=dark?"#2D3F55":"#E8EEF4",text=dark?"#E2E8F0":"#1E293B",muted="#94A3B8";
  return(<div className="rounded-2xl p-4 mb-4" style={{background:dark?"linear-gradient(135deg,#1E2A3B,#162032)":"linear-gradient(135deg,#F0FDF4,#EFF6FF)",border:`1px solid ${bestCat?.color||"#10B981"}30`}}>
    <p className="text-xs font-bold tracking-wider mb-3" style={{color:muted}}>{t.bestWeek}</p>
    <div className="flex items-start gap-3"><div className="text-3xl">{bestCat?.emoji||"🌟"}</div><p className="text-sm leading-relaxed" style={{color:text}}>{t.bestWeekMsg(getWeekNumber(best.wk),best.avg.toFixed(1),bestCat?.label||"")}</p></div>
  </div>);
}

// ── Calendar swipe hook (for calendar area only) ──────────────────────────────
function useCalSwipe(onLeft, onRight) {
  const startX = useRef(null);
  const startY = useRef(null);
  const onTouchStart = e => { startX.current = e.touches[0].clientX; startY.current = e.touches[0].clientY; };
  const onTouchEnd = e => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - startY.current);
    // Only horizontal swipes (not scrolling)
    if (Math.abs(dx) > 50 && dy < 40) { dx < 0 ? onLeft() : onRight(); }
    startX.current = null; startY.current = null;
  };
  return { onTouchStart, onTouchEnd };
}

// ── Week View ─────────────────────────────────────────────────────────────────
function WeekView({data,onData,dark,onOpenEvent,onOpenFull,t,CATS}){
  const [weekStart,setWeekStart]=useState(()=>getWeekMonday(todayStr()));
  const events=data.events||{},diary=data.diary||{},today=todayStr();
  const days=Array.from({length:7},(_,i)=>addDays(weekStart,i));
  const card=dark?"#1A2332":"#FFFFFF",border=dark?"#2D3F55":"#E8EEF4";
  const text=dark?"#E2E8F0":"#1E293B",muted="#94A3B8",sub=dark?"#1E2A3B":"#F8FAFC";

  const calSwipe = useCalSwipe(
    () => setWeekStart(s => addDays(s, 7)),
    () => setWeekStart(s => addDays(s, -7))
  );

  const weekLabel=()=>{const s=new Date(weekStart),e=new Date(addDays(weekStart,6));return s.getMonth()===e.getMonth()?`${s.getDate()}–${e.getDate()}. ${t.monthsShort[s.getMonth()]} ${s.getFullYear()}`:`${s.getDate()}. ${t.monthsShort[s.getMonth()]} – ${e.getDate()}. ${t.monthsShort[e.getMonth()]}`;};
  const allEvents=()=>{const evs=[];Object.values(events).forEach(ev=>{days.forEach(ds=>{if(ev.repeat==="daily"){evs.push({...ev,date:ds,id:ev.id+"_"+ds});}else if(ev.repeat==="weekly"&&new Date(ev.date).getDay()===new Date(ds).getDay()){evs.push({...ev,date:ds,id:ev.id+"_"+ds});}else if(ev.date===ds){evs.push(ev);}});});return evs;};

  return(<div>
    <div className="flex items-center justify-between mb-3">
      <button onClick={()=>setWeekStart(s=>addDays(s,-7))} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:sub,color:muted}}>‹</button>
      <span className="text-sm font-bold" style={{color:text}}>{weekLabel()}</span>
      <button onClick={()=>setWeekStart(s=>addDays(s,7))} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:sub,color:muted}}>›</button>
    </div>
    <button onClick={()=>setWeekStart(getWeekMonday(today))} className="w-full py-2 rounded-xl text-xs font-semibold mb-3" style={{background:"#3B82F615",color:"#3B82F6",border:"1px solid #3B82F630"}}>{t.today}</button>

    {/* Week day grid — same size as month view cells */}
    <div className="grid grid-cols-7 mb-1">{t.weekdays.map(d=><div key={d} className="text-center text-xs py-1 font-semibold" style={{color:muted}}>{d}</div>)}</div>
    <div className="grid grid-cols-7 gap-0.5 mb-4" {...calSwipe}>
      {days.map((ds,i)=>{
        const d=new Date(ds),isToday=ds===today;
        const dayEvs=allEvents().filter(e=>e.date===ds);
        const allTags=[...new Set(dayEvs.flatMap(e=>e.tags||[]))];
        return(<button key={ds} onClick={()=>onOpenEvent(ds)}
          className="rounded-xl p-1 min-h-14 flex flex-col items-center transition-all"
          style={{background:isToday?"#3B82F620":sub,border:`1.5px solid ${isToday?"#3B82F6":border}`}}>
          <span className="text-xs font-bold mb-0.5" style={{color:isToday?"#3B82F6":text}}>{d.getDate()}</span>
          {diary[ds]&&<div className="w-1.5 h-1.5 rounded-full mb-0.5" style={{background:"#10B981"}}/>}
          <div className="flex flex-wrap justify-center gap-0.5">{allTags.slice(0,3).map(id=>{const c=CATS.find(x=>x.id===id);return c?<div key={id} className="w-1.5 h-1.5 rounded-full" style={{background:c.color}}/>:null;})}</div>
          {dayEvs.length>0&&<span style={{color:muted,fontSize:"0.55rem"}}>{dayEvs.length>1?`${dayEvs.length}×`:"·"}</span>}
        </button>);
      })}
    </div>

    {/* Event list */}
    {days.map(ds=>{
      const dayEvs=allEvents().filter(e=>e.date===ds).sort((a,b)=>a.time.localeCompare(b.time));
      const d=new Date(ds),isToday=ds===today;
      if(!dayEvs.length&&!diary[ds])return null;
      return(<div key={ds} className="mb-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-bold" style={{color:isToday?"#3B82F6":muted}}>{t.weekdaysFull[(d.getDay()+6)%7]} {d.getDate()}.{d.getMonth()+1}.</span>
          {isToday&&<span className="text-xs px-2 py-0.5 rounded-full" style={{background:"#3B82F618",color:"#3B82F6"}}>●</span>}
          {diary[ds]&&<span className="text-xs px-2 py-0.5 rounded-full" style={{background:"#10B98118",color:"#10B981"}}>📔</span>}
        </div>
        {dayEvs.map(ev=><button key={ev.id} onClick={()=>onOpenFull(events[ev.id.split("_")[0]]||ev)} className="w-full flex items-start gap-3 p-3 rounded-xl mb-1.5 text-left" style={{background:card,border:`1px solid ${border}`}}>
          <div className="text-xs font-bold w-16 pt-0.5 shrink-0" style={{color:muted}}>{ev.time||"–"}{ev.endTime?`–${ev.endTime}`:""}</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate" style={{color:text}}>{ev.title}{ev.repeat&&ev.repeat!=="none"&&<span className="ml-1 text-xs" style={{color:muted}}>↺</span>}</div>
            {ev.tags?.length>0&&<div className="flex flex-wrap gap-1 mt-1">{ev.tags.slice(0,3).map(id=>{const c=CATS.find(x=>x.id===id);return c?<TooltipTag key={id} cat={c} dark={dark}/>:null;})}</div>}
          </div>
        </button>)}
      </div>);
    })}
  </div>);
}

// ── Calendar View ─────────────────────────────────────────────────────────────
function CalendarView({data,onData,dark,t,CATS,showInfoIcons}){
  const now=new Date();
  const [calTab,setCalTab]=useState("month");
  const [year,setYear]=useState(now.getFullYear());
  const [month,setMonth]=useState(now.getMonth());
  const [editEv,setEditEv]=useState(null);
  const [showModal,setShowModal]=useState(false);
  const events=data.events||{},today=todayStr();
  const templates=data.templates||[];
  const saveEv=(ev)=>onData({...data,events:{...events,[ev.id]:ev}});
  const delEv=(id)=>{const{[id]:_,...rest}=events;onData({...data,events:rest});};
  const saveTemplate=(tmpl)=>onData({...data,templates:[...(data.templates||[]).filter(x=>x.id!==tmpl.id),tmpl]});
  const delTemplate=(id)=>onData({...data,templates:(data.templates||[]).filter(x=>x.id!==id)});
  const dim=daysInMonth(year,month),first=firstWeekday(year,month);
  const card=dark?"#1A2332":"#FFFFFF",border=dark?"#2D3F55":"#E8EEF4";
  const text=dark?"#E2E8F0":"#1E293B",muted="#94A3B8",sub=dark?"#1E2A3B":"#F8FAFC";
  const monthStr=`${year}-${String(month+1).padStart(2,"0")}`;

  const calSwipe = useCalSwipe(
    () => { if(month===11){setYear(y=>y+1);setMonth(0);}else setMonth(m=>m+1); },
    () => { if(month===0){setYear(y=>y-1);setMonth(11);}else setMonth(m=>m-1); }
  );

  const getMonthEvs=(ds)=>{
    const direct=Object.values(events).filter(e=>e.date===ds);
    const recurring=Object.values(events).filter(e=>(e.repeat==="daily"||(e.repeat==="weekly"&&new Date(e.date).getDay()===new Date(ds).getDay()))&&e.date<=ds&&!direct.find(d=>d.id===e.id));
    return[...direct,...recurring];
  };

  const openEvent=(ds)=>{setEditEv({date:ds,time:currentHourStr()});setShowModal(true);};
  const openFull=(ev)=>{setEditEv(ev||{});setShowModal(true);};

  return(<div>
    <div className="flex gap-1 p-1 rounded-2xl mb-4" style={{background:sub}}>
      {[{id:"month",l:t.month},{id:"week",l:t.week}].map(tab=>(
        <button key={tab.id} onClick={()=>setCalTab(tab.id)} className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{background:calTab===tab.id?card:"transparent",color:calTab===tab.id?text:muted,boxShadow:calTab===tab.id?"0 1px 4px rgba(0,0,0,0.15)":"none"}}>{tab.l}</button>
      ))}
    </div>

    {calTab==="week"&&<WeekView data={data} onData={onData} dark={dark} onOpenEvent={openEvent} onOpenFull={openFull} t={t} CATS={CATS}/>}

    {calTab==="month"&&<>
      <div className="flex items-center justify-between mb-3">
        <button onClick={()=>{if(month===0){setYear(y=>y-1);setMonth(11);}else setMonth(m=>m-1);}} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:sub,color:muted}}>‹</button>
        <span className="font-bold" style={{color:text}}>{t.months[month]} {year}</span>
        <button onClick={()=>{if(month===11){setYear(y=>y+1);setMonth(0);}else setMonth(m=>m+1);}} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:sub,color:muted}}>›</button>
      </div>
      <button onClick={()=>{const n=new Date();setYear(n.getFullYear());setMonth(n.getMonth());}} className="w-full py-2 rounded-xl text-xs font-semibold mb-4" style={{background:"#3B82F615",color:"#3B82F6",border:"1px solid #3B82F630"}}>{t.today}</button>
      <div className="grid grid-cols-7 mb-1">{t.weekdays.map(d=><div key={d} className="text-center text-xs py-1 font-semibold" style={{color:muted}}>{d}</div>)}</div>
      <div className="grid grid-cols-7 gap-0.5 mb-5" {...calSwipe}>
        {Array.from({length:first}).map((_,i)=><div key={`x${i}`}/>)}
        {Array.from({length:dim}).map((_,i)=>{
          const day=i+1,ds=`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
          const evs=getMonthEvs(ds),isToday=ds===today;
          const allTags=[...new Set(evs.flatMap(e=>e.tags||[]))];
          return(<button key={day} onClick={()=>openEvent(ds)} className="rounded-xl p-1 min-h-14 flex flex-col items-center transition-all" style={{background:isToday?"#3B82F620":sub,border:`1.5px solid ${isToday?"#3B82F6":border}`}}>
            <span className="text-xs font-bold mb-0.5" style={{color:isToday?"#3B82F6":text}}>{day}</span>
            {(data.diary||{})[ds]&&<div className="w-1.5 h-1.5 rounded-full mb-0.5" style={{background:"#10B981"}}/>}
            <div className="flex flex-wrap justify-center gap-0.5">{allTags.slice(0,3).map(id=>{const c=CATS.find(x=>x.id===id);return c?<div key={id} className="w-1.5 h-1.5 rounded-full" style={{background:c.color}}/>:null;})}</div>
            {evs.length>0&&<span style={{color:muted,fontSize:"0.55rem"}}>{evs.length>1?`${evs.length}×`:"·"}</span>}
          </button>);
        })}
      </div>
      <p className="text-xs font-bold tracking-wider mb-3" style={{color:muted}}>{t.events}</p>
      {Object.values(events).filter(e=>e.date?.startsWith(monthStr)).sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time)).map(ev=>(
        <button key={ev.id} onClick={()=>openFull(ev)} className="w-full flex items-center gap-3 p-3 rounded-2xl mb-2 text-left" style={{background:card,border:`1px solid ${border}`}}>
          <div className="text-xs font-bold w-16 shrink-0" style={{color:muted}}>{ev.time||"–"}{ev.endTime?`–${ev.endTime}`:""}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5"><span className="text-sm font-semibold truncate" style={{color:text}}>{ev.title}</span>{ev.repeat&&ev.repeat!=="none"&&<span style={{color:muted}}>↺</span>}</div>
            {ev.tags?.length>0&&<div className="flex flex-wrap gap-1 mt-1">{ev.tags.map(id=>{const c=CATS.find(x=>x.id===id);return c?<TooltipTag key={id} cat={c} dark={dark}/>:null;})}</div>}
          </div>
          <span style={{color:muted}}>›</span>
        </button>
      ))}
      {!Object.values(events).find(e=>e.date?.startsWith(monthStr))&&<div className="text-center py-8" style={{color:muted}}><div className="text-3xl mb-2">📅</div><p className="text-sm">{t.noEvents}</p></div>}
    </>}

    <button onClick={()=>openEvent(today)} className="fixed bottom-24 right-4 w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl z-40" style={{background:"#3B82F6",color:"#fff",boxShadow:"0 4px 20px #3B82F660"}}>+</button>

    {showModal&&<EventModal ev={editEv} onSave={saveEv} onDelete={delEv} onClose={()=>{setShowModal(false);setEditEv(null);}}
      dark={dark} t={t} CATS={CATS} templates={templates} onSaveTemplate={saveTemplate} onDeleteTemplate={delTemplate} showInfoIcons={showInfoIcons}/>}
  </div>);
}

// ── Journal Entry Modal ───────────────────────────────────────────────────────
function EntryModal({entry,date,CATS,dark,t,onClose}){
  const scores=entry.scores||{};
  const avg=CATS.map(c=>scores[c.id]||5).reduce((a,b)=>a+b,0)/CATS.length;
  const card=dark?"#1A2332":"#FFFFFF",border=dark?"#2D3F55":"#E8EEF4";
  const text=dark?"#E2E8F0":"#1E293B",muted="#94A3B8";
  return(<div className="fixed inset-0 z-50 flex items-end justify-center" style={{background:"rgba(0,0,0,0.6)",backdropFilter:"blur(6px)"}} onClick={onClose}>
    <div className="w-full max-w-md rounded-t-3xl overflow-y-auto" style={{background:card,maxHeight:"88vh"}} onClick={e=>e.stopPropagation()}>
      <div className="px-5 pt-5 pb-3 flex items-center justify-between sticky top-0 z-10" style={{background:card}}>
        <div>
          <div className="font-bold text-base" style={{color:text}}>{formatFi(date,t.months)}</div>
          <div className="text-xs mt-0.5" style={{color:muted}}>{t.wellbeing}: {avg.toFixed(1)}/10</div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{background:dark?"#1E2A3B":"#F1F5F9",color:muted}}>×</button>
      </div>
      <div className="px-5 pb-8">
        {/* Mini score bars */}
        <div className="rounded-2xl p-4 mb-4" style={{background:dark?"#0F1826":"#F8FAFC",border:`1px solid ${border}`}}>
          {CATS.map(c=><div key={c.id} className="flex items-center gap-2 mb-2">
            <span className="text-sm w-5">{c.emoji}</span>
            <div className="flex-1 h-2 rounded-full" style={{background:dark?"#2D3F55":"#E8EEF4"}}>
              <div className="h-full rounded-full" style={{width:`${((scores[c.id]||5)/10)*100}%`,background:c.color}}/>
            </div>
            <span className="text-xs font-bold w-6 text-right" style={{color:c.color}}>{scores[c.id]||5}</span>
          </div>)}
        </div>
        {entry.text&&<div className="rounded-2xl p-5" style={{background:dark?"#0F1826":"#F8FAFC",border:`1px solid ${border}`}}>
          <p className="text-xs font-bold tracking-wider mb-3" style={{color:muted}}>{t.freeDiary}</p>
          <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{color:text}}>{entry.text}</p>
        </div>}
      </div>
    </div>
  </div>);
}


// ── Gratitude View ────────────────────────────────────────────────────────────
function GratitudeView({data, onData, dark, t, onSaved}) {
  const today = todayStr();
  const gratitude = data.gratitude || {};
  const todayEntry = gratitude[today] || {items:["","",""]};
  const [items, setItems] = useState(todayEntry.items||["","",""]);
  const [saved, setSaved] = useState(false);

  const card=dark?"#1A2332":"#FFFFFF", border=dark?"#2D3F55":"#E8EEF4";
  const text=dark?"#E2E8F0":"#1E293B", muted="#94A3B8", bg=dark?"#0F1826":"#F8FAFC";

  // Gratitude streak
  let gStreak=0, check=today;
  if(!gratitude[check]) check=addDays(check,-1);
  while(gratitude[check]&&gratitude[check].items?.some(i=>i.trim())){gStreak++;check=addDays(check,-1);}

  const handleSave = () => {
    const filled = items.filter(i=>i.trim());
    if(!filled.length) return;
    const newData = {...data, gratitude:{...gratitude,[today]:{items,savedAt:new Date().toISOString()}}};
    onData(newData);
    setSaved(true);
    onSaved();
    setTimeout(()=>setSaved(false),2500);
  };

  const history = Object.entries(gratitude)
    .filter(([d])=>d!==today)
    .sort((a,b)=>b[0].localeCompare(a[0]))
    .slice(0,10);

  return(<div className="pb-4">
    {/* Streak */}
    {gStreak>0&&<div className="flex items-center gap-3 p-4 rounded-2xl mb-4"
      style={{background:dark?"linear-gradient(135deg,#1E2A3B,#162032)":"linear-gradient(135deg,#FFF7ED,#FFFBEB)",border:`1px solid ${dark?"#F59E0B30":"#F59E0B40"}`}}>
      <span className="text-3xl">🙏</span>
      <div><div className="font-black text-lg" style={{color:"#F59E0B"}}>{gStreak} {t.gratitudeStreak}</div>
      <div className="text-xs" style={{color:muted}}>{t.gratitudeTitle}</div></div>
    </div>}

    {/* Today */}
    <div className="rounded-2xl p-5 mb-4" style={{background:card,border:`1px solid ${border}`}}>
      <p className="text-xs font-bold tracking-wider mb-1" style={{color:muted}}>{t.gratitudeTitle.toUpperCase()}</p>
      <p className="text-xs mb-4" style={{color:muted}}>{t.gratitudeSub}</p>
      {[0,1,2].map(i=>(
        <div key={i} className="flex items-start gap-3 mb-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-2"
            style={{background:items[i]?.trim()?"#10B98120":"transparent",border:`1.5px solid ${items[i]?.trim()?"#10B981":border}`,color:items[i]?.trim()?"#10B981":muted}}>
            {items[i]?.trim()?"✓":i+1}
          </div>
          <textarea
            value={items[i]||""} rows={2}
            onChange={e=>{const n=[...items];n[i]=e.target.value;setItems(n);}}
            placeholder={t.gratitudePlaceholder(i+1)}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
            style={{background:bg,border:`1px solid ${border}`,color:text,lineHeight:"1.5"}}/>
        </div>
      ))}
      <button onClick={handleSave}
        className="w-full py-3 rounded-2xl font-bold text-sm mt-2"
        style={{background:saved?"#10B981":"#3B82F6",color:"#fff"}}>
        {saved?t.gratitudeSaved:t.saveGratitude}
      </button>
    </div>

    {/* History */}
    {history.length>0&&<>
      <p className="text-xs font-bold tracking-wider mb-3" style={{color:muted}}>{t.gratitudeHistory}</p>
      {history.map(([date,entry])=>(
        <div key={date} className="rounded-2xl p-4 mb-2.5" style={{background:card,border:`1px solid ${border}`}}>
          <div className="text-xs font-bold mb-2" style={{color:"#3B82F6"}}>{formatFi(date,t.months)}</div>
          {(entry.items||[]).filter(i=>i.trim()).map((item,i)=>(
            <div key={i} className="flex items-start gap-2 mb-1">
              <span style={{color:"#10B981",fontSize:"0.7rem",marginTop:2}}>✓</span>
              <p className="text-xs" style={{color:muted}}>{item}</p>
            </div>
          ))}
        </div>
      ))}
    </>}
  </div>);
}

// ── Action Plan View ──────────────────────────────────────────────────────────
function ActionPlanView({data, onData, dark, t, CATS}) {
  const diary = data.diary||{};
  const plans = data.actionPlans||[];
  const challenges = data.challenges||[];
  const [subTab, setSubTab] = useState("plan");
  const card=dark?"#1A2332":"#FFFFFF", border=dark?"#2D3F55":"#E8EEF4";
  const text=dark?"#E2E8F0":"#1E293B", muted="#94A3B8", bg=dark?"#0F1826":"#F8FAFC";
  const sub=dark?"#1E2A3B":"#F8FAFC";

  // Calculate 7-day averages
  const dates = Object.keys(diary).sort().slice(-7);
  const avgScores = CATS.map(c=>{
    const vs=dates.map(d=>diary[d]?.scores?.[c.id]||0).filter(v=>v>0);
    return {...c, avg: vs.length?(vs.reduce((a,b)=>a+b,0)/vs.length):0};
  }).filter(c=>c.avg>0).sort((a,b)=>a.avg-b.avg);

  // Plan creation state
  const [creating, setCreating] = useState(false);
  const [selCat, setSelCat] = useState(null);
  const [target, setTarget] = useState(7);
  const [steps, setSteps] = useState(["",""]);
  const [planSaved, setPlanSaved] = useState(false);

  const activePlan = plans.find(p=>!p.completed);

  const saveplan = () => {
    if(!selCat||!steps.filter(s=>s.trim()).length) return;
    const plan = {
      id:Date.now().toString(), catId:selCat.id, catLabel:selCat.label,
      catColor:selCat.color, catEmoji:selCat.emoji,
      current:selCat.avg, target, steps:steps.filter(s=>s.trim()).map(s=>({text:s,done:false})),
      createdAt:todayStr(), completed:false,
    };
    onData({...data, actionPlans:[...plans.filter(p=>p.completed), plan]});
    setCreating(false); setSelCat(null); setSteps(["",""]); setTarget(7);
    setPlanSaved(true); setTimeout(()=>setPlanSaved(false),2000);
  };

  const toggleStep = (planId, stepIdx) => {
    const updated = plans.map(p=>{
      if(p.id!==planId) return p;
      const newSteps=[...p.steps];
      newSteps[stepIdx]={...newSteps[stepIdx],done:!newSteps[stepIdx].done};
      const allDone=newSteps.every(s=>s.done);
      return {...p,steps:newSteps,completed:allDone};
    });
    onData({...data,actionPlans:updated});
  };

  const deletePlan = (id) => onData({...data,actionPlans:plans.filter(p=>p.id!==id)});

  // Challenge state
  const [addingChallenge, setAddingChallenge] = useState(false);
  const [cTitle, setCTitle] = useState("");
  const [cDontWant, setCDontWant] = useState("");
  const [cWant, setCWant] = useState("");
  const [cActions, setCActions] = useState(["",""]);
  const [cSaved, setCSaved] = useState(false);

  const saveChallenge = () => {
    if(!cTitle.trim()) return;
    const ch={id:Date.now().toString(),title:cTitle.trim(),dontWant:cDontWant,want:cWant,
      actions:cActions.filter(a=>a.trim()).map(a=>({text:a,done:false})),createdAt:todayStr(),completed:false};
    onData({...data,challenges:[ch,...challenges]});
    setCTitle("");setCDontWant("");setCWant("");setCActions(["",""]);
    setAddingChallenge(false);setCSaved(true);setTimeout(()=>setCSaved(false),2000);
  };

  const toggleChallengeAction=(chId,idx)=>{
    const updated=challenges.map(c=>{
      if(c.id!==chId)return c;
      const na=[...c.actions];na[idx]={...na[idx],done:!na[idx].done};
      return{...c,actions:na,completed:na.every(a=>a.done)};
    });
    onData({...data,challenges:updated});
  };

  const deleteChallenge=(id)=>onData({...data,challenges:challenges.filter(c=>c.id!==id)});



  return(<div className="pb-4">
      {/* ── ACTION PLAN ── */}
    {true&&<>
      {/* Active plan */}
      {activePlan&&!creating&&<div className="rounded-2xl p-5 mb-4" style={{background:card,border:`1.5px solid ${activePlan.catColor}40`}}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold tracking-wider" style={{color:muted}}>{t.activeplan}</p>
          <button onClick={()=>deletePlan(activePlan.id)} className="text-xs px-2 py-1 rounded-lg" style={{color:"#EF4444",background:"#EF444415"}}>{t.deleteChallenge}</button>
        </div>
        <div className="flex items-center gap-3 mb-4 p-3 rounded-xl" style={{background:activePlan.catColor+"15"}}>
          <span className="text-2xl">{activePlan.catEmoji}</span>
          <div className="flex-1">
            <div className="font-bold text-sm" style={{color:text}}>{activePlan.catLabel}</div>
            <div className="text-xs mt-0.5" style={{color:muted}}>{t.planCurrent}: {activePlan.current.toFixed(1)} → {t.planTarget}: {activePlan.target}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-black" style={{color:activePlan.catColor}}>
              {activePlan.steps.filter(s=>s.done).length}/{activePlan.steps.length}
            </div>
            <div className="text-xs" style={{color:muted}}>{t.planProgress(activePlan.steps.filter(s=>s.done).length,activePlan.steps.length)}</div>
          </div>
        </div>
        {activePlan.steps.map((step,i)=>(
          <button key={i} onClick={()=>toggleStep(activePlan.id,i)}
            className="w-full flex items-center gap-3 p-3 rounded-xl mb-2 text-left"
            style={{background:step.done?activePlan.catColor+"15":bg,border:`1px solid ${step.done?activePlan.catColor+"40":border}`}}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
              style={{background:step.done?activePlan.catColor:"transparent",border:`2px solid ${step.done?activePlan.catColor:border}`}}>
              {step.done&&<span className="text-xs text-white font-bold">✓</span>}
            </div>
            <span className="text-sm" style={{color:step.done?muted:text,textDecoration:step.done?"line-through":"none"}}>{step.text}</span>
          </button>
        ))}
        {activePlan.steps.every(s=>s.done)&&<div className="text-center py-2 rounded-xl mt-2"
          style={{background:"#10B98120",color:"#10B981"}}>
          <span className="font-bold text-sm">{t.planDone}</span>
        </div>}
      </div>}

      {/* No plan */}
      {!activePlan&&!creating&&<div className="text-center py-8 rounded-2xl mb-4"
        style={{background:sub,border:`1px solid ${border}`}}>
        <div className="text-4xl mb-3">🎯</div>
        <p className="font-semibold mb-1" style={{color:text}}>{t.noPlan}</p>
        <p className="text-xs mb-4" style={{color:muted}}>{t.noPlanSub}</p>
        {avgScores.length===0&&<p className="text-xs" style={{color:muted}}>{t.noScoresYet}</p>}
      </div>}

      {/* Create plan */}
      {!creating&&avgScores.length>0&&<button onClick={()=>setCreating(true)}
        className="w-full py-3 rounded-2xl font-bold text-sm mb-4"
        style={{background:"#3B82F6",color:"#fff"}}>
        {activePlan?t.newPlan:"+ "+t.actionPlanTitle}
      </button>}

      {creating&&<div className="rounded-2xl p-5 mb-4" style={{background:card,border:`1px solid ${border}`}}>
        <p className="text-xs font-bold tracking-wider mb-3" style={{color:muted}}>{t.weakestAreas}</p>

        {/* Category selector */}
        {avgScores.slice(0,5).map(c=>(
          <button key={c.id} onClick={()=>setSelCat(c)}
            className="w-full flex items-center gap-3 p-3 rounded-xl mb-2 text-left"
            style={{background:selCat?.id===c.id?c.color+"20":bg,border:`1.5px solid ${selCat?.id===c.id?c.color:border}`}}>
            <span className="text-lg">{c.emoji}</span>
            <div className="flex-1">
              <div className="text-sm font-semibold" style={{color:text}}>{c.label}</div>
              <div className="h-1.5 rounded-full mt-1" style={{background:dark?"#2D3F55":"#E8EEF4"}}>
                <div className="h-full rounded-full" style={{width:`${(c.avg/10)*100}%`,background:c.color}}/>
              </div>
            </div>
            <div className="text-sm font-black" style={{color:c.color}}>{c.avg.toFixed(1)}</div>
          </button>
        ))}

        {selCat&&<>
          <div className="mt-4 mb-4">
            <p className="text-xs font-bold mb-2" style={{color:muted}}>{t.targetLabel}: <span style={{color:selCat.color}}>{target}/10</span></p>
            <div className="grid grid-cols-10 gap-1">
              {[1,2,3,4,5,6,7,8,9,10].map(n=>(
                <button key={n} onClick={()=>setTarget(n)}
                  className="h-8 rounded-lg text-xs font-bold"
                  style={{background:n===target?selCat.color:n>Math.round(selCat.avg)?selCat.color+"25":bg,
                  color:n===target?"#fff":n>Math.round(selCat.avg)?selCat.color:muted,
                  border:`1px solid ${n===target?selCat.color:"transparent"}`}}>{n}</button>
              ))}
            </div>
          </div>

          <p className="text-xs font-bold mb-2" style={{color:muted}}>{t.actionSteps}</p>
          {steps.map((step,i)=>(
            <input key={i} value={step} onChange={e=>{const n=[...steps];n[i]=e.target.value;setSteps(n);}}
              placeholder={t.actionPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl text-sm mb-2 outline-none"
              style={{background:bg,border:`1px solid ${border}`,color:text}}/>
          ))}
          {steps.length<3&&<button onClick={()=>setSteps([...steps,""])}
            className="text-xs mb-4 px-3 py-1.5 rounded-xl" style={{color:"#3B82F6",background:"#3B82F615"}}>
            {t.addAction}
          </button>}
        </>}

        <div className="flex gap-2 mt-2">
          <button onClick={()=>{setCreating(false);setSelCat(null);setSteps(["",""]);}}
            className="px-4 py-3 rounded-2xl text-sm" style={{background:bg,color:muted}}>{t.cancelAction||t.deleteCancelled||"Peruuta"}</button>
          <button onClick={saveplan} className="flex-1 py-3 rounded-2xl font-bold text-sm"
            style={{background:planSaved?"#10B981":"#3B82F6",color:"#fff"}}>
            {planSaved?t.actionSaved:t.saveActionPlan}
          </button>
        </div>
      </div>}
    </>}


  </div>);
}

// ── Diary Library ─────────────────────────────────────────────────────────────
function DiaryLibrary({diary,CATS,dark,t}){
  const [openEntry,setOpenEntry]=useState(null);
  const entries=Object.entries(diary).filter(([,v])=>v.text||Object.keys(v.scores||{}).length>0).sort((a,b)=>b[0].localeCompare(a[0]));
  const card=dark?"#1A2332":"#FFFFFF",border=dark?"#2D3F55":"#E8EEF4";
  const text=dark?"#E2E8F0":"#1E293B",muted="#94A3B8",sub=dark?"#1E2A3B":"#F8FAFC";
  if(entries.length===0)return(<div className="text-center py-10 rounded-2xl" style={{background:sub,border:`1px solid ${border}`}}><div className="text-4xl mb-3">📖</div><p className="font-semibold mb-1" style={{color:text}}>{t.journalLibraryEmpty}</p><p className="text-xs px-4" style={{color:muted}}>{t.journalLibraryEmptySub}</p></div>);

  // Group by month
  const byMonth={};
  entries.forEach(([d,v])=>{const[y,m]=d.split("-");const key=`${y}-${m}`;if(!byMonth[key])byMonth[key]=[];byMonth[key].push([d,v]);});

  return(<div>
    {Object.entries(byMonth).map(([ym,monthEntries])=>{
      const[y,m]=ym.split("-");
      return(<div key={ym} className="mb-5">
        <p className="text-xs font-bold tracking-wider mb-3" style={{color:muted}}>{t.months[parseInt(m)-1].toUpperCase()} {y}</p>
        {monthEntries.map(([date,entry])=>{
          const scores=entry.scores||{};
          const avg=CATS.map(c=>scores[c.id]||5).reduce((a,b)=>a+b,0)/CATS.length;
          const d=new Date(date),preview=(entry.text||"").slice(0,80).replace(/\n/g," ");
          return(<button key={date} onClick={()=>setOpenEntry({date,entry})} className="w-full text-left p-4 rounded-2xl mb-2.5 transition-all" style={{background:card,border:`1px solid ${border}`}}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{moodEmoji(avg)}</span>
                <div>
                  <div className="text-sm font-bold" style={{color:text}}>{t.weekdaysFull[(d.getDay()+6)%7]} {parseInt(date.split("-")[2])}.</div>
                  <div className="text-xs" style={{color:muted}}>{avg.toFixed(1)}/10</div>
                </div>
              </div>
              <div className="flex items-end gap-0.5 h-6">{CATS.map(c=><div key={c.id} style={{width:"4px",height:`${((scores[c.id]||5)/10)*18+2}px`,background:c.color,borderRadius:"2px",opacity:0.8}}/>)}</div>
            </div>
            {preview&&<p className="text-xs leading-relaxed" style={{color:muted}}>{preview}{entry.text?.length>80?"…":""}</p>}
          </button>);
        })}
      </div>);
    })}
    {openEntry&&<EntryModal entry={openEntry.entry} date={openEntry.date} CATS={CATS} dark={dark} t={t} onClose={()=>setOpenEntry(null)}/>}
  </div>);
}

// ── Diary View ────────────────────────────────────────────────────────────────

// ── Diary Date Picker ─────────────────────────────────────────────────────────
function DiaryDatePicker({selDate, onSelect, dark, t, diary, onSearch, showSearch}) {
  const [calMode, setCalMode] = useState("week"); // "week" or "month"
  const [weekStart, setWeekStart] = useState(()=>getWeekMonday(todayStr()));
  const [calYear, setCalYear] = useState(()=>new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(()=>new Date().getMonth());
  const today = todayStr();
  const card=dark?"#1A2332":"#FFFFFF", border=dark?"#2D3F55":"#E8EEF4";
  const text=dark?"#E2E8F0":"#1E293B", muted="#94A3B8", sub=dark?"#1E2A3B":"#F8FAFC";

  const days = Array.from({length:7}, (_,i) => addDays(weekStart, i));

  return(<div className="mb-4">
    {/* Header row */}
    <div className="flex items-center gap-2 mb-2">
      {/* Week nav */}
      {calMode==="week"&&<>
        <button type="button" onClick={()=>setWeekStart(s=>addDays(s,-7))}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
          style={{background:sub,color:muted}}>‹</button>
        <button type="button" onClick={()=>{setWeekStart(getWeekMonday(today));onSelect(today);}}
          className="px-2 py-1 rounded-lg text-xs font-semibold"
          style={{background:"#3B82F615",color:"#3B82F6"}}>↩</button>
        <button type="button" onClick={()=>setWeekStart(s=>addDays(s,7))}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
          style={{background:sub,color:muted}}>›</button>
      </>}
      {/* Month nav */}
      {calMode==="month"&&<>
        <button type="button" onClick={()=>{if(calMonth===0){setCalYear(y=>y-1);setCalMonth(11);}else setCalMonth(m=>m-1);}}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
          style={{background:sub,color:muted}}>‹</button>
        <span className="text-xs font-bold flex-1 text-center" style={{color:text}}>
          {t.monthsShort[calMonth]} {calYear}
        </span>
        <button type="button" onClick={()=>{if(calMonth===11){setCalYear(y=>y+1);setCalMonth(0);}else setCalMonth(m=>m+1);}}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
          style={{background:sub,color:muted}}>›</button>
      </>}
      {/* Mode toggle */}
      <button type="button" onClick={()=>setCalMode(m=>m==="week"?"month":"week")}
        className="ml-auto px-2.5 py-1 rounded-lg text-xs font-semibold"
        style={{background:sub,color:muted}}>
        {calMode==="week"?"📅":"—"}
      </button>
      {/* Search */}
      <button type="button" onClick={onSearch}
        className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
        style={{background:showSearch?"#3B82F620":sub,
          border:`1px solid ${showSearch?"#3B82F6":border}`,
          color:showSearch?"#3B82F6":muted}}>🔍</button>
    </div>

    {/* Week view */}
    {calMode==="week"&&<div className="grid grid-cols-7 gap-1">
      {days.map(ds=>{
        const d=new Date(ds);
        const isToday=ds===today;
        const isSel=ds===selDate;
        const hasDiary=!!(diary[ds]?.text||Object.keys(diary[ds]?.scores||{}).length>0);
        return(
          <button key={ds} type="button" onClick={()=>onSelect(ds)}
            className="flex flex-col items-center rounded-xl py-1.5 transition-all"
            style={{
              background:isSel?"#3B82F6":isToday?"#3B82F618":sub,
              border:`1.5px solid ${isSel?"#3B82F6":isToday?"#3B82F640":border}`
            }}>
            <span style={{fontSize:"0.6rem",fontWeight:600,
              color:isSel?"#fff":muted}}>
              {t.weekdays[(d.getDay()+6)%7]}
            </span>
            <span style={{fontSize:"0.875rem",fontWeight:700,
              color:isSel?"#fff":isToday?"#3B82F6":text}}>
              {d.getDate()}
            </span>
            {hasDiary&&<div className="w-1 h-1 rounded-full mt-0.5"
              style={{background:isSel?"rgba(255,255,255,0.8)":"#10B981"}}/>}
          </button>
        );
      })}
    </div>}

    {/* Month view */}
    {calMode==="month"&&<>
      <div className="grid grid-cols-7 mb-1">
        {t.weekdays.map(d=><div key={d} className="text-center"
          style={{fontSize:"0.6rem",fontWeight:600,color:muted,padding:"2px 0"}}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({length:firstWeekday(calYear,calMonth)}).map((_,i)=><div key={`x${i}`}/>)}
        {Array.from({length:daysInMonth(calYear,calMonth)}).map((_,i)=>{
          const day=i+1;
          const ds=`${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
          const isToday=ds===today;
          const isSel=ds===selDate;
          const hasDiary=!!(diary[ds]?.text||Object.keys(diary[ds]?.scores||{}).length>0);
          return(
            <button key={day} type="button" onClick={()=>{onSelect(ds);setCalMode("week");setWeekStart(getWeekMonday(ds));}}
              className="rounded-lg flex flex-col items-center py-1 transition-all"
              style={{
                background:isSel?"#3B82F6":isToday?"#3B82F618":"transparent",
                border:`1px solid ${isSel?"#3B82F6":isToday?"#3B82F640":"transparent"}`
              }}>
              <span style={{fontSize:"0.75rem",fontWeight:isSel||isToday?700:400,
                color:isSel?"#fff":isToday?"#3B82F6":text}}>{day}</span>
              {hasDiary&&<div className="w-1 h-1 rounded-full"
                style={{background:isSel?"rgba(255,255,255,0.8)":"#10B981"}}/>}
            </button>
          );
        })}
      </div>
    </>}
  </div>);
}

function DiaryView({data,onData,dark,onSaved,t,CATS,showInfoIcons}){
  const [selDate,setSelDate]=useState(todayStr());
  const [diaryTab,setDiaryTab]=useState("write");
  const [search,setSearch]=useState("");
  const [showSearch,setShowSearch]=useState(false);
  const diary=data.diary||{},day=diary[selDate]||{},scores=day.scores||{},text=day.text||"";
  const updateScore=(id,v)=>onData({...data,diary:{...diary,[selDate]:{...day,scores:{...scores,[id]:v}}}});
  const updateText=(v)=>onData({...data,diary:{...diary,[selDate]:{...day,text:v}}});
  const [saved,setSaved]=useState(false);
  const [showPostAssess,setShowPostAssess]=useState(false);
  const [postCat,setPostCat]=useState(null);
  const [postSteps,setPostSteps]=useState(["",""]);
  const [postSaved,setPostSaved]=useState(false);
  const handleSave=()=>{
    save(data);setSaved(true);onSaved();
    setTimeout(()=>setSaved(false),2500);
    // Show post-assessment after assess tab save
    if(diaryTab==="assess") setTimeout(()=>setShowPostAssess(true),600);
  };
  const avg=()=>{const vs=CATS.map(c=>scores[c.id]||5);return(vs.reduce((a,b)=>a+b,0)/vs.length).toFixed(1);};
  const card=dark?"#1A2332":"#FFFFFF",border=dark?"#2D3F55":"#E8EEF4";
  const textC=dark?"#E2E8F0":"#1E293B",muted="#94A3B8",bg=dark?"#0F1826":"#F8FAFC",sub=dark?"#1E2A3B":"#F8FAFC";
  const searchResults=search.length>1?Object.entries(diary).filter(([,v])=>v.text?.toLowerCase().includes(search.toLowerCase())).sort((a,b)=>b[0].localeCompare(a[0])):[];

  const DIARY_TABS=[{id:"write",l:t.freeWrite},{id:"assess",l:t.freeAssess},{id:"action",l:t.actionPlan},{id:"library",l:"📖"}];

  return(<div className="pb-4">
    <DiaryDatePicker selDate={selDate} onSelect={setSelDate} dark={dark} t={t} diary={diary}
      onSearch={()=>setShowSearch(s=>!s)} showSearch={showSearch}/>

    {showSearch&&<div className="rounded-2xl p-4 mb-4" style={{background:card,border:`1px solid ${border}`}}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.searchDiary} autoFocus className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-3" style={{background:bg,border:`1px solid ${border}`,color:textC}}/>
      {search.length>1&&<div><p className="text-xs mb-2" style={{color:muted}}>{searchResults.length} {t.searchResults}</p>
        {searchResults.length===0&&<p className="text-sm" style={{color:muted}}>{t.noResults}</p>}
        {searchResults.map(([d,v])=>{const idx=v.text.toLowerCase().indexOf(search.toLowerCase());return(<button key={d} onClick={()=>{setSelDate(d);setShowSearch(false);setSearch("");setDiaryTab("write");}} className="w-full text-left p-3 rounded-xl mb-2" style={{background:bg,border:`1px solid ${border}`}}><div className="text-xs font-bold mb-1" style={{color:"#3B82F6"}}>{formatFi(d,t.months)}</div><div className="text-xs" style={{color:muted}}>…{v.text.slice(Math.max(0,idx-30),idx+60)}…</div></button>);})}
      </div>}
    </div>}

    {/* Diary tabs */}
    <div className="flex gap-1 p-1 rounded-2xl mb-4 overflow-x-auto" style={{background:sub}}>
      {DIARY_TABS.map(tab=>(
        <button key={tab.id} onClick={()=>setDiaryTab(tab.id)} className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
          style={{background:diaryTab===tab.id?card:"transparent",color:diaryTab===tab.id?textC:muted,boxShadow:diaryTab===tab.id?"0 1px 4px rgba(0,0,0,0.12)":"none",minWidth:"fit-content",padding:"0.5rem 0.75rem"}}>{tab.l}</button>
      ))}
    </div>

    {diaryTab==="write"&&<>
      {/* Integrated gratitude */}
      <div className="rounded-2xl p-5 mb-3" style={{background:card,border:`1px solid #F59E0B30`}}>
        <p className="text-xs font-bold tracking-wider mb-3" style={{color:"#F59E0B"}}>🙏 {t.gratitudeInline}</p>
        {[0,1,2].map(i=>{
          const gratToday = (data.gratitude||{})[selDate]?.items||["","",""];
          return(<div key={i} className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"
              style={{background:gratToday[i]?.trim()?"#10B98120":"transparent",
              border:`1.5px solid ${gratToday[i]?.trim()?"#10B981":border}`,
              color:gratToday[i]?.trim()?"#10B981":muted}}>
              {gratToday[i]?.trim()?"✓":i+1}
            </div>
            <input value={gratToday[i]||""} onChange={e=>{
              const items=[...gratToday];items[i]=e.target.value;
              const newGrat={...(data.gratitude||{}),[selDate]:{items,savedAt:new Date().toISOString()}};
              onData({...data,gratitude:newGrat});
            }} placeholder={t.gratitudePlaceholderInline(i+1)}
            className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
            style={{background:bg,border:`1px solid ${border}`,color:textC}}/>
          </div>);
        })}
      </div>
      {/* Free text */}
      <div className="rounded-2xl p-5 mb-4" style={{background:card,border:`1px solid ${border}`}}>
        <p className="text-xs font-bold tracking-wider mb-3" style={{color:muted}}>{t.freeDiary}</p>
        <textarea value={text} onChange={e=>updateText(e.target.value)} placeholder={t.freePlaceholder} rows={6} className="w-full bg-transparent outline-none text-sm resize-none" style={{color:textC,lineHeight:"1.7"}}/>
      </div>
      <button onClick={handleSave} className="w-full py-4 rounded-2xl font-bold text-sm transition-all" style={{background:saved?"#10B981":"#3B82F6",color:"#fff",boxShadow:saved?"0 4px 20px #10B98150":"0 4px 20px #3B82F650"}}>{saved?t.saved:t.saveDay}</button>
      {saved&&<button type="button" onClick={()=>setDiaryTab("assess")}
        className="w-full py-3 rounded-2xl text-sm font-semibold mt-2"
        style={{background:dark?"#1E2A3B":"#F1F5F9",color:"#3B82F6",border:"1px solid #3B82F630"}}>
        {t.continueToAssess}
      </button>}
    </>}

    {diaryTab==="assess"&&<>
      <div className="rounded-2xl p-4 mb-4 flex items-center gap-4" style={{background:dark?"linear-gradient(135deg,#1E2A3B,#162032)":"linear-gradient(135deg,#EFF6FF,#F0FDF4)",border:`1px solid ${border}`}}>
        <div className="text-center w-16"><div className="text-4xl font-black" style={{color:"#3B82F6"}}>{avg()}</div><div className="text-xs font-medium" style={{color:muted}}>/ 10</div></div>
        <div className="flex-1"><div className="font-bold text-sm mb-1" style={{color:textC}}>{t.wellbeing}</div><div className="text-xs mb-2" style={{color:muted}}>{formatFi(selDate,t.months)}</div>
          <div className="flex items-end gap-0.5 h-6">{CATS.map(c=><div key={c.id} className="flex-1 rounded-sm" style={{background:c.color,height:`${((scores[c.id]||5)/10)*100}%`,opacity:0.85}}/>)}</div>
        </div>
      </div>
      <div className="rounded-2xl p-5 mb-3" style={{background:card,border:`1px solid ${border}`}}>
        <div className="flex items-center gap-2 mb-4"><span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-lg" style={{background:"#3B82F618",color:"#3B82F6"}}>PERMA</span></div>
        {CATS.filter(c=>c.section==="PERMA").map(c=><PermaSlider key={c.id} cat={c} value={scores[c.id]||5} onChange={v=>updateScore(c.id,v)} dark={dark} t={t} showInfoIcons={showInfoIcons}/>)}
      </div>
      <div className="rounded-2xl p-5 mb-4" style={{background:card,border:`1px solid ${border}`}}>
        <div className="flex items-center gap-2 mb-4"><span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-lg" style={{background:"#8B5CF618",color:"#8B5CF6"}}>+4</span></div>
        {CATS.filter(c=>c.section==="+4").map(c=><PermaSlider key={c.id} cat={c} value={scores[c.id]||5} onChange={v=>updateScore(c.id,v)} dark={dark} t={t} showInfoIcons={showInfoIcons}/>)}
      </div>
      <button onClick={handleSave} className="w-full py-4 rounded-2xl font-bold text-sm transition-all" style={{background:saved?"#10B981":"#3B82F6",color:"#fff",boxShadow:saved?"0 4px 20px #10B98150":"0 4px 20px #3B82F650"}}>{saved?t.saved:t.saveDay}</button>
      {saved&&<button type="button" onClick={()=>setDiaryTab("action")}
        className="w-full py-3 rounded-2xl text-sm font-semibold mt-2"
        style={{background:dark?"#1E2A3B":"#F1F5F9",color:"#8B5CF6",border:"1px solid #8B5CF630"}}>
        {t.continueToAction}
      </button>}
    </>}

    {diaryTab==="action"&&<ActionPlanView data={data} onData={onData} dark={dark} t={t} CATS={CATS}/>}
    {diaryTab==="library"&&<DiaryLibrary diary={diary} CATS={CATS} dark={dark} t={t}/>}

    {/* Post-assessment modal */}
    {showPostAssess&&<div className="fixed inset-0 z-50 flex items-end justify-center" style={{background:"rgba(0,0,0,0.6)",backdropFilter:"blur(6px)"}} onClick={()=>setShowPostAssess(false)}>
      <div className="w-full max-w-md rounded-t-3xl overflow-y-auto" style={{background:card,maxHeight:"85vh"}} onClick={e=>e.stopPropagation()}>
        <div className="px-5 pt-5 pb-3 flex items-center justify-between sticky top-0 z-10" style={{background:card}}>
          <h3 className="font-bold text-base" style={{color:textC}}>{t.postAssessTitle}</h3>
          <button type="button" onClick={()=>setShowPostAssess(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{background:dark?"#1E2A3B":"#F1F5F9",color:muted}}>×</button>
        </div>
        <div className="px-5 pb-8">
          <p className="text-xs mb-4" style={{color:muted}}>{t.postAssessSub}</p>
          {/* Show bottom 3 scoring areas */}
          {[...CATS].map(c=>({...c,score:scores[c.id]||5})).sort((a,b)=>a.score-b.score).slice(0,3).map(c=>(
            <button key={c.id} type="button" onClick={()=>setPostCat(postCat?.id===c.id?null:c)}
              className="w-full flex items-center gap-3 p-3 rounded-xl mb-2 text-left"
              style={{background:postCat?.id===c.id?c.color+"20":bg,border:`1.5px solid ${postCat?.id===c.id?c.color:border}`}}>
              <span className="text-xl">{c.emoji}</span>
              <div className="flex-1"><div className="text-sm font-semibold" style={{color:textC}}>{c.label}</div></div>
              <div className="text-sm font-black" style={{color:c.color}}>{c.score}/10</div>
            </button>
          ))}
          {postCat&&<>
            <p className="text-xs font-bold mb-2 mt-4" style={{color:muted}}>{t.postAssessSteps}</p>
            {postSteps.map((s,i)=>(
              <input key={i} value={s} onChange={e=>{const n=[...postSteps];n[i]=e.target.value;setPostSteps(n);}}
                placeholder={t.postAssessStepPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl text-sm mb-2 outline-none"
                style={{background:bg,border:`1px solid ${border}`,color:textC}}/>
            ))}
            {postSteps.length<3&&<button type="button" onClick={()=>setPostSteps([...postSteps,""])}
              className="text-xs px-3 py-1.5 rounded-xl mb-3"
              style={{color:"#3B82F6",background:"#3B82F615"}}>{t.addAction||"+ Lisää teko"}</button>}
          </>}
          <div className="flex gap-2 mt-2">
            <button type="button" onClick={()=>setShowPostAssess(false)}
              className="px-4 py-3 rounded-2xl text-sm" style={{background:bg,color:muted}}>{t.postAssessSkip}</button>
            <button type="button" onClick={()=>{
              if(!postCat||!postSteps.filter(s=>s.trim()).length){setShowPostAssess(false);return;}
              const plan={id:Date.now().toString(),catId:postCat.id,catLabel:postCat.label,catColor:postCat.color,catEmoji:postCat.emoji,
                current:scores[postCat.id]||5,target:Math.min(10,(scores[postCat.id]||5)+2),
                steps:postSteps.filter(s=>s.trim()).map(s=>({text:s,done:false})),createdAt:selDate,completed:false};
              onData({...data,actionPlans:[...(data.actionPlans||[]).filter(p=>p.completed),plan]});
              setPostSaved(true);setTimeout(()=>{setPostSaved(false);setShowPostAssess(false);setPostCat(null);setPostSteps(["",""]);},1500);
            }} className="flex-1 py-3 rounded-2xl font-bold text-sm"
              style={{background:postSaved?"#10B981":"#3B82F6",color:"#fff"}}>
              {postSaved?t.postAssessSaved:t.postAssessSave}
            </button>
          </div>
        </div>
      </div>
    </div>}
  </div>);
}


// ── Insights data ─────────────────────────────────────────────────────────────
const INSIGHTS = {
  fi: [
    // positive_emotions
    { id:"pe1", catId:"positive_emotions",
      quote:"Positiiviset tunteet eivät ole vain mukava lisä elämään. Ne laajentavat ajatteluamme ja rakentavat psyykkistä kestävyyttä. Barbara Fredricksonin tutkimuksen mukaan ihminen alkaa kukoistaa kun positiiviset kokemukset selvästi ylittävät negatiiviset, ei vasta kun kaikki on hyvin.",
      questions:["Mikä asia tänään on saanut sinut hymyilemään?"] },
    // engagement
    { id:"en1", catId:"engagement",
      quote:"Flow-tila ei vaadi erityistä lahjakkuutta. Se syntyy kun haasteellisuus ja taitosi kohtaavat juuri sopivasti. Mihaly Csikszentmihalyin mukaan flow on onnellisuuden puhtain muoto.",
      questions:["Milloin viimeksi aika katosi sinulta täysin? Mitä teit silloin?"] },
    // relationships
    { id:"re1", catId:"relationships",
      quote:"Harvardin 80 vuotta kestänyt tutkimus osoitti että laadukkaat ihmissuhteet ovat tärkein yksittäinen tekijä pitkässä ja onnellisessa elämässä. Ei varallisuus, ei kuuluisuus, vaan aito yhteys toisiin ihmisiin.",
      questions:["Miten voisit osoittaa tälle ihmiselle tänään tai tällä viikolla, että hän on sinulle tärkeä?","Mitä mukavaa yhteistä tekemistä voisit suunnitella hänen kanssaan?"] },
    // meaning
    { id:"me1", catId:"meaning",
      quote:"Merkityksellisyys ei löydy vain suurista hetkistä vaan siitä, miten annamme merkityksen pienille arjen asioille. Kun tiedät miksi teet mitä teet, se miten teet sen muuttuu voimavaraksesi.",
      questions:["Mikä asia arjessasi tuntuu merkitykselliseltä juuri sinulle? Miten voisit antaa sille enemmän tilaa tällä viikolla?"] },
    // accomplishment
    { id:"ac1", catId:"accomplishment",
      quote:"Edistyminen, ei täydellisyys, on motivaation paras ruokkija. Teresa Amabilen tutkimus osoitti että pienikin edistyminen merkityksellisessä työssä on päivän tärkein hyvinvoinnin lähde.",
      questions:["Mikä asia eteni tänään juuri sinulle merkityksellisellä tavalla?","Mistä tämän päivän edistymisestä voit olla ylpeä, jopa pienestäkin asiasta?"] },
    // physical_health
    { id:"ph1", catId:"physical_health",
      quote:"Keho ja mieli eivät ole erillisiä, ne ovat sama järjestelmä. Jo 20 minuutin päivittäinen liike voi parantaa mielialaa, terävöittää ajattelua ja lisätä energiaa. Pienetkin liikkumisen hetket kertyvät ja rakentavat hyvinvointia päivä päivältä.",
      questions:["Miten kehosi viestii sinulle tänään? Mitä se tarvitsee, ja miten voisit antaa sen sille?"] },
    // growth_mindset
    { id:"gm1", catId:"growth_mindset",
      quote:"Carol Dweckin tutkimus osoitti että ihmiset, jotka uskovat kykyjensä kehittyvän harjoittelemalla, saavuttavat enemmän ja nauttivat matkasta enemmän. Kyse ei ole lahjakkuudesta vaan siitä mitä uskomme itsestämme.",
      questions:["Mikä haaste on viime aikoina opettanut sinulle jotain uutta itsestäsi tai kyvyistäsi?"] },
    // environment
    { id:"ev1", catId:"environment",
      quote:"Ympäristömme muokkaa meitä enemmän kuin haluamme myöntää. Tutkimukset osoittavat että siisti ja valaiseva tila vähentää stressihormonia merkittävästi verrattuna kaoottiseen ympäristöön.",
      questions:["Mikä osa koti- tai työympäristöstäsi kuluttaa energiaasi juuri nyt? Entä mitä paikkoja, esineitä tai tunnelmia ympärilläsi on, jotka saavat sinut tuntemaan olosi latautuneeksi, rauhalliseksi ja omalta itseltäsi?"] },
    // economic_security A
    { id:"es1", catId:"economic_security",
      quote:"Raha yksinään ei tuo onnellisuutta, kun taas taloudellinen turva antaa mielelle tilaa hengittää. Se ei tarkoita vaurautta vaan luottamusta siihen, että pystyt kohtaamaan yllättävätkin elämäntilanteet.",
      questions:["Mikä pieni askel voisi vahvistaa taloudellista turvallisuuden tunnettasi tällä viikolla?"] },
    // economic_security B
    { id:"es2", catId:"economic_security",
      quote:"Taloudellinen turvallisuus rakentuu pienistä päätöksistä, jotka tehdään joka päivä. Jokainen askel kohti selkeämpää taloudenpitoa on askel kohti vapaampaa mieltä ja enemmän energiaa sille mikä oikeasti merkitsee.",
      questions:["Mistä taloudellisesta edistymisestä viime aikoina voit olla ylpeä, vaikka se olisi pieni asia?"] },
    // general
    { id:"gen1", catId:null,
      quote:"Martin Seligman, positiivisen psykologian isä, opetti että hyvinvointi ei ole tunnetila vaan elämäntapa. Se rakentuu päivittäisistä pienistä valinnoista, ei suurista mullistuksista.",
      questions:["Mikä pieni päivittäinen valinta tukee hyvinvointiasi eniten juuri nyt, ja miten voisit tehdä siitä vielä helpomman itsellesi?"] },
  ],
  en: [
    { id:"pe1", catId:"positive_emotions",
      quote:"Positive emotions are not just a pleasant bonus in life. They broaden our thinking and build psychological resilience. According to Barbara Fredrickson's research, people begin to flourish when positive experiences clearly outnumber negative ones, not only when everything is going well.",
      questions:["What has made you smile today?"] },
    { id:"en1", catId:"engagement",
      quote:"Flow doesn't require special talent. It emerges when the level of challenge meets your skills in just the right way. According to Mihaly Csikszentmihalyi, flow is the purest form of happiness.",
      questions:["When did you last lose track of time completely? What were you doing?"] },
    { id:"re1", catId:"relationships",
      quote:"Harvard's 80-year study revealed that quality relationships are the single most important factor in a long and happy life. Not wealth, not fame, but genuine connection with other people.",
      questions:["How could you show this person today or this week that they are important to you?","What enjoyable activity could you plan together with them?"] },
    { id:"me1", catId:"meaning",
      quote:"Meaning is not found only in grand moments. It lives in the way we give significance to the small things in everyday life. When you know why you do what you do, how you do it becomes a source of strength.",
      questions:["What in your daily life feels meaningful to you? How could you give it a little more space this week?"] },
    { id:"ac1", catId:"accomplishment",
      quote:"Progress, not perfection, is the greatest motivator. Teresa Amabile's research showed that even small steps forward in meaningful work are the most important source of wellbeing in any given day.",
      questions:["What moved forward today in a way that feels meaningful to you?","What progress from today can you feel proud of, even if it seems small?"] },
    { id:"ph1", catId:"physical_health",
      quote:"The body and mind are not separate — they are one system. Even 20 minutes of daily movement can lift your mood, sharpen your thinking and increase your energy. Small moments of movement add up and build wellbeing day by day.",
      questions:["How is your body speaking to you today? What does it need, and how could you give that to it?"] },
    { id:"gm1", catId:"growth_mindset",
      quote:"Carol Dweck's research showed that people who believe their abilities can be developed through effort achieve more and enjoy the journey more. It is not about talent — it is about what we believe about ourselves.",
      questions:["What challenge has recently taught you something new about yourself or your abilities?"] },
    { id:"ev1", catId:"environment",
      quote:"Our environment shapes us more than we like to admit. Research shows that a tidy and bright space significantly reduces stress hormones compared to a chaotic environment.",
      questions:["What parts of your home or work environment are currently draining your energy? And what places, objects or atmospheres around you make you feel recharged, calm and fully yourself?"] },
    { id:"es1", catId:"economic_security",
      quote:"Money alone does not bring happiness, yet financial security gives the mind room to breathe. It is not about wealth — it is about trusting that you can face unexpected situations in life.",
      questions:["What small step could strengthen your sense of financial security this week?"] },
    { id:"es2", catId:"economic_security",
      quote:"Financial security is built through small decisions made every day. Every step toward greater clarity in your finances is a step toward a freer mind and more energy for what truly matters.",
      questions:["What financial progress have you made recently that you can feel proud of, even if it feels small?"] },
    { id:"gen1", catId:null,
      quote:"Martin Seligman, the father of positive psychology, taught that wellbeing is not a feeling — it is a way of life. It is built through small daily choices, not through great transformations.",
      questions:["What small daily choice supports your wellbeing the most right now, and how could you make it even easier for yourself?"] },
  ],
};

// Get today's insight based on day of year
const getTodaysInsight = (lang) => {
  const items = INSIGHTS[lang] || INSIGHTS.fi;
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(),0,0)) / 86400000);
  return items[dayOfYear % items.length];
};

// Get question for today (cycles through multiple questions per insight)
const getTodaysQuestion = (insight) => {
  const qs = insight.questions;
  if (qs.length === 1) return qs[0];
  const weekNum = Math.floor((new Date() - new Date(new Date().getFullYear(),0,0)) / (86400000*7));
  return qs[weekNum % qs.length];
};

// ── Growth View ───────────────────────────────────────────────────────────────
function GrowthView({data, dark, t, CATS, lang}) {
  const [expandedCat, setExpandedCat] = useState(null);
  const diary = data.diary || {};
  const dates = Object.keys(diary).sort().slice(-30);

  const card=dark?"#1A2332":"#FFFFFF", border=dark?"#2D3F55":"#E8EEF4";
  const text=dark?"#E2E8F0":"#1E293B", muted="#94A3B8", sub=dark?"#1E2A3B":"#F8FAFC";

  // Today's insight
  const insight = getTodaysInsight(lang);
  const question = insight ? getTodaysQuestion(insight) : "";
  const insightCat = insight?.catId ? CATS.find(c=>c.id===insight.catId) : null;

  // Profile data
  const avgScore = (catId) => {
    const vs = dates.map(d=>diary[d]?.scores?.[catId]||0).filter(v=>v>0);
    return vs.length ? (vs.reduce((a,b)=>a+b,0)/vs.length) : 0;
  };
  const catAvgs = CATS.map(c=>({...c, avg:avgScore(c.id)})).filter(c=>c.avg>0).sort((a,b)=>b.avg-a.avg);
  const strongCats = catAvgs.slice(0,3);
  const developCats = [...catAvgs].sort((a,b)=>a.avg-b.avg).slice(0,3);

  // Week theme — cycles through CATS by week number
  const weekNum = Math.floor((new Date() - new Date(new Date().getFullYear(),0,0)) / (86400000*7));
  const weekCat = CATS[weekNum % CATS.length];

  return(<div className="pb-6">

    {/* ── Today's Insight ── */}
    <div className="rounded-2xl p-5 mb-4"
      style={{background:insightCat?`linear-gradient(135deg,${insightCat.color}18,${insightCat.color}08)`:dark?"linear-gradient(135deg,#1E2A3B,#162032)":"linear-gradient(135deg,#EFF6FF,#F0FDF4)",
      border:`1px solid ${insightCat?insightCat.color+"30":border}`}}>
      <div className="flex items-center gap-2 mb-3">
        {insightCat&&<span className="text-xl">{insightCat.emoji}</span>}
        <p className="text-xs font-bold tracking-wider" style={{color:insightCat?.color||muted}}>{t.todaysInsight}</p>
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{color:text,fontStyle:"italic"}}>
        "{insight?.quote}"
      </p>
      <div className="rounded-xl p-3" style={{background:dark?"rgba(0,0,0,0.2)":"rgba(255,255,255,0.7)"}}>
        <p className="text-xs font-bold mb-1" style={{color:insightCat?.color||"#3B82F6"}}>🤔 {t.reflectQ}</p>
        <p className="text-sm" style={{color:text}}>{question}</p>
      </div>
    </div>

    {/* ── Week Theme ── */}
    <div className="rounded-2xl p-5 mb-4" style={{background:card,border:`1px solid ${weekCat.color}40`}}>
      <p className="text-xs font-bold tracking-wider mb-1" style={{color:muted}}>{t.weekTheme}</p>
      <p className="text-xs mb-3" style={{color:muted}}>{t.weekThemeSub}</p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{background:weekCat.color+"20"}}>{weekCat.emoji}</div>
        <div>
          <div className="font-bold text-base" style={{color:weekCat.color}}>{weekCat.label}</div>
          <div className="text-xs mt-0.5" style={{color:muted}}>{weekCat.section}</div>
        </div>
      </div>
    </div>

    {/* ── Area Map ── */}
    <p className="text-xs font-bold tracking-wider mb-1" style={{color:muted}}>{t.areaMap}</p>
    <p className="text-xs mb-3" style={{color:muted}}>{t.areaMapSub}</p>
    <div className="grid grid-cols-3 gap-2 mb-4">
      {CATS.map(cat=>(
        <button key={cat.id} type="button"
          onClick={()=>setExpandedCat(expandedCat?.id===cat.id?null:cat)}
          className="rounded-2xl p-3 flex flex-col items-center text-center transition-all"
          style={{background:expandedCat?.id===cat.id?cat.color+"25":card,
          border:`1.5px solid ${expandedCat?.id===cat.id?cat.color:border}`}}>
          <span className="text-2xl mb-1">{cat.emoji}</span>
          <span className="text-xs font-semibold leading-tight" style={{color:expandedCat?.id===cat.id?cat.color:text}}>{cat.label}</span>
          <span className="text-xs mt-1 px-1.5 py-0.5 rounded-full" style={{background:cat.color+"20",color:cat.color}}>{cat.section}</span>
        </button>
      ))}
    </div>

    {/* Expanded area — modal overlay same as onboarding */}
    {expandedCat&&(()=>{
      const catInsights = (INSIGHTS[lang]||INSIGHTS.fi).filter(i=>i.catId===expandedCat.id);
      return(
        <div onClick={()=>setExpandedCat(null)} style={{
          position:"fixed",inset:0,zIndex:200,
          display:"flex",alignItems:"center",justifyContent:"center",
          padding:"1.5rem",
          background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)"
        }}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:"100%",maxWidth:"380px",borderRadius:"1.5rem",padding:"1.5rem",
            background:dark?"#1A2332":"#ffffff",
            border:`2px solid ${expandedCat.color}60`,
            boxSizing:"border-box",maxHeight:"80vh",overflowY:"auto"
          }}>
            {/* Header */}
            <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1rem"}}>
              <div style={{width:"3rem",height:"3rem",borderRadius:"0.875rem",flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:"1.5rem",background:expandedCat.color+"22"}}>
                {expandedCat.emoji}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:"0.6875rem",fontWeight:700,color:expandedCat.color,
                  marginBottom:"0.125rem",letterSpacing:"0.05em"}}>{expandedCat.section}</div>
                <div style={{fontSize:"1rem",fontWeight:700,color:dark?"#E2E8F0":"#1E293B"}}>
                  {expandedCat.label}
                </div>
              </div>
            </div>
            {/* Info */}
            <p style={{fontSize:"0.875rem",lineHeight:1.65,
              color:dark?"#94A3B8":"#64748B",margin:"0 0 1rem 0"}}>
              {expandedCat.info}
            </p>
            {/* Reflection questions */}
            {catInsights.length>0&&<div style={{
              borderRadius:"0.875rem",padding:"0.875rem",marginBottom:"1rem",
              background:dark?"rgba(0,0,0,0.25)":"rgba(0,0,0,0.04)"
            }}>
              <p style={{fontSize:"0.75rem",fontWeight:700,color:expandedCat.color,
                margin:"0 0 0.5rem 0"}}>🤔 {t.reflectQ}</p>
              {catInsights[0].questions.map((q,i)=>(
                <p key={i} style={{fontSize:"0.875rem",lineHeight:1.5,
                  color:dark?"#E2E8F0":"#1E293B",margin:i>0?"0.5rem 0 0 0":"0"}}>{q}</p>
              ))}
            </div>}
            {/* Close button */}
            <button type="button" onClick={()=>setExpandedCat(null)} style={{
              display:"block",width:"100%",padding:"0.875rem",
              borderRadius:"1rem",fontSize:"0.9375rem",fontWeight:700,
              border:"none",cursor:"pointer",
              background:expandedCat.color+"22",color:expandedCat.color,
              boxSizing:"border-box",minHeight:"52px"
            }}>{t.infoClose}</button>
          </div>
        </div>
      );
    })()}

    {/* ── My Profile ── */}
    <p className="text-xs font-bold tracking-wider mb-1" style={{color:muted}}>{t.myProfile}</p>
    <p className="text-xs mb-3" style={{color:muted}}>{t.profileSub}</p>
    {catAvgs.length===0?(
      <div className="text-center py-8 rounded-2xl mb-4" style={{background:sub,border:`1px solid ${border}`}}>
        <div className="text-3xl mb-2">🌱</div>
        <p className="text-sm" style={{color:muted}}>{t.noProfileData}</p>
      </div>
    ):(
      <div className="mb-4">
        {/* Strengths */}
        <div className="rounded-2xl p-4 mb-3" style={{background:card,border:`1px solid #10B98140`}}>
          <p className="text-xs font-bold mb-3" style={{color:"#10B981"}}>⭐ {t.strongAreas}</p>
          {strongCats.map(c=>(
            <div key={c.id} className="flex items-center gap-3 mb-3">
              <span className="text-lg shrink-0">{c.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium" style={{color:text}}>{c.label}</span>
                  <span className="text-sm font-bold ml-2 shrink-0" style={{color:c.color}}>{c.avg.toFixed(1)}</span>
                </div>
                <div className="h-2 rounded-full" style={{background:dark?"#2D3F55":"#E8EEF4"}}>
                  <div style={{width:`${(c.avg/10)*100}%`,height:"100%",background:c.color,borderRadius:"9999px"}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Development areas */}
        <div className="rounded-2xl p-4" style={{background:card,border:`1px solid #3B82F640`}}>
          <p className="text-xs font-bold mb-3" style={{color:"#3B82F6"}}>🎯 {t.developAreas}</p>
          {developCats.map(c=>(
            <div key={c.id} className="flex items-center gap-3 mb-3">
              <span className="text-lg shrink-0">{c.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium" style={{color:text}}>{c.label}</span>
                  <span className="text-sm font-bold ml-2 shrink-0" style={{color:c.color}}>{c.avg.toFixed(1)}</span>
                </div>
                <div className="h-2 rounded-full" style={{background:dark?"#2D3F55":"#E8EEF4"}}>
                  <div style={{width:`${(c.avg/10)*100}%`,height:"100%",background:c.color,borderRadius:"9999px"}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>);
}


// ── Onboarding View ───────────────────────────────────────────────────────────

// ── PERMA Step (onboarding step 1 with modal info) ───────────────────────────
function PermaStep({dark, t, CATS, card, border, muted, text, onBack, onNext}) {
  const [openId, setOpenId] = useState(null);
  const openCat = openId ? CATS.find(c=>c.id===openId) : null;

  return(
    <div style={{padding:"2rem 1.5rem",boxSizing:"border-box"}}>
      <div style={{textAlign:"center",marginBottom:"1.5rem",paddingTop:"1rem"}}>
        <h2 style={{fontSize:"1.5rem",fontWeight:900,
          color:dark?"#E2E8F0":"#1E293B",margin:"0 0 0.75rem 0"}}>
          {t.ob2Title}
        </h2>
        <p style={{fontSize:"0.875rem",lineHeight:1.5,color:muted,margin:0}}>
          {t.ob2Sub}
        </p>
      </div>

      {/* 3x3 grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
        gap:"0.5rem",marginBottom:"1.5rem"}}>
        {CATS.map(cat=>(
          <button key={cat.id} type="button" onClick={()=>setOpenId(cat.id)} style={{
            padding:"0.75rem 0.25rem",borderRadius:"1rem",
            border:`1.5px solid ${cat.color}40`,
            background:card,cursor:"pointer",
            display:"flex",flexDirection:"column",alignItems:"center",
            boxSizing:"border-box"
          }}>
            <span style={{fontSize:"1.5rem",marginBottom:"0.375rem"}}>{cat.emoji}</span>
            <span style={{fontSize:"0.6rem",fontWeight:600,lineHeight:1.2,
              color:dark?"#E2E8F0":"#1E293B",textAlign:"center"}}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div style={{display:"flex",gap:"0.75rem"}}>
        <button type="button" onClick={onBack} style={{
          padding:"0.875rem 1.25rem",borderRadius:"1rem",
          fontSize:"0.9375rem",fontWeight:600,cursor:"pointer",
          background:card,color:muted,border:`1px solid ${border}`,
          boxSizing:"border-box",minHeight:"52px"
        }}>←</button>
        <button type="button" onClick={onNext} style={{
          flex:1,padding:"0.875rem",borderRadius:"1rem",
          fontSize:"0.9375rem",fontWeight:700,cursor:"pointer",
          background:"#3B82F6",color:"#fff",border:"none",
          boxSizing:"border-box",minHeight:"52px"
        }}>{t.onboardingNext} →</button>
      </div>

      {/* Step dots */}
      <div style={{display:"flex",justifyContent:"center",
        gap:"0.5rem",paddingTop:"1.25rem"}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{width:i===1?16:6,height:6,
            borderRadius:"9999px",
            background:i===1?"#3B82F6":dark?"#2D3F55":"#E2E8F0"}}/>
        ))}
      </div>

      {/* Info modal — centered overlay */}
      {openCat&&(
        <div
          onClick={()=>setOpenId(null)}
          style={{
            position:"fixed",inset:0,zIndex:200,
            display:"flex",alignItems:"center",justifyContent:"center",
            padding:"1.5rem",
            background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)"
          }}>
          <div
            onClick={e=>e.stopPropagation()}
            style={{
              width:"100%",maxWidth:"360px",
              borderRadius:"1.5rem",padding:"1.5rem",
              background:dark?"#1A2332":"#ffffff",
              border:`2px solid ${openCat.color}60`,
              boxSizing:"border-box"
            }}>
            {/* Header */}
            <div style={{display:"flex",alignItems:"center",
              gap:"0.75rem",marginBottom:"1rem"}}>
              <div style={{
                width:"3rem",height:"3rem",borderRadius:"0.875rem",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:"1.5rem",background:openCat.color+"22",flexShrink:0
              }}>{openCat.emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:"0.6875rem",fontWeight:700,
                  color:openCat.color,marginBottom:"0.125rem",
                  letterSpacing:"0.05em"}}>{openCat.section}</div>
                <div style={{fontSize:"1rem",fontWeight:700,
                  color:dark?"#E2E8F0":"#1E293B"}}>{openCat.label}</div>
              </div>
            </div>
            {/* Info text */}
            <p style={{fontSize:"0.875rem",lineHeight:1.65,
              color:dark?"#94A3B8":"#64748B",margin:"0 0 1.25rem 0"}}>
              {openCat.info}
            </p>
            {/* Close button */}
            <button type="button" onClick={()=>setOpenId(null)} style={{
              display:"block",width:"100%",padding:"0.875rem",
              borderRadius:"1rem",fontSize:"0.9375rem",fontWeight:700,
              border:"none",cursor:"pointer",
              background:openCat.color+"22",color:openCat.color,
              boxSizing:"border-box",minHeight:"52px"
            }}>{t.infoClose||"Selvä, kiitos!"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function OnboardingView({dark, t, CATS, onComplete, onLang}) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const bg = dark ? "#0F1826" : "#F0F4F8";
  const card = dark ? "#1A2332" : "#FFFFFF";
  const border = dark ? "#2D3F55" : "#E8EEF4";
  const text = dark ? "#E2E8F0" : "#1E293B";
  const muted = "#94A3B8";

  const steps = [
    // Step -1 (index 0) — Language selection
    <div key="lang" style={{overflowY:"auto",padding:"2rem 1.5rem",boxSizing:"border-box"}}>
      <div style={{textAlign:"center",marginBottom:"2.5rem",paddingTop:"2rem"}}>
        <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🌍</div>
        <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#E2E8F0",margin:"0 0 0.75rem 0"}}>Lumen Ascent</h1>
        <p style={{fontSize:"0.875rem",color:"#94A3B8",margin:0}}>{"Valitse kieli / Choose your language"}</p>
      </div>
      <button type="button" onClick={()=>{onLang("fi");setStep(1);}} style={{
        display:"block",width:"100%",padding:"1.125rem",borderRadius:"1rem",
        fontSize:"1rem",fontWeight:700,border:"2px solid #2D3F55",cursor:"pointer",
        background:"#1A2332",color:"#E2E8F0",marginBottom:"0.75rem",
        boxSizing:"border-box",minHeight:"56px",textAlign:"left",
        display:"flex",alignItems:"center",gap:"0.875rem"
      }}>
        <span style={{fontSize:"1.5rem"}}>🇫🇮</span>
        <div><div style={{fontWeight:700}}>Suomi</div><div style={{fontSize:"0.8125rem",color:"#94A3B8",fontWeight:400}}>Finnish</div></div>
      </button>
      <button type="button" onClick={()=>{onLang("en");setStep(1);}} style={{
        display:"block",width:"100%",padding:"1.125rem",borderRadius:"1rem",
        fontSize:"1rem",fontWeight:700,border:"2px solid #2D3F55",cursor:"pointer",
        background:"#1A2332",color:"#E2E8F0",marginBottom:"2rem",
        boxSizing:"border-box",minHeight:"56px",textAlign:"left",
        display:"flex",alignItems:"center",gap:"0.875rem"
      }}>
        <span style={{fontSize:"1.5rem"}}>🇬🇧</span>
        <div><div style={{fontWeight:700}}>English</div><div style={{fontSize:"0.8125rem",color:"#94A3B8",fontWeight:400}}>Englanti</div></div>
      </button>
      <div style={{display:"flex",justifyContent:"center",gap:"0.5rem"}}>
        {[0,1,2,3].map(i=><div key={i} style={{width:i===0?16:6,height:6,borderRadius:"9999px",background:i===0?"#3B82F6":"#2D3F55"}}/>)}
      </div>
    </div>,

    // Step 1 — Welcome + name
    <div key="0" style={{overflowY:"auto",padding:"2rem 1.5rem",boxSizing:"border-box"}}>
      <div style={{textAlign:"center",marginBottom:"2rem",paddingTop:"1rem"}}>
        <div style={{fontSize:"3rem",marginBottom:"1rem"}}>✦</div>
        <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#E2E8F0",margin:"0 0 0.5rem 0"}}>Lumen Ascent</h1>
        <p style={{fontSize:"1rem",fontWeight:600,color:"#3B82F6",margin:"0 0 1.5rem 0"}}>{t.onboardingSlogan}</p>
        <p style={{fontSize:"0.875rem",lineHeight:1.6,color:"#94A3B8",margin:0}}>{t.ob1Sub}</p>
      </div>
      <p style={{fontSize:"0.75rem",fontWeight:700,letterSpacing:"0.05em",color:"#94A3B8",marginBottom:"0.5rem"}}>
        {t.onboardingNameQ.toUpperCase()}
      </p>
      <input
        value={name}
        onChange={e=>setName(e.target.value)}
        placeholder={t.onboardingNamePlaceholder}
        autoFocus
        style={{
          display:"block",width:"100%",padding:"1rem",
          borderRadius:"1rem",fontSize:"1rem",fontWeight:600,
          textAlign:"center",outline:"none",boxSizing:"border-box",
          background:"#1A2332",border:"1.5px solid #3B82F6",
          color:"#E2E8F0",marginBottom:"1rem"
        }}
      />
      <button type="button" onClick={()=>setStep(1)} style={{
        display:"block",width:"100%",padding:"1rem",
        borderRadius:"1rem",fontSize:"1rem",fontWeight:700,
        border:"none",cursor:"pointer",
        background:"#3B82F6",color:"#ffffff",
        WebkitTextFillColor:"#ffffff",
        marginBottom:"1rem",boxSizing:"border-box",
        minHeight:"52px",lineHeight:"1.5"
      }}>
        <span style={{color:"#ffffff",WebkitTextFillColor:"#ffffff",fontWeight:700,fontSize:"1rem"}}>
          {name.trim() ? (t.onboardingNext||"Jatka") : (t.onboardingSkip||"Ohita")}
        </span>
      </button>
      {name.trim()&&<button type="button" onClick={()=>setStep(1)} style={{
        display:"block",width:"100%",padding:"0.875rem",
        borderRadius:"1rem",fontSize:"0.9375rem",fontWeight:600,
        border:"none",cursor:"pointer",
        background:"#2D3F55",color:"#E2E8F0",
        marginBottom:"1rem",boxSizing:"border-box",
        minHeight:"48px",lineHeight:"1.5"
      }}>{t.onboardingSkip||"Ohita"}</button>}
      <div style={{display:"flex",justifyContent:"center",gap:"0.5rem",paddingTop:"1rem",paddingBottom:"1rem"}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{width:i===0?16:6,height:6,borderRadius:"9999px",
            background:i===0?"#3B82F6":"#2D3F55"}}/>
        ))}
      </div>
    </div>,

        // Step 1 — PERMA+4 (rendered as separate component to support useState)
    <PermaStep key="1" dark={dark} t={t} CATS={CATS} card={card} border={border} muted={muted} text={text}
      onBack={()=>setStep(0)} onNext={()=>setStep(2)}/>,

    // Step 2 — How it works
    <div key="2" className="flex flex-col min-h-screen px-6 pt-16 pb-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black mb-3" style={{color:text}}>{t.ob3Title}</h2>
      </div>
      <div className="flex-1">
        {[
          {emoji:"📔", text:t.ob3Step1, color:"#3B82F6"},
          {emoji:"📊", text:t.ob3Step2, color:"#10B981"},
          {emoji:"🎯", text:t.ob3Step3, color:"#8B5CF6"},
        ].map((step,i)=>(
          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl mb-3"
            style={{background:card,border:`1px solid ${step.color}30`}}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{background:step.color+"20"}}>{step.emoji}</div>
            <p className="text-sm font-medium" style={{color:text}}>{step.text}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-8">
        <button type="button" onClick={()=>setStep(1)}
          className="px-4 py-3 rounded-2xl text-sm font-semibold"
          style={{background:card,color:muted}}>←</button>
        <button type="button" onClick={()=>onComplete(name.trim())}
          className="flex-1 py-4 rounded-2xl font-bold text-base"
          style={{background:"#3B82F6",color:"#fff",boxShadow:"0 4px 20px #3B82F650"}}>
          {t.onboardingStart} {name.trim()?""+name+" ":""}
        </button>
      </div>
      {/* Step dots */}
      <div className="flex justify-center gap-2 mt-4">
        {[0,1,2].map(i=><div key={i} className="rounded-full" style={{width:i===2?16:6,height:6,background:i===2?"#3B82F6":dark?"#2D3F55":"#E2E8F0",transition:"all 0.3s"}}/>)}
      </div>
    </div>
  ];

  return(
    <div className="fixed inset-0 z-[80]" style={{background:"#0F1826",overflowY:"auto"}}>
      {steps[step]}
    </div>
  );
}


// ── Daily Welcome View ────────────────────────────────────────────────────────
function DailyWelcomeView({dark, t, CATS, lang, userName, onContinue}) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t.greetingMorning(userName)
    : hour < 18 ? t.greetingDay(userName)
    : t.greetingEvening(userName);
  const insight = getTodaysInsight(lang);
  const insightCat = insight?.catId ? CATS.find(c=>c.id===insight.catId) : null;
  const question = insight ? getTodaysQuestion(insight) : "";

  const bg = dark?"#0F1826":"#F0F4F8";
  const card = dark?"#1A2332":"#FFFFFF";
  const border = dark?"#2D3F55":"#E8EEF4";
  const text = dark?"#E2E8F0":"#1E293B";
  const muted = "#94A3B8";

  return(
    <div className="fixed inset-0 z-[75]" style={{background:bg,overflowY:"auto"}}>
      <div style={{maxWidth:"420px",margin:"0 auto",padding:"3rem 1.5rem 2rem",
        boxSizing:"border-box",minHeight:"100vh",
        display:"flex",flexDirection:"column",justifyContent:"center"}}>

        {/* Greeting */}
        <div style={{textAlign:"center",marginBottom:"2rem"}}>
          <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>
            {hour<12?"🌅":hour<18?"☀️":"🌙"}
          </div>
          <h1 style={{fontSize:"1.75rem",fontWeight:900,color:text,
            margin:"0 0 0.5rem 0",lineHeight:1.2}}>{greeting}</h1>
        </div>

        {/* Today's insight */}
        {insight&&(
          <div style={{
            borderRadius:"1.25rem",padding:"1.25rem",marginBottom:"2rem",
            background:insightCat?insightCat.color+"18":card,
            border:`1.5px solid ${insightCat?insightCat.color+"40":border}`
          }}>
            <div style={{display:"flex",alignItems:"center",gap:"0.5rem",
              marginBottom:"0.75rem"}}>
              {insightCat&&<span style={{fontSize:"1.125rem"}}>{insightCat.emoji}</span>}
              <span style={{fontSize:"0.6875rem",fontWeight:700,
                letterSpacing:"0.05em",color:insightCat?.color||muted}}>
                {t.homeTodayInsight}
              </span>
            </div>
            <p style={{fontSize:"0.875rem",lineHeight:1.65,
              color:text,fontStyle:"italic",margin:"0 0 1rem 0"}}>
              "{insight.quote}"
            </p>
            <div style={{
              borderRadius:"0.875rem",padding:"0.875rem",
              background:dark?"rgba(0,0,0,0.25)":"rgba(255,255,255,0.8)"
            }}>
              <p style={{fontSize:"0.75rem",fontWeight:700,
                color:insightCat?.color||"#3B82F6",margin:"0 0 0.375rem 0"}}>
                🤔 {t.reflectQ||"Pohdi tätä"}
              </p>
              <p style={{fontSize:"0.875rem",color:text,margin:0,lineHeight:1.5}}>
                {question}
              </p>
            </div>
          </div>
        )}

        {/* Continue button */}
        <button type="button" onClick={onContinue} style={{
          display:"block",width:"100%",padding:"1rem",
          borderRadius:"1rem",fontSize:"1rem",fontWeight:700,
          border:"none",cursor:"pointer",
          background:"#3B82F6",color:"#ffffff",
          boxSizing:"border-box",minHeight:"56px",
          boxShadow:"0 4px 20px rgba(59,130,246,0.4)"
        }}>
          {t.dailyContinue||"Aloitetaan →"}
        </button>

      </div>
    </div>
  );
}

// ── Home View ─────────────────────────────────────────────────────────────────
function HomeView({data, dark, t, CATS, lang, userName, onNavigate}) {
  const diary = data.diary || {};
  const today = todayStr();
  const todayEntry = diary[today];
  const diaryDone = !!(todayEntry?.text || Object.keys(todayEntry?.scores||{}).length > 0);
  const streak = calcStreak(diary);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? t.greetingMorning(userName) : hour < 18 ? t.greetingDay(userName) : t.greetingEvening(userName);

  const insight = getTodaysInsight(lang);
  const insightCat = insight?.catId ? CATS.find(c=>c.id===insight.catId) : null;

  const card = dark?"#1A2332":"#FFFFFF", border = dark?"#2D3F55":"#E8EEF4";
  const text = dark?"#E2E8F0":"#1E293B", muted = "#94A3B8", sub = dark?"#1E2A3B":"#F8FAFC";

  const quickLinks = [
    {id:"calendar", icon:"📅", label:t.calendar, color:"#3B82F6"},
    {id:"stats", icon:"📊", label:t.stats, color:"#10B981"},
    {id:"growth", icon:"🌱", label:t.growth, color:"#8B5CF6"},
  ];

  return(<div className="pb-6">
    {/* Greeting */}
    <div className="mb-5">
      <h1 className="text-2xl font-black mb-1" style={{color:text}}>{greeting}</h1>
      {streak>0&&<div className="flex items-center gap-2">
        <span className="text-sm">{streak>=30?"🔥":streak>=14?"⚡":streak>=7?"✨":"🌱"}</span>
        <span className="text-sm font-semibold" style={{color:"#F59E0B"}}>{t.streakLabel(streak)}</span>
      </div>}
    </div>

    {/* Main CTA — only shown when day NOT done */}
    {!diaryDone&&<div className="rounded-2xl p-5 mb-4"
      style={{background:"linear-gradient(135deg,#3B82F620,#8B5CF615)",
      border:`1.5px solid #3B82F650`}}>
      <p className="text-sm mb-4" style={{color:muted}}>
        {hour<12?t.homePromptMorning:hour<18?t.homePromptDay:t.homePromptEvening}
      </p>
      <button type="button" onClick={()=>onNavigate("diary")}
        className="w-full py-4 rounded-2xl font-bold text-base"
        style={{background:"#3B82F6",color:"#fff",boxShadow:"0 4px 20px #3B82F640"}}>
        {t.homeStartDay}
      </button>
    </div>}

    {/* Active plan cards with navigation */}
    {(()=>{
      const plans = (data.actionPlans||[]).filter(p=>!p.completed);
      if(!plans.length) return null;
      const [planIdx, setPlanIdx] = [
        window.__homePlanIdx||0,
        (i)=>{ window.__homePlanIdx=i; }
      ];
      const safeIdx = Math.min(planIdx, plans.length-1);
      const active = plans[safeIdx];
      const done = active.steps.filter(s=>s.done).length;
      const total = active.steps.length;
      const pct = total>0?(done/total)*100:0;

      const toggleStep = (stepIdx) => {
        const updated = (data.actionPlans||[]).map(p=>{
          if(p.id!==active.id) return p;
          const ns=[...p.steps];
          ns[stepIdx]={...ns[stepIdx],done:!ns[stepIdx].done};
          return {...p,steps:ns,completed:ns.every(s=>s.done)};
        });
        onData({...data,actionPlans:updated});
      };

      return(
        <div className="rounded-2xl p-4 mb-4"
          style={{background:active.catColor+"18",border:`1.5px solid ${active.catColor}40`}}>
          {/* Header with nav */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{active.catEmoji}</span>
              <span className="text-sm font-semibold" style={{color:text}}>{active.catLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{background:active.catColor+"25",color:active.catColor}}>
                {done}/{total}
              </span>
              {plans.length>1&&<div className="flex gap-1">
                <button type="button" onClick={()=>{ window.__homePlanIdx=((safeIdx-1+plans.length)%plans.length); onData({...data}); }}
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                  style={{background:active.catColor+"30",color:active.catColor}}>‹</button>
                <button type="button" onClick={()=>{ window.__homePlanIdx=((safeIdx+1)%plans.length); onData({...data}); }}
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                  style={{background:active.catColor+"30",color:active.catColor}}>›</button>
              </div>}
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 rounded-full mb-3" style={{background:dark?"#2D3F55":"#E8EEF4"}}>
            <div className="h-full rounded-full transition-all"
              style={{width:`${pct}%`,background:active.catColor}}/>
          </div>
          {/* Steps as checkboxes */}
          {active.steps.map((step,i)=>(
            <button key={i} type="button" onClick={()=>toggleStep(i)}
              className="w-full flex items-center gap-2.5 py-1.5 text-left">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{background:step.done?active.catColor:"transparent",
                border:`2px solid ${step.done?active.catColor:dark?"#2D3F55":"#CBD5E1"}`}}>
                {step.done&&<span style={{color:"#fff",fontSize:"0.6rem",fontWeight:700}}>✓</span>}
              </div>
              <span className="text-xs" style={{
                color:step.done?muted:text,
                textDecoration:step.done?"line-through":"none"}}>{step.text}</span>
            </button>
          ))}
          {plans.length>1&&<p className="text-xs mt-2 text-center" style={{color:muted}}>
            {safeIdx+1} / {plans.length} {t.homePlanOf}
          </p>}
        </div>
      );
    })()}

    {/* Quick links */}
    <p className="text-xs font-bold tracking-wider mb-3" style={{color:muted}}>{t.homeQuickLinks}</p>
    <div className="grid grid-cols-3 gap-2 mb-4">
      {quickLinks.map(link=>(
        <button key={link.id} type="button" onClick={()=>onNavigate(link.id)}
          className="rounded-2xl p-4 flex flex-col items-center gap-2"
          style={{background:card,border:`1px solid ${border}`}}>
          <span className="text-2xl">{link.icon}</span>
          <span className="text-xs font-semibold" style={{color:text}}>{link.label}</span>
        </button>
      ))}
    </div>

    {/* Day done indicator — below quick links, only when done */}
    {diaryDone&&<button type="button" onClick={()=>onNavigate("diary")}
      className="w-full flex items-center gap-3 p-3 rounded-2xl mb-4"
      style={{background:dark?"#10B98112":"#F0FDF4",border:"1px solid #10B98130"}}>
      <div className="flex items-end gap-0.5 h-6 flex-1">
        {CATS.map(c=>{
          const score=todayEntry?.scores?.[c.id]||0;
          return score>0
            ?<div key={c.id} className="flex-1 rounded-sm" style={{background:c.color,height:`${(score/10)*100}%`,opacity:0.85}}/>
            :<div key={c.id} className="flex-1 rounded-sm" style={{background:dark?"#2D3F55":"#E2E8F0",height:"15%"}}/>;
        })}
      </div>
      <span className="text-xs font-semibold shrink-0" style={{color:"#10B981"}}>✓ {t.homeDayDone}</span>
      <span className="text-xs shrink-0" style={{color:muted}}>{t.homeAddMore} ›</span>
    </button>}

    {/* Today's insight — below quick links */}
    {insight&&<div className="rounded-2xl p-4 mb-4"
      style={{background:insightCat?insightCat.color+"15":sub,border:`1px solid ${insightCat?insightCat.color+"30":border}`}}>
      <div className="flex items-center gap-2 mb-2">
        {insightCat&&<span>{insightCat.emoji}</span>}
        <p className="text-xs font-bold tracking-wider" style={{color:insightCat?.color||muted}}>{t.homeTodayInsight}</p>
      </div>
      <p className="text-xs leading-relaxed italic mb-2" style={{color:text}}>
        "{insight.quote}"
      </p>
      <button type="button" onClick={()=>onNavigate("growth")}
        className="text-xs font-semibold" style={{color:"#3B82F6"}}>
        {t.homeReadMore||"Lue lisää →"}
      </button>
    </div>}
  </div>);
}

// ── Stats View ────────────────────────────────────────────────────────────────
function StatsView({data,dark,t,CATS,showInfoIcons}){
  const diary=data.diary||{},events=data.events||{};
  const dates=Object.keys(diary).sort().slice(-30);
  const streak=calcStreak(diary);
  const card=dark?"#1A2332":"#FFFFFF",border=dark?"#2D3F55":"#E8EEF4";
  const textC=dark?"#E2E8F0":"#1E293B",muted="#94A3B8";
  if(dates.length<2)return(<div className="flex flex-col items-center justify-center py-16 text-center px-4"><div className="text-5xl mb-4">📊</div><p className="font-bold mb-2" style={{color:textC}}>{t.noData}</p><p className="text-sm" style={{color:muted}}>{t.noDataSub}</p></div>);
  const avgScore=(catId)=>{const vs=dates.map(d=>diary[d]?.scores?.[catId]||0).filter(v=>v>0);return vs.length?(vs.reduce((a,b)=>a+b,0)/vs.length):0;};
  const tagImpact=(catId)=>{
    const tagDays=new Set();Object.values(events).forEach(ev=>{if((ev.tags||[]).includes(catId))tagDays.add(ev.date);});
    const w=dates.filter(d=>tagDays.has(d)).map(d=>diary[d]?.scores?.[catId]||0).filter(v=>v>0);
    const wo=dates.filter(d=>!tagDays.has(d)).map(d=>diary[d]?.scores?.[catId]||0).filter(v=>v>0);
    return{avgWith:w.length?(w.reduce((a,b)=>a+b,0)/w.length):null,avgWithout:wo.length?(wo.reduce((a,b)=>a+b,0)/wo.length):null,tagCount:tagDays.size};
  };
  const sorted=[...CATS].map(c=>({...c,avg:avgScore(c.id)})).sort((a,b)=>b.avg-a.avg);
  return(<div className="pb-4">
    <div className="rounded-2xl p-4 mb-4 flex items-center gap-4" style={{background:dark?"linear-gradient(135deg,#1E2A3B,#2D1F0A)":"linear-gradient(135deg,#FFFBEB,#FEF3C7)",border:`1px solid ${dark?"#F59E0B30":"#F59E0B50"}`}}>
      <div className="text-4xl">{streak>=30?"🔥":streak>=14?"⚡":streak>=7?"✨":"🌱"}</div>
      <div><div className="text-lg font-black leading-tight" style={{color:"#F59E0B"}}>{t.streakLabel(streak)}</div><div className="text-xs mt-0.5" style={{color:muted}}>{t.streakMsg(streak)}</div></div>
    </div>
    <BestWeekCard diary={diary} CATS={CATS} dark={dark} t={t}/>
    <TrendChart diary={diary} CATS={CATS} dark={dark} t={t} showInfoIcons={showInfoIcons}/>
    <p className="text-xs font-bold tracking-wider mb-4" style={{color:muted}}>{t.avgLast} {dates.length} {t.avgDays}</p>
    <div className="rounded-2xl p-5 mb-4" style={{background:card,border:`1px solid ${border}`}}>
      {sorted.map((c,i)=>(<div key={c.id} className="flex items-center gap-3 mb-3">
        <span className="w-6 text-center">{c.emoji}</span>
        <div className="flex-1"><div className="flex justify-between mb-1"><span className="text-xs font-medium" style={{color:textC}}>{c.label}</span><span className="text-xs font-bold" style={{color:c.color}}>{c.avg>0?c.avg.toFixed(1):"–"}</span></div><div className="h-2 rounded-full" style={{background:dark?"#2D3F55":"#EEF2F7"}}><div className="h-full rounded-full" style={{width:`${(c.avg/10)*100}%`,background:c.color}}/></div></div>
        <InfoBtn cat={c} dark={dark} t={t} showInfoIcons={showInfoIcons}/>
        {i===0&&<span style={{color:c.color,fontSize:"0.7rem"}}>↑</span>}
      </div>))}
    </div>
    <p className="text-xs font-bold tracking-wider mb-4" style={{color:muted}}>{t.tagImpact}</p>
    {CATS.map(c=>{const{avgWith,avgWithout,tagCount}=tagImpact(c.id);if(!avgWith||!avgWithout||!tagCount)return null;const diff=avgWith-avgWithout,pos=diff>0;
      return(<div key={c.id} className="rounded-2xl p-4 mb-3" style={{background:card,border:`1px solid ${border}`}}><div className="flex items-center gap-2 mb-2"><span>{c.emoji}</span><span className="text-sm font-semibold" style={{color:textC}}>{c.label}</span><span className="ml-auto text-xs px-2 py-0.5 rounded-full font-bold" style={{background:pos?"#10B98120":"#EF444420",color:pos?"#10B981":"#EF4444"}}>{pos?"+":""}{diff.toFixed(1)}</span></div><p className="text-xs leading-relaxed" style={{color:muted}}>{t.tagMsg(c.label.toLowerCase(),avgWith.toFixed(1),avgWithout.toFixed(1))}{pos?t.tagPositive:t.tagNeutral}</p></div>);
    })}
    {CATS.every(c=>!tagImpact(c.id).tagCount)&&<div className="text-center py-8" style={{color:muted}}><div className="text-3xl mb-2">🔗</div><p className="text-sm">{t.noTagData}</p></div>}
  </div>);
}

// ── Settings View ─────────────────────────────────────────────────────────────
function SettingsView({dark,setDark,lang,setLang,reminderSettings,setReminderSettings,data,CATS,t,showInfoIcons,setShowInfoIcons}){
  // All toggle state stored in refs — zero re-renders on toggle
  const getReminder = () => { try{ return JSON.parse(localStorage.getItem("perma_reminder")||"{}"); }catch{ return {}; } };
  const enabledRef = useRef(getReminder().enabled||false);
  const weekRef = useRef(getReminder().weekSummary||false);
  const hourRef = useRef(getReminder().hour??21);
  const minuteRef = useRef(getReminder().minute??0);
  const permStatus = "Notification" in window ? Notification.permission : "unsupported";

  const [saved, setSaved] = useState(false);
  // Local display state for TimePicker only — does NOT cause parent scroll jump
  const [displayHour, setDisplayHour] = useState(hourRef.current);
  const [displayMinute, setDisplayMinute] = useState(minuteRef.current);
  const card=dark?"#1A2332":"#FFFFFF", border=dark?"#2D3F55":"#E8EEF4";
  const textC=dark?"#E2E8F0":"#1E293B", muted="#94A3B8", bg=dark?"#0F1826":"#F8FAFC";

  const saveToStorage = () => {
    const s = {enabled:enabledRef.current, hour:hourRef.current, minute:minuteRef.current, weekSummary:weekRef.current};
    localStorage.setItem("perma_reminder", JSON.stringify(s));
    return s;
  };

  const handleSave = () => {
    const s = saveToStorage();
    setReminderSettings(s);
    setSaved(true);
    setTimeout(()=>setSaved(false), 2000);
  };

  // DOM-only toggle — no React state, no re-render
  const DomToggle = ({refVal, id, onChange}) => {
    const btnRef = useRef(null);
    const knobRef = useRef(null);
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      refVal.current = !refVal.current;
      const on = refVal.current;
      if(btnRef.current) btnRef.current.style.background = on?"#3B82F6":(dark?"#2D3F55":"#E2E8F0");
      if(knobRef.current) knobRef.current.style.left = on?"calc(100% - 22px)":"2px";
      saveToStorage();
      if(onChange) onChange(on);
    };
    return (
      <button ref={btnRef} type="button" onClick={handleClick}
        className="w-12 h-6 rounded-full relative transition-colors flex-shrink-0"
        style={{background:refVal.current?"#3B82F6":(dark?"#2D3F55":"#E2E8F0")}}>
        <div ref={knobRef} className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow"
          style={{left:refVal.current?"calc(100% - 22px)":"2px",transition:"left 0.2s"}}/>
      </button>
    );
  };

  const Row=({label,sub,right,last})=>(
    <div className="flex items-center justify-between px-4 py-3.5"
      style={{borderBottom:last?"none":`1px solid ${dark?"#1E2A3B":"#F1F5F9"}`}}>
      <div style={{flex:1,marginRight:12}}>
        <div className="text-sm font-medium" style={{color:textC}}>{label}</div>
        {sub&&<div className="text-xs mt-0.5" style={{color:muted}}>{sub}</div>}
      </div>
      {right}
    </div>
  );
  const Section=({title,children})=>(
    <div className="rounded-2xl mb-4 overflow-hidden" style={{background:card,border:`1px solid ${border}`}}>
      <div className="px-4 pt-4 pb-1"><p className="text-xs font-bold tracking-wider" style={{color:muted}}>{title}</p></div>
      {children}
    </div>
  );

  return(<div className="pb-6">
    <Section title={t.sectionAppearance}>
      <Row label={t.themeLabel(dark)} sub={t.themeSub(dark)}
        right={<DomToggle refVal={{current:dark}} onChange={v=>setDark(v)}/>}/>
      <div className="px-4 py-3.5" style={{borderBottom:`1px solid ${dark?"#1E2A3B":"#F1F5F9"}`}}>
        <div className="text-sm font-medium mb-3" style={{color:textC}}>{t.language}</div>
        <div className="flex gap-2">
          {[{id:"fi",l:"🇫🇮 Suomi"},{id:"en",l:"🇬🇧 English"}].map(l=>(
            <button type="button" key={l.id} onClick={()=>setLang(l.id)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
              style={{background:lang===l.id?"#3B82F620":bg,border:`1.5px solid ${lang===l.id?"#3B82F6":border}`,color:lang===l.id?"#3B82F6":muted}}>
              {l.l}
            </button>
          ))}
        </div>
      </div>
      <Row label={t.showInfoIcons}
        right={<DomToggle refVal={{current:showInfoIcons}} onChange={v=>setShowInfoIcons(v)}/>} last/>
    </Section>

    <Section title={t.sectionReminders}>
      <Row label={t.reminderTitle} sub={t.reminderSub}
        right={<DomToggle refVal={enabledRef}/>}/>
      <div className="px-4 py-3.5" style={{borderBottom:`1px solid ${dark?"#1E2A3B":"#F1F5F9"}`,opacity:0.99}}>
        <div className="text-xs font-bold tracking-wider mb-2" style={{color:muted}}>{t.reminderTime}</div>
        <TimePicker
          value={`${String(displayHour).padStart(2,"0")}:${String(displayMinute).padStart(2,"0")}`}
          onChange={v=>{
            const[h,m]=v.split(":");
            hourRef.current=+h; minuteRef.current=+m;
            setDisplayHour(+h); setDisplayMinute(+m);
            saveToStorage();
          }} dark={dark} muted={muted}/>
      </div>
      <div className="px-4 py-3" style={{borderBottom:`1px solid ${dark?"#1E2A3B":"#F1F5F9"}`}}>
        {permStatus==="unsupported"&&<div className="p-3 rounded-xl flex items-center gap-2" style={{background:"#3B82F618",border:"1px solid #3B82F630"}}>
          <span style={{color:"#3B82F6"}}>🔔</span>
          <div><div className="text-xs font-semibold" style={{color:"#3B82F6"}}>{t.inAppReminder}</div>
          <div className="text-xs mt-0.5" style={{color:muted}}>{t.inAppReminderSub(hourRef.current,minuteRef.current)}</div></div>
        </div>}
        {permStatus==="denied"&&<div className="p-3 rounded-xl" style={{background:"#EF444418",border:"1px solid #EF444430"}}>
          <p className="text-xs" style={{color:"#EF4444"}}>{t.permDenied}</p></div>}
        {permStatus==="default"&&<div className="p-3 rounded-xl" style={{background:"#F9731618",border:"1px solid #F9731630"}}>
          <p className="text-xs mb-2" style={{color:"#F97316"}}>{t.permDefault}</p>
          <button type="button" onClick={()=>Notification.requestPermission()} className="w-full py-2 rounded-lg text-xs font-bold" style={{background:"#F97316",color:"#fff"}}>{t.permAllow}</button>
        </div>}
        {permStatus==="granted"&&<div className="p-2 rounded-xl flex items-center gap-2" style={{background:"#10B98118"}}>
          <span style={{color:"#10B981"}}>✓</span><span className="text-xs" style={{color:"#10B981"}}>{t.permGranted}</span>
        </div>}
      </div>
      <Row label={t.weekSummary} right={<DomToggle refVal={weekRef}/>} last/>
    </Section>

    <Section title={t.sectionData}>
      <div className="px-4 py-3.5">
        <div className="text-sm font-medium mb-1" style={{color:textC}}>{t.exportData}</div>
        <div className="text-xs mb-3" style={{color:muted}}>{Object.keys(data.diary||{}).length} {t.diaryEntries} · {Object.keys(data.events||{}).length} {t.eventsCount}</div>
        <button type="button" onClick={()=>exportCSV(data,CATS)} className="w-full py-2.5 rounded-xl text-sm font-semibold"
          style={{background:"#3B82F618",color:"#3B82F6",border:"1px solid #3B82F630"}}>⬇ {t.exportBtn}</button>
      </div>
    </Section>
    <button type="button" onClick={handleSave} className="w-full py-4 rounded-2xl font-bold text-sm"
      style={{background:saved?"#10B981":"#3B82F6",color:"#fff"}}>
      {saved?t.savedSettings:t.reminderSave}
    </button>

    {/* Privacy */}
    <Section title={t.privacyTitle}>
      <div className="px-4 py-4">
        <p className="text-xs leading-relaxed mb-4" style={{color:muted}}>{t.privacyText}</p>
        <button type="button" onClick={()=>{
          if(window.confirm(t.deleteConfirm)){
            localStorage.removeItem(STORE_KEY);
            localStorage.removeItem("perma_reminder");
            localStorage.removeItem("perma_lang");
            localStorage.removeItem("perma_info");
            window.location.reload();
          }
        }} className="w-full py-2.5 rounded-xl text-sm font-semibold"
          style={{background:"#EF444415", color:"#EF4444", border:"1px solid #EF444430"}}>
          🗑 {t.deleteAllData}
        </button>
      </div>
    </Section>

    {/* About / Disclaimer */}
    <Section title={t.aboutApp}>
      <div className="px-4 py-4">
        <p className="text-xs leading-relaxed" style={{color:muted}}>{t.disclaimerText}</p>
      </div>
    </Section>

    <p className="text-xs text-center mt-2 mb-6" style={{color:muted,fontSize:"0.65rem"}}>Lumen Ascent · PERMA+4 · v1.0</p>
  </div>);
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({open,onClose,tab,setTab,dark,streak,t}){
  const nav=[{id:"home",icon:"🏠",l:t.home},{id:"calendar",icon:"📅",l:t.calendar},{id:"diary",icon:"✍️",l:t.diary},{id:"stats",icon:"📊",l:t.stats},{id:"growth",icon:"🌱",l:t.growth},{id:"settings",icon:"⚙️",l:t.settings}];
  const bg=dark?"#1A2332":"#FFFFFF",border=dark?"#2D3F55":"#E8EEF4";
  const text=dark?"#E2E8F0":"#1E293B",muted="#94A3B8";
  return(<>
    {open&&<div className="fixed inset-0 z-40" style={{background:"rgba(0,0,0,0.4)",backdropFilter:"blur(3px)"}} onClick={onClose}/>}
    <div className="fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 ease-out" style={{width:272,background:bg,borderRight:`1px solid ${border}`,transform:open?"translateX(0)":"translateX(-100%)"}}>
      <div className="flex-1 overflow-y-auto px-6 pt-14 pb-4">
        <div className="mb-8"><div className="font-black text-xl tracking-tight" style={{color:text}}>{t.appName}</div><div className="text-xs mt-0.5" style={{color:muted}}>{t.appSub}</div></div>
        {streak>0&&<div className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5" style={{background:dark?"#2D1F0A":"#FFFBEB",border:`1px solid ${dark?"#F59E0B30":"#F59E0B40"}`}}>
          <span className="text-2xl">{streak>=30?"🔥":streak>=14?"⚡":streak>=7?"✨":"🌱"}</span>
          <div><div className="font-black text-sm" style={{color:"#F59E0B"}}>{t.streakLabel(streak)}</div><div className="text-xs" style={{color:muted}}>{t.streakMsg(streak)}</div></div>
        </div>}
        {nav.map(n=><button key={n.id} onClick={()=>{setTab(n.id);onClose();}} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-2 text-left transition-all" style={{background:tab===n.id?"#3B82F618":"transparent",border:`1.5px solid ${tab===n.id?"#3B82F640":"transparent"}`,color:tab===n.id?"#3B82F6":text}}>
          <span className="text-xl">{n.icon}</span><span className="font-semibold text-sm">{n.l}</span>
          {tab===n.id&&<div className="ml-auto w-1.5 h-1.5 rounded-full" style={{background:"#3B82F6"}}/>}
        </button>)}
      </div>
      <div className="px-6 py-4" style={{borderTop:`1px solid ${border}`}}><p className="text-xs text-center" style={{color:muted}}>{t.dataStorage}</p></div>
    </div>
  </>);
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App(){
  const [dark,setDark]=useState(true);
  const [lang,setLang]=useState(()=>localStorage.getItem("perma_lang")||"fi");
  const [tab,setTab]=useState("home");
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [onboarded,setOnboarded]=useState(()=>!!localStorage.getItem("lumen_onboarded"));
  const [userName,setUserName]=useState(()=>localStorage.getItem("lumen_name")||"");
  const [showDailyWelcome,setShowDailyWelcome]=useState(()=>{
    const last=localStorage.getItem("lumen_last_welcome");
    const today=new Date().toDateString();
    return !!localStorage.getItem("lumen_onboarded") && last!==today;
  });
  const [data,setData]=useState(()=>load());
  const [confetti,setConfetti]=useState(false);
  const [showCrisis,setShowCrisis]=useState(false);
  const crisisShownRef=useRef(false);
  const [showInfoIcons,setShowInfoIcons]=useState(()=>localStorage.getItem("perma_info")!=="false");
  const [reminderSettings,setReminderSettings]=useState(()=>{try{return JSON.parse(localStorage.getItem("perma_reminder")||'{"enabled":false,"hour":21,"minute":0}');}catch{return{enabled:false,hour:21,minute:0};}});

  const notifTimer=useRef(null);
  const t=T[lang],CATS=CATS_DATA[lang];
  const streak=calcStreak(data.diary||{});
  const TABS=["home","calendar","diary","stats","growth","settings"];

  useEffect(()=>{localStorage.setItem("perma_lang",lang);},[lang]);
  useEffect(()=>{localStorage.setItem("perma_info",String(showInfoIcons));},[showInfoIcons]);
  useEffect(()=>{
    if(notifTimer.current)clearTimeout(notifTimer.current);
    if(reminderSettings.enabled&&Notification.permission==="granted")notifTimer.current=scheduleNotif(reminderSettings.hour,reminderSettings.minute,t);
    return()=>{if(notifTimer.current)clearTimeout(notifTimer.current);};
  },[reminderSettings]);


  const handleData=useCallback((d)=>{setData(d);save(d);},[]);
  const handleSaved=()=>{
    setConfetti(true);
    setTimeout(()=>setConfetti(false),2200);
    // Check crisis after save, show once per session
    if(!crisisShownRef.current && checkCrisis(data.diary||{})){
      setTimeout(()=>{ setShowCrisis(true); crisisShownRef.current=true; }, 2500);
    }
  };

  // Header-only swipe for tab navigation
  const headerSwipeStart=useRef(null);

  const onHeaderTouchStart=e=>{headerSwipeStart.current=e.touches[0].clientX;};
  const onHeaderTouchEnd=e=>{
    if(headerSwipeStart.current===null)return;
    const dx=e.changedTouches[0].clientX-headerSwipeStart.current;
    if(Math.abs(dx)>60){
      if(dx<0){const i=TABS.indexOf(tab);if(i<TABS.length-1)setTab(TABS[i+1]);}
      else{const i=TABS.indexOf(tab);if(i>0)setTab(TABS[i-1]);}
    }
    headerSwipeStart.current=null;
  };

  const bg=dark?"#0F1826":"#F0F4F8",text2=dark?"#E2E8F0":"#1E293B";
  const headerBg=dark?"rgba(15,24,38,0.96)":"rgba(240,244,248,0.96)",border=dark?"#1E2A3B":"#E2E8F0",muted="#94A3B8";
  const tabIcons={home:"🏠",calendar:"📅",diary:"✍️",stats:"📊",growth:"🌱",settings:"⚙️"};
  const tabLabels={home:t.home,calendar:t.calendar,diary:t.diary,stats:t.stats,growth:t.growth,settings:t.settings};

  return(<div className="min-h-screen" style={{background:bg,fontFamily:"'Inter',system-ui,sans-serif",color:text2}}>
    <style>{`
      *{box-sizing:border-box;}
      input[type=range]{-webkit-appearance:none;appearance:none;outline:none;}
      input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 6px rgba(0,0,0,0.3);cursor:pointer;}
      input[type=range]::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#fff;border:none;cursor:pointer;}
      input[type=date],input[type=time]{color-scheme:${dark?"dark":"light"};}
      input[type=date]::-webkit-calendar-picker-indicator,input[type=time]::-webkit-calendar-picker-indicator{${dark?"filter:invert(0.6) brightness(1.8);":""}cursor:pointer;}
      input[type=date]::-webkit-datetime-edit-text,input[type=date]::-webkit-datetime-edit-day-field,input[type=date]::-webkit-datetime-edit-month-field,input[type=date]::-webkit-datetime-edit-year-field,input[type=time]::-webkit-datetime-edit-text,input[type=time]::-webkit-datetime-edit-hour-field,input[type=time]::-webkit-datetime-edit-minute-field{${dark?"color:#CBD5E1;":""}}
      ::-webkit-scrollbar{display:none;} body{margin:0;}
      select{-webkit-appearance:none;appearance:none;}
      select option{background:${dark?"#1A2332":"#ffffff"};color:${dark?"#E2E8F0":"#1E293B"};}
    `}</style>
    <Confetti active={confetti}/>
    {!onboarded&&<OnboardingView dark={dark} t={t} CATS={CATS} onLang={(l)=>{setLang(l);localStorage.setItem("perma_lang",l);}} onComplete={(name)=>{localStorage.setItem("lumen_onboarded","1");if(name){localStorage.setItem("lumen_name",name);setUserName(name);}setOnboarded(true);setTab("home");}}/>}
    {onboarded&&showDailyWelcome&&<DailyWelcomeView dark={dark} t={t} CATS={CATS} lang={lang} userName={userName} onContinue={()=>{localStorage.setItem("lumen_last_welcome",new Date().toDateString());setShowDailyWelcome(false);setTab("home");}}/>}
    {showCrisis&&<CrisisModal dark={dark} t={t} onClose={()=>setShowCrisis(false)}/>}
    <Sidebar open={sidebarOpen} onClose={()=>setSidebarOpen(false)} tab={tab} setTab={setTab} dark={dark} streak={streak} t={t}/>

    {/* Header + content only shown after onboarding and daily welcome */}
    {onboarded&&!showDailyWelcome&&<>
    {/* Header — swipe here to change tabs */}
    <div className="fixed top-0 left-0 right-0 z-30" style={{background:headerBg,backdropFilter:"blur(14px)",borderBottom:`1px solid ${border}`}}
      onTouchStart={onHeaderTouchStart} onTouchEnd={onHeaderTouchEnd}>
      <div className="flex items-center justify-between px-4 max-w-md mx-auto" style={{paddingTop:"calc(0.75rem + env(safe-area-inset-top,0px))",paddingBottom:"0.75rem"}}>
        <button onClick={()=>setSidebarOpen(true)} className="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5" style={{background:dark?"#1E2A3B":"#FFFFFF",border:`1px solid ${border}`}}>
          <div className="w-4 h-0.5 rounded" style={{background:muted}}/><div className="w-4 h-0.5 rounded" style={{background:muted}}/><div className="w-4 h-0.5 rounded" style={{background:muted}}/>
        </button>
        <div className="flex items-center gap-2">
          {tab==="home"
            ? <div className="flex flex-col items-center leading-tight">
                <span className="font-black text-sm tracking-tight" style={{color:text2}}>Lumen Ascent</span>
                <span style={{fontSize:"0.6rem",color:"#3B82F6",fontWeight:600,letterSpacing:"0.04em"}}>Align With Purpose</span>
              </div>
            : <><span className="text-lg">{tabIcons[tab]}</span>
               <span className="font-bold text-sm" style={{color:text2}}>{tabLabels[tab]}</span></>
          }
          <StreakBadge streak={streak} t={t}/>
        </div>
        <button type="button" onClick={()=>setDark(d=>!d)} className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{background:dark?"#1E2A3B":"#FFFFFF",border:`1px solid ${border}`}}>{dark?"☀️":"🌙"}</button>
      </div>
    </div>

    {/* Content — each tab has its own persistent scroll container, never unmounted */}
    {["home","calendar","diary","stats","growth","settings"].map(t2=>(
      <div key={t2} style={{
        position:"fixed", top:"calc(3.5rem + env(safe-area-inset-top,0px))",
        left:0, right:0, bottom:0,
        overflowY: "auto", WebkitOverflowScrolling:"touch",
        display: tab===t2 ? "block" : "none",
      }}>
        <div className="px-4 pb-6 max-w-md mx-auto pt-4">
          {t2==="home"&&<HomeView data={data} dark={dark} t={t} CATS={CATS} lang={lang} userName={userName} onNavigate={setTab}/>}
          {t2==="calendar"&&<CalendarView data={data} onData={handleData} dark={dark} t={t} CATS={CATS} showInfoIcons={showInfoIcons}/>}
          {t2==="diary"&&<DiaryView data={data} onData={handleData} dark={dark} onSaved={handleSaved} t={t} CATS={CATS} showInfoIcons={showInfoIcons}/>}
          {t2==="stats"&&<StatsView data={data} dark={dark} t={t} CATS={CATS} showInfoIcons={showInfoIcons}/>}
          {t2==="growth"&&<GrowthView data={data} dark={dark} t={t} CATS={CATS} lang={lang}/>}
          {t2==="settings"&&<SettingsView dark={dark} setDark={setDark} lang={lang} setLang={setLang} reminderSettings={reminderSettings} setReminderSettings={setReminderSettings} data={data} CATS={CATS} t={t} showInfoIcons={showInfoIcons} setShowInfoIcons={setShowInfoIcons}/>}
        </div>
      </div>
    ))}
    </>}
  </div>);
}
