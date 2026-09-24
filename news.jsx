import React, { useState } from 'react';

type LangType = 'en' | 'fr' | 'ar';

// Database of articles with translations
const DATABASE: Record<string, any> = {
            'law-59-21': {
                image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop',
                en: {
                    title: 'Law 59.21: New mandatory contracts strip private institutions of unilateral financial authority',
                    meta: '2 hours ago • By Policy Desk',
                    content: `
                        <p class="text-xl text-white mb-6">The Moroccan private education sector has reached a profound inflection point. Historically serving as a niche alternative, it has metastasized into a systemic necessity. However, the contemporary landscape is experiencing a radical metamorphosis characterized by intense regulatory overhauls.</p>
                        <h3 class="text-2xl text-white mt-8 mb-4">The Mandatory Contract and Consumer Protection Framework</h3>
                        <p>In direct response to systemic failures and mounting societal pressure, the Ministry of National Education instituted revolutionary regulatory protocols via Law 59.21. The cornerstone of this regulatory overhaul is the mandatory, standardized annual contract between parents and private schools.</p>
                        <ul class="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-3 mt-4 text-gray-400">
                            <li><strong class="text-white">Strict Fee Transparency and Stabilization:</strong> Schools are legally obligated to permanently display all precise fees before the academic year commences.</li>
                            <li><strong class="text-white">Unbundling of Ancillary Services:</strong> Schools can no longer force parents to purchase textbooks, uniforms, or supplies directly from the institution.</li>
                            <li><strong class="text-white">Prohibition of Academic Hostage-Taking:</strong> The contract explicitly guarantees the student's fundamental right to receive their academic transcripts, regardless of any financial dispute.</li>
                        </ul>
                        <p class="mt-6">Sanctions for violating these new stipulations are severe, empowering the state to levy fines reaching up to 100,000 MAD per infraction.</p>
                    `
                },
                fr: {
                    title: 'Loi 59.21 : Les nouveaux contrats obligatoires privent les institutions privées de leur autorité financière unilatérale',
                    meta: 'Il y a 2 heures • Par le Bureau des Politiques',
                    content: `
                        <p class="text-xl text-white mb-6">Le secteur de l'enseignement privé marocain a atteint un point d'inflexion profond. L'environnement opérationnel est désormais défini par un cadre réglementaire strict via la Loi 59.21.</p>
                        <h3 class="text-2xl text-white mt-8 mb-4">Le contrat obligatoire et la protection des consommateurs</h3>
                        <p>Le ministère de l'Éducation nationale a institué des protocoles révolutionnaires. La pierre angulaire est le contrat annuel standardisé obligatoire entre les parents et les écoles privées.</p>
                        <ul class="list-disc pl-6 space-y-3 mt-4 text-gray-400">
                            <li><strong class="text-white">Transparence stricte des frais :</strong> Affichage obligatoire de tous les frais précis.</li>
                            <li><strong class="text-white">Dégroupage des services :</strong> Fin de l'obligation d'acheter les manuels à l'école.</li>
                        </ul>
                    `
                },
                ar: {
                    title: 'القانون 59.21: العقود الإلزامية الجديدة تجرد المؤسسات الخاصة من السلطة المالية الأحادية',
                    meta: 'منذ ساعتين • مكتب السياسات',
                    content: `
                        <p class="text-xl text-white mb-6">وصل قطاع التعليم الخاص المغربي إلى نقطة تحول عميقة. يشهد المشهد المعاصر تحولاً جذرياً يتميز بإصلاحات تنظيمية مكثفة.</p>
                        <h3 class="text-2xl text-white mt-8 mb-4">العقد الإلزامي وإطار حماية المستهلك</h3>
                        <p>استجابة للضغوط المجتمعية، أقرت وزارة التربية الوطنية بروتوكولات تنظيمية ثورية. حجر الزاوية في هذا الإصلاح هو العقد السنوي الموحد والإلزامي بين الآباء والمدارس الخاصة.</p>
                        <ul class="list-disc pr-6 space-y-3 mt-4 text-gray-400">
                            <li><strong class="text-white">شفافية الرسوم:</strong> المدارس ملزمة قانونًا بعرض جميع الرسوم الدقيقة.</li>
                            <li><strong class="text-white">حظر احتجاز النقط:</strong> يضمن العقد حق التلميذ في الحصول على بيانات النقط الخاصة به بغض النظر عن أي نزاع مالي.</li>
                        </ul>
                    `
                }
            },
            'conseil-concurrence': {
                image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop',
                en: {
                    title: 'Intervention of the Conseil de la Concurrence: Education cannot be treated as a commercial commodity',
                    meta: '4 hours ago • By Economic Reporter',
                    content: `<p class="text-xl text-white mb-6">Triggered by a request from the Chamber of Representatives, the Council's exhaustive analysis noted that the market was poorly regulated.</p><p>Crucially, the Council emphasized a fundamental philosophical shift: education cannot be treated as a purely commercial commodity. It is a vital social service governed by constitutional rights (Article 31 of the Moroccan Constitution), demanding a delicate balance between encouraging free enterprise and enforcing state standardization to prevent the exacerbation of deep socio-economic segregation.</p>`
                },
                fr: {
                    title: 'Intervention du Conseil de la Concurrence : L\'éducation ne peut être traitée comme une simple marchandise',
                    meta: 'Il y a 4 heures • Par le Reporter Économique',
                    content: `<p class="text-xl text-white mb-6">Le Conseil a souligné un changement philosophique fondamental : l'éducation ne peut être traitée comme une marchandise purement commerciale.</p><p>C'est un service social vital régi par des droits constitutionnels.</p>`
                },
                ar: {
                    title: 'تدخل مجلس المنافسة: لا يمكن معاملة التعليم كسلعة تجارية بحتة',
                    meta: 'منذ 4 ساعات • مراسل اقتصادي',
                    content: `<p class="text-xl text-white mb-6">أكد المجلس على تحول فلسفي أساسي: لا يمكن معاملة التعليم كسلعة تجارية بحتة.</p><p>إنه خدمة اجتماعية حيوية تحكمها الحقوق الدستورية.</p>`
                }
            },
            'tax-dilemma': {
                image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
                en: {
                    title: 'The "Double Taxation" Dilemma: Middle class parents demand fiscal relief for private tuition',
                    meta: '8 hours ago • By Financial Desk',
                    content: `<p class="text-xl text-white mb-6">A growing narrative among the Moroccan middle class is the concept of "double taxation."</p><p>Parents argue compellingly that by utilizing the private school system, they absorb the immense financial burden of educating their children, alleviating pressure from the state budget. Yet, they continue to pay full personal income tax (IR) which finances the public infrastructure they have abandoned. There are growing calls for targeted tax relief.</p>`
                },
                fr: {
                    title: 'Le dilemme de la "Double Imposition" : La classe moyenne exige un allégement fiscal',
                    meta: 'Il y a 8 heures • Par le Bureau Financier',
                    content: `<p class="text-xl text-white mb-6">Les parents affirment qu'en utilisant le système privé, ils soulagent le budget de l'État tout en payant l'intégralité de l'IR.</p>`
                },
                ar: {
                    title: 'معضلة "الازدواج الضريبي": الآباء يطالبون بإعفاءات ضريبية لرسوم التعليم الخاص',
                    meta: 'منذ 8 ساعات • المكتب المالي',
                    content: `<p class="text-xl text-white mb-6">يجادل الآباء بأنهم من خلال استخدام النظام الخاص، يخففون العبء عن ميزانية الدولة، ومع ذلك يستمرون في دفع ضريبة الدخل كاملة.</p>`
                }
            },
            'africa50-holged': {
                image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
                en: {
                    title: 'Africa50 injects 88.3 million MAD into Holged Group, driving pan-African expansion',
                    meta: '15 hours ago • By Investment Desk',
                    content: `<p class="text-xl text-white mb-6">The sector has transitioned into a highly structured asset class attracting international private equity.</p><p>Africa50 injected 88.3 million MAD into Holged, securing a 13% strategic minority stake. This capital is explicitly designed to fund aggressive continental expansion, signaling K-12 education in Africa is now viewed as critical, investable infrastructure.</p>`
                },
                fr: {
                    title: 'Africa50 injecte 88,3 millions de dirhams dans le groupe Holged pour une expansion panafricaine',
                    meta: 'Il y a 15 heures • Par le Bureau des Investissements',
                    content: `<p class="text-xl text-white mb-6">Africa50 a injecté 88,3 millions MAD dans Holged, garantissant une participation minoritaire stratégique de 13%.</p>`
                },
                ar: {
                    title: 'أفريكا 50 تضخ 88.3 مليون درهم في مجموعة هولجيد لدفع التوسع الأفريقي',
                    meta: 'منذ 15 ساعة • مكتب الاستثمار',
                    content: `<p class="text-xl text-white mb-6">ضخت أفريكا 50 مبلغ 88.3 مليون درهم في مجموعة هولجيد، مما يضمن حصة أقلية استراتيجية تبلغ 13٪.</p>`
                }
            },
            'ecoles-pionnieres': {
                image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop',
                en: {
                    title: 'State launches "Écoles Pionnières" utilizing TaRL to rehabilitate the public education system',
                    meta: '12 hours ago • By Special Correspondent',
                    content: `<p class="text-xl text-white mb-6">The Moroccan state has launched a massive counter-offensive to rehabilitate the public school system.</p><p>Backed by a $750 million World Bank program, the "Écoles Pionnières" (Pioneer Schools) initiative relies on Teaching at the Right Level (TaRL) and Explicit Instruction. Initial data reveals an average effect size of 0.90 standard deviations in learning outcomes, posing an existential threat to the mid-tier private education market.</p>`
                },
                fr: {
                    title: 'L\'État lance les "Écoles Pionnières" utilisant TaRL pour réhabiliter le système public',
                    meta: 'Il y a 12 heures • Par l\'Envoyé Spécial',
                    content: `<p class="text-xl text-white mb-6">Soutenu par la Banque mondiale, ce modèle abandonne l'approche traditionnelle au profit d'un apprentissage basé sur la maîtrise (TaRL).</p>`
                },
                ar: {
                    title: 'الدولة تطلق "المدارس الرائدة" باستخدام منهجية TaRL لإعادة تأهيل التعليم العمومي',
                    meta: 'منذ 12 ساعة • مراسل خاص',
                    content: `<p class="text-xl text-white mb-6">بدعم من البنك الدولي، يعتمد هذا النموذج على التدريس وفق المستوى المناسب (TaRL) والتعليم الصريح.</p>`
                }
            },
             'talent-war': {
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
                en: {
                    title: 'The end of the moonlighting era: State bans public civil servants from teaching in private sector',
                    meta: '18 hours ago • By HR Insights',
                    content: `<p class="text-xl text-white mb-6">Historically, private schools relied on public school teachers who would "moonlight" after hours.</p><p>Recognizing this institutional cannibalization, the Ministry aggressively curtailed the practice. The state formally banned public civil servant teachers from working in the private sector, plunging mid-tier private schools into a massive staffing crisis.</p>`
                },
                fr: {
                    title: 'La fin de l\'ère du cumul des emplois : L\'État interdit aux fonctionnaires d\'enseigner dans le privé',
                    meta: 'Il y a 18 heures • Par les Ressources Humaines',
                    content: `<p class="text-xl text-white mb-6">L'État a formellement interdit aux enseignants fonctionnaires du public de travailler dans le secteur privé.</p>`
                },
                ar: {
                    title: 'نهاية عصر الازدواجية: الدولة تمنع موظفي القطاع العام من التدريس في القطاع الخاص',
                    meta: 'منذ 18 ساعة • رؤى الموارد البشرية',
                    content: `<p class="text-xl text-white mb-6">حظرت الدولة رسمياً على أساتذة القطاع العام العمل في القطاع الخاص، مما أدى إلى أزمة توظيف في المدارس الخاصة.</p>`
                }
            },
            'teacher-wages': {
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
                en: {
                    title: 'Public sector secures historic wage increases following massive national strikes',
                    meta: '1 day ago • By Labor Desk',
                    content: `<p class="text-xl text-white mb-6">Following massive national strikes, public teachers secured significant wage increases.</p><p>Starting salaries now range from 5,000 to 7,000 MAD, escalating to over 14,000 MAD for experienced secondary teachers. This puts intense pressure on modest private schools operating on thin margins to match these salaries to prevent talent drain.</p>`
                },
                fr: {
                    title: 'Le secteur public obtient des augmentations de salaire historiques après des grèves nationales',
                    meta: 'Il y a 1 jour • Par le Bureau du Travail',
                    content: `<p class="text-xl text-white mb-6">Les salaires de départ varient désormais de 5 000 à 7 000 MAD, ce qui met la pression sur les écoles privées.</p>`
                },
                ar: {
                    title: 'القطاع العام يضمن زيادات تاريخية في الأجور في أعقاب الإضرابات الوطنية العارمة',
                    meta: 'منذ يوم واحد • مكتب العمل',
                    content: `<p class="text-xl text-white mb-6">تتراوح رواتب البداية الآن بين 5000 و 7000 درهم، مما يضع ضغطاً كبيراً على المدارس الخاصة.</p>`
                }
            },
            'aefe-crisis': {
                image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
                en: {
                    title: 'AEFE Crisis: French schools face organized strikes as parents refuse to fund civil pensions',
                    meta: 'Yesterday • By Education Analyst',
                    content: `<p class="text-xl text-white mb-6">The French educational network in Morocco is currently enduring a severe crisis of confidence.</p><p>The AEFE has initiated an aggressive strategy of passing soaring operational costs directly onto parents, specifically mandating them to cover 35% of the employer's share of civil pensions for expatriate French civil servants by 2026. This has resulted in organized strikes and legal actions.</p>`
                },
                fr: {
                    title: 'Crise de l\'AEFE : Les écoles françaises font face à des grèves organisées',
                    meta: 'Hier • Par l\'Analyste en Éducation',
                    content: `<p class="text-xl text-white mb-6">L'AEFE a initié une stratégie exigeant que les parents couvrent 35 % des pensions civiles des fonctionnaires français d'ici 2026.</p>`
                },
                ar: {
                    title: 'أزمة البعثة الفرنسية: المدارس تواجه إضرابات منظمة لرفض الآباء تمويل المعاشات المدنية',
                    meta: 'أمس • محلل تعليمي',
                    content: `<p class="text-xl text-white mb-6">بدأت الوكالة استراتيجية تلزم الآباء بتغطية 35٪ من المعاشات المدنية للموظفين الفرنسيين بحلول عام 2026.</p>`
                }
            },
             'ib-cambridge': {
                image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
                en: {
                    title: 'Ascension of the International Baccalaureate (IB) and Cambridge Models among the Elite',
                    meta: '21 hours ago • By Curriculum Review',
                    content: `<p class="text-xl text-white mb-6">A profound structural shift is occurring regarding curricular preferences among Moroccan parents.</p><p>As dissatisfaction with the French system mounts, the IB and Cambridge International curricula are experiencing unprecedented demand. Institutions offering these models represent the absolute apex of the pricing pyramid, with tuition exceeding 170,000 MAD annually in Casablanca.</p>`
                },
                fr: {
                    title: 'L\'ascension du Baccalauréat International (IB) et des modèles Cambridge',
                    meta: 'Il y a 21 heures • Par la Revue des Programmes',
                    content: `<p class="text-xl text-white mb-6">Face à l'insatisfaction croissante à l'égard du système français, les programmes IB et Cambridge connaissent une demande sans précédent.</p>`
                },
                ar: {
                    title: 'صعود نماذج البكالوريا الدولية (IB) وكامبريدج بين النخبة',
                    meta: 'منذ 21 ساعة • مراجعة المناهج',
                    content: `<p class="text-xl text-white mb-6">مع تزايد الاستياء من النظام الفرنسي، تشهد مناهج البكالوريا الدولية وكامبريدج طلباً غير مسبوق.</p>`
                }
            },
            'domestic-higher-ed': {
                image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
                en: {
                    title: 'Strategic Alignment with Domestic Premium Higher Education (AUI, UM6P) accelerates English adoption',
                    meta: '2 days ago • By Higher Ed Desk',
                    content: `<p class="text-xl text-white mb-6">The shift away from absolute Francophonie is mirrored in Morocco's elite domestic higher education sector.</p><p>Institutions such as Al Akhawayn University (AUI) and Mohammed VI Polytechnic University (UM6P) operate significantly in English. This provides a powerful signaling mechanism to parents that English-medium K-12 education is the optimal preparation for domestic excellence.</p>`
                },
                fr: {
                    title: 'L\'alignement avec l\'enseignement supérieur premium national (AUI, UM6P) accélère l\'adoption de l\'anglais',
                    meta: 'Il y a 2 jours • Par le Bureau de l\'Enseignement Supérieur',
                    content: `<p class="text-xl text-white mb-6">Des institutions telles que l'Université Al Akhawayn (AUI) et l'UM6P opèrent de manière significative en anglais.</p>`
                },
                ar: {
                    title: 'التوافق الاستراتيجي مع التعليم العالي المتميز المحلي (AUI ، UM6P) يسرع تبني اللغة الإنجليزية',
                    meta: 'منذ يومين • مكتب التعليم العالي',
                    content: `<p class="text-xl text-white mb-6">مؤسسات مثل جامعة الأخوين (AUI) وجامعة محمد السادس (UM6P) تعمل بشكل كبير باللغة الإنجليزية.</p>`
                }
            },
             'opci-revolution': {
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
                en: {
                    title: 'The OPCI revolution: Sale-and-leaseback transactions unlock massive liquidity for school operators',
                    meta: '2 days ago • By Real Estate Editor',
                    content: `<p class="text-xl text-white mb-6">The introduction of Organismes de Placement Collectif Immobilier (OPCIs) has revolutionized the financial architecture of the sector.</p><p>OPCIs allow educational groups to execute "sale-and-leaseback" transactions. The institution unlocks massive liquidity previously frozen in bricks and mortar, rapidly redeploying it into pedagogical innovation or aggressive M&A strategies.</p>`
                },
                fr: {
                    title: 'La révolution OPCI : Les transactions de cession-bail libèrent d\'énormes liquidités',
                    meta: 'Il y a 2 jours • Par le Rédacteur Immobilier',
                    content: `<p class="text-xl text-white mb-6">Les OPCI permettent aux groupes de réaliser des transactions de cession-bail pour libérer des liquidités.</p>`
                },
                ar: {
                    title: 'ثورة OPCI: معاملات البيع وإعادة الاستئجار تفتح سيولة هائلة لمشغلي المدارس',
                    meta: 'منذ يومين • محرر عقاري',
                    content: `<p class="text-xl text-white mb-6">تسمح هيئات التوظيف الجماعي العقاري (OPCI) للمجموعات بتنفيذ معاملات البيع وإعادة الاستئجار.</p>`
                }
            },
            'edtech-integration': {
                image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
                en: {
                    title: 'Digital Transformation: Law 59.21 forces deep integration of EdTech and the Massar platform',
                    meta: '3 days ago • By Technology Desk',
                    content: `<p class="text-xl text-white mb-6">The administrative complexity of Law 59.21 has rendered legacy paper-based systems entirely obsolete.</p><p>Private schools are universally adopting integrated software suites like Pronote and Eduka. Crucially, they are legally mandated to interface their internal systems with the Ministry's centralized "Massar" platform to ensure continuous national tracking of student progress.</p>`
                },
                fr: {
                    title: 'Transformation numérique : La loi 59.21 force l\'intégration de la plateforme Massar',
                    meta: 'Il y a 3 jours • Par le Bureau Technologique',
                    content: `<p class="text-xl text-white mb-6">Les écoles sont légalement tenues d'interfacer leurs systèmes internes avec la plateforme centralisée "Massar" du Ministère.</p>`
                },
                ar: {
                    title: 'التحول الرقمي: يفرض القانون 59.21 دمج منصة مسار بعمق',
                    meta: 'منذ 3 أيام • مكتب التكنولوجيا',
                    content: `<p class="text-xl text-white mb-6">المدارس ملزمة قانونًا بربط أنظمتها الداخلية بمنصة "مسار" المركزية التابعة للوزارة.</p>`
                }
            },
            'casablanca-epicenter': {
                image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=150&auto=format&fit=crop',
                en: {
                    title: 'Casablanca remains the hyper-competitive epicenter for premium international education',
                    meta: '4 hours ago • By Regional Analyst',
                    content: '<p>Content available in English view.</p>'
                },
                fr: {
                    title: 'Casablanca demeure l\'épicentre hyperconcurrentiel de l\'enseignement international',
                    meta: 'Il y a 4 heures • Par l\'Analyste Régional',
                    content: '<p>Contenu disponible.</p>'
                },
                ar: {
                    title: 'لا تزال الدار البيضاء المركز شديد التنافسية للتعليم الدولي المتميز',
                    meta: 'منذ 4 ساعات • محلل إقليمي',
                    content: '<p>محتوى متاح.</p>'
                }
            },
            'rabat-higher-ed': {
                image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=150&auto=format&fit=crop',
                en: {
                    title: 'Rabat consolidates position as administrative and higher education nexus with ISGA and UIR',
                    meta: '1 day ago • By Education Analyst',
                    content: '<p>Content available in English view.</p>'
                },
                fr: {
                    title: 'Rabat consolide sa position de pôle de l\'enseignement supérieur avec l\'ISGA et l\'UIR',
                    meta: 'Il y a 1 jour • Par l\'Analyste en Éducation',
                    content: '<p>Contenu disponible.</p>'
                },
                ar: {
                    title: 'الرباط تعزز مكانتها كمركز للتعليم العالي مع ISGA و UIR',
                    meta: 'منذ يوم واحد • محلل تعليمي',
                    content: '<p>محتوى متاح.</p>'
                }
            },
             'marrakech-montessori': {
                image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=150&auto=format&fit=crop',
                en: {
                    title: 'Tangier and Marrakech emerge as high-growth expansion markets driven by industrialization',
                    meta: '2 days ago • By Market Research',
                    content: '<p>Content available in English view.</p>'
                },
                fr: {
                    title: 'Tanger et Marrakech s\'imposent comme des marchés d\'expansion à forte croissance',
                    meta: 'Il y a 2 jours • Par l\'Étude de Marché',
                    content: '<p>Contenu disponible.</p>'
                },
                ar: {
                    title: 'طنجة ومراكش تبرزان كأسواق توسع عالية النمو مدفوعة بالتصنيع',
                    meta: 'منذ يومين • أبحاث السوق',
                    content: '<p>محتوى متاح.</p>'
                }
            }
        };

// UI Translations
const UI_STRINGS: Record<LangType, any> = {
            en: {
                briefingTitle: "Your briefing",
                date: "Tuesday, August 25, 2026",
                weatherCity: "Casablanca weather",
                topStories: "Top stories",
                seeMore: "See more headlines & perspectives",
                picksForYou: "Picks for you",
                back: "Back to Briefing",
                tabs: { home: "Home", public: "Public Education", private: "Private Education" },
                catTitles: {
                    cat1: "Regulatory Overhaul & Structural Shifts in Education",
                    cat2: "The State's Pedagogical Counter-Offensive",
                    cat3: "Strategic Pivot Away from the French Mission",
                    cat4: "Real Estate & EdTech Innovation"
                }
            },
            fr: {
                briefingTitle: "Votre briefing",
                date: "Mardi 25 Août 2026",
                weatherCity: "Météo Casablanca",
                topStories: "À la une",
                seeMore: "Voir plus de titres et de perspectives",
                picksForYou: "Sélection pour vous",
                back: "Retour au briefing",
                tabs: { home: "Accueil", public: "Enseignement Public", private: "Enseignement Privé" },
                 catTitles: {
                    cat1: "Refonte Réglementaire et Changements Structurels",
                    cat2: "La Contre-offensive Pédagogique de l'État",
                    cat3: "Pivot Stratégique Loin de la Mission Française",
                    cat4: "Innovation Immobilière et EdTech"
                }
            },
            ar: {
                briefingTitle: "موجز الأخبار",
                date: "الثلاثاء 25 أغسطس 2026",
                weatherCity: "طقس الدار البيضاء",
                topStories: "أهم الأخبار",
                seeMore: "عرض المزيد من العناوين والآراء",
                picksForYou: "مختارات لك",
                back: "العودة إلى الموجز",
                tabs: { home: "الرئيسية", public: "التعليم العمومي", private: "التعليم الخصوصي" },
                catTitles: {
                    cat1: "الإصلاح التنظيمي والتحولات الهيكلية في التعليم",
                    cat2: "الهجوم التربوي المضاد للدولة",
                    cat3: "التحول الاستراتيجي بعيداً عن البعثة الفرنسية",
                    cat4: "الابتكار العقاري وتكنولوجيا التعليم"
                }
            }
        };

export default function News() {
  const [currentLang, setCurrentLang] = useState<LangType>('en');
  const [activeTab, setActiveTab] = useState<'home' | 'public' | 'private'>('home');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [showExtra, setShowExtra] = useState<boolean>(false);

  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;
  const isRTL = currentLang === 'ar';

  const openArticle = (id: string) => {
    setActiveArticleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticle = () => {
    setActiveArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeArticle = activeArticleId && DATABASE[activeArticleId] ? DATABASE[activeArticleId] : null;
  const activeArticleContent = activeArticle && activeArticle[currentLang] ? activeArticle[currentLang] : null;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-full w-full bg-[#FAFAFA] dark:bg-[#0a0a0c] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200 ${
        isRTL ? "font-['Cairo',sans-serif]" : ''
      }`}
    >
      {/* ── Sub Navigation & Language Bar ────────────────────────────── */}
      <header className="border-b border-zinc-200 dark:border-zinc-800/80 sticky top-0 bg-[#FAFAFA]/95 dark:bg-[#0a0a0c]/95 backdrop-blur-sm z-20 transition-colors">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
          {/* Category Tabs */}
          <nav className="flex items-center gap-6 overflow-x-auto whitespace-nowrap py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 no-scrollbar">
            <button
              onClick={() => { setActiveTab('home'); closeArticle(); }}
              className={`pb-3 -mb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'home'
                  ? 'text-[#1A73E8] dark:text-[#8AB4F8] border-[#1A73E8] dark:border-[#8AB4F8]'
                  : 'border-transparent hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {t.tabs.home}
            </button>
            <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
            <button
              onClick={() => { setActiveTab('public'); closeArticle(); }}
              className={`pb-3 -mb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'public'
                  ? 'text-[#1A73E8] dark:text-[#8AB4F8] border-[#1A73E8] dark:border-[#8AB4F8]'
                  : 'border-transparent hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {t.tabs.public}
            </button>
            <button
              onClick={() => { setActiveTab('private'); closeArticle(); }}
              className={`pb-3 -mb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'private'
                  ? 'text-[#1A73E8] dark:text-[#8AB4F8] border-[#1A73E8] dark:border-[#8AB4F8]'
                  : 'border-transparent hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {t.tabs.private}
            </button>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 border-l rtl:border-l-0 rtl:border-r border-zinc-200 dark:border-zinc-800 pl-4 rtl:pl-0 rtl:pr-4 ml-4 rtl:ml-0 rtl:mr-4 shrink-0">
            <button
              onClick={() => setCurrentLang('en')}
              className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors ${
                currentLang === 'en'
                  ? 'bg-[#D2E3FC] dark:bg-[#1A3F6F] text-[#041E49] dark:text-[#D2E3FC]'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setCurrentLang('fr')}
              className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors ${
                currentLang === 'fr'
                  ? 'bg-[#D2E3FC] dark:bg-[#1A3F6F] text-[#041E49] dark:text-[#D2E3FC]'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setCurrentLang('ar')}
              className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors ${
                currentLang === 'ar'
                  ? 'bg-[#D2E3FC] dark:bg-[#1A3F6F] text-[#041E49] dark:text-[#D2E3FC]'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              عربي
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Container ───────────────────────────────────────────── */}
      <main className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        
        {/* ── VIEW 1: Feed View ──────────────────────────────────────── */}
        {!activeArticleId && (
          <div className="transition-opacity duration-300">
            {/* Header / Briefing info & Weather */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-normal tracking-tight mb-1 text-zinc-900 dark:text-zinc-100">
                  {t.briefingTitle}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">
                  {t.date}
                </p>
              </div>

              {/* Weather Pill */}
              <div className="flex items-center bg-white dark:bg-[#141418] rounded-full pl-4 pr-5 py-2 hover:shadow-sm border border-zinc-200 dark:border-zinc-800/80 transition-all cursor-pointer w-fit">
                <div className="text-zinc-400 mr-3 rtl:mr-0 rtl:ml-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-7 h-7">
                    <svg className="w-7 h-7 text-amber-500 absolute top-0 left-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                      {t.weatherCity}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[16px] font-semibold text-zinc-900 dark:text-zinc-100">31°C</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dual-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: News Feed */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                <div className="flex items-center text-[#1A73E8] dark:text-[#8AB4F8] w-fit mb-1 cursor-default">
                  <h2 className="text-xl font-medium">{t.topStories}</h2>
                  <svg className="w-5 h-5 ml-1 rtl:mr-1 rtl:ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* ── Cluster 1: Regulatory Overhaul (Private) ──────────────── */}
                {(activeTab === 'home' || activeTab === 'private') && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-normal flex items-center text-zinc-900 dark:text-zinc-100">
                      {t.catTitles.cat1}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-1">
                      {/* Hero card */}
                      <div
                        onClick={() => openArticle('law-59-21')}
                        className="flex flex-col group cursor-pointer"
                      >
                        <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141418] relative shadow-sm">
                          <img
                            src={DATABASE['law-59-21'].image}
                            alt="Legal"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-[17px] font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-2 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['law-59-21']?.[currentLang]?.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                          {DATABASE['law-59-21']?.[currentLang]?.meta}
                        </p>
                      </div>

                      {/* Right list items */}
                      <div className="flex flex-col justify-start">
                        <div
                          onClick={() => openArticle('conseil-concurrence')}
                          className="group cursor-pointer py-3 border-b border-zinc-200 dark:border-zinc-800/80 first:pt-0"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['conseil-concurrence']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['conseil-concurrence']?.[currentLang]?.meta}
                          </p>
                        </div>
                        
                        <div
                          onClick={() => openArticle('tax-dilemma')}
                          className="group cursor-pointer py-3 border-b border-zinc-200 dark:border-zinc-800/80"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['tax-dilemma']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['tax-dilemma']?.[currentLang]?.meta}
                          </p>
                        </div>
                        
                        <div
                          onClick={() => openArticle('africa50-holged')}
                          className="group cursor-pointer py-3"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['africa50-holged']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['africa50-holged']?.[currentLang]?.meta}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {!showExtra && (
                      <button
                        onClick={() => setShowExtra(true)}
                        className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 bg-white dark:bg-[#141418] hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-sm font-medium transition-colors border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-sm active:scale-[0.99]"
                      >
                        <svg className="w-4 h-4 text-[#1A73E8] dark:text-[#8AB4F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>{t.seeMore}</span>
                      </button>
                    )}
                  </div>
                )}

                {activeTab === 'home' && <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/80 my-1" />}

                {/* ── Cluster 2: Pedagogical Counter-Offensive (Public) ──────── */}
                {(activeTab === 'home' || activeTab === 'public') && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-normal flex items-center text-zinc-900 dark:text-zinc-100">
                      {t.catTitles.cat2}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-1">
                      <div
                        onClick={() => openArticle('ecoles-pionnieres')}
                        className="flex flex-col group cursor-pointer"
                      >
                        <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141418] relative shadow-sm">
                          <img
                            src={DATABASE['ecoles-pionnieres'].image}
                            alt="Classroom"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-[17px] font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-2 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['ecoles-pionnieres']?.[currentLang]?.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                          {DATABASE['ecoles-pionnieres']?.[currentLang]?.meta}
                        </p>
                      </div>

                      <div className="flex flex-col justify-start">
                        <div
                          onClick={() => openArticle('talent-war')}
                          className="group cursor-pointer py-3 border-b border-zinc-200 dark:border-zinc-800/80 first:pt-0"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['talent-war']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['talent-war']?.[currentLang]?.meta}
                          </p>
                        </div>
                        
                        <div
                          onClick={() => openArticle('teacher-wages')}
                          className="group cursor-pointer py-3"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['teacher-wages']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['teacher-wages']?.[currentLang]?.meta}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'home' && <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/80 my-1" />}

                {/* ── Cluster 3: Strategic Pivot (Private) ──────────────────── */}
                {(activeTab === 'home' || activeTab === 'private') && (
                  <div className="flex flex-col gap-4 pb-2">
                    <h3 className="text-xl font-normal flex items-center text-zinc-900 dark:text-zinc-100">
                      {t.catTitles.cat3}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-1">
                      <div
                        onClick={() => openArticle('aefe-crisis')}
                        className="flex flex-col group cursor-pointer"
                      >
                        <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141418] relative shadow-sm">
                          <img
                            src={DATABASE['aefe-crisis'].image}
                            alt="Campus"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-[17px] font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-2 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['aefe-crisis']?.[currentLang]?.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                          {DATABASE['aefe-crisis']?.[currentLang]?.meta}
                        </p>
                      </div>

                      <div className="flex flex-col justify-start">
                        <div
                          onClick={() => openArticle('ib-cambridge')}
                          className="group cursor-pointer py-3 border-b border-zinc-200 dark:border-zinc-800/80 first:pt-0"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['ib-cambridge']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['ib-cambridge']?.[currentLang]?.meta}
                          </p>
                        </div>
                        
                        <div
                          onClick={() => openArticle('domestic-higher-ed')}
                          className="group cursor-pointer py-3"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['domestic-higher-ed']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['domestic-higher-ed']?.[currentLang]?.meta}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* ── Expandable Cluster 4: Real Estate & EdTech ────────────── */}
                {showExtra && (activeTab === 'home' || activeTab === 'private') && (
                  <div className="flex flex-col gap-4 pb-6">
                    <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/80 my-1" />
                    <h3 className="text-xl font-normal flex items-center text-zinc-900 dark:text-zinc-100">
                      {t.catTitles.cat4}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-1">
                      <div
                        onClick={() => openArticle('opci-revolution')}
                        className="flex flex-col group cursor-pointer"
                      >
                        <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141418] relative shadow-sm">
                          <img
                            src={DATABASE['opci-revolution'].image}
                            alt="Real Estate"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-[17px] font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-2 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['opci-revolution']?.[currentLang]?.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                          {DATABASE['opci-revolution']?.[currentLang]?.meta}
                        </p>
                      </div>

                      <div
                        onClick={() => openArticle('edtech-integration')}
                        className="flex flex-col group cursor-pointer"
                      >
                        <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141418] relative shadow-sm">
                          <img
                            src={DATABASE['edtech-integration'].image}
                            alt="EdTech"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-[17px] font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-2 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['edtech-integration']?.[currentLang]?.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                          {DATABASE['edtech-integration']?.[currentLang]?.meta}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* ── Right Column: Picks for You Sidebar ──────────────── */}
              <div className="lg:col-span-4">
                <div className="bg-white dark:bg-[#141418] rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800/80 sticky top-20 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                      {t.picksForYou}
                    </h2>
                    <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  <div className="flex flex-col">
                    <div
                      onClick={() => openArticle('casablanca-epicenter')}
                      className="flex items-start gap-3.5 group cursor-pointer py-3.5 border-b border-zinc-100 dark:border-zinc-800/60 first:pt-0"
                    >
                      <div className="flex-grow">
                        <h4 className="text-xs font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] line-clamp-3 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['casablanca-epicenter']?.[currentLang]?.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-1.5">
                          {DATABASE['casablanca-epicenter']?.[currentLang]?.meta}
                        </p>
                      </div>
                      <div className="relative w-16 h-16 shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60">
                        <img
                          src={DATABASE['casablanca-epicenter'].image}
                          alt="Casablanca"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div
                      onClick={() => openArticle('rabat-higher-ed')}
                      className="flex items-start gap-3.5 group cursor-pointer py-3.5 border-b border-zinc-100 dark:border-zinc-800/60"
                    >
                      <div className="flex-grow">
                        <h4 className="text-xs font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] line-clamp-3 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['rabat-higher-ed']?.[currentLang]?.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-1.5">
                          {DATABASE['rabat-higher-ed']?.[currentLang]?.meta}
                        </p>
                      </div>
                      <div className="relative w-16 h-16 shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60">
                        <img
                          src={DATABASE['rabat-higher-ed'].image}
                          alt="University"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div
                      onClick={() => openArticle('marrakech-montessori')}
                      className="flex items-start gap-3.5 group cursor-pointer pt-3.5"
                    >
                      <div className="flex-grow">
                        <h4 className="text-xs font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] line-clamp-3 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['marrakech-montessori']?.[currentLang]?.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-1.5">
                          {DATABASE['marrakech-montessori']?.[currentLang]?.meta}
                        </p>
                      </div>
                      <div className="relative w-16 h-16 shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60">
                        <img
                          src={DATABASE['marrakech-montessori'].image}
                          alt="Expansion"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── VIEW 2: Article Reader View ────────────────────────────── */}
        {activeArticleId && activeArticle && activeArticleContent && (
          <div className="max-w-[800px] mx-auto py-2 transition-opacity duration-300">
            {/* Back Button */}
            <button
              onClick={closeArticle}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#141418] hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors mb-6 group shadow-sm active:scale-95"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isRTL ? "M14 5l7 7m0 0l-7 7m7-7H3" : "M10 19l-7-7m0 0l7-7m-7 7h18"}
                />
              </svg>
              <span>{t.back}</span>
            </button>
            
            {/* Article Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-tight text-zinc-900 dark:text-zinc-100 mb-4">
              {activeArticleContent.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <span>{activeArticleContent.meta}</span>
            </div>

            {/* Featured Hero Image */}
            <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl mb-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141418] shadow-sm">
              <img
                src={activeArticle.image}
                alt={activeArticleContent.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body Content */}
            <div
              className="text-[16px] leading-relaxed text-zinc-800 dark:text-zinc-200 space-y-5 pb-16"
              dangerouslySetInnerHTML={{ __html: activeArticleContent.content }}
            />
          </div>
        )}

      </main>
    </div>
  );
}
