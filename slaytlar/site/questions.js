// ITN v7 - Vize Soru Bankası (Modül 1-9)
// Kaynak: ITN Module 1..9 slaytları (sadece slayt içeriği)
// Soru türleri: mcq (çoktan seçmeli), fill (boşluk doldurma), tf (doğru/yanlış)

const TOPICS = {
  // Modül 1 — Networking Today
  M1_1: "Modül 1 · Ağlar Hayatımızı Etkiliyor",
  M1_2: "Modül 1 · Ağ Bileşenleri",
  M1_3: "Modül 1 · Ağ Gösterimleri ve Topolojiler",
  M1_4: "Modül 1 · Yaygın Ağ Türleri",
  M1_5: "Modül 1 · İnternet Bağlantıları",
  M1_6: "Modül 1 · Güvenilir Ağlar",
  M1_7: "Modül 1 · Ağ Trendleri",
  M1_8: "Modül 1 · Ağ Güvenliği",
  M1_9: "Modül 1 · BT Profesyoneli",

  // Modül 2 — Basic Switch & End Device Configuration
  M2_1: "Modül 2 · Cisco IOS Erişimi",
  M2_2: "Modül 2 · IOS Gezinme (Modlar)",
  M2_3: "Modül 2 · Komut Yapısı",
  M2_4: "Modül 2 · Temel Cihaz Yapılandırması",
  M2_5: "Modül 2 · Yapılandırmayı Kaydetme",
  M2_6: "Modül 2 · Portlar ve Adresler",
  M2_7: "Modül 2 · IP Adresleme",
  M2_8: "Modül 2 · Bağlantıyı Doğrulama",

  // Modül 3 — Protocols & Models
  M3_1: "Modül 3 · Kurallar",
  M3_2: "Modül 3 · Protokoller",
  M3_3: "Modül 3 · Protokol Paketleri",
  M3_4: "Modül 3 · Standart Kuruluşları",
  M3_5: "Modül 3 · Referans Modelleri (OSI / TCP/IP)",
  M3_6: "Modül 3 · Veri Kapsülleme",
  M3_7: "Modül 3 · Veri Erişimi (L2/L3 Adresleme)",

  // Modül 4 — Physical Layer
  M4_1: "Modül 4 · Fiziksel Katmanın Amacı",
  M4_2: "Modül 4 · Fiziksel Katman Özellikleri",
  M4_3: "Modül 4 · Bakır Kablolama",
  M4_4: "Modül 4 · UTP Kablolama",
  M4_5: "Modül 4 · Fiber Optik Kablolama",
  M4_6: "Modül 4 · Kablosuz Medya",

  // Modül 5 — Number Systems
  M5_1: "Modül 5 · İkili Sayı Sistemi",
  M5_2: "Modül 5 · Onaltılık (Hex) Sayı Sistemi",

  // Modül 6 — Data Link Layer
  M6_1: "Modül 6 · Veri Bağlantısı Katmanının Amacı",
  M6_2: "Modül 6 · Topolojiler ve Erişim Kontrolü",
  M6_3: "Modül 6 · Veri Bağlantısı Çerçevesi",

  // Modül 7 — Ethernet Switching
  M7_1: "Modül 7 · Ethernet Çerçevesi",
  M7_2: "Modül 7 · Ethernet MAC Adresi",
  M7_3: "Modül 7 · MAC Adres Tablosu",
  M7_4: "Modül 7 · Anahtar Hızları ve Yönlendirme Yöntemleri",

  // Modül 8 — Network Layer
  M8_1: "Modül 8 · Ağ Katmanı Özellikleri",
  M8_2: "Modül 8 · IPv4 Paketi",
  M8_3: "Modül 8 · IPv6 Paketi",
  M8_4: "Modül 8 · Host Nasıl Yönlendirir",
  M8_5: "Modül 8 · Yönlendirmeye Giriş",

  // Modül 9 — Address Resolution
  M9_1: "Modül 9 · MAC ve IP",
  M9_2: "Modül 9 · ARP",
  M9_3: "Modül 9 · IPv6 Komşu Keşfi (ND)"
};

const QUESTIONS = [
  // =========================================================
  // MODÜL 8.1 - AĞ KATMANI ÖZELLİKLERİ
  // =========================================================
  {
    id: 1, topic: "M8_1", type: "mcq",
    q: "Ağ katmanı (network layer) uç cihazların veri alışverişi yapabilmesi için hangi dört temel işlevi gerçekleştirir?",
    options: [
      "Şifreleme, sıkıştırma, yönlendirme, çerçeveleme",
      "Uç cihazları adresleme, kapsülleme (encapsulation), yönlendirme (routing), kapsül açma (de-encapsulation)",
      "Akış kontrolü, hata düzeltme, oturum yönetimi, senkronizasyon",
      "ARP, DHCP, DNS ve NAT hizmetleri",
      "MAC öğrenme, filtreleme, iletim ve taşkın (flooding)"
    ],
    answer: 1,
    explain: "Slayta göre ağ katmanının 4 temel işlemi: uç cihazları adresleme, kapsülleme, yönlendirme ve kapsülü açmadır."
  },
  {
    id: 2, topic: "M8_1", type: "mcq",
    q: "Ağ katmanının temel iletişim protokolleri aşağıdakilerden hangileridir?",
    options: ["TCP ve UDP", "Ethernet ve PPP", "IPv4 ve IPv6", "ARP ve ICMP", "HTTP ve FTP"],
    answer: 2,
    explain: "IPv4 ve IPv6, ağ katmanının başlıca iletişim protokolleridir."
  },
  {
    id: 3, topic: "M8_1", type: "mcq",
    q: "IP için aşağıdaki özelliklerden hangisi DOĞRU değildir?",
    options: [
      "Bağlantısızdır (connectionless)",
      "En iyi çaba (best effort) temellidir",
      "Ortamdan bağımsızdır (media independent)",
      "Paketi iletmeyi garanti eder",
      "Düşük ek yük (overhead) hedefler"
    ],
    answer: 3,
    explain: "IP paketin teslimini GARANTİ ETMEZ; en iyi çaba (best effort) temellidir."
  },
  {
    id: 4, topic: "M8_1", type: "mcq",
    q: "IP'nin 'Connectionless' (bağlantısız) olması ne anlama gelir?",
    options: [
      "IP paketi göndermeden önce hedef ile bağlantı kurmaz",
      "IP yalnızca kablosuz bağlantılarda çalışır",
      "IP her zaman TCP ile birlikte çalışır",
      "IP paketin sırasını korur",
      "IP hedefi eş zamanlı olarak bilgilendirir"
    ],
    answer: 0,
    explain: "Bağlantısız: paket göndermeden önce hedef ile bağlantı kurulmaz, senkronizasyon/ack gibi kontrol bilgisi gerekmez."
  },
  {
    id: 5, topic: "M8_1", type: "mcq",
    q: "Bağlantı yönelimli (connection-oriented) iletişime ihtiyaç duyulduğunda bu görevi tipik olarak hangi protokol üstlenir?",
    options: ["IP (ağ katmanı)", "UDP (taşıma katmanı)", "TCP (taşıma katmanı)", "ARP (ağ katmanı)", "ICMP"],
    answer: 2,
    explain: "Bağlantı yönelimli trafik gerektiğinde bunu tipik olarak taşıma katmanındaki TCP üstlenir."
  },
  {
    id: 6, topic: "M8_1", type: "mcq",
    q: "IP'nin 'Best Effort' (en iyi çaba) olması aşağıdakilerden hangisini doğrular?",
    options: [
      "IP teslim edilmeyen veriyi yeniden gönderme mekanizmasına sahiptir",
      "IP gönderilen paketin teslimini garanti etmez ve onay (ack) beklemez",
      "IP yalnızca en yakın yönlendiriciye paket iletir",
      "IP paketleri sıralı teslim eder",
      "IP, TCP'nin tüm güvenilirlik işlevlerini içerir"
    ],
    answer: 1,
    explain: "Best Effort: IP teslimatı garanti etmez, ack beklemez; kaybolan paketi yeniden göndermez."
  },
  {
    id: 7, topic: "M8_1", type: "mcq",
    q: "IP'nin 'Media Independent' (ortamdan bağımsız) olmasının anlamı nedir?",
    options: [
      "IP yalnızca bakır kablo üzerinden çalışır",
      "IP veri bağı çerçeve türü veya fiziksel katman ortamı ile ilgilenmez",
      "IP yalnızca fiber ortamında güvenilirdir",
      "IP her ortamda farklı paket yapısı kullanır",
      "IP ortamı otomatik olarak seçer"
    ],
    answer: 1,
    explain: "IP veri bağı çerçeve türü veya fiziksel ortamdan bağımsızdır; bakır, fiber ve kablosuz her ortamda taşınabilir."
  },
  {
    id: 8, topic: "M8_1", type: "mcq",
    q: "Ağ katmanının gözeterek kullandığı MTU (Maximum Transmission Unit) değerini hangi katmandan aldığı kontrol bilgisiyle belirler?",
    options: ["Uygulama katmanı", "Taşıma katmanı", "Veri bağı katmanı", "Oturum katmanı", "Fiziksel katman"],
    answer: 2,
    explain: "Ağ katmanı MTU'yu belirlemek için veri bağı katmanından gelen kontrol bilgisini kullanır."
  },
  {
    id: 9, topic: "M8_1", type: "mcq",
    q: "Fragmentation (parçalama) ile ilgili aşağıdaki ifadelerden hangisi DOĞRUDUR?",
    options: [
      "IPv6, yol üzerinde yönlendiriciler tarafından paketleri parçalar",
      "Fragmentation gecikmeye (latency) neden olur ve IPv4'te Layer 3'te yapılır",
      "Fragmentation yalnızca uygulama katmanında yapılır",
      "Fragmentation her zaman performansı artırır",
      "IPv4 paketleri asla parçalanmaz"
    ],
    answer: 1,
    explain: "Fragmentation: Layer 3 (ağ katmanı) IPv4 paketini daha küçük birimlere böler. Gecikmeye neden olur. IPv6 paketleri yönlendiriciler parçalamaz."
  },
  {
    id: 10, topic: "M8_1", type: "mcq",
    q: "Aşağıdakilerden hangisi IP'nin güvenilmez (unreliable) olduğunu gösteren bir özelliktir?",
    options: [
      "Sıra dışı paketleri yeniden sıralayamaz",
      "Bozuk paketleri düzeltemez",
      "Bir hatadan sonra yeniden iletim yapamaz",
      "Bu işlevler için başka protokollere dayanır",
      "Hepsi"
    ],
    answer: 4,
    explain: "IP güvenilmezdir; bozuk/teslim edilmemiş paketleri yönetemez, yeniden iletemez ve sıralayamaz. Bu işlevler için başka protokollere (örn. TCP) bağlıdır."
  },
  {
    id: 11, topic: "M8_1", type: "tf",
    q: "IP, hedef cihazın çalışır durumda olup olmadığını veya paketi alıp almadığını bilmez.",
    answer: true,
    explain: "Best effort özelliği gereği IP diğer cihazın durumundan haberdar değildir."
  },
  {
    id: 12, topic: "M8_1", type: "tf",
    q: "IPv6 paketleri yönlendiriciler (routers) tarafından parçalanır (fragment).",
    answer: false,
    explain: "IPv6 yönlendiriciler tarafından parçalanmaz; IPv6 paketlerini yönlendiriciler fragment etmez."
  },
  {
    id: 13, topic: "M8_1", type: "tf",
    q: "IP bağlantısız olduğu için gönderim öncesi hedefe ön bildirim (pre-notification) yapmaz.",
    answer: true,
    explain: "Bağlantısız: hedefe ön bildirim yapılmaz, paket geldiğinde alınır."
  },
  {
    id: 14, topic: "M8_1", type: "tf",
    q: "NAT, IP paketinin kaynaktan hedefe giderken adres bilgisini değiştirebilir.",
    answer: true,
    explain: "Genel kural olarak IP adresleme kaynaktan hedefe değişmez, ANCAK NAT adresi değiştirir (slaytta dipnot olarak belirtilmiş)."
  },
  {
    id: 15, topic: "M8_1", type: "tf",
    q: "IP, kablosuz ortamda IPv6, kablolu ortamda IPv4 olarak farklı biçimlerde çalışır.",
    answer: false,
    explain: "IP ortamdan bağımsızdır; hem IPv4 hem IPv6 her ortamda çalışabilir."
  },
  {
    id: 16, topic: "M8_1", type: "tf",
    q: "IP, hedefin paketi alıp almadığını doğrulamak için onay (ack) bekler.",
    answer: false,
    explain: "IP best effort olduğundan ack beklemez."
  },
  {
    id: 17, topic: "M8_1", type: "tf",
    q: "Yönlendirici, Ethernet'ten daha küçük MTU'ya sahip yavaş bir WAN'a geçerken IPv4 paketi fragment edebilir.",
    answer: true,
    explain: "Slaytta verilen örnek: Ethernet'ten daha küçük MTU'lu yavaş bir WAN'a geçerken fragmentation devreye girer."
  },
  {
    id: 18, topic: "M8_1", type: "fill",
    q: "IP'nin üç temel özelliği: ________, Best Effort ve Media Independent.",
    answer: ["connectionless", "bağlantısız"],
    explain: "IP'nin üç ana özelliği: Connectionless (bağlantısız), Best Effort, Media Independent."
  },
  {
    id: 19, topic: "M8_1", type: "fill",
    q: "Ağ katmanının belirlediği, paketin bölünmeden gönderilebileceği maksimum boyutu ifade eden kısaltma ________.",
    answer: ["MTU"],
    explain: "MTU (Maximum Transmission Unit) — paketin bölünmeden gönderilebileceği maksimum boyut."
  },
  {
    id: 20, topic: "M8_1", type: "fill",
    q: "Layer 3'ün IPv4 paketini daha küçük birimlere bölmesine ________ denir.",
    answer: ["fragmentation", "parçalama"],
    explain: "Fragmentation, Layer 3'te IPv4 paketinin daha küçük birimlere bölünmesidir."
  },
  {
    id: 21, topic: "M8_1", type: "fill",
    q: "IP, veri bağı katmanı çerçeve türü ve fiziksel ortam türünden bağımsız olduğu için ________ olarak adlandırılır.",
    answer: ["media independent", "ortamdan bağımsız"],
    explain: "IP ortamdan bağımsızdır (media independent)."
  },
  {
    id: 22, topic: "M8_1", type: "fill",
    q: "Ağ katmanının dört temel işlemi: adresleme, ________, yönlendirme ve kapsülü açmadır.",
    answer: ["encapsulation", "kapsülleme"],
    explain: "Dört işlem: adresleme, kapsülleme (encapsulation), yönlendirme, kapsül açma (de-encapsulation)."
  },

  // =========================================================
  // MODÜL 8.2 - IPv4 PAKETİ
  // =========================================================
  {
    id: 30, topic: "M8_2", type: "mcq",
    q: "IPv4 başlığında (header) aşağıdaki alanlardan hangisi 'Layer 3 hop count' görevi görür ve sıfıra düştüğünde yönlendirici paketi düşürür?",
    options: ["Version", "Header Checksum", "Time to Live (TTL)", "Protocol", "Differentiated Services"],
    answer: 2,
    explain: "TTL Layer 3 hop sayacı; 0'a düştüğünde yönlendirici paketi siler."
  },
  {
    id: 31, topic: "M8_2", type: "mcq",
    q: "IPv4 başlığındaki 'Version' alanının 4 bitlik değeri kaçtır?",
    options: ["0100", "0110", "0010", "1000", "0101"],
    answer: 0,
    explain: "IPv4'te Version alanı 4 bit = 0100 (yani 4). IPv6'da 0110 (yani 6)."
  },
  {
    id: 32, topic: "M8_2", type: "mcq",
    q: "IPv4 başlığındaki 'Differentiated Services' alanı hangi amaçla kullanılır?",
    options: [
      "Başlık bozulmasını tespit etmek",
      "QoS (Hizmet Kalitesi) işaretlemesi",
      "Hop sayacı",
      "Bir sonraki başlık türünü belirlemek",
      "Kaynak MAC'i tanımlamak"
    ],
    answer: 1,
    explain: "Differentiated Services alanı QoS için kullanılır; DiffServ (DS) veya eski IntServ (ToS / Type of Service) alanları."
  },
  {
    id: 33, topic: "M8_2", type: "mcq",
    q: "IPv4 başlığında bir üst katman protokolünü (ICMP, TCP, UDP vb.) tanımlayan alan hangisidir?",
    options: ["Version", "TTL", "Protocol", "Flags", "Header Checksum"],
    answer: 2,
    explain: "Protocol alanı üst katman protokolünü (ICMP/TCP/UDP vb.) tanımlar."
  },
  {
    id: 34, topic: "M8_2", type: "mcq",
    q: "IPv4 kaynak ve hedef adres alanlarının her biri kaç bittir?",
    options: ["16 bit", "32 bit", "64 bit", "128 bit", "48 bit"],
    answer: 1,
    explain: "IPv4 kaynak ve hedef adresleri 32 biter."
  },
  {
    id: 35, topic: "M8_2", type: "mcq",
    q: "IPv4 başlığındaki iki en önemli alan hangisidir?",
    options: [
      "Version ve TTL",
      "Kaynak ve Hedef adresler",
      "Header Checksum ve Protocol",
      "Flags ve Fragment Offset",
      "DiffServ ve TTL"
    ],
    answer: 1,
    explain: "Slayta göre başlıktaki en önemli iki alan kaynak ve hedef adreslerdir."
  },
  {
    id: 36, topic: "M8_2", type: "mcq",
    q: "IPv4 başlığındaki 'Header Checksum' alanının amacı nedir?",
    options: [
      "Veri bölümündeki hataları düzeltmek",
      "Yalnızca IPv4 başlığındaki bozulmayı tespit etmek",
      "Bir sonraki atlama noktasını hesaplamak",
      "QoS önceliği belirlemek",
      "Paket sıra numarası üretmek"
    ],
    answer: 1,
    explain: "Header Checksum yalnızca IPv4 BAŞLIĞINDA bozulmayı tespit etmek için kullanılır (veri içeriği değil)."
  },
  {
    id: 37, topic: "M8_2", type: "mcq",
    q: "IPv4 başlığı binary biçiminde, soldan sağa okunan diyagramda satır başına kaç bayt içerir?",
    options: ["1", "2", "4", "8", "16"],
    answer: 2,
    explain: "Diyagram soldan sağa, satır başına 4 bayt olarak okunur."
  },
  {
    id: 38, topic: "M8_2", type: "tf",
    q: "IPv4 ağ başlığı ikilik (binary) biçimde taşınır.",
    answer: true,
    explain: "Başlık binary formdadır."
  },
  {
    id: 39, topic: "M8_2", type: "tf",
    q: "TTL 0'a düştüğünde paket hedefe ulaşana kadar tekrar tekrar gönderilir.",
    answer: false,
    explain: "TTL 0 olduğunda yönlendirici paketi DÜŞÜRÜR, yeniden göndermez."
  },
  {
    id: 40, topic: "M8_2", type: "tf",
    q: "Protocol alanı IPv4 başlığında kapsüllenen üst katman protokolünü (ICMP, TCP, UDP gibi) tanımlar.",
    answer: true,
    explain: "Protocol alanı üst katman protokolünü tanımlar."
  },
  {
    id: 41, topic: "M8_2", type: "tf",
    q: "IPv4 adresleri 128 bitliktir.",
    answer: false,
    explain: "IPv4 adresleri 32 bit; 128 bit IPv6'ya aittir."
  },
  {
    id: 42, topic: "M8_2", type: "tf",
    q: "Ağ başlığındaki bilgiler paketi işleyen tüm Layer 3 cihazlarca kullanılır.",
    answer: true,
    explain: "Başlık bilgisi yol boyunca tüm L3 cihazlarınca kullanılır."
  },
  {
    id: 43, topic: "M8_2", type: "fill",
    q: "IPv4 başlığında Layer 3 hop sayacı olarak davranan alan ________ kısaltması ile bilinir.",
    answer: ["TTL", "time to live"],
    explain: "TTL = Time to Live, L3 hop sayacıdır."
  },
  {
    id: 44, topic: "M8_2", type: "fill",
    q: "IPv4 başlığındaki Version alanı kaç bittir? ________",
    answer: ["4", "4 bit"],
    explain: "Version alanı 4 bittir."
  },
  {
    id: 45, topic: "M8_2", type: "fill",
    q: "IPv4 kaynak adresi ________ bittir.",
    answer: ["32", "32 bit"],
    explain: "IPv4 kaynak ve hedef adresi 32 bittir."
  },
  {
    id: 46, topic: "M8_2", type: "fill",
    q: "QoS için kullanılan ve DiffServ DS alanı veya eski ToS adıyla bilinen alanın adı: ________.",
    answer: ["differentiated services", "diffserv", "tos"],
    explain: "Differentiated Services alanı QoS amacıyla kullanılır."
  },
  {
    id: 47, topic: "M8_2", type: "fill",
    q: "IPv4 başlığındaki bozulmayı tespit etmek için kullanılan alan ________.",
    answer: ["header checksum", "başlık sağlama toplamı"],
    explain: "Header Checksum: IPv4 başlığındaki bozulmayı tespit eder."
  },

  // =========================================================
  // MODÜL 8.3 - IPv6 PAKETİ
  // =========================================================
  {
    id: 60, topic: "M8_3", type: "mcq",
    q: "IPv4'ün üç temel sınırlaması aşağıdakilerden hangisi DEĞİLDİR?",
    options: [
      "IPv4 adres tükenmesi",
      "Uçtan uca bağlantı eksikliği",
      "NAT nedeniyle artan ağ karmaşıklığı",
      "128 bit adres uzayı"
    ],
    answer: 3,
    explain: "128 bit IPv6 ÖZELLİĞİDİR, IPv4'ün sınırlaması değildir. IPv4 sınırlamaları: adres tükenmesi, uçtan uca bağlantı eksikliği, artan ağ karmaşıklığı."
  },
  {
    id: 61, topic: "M8_3", type: "mcq",
    q: "IPv6 hangi kuruluş tarafından geliştirilmiştir?",
    options: ["IEEE", "ITU", "IETF (Internet Engineering Task Force)", "ISO", "Cisco"],
    answer: 2,
    explain: "IPv6 IETF (Internet Engineering Task Force) tarafından geliştirilmiştir."
  },
  {
    id: 62, topic: "M8_3", type: "mcq",
    q: "IPv6'nın IPv4'e göre sağladığı iyileştirmeler aşağıdakilerden hangisidir?",
    options: [
      "Artan adres alanı (128 bit)",
      "Daha az alanlı basitleştirilmiş başlık ile iyileştirilmiş paket işleme",
      "NAT ihtiyacını ortadan kaldırma",
      "Hepsi"
    ],
    answer: 3,
    explain: "IPv6'nın üç iyileştirmesi: 128 bit adres alanı, daha basit başlık, NAT ihtiyacının kalkması."
  },
  {
    id: 63, topic: "M8_3", type: "mcq",
    q: "IPv6 başlığının sabit uzunluğu kaç bayttır?",
    options: ["20 bayt", "24 bayt", "32 bayt", "40 bayt", "64 bayt"],
    answer: 3,
    explain: "IPv6 başlığı sabit 40 bayt (octet) uzunluğundadır."
  },
  {
    id: 64, topic: "M8_3", type: "mcq",
    q: "IPv6 başlığında performansı artırmak için IPv4'ten KALDIRILMIŞ alanlar hangileridir?",
    options: [
      "Version, Source, Destination",
      "Flag, Fragment Offset, Header Checksum",
      "Hop Limit, Flow Label, Traffic Class",
      "Protocol, TTL, Differentiated Services",
      "Payload Length, Next Header, Hop Limit"
    ],
    answer: 1,
    explain: "IPv4'ten kaldırılan alanlar: Flag, Fragment Offset, Header Checksum."
  },
  {
    id: 65, topic: "M8_3", type: "mcq",
    q: "IPv6 başlığında 'Hop Limit' alanı IPv4'teki hangi alanın yerine geçer?",
    options: ["Protocol", "TTL", "Header Checksum", "Differentiated Services", "Flags"],
    answer: 1,
    explain: "IPv6'daki Hop Limit, IPv4'teki TTL alanının yerini alır."
  },
  {
    id: 66, topic: "M8_3", type: "mcq",
    q: "IPv6 başlığındaki 'Flow Label' alanı kaç bittir?",
    options: ["4", "8", "16", "20", "32"],
    answer: 3,
    explain: "Flow Label 20 bit uzunluğundadır."
  },
  {
    id: 67, topic: "M8_3", type: "mcq",
    q: "IPv6 başlığındaki 'Traffic Class' alanı IPv4'te hangi işleve karşılık gelir?",
    options: ["TTL", "Protocol", "DiffServ - DS (QoS)", "Header Checksum", "Source Address"],
    answer: 2,
    explain: "Traffic Class alanı DiffServ DS alanına eşdeğerdir (QoS için)."
  },
  {
    id: 68, topic: "M8_3", type: "mcq",
    q: "IPv6'daki 'Next Header' alanının işlevi nedir?",
    options: [
      "Paketin uzunluğunu belirlemek",
      "Bir sonraki katman protokolünü (ICMP, TCP, UDP vb.) belirtmek",
      "Hop sayacı olarak çalışmak",
      "Fragment bilgisini tutmak",
      "Kaynak adresini kodlamak"
    ],
    answer: 1,
    explain: "Next Header, bir sonraki katman protokolünü (ICMP, TCP, UDP vb.) tanımlar — IPv4'teki Protocol alanına benzer."
  },
  {
    id: 69, topic: "M8_3", type: "mcq",
    q: "IPv6'daki 'Payload Length' alanı kaç bittir ve neyi gösterir?",
    options: [
      "8 bit; başlık uzunluğu",
      "16 bit; veri (payload) bölümünün uzunluğu",
      "20 bit; akış etiketi",
      "32 bit; kaynak adresi",
      "128 bit; hedef adresi"
    ],
    answer: 1,
    explain: "Payload Length 16 bittir ve IPv6 paketinin veri/payload bölümünün uzunluğunu gösterir."
  },
  {
    id: 70, topic: "M8_3", type: "mcq",
    q: "IPv6 kaynak ve hedef adres alanlarının her biri kaç bittir?",
    options: ["32", "48", "64", "128", "256"],
    answer: 3,
    explain: "IPv6 adresleri 128 bittir."
  },
  {
    id: 71, topic: "M8_3", type: "mcq",
    q: "IPv6 Version alanının 4 bitlik değeri nedir?",
    options: ["0100", "0110", "0010", "1100", "1001"],
    answer: 1,
    explain: "IPv6 Version = 0110 (yani 6)."
  },
  {
    id: 72, topic: "M8_3", type: "mcq",
    q: "IPv6 Extension Headers (EH) ile ilgili aşağıdakilerden hangisi DOĞRUDUR?",
    options: [
      "Zorunludur; her IPv6 paketinde bulunmalıdır",
      "IPv6 başlığı ile payload arasına yerleştirilir ve opsiyoneldir",
      "Yalnızca veri bağı katmanında bulunur",
      "Fragmentation veya güvenlik gibi işlevler için kullanılamaz",
      "Her zaman ilk 40 baytın içindedir"
    ],
    answer: 1,
    explain: "EH'ler opsiyoneldir, IPv6 başlığı ile payload arasına yerleştirilir; fragmentation, güvenlik, mobilite desteği gibi amaçlarla kullanılır."
  },
  {
    id: 73, topic: "M8_3", type: "mcq",
    q: "IPv6 Extension Headers hangi amaçlarla kullanılabilir?",
    options: [
      "Fragmentation",
      "Güvenlik",
      "Mobilite desteği",
      "Hepsi"
    ],
    answer: 3,
    explain: "EH'ler fragmentation, güvenlik ve mobilite desteği gibi opsiyonel işlevler için kullanılır."
  },
  {
    id: 74, topic: "M8_3", type: "mcq",
    q: "Flow Label alanının işlevi nedir?",
    options: [
      "IPv6 başlığında bozulmayı kontrol eder",
      "Aynı akış (flow) etiketine sahip paketlere cihazın aynı biçimde davranmasını sağlar",
      "Kaynak MAC adresini belirtir",
      "NAT dönüşümünü tetikler",
      "Hop sayacını azaltır"
    ],
    answer: 1,
    explain: "Flow Label: cihaza aynı akış etiketine sahip paketleri aynı şekilde işlemesini söyler (20 bit)."
  },
  {
    id: 75, topic: "M8_3", type: "tf",
    q: "IPv6 başlığı basitleştirilmiştir ve bu nedenle IPv4 başlığından küçüktür.",
    answer: false,
    explain: "IPv6 başlığı BASİTLEŞTİRİLMİŞTİR ancak daha KÜÇÜK DEĞİLDİR; 40 bayt sabit uzunluktadır."
  },
  {
    id: 76, topic: "M8_3", type: "tf",
    q: "IPv6'da yönlendiriciler (routers) paketi fragment etmez.",
    answer: true,
    explain: "IPv6'da yönlendiriciler fragment etmez."
  },
  {
    id: 77, topic: "M8_3", type: "tf",
    q: "Header Checksum alanı IPv6 başlığında da mevcuttur.",
    answer: false,
    explain: "Header Checksum IPv6'dan kaldırılmıştır (Flag ve Fragment Offset ile birlikte)."
  },
  {
    id: 78, topic: "M8_3", type: "tf",
    q: "NAT, IPv6'nın sunduğu geniş adres alanı sayesinde ihtiyaç dışına çıkar.",
    answer: true,
    explain: "IPv6'nın geniş adres alanı nedeniyle özel adresleme/NAT'a ihtiyaç kalmaz."
  },
  {
    id: 79, topic: "M8_3", type: "tf",
    q: "Extension Header'lar IPv6 başlığının içinde, payload'dan önce yer alır.",
    answer: true,
    explain: "EH'ler IPv6 başlığı ile payload arasına yerleştirilir."
  },
  {
    id: 80, topic: "M8_3", type: "fill",
    q: "IPv6 başlığının sabit uzunluğu ________ bayttır.",
    answer: ["40"],
    explain: "IPv6 başlığı 40 bayt uzunluğundadır."
  },
  {
    id: 81, topic: "M8_3", type: "fill",
    q: "IPv6'da IPv4'teki TTL alanının yerine geçen alan ________ adını alır.",
    answer: ["hop limit"],
    explain: "IPv6'da Hop Limit alanı TTL'nin yerini alır."
  },
  {
    id: 82, topic: "M8_3", type: "fill",
    q: "IPv6 kaynak adresi ________ bittir.",
    answer: ["128"],
    explain: "IPv6 adresleri 128 bittir."
  },
  {
    id: 83, topic: "M8_3", type: "fill",
    q: "IPv6'da QoS için kullanılan ve DiffServ DS'e eşdeğer alanın adı ________.",
    answer: ["traffic class"],
    explain: "IPv6'daki Traffic Class alanı DiffServ DS'e eşdeğerdir."
  },
  {
    id: 84, topic: "M8_3", type: "fill",
    q: "IPv6'da Flow Label alanı ________ bittir.",
    answer: ["20"],
    explain: "Flow Label 20 bittir."
  },
  {
    id: 85, topic: "M8_3", type: "fill",
    q: "IPv6 başlığındaki Payload Length ________ bittir.",
    answer: ["16"],
    explain: "Payload Length 16 bittir."
  },
  {
    id: 86, topic: "M8_3", type: "fill",
    q: "IPv6'dan performans için kaldırılan üç IPv4 alanı: Flag, Fragment Offset ve ________.",
    answer: ["header checksum"],
    explain: "Kaldırılan üç alan: Flag, Fragment Offset, Header Checksum."
  },

  // =========================================================
  // MODÜL 8.4 - HOST NASIL YÖNLENDİRİR
  // =========================================================
  {
    id: 100, topic: "M8_4", type: "mcq",
    q: "Paketler hangi noktada oluşturulur?",
    options: [
      "Varsayılan ağ geçidinde",
      "Her zaman kaynakta",
      "Yönlendirici çıkışında",
      "Switch'te",
      "Hedef cihazda"
    ],
    answer: 1,
    explain: "Paketler her zaman kaynakta oluşturulur."
  },
  {
    id: 101, topic: "M8_4", type: "mcq",
    q: "IPv4'te bir host'un geri döngü (loopback) adresi hangisidir?",
    options: ["192.168.0.1", "127.0.0.1", "::1", "10.0.0.1", "169.254.1.1"],
    answer: 1,
    explain: "IPv4 loopback = 127.0.0.1; IPv6 loopback = ::1."
  },
  {
    id: 102, topic: "M8_4", type: "mcq",
    q: "IPv6'da loopback adresi aşağıdakilerden hangisidir?",
    options: ["127.0.0.1", "FE80::1", "::1", "FF02::1", "2001::1"],
    answer: 2,
    explain: "IPv6 loopback = ::1."
  },
  {
    id: 103, topic: "M8_4", type: "mcq",
    q: "Bir IPv4 kaynağı, hedefin yerel mi yoksa uzak mı olduğunu nasıl belirler?",
    options: [
      "Sadece varsayılan ağ geçidine sorar",
      "Kendi IP adresini ve alt ağ maskesini (subnet mask) hedef IP ile birlikte kullanır",
      "ICMP ile keşif yapar",
      "Yerel yönlendirici tarafından reklam edilen prefix'i kullanır",
      "DNS sorgusu yapar"
    ],
    answer: 1,
    explain: "IPv4 kaynağı kendi IP adresi + subnet mask + hedef IP adresi ile karşılaştırma yaparak yerel/uzak kararı verir."
  },
  {
    id: 104, topic: "M8_4", type: "mcq",
    q: "Bir IPv6 kaynağı, hedefin yerel mi yoksa uzak mı olduğunu nasıl belirler?",
    options: [
      "Kendi IPv4 maskesini kullanır",
      "Yerel yönlendirici tarafından reklam edilen ağ adresi ve prefix'i kullanır",
      "NAT tablosuna bakar",
      "Sadece ARP tablosuna bakar",
      "DHCPv6 sunucusuna sorar"
    ],
    answer: 1,
    explain: "IPv6 kaynağı yerel yönlendirici tarafından reklam edilen ağ adresi ve prefix'i kullanır."
  },
  {
    id: 105, topic: "M8_4", type: "mcq",
    q: "Yerel (local) trafik ne yapılır?",
    options: [
      "Doğrudan varsayılan ağ geçidine gönderilir",
      "Host arayüzünden dışarı bırakılır ve ara cihaz (intermediary device) tarafından işlenir",
      "İnternet servis sağlayıcısına gönderilir",
      "ARP yapılmadan düşürülür",
      "Asla gönderilmez"
    ],
    answer: 1,
    explain: "Yerel trafik host arayüzünden dışarıya bırakılır ve ara cihaz (switch) tarafından işlenir."
  },
  {
    id: 106, topic: "M8_4", type: "mcq",
    q: "Uzak (remote) trafik için hedef MAC adresi kim olur?",
    options: [
      "Uzak hedef cihazın MAC adresi",
      "Varsayılan ağ geçidinin MAC adresi",
      "Yayın (broadcast) MAC adresi",
      "Switch'in MAC adresi",
      "Çoklu yayın (multicast) MAC adresi"
    ],
    answer: 1,
    explain: "Uzak trafik doğrudan LAN'daki varsayılan ağ geçidine iletilir; hedef MAC = DGW MAC."
  },
  {
    id: 107, topic: "M8_4", type: "mcq",
    q: "Varsayılan ağ geçidi (Default Gateway - DGW) aşağıdaki özelliklerden hangisini SAĞLAMALIDIR?",
    options: [
      "LAN'ın geri kalanı ile aynı IP aralığında olmalı",
      "LAN'dan veri kabul edebilmeli ve LAN dışına trafiği iletebilmeli",
      "Diğer ağlara yönlendirme yapabilmeli",
      "Hepsi"
    ],
    answer: 3,
    explain: "DGW: aynı aralıkta IP olmalı, LAN'dan trafik kabul edip dışarı iletebilmeli ve diğer ağlara yönlendirebilmeli."
  },
  {
    id: 108, topic: "M8_4", type: "mcq",
    q: "Bir cihaz varsayılan ağ geçidi bilgisini IPv4'te tipik olarak hangi yollarla öğrenir?",
    options: [
      "ARP broadcast",
      "Statik yapılandırma veya DHCP",
      "STP",
      "Sadece Router Advertisement",
      "Sadece ICMPv6 RS/RA"
    ],
    answer: 1,
    explain: "IPv4'te DGW statik olarak yapılandırılabilir ya da DHCP ile öğrenilir."
  },
  {
    id: 109, topic: "M8_4", type: "mcq",
    q: "IPv6'da varsayılan ağ geçidi nasıl öğrenilir?",
    options: [
      "Yalnızca DHCPv4",
      "Router Solicitation (RS) ile veya manuel yapılandırma ile",
      "Yalnızca ARP broadcast ile",
      "Her zaman NAT keşfi ile",
      "DNS sorgusu ile"
    ],
    answer: 1,
    explain: "IPv6 DGW'yi Router Solicitation (RS) üzerinden ya da manuel olarak öğrenir."
  },
  {
    id: 110, topic: "M8_4", type: "mcq",
    q: "Windows'ta PC yönlendirme tablosunu görüntülemek için aşağıdaki komutlardan hangisi KULLANILABİLİR?",
    options: [
      "show ip route",
      "netstat -r",
      "route print",
      "Sadece b ve c",
      "Sadece a"
    ],
    answer: 3,
    explain: "Windows'ta 'route print' veya 'netstat -r' komutları PC yönlendirme tablosunu gösterir. 'show ip route' ise Cisco router komutudur."
  },
  {
    id: 111, topic: "M8_4", type: "mcq",
    q: "route print / netstat -r komutlarının gösterdiği üç bölüm hangisidir?",
    options: [
      "Interface List, IPv4 Routing Table, IPv6 Routing Table",
      "ARP Table, MAC Table, STP Table",
      "DHCP Leases, DNS Cache, ARP Cache",
      "Running Config, Startup Config, IOS Image",
      "Interface Brief, VLAN List, Trunk List"
    ],
    answer: 0,
    explain: "Üç bölüm: Interface List (arayüz+MAC), IPv4 Routing Table, IPv6 Routing Table."
  },
  {
    id: 112, topic: "M8_4", type: "tf",
    q: "Her host kendi yönlendirme tablosunu oluşturur.",
    answer: true,
    explain: "Slaytta belirtildiği gibi her host kendi yönlendirme tablosunu oluşturur."
  },
  {
    id: 113, topic: "M8_4", type: "tf",
    q: "Bir host hiçbir zaman kendi kendine paket gönderemez.",
    answer: false,
    explain: "Host kendisine de (127.0.0.1 / ::1 loopback) paket gönderebilir."
  },
  {
    id: 114, topic: "M8_4", type: "tf",
    q: "Varsayılan ağ geçidi olmayan veya yanlış yapılandırılmış bir cihazın trafiği LAN dışına çıkamaz.",
    answer: true,
    explain: "Geçersiz veya eksik DGW'de trafik LAN'dan çıkamaz."
  },
  {
    id: 115, topic: "M8_4", type: "tf",
    q: "Varsayılan ağ geçidi, yönlendirme tablosunda son çare (last resort) rotası olarak kullanılan statik bir rotadır.",
    answer: true,
    explain: "DGW statik son çare rotasıdır."
  },
  {
    id: 116, topic: "M8_4", type: "tf",
    q: "IPv4'te hedef yerel ağda ise hedef MAC adresi varsayılan ağ geçidinin MAC'idir.",
    answer: false,
    explain: "Hedef yerel ağda ise hedef MAC = hedef cihazın MAC'i. DGW MAC'i yalnızca uzak hedef için kullanılır."
  },
  {
    id: 117, topic: "M8_4", type: "fill",
    q: "IPv4 loopback adresi ________.",
    answer: ["127.0.0.1"],
    explain: "IPv4 loopback adresi 127.0.0.1'dir."
  },
  {
    id: 118, topic: "M8_4", type: "fill",
    q: "IPv6 loopback adresi ________.",
    answer: ["::1"],
    explain: "IPv6 loopback adresi ::1'dir."
  },
  {
    id: 119, topic: "M8_4", type: "fill",
    q: "LAN dışına çıkacak tüm trafiğin gönderildiği yönlendiriciye ________ denir.",
    answer: ["default gateway", "varsayılan ağ geçidi"],
    explain: "Default Gateway (DGW) — LAN dışına trafiği ileten yönlendiricidir."
  },
  {
    id: 120, topic: "M8_4", type: "fill",
    q: "Windows'ta yönlendirme tablosunu gösteren iki komut: route print ve ________.",
    answer: ["netstat -r", "netstat"],
    explain: "Windows'ta route print veya netstat -r kullanılır."
  },
  {
    id: 121, topic: "M8_4", type: "fill",
    q: "IPv6'da varsayılan ağ geçidi bilgisi yönlendiriciden ________ mesajı ile alınabilir.",
    answer: ["router solicitation", "rs"],
    explain: "IPv6'da DGW bilgisi Router Solicitation (RS) ile öğrenilir."
  },

  // =========================================================
  // MODÜL 8.5 - YÖNLENDİRMEYE GİRİŞ
  // =========================================================
  {
    id: 140, topic: "M8_5", type: "mcq",
    q: "Bir yönlendiricinin (router) yönlendirme tablosundaki üç tür rota hangisidir?",
    options: [
      "Statik, Dinamik, ARP",
      "Doğrudan Bağlı, Uzak, Varsayılan",
      "OSPF, EIGRP, BGP",
      "Yerel, Host, Ağ",
      "Summary, Supernet, Default"
    ],
    answer: 1,
    explain: "Router yönlendirme tablosundaki üç tür rota: Doğrudan Bağlı, Uzak, Varsayılan."
  },
  {
    id: 141, topic: "M8_5", type: "mcq",
    q: "Doğrudan bağlı (directly connected) rotalar yönlendirme tablosuna nasıl eklenir?",
    options: [
      "Yönetici tarafından elle",
      "OSPF tarafından otomatik olarak",
      "Arayüz etkin ve adreslenmişse yönlendirici tarafından otomatik olarak",
      "DHCP üzerinden",
      "Sadece dinamik yönlendirme protokolleriyle"
    ],
    answer: 2,
    explain: "Arayüz etkin ve adreslenmişse yönlendirici bu rotayı otomatik olarak ekler."
  },
  {
    id: 142, topic: "M8_5", type: "mcq",
    q: "Uzak (remote) rotalar nasıl öğrenilebilir?",
    options: [
      "Elle (statik rota) veya dinamik olarak (yönlendirme protokolü)",
      "Sadece elle",
      "Sadece dinamik",
      "ICMP üzerinden",
      "Sadece DHCP ile"
    ],
    answer: 0,
    explain: "Uzak rotalar elle (statik) veya dinamik yönlendirme protokolü ile öğrenilir."
  },
  {
    id: 143, topic: "M8_5", type: "mcq",
    q: "Varsayılan rotanın (default route) görevi nedir?",
    options: [
      "Trafiği daima belirli bir arayüzden geri gönderir",
      "Yönlendirme tablosunda eşleşme yoksa trafiği belirli bir yöne iletir",
      "ARP tablosunu günceller",
      "STP ağacını oluşturur",
      "DHCP atamaları yapar"
    ],
    answer: 1,
    explain: "Varsayılan rota: yönlendirme tablosunda eşleşme bulunmadığında trafiği belirli bir yöne iletir."
  },
  {
    id: 144, topic: "M8_5", type: "mcq",
    q: "Statik yönlendirme için aşağıdakilerden hangisi DOĞRU değildir?",
    options: [
      "Elle yapılandırılır",
      "Topoloji değiştiğinde yönetici tarafından elle güncellenir",
      "Küçük ve yedeksiz ağlar için uygundur",
      "Topoloji değiştiğinde otomatik olarak en iyi yolu bulur",
      "Bir varsayılan rota için dinamik protokollerle birlikte kullanılabilir"
    ],
    answer: 3,
    explain: "Topoloji değişince statik rotalar OTOMATİK güncellenmez; elle güncelleme gerekir. Otomatik uyum dinamik rotalamaya aittir."
  },
  {
    id: 145, topic: "M8_5", type: "mcq",
    q: "Dinamik yönlendirmenin otomatik olarak yaptığı işlemlerden hangisi YANLIŞTIR?",
    options: [
      "Uzak ağları keşfeder",
      "Bilgiyi güncel tutar",
      "Hedefe en iyi yolu seçer",
      "Topoloji değişince yeni en iyi yolu bulur",
      "MAC-IP eşlemesini günceller"
    ],
    answer: 4,
    explain: "MAC-IP eşlemesi ARP/ND'nin görevidir; dinamik yönlendirme protokolleri ağ rotalarını yönetir."
  },
  {
    id: 146, topic: "M8_5", type: "mcq",
    q: "`show ip route` çıktısında 'C' kodu neyi temsil eder?",
    options: [
      "Statik rota",
      "Doğrudan bağlı ağ",
      "OSPF rotası",
      "EIGRP rotası",
      "Varsayılan rota"
    ],
    answer: 1,
    explain: "C = Directly Connected network (doğrudan bağlı ağ)."
  },
  {
    id: 147, topic: "M8_5", type: "mcq",
    q: "`show ip route` çıktısında 'L' kodu neyi gösterir?",
    options: [
      "Loopback rota",
      "Doğrudan bağlı yerel arayüz IP adresi",
      "Dinamik yerel rota",
      "Varsayılan rota",
      "OSPF bağlantısı"
    ],
    answer: 1,
    explain: "L = doğrudan bağlı yerel arayüz IP adresi."
  },
  {
    id: 148, topic: "M8_5", type: "mcq",
    q: "`show ip route` çıktısında 'S' kodu neyi ifade eder?",
    options: [
      "OSPF",
      "EIGRP",
      "Yönetici tarafından elle yapılandırılan statik rota",
      "Summary rota",
      "RIP"
    ],
    answer: 2,
    explain: "S = Static route (yönetici tarafından elle yapılandırılmış)."
  },
  {
    id: 149, topic: "M8_5", type: "mcq",
    q: "`show ip route` çıktısında 'O' hangi yönlendirme protokolünü gösterir?",
    options: ["EIGRP", "RIP", "BGP", "OSPF", "IS-IS"],
    answer: 3,
    explain: "O = OSPF."
  },
  {
    id: 150, topic: "M8_5", type: "mcq",
    q: "`show ip route` çıktısında 'D' hangi yönlendirme protokolüne karşılık gelir?",
    options: ["EIGRP", "OSPF", "RIP", "ISIS", "BGP"],
    answer: 0,
    explain: "D = EIGRP."
  },
  {
    id: 151, topic: "M8_5", type: "mcq",
    q: "`show ip route` çıktısında varsayılan rota genellikle hangi kod ile gösterilir?",
    options: ["C", "L", "S*", "D", "O"],
    answer: 2,
    explain: "Varsayılan rotalar S* ile gösterilir."
  },
  {
    id: 152, topic: "M8_5", type: "mcq",
    q: "Yönlendirici eşleşmeyi seçerken hangi yöntemi kullanır?",
    options: [
      "İlk eşleşen rota",
      "En kısa prefix eşleşmesi",
      "En uzun prefix (subnet mask) eşleşmesi",
      "En düşük metrik",
      "En düşük AD (administrative distance)"
    ],
    answer: 2,
    explain: "Modül özetine göre router en uzun subnet mask / prefix eşleşmesini seçer."
  },
  {
    id: 153, topic: "M8_5", type: "tf",
    q: "Statik rotalar, küçük ve yedekliliği olmayan ağlar için uygundur.",
    answer: true,
    explain: "Statik rotalama küçük, yedeksiz ağlar için uygundur."
  },
  {
    id: 154, topic: "M8_5", type: "tf",
    q: "Dinamik yönlendirme protokolleri yönlendiriciler arasında statik varsayılan rotaları da paylaşabilir.",
    answer: true,
    explain: "Dinamik yönlendirme statik varsayılan rotaları da paylaşabilir."
  },
  {
    id: 155, topic: "M8_5", type: "tf",
    q: "`show ip route` komutu Windows PC'de yönlendirme tablosunu gösterir.",
    answer: false,
    explain: "`show ip route` Cisco yönlendirici komutudur; Windows'ta route print/netstat -r kullanılır."
  },
  {
    id: 156, topic: "M8_5", type: "tf",
    q: "Doğrudan bağlı rotalar yönlendirme tablosunda 'C' ve 'L' kodları ile gösterilir.",
    answer: true,
    explain: "Directly Connected: C (ağ) ve L (yerel IP)."
  },
  {
    id: 157, topic: "M8_5", type: "fill",
    q: "`show ip route` çıktısında OSPF ile öğrenilen rotalar ________ harfi ile gösterilir.",
    answer: ["O"],
    explain: "OSPF = O."
  },
  {
    id: 158, topic: "M8_5", type: "fill",
    q: "`show ip route` çıktısında EIGRP rotası ________ harfi ile gösterilir.",
    answer: ["D"],
    explain: "EIGRP = D."
  },
  {
    id: 159, topic: "M8_5", type: "fill",
    q: "Yönlendirme tablosundaki üç rota türü: doğrudan bağlı, uzak ve ________ rotalarıdır.",
    answer: ["varsayılan", "default"],
    explain: "Üçüncüsü: Varsayılan (default) rotalardır."
  },
  {
    id: 160, topic: "M8_5", type: "fill",
    q: "Router iki aday arasında karar verirken en ________ subnet mask / prefix eşleşmesini seçer.",
    answer: ["uzun", "longest"],
    explain: "Longest subnet mask / prefix match."
  },
  {
    id: 161, topic: "M8_5", type: "fill",
    q: "Statik varsayılan rota `show ip route` çıktısında genellikle ________ kodu ile gösterilir.",
    answer: ["S*"],
    explain: "Varsayılan statik rota S* olarak gösterilir."
  },

  // =========================================================
  // MODÜL 9.1 - MAC ve IP
  // =========================================================
  {
    id: 180, topic: "M9_1", type: "mcq",
    q: "Ethernet LAN'da bir cihaza atanan iki birincil adres hangisidir?",
    options: [
      "MAC (L2 fiziksel) ve IP (L3 mantıksal)",
      "MAC ve DNS",
      "IP ve URL",
      "MAC ve URL",
      "DNS ve IP"
    ],
    answer: 0,
    explain: "Bir cihaza verilen iki birincil adres: Layer 2 fiziksel (MAC) ve Layer 3 mantıksal (IP)."
  },
  {
    id: 181, topic: "M9_1", type: "mcq",
    q: "MAC adresinin (Layer 2 fiziksel adres) temel kullanım amacı nedir?",
    options: [
      "Yönlendiriciler arası paket yönlendirme",
      "Aynı Ethernet ağındaki bir NIC'ten diğer NIC'e çerçeve iletimi",
      "Uzak ağlarda IP çözümleme",
      "Uygulama katmanı oturum kontrolü",
      "Paket fragmentation"
    ],
    answer: 1,
    explain: "L2 MAC, aynı Ethernet ağındaki NIC'ten NIC'e çerçeve iletimi için kullanılır."
  },
  {
    id: 182, topic: "M9_1", type: "mcq",
    q: "IP adresinin (Layer 3 mantıksal adres) temel kullanım amacı nedir?",
    options: [
      "Aynı ağdaki NIC'ler arasında çerçeve iletmek",
      "Paketi kaynak cihazdan hedef cihaza göndermek",
      "MAC öğrenmesi yapmak",
      "STP topolojisi kurmak",
      "VLAN etiketlemek"
    ],
    answer: 1,
    explain: "IP (L3) adresi paketi kaynak cihazdan hedef cihaza göndermek için kullanılır."
  },
  {
    id: 183, topic: "M9_1", type: "mcq",
    q: "Hedef IP aynı ağdaysa, çerçevedeki hedef MAC adresi ne olur?",
    options: [
      "Broadcast MAC (FF:FF:FF:FF:FF:FF)",
      "Varsayılan ağ geçidinin MAC'i",
      "Hedef cihazın MAC'i",
      "Switch'in MAC'i",
      "Kaynak cihazın MAC'i"
    ],
    answer: 2,
    explain: "Hedef IP aynı ağda ise çerçevedeki hedef MAC = hedef cihazın MAC adresidir."
  },
  {
    id: 184, topic: "M9_1", type: "mcq",
    q: "Hedef IP uzak bir ağda ise, çerçevedeki hedef MAC adresi ne olur?",
    options: [
      "Hedef cihazın MAC'i",
      "Varsayılan ağ geçidinin MAC'i",
      "Broadcast MAC",
      "Multicast MAC",
      "Uzak ağdaki switch'in MAC'i"
    ],
    answer: 1,
    explain: "Hedef IP uzak ise çerçevedeki hedef MAC = varsayılan ağ geçidinin MAC adresidir."
  },
  {
    id: 185, topic: "M9_1", type: "mcq",
    q: "IPv4, cihazın IPv4 adresini MAC adresi ile ilişkilendirmek için hangi protokolü kullanır?",
    options: ["ICMPv6", "DHCP", "ARP", "DNS", "STP"],
    answer: 2,
    explain: "IPv4 için bu eşleme ARP ile yapılır."
  },
  {
    id: 186, topic: "M9_1", type: "mcq",
    q: "IPv6, cihazın IPv6 adresini MAC adresi ile ilişkilendirmek için hangi protokolü kullanır?",
    options: ["ARP", "ICMPv4", "ICMPv6 (Neighbor Discovery)", "TCP", "UDP"],
    answer: 2,
    explain: "IPv6 için bu eşleme ICMPv6 Neighbor Discovery ile yapılır."
  },
  {
    id: 187, topic: "M9_1", type: "tf",
    q: "L2 MAC adresi farklı ağlar arasında paketleri iletmek için kullanılır.",
    answer: false,
    explain: "L2 MAC aynı Ethernet ağı içinde NIC'ler arasında iletim için kullanılır; uzak ağlar arası iletim L3/IP işidir."
  },
  {
    id: 188, topic: "M9_1", type: "tf",
    q: "IPv6, MAC çözümlemesi için ARP kullanır.",
    answer: false,
    explain: "IPv6 ARP KULLANMAZ; bunun yerine ICMPv6 ND (Neighbor Discovery) kullanır."
  },
  {
    id: 189, topic: "M9_1", type: "tf",
    q: "Hedef aynı ağda ise L2 hedef MAC adresi, hedef cihazın NIC MAC adresidir.",
    answer: true,
    explain: "Hedef aynı ağda ise L2 hedef MAC = hedef cihazın MAC'idir."
  },
  {
    id: 190, topic: "M9_1", type: "fill",
    q: "Ethernet LAN'da bir cihaza atanan iki birincil adres: Layer 2 fiziksel (MAC) ve Layer 3 mantıksal ________.",
    answer: ["ip"],
    explain: "Diğeri IP adresidir."
  },
  {
    id: 191, topic: "M9_1", type: "fill",
    q: "IPv4, IP-MAC eşlemesi için ________ protokolünü kullanır.",
    answer: ["arp"],
    explain: "IPv4 ARP kullanır."
  },
  {
    id: 192, topic: "M9_1", type: "fill",
    q: "IPv6, IP-MAC eşlemesi için ________ protokolünü kullanır.",
    answer: ["icmpv6", "nd", "neighbor discovery"],
    explain: "IPv6 ICMPv6 ND (Neighbor Discovery) kullanır."
  },
  {
    id: 193, topic: "M9_1", type: "fill",
    q: "Hedef IP uzak ağda ise çerçevedeki hedef MAC adresi ________ MAC'idir.",
    answer: ["varsayılan ağ geçidi", "default gateway", "dgw", "gateway"],
    explain: "Uzak hedef için hedef MAC = varsayılan ağ geçidi MAC'i."
  },

  // =========================================================
  // MODÜL 9.2 - ARP
  // =========================================================
  {
    id: 210, topic: "M9_2", type: "mcq",
    q: "ARP protokolünün amacı nedir?",
    options: [
      "IPv6 adreslerini MAC adreslerine çözümlemek",
      "IPv4 adresini bilen bir cihazın, yerel bir cihazın hedef MAC adresini belirlemesi",
      "Yönlendirme tablosu oluşturmak",
      "DHCP kiralamalarını yönetmek",
      "Kapsülleme yapmak"
    ],
    answer: 1,
    explain: "ARP: IPv4 bilinen bir cihazın, yerel bir cihazın MAC'ini çözümlemesi içindir."
  },
  {
    id: 211, topic: "M9_2", type: "mcq",
    q: "ARP'nin iki temel işlevi nedir?",
    options: [
      "IP-MAC çözümleme ve IPv4->MAC eşlemelerini bir ARP tablosunda tutma",
      "NAT çevirisi ve DHCP kiralaması",
      "VLAN öğrenme ve trunk negotiation",
      "STP topolojisi hesaplama ve yedekleme",
      "Rota keşfi ve rota tanıtımı"
    ],
    answer: 0,
    explain: "ARP: (1) IPv4 -> MAC çözümlemek, (2) IPv4-MAC eşlemelerinin ARP tablosunu tutmak."
  },
  {
    id: 212, topic: "M9_2", type: "mcq",
    q: "Cihaz bir çerçeve göndereceği zaman ARP tablosunda hedef IPv4'ü arar. Hedef IP farklı bir ağda ise tabloda hangi IPv4 aranır?",
    options: [
      "Hedef cihazın IPv4'ü",
      "Broadcast adresi",
      "Varsayılan ağ geçidinin IPv4 adresi",
      "Kendi IPv4'ü",
      "Switch IPv4'ü"
    ],
    answer: 2,
    explain: "Hedef farklı ağdaysa cihaz ARP tablosunda varsayılan ağ geçidinin IPv4 adresini arar."
  },
  {
    id: 213, topic: "M9_2", type: "mcq",
    q: "ARP tablosunda ilgili IPv4 bulunamazsa cihaz ne yapar?",
    options: [
      "Paketi düşürür",
      "ICMP yankı (ping) gönderir",
      "Bir ARP isteği (request) gönderir",
      "DHCP sunucusuna başvurur",
      "STP yeniden hesaplaması başlatır"
    ],
    answer: 2,
    explain: "ARP tablosunda eşleşme yoksa ARP isteği (request) gönderilir."
  },
  {
    id: 214, topic: "M9_2", type: "mcq",
    q: "ARP tablo girişleri hakkında aşağıdakilerden hangisi DOĞRUDUR?",
    options: [
      "Kalıcıdır ve hiç silinmez",
      "Belirli bir süre sonra ARP önbellek zamanlayıcısı ile silinir",
      "Yalnızca cihaz yeniden başladığında silinir",
      "Her paket gönderiminde silinir",
      "DHCP ile silinir"
    ],
    answer: 1,
    explain: "ARP girişleri kalıcı değildir; ARP cache timer ile süresi dolunca silinir."
  },
  {
    id: 215, topic: "M9_2", type: "mcq",
    q: "ARP cache timer süresi neye bağlıdır?",
    options: [
      "Sadece IP adres tipine",
      "İşletim sistemine göre değişir",
      "Kablo türüne",
      "VLAN numarasına",
      "Anahtar modeline"
    ],
    answer: 1,
    explain: "ARP cache timer süresi işletim sistemine göre değişir."
  },
  {
    id: 216, topic: "M9_2", type: "mcq",
    q: "ARP tablosu girişleri yönetici tarafından elle silinebilir mi?",
    options: ["Hayır, sadece zamanlayıcı silebilir", "Evet", "Yalnızca yönlendirici yeniden başlatılırsa", "Yalnızca switch'te", "Yalnızca IPv6'da"],
    answer: 1,
    explain: "ARP girişleri yönetici tarafından elle silinebilir."
  },
  {
    id: 217, topic: "M9_2", type: "mcq",
    q: "Cisco bir yönlendiricide ARP tablosunu görüntülemek için hangi komut kullanılır?",
    options: ["show arp -a", "arp -a", "show ip arp", "show mac address-table", "display arp"],
    answer: 2,
    explain: "Cisco yönlendiricide ARP tablosu `show ip arp` komutu ile gösterilir."
  },
  {
    id: 218, topic: "M9_2", type: "mcq",
    q: "Windows 10 PC üzerinde ARP tablosunu görüntülemek için hangi komut kullanılır?",
    options: ["show ip arp", "arp -a", "netstat -arp", "route -arp", "display arp"],
    answer: 1,
    explain: "Windows 10'da `arp -a` kullanılır."
  },
  {
    id: 219, topic: "M9_2", type: "mcq",
    q: "`show ip arp` çıktısında aşağıdaki sütunlardan hangisi YOKTUR?",
    options: ["Protocol", "Address", "Age (min)", "Hardware Addr", "Gateway of Last Resort"],
    answer: 4,
    explain: "Çıktı sütunları: Protocol, Address, Age (min), Hardware Addr, Type, Interface. 'Gateway of Last Resort' `show ip route`'a aittir."
  },
  {
    id: 220, topic: "M9_2", type: "mcq",
    q: "ARP ile ilgili güvenlik sorunlarından hangisi, bir saldırganın sahte ARP yanıtları göndermesi ile oluşur?",
    options: [
      "ARP broadcast fırtınası",
      "ARP poisoning / spoofing",
      "MAC flooding",
      "DHCP starvation",
      "STP BPDU attack"
    ],
    answer: 1,
    explain: "Sahte ARP yanıtları ile yapılan saldırı: ARP poisoning / spoofing."
  },
  {
    id: 221, topic: "M9_2", type: "mcq",
    q: "Aşırı sayıda ARP yayını (broadcast) ne gibi bir soruna yol açabilir?",
    options: [
      "MAC tablosu dolması",
      "Performansta düşüş",
      "Yönlendirme tablosunun bozulması",
      "VLAN trunk kesilmesi",
      "IP adres değişimi"
    ],
    answer: 1,
    explain: "Aşırı ARP broadcast'leri performansta düşüşe neden olabilir."
  },
  {
    id: 222, topic: "M9_2", type: "mcq",
    q: "Kurumsal seviye (enterprise) switch'ler ARP saldırılarına karşı ne tür korumalar sunabilir?",
    options: [
      "Hiçbir koruma sağlamaz",
      "Yalnızca port-security",
      "ARP saldırılarına karşı azaltma (mitigation) teknikleri",
      "Yalnızca VLAN ayırma",
      "Yalnızca STP"
    ],
    answer: 2,
    explain: "Kurumsal switch'ler ARP saldırılarına karşı azaltma teknikleri içerir."
  },
  {
    id: 223, topic: "M9_2", type: "mcq",
    q: "Yerel ağdaki ARP isteği (request) mesajını hangi cihazlar alır ve işler?",
    options: [
      "Yalnızca hedef cihaz",
      "Yalnızca varsayılan ağ geçidi",
      "Yerel ağdaki TÜM cihazlar",
      "Yalnızca DHCP sunucusu",
      "Yalnızca switch'ler"
    ],
    answer: 2,
    explain: "ARP request broadcast olduğundan yerel ağdaki tüm cihazlar alır ve işler."
  },
  {
    id: 224, topic: "M9_2", type: "mcq",
    q: "ARP reply alındıktan sonra cihaz ne yapar?",
    options: [
      "ARP tablosuna girişi ekler (IPv4 ve karşılık gelen MAC)",
      "IP adresini değiştirir",
      "Broadcast fırtınası başlatır",
      "Rotayı günceller",
      "Paketi düşürür"
    ],
    answer: 0,
    explain: "ARP reply geldikten sonra cihaz IPv4-MAC eşlemesini ARP tablosuna ekler."
  },
  {
    id: 225, topic: "M9_2", type: "tf",
    q: "ARP, IPv6 adreslerini MAC adreslerine çözümlemek için de kullanılır.",
    answer: false,
    explain: "ARP yalnızca IPv4 içindir; IPv6 için ND kullanılır."
  },
  {
    id: 226, topic: "M9_2", type: "tf",
    q: "ARP cache timer süresi kullanılmayan girişleri belirli bir süre sonra kaldırır.",
    answer: true,
    explain: "ARP cache timer belirli süre kullanılmayan girişleri siler."
  },
  {
    id: 227, topic: "M9_2", type: "tf",
    q: "ARP request sadece hedef IP adresini bilen cihaza yönlendirilir ve broadcast yapılmaz.",
    answer: false,
    explain: "ARP request broadcast olarak gönderilir; yerel ağdaki tüm cihazlar alır."
  },
  {
    id: 228, topic: "M9_2", type: "tf",
    q: "ARP replies tehdit aktörleri tarafından sahteleştirilebilir (spoof).",
    answer: true,
    explain: "ARP replies spoof edilebilir; bu ARP poisoning saldırısına yol açar."
  },
  {
    id: 229, topic: "M9_2", type: "tf",
    q: "Hedef IP farklı bir ağda ise cihaz ARP tablosunda hedefin IPv4 adresini arar.",
    answer: false,
    explain: "Hedef farklı ağdaysa cihaz varsayılan ağ geçidinin IPv4'ünü arar."
  },
  {
    id: 230, topic: "M9_2", type: "tf",
    q: "`arp -a` komutu Cisco router'da ARP tablosunu gösterir.",
    answer: false,
    explain: "`arp -a` Windows 10 komutudur; Cisco'da `show ip arp`."
  },
  {
    id: 231, topic: "M9_2", type: "fill",
    q: "ARP tablosuna manuel olarak bakmak için Windows 10'da kullanılan komut: ________",
    answer: ["arp -a", "arp"],
    explain: "Windows 10'da `arp -a`."
  },
  {
    id: 232, topic: "M9_2", type: "fill",
    q: "Cisco yönlendiricide ARP tablosunu gösteren komut: ________",
    answer: ["show ip arp"],
    explain: "Cisco router'da `show ip arp`."
  },
  {
    id: 233, topic: "M9_2", type: "fill",
    q: "ARP'nin iki temel görevi: IPv4 -> MAC çözümlemek ve IPv4-MAC eşlemelerini ________ tutmaktır.",
    answer: ["arp tablosunda", "arp tablosu", "arp table"],
    explain: "ARP tablosunda IPv4-MAC eşlemeleri tutulur."
  },
  {
    id: 234, topic: "M9_2", type: "fill",
    q: "Sahte ARP yanıtları ile yapılan saldırıya ________ denir.",
    answer: ["arp poisoning", "arp spoofing", "poisoning", "spoofing"],
    explain: "ARP poisoning / ARP spoofing."
  },
  {
    id: 235, topic: "M9_2", type: "fill",
    q: "ARP tablosunda eşleşme bulunamadığında cihaz bir ARP ________ yayınlar.",
    answer: ["isteği", "request"],
    explain: "ARP request (isteği) yayınlanır."
  },
  {
    id: 236, topic: "M9_2", type: "fill",
    q: "ARP önbellek zamanlayıcısının (timer) süresi ________ sistemine göre değişir.",
    answer: ["işletim", "os", "operating"],
    explain: "ARP cache timer süresi işletim sistemine göre değişir."
  },

  // =========================================================
  // MODÜL 9.3 - IPv6 KOMŞU KEŞFİ (ND)
  // =========================================================
  {
    id: 260, topic: "M9_3", type: "mcq",
    q: "IPv6 Neighbor Discovery (ND) protokolü aşağıdaki hizmetlerden hangisini sağlar?",
    options: [
      "Adres çözümleme",
      "Yönlendirici keşfi",
      "Yönlendirme (redirection) hizmetleri",
      "Hepsi"
    ],
    answer: 3,
    explain: "IPv6 ND: adres çözümleme, yönlendirici keşfi ve yönlendirme (redirection) hizmetlerini sağlar."
  },
  {
    id: 261, topic: "M9_3", type: "mcq",
    q: "IPv6 ND'de cihazlar arası (device-to-device) adres çözümleme için kullanılan ICMPv6 mesajları hangileridir?",
    options: [
      "Router Solicitation (RS) ve Router Advertisement (RA)",
      "Neighbor Solicitation (NS) ve Neighbor Advertisement (NA)",
      "Echo Request ve Echo Reply",
      "Redirect ve Time Exceeded",
      "DHCP Discover ve DHCP Offer"
    ],
    answer: 1,
    explain: "Adres çözümleme için NS ve NA (Neighbor Solicitation / Neighbor Advertisement) kullanılır."
  },
  {
    id: 262, topic: "M9_3", type: "mcq",
    q: "Yönlendirici keşfi (router discovery) için cihaz-yönlendirici arasında kullanılan ICMPv6 mesajları hangileridir?",
    options: [
      "NS ve NA",
      "RS (Router Solicitation) ve RA (Router Advertisement)",
      "Echo ve Echo Reply",
      "Redirect",
      "ARP Request ve Reply"
    ],
    answer: 1,
    explain: "Router discovery: RS ve RA mesajları cihazlarla yönlendiriciler arasında kullanılır."
  },
  {
    id: 263, topic: "M9_3", type: "mcq",
    q: "Yönlendiricilerin daha iyi bir sonraki atlama (next-hop) seçimi için gönderdiği ICMPv6 mesaj türü hangisidir?",
    options: [
      "Neighbor Solicitation",
      "Neighbor Advertisement",
      "Router Solicitation",
      "ICMPv6 Redirect",
      "Router Advertisement"
    ],
    answer: 3,
    explain: "ICMPv6 Redirect mesajları yönlendiriciler tarafından daha iyi next-hop seçimi için kullanılır."
  },
  {
    id: 264, topic: "M9_3", type: "mcq",
    q: "IPv6 cihazları MAC adresi çözümü için ND kullanırken Neighbor Solicitation mesajını hangi tür adreslerle gönderir?",
    options: [
      "Özel broadcast adresleri",
      "Özel Ethernet ve IPv6 multicast adresleri",
      "Doğrudan hedef unicast adresi",
      "Anycast adresler",
      "Yalnızca loopback adresler"
    ],
    answer: 1,
    explain: "ICMPv6 NS mesajları özel Ethernet ve IPv6 multicast adresleri ile gönderilir."
  },
  {
    id: 265, topic: "M9_3", type: "mcq",
    q: "IPv6'da bilinen bir IPv6 adresinin MAC karşılığını bulmak için kullanılan protokol hangisidir?",
    options: ["ARP", "DHCPv6", "ND (Neighbor Discovery)", "DNSv6", "STP"],
    answer: 2,
    explain: "IPv6'da ND MAC çözümü için kullanılır."
  },
  {
    id: 266, topic: "M9_3", type: "mcq",
    q: "IPv6'daki ND protokolünün üç temel görevinden biri DEĞİLDİR?",
    options: [
      "Adres çözümleme",
      "Yönlendirici keşfi",
      "Yönlendirme (redirection) hizmetleri",
      "NAT çevirisi"
    ],
    answer: 3,
    explain: "ND'nin görevleri: adres çözümleme, yönlendirici keşfi, redirection. NAT ND'nin görevi değildir."
  },
  {
    id: 267, topic: "M9_3", type: "tf",
    q: "IPv6 Neighbor Discovery, ICMPv6 tabanlı mesajlar kullanır.",
    answer: true,
    explain: "ND, ICMPv6 tabanlı NS/NA/RS/RA/Redirect mesajlarını kullanır."
  },
  {
    id: 268, topic: "M9_3", type: "tf",
    q: "Neighbor Solicitation mesajları broadcast kullanır.",
    answer: false,
    explain: "NS mesajları broadcast DEĞİL, özel multicast adresleri (Ethernet + IPv6) kullanır."
  },
  {
    id: 269, topic: "M9_3", type: "tf",
    q: "Router Advertisement (RA), yönlendiriciler tarafından yayınlanan bilgilendirme mesajlarıdır ve yönlendirici keşfi için kullanılır.",
    answer: true,
    explain: "RA yönlendiriciler tarafından yayınlanır ve yönlendirici keşfi sürecinde kullanılır."
  },
  {
    id: 270, topic: "M9_3", type: "tf",
    q: "ICMPv6 Redirect mesajları host'ların birbirini ARP'lamak için kullandığı mesajlardır.",
    answer: false,
    explain: "ICMPv6 Redirect mesajları yönlendiriciler tarafından daha iyi next-hop seçimi amacıyla kullanılır."
  },
  {
    id: 271, topic: "M9_3", type: "tf",
    q: "IPv6 adres çözümleme için ARP kullanmaz; Neighbor Discovery (ND) kullanır.",
    answer: true,
    explain: "IPv6 ARP yerine ND kullanır."
  },
  {
    id: 272, topic: "M9_3", type: "fill",
    q: "IPv6'da cihaz-cihaz adres çözümleme için kullanılan iki mesaj: Neighbor Solicitation ve ________.",
    answer: ["neighbor advertisement", "na"],
    explain: "Adres çözümleme: NS + NA."
  },
  {
    id: 273, topic: "M9_3", type: "fill",
    q: "IPv6'da yönlendirici keşfi için cihaz ________ mesajı (RS) ile sorar, yönlendirici ise RA ile yanıtlar.",
    answer: ["router solicitation", "rs"],
    explain: "Router discovery için RS/RA kullanılır."
  },
  {
    id: 274, topic: "M9_3", type: "fill",
    q: "IPv6'da yönlendiriciler daha iyi next-hop seçimi için ICMPv6 ________ mesajını kullanır.",
    answer: ["redirect"],
    explain: "Yönlendirme için ICMPv6 Redirect mesajları kullanılır."
  },
  {
    id: 275, topic: "M9_3", type: "fill",
    q: "IPv6'da adres çözümlemesi sağlayan protokol ________ (kısaltma).",
    answer: ["nd", "neighbor discovery"],
    explain: "Neighbor Discovery (ND)."
  },
  {
    id: 276, topic: "M9_3", type: "fill",
    q: "IPv6 ND, MAC çözümlemesi için mesajları özel Ethernet ve IPv6 ________ adresleri üzerinden gönderir.",
    answer: ["multicast"],
    explain: "Multicast adresleri kullanılır."
  },

  // Ek sorular - karma tekrar (özetler ve ince detaylar)
  {
    id: 300, topic: "M8_1", type: "mcq",
    q: "IP neden 'düşük ek yük' (low overhead) hedeflediği düşünülen bir protokoldür?",
    options: [
      "Büyük başlık alanları sayesinde",
      "Bağlantısız, best effort ve ortamdan bağımsız olduğu için",
      "TCP ile birleşik çalıştığı için",
      "QoS alanlarını zorunlu kıldığı için",
      "DHCP ile çalıştığı için"
    ],
    answer: 1,
    explain: "Bağlantısız, best effort ve ortamdan bağımsız yapısı IP'nin düşük ek yükünü sağlar."
  },
  {
    id: 301, topic: "M8_3", type: "mcq",
    q: "IPv6'daki 'Next Header' alanı IPv4'teki hangi alanın karşılığıdır?",
    options: ["TTL", "Protocol", "Differentiated Services", "Header Checksum", "Flags"],
    answer: 1,
    explain: "Next Header, IPv4'teki Protocol alanına karşılık gelir."
  },
  {
    id: 302, topic: "M8_5", type: "mcq",
    q: "Bir router yönlendirme tablosuna doğrudan bağlı rotanın eklenmesi için gereken iki koşul nedir?",
    options: [
      "Arayüzün etkin olması ve adresinin olması",
      "Yalnızca OSPF çalıştırılması",
      "DHCP'nin açık olması",
      "Yönetici tarafından elle tanımlanması",
      "Varsayılan rotanın olması"
    ],
    answer: 0,
    explain: "Directly connected rota için: arayüz aktif ve adreslenmiş olmalı."
  },
  {
    id: 303, topic: "M8_4", type: "mcq",
    q: "Modül özetine göre LAN'daki hangi cihazların DGW'ye ihtiyacı vardır?",
    options: [
      "Yalnızca sunucuların",
      "Yalnızca yönlendiricilerin",
      "Uzaktan trafik göndermek isteyen TÜM LAN cihazlarının",
      "Yalnızca switch'lerin",
      "Yalnızca DHCP sunucusunun"
    ],
    answer: 2,
    explain: "LAN'daki tüm cihazların uzaktan trafik göndermek istemeleri halinde DGW'ye ihtiyacı vardır."
  },
  {
    id: 304, topic: "M9_2", type: "mcq",
    q: "Cihaz bir çerçeve göndereceğinde ARP sürecinde sırasıyla ne yapar?",
    options: [
      "Önce ICMP ping atar, sonra MAC öğrenir",
      "ARP tablosunu arar, bulursa MAC'i kullanır; bulamazsa ARP request gönderir",
      "Yalnızca broadcast MAC kullanır",
      "DNS sorgusu yapar",
      "STP hesaplar"
    ],
    answer: 1,
    explain: "Önce ARP tablosunu arar; eşleşme varsa kullanır, yoksa ARP request gönderir."
  },
  {
    id: 305, topic: "M9_3", type: "mcq",
    q: "IPv6 ND'nin ICMPv6 kullanması, ARP ile karşılaştırıldığında temel hangi değişikliği ifade eder?",
    options: [
      "ARP'ta olduğu gibi broadcast kullanılır",
      "ICMPv6 tabanlı NS/NA mesajları multicast kullanarak daha verimli çalışır",
      "IPv6 ND yalnızca statik girişlerle çalışır",
      "ND yalnızca yönlendiricilerde çalışır",
      "ND fiziksel katman olayıdır"
    ],
    answer: 1,
    explain: "ICMPv6 tabanlı NS/NA multicast kullanır; ARP broadcast'e göre daha verimli çalışır."
  },
  {
    id: 306, topic: "M8_5", type: "mcq",
    q: "Statik rotaların dinamik protokollerle birlikte tipik kullanımı nedir?",
    options: [
      "Loopback tanımlamak için",
      "VLAN atamak için",
      "Bir varsayılan rotayı yapılandırmak için",
      "MAC tablolarını tutmak için",
      "DHCP rezervasyonu yapmak için"
    ],
    answer: 2,
    explain: "Statik rotalar çoğunlukla bir varsayılan rota yapılandırmak amacıyla dinamik protokollerle birlikte kullanılır."
  },
  {
    id: 307, topic: "M8_2", type: "mcq",
    q: "Bir protokolün birden fazla işlevi olabilir mi?",
    options: ["Hayır, her protokolün tek bir işlevi vardır", "Evet, bir veya daha fazla işlevi olabilir", "Yalnızca taşıma katmanı protokollerinde olur", "Yalnızca IPv6'da olur", "Yalnızca MAC düzeyinde olur"],
    answer: 1,
    explain: "Slayta göre protokollerin bir veya daha fazla işlevi olabilir."
  },
  {
    id: 308, topic: "M8_3", type: "mcq",
    q: "IPv4'ün uçtan uca bağlantı eksikliğine çözüm olarak hangi geçici yaklaşım kullanılmıştır?",
    options: [
      "DHCP",
      "NAT + Özel (Private) adresleme",
      "IPv6 tüneli",
      "DNS",
      "STP"
    ],
    answer: 1,
    explain: "IPv4'ün ömrünü uzatmak için özel adresleme ve NAT kullanılmıştır."
  },
  {
    id: 309, topic: "M8_3", type: "mcq",
    q: "NAT neden bir yan etki olarak problem yaratır?",
    options: [
      "Ağ katmanı başlığındaki adreslemeyi manipüle ettiği için gecikmeye ve sorun giderme zorluklarına yol açar",
      "Veri bağı katmanını devre dışı bırakır",
      "Yalnızca IPv6'da çalışır",
      "Fragmentation'ı zorlar",
      "Yönlendirmeyi kapatır"
    ],
    answer: 0,
    explain: "NAT ağ başlıklarındaki adreslemeyi değiştirdiği için latency ve troubleshooting sorunlarına yol açar."
  },
  {
    id: 310, topic: "M8_4", type: "mcq",
    q: "Aşağıdaki hedef türlerinden hangisi bir host'un paket gönderebildiği türlerden biri DEĞİLDİR?",
    options: ["Kendisi (loopback)", "Yerel host (aynı LAN)", "Uzak host (farklı LAN)", "Farklı bir OS çekirdeği"],
    answer: 3,
    explain: "Host paket gönderebileceği üç tür: kendisi, yerel host, uzak host."
  },
  {
    id: 311, topic: "M9_2", type: "mcq",
    q: "ARP tablosunda giriş bulunmasının sonucu ne olur?",
    options: [
      "Çerçevenin hedef MAC alanı eşleşen MAC ile doldurulur",
      "Paket düşürülür",
      "ARP request gönderilir",
      "Broadcast yapılır",
      "DHCP çağrılır"
    ],
    answer: 0,
    explain: "Eşleşme varsa karşılık gelen MAC çerçevenin hedef MAC'i olarak kullanılır."
  },
  {
    id: 312, topic: "M8_1", type: "mcq",
    q: "IP güvenilmez (unreliable) olduğuna göre, güvenilirlik gereken iletişimlerde hangi katman bu işi üstlenir?",
    options: [
      "Fiziksel katman",
      "Veri bağı katmanı",
      "Taşıma katmanı (TCP gibi)",
      "Ağ katmanı IPv6",
      "Oturum katmanı"
    ],
    answer: 2,
    explain: "Güvenilirlik gereken durumlarda taşıma katmanı (örn. TCP) üstlenir."
  },
  {
    id: 313, topic: "M9_1", type: "mcq",
    q: "Hedef IP adresi yerel ağda olduğunda, çerçevenin hedef MAC alanı tipik olarak nereden bulunur?",
    options: [
      "Yönlendirme tablosundan",
      "ARP tablosundan (veya gerekirse ARP ile çözümlenerek)",
      "DNS cache'ten",
      "STP tablosundan",
      "VLAN tablosundan"
    ],
    answer: 1,
    explain: "Yerel hedef MAC, ARP tablosundan bulunur (yoksa ARP request ile çözülür)."
  },
  {
    id: 314, topic: "M8_3", type: "mcq",
    q: "Aşağıdakilerden hangisi IPv6 header alanları arasında YOKTUR?",
    options: ["Version", "Traffic Class", "Flow Label", "Header Checksum", "Hop Limit"],
    answer: 3,
    explain: "IPv6 başlığında Header Checksum YOKTUR; kaldırılmıştır."
  },
  {
    id: 315, topic: "M8_5", type: "mcq",
    q: "Modül özetine göre, yönlendirici hedef ağ için karar verirken hangi eşleşmeyi kullanır?",
    options: [
      "En kısa maskeli eşleşme",
      "Sadece varsayılan rota",
      "En uzun subnet mask / prefix eşleşmesi",
      "Rastgele eşleşme",
      "İlk sıradaki statik rota"
    ],
    answer: 2,
    explain: "Yönlendirici en uzun subnet mask / prefix eşleşmesini seçer."
  },
  {
    id: 316, topic: "M9_3", type: "mcq",
    q: "IPv6 ND'nin ARP'a üstünlük sağlayan en önemli faktörlerinden biri aşağıdakilerden hangisidir?",
    options: [
      "ARP'ın desteklediği özellikleri aynen kullanır",
      "Broadcast yerine multicast kullanır",
      "Yalnızca kablo ortamında çalışır",
      "Yalnızca statik girişler kullanır",
      "L3'te çalışmaz"
    ],
    answer: 1,
    explain: "ARP broadcast kullanırken, IPv6 ND multicast adreslerini kullanır."
  },
  {
    id: 317, topic: "M8_1", type: "mcq",
    q: "Sıra dışı gelen IP paketlerini yeniden sıralamak IP'nin sorumluluğunda mıdır?",
    options: [
      "Evet, her zaman",
      "Hayır, bu iş için başka protokollere dayanır",
      "Yalnızca IPv6'da",
      "Yalnızca kablosuz ortamda",
      "Yalnızca yerel trafik için"
    ],
    answer: 1,
    explain: "IP sıra dışı paketleri yeniden sıralayamaz; bu iş için başka protokollere (örn. TCP) dayanır."
  },
  {
    id: 318, topic: "M8_4", type: "mcq",
    q: "Bir host için varsayılan ağ geçidi yönlendirme tablosunda ne şekilde bulunur?",
    options: [
      "Özel dinamik rota olarak",
      "Statik son çare rotası olarak",
      "Loopback olarak",
      "VLAN olarak",
      "Broadcast rota olarak"
    ],
    answer: 1,
    explain: "DGW yönlendirme tablosunda statik son çare (last resort) rotasıdır."
  },
  {
    id: 319, topic: "M9_2", type: "mcq",
    q: "ARP request'inin yapısı gereği aşağıdakilerden hangisi gerçekleşir?",
    options: [
      "Yalnızca switch'ler işler",
      "Yerel ağdaki tüm cihazlar alır ve işler",
      "Sadece router işler",
      "Sadece DHCP sunucusu işler",
      "Sadece hedef cihaz alır"
    ],
    answer: 1,
    explain: "ARP request broadcast olduğu için yerel ağdaki tüm cihazlar alır ve işler."
  },
  {
    id: 320, topic: "M8_5", type: "mcq",
    q: "`show ip route` komutu Modül 8'e göre aşağıdaki rota türlerinden hangisini görüntülemez?",
    options: [
      "Doğrudan bağlı (C, L)",
      "Statik rota (S)",
      "OSPF (O)",
      "EIGRP (D)",
      "MAC-IP eşleme tablosu"
    ],
    answer: 4,
    explain: "MAC-IP eşleme tablosu ARP tablosudur; `show ip route` rotaları gösterir."
  },

  // =========================================================
  // MODÜL 1.1 - AĞLAR HAYATIMIZI ETKİLİYOR
  // =========================================================
  { id: 401, topic: "M1_1", type: "tf",
    q: "Modül 1'e göre iletişim günümüzde hava, su, yiyecek ve barınmaya olan bağımlılığımız kadar önemlidir.",
    answer: true,
    explain: "Slayt 'Communication is almost as important to us as our reliance on air, water, food, and shelter' der."
  },
  { id: 402, topic: "M1_1", type: "mcq",
    q: "Slaytta ağların dünyayı sunduğu özellik olarak hangisi vurgulanır?",
    options: ["Sınırların olduğu bir dünya", "Sınırsız bir dünya ve küresel topluluklar", "Yalnızca yerel iletişim", "Sadece dosya paylaşımı"],
    answer: 1,
    explain: "Slayt 'World without boundaries / Global communities / Human network' der."
  },
  { id: 403, topic: "M1_1", type: "fill",
    q: "Ağlar sayesinde oluşan küresel iletişim ağı slaytta ____ network olarak adlandırılır.",
    answer: ["human", "insan"],
    explain: "Slayt: Human network."
  },

  // =========================================================
  // MODÜL 1.2 - AĞ BİLEŞENLERİ
  // =========================================================
  { id: 410, topic: "M1_2", type: "mcq",
    q: "Bir ağdaki her bilgisayar ne olarak adlandırılır?",
    options: ["Router", "Host / uç cihaz", "Switch", "Hub"],
    answer: 1,
    explain: "Slayt: 'Every computer on a network is called a host or end device.'"
  },
  { id: 411, topic: "M1_2", type: "mcq",
    q: "Modül 1'e göre aşağıdakilerden hangisi bir sunucu (server) örneği DEĞİLDİR?",
    options: ["E-mail server", "Web server", "File server", "Client"],
    answer: 3,
    explain: "Client istekte bulunan cihazdır; server hizmet sağlar."
  },
  { id: 412, topic: "M1_2", type: "tf",
    q: "Peer-to-Peer (P2P) ağlarda bir cihaz aynı anda hem client hem server olabilir.",
    answer: true,
    explain: "Slayt P2P'yi tam olarak böyle tanımlar; yalnızca küçük ağlar için önerilir."
  },
  { id: 413, topic: "M1_2", type: "mcq",
    q: "Peer-to-Peer ağların slaytta belirtilen DEZAVANTAJI nedir?",
    options: ["Pahalı olması", "Merkezi yönetim olmaması", "Kurulumun zor olması", "Performansının çok yüksek olması"],
    answer: 1,
    explain: "Dezavantajlar: no centralized administration, not as secure, not scalable, slower performance."
  },
  { id: 414, topic: "M1_2", type: "mcq",
    q: "Aşağıdakilerden hangisi bir ara (intermediary) cihaz örneği değildir?",
    options: ["Switch", "Wireless access point", "Router", "Sunucu"],
    answer: 3,
    explain: "Switch, AP, router ve firewall ara cihazdır; sunucu uç (end) cihazdır."
  },
  { id: 415, topic: "M1_2", type: "mcq",
    q: "Ara cihazların görevlerinden biri DEĞİLDİR?",
    options: ["Veri sinyallerini yeniden üretme/iletme", "Ağdaki yolları tutma", "Hata bildirme", "Verileri uygulama katmanında yorumlama"],
    answer: 3,
    explain: "Slayta göre: regenerate/retransmit, maintain pathways, notify errors. Uygulama yorumlama bunların arasında değildir."
  },
  { id: 416, topic: "M1_2", type: "mcq",
    q: "Aşağıdakilerden hangisi bir ağ medyası türü değildir?",
    options: ["Kablo içindeki metal teller", "Fiber-optik cam/plastik lif", "Kablosuz iletim", "Mantıksal topoloji"],
    answer: 3,
    explain: "Medya tipleri: metal wires, fiber optic, wireless. Mantıksal topoloji bir medya değildir."
  },
  { id: 417, topic: "M1_2", type: "fill",
    q: "Metal teller ____ impulses (elektriksel dürtüler) kullanır.",
    answer: ["electrical", "elektriksel", "elektrik"],
    explain: "Slayta göre metal teller electrical impulses kullanır."
  },
  { id: 418, topic: "M1_2", type: "tf",
    q: "Fiber-optik kablolar ışık darbeleri (pulses of light) kullanır.",
    answer: true,
    explain: "Slayt: 'Uses pulses of light.'"
  },

  // =========================================================
  // MODÜL 1.3 - AĞ GÖSTERİMLERİ VE TOPOLOJİLER
  // =========================================================
  { id: 420, topic: "M1_3", type: "mcq",
    q: "Modül 1'de belirtilen iki topoloji diyagramı türü nedir?",
    options: ["Fiziksel ve mantıksal", "Dahili ve harici", "Küçük ve büyük", "Kablolu ve kablosuz"],
    answer: 0,
    explain: "Physical topology ve logical topology diyagramları."
  },
  { id: 421, topic: "M1_3", type: "mcq",
    q: "Mantıksal topoloji diyagramı neyi gösterir?",
    options: ["Sadece kablo döşemesini", "Cihazları, portları ve adresleme şemasını", "Yalnızca bina yerleşimini", "Sadece fiber hatlarını"],
    answer: 1,
    explain: "Logical topology diagrams illustrate devices, ports, and the addressing scheme of the network."
  },
  { id: 422, topic: "M1_3", type: "mcq",
    q: "Fiziksel topoloji diyagramı neyi gösterir?",
    options: ["Ara cihazların fiziksel konumunu ve kablo yerleşimini", "Sadece IP adreslerini", "Sadece VLAN yapılarını", "Sadece bandwidth"],
    answer: 0,
    explain: "Physical topology diagrams illustrate physical location of intermediary devices and cable installation."
  },
  { id: 423, topic: "M1_3", type: "fill",
    q: "Bir cihazı ağa bağlayan fiziksel kart ____ (NIC) olarak adlandırılır.",
    answer: ["Network Interface Card", "NIC", "ağ arayüz kartı"],
    explain: "Network Interface Card (NIC)."
  },
  { id: 424, topic: "M1_3", type: "tf",
    q: "Port ve interface terimleri slayta göre çoğunlukla birbirinin yerine kullanılır.",
    answer: true,
    explain: "Slayt: 'the terms port and interface are used interchangeably.'"
  },

  // =========================================================
  // MODÜL 1.4 - YAYGIN AĞ TÜRLERİ
  // =========================================================
  { id: 430, topic: "M1_4", type: "mcq",
    q: "Modül 1'e göre aşağıdakilerden hangisi ağ boyutlarına örnek DEĞİLDİR?",
    options: ["Küçük ev ağı", "SOHO", "Orta/büyük ağ", "Kuantum ağı"],
    answer: 3,
    explain: "Örnekler: small home, SOHO, medium/large, world wide."
  },
  { id: 431, topic: "M1_4", type: "mcq",
    q: "LAN ve WAN arasındaki farkı EN iyi tanımlayan ifade hangisidir?",
    options: [
      "LAN ve WAN aynıdır",
      "LAN sınırlı bir coğrafi alanı, WAN geniş coğrafi alanı kapsar",
      "LAN sadece kablosuzdur",
      "WAN yalnızca tek bir organizasyon tarafından yönetilir"
    ],
    answer: 1,
    explain: "LAN küçük coğrafi alan, WAN geniş coğrafi alan."
  },
  { id: 432, topic: "M1_4", type: "tf",
    q: "LAN genellikle tek bir organizasyon veya kişi tarafından yönetilir.",
    answer: true,
    explain: "Slayta göre LAN 'Administered by a single organization or individual.'"
  },
  { id: 433, topic: "M1_4", type: "tf",
    q: "WAN tipik olarak LAN'lara kıyasla daha yüksek hız sağlar.",
    answer: false,
    explain: "Slayt: WAN 'Typically provide slower speed links between LANs.'"
  },
  { id: 434, topic: "M1_4", type: "mcq",
    q: "İnternetin yapısını korumak için kurulan kuruluşlardan hangisi slaytta BELİRTİLMEMİŞTİR?",
    options: ["IETF", "ICANN", "IAB", "ISO"],
    answer: 3,
    explain: "İnternet için IETF, ICANN, IAB örnek verilir."
  },
  { id: 435, topic: "M1_4", type: "mcq",
    q: "İntranet ve extranet arasındaki temel fark nedir?",
    options: [
      "İntranet internet üzerindedir, extranet değildir",
      "İntranet yalnızca organizasyon üyelerine; extranet ise organizasyon dışı yetkili kişilere erişim sağlar",
      "Extranet sadece kablosuzdur",
      "Her ikisi aynı şeydir"
    ],
    answer: 1,
    explain: "Intranet → organizasyon içi; Extranet → yetkili dış kullanıcılara."
  },
  { id: 436, topic: "M1_4", type: "fill",
    q: "Dünyadaki birbirine bağlı LAN ve WAN'ların oluşturduğu dünya çapında koleksiyon ____ olarak adlandırılır.",
    answer: ["internet", "İnternet"],
    explain: "'The internet is a worldwide collection of interconnected LANs and WANs.'"
  },

  // =========================================================
  // MODÜL 1.5 - İNTERNET BAĞLANTILARI
  // =========================================================
  { id: 440, topic: "M1_5", type: "mcq",
    q: "Aşağıdakilerden hangisi ev/SOHO internet bağlantısı örneğidir?",
    options: ["Leased Line", "Cable", "Metro Ethernet", "Ethernet WAN"],
    answer: 1,
    explain: "SOHO için Cable, DSL, Cellular, Satellite, Dial-up. Leased Line/Metro Ethernet işletme bağlantılarıdır."
  },
  { id: 441, topic: "M1_5", type: "mcq",
    q: "DSL bağlantısı nedir?",
    options: [
      "Yüksek bant genişliğine sahip, telefon hattı üzerinden çalışan, always-on internet bağlantısı",
      "Kablo TV şebekesi üzerinden internet",
      "Uydu üzerinden sağlanan geniş bant",
      "Çevirmeli, modem kullanan düşük bant"
    ],
    answer: 0,
    explain: "DSL: telefon hattı üzerinden yüksek bant, always-on."
  },
  { id: 442, topic: "M1_5", type: "mcq",
    q: "Uydu (satellite) bağlantısının en önemli avantajı nedir?",
    options: [
      "Her zaman en ucuzu olması",
      "ISP bulunmayan kırsal alanlar için büyük fayda sağlaması",
      "En düşük gecikmeye sahip olması",
      "Fiber ile aynı hızda olması"
    ],
    answer: 1,
    explain: "'Major benefit to rural areas without ISPs.'"
  },
  { id: 443, topic: "M1_5", type: "mcq",
    q: "Aşağıdakilerden hangisi işletme (business) internet bağlantısı türlerindendir?",
    options: ["Dial-up", "Dedicated Leased Line", "Sadece Cellular", "Bluetooth"],
    answer: 1,
    explain: "Business: Dedicated Leased Line, Ethernet WAN, Business DSL, Satellite."
  },
  { id: 444, topic: "M1_5", type: "tf",
    q: "Converged networks ses, veri ve videoyu aynı altyapı üzerinden taşır.",
    answer: true,
    explain: "Slayt: converged networks can deliver data, voice, and video over the same network infrastructure."
  },
  { id: 445, topic: "M1_5", type: "fill",
    q: "Kiralık hat (Dedicated Leased Line) servis sağlayıcının ağında uzak ofisler arasında ____ devrelerdir.",
    answer: ["reserved", "ayrılmış"],
    explain: "'Reserved circuits within the service provider’s network.'"
  },

  // =========================================================
  // MODÜL 1.6 - GÜVENİLİR AĞLAR
  // =========================================================
  { id: 450, topic: "M1_6", type: "mcq",
    q: "Güvenilir (reliable) bir ağ mimarisinin dört temel özelliği aşağıdakilerden hangisidir?",
    options: [
      "Hızlı, kısa, ucuz, uzak",
      "Fault Tolerance, Scalability, QoS, Security",
      "TCP, UDP, IP, ICMP",
      "ARP, DNS, DHCP, NAT"
    ],
    answer: 1,
    explain: "Slayta göre 4 özellik: Fault Tolerance, Scalability, Quality of Service (QoS), Security."
  },
  { id: 451, topic: "M1_6", type: "mcq",
    q: "Paket anahtarlamalı (packet-switched) ağ güvenilir ağa nasıl katkı sağlar?",
    options: [
      "Tek bir yol kullanır",
      "Trafiği paketlere ayırır; her paket farklı yolu izleyebilir (fault tolerance)",
      "Circuit-switched'e dönüştürür",
      "Güvenliği tek başına sağlar"
    ],
    answer: 1,
    explain: "Packet switching paketleri farklı yollara gönderebilerek fault tolerance sağlar."
  },
  { id: 452, topic: "M1_6", type: "tf",
    q: "Ölçeklenebilir (scalable) bir ağ, mevcut kullanıcıların hizmet performansını etkilemeden genişleyebilir.",
    answer: true,
    explain: "Slayt: 'without impacting the performance of services to existing users.'"
  },
  { id: 453, topic: "M1_6", type: "mcq",
    q: "QoS'un birincil amacı nedir?",
    options: [
      "Tüm paketleri şifrelemek",
      "Tüm kullanıcılar için içeriklerin güvenilir teslimini sağlamak (ses/video gibi)",
      "Donanım hatası düzeltmek",
      "MAC adreslerini yönetmek"
    ],
    answer: 1,
    explain: "QoS 'primary mechanism used to ensure reliable delivery of content.'"
  },
  { id: 454, topic: "M1_6", type: "mcq",
    q: "Ağ güvenliğinin 3 hedefi slaytta nelerdir?",
    options: [
      "Confidentiality, Integrity, Availability",
      "Hız, Güç, Bant",
      "Sürüm, Boyut, Renk",
      "Unicast, Multicast, Broadcast"
    ],
    answer: 0,
    explain: "CIA triad: gizlilik, bütünlük, erişilebilirlik."
  },
  { id: 455, topic: "M1_6", type: "fill",
    q: "Verinin iletim sırasında değiştirilmediğinden emin olma hedefi ____ olarak adlandırılır.",
    answer: ["Integrity", "bütünlük"],
    explain: "Integrity: data has not been altered with during transmission."
  },

  // =========================================================
  // MODÜL 1.7 - AĞ TRENDLERİ
  // =========================================================
  { id: 460, topic: "M1_7", type: "mcq",
    q: "BYOD neyi ifade eder?",
    options: [
      "Bring Your Own Device",
      "Backup Your Own Data",
      "Broadcast Your Own Device",
      "Basic Yearly Online Data"
    ],
    answer: 0,
    explain: "BYOD = Bring Your Own Device."
  },
  { id: 461, topic: "M1_7", type: "tf",
    q: "BYOD 'any device, with any ownership, used anywhere' olarak tanımlanır.",
    answer: true,
    explain: "Slaytta tam bu ifade geçer."
  },
  { id: 462, topic: "M1_7", type: "mcq",
    q: "Cisco WebEx Teams aşağıdakilerden hangisini yapmaz (slayta göre)?",
    options: ["Anlık mesajlaşma", "Görüntü paylaşımı", "Video/link paylaşımı", "Donanım üretimi"],
    answer: 3,
    explain: "Slaytta IM, image/video/link paylaşımı anlatılır; donanım üretimi yok."
  },
  { id: 463, topic: "M1_7", type: "mcq",
    q: "Bulut bilişim türlerinden hangisi belirli bir sektör (örn. sağlık) için inşa edilir?",
    options: ["Public", "Private", "Hybrid", "Custom"],
    answer: 3,
    explain: "Custom Cloud: belirli sektör için inşa edilir."
  },
  { id: 464, topic: "M1_7", type: "mcq",
    q: "Slaytta belirtilen dört bulut türü hangileridir?",
    options: [
      "Public, Private, Hybrid, Custom",
      "Open, Closed, Public, Secure",
      "Big, Small, Fast, Slow",
      "Red, Blue, Green, Yellow"
    ],
    answer: 0,
    explain: "Four types of Clouds: Public, Private, Hybrid, Custom."
  },
  { id: 465, topic: "M1_7", type: "tf",
    q: "Powerline networking, elektrik prizinden belirli frekanslarda veri göndererek LAN bağlantısı sağlar.",
    answer: true,
    explain: "Slayt: 'devices can connect to the LAN wherever there is an electrical outlet by sending data on certain frequencies.'"
  },
  { id: 466, topic: "M1_7", type: "fill",
    q: "Kırsal alanlarda kullanıcıları belirlenen erişim noktalarına bağlayan ISP türü ____ olarak adlandırılır.",
    answer: ["WISP", "Wireless ISP"],
    explain: "Wireless Internet Service Provider (WISP)."
  },

  // =========================================================
  // MODÜL 1.8 - AĞ GÜVENLİĞİ
  // =========================================================
  { id: 470, topic: "M1_8", type: "mcq",
    q: "Aşağıdakilerden hangisi bir DIŞ tehdit (external threat) örneğidir?",
    options: ["Kaybolan cihaz", "Virüs/Trojan", "Çalışanın yanlışlıkla yaptığı hata", "Kötü niyetli çalışan"],
    answer: 1,
    explain: "Dış tehditler: viruses, worms, trojans, spyware, DoS, vb."
  },
  { id: 471, topic: "M1_8", type: "mcq",
    q: "Aşağıdakilerden hangisi bir İÇ tehdit (internal threat) örneğidir?",
    options: [
      "Zero-day saldırı",
      "Kimlik hırsızlığı (kimlik bilgisi çalma)",
      "Kaybolan/çalınan cihaz",
      "Worm"
    ],
    answer: 2,
    explain: "İç tehditler: lost/stolen devices, accidental misuse, malicious employees."
  },
  { id: 472, topic: "M1_8", type: "mcq",
    q: "Ev/küçük ofis ağında temel güvenlik bileşenleri nelerdir?",
    options: [
      "Antivirüs/antispyware ve firewall filtreleme",
      "IPS ve VPN gerekli",
      "ACL gerekli",
      "Dedicated firewall gerekli"
    ],
    answer: 0,
    explain: "Home/small office: antivirus/antispyware ve firewall filtering."
  },
  { id: 473, topic: "M1_8", type: "mcq",
    q: "Büyük ağlarda eklenen ek güvenlik gereksinimlerinden hangisi DEĞİLDİR?",
    options: ["Dedicated firewall sistemi", "ACL", "IPS", "P2P yazılımı"],
    answer: 3,
    explain: "Büyük ağlar için: Dedicated firewall, ACL, IPS, VPN."
  },
  { id: 474, topic: "M1_8", type: "fill",
    q: "Ağda izinsiz erişimi engellemek için kullanılan filtreleme bileşeni ____ olarak adlandırılır.",
    answer: ["firewall", "güvenlik duvarı"],
    explain: "Firewall filtering used to block unauthorized access."
  },
  { id: 475, topic: "M1_8", type: "tf",
    q: "Ağ güvenliğinin iki ana türü 'ağ altyapısı güvenliği' ve 'bilgi güvenliği' olarak belirtilmiştir.",
    answer: true,
    explain: "Slayta göre: Network infrastructure security ve Information Security."
  },

  // =========================================================
  // MODÜL 1.9 - BT PROFESYONELİ
  // =========================================================
  { id: 480, topic: "M1_9", type: "mcq",
    q: "CCNA sertifikasının odak alanlarından olmayan hangisidir (slayta göre)?",
    options: ["IP foundation", "Security", "Wireless/virtualization/automation", "Ağ donanım satış pazarlama"],
    answer: 3,
    explain: "CCNA: IP foundation, security, wireless, virtualization, automation, programmability."
  },
  { id: 481, topic: "M1_9", type: "fill",
    q: "Cisco'nun yazılım geliştirme becerilerini doğrulayan yeni sertifika ailesi ____ olarak adlandırılır.",
    answer: ["DevNet"],
    explain: "New DevNet certifications at associate/specialist/professional levels."
  },
  { id: 482, topic: "M1_9", type: "tf",
    q: "CCNA temel teknolojilerin bilgisine sahip olduğunuzu kanıtlayan bir sertifikasyondur.",
    answer: true,
    explain: "Slayt: 'demonstrates that you have a knowledge of foundational technologies.'"
  },

  // =========================================================
  // MODÜL 2.1 - CISCO IOS ERİŞİMİ
  // =========================================================
  { id: 500, topic: "M2_1", type: "mcq",
    q: "Shell, Kernel ve Hardware arasındaki ilişki için hangisi doğrudur?",
    options: [
      "Shell kullanıcı arayüzü; Kernel donanım-yazılım arası iletişim; Hardware fiziksel parça",
      "Kernel kullanıcı arayüzü; Shell donanım yönetir",
      "Hardware komutları yorumlar",
      "Shell donanımı doğrudan kontrol eder"
    ],
    answer: 0,
    explain: "Slayt: Shell=UI, Kernel=HW-SW iletişim, Hardware=fiziksel bileşen."
  },
  { id: 501, topic: "M2_1", type: "mcq",
    q: "Ağ cihazlarına uzaktan bağlantıda ÖNERİLEN yöntem hangisidir?",
    options: ["Telnet", "SSH", "HTTP", "FTP"],
    answer: 1,
    explain: "SSH recommended method for remote CLI access."
  },
  { id: 502, topic: "M2_1", type: "tf",
    q: "Telnet kullanıcı adı, parola ve komutları ağda düz metin (plaintext) olarak gönderir.",
    answer: true,
    explain: "Slayt: 'User authentication, passwords and commands are sent over the network in plaintext.'"
  },
  { id: 503, topic: "M2_1", type: "mcq",
    q: "İlk yapılandırma için kullanılan, fiziksel bir yönetim portu olan erişim yöntemi hangisidir?",
    options: ["SSH", "Telnet", "Console", "HTTPS"],
    answer: 2,
    explain: "Console: fiziksel yönetim portu, ilk yapılandırma için."
  },
  { id: 504, topic: "M2_1", type: "mcq",
    q: "Aşağıdakilerden hangisi bir terminal emülasyon programı değildir?",
    options: ["PuTTY", "Tera Term", "SecureCRT", "Wireshark"],
    answer: 3,
    explain: "PuTTY, Tera Term, SecureCRT emülatördür; Wireshark paket yakalama aracıdır."
  },
  { id: 505, topic: "M2_1", type: "fill",
    q: "GUI, kullanıcının sistemle grafiksel ikon, menü ve ____ aracılığıyla etkileşmesine izin verir.",
    answer: ["windows", "pencereler"],
    explain: "Graphical icons, menus, and windows."
  },

  // =========================================================
  // MODÜL 2.2 - IOS GEZINME (MODLAR)
  // =========================================================
  { id: 510, topic: "M2_2", type: "mcq",
    q: "User EXEC modu komut satırı sembolü nedir?",
    options: ["#", ">", "$", "%"],
    answer: 1,
    explain: "User EXEC mod '>' ile biter."
  },
  { id: 511, topic: "M2_2", type: "mcq",
    q: "Privileged EXEC modu komut satırı sembolü nedir?",
    options: ["#", ">", "!", "~"],
    answer: 0,
    explain: "Privileged EXEC mod '#' ile biter."
  },
  { id: 512, topic: "M2_2", type: "fill",
    q: "User EXEC modundan Privileged EXEC moduna geçmek için ____ komutu kullanılır.",
    answer: ["enable"],
    explain: "`enable` komutu."
  },
  { id: 513, topic: "M2_2", type: "fill",
    q: "Privileged EXEC modundan Global Configuration moduna geçmek için ____ komutu kullanılır.",
    answer: ["configure terminal", "conf t", "conf term"],
    explain: "`configure terminal` (kısaltma: conf t)."
  },
  { id: 514, topic: "M2_2", type: "mcq",
    q: "Herhangi bir alt-konfigürasyon modundan doğrudan Privileged EXEC moda dönmek için hangisi kullanılır?",
    options: ["exit", "end veya Ctrl+Z", "disable", "logout"],
    answer: 1,
    explain: "`end` ya da Ctrl+Z."
  },
  { id: 515, topic: "M2_2", type: "tf",
    q: "Line Configuration modu console, SSH, Telnet veya AUX erişimini yapılandırmak için kullanılır.",
    answer: true,
    explain: "Line config modu: console, SSH, Telnet, AUX access."
  },
  { id: 516, topic: "M2_2", type: "mcq",
    q: "Bir switch portunu veya router arayüzünü yapılandırmak için kullanılan mod hangisidir?",
    options: ["Global config", "Line config", "Interface config", "User EXEC"],
    answer: 2,
    explain: "Interface Configuration Mode."
  },

  // =========================================================
  // MODÜL 2.3 - KOMUT YAPISI
  // =========================================================
  { id: 520, topic: "M2_3", type: "mcq",
    q: "IOS komut yapısında 'keyword' nedir?",
    options: [
      "Kullanıcı tarafından tanımlanan değişken",
      "İşletim sisteminde önceden tanımlanmış belirli bir parametre",
      "Sadece şifre",
      "Rastgele bir sayı"
    ],
    answer: 1,
    explain: "Keyword: işletim sisteminde tanımlı belirli parametre."
  },
  { id: 521, topic: "M2_3", type: "mcq",
    q: "Komut sözdiziminde [x] ne anlama gelir?",
    options: ["Zorunlu keyword", "İsteğe bağlı element", "Liste", "Kullanıcı parolası"],
    answer: 1,
    explain: "Köşeli parantez [x] isteğe bağlı elementtir."
  },
  { id: 522, topic: "M2_3", type: "mcq",
    q: "Komut sözdiziminde {x} ne anlama gelir?",
    options: ["İsteğe bağlı", "Gerekli (required) element", "Yorum", "Boşluk"],
    answer: 1,
    explain: "Süslü parantez {x} gerekli elementi belirtir."
  },
  { id: 523, topic: "M2_3", type: "fill",
    q: "Girilen bir komutun doğru biçimlendirilip biçimlendirilmediğini denetleyen özellik ____ check'tir.",
    answer: ["Command syntax", "syntax"],
    explain: "Command syntax check."
  },
  { id: 524, topic: "M2_3", type: "mcq",
    q: "Kısmi bir komut adını tamamlamak için kullanılan kısayol tuşu nedir?",
    options: ["Esc", "Tab", "Backspace", "Enter"],
    answer: 1,
    explain: "Tab: Completes a partial command name entry."
  },
  { id: 525, topic: "M2_3", type: "mcq",
    q: "Herhangi bir konfigürasyon modundan Privileged EXEC moda dönmek için kullanılan kısayol hangi ikilidir?",
    options: ["Ctrl-C veya Ctrl-Z", "Ctrl-A", "Alt+F4", "Shift+Ins"],
    answer: 0,
    explain: "Ctrl-C ve Ctrl-Z config modundan çıkarır."
  },
  { id: 526, topic: "M2_3", type: "mcq",
    q: "DNS sorgusu, traceroute, ping gibi işlemleri iptal etmek için hangi tuş kombinasyonu kullanılır?",
    options: ["Ctrl-Shift-6", "Ctrl-B", "Ctrl-R", "Ctrl-P"],
    answer: 0,
    explain: "Ctrl-Shift-6: all-purpose break sequence."
  },
  { id: 527, topic: "M2_3", type: "tf",
    q: "'configure' komutu 'conf' olarak kısaltılabilir çünkü conf ile başlayan tek komuttur.",
    answer: true,
    explain: "Slayta göre kısaltma benzersizse kabul edilir."
  },

  // =========================================================
  // MODÜL 2.4 - TEMEL CİHAZ YAPILANDIRMASI
  // =========================================================
  { id: 530, topic: "M2_4", type: "mcq",
    q: "Cihaz hostname kuralı olarak hangisi YANLIŞTIR?",
    options: [
      "Harfle başlamalı",
      "Boşluk içerebilir",
      "Harf veya rakamla bitmeli",
      "64 karakterden kısa olmalı"
    ],
    answer: 1,
    explain: "Kurallar: letter başla, boşluk YOK, letter/digit bitir, yalnızca harf/rakam/tire, <64 karakter."
  },
  { id: 531, topic: "M2_4", type: "fill",
    q: "Privileged EXEC modunu parola ile korumak için kullanılan komut ____ password'dür.",
    answer: ["enable secret", "enable secret password"],
    explain: "`enable secret password`."
  },
  { id: 532, topic: "M2_4", type: "mcq",
    q: "Console erişimini parola ile korumak için hangi adımlar sırasıyla yapılır?",
    options: [
      "line console 0 → password → login",
      "enable secret → login",
      "line vty 0 15 → shutdown",
      "banner motd → password"
    ],
    answer: 0,
    explain: "line console 0 → password password → login."
  },
  { id: 533, topic: "M2_4", type: "tf",
    q: "VTY hatları Telnet/SSH ile uzaktan erişim sağlar; Cisco switchlerde 0-15 arası 16 VTY hattı olabilir.",
    answer: true,
    explain: "Slaytta belirtilmiştir."
  },
  { id: 534, topic: "M2_4", type: "mcq",
    q: "Tüm düz metin parolaları şifrelemek için hangi global config komutu kullanılır?",
    options: [
      "service password-encryption",
      "enable secret",
      "password-encrypt",
      "encryption all"
    ],
    answer: 0,
    explain: "`service password-encryption`."
  },
  { id: 535, topic: "M2_4", type: "fill",
    q: "Günün mesajı banner'ını yapılandıran komut: banner ____ # mesaj # şeklindedir.",
    answer: ["motd"],
    explain: "`banner motd # ... #`."
  },
  { id: 536, topic: "M2_4", type: "mcq",
    q: "Banner motd komutundaki '#' karakterinin slayttaki adı nedir?",
    options: ["Ayraç (delimiting character)", "Sabit", "Diyez", "Yorum"],
    answer: 0,
    explain: "'#' = delimiting character."
  },

  // =========================================================
  // MODÜL 2.5 - YAPILANDIRMAYI KAYDETME
  // =========================================================
  { id: 540, topic: "M2_5", type: "mcq",
    q: "Running-config hangi bellek türünde tutulur?",
    options: ["NVRAM", "Flash", "RAM", "ROM"],
    answer: 2,
    explain: "Running-config RAM'de; volatile."
  },
  { id: 541, topic: "M2_5", type: "mcq",
    q: "Startup-config hangi bellek türünde tutulur?",
    options: ["NVRAM", "RAM", "CPU cache", "SDRAM"],
    answer: 0,
    explain: "Startup-config NVRAM'de; non-volatile."
  },
  { id: 542, topic: "M2_5", type: "fill",
    q: "Running-config dosyasını startup-config olarak kaydetmek için kullanılan komut ____ 'tur.",
    answer: ["copy running-config startup-config", "copy run start", "copy running startup"],
    explain: "`copy running-config startup-config`."
  },
  { id: 543, topic: "M2_5", type: "mcq",
    q: "Startup-config dosyasını silmek için hangi komut kullanılır?",
    options: ["erase startup-config", "delete running-config", "no startup", "format flash"],
    answer: 0,
    explain: "`erase startup-config`."
  },
  { id: 544, topic: "M2_5", type: "tf",
    q: "RAM içindeki içerik cihaz yeniden başlatıldığında/kapatıldığında kaybolur.",
    answer: true,
    explain: "RAM volatile memory; kapanınca içerik kaybolur."
  },
  { id: 545, topic: "M2_5", type: "mcq",
    q: "Yapılandırmayı bir metin dosyasına yakalamak için slaytta sıralanan temel adım dizisi nedir?",
    options: [
      "Terminal emülatörü aç → logging aktif et → show running-config → logging kapat",
      "Cihazı kapat → kabloyu çıkar",
      "Router'ı resetle",
      "Sadece show startup-config yaz"
    ],
    answer: 0,
    explain: "4 adım: terminal aç, logging enable, show running/startup, logging disable."
  },

  // =========================================================
  // MODÜL 2.6 - PORTLAR VE ADRESLER
  // =========================================================
  { id: 550, topic: "M2_6", type: "mcq",
    q: "IPv4 adresi kaç bittir ve nasıl yazılır?",
    options: [
      "32 bit; dotted decimal (4 ondalık sayı)",
      "64 bit; hex",
      "128 bit; hex",
      "16 bit; binary"
    ],
    answer: 0,
    explain: "IPv4: 32 bit; 0-255 arası 4 ondalık sayı."
  },
  { id: 551, topic: "M2_6", type: "mcq",
    q: "IPv4 subnet mask'in amacı nedir?",
    options: [
      "Cihazı kapatır",
      "Adresin ağ kısmını host kısmından ayırır (32-bit)",
      "MAC ataması yapar",
      "DNS sorgusu yapar"
    ],
    answer: 1,
    explain: "Subnet mask network/host kısımlarını ayırır."
  },
  { id: 552, topic: "M2_6", type: "fill",
    q: "Uzak ağlara erişmek için host'un kullandığı router IP adresine ____ denir.",
    answer: ["default gateway", "varsayılan ağ geçidi"],
    explain: "Default gateway."
  },
  { id: 553, topic: "M2_6", type: "mcq",
    q: "IPv6 adresi hakkında hangisi doğrudur?",
    options: [
      "128 bit; hexadecimal; iki noktayla ayrılmış gruplar; büyük/küçük harfe duyarsız",
      "64 bit; ondalık",
      "32 bit; hex",
      "256 bit; binary"
    ],
    answer: 0,
    explain: "IPv6: 128 bit; hex; ':' ile ayrılır; case-insensitive."
  },
  { id: 554, topic: "M2_6", type: "tf",
    q: "IPv6 adresleri büyük/küçük harfe duyarlıdır.",
    answer: false,
    explain: "IPv6 case-insensitive."
  },
  { id: 555, topic: "M2_6", type: "mcq",
    q: "Ağ medyası seçimini etkileyen faktörlerden DEĞİLDİR?",
    options: [
      "Sinyalin taşıdığı mesafe",
      "Kurulum ortamı",
      "Veri miktarı ve hız",
      "Cihazın işletim sistemi sürümü"
    ],
    answer: 3,
    explain: "Slayt: distance, environment, data/speed, cost farklılıkları."
  },

  // =========================================================
  // MODÜL 2.7 - IP ADRESLEME YAPILANDIRMASI
  // =========================================================
  { id: 560, topic: "M2_7", type: "mcq",
    q: "DHCP'nin işlevi nedir?",
    options: [
      "Otomatik IPv4 adres yapılandırması",
      "Dosya paylaşımı",
      "Web sayfası sunma",
      "Güvenlik duvarı"
    ],
    answer: 0,
    explain: "DHCP = Dynamic Host Configuration Protocol (IPv4 auto config)."
  },
  { id: 561, topic: "M2_7", type: "tf",
    q: "IPv6 için dinamik adres atama SLAAC veya DHCPv6 ile yapılabilir.",
    answer: true,
    explain: "Slayta göre IPv6 DHCPv6 ve SLAAC kullanır."
  },
  { id: 562, topic: "M2_7", type: "mcq",
    q: "Switch SVI (Switch Virtual Interface) yapılandırmak için sırasıyla hangi komutlar gelir?",
    options: [
      "interface vlan 1 → ip address … → no shutdown",
      "interface gig0/1 → shutdown → ip route",
      "line console 0 → login → ip address",
      "enable → configure → exit"
    ],
    answer: 0,
    explain: "SVI: interface vlan 1 → ip address ip mask → no shutdown."
  },
  { id: 563, topic: "M2_7", type: "fill",
    q: "Switch'i uzaktan yönetmek için IP adresi ve subnet mask'in yapılandırıldığı sanal arayüz ____ 'dir.",
    answer: ["SVI", "Switch Virtual Interface"],
    explain: "SVI: Switch Virtual Interface."
  },
  { id: 564, topic: "M2_7", type: "mcq",
    q: "Bir uç cihazda manuel IPv4 yapılandırmasında en az hangi değerler girilir?",
    options: [
      "IPv4 adresi, subnet mask, default gateway",
      "Sadece MAC adresi",
      "Sadece DNS",
      "Sadece gateway"
    ],
    answer: 0,
    explain: "IP + subnet + default gateway."
  },

  // =========================================================
  // MODÜL 2.8 - BAĞLANTIYI DOĞRULAMA
  // =========================================================
  { id: 570, topic: "M2_8", type: "mcq",
    q: "Uçtan uca bağlantıyı test etmek için en yaygın komut hangisidir?",
    options: ["ping", "show version", "copy run start", "shutdown"],
    answer: 0,
    explain: "ping bağlantı testi için kullanılır."
  },
  { id: 571, topic: "M2_8", type: "tf",
    q: "Arayüzü aktif etmek için interface config modunda 'no shutdown' komutu kullanılır.",
    answer: true,
    explain: "`no shutdown` arayüzü aktif eder."
  },

  // =========================================================
  // MODÜL 3.1 - KURALLAR
  // =========================================================
  { id: 600, topic: "M3_1", type: "mcq",
    q: "Modül 3'e göre herhangi bir iletişimin üç ögesi hangileridir?",
    options: [
      "Kaynak, hedef ve kanal (medya)",
      "Şifreleme, sıkıştırma, iletme",
      "DNS, DHCP, HTTP",
      "Host, router, switch"
    ],
    answer: 0,
    explain: "Kaynak (sender), hedef (receiver), kanal (media)."
  },
  { id: 601, topic: "M3_1", type: "mcq",
    q: "Protokoller hangisini zorunlu kılmaz (slaytta sayılmayan)?",
    options: [
      "Tanımlı gönderici ve alıcı",
      "Ortak dil ve gramer",
      "Teslimat hızı ve zamanlama",
      "Şifreleme zorunluluğu"
    ],
    answer: 3,
    explain: "Slayt: sender/receiver, dil/gramer, hız/zamanlama, onay. Şifreleme zorunlu değildir."
  },
  { id: 602, topic: "M3_1", type: "mcq",
    q: "Aşağıdakilerden hangisi bir mesaj iletim seçeneği DEĞİLDİR?",
    options: ["Unicast (bire bir)", "Multicast (bire çok)", "Broadcast (bire hepsine)", "Hopcast"],
    answer: 3,
    explain: "Delivery options: Unicast, Multicast, Broadcast (+ IPv6'da Anycast)."
  },
  { id: 603, topic: "M3_1", type: "tf",
    q: "Broadcast IPv4'te kullanılır; IPv6'da broadcast opsiyonu yoktur.",
    answer: true,
    explain: "Slayt: 'Broadcasts are used in IPv4 networks, but are not an option for IPv6.'"
  },
  { id: 604, topic: "M3_1", type: "mcq",
    q: "Mesaj zamanlaması (message timing) kapsamına girmeyen hangisidir?",
    options: ["Flow Control", "Response Timeout", "Access method", "MAC flooding"],
    answer: 3,
    explain: "Timing: flow control, response timeout, access method."
  },
  { id: 605, topic: "M3_1", type: "fill",
    q: "Veri iletim hızını yöneten ve ne kadar bilginin gönderilebileceğini tanımlayan zamanlama ögesi ____ control'dür.",
    answer: ["Flow", "akış"],
    explain: "Flow Control."
  },
  { id: 606, topic: "M3_1", type: "tf",
    q: "Encoding mesajı iletim için uygun bir başka biçime dönüştürme sürecidir; decoding ise bunun tersidir.",
    answer: true,
    explain: "Slayta göre doğru tanım."
  },

  // =========================================================
  // MODÜL 3.2 - PROTOKOLLER
  // =========================================================
  { id: 610, topic: "M3_2", type: "mcq",
    q: "Bir protokolün sahip olabileceği işlevlerden hangisi slaytta BELİRTİLMEMİŞTİR?",
    options: ["Addressing", "Reliability", "Sequencing", "Compression"],
    answer: 3,
    explain: "Functions: Addressing, Reliability, Flow Control, Sequencing, Error Detection, Application Interface."
  },
  { id: 611, topic: "M3_2", type: "mcq",
    q: "Transmission Control Protocol (TCP)'nin slaytta belirtilen işlevi hangisidir?",
    options: [
      "Yalnızca web sayfaları sunar",
      "Bireysel konuşmaları yönetir, garanti teslim ve akış kontrolü",
      "MAC adresleri atar",
      "Bit kodlar"
    ],
    answer: 1,
    explain: "TCP: manages conversations, guaranteed delivery, flow control."
  },
  { id: 612, topic: "M3_2", type: "mcq",
    q: "Aynı Ethernet LAN'da bir NIC'den diğerine mesaj iletiminden sorumlu protokol hangisidir?",
    options: ["IP", "TCP", "HTTP", "Ethernet"],
    answer: 3,
    explain: "Ethernet: from NIC to NIC on the same LAN."
  },
  { id: 613, topic: "M3_2", type: "mcq",
    q: "IP protokolünün işlevi nedir?",
    options: [
      "Mesajları global olarak gönderenden alıcıya teslim eder",
      "Sadece MAC tablosu",
      "Yalnızca şifreleme",
      "Bit kodlama"
    ],
    answer: 0,
    explain: "IP: delivers messages globally."
  },
  { id: 614, topic: "M3_2", type: "fill",
    q: "Bir web sunucusu ve client arasındaki etkileşimi yöneten protokol ____ 'dir.",
    answer: ["HTTP", "Hypertext Transfer Protocol"],
    explain: "HTTP: web server - web client interaction."
  },
  { id: 615, topic: "M3_2", type: "mcq",
    q: "Network protokolleri hangi biçimde uygulanabilir?",
    options: ["Yalnızca yazılım", "Yalnızca donanım", "Yazılım, donanım veya her ikisi", "Yalnızca firmware"],
    answer: 2,
    explain: "Protokoller software, hardware veya her ikisinde uygulanabilir."
  },

  // =========================================================
  // MODÜL 3.3 - PROTOKOL PAKETLERİ
  // =========================================================
  { id: 620, topic: "M3_3", type: "mcq",
    q: "Protokol paketi (protocol suite) nedir?",
    options: [
      "Tek bir protokol",
      "Birbiriyle ilişkili bir grup protokol",
      "Bir donanım bileşeni",
      "Bir port numarası"
    ],
    answer: 1,
    explain: "Protocol suite: birbiriyle ilişkili protokoller grubu."
  },
  { id: 621, topic: "M3_3", type: "mcq",
    q: "En yaygın protokol paketi ve bakımını yapan kuruluş hangisidir?",
    options: [
      "TCP/IP - IETF",
      "OSI - ISO",
      "AppleTalk - Apple",
      "NetWare - Novell"
    ],
    answer: 0,
    explain: "TCP/IP en yaygın, IETF tarafından bakılır."
  },
  { id: 622, topic: "M3_3", type: "mcq",
    q: "TCP/IP için hangisi DOĞRUDUR?",
    options: [
      "Açık standart; herkes kullanabilir; standartlarla desteklenir",
      "Tamamen özel (proprietary)",
      "Yalnızca donanımda çalışır",
      "Sadece Apple cihazlarında vardır"
    ],
    answer: 0,
    explain: "TCP/IP açık standart ve freely available."
  },
  { id: 623, topic: "M3_3", type: "tf",
    q: "TCP/IP application, transport ve internet katmanlarında çalışır; en yaygın ağ erişim katmanı protokolleri Ethernet ve WLAN'dır.",
    answer: true,
    explain: "Slaytta doğrudan belirtilmiştir."
  },
  { id: 624, topic: "M3_3", type: "fill",
    q: "OSI protokolleri ____ ve ITU tarafından geliştirilmiştir.",
    answer: ["ISO"],
    explain: "OSI: ISO ve ITU."
  },

  // =========================================================
  // MODÜL 3.4 - STANDART KURULUŞLARI
  // =========================================================
  { id: 630, topic: "M3_4", type: "mcq",
    q: "Aşağıdakilerden hangisi İNTERNET standartlarıyla doğrudan ilgili BİR kuruluş DEĞİLDİR?",
    options: ["ISOC", "IAB", "IETF", "TIA"],
    answer: 3,
    explain: "TIA telekom standartları içindir. İnternet: ISOC, IAB, IETF, IRTF."
  },
  { id: 631, topic: "M3_4", type: "mcq",
    q: "IP adresi tahsisi ve domain adı yönetimini koordine eden kuruluş hangisidir?",
    options: ["ICANN", "IEEE", "EIA", "ITU-T"],
    answer: 0,
    explain: "ICANN: IP address allocation, domain names."
  },
  { id: 632, topic: "M3_4", type: "mcq",
    q: "Protokol tanımlayıcılarını ve adresi yöneten, ICANN için çalışan kuruluş hangisidir?",
    options: ["IANA", "ISO", "IEEE", "ITU-R"],
    answer: 0,
    explain: "IANA: oversees and manages IP address allocation for ICANN."
  },
  { id: 633, topic: "M3_4", type: "mcq",
    q: "Güç/enerji, sağlık, telekomünikasyon ve ağ standartları geliştiren kuruluş hangisidir?",
    options: ["IEEE", "EIA", "TIA", "ITU-T"],
    answer: 0,
    explain: "IEEE (I-triple-E)."
  },
  { id: 634, topic: "M3_4", type: "tf",
    q: "Açık standartlar (open standards) birlikte çalışabilirliği, rekabeti ve inovasyonu teşvik eder.",
    answer: true,
    explain: "Open standards encourage interoperability, competition, innovation."
  },
  { id: 635, topic: "M3_4", type: "fill",
    q: "Video sıkıştırma, IPTV ve DSL geniş bant için standartlar belirleyen kuruluş ____ 'dir.",
    answer: ["ITU-T"],
    explain: "ITU-T."
  },

  // =========================================================
  // MODÜL 3.5 - REFERANS MODELLERİ
  // =========================================================
  { id: 640, topic: "M3_5", type: "mcq",
    q: "OSI modeli kaç katmandır ve TCP/IP modeli kaç katmandır?",
    options: ["7 - 4", "4 - 7", "5 - 5", "6 - 3"],
    answer: 0,
    explain: "OSI 7, TCP/IP 4 katmandır."
  },
  { id: 641, topic: "M3_5", type: "mcq",
    q: "OSI Katman 3 (Network) ne yapar?",
    options: [
      "Fiziksel bağlantıları aktive/deaktive eder",
      "Çerçeveleme yapar",
      "Ağ üzerinden bireysel veri parçalarını değiş tokuş eder",
      "Uygulama arayüzü sağlar"
    ],
    answer: 2,
    explain: "Network layer: exchange individual pieces of data over the network."
  },
  { id: 642, topic: "M3_5", type: "mcq",
    q: "OSI Katman 2 hangi işlemi tanımlar?",
    options: [
      "Veri çerçevelerini (frame) ortak medya üzerinden değiş tokuş etme yöntemleri",
      "Oturum yönetimi",
      "Process-to-process iletişim",
      "Kablo tipi"
    ],
    answer: 0,
    explain: "Data Link: frame exchange over common media."
  },
  { id: 643, topic: "M3_5", type: "mcq",
    q: "TCP/IP modelinin katmanları hangileridir?",
    options: [
      "Application, Transport, Internet, Network Access",
      "Application, Session, Network, Physical",
      "Physical, Data Link, Network, Transport, Application",
      "Application, Presentation, Session, Transport"
    ],
    answer: 0,
    explain: "TCP/IP: Application, Transport, Internet, Network Access."
  },
  { id: 644, topic: "M3_5", type: "mcq",
    q: "OSI ve TCP/IP modellerinin karşılaştırılması ile ilgili hangisi DOĞRUDUR?",
    options: [
      "OSI, TCP/IP'nin network access ve application katmanlarını birden fazla katmana böler",
      "TCP/IP 7, OSI 4 katmandır",
      "İkisi de aynı sayıda katmana sahiptir",
      "TCP/IP fiziksel medyayı zorunlu bir protokol olarak belirler"
    ],
    answer: 0,
    explain: "Slayt: OSI splits TCP/IP's network access ve application layers."
  },
  { id: 645, topic: "M3_5", type: "fill",
    q: "OSI Katman 7 ____ katmanıdır ve process-to-process iletişim için protokoller içerir.",
    answer: ["Application", "Uygulama"],
    explain: "Layer 7 - Application."
  },
  { id: 646, topic: "M3_5", type: "tf",
    q: "Katmanlı model, üreticilerin ürünlerinin birbirleriyle çalışmasını (interoperability) teşvik eder.",
    answer: true,
    explain: "Katmanlı model avantajlarından biridir."
  },

  // =========================================================
  // MODÜL 3.6 - VERİ KAPSÜLLEME
  // =========================================================
  { id: 650, topic: "M3_6", type: "mcq",
    q: "Segmentlemenin iki temel faydası hangisidir?",
    options: [
      "Hızı ve verimliliği artırır",
      "Maliyet ve güvenlik",
      "Fiziksel ve mantıksal",
      "Yalnızca veri kaybını azaltır"
    ],
    answer: 0,
    explain: "Increases speed ve increases efficiency."
  },
  { id: 651, topic: "M3_6", type: "mcq",
    q: "Sıralama (sequencing) neden yapılır?",
    options: [
      "Hedefte mesajın yeniden birleştirilebilmesi için",
      "Adres ataması için",
      "Şifreleme için",
      "Hedefi değiştirmek için"
    ],
    answer: 0,
    explain: "Sequencing: reassembly at destination."
  },
  { id: 652, topic: "M3_6", type: "mcq",
    q: "TCP/IP stack'te encapsulation sırasıyla aşağı doğru PDU adları hangisidir?",
    options: [
      "Data → Segment → Packet → Frame → Bits",
      "Bits → Frame → Packet → Segment → Data",
      "Packet → Segment → Frame → Bits → Data",
      "Frame → Packet → Bits → Data → Segment"
    ],
    answer: 0,
    explain: "Top-down: Data, Segment, Packet, Frame, Bits."
  },
  { id: 653, topic: "M3_6", type: "fill",
    q: "Birden çok segmentlenmiş veri akışını bir araya getirip örme işlemi ____ olarak adlandırılır.",
    answer: ["Multiplexing", "çoğullama"],
    explain: "Multiplexing."
  },
  { id: 654, topic: "M3_6", type: "tf",
    q: "De-encapsulation yukarı doğru gerçekleşir; her katman kendi başlığını çıkarır ve üst katmana geçirir.",
    answer: true,
    explain: "Slayta göre de-encapsulation yukarı yönde gerçekleşir."
  },
  { id: 655, topic: "M3_6", type: "mcq",
    q: "TCP/IP'de sıralamadan sorumlu protokol hangisidir?",
    options: ["IP", "ARP", "TCP", "HTTP"],
    answer: 2,
    explain: "TCP segmentleri sıralar."
  },

  // =========================================================
  // MODÜL 3.7 - VERİ ERİŞİMİ (L2/L3 ADRESLEME)
  // =========================================================
  { id: 660, topic: "M3_7", type: "mcq",
    q: "Network layer (L3) ve data link layer (L2) adreslemenin sorumlulukları nelerdir?",
    options: [
      "L3: kaynaktan nihai hedefe IP paket teslimi; L2: aynı ağdaki NIC'den NIC'e frame teslimi",
      "L3: MAC; L2: IP",
      "L3 ve L2 aynı işleve sahip",
      "L3 fiziksel kablolar; L2 şifreleme"
    ],
    answer: 0,
    explain: "L3 source→final destination IP paket; L2 NIC-NIC frame."
  },
  { id: 661, topic: "M3_7", type: "mcq",
    q: "Bir IP adresi iki parçadan oluşur: ____",
    options: [
      "Ağ kısmı (Prefix) ve Host/Interface ID",
      "Kaynak ve hedef",
      "OUI ve NIC ID",
      "L2 ve L3"
    ],
    answer: 0,
    explain: "Network portion + Host portion (Interface ID)."
  },
  { id: 662, topic: "M3_7", type: "mcq",
    q: "Aynı ağdaki iki cihaz için (aynı Ethernet LAN) L2 adresleme nasıl yapılır?",
    options: [
      "Hedef MAC gerçek hedef NIC'in MAC'idir",
      "Hedef MAC default gateway'dir",
      "Hedef MAC her zaman FF-FF-FF-FF-FF-FF'dir",
      "MAC kullanılmaz"
    ],
    answer: 0,
    explain: "Aynı ağda Dest MAC = gerçek hedef NIC MAC."
  },
  { id: 663, topic: "M3_7", type: "mcq",
    q: "Uzak ağdaki hedef için L2 ilk hop hedef MAC'i nedir?",
    options: [
      "Son hedefin MAC'i",
      "Broadcast",
      "Local default gateway'in MAC'i",
      "Switch'in MAC'i"
    ],
    answer: 2,
    explain: "L3 L2'ye local default gateway MAC'ini verir."
  },
  { id: 664, topic: "M3_7", type: "tf",
    q: "Hop'tan hop'a L2 adresleme değişir; L3 IP adresleri değişmez (global).",
    answer: true,
    explain: "L2 local, L3 global."
  },
  { id: 665, topic: "M3_7", type: "fill",
    q: "LAN'da cihazın uzak ağlara erişmek için kullandığı router arayüzüne ____ denir.",
    answer: ["default gateway", "DGW", "varsayılan ağ geçidi"],
    explain: "Default Gateway (DGW)."
  },

  // =========================================================
  // MODÜL 4.1 - FİZİKSEL KATMANIN AMACI
  // =========================================================
  { id: 700, topic: "M4_1", type: "mcq",
    q: "Physical layer görevi nedir?",
    options: [
      "Ağ medyası üzerinden bitleri taşır",
      "MAC adresleri atar",
      "Frame oluşturur",
      "IP yönlendirme yapar"
    ],
    answer: 0,
    explain: "Physical layer: transports bits across network media."
  },
  { id: 701, topic: "M4_1", type: "mcq",
    q: "Physical layer veri kaynağı olarak hangi katmandan ne alır?",
    options: [
      "Data Link katmanından tamamlanmış bir frame",
      "Application katmanından metin",
      "Transport'tan segment",
      "Network'ten packet"
    ],
    answer: 0,
    explain: "Data Link'ten tamamlanmış frame alır, bitlere kodlar."
  },
  { id: 702, topic: "M4_1", type: "tf",
    q: "Bir bilgisayar hem kablolu hem kablosuz NIC'e sahip olabilir.",
    answer: true,
    explain: "Slayt: Some devices have one NIC, others multiple (wired/wireless)."
  },

  // =========================================================
  // MODÜL 4.2 - FİZİKSEL KATMAN ÖZELLİKLERİ
  // =========================================================
  { id: 710, topic: "M4_2", type: "mcq",
    q: "Physical layer standartları üç fonksiyonel alan kapsar: ____",
    options: [
      "Fiziksel bileşenler, encoding, signaling",
      "Kaynak, hedef, kanal",
      "MAC, IP, Port",
      "Hız, Boyut, Güç"
    ],
    answer: 0,
    explain: "Physical components, encoding, signaling."
  },
  { id: 711, topic: "M4_2", type: "mcq",
    q: "Aşağıdakilerden hangisi bir encoding yöntemidir?",
    options: ["Manchester", "TCP", "ICMP", "HTTP"],
    answer: 0,
    explain: "Manchester, 4B/5B, 8B/10B encoding yöntemleridir."
  },
  { id: 712, topic: "M4_2", type: "mcq",
    q: "Signaling kavramı neyi ifade eder?",
    options: [
      "Bit değerlerinin (1/0) fiziksel medyada nasıl temsil edildiğini",
      "MAC atamasını",
      "Paket şifrelemesini",
      "Port numarasını"
    ],
    answer: 0,
    explain: "Signaling: bit değerlerinin medyada temsilidir."
  },
  { id: 713, topic: "M4_2", type: "fill",
    q: "Belirli bir zamanda bir noktadan diğerine ne kadar veri aktığını (bit/sn) ölçen terime ____ denir.",
    answer: ["bandwidth", "bant genişliği"],
    explain: "Bandwidth: digital capacity."
  },
  { id: 714, topic: "M4_2", type: "mcq",
    q: "Goodput nedir?",
    options: [
      "Belirli sürede aktarılan kullanılabilir verinin ölçüsüdür (throughput - traffic overhead)",
      "Bandwidth ile eşittir",
      "Latency ile eşittir",
      "Yalnızca gönderilen toplam veri"
    ],
    answer: 0,
    explain: "Goodput = Throughput - overhead."
  },
  { id: 715, topic: "M4_2", type: "mcq",
    q: "Latency nedir?",
    options: [
      "Verinin A'dan B'ye gitme süresi (gecikmeler dahil)",
      "Saniyedeki bit sayısı",
      "Kablo uzunluğu",
      "Paket kaybı"
    ],
    answer: 0,
    explain: "Latency: veri transfer süresi."
  },
  { id: 716, topic: "M4_2", type: "mcq",
    q: "1 Gbps kaç bps'dir?",
    options: ["10^6", "10^9", "10^12", "10^3"],
    answer: 1,
    explain: "Gbps = 10^9 bps."
  },

  // =========================================================
  // MODÜL 4.3 - BAKIR KABLOLAMA
  // =========================================================
  { id: 720, topic: "M4_3", type: "mcq",
    q: "Bakır kablolamanın sınırlamalarından DEĞİLDİR?",
    options: ["Attenuation", "EMI/RFI duyarlılığı", "Crosstalk", "Işığa duyarlılık"],
    answer: 3,
    explain: "Bakır: attenuation, EMI/RFI, crosstalk. Işığa duyarlı fiberde."
  },
  { id: 721, topic: "M4_3", type: "fill",
    q: "Kabloda sinyal zayıflamasına ____ denir; katı uzunluk sınırlarına uyarak azaltılır.",
    answer: ["attenuation", "zayıflama"],
    explain: "Attenuation."
  },
  { id: 722, topic: "M4_3", type: "mcq",
    q: "UTP'nin crosstalk'ı azaltma yöntemi nedir?",
    options: [
      "Karşıt devreli tel çiftlerini burarak",
      "Metal kalkan ekleyerek",
      "Fiber kullanarak",
      "Daha kalın kablo kullanarak"
    ],
    answer: 0,
    explain: "Twisting opposing circuit pair wires together."
  },
  { id: 723, topic: "M4_3", type: "mcq",
    q: "Koaksiyel kablo yaygın olarak nerede kullanılır?",
    options: [
      "Kablosuz cihazlara anten bağlamak ve kablolu internet müşteri tesisat kablolaması",
      "Router konsol portu",
      "Switch yönetim portu",
      "Güç kaynağı"
    ],
    answer: 0,
    explain: "Coax: anten bağlantısı, cable internet."
  },
  { id: 724, topic: "M4_3", type: "tf",
    q: "STP, UTP'den daha iyi gürültü koruması sağlar fakat daha pahalı ve kurulumu zordur.",
    answer: true,
    explain: "STP özellikleri slaytta belirtildiği gibidir."
  },

  // =========================================================
  // MODÜL 4.4 - UTP KABLOLAMA
  // =========================================================
  { id: 730, topic: "M4_4", type: "mcq",
    q: "UTP kablo standartlarını belirleyen kuruluş hangisidir?",
    options: ["TIA/EIA", "ISO", "ICANN", "IANA"],
    answer: 0,
    explain: "TIA/EIA-568 standard."
  },
  { id: 731, topic: "M4_4", type: "mcq",
    q: "UTP'nin crosstalk sınırlamak için dayandığı özellikler nelerdir?",
    options: [
      "Cancellation ve her telde farklı sarım sıklığı",
      "Metal kalkan ve topraklama",
      "Fiber ve LED",
      "Vida ve konektör"
    ],
    answer: 0,
    explain: "Cancellation + variation in twists per foot."
  },
  { id: 732, topic: "M4_4", type: "mcq",
    q: "Ethernet'te host'u ağ cihazına bağlamak için hangi kablo türü kullanılır?",
    options: ["Straight-through (her iki uç T568A veya T568B)", "Crossover", "Rollover", "Koaksiyel"],
    answer: 0,
    explain: "Host → Network device: straight-through."
  },
  { id: 733, topic: "M4_4", type: "mcq",
    q: "Router'ın konsol portuna bilgisayardan bağlanmak için genellikle hangi kablo kullanılır?",
    options: ["Straight-through", "Crossover", "Rollover (Cisco proprietary)", "Fiber"],
    answer: 2,
    explain: "Rollover: Host serial port → router/switch console (with adapter)."
  },
  { id: 734, topic: "M4_4", type: "tf",
    q: "Modern NIC'lerdeki Auto-MDIX özelliği sayesinde crossover kablo kullanımı büyük ölçüde gereksizleşmiştir.",
    answer: true,
    explain: "Slaytta crossover 'Legacy' olarak işaretlenmiştir (auto-MDIX sayesinde)."
  },
  { id: 735, topic: "M4_4", type: "fill",
    q: "UTP konektör tipi ____ olarak bilinir.",
    answer: ["RJ-45", "RJ45"],
    explain: "RJ-45 konektör."
  },

  // =========================================================
  // MODÜL 4.5 - FİBER OPTİK KABLOLAMA
  // =========================================================
  { id: 740, topic: "M4_5", type: "mcq",
    q: "Fiber kabloların bakıra göre avantajlarından DEĞİLDİR?",
    options: [
      "Daha uzun mesafe",
      "Daha yüksek bant genişliği",
      "EMI/RFI'ya tamamen bağışık",
      "Daha ucuz ve kolay kurulum"
    ],
    answer: 3,
    explain: "Fiber pahalıdır ve kurulumu zordur."
  },
  { id: 741, topic: "M4_5", type: "mcq",
    q: "Multimode fiber (MMF) için slaytta belirtilen değerler hangisidir?",
    options: [
      "Daha büyük çekirdek, LED kullanır, 550 m'ye kadar 10 Gbps",
      "Çok küçük çekirdek, lazer, uzun mesafe",
      "Sadece kablosuz",
      "Sadece STP"
    ],
    answer: 0,
    explain: "MMF: larger core, LEDs, 10 Gbps over 550 m."
  },
  { id: 742, topic: "M4_5", type: "mcq",
    q: "Single-mode fiber (SMF) neden tercih edilir?",
    options: [
      "Daha küçük çekirdek ve pahalı lazer kullanır; uzun mesafe uygulamalarına uygundur",
      "Kısa mesafeler için en ucuzudur",
      "Sadece evde kullanılır",
      "Yalnızca kablosuz bağlantı sağlar"
    ],
    answer: 0,
    explain: "SMF: very small core, lasers, long distance."
  },
  { id: 743, topic: "M4_5", type: "mcq",
    q: "Dispersion nedir?",
    options: [
      "Işık pulsesinin zamanla yayılması; MMF'de SMF'den fazladır",
      "Kablonun kırılması",
      "Paket kaybı",
      "DNS sorgusu"
    ],
    answer: 0,
    explain: "Dispersion: spreading out of a light pulse over time."
  },
  { id: 744, topic: "M4_5", type: "mcq",
    q: "Fiber konektör tipi DEĞİLDİR?",
    options: ["ST", "SC", "LC", "RJ-45"],
    answer: 3,
    explain: "Fiber: ST, SC, LC, duplex MM LC. RJ-45 bakır UTP içindir."
  },
  { id: 745, topic: "M4_5", type: "mcq",
    q: "Fiber kabloların kullanıldığı alanlardan DEĞİLDİR?",
    options: ["Enterprise Networks backbone", "FTTH", "Long-Haul Networks", "Konsol bağlantısı"],
    answer: 3,
    explain: "Fiber: enterprise backbone, FTTH, long-haul, submarine. Console rollover ile yapılır."
  },
  { id: 746, topic: "M4_5", type: "tf",
    q: "Tek mod fiber kablolar tipik olarak sarı (yellow) ceket, çok mod fiber kablolar turuncu (veya aqua) ceket rengine sahiptir.",
    answer: true,
    explain: "Slayt: yellow = SMF, orange/aqua = MMF."
  },
  { id: 747, topic: "M4_5", type: "fill",
    q: "Fiberde bit temsili için ____ veya LED kullanılır.",
    answer: ["laser", "lazer"],
    explain: "Uses a laser or LED."
  },

  // =========================================================
  // MODÜL 4.6 - KABLOSUZ MEDYA
  // =========================================================
  { id: 750, topic: "M4_6", type: "mcq",
    q: "Aşağıdakilerden hangisi kablosuz medyanın sınırlamalarından DEĞİLDİR?",
    options: ["Kapsama alanı", "Girişim (interference)", "Güvenlik", "EMI'ye tamamen bağışıklık"],
    answer: 3,
    explain: "Kablosuz EMI'ya duyarlıdır; slaytta coverage, interference, security, shared medium sınırlamalarıdır."
  },
  { id: 751, topic: "M4_6", type: "mcq",
    q: "Wi-Fi (WLAN) için IEEE standardı hangisidir?",
    options: ["802.11", "802.15", "802.16", "802.3"],
    answer: 0,
    explain: "Wi-Fi = IEEE 802.11."
  },
  { id: 752, topic: "M4_6", type: "mcq",
    q: "Bluetooth standardı hangisidir?",
    options: ["802.11", "802.15", "802.16", "802.3"],
    answer: 1,
    explain: "Bluetooth: IEEE 802.15 (WPAN)."
  },
  { id: 753, topic: "M4_6", type: "mcq",
    q: "WiMAX standardı hangisidir?",
    options: ["802.16", "802.11", "802.15.4", "802.3"],
    answer: 0,
    explain: "WiMAX: IEEE 802.16."
  },
  { id: 754, topic: "M4_6", type: "mcq",
    q: "Zigbee standardı hangisidir ve genellikle nerede kullanılır?",
    options: [
      "802.15.4 - IoT düşük veri hızı / düşük güç",
      "802.11 - WLAN",
      "802.3 - Ethernet",
      "802.16 - WiMAX"
    ],
    answer: 0,
    explain: "Zigbee: IEEE 802.15.4, IoT."
  },
  { id: 755, topic: "M4_6", type: "tf",
    q: "WLAN'lar half-duplex çalışır; aynı anda yalnızca bir cihaz gönderim veya alım yapabilir.",
    answer: true,
    explain: "Shared medium, half-duplex."
  },
  { id: 756, topic: "M4_6", type: "fill",
    q: "Kablosuz sinyalleri yoğunlaştırarak mevcut kablolu altyapıya bağlayan cihaz ____ (AP) 'dır.",
    answer: ["Wireless Access Point", "Access Point", "AP"],
    explain: "Wireless Access Point (AP)."
  },

  // =========================================================
  // MODÜL 5.1 - İKİLİ SAYI SİSTEMİ
  // =========================================================
  { id: 800, topic: "M5_1", type: "mcq",
    q: "İkili (binary) sayı sistemi kaç tabanlıdır ve hangi rakamlardan oluşur?",
    options: ["Taban 2; 0 ve 1", "Taban 10; 0-9", "Taban 16; 0-F", "Taban 8; 0-7"],
    answer: 0,
    explain: "Binary: base 2; 0 ve 1."
  },
  { id: 801, topic: "M5_1", type: "mcq",
    q: "Bir IPv4 adresi toplam kaç bittir ve kaç oktete bölünür?",
    options: ["32 bit; 4 oktet", "64 bit; 8 oktet", "128 bit; 16 oktet", "16 bit; 2 oktet"],
    answer: 0,
    explain: "IPv4: 32 bit, 4 oktet (8 bit)."
  },
  { id: 802, topic: "M5_1", type: "fill",
    q: "İkili sistemde 11000000 ondalık olarak ____ sayısına eşittir.",
    answer: ["192"],
    explain: "128+64 = 192."
  },
  { id: 803, topic: "M5_1", type: "fill",
    q: "İkili sistemde 10101000 ondalık olarak ____ sayısına eşittir.",
    answer: ["168"],
    explain: "128+32+8 = 168."
  },
  { id: 804, topic: "M5_1", type: "fill",
    q: "Ondalık 10 ikili sistemde ____ olarak yazılır.",
    answer: ["00001010", "1010"],
    explain: "10 = 8+2 = 00001010."
  },
  { id: 805, topic: "M5_1", type: "fill",
    q: "İkili 00001011 ondalık olarak ____ sayısına eşittir.",
    answer: ["11"],
    explain: "8+2+1 = 11."
  },
  { id: 806, topic: "M5_1", type: "mcq",
    q: "Aşağıdaki noktalı ondalık adres 11000000.10101000.00001011.00001010'nın karşılığıdır?",
    options: ["192.168.11.10", "10.11.168.192", "172.16.11.10", "255.255.255.0"],
    answer: 0,
    explain: "11000000=192, 10101000=168, 00001011=11, 00001010=10."
  },
  { id: 807, topic: "M5_1", type: "mcq",
    q: "İkili 8 bitlik pozisyon değerleri soldan sağa nasıldır?",
    options: [
      "128, 64, 32, 16, 8, 4, 2, 1",
      "1, 2, 4, 8, 16, 32, 64, 128",
      "10, 20, 30, 40, 50, 60, 70, 80",
      "256, 128, 64, 32, 16, 8, 4, 2"
    ],
    answer: 0,
    explain: "Soldan sağa 128→1 azalan."
  },
  { id: 808, topic: "M5_1", type: "tf",
    q: "Bilgisayarlar ve yönlendiriciler yalnızca ikili sistemi anlar; insanlar ondalık ile çalışır.",
    answer: true,
    explain: "Slaytta doğrudan belirtilmiştir."
  },
  { id: 809, topic: "M5_1", type: "fill",
    q: "Ondalık 168'i ikiliye çevirirken 128 pozisyonunda 1 yazılır ve sayıdan çıkarılır. Kalan ____ olur.",
    answer: ["40"],
    explain: "168-128 = 40."
  },

  // =========================================================
  // MODÜL 5.2 - ONALTILIK (HEX) SAYI SİSTEMİ
  // =========================================================
  { id: 820, topic: "M5_2", type: "mcq",
    q: "Onaltılık sistem hangi tabandır ve hangi karakterleri kullanır?",
    options: [
      "Taban 16; 0-9 ve A-F",
      "Taban 10; 0-9",
      "Taban 2; 0-1",
      "Taban 8; 0-7"
    ],
    answer: 0,
    explain: "Hex: base 16; 0-9 ve A-F."
  },
  { id: 821, topic: "M5_2", type: "mcq",
    q: "IPv6 adresi kaç bittir ve kaç hex basamaktan oluşur?",
    options: ["128 bit, 32 hex", "64 bit, 16 hex", "32 bit, 8 hex", "256 bit, 64 hex"],
    answer: 0,
    explain: "IPv6: 128 bit → 32 hex digit."
  },
  { id: 822, topic: "M5_2", type: "fill",
    q: "IPv6'da 4 hex karakter grubu ____ olarak adlandırılır.",
    answer: ["hextet"],
    explain: "Hextet."
  },
  { id: 823, topic: "M5_2", type: "fill",
    q: "Ondalık 168 hexadecimal olarak ____ şeklinde yazılır.",
    answer: ["A8"],
    explain: "168 = 10101000 → 1010 1000 → A8."
  },
  { id: 824, topic: "M5_2", type: "fill",
    q: "Hex D2 ondalık olarak ____ 'dir.",
    answer: ["210"],
    explain: "D=1101, 2=0010 → 11010010 = 210."
  },
  { id: 825, topic: "M5_2", type: "mcq",
    q: "Dokümantasyonda onaltılık değerleri ondalıktan ayırt etmek için sıkça kullanılan ön ek hangisidir?",
    options: ["0x", "0d", "0h", "0b"],
    answer: 0,
    explain: "0x ön eki örn. 0x73."
  },
  { id: 826, topic: "M5_2", type: "tf",
    q: "Hexadecimal aynı zamanda MAC adreslerini temsil etmek için de kullanılır.",
    answer: true,
    explain: "MAC adresleri hex olarak yazılır."
  },
  { id: 827, topic: "M5_2", type: "mcq",
    q: "İkili 1010 hex karşılığı nedir?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    explain: "1010 = 10 = A."
  },
  { id: 828, topic: "M5_2", type: "mcq",
    q: "İkili 1111 hex karşılığı nedir?",
    options: ["F", "E", "D", "C"],
    answer: 0,
    explain: "1111 = 15 = F."
  },
  { id: 829, topic: "M5_2", type: "fill",
    q: "Her 4 bit ikili, ____ hex basamağa karşılık gelir.",
    answer: ["1", "bir"],
    explain: "4 bit = 1 hex digit."
  },

  // =========================================================
  // MODÜL 6.1 - VERİ BAĞLANTISI KATMANININ AMACI
  // =========================================================
  { id: 900, topic: "M6_1", type: "mcq",
    q: "Data Link (Katman 2) aşağıdakilerden hangisini YAPAR?",
    options: [
      "NIC-NIC iletişimden sorumludur; L3 paketleri Katman 2 çerçeveleri içine kapsüller; hata tespiti yapar",
      "IP yönlendirme yapar",
      "DNS sorguları gerçekleştirir",
      "Uygulama verisini şifreler"
    ],
    answer: 0,
    explain: "Slayta göre L2 rolleri tam olarak bunlardır."
  },
  { id: 901, topic: "M6_1", type: "mcq",
    q: "IEEE 802 LAN/MAN data link katmanı kaç alt katmana ayrılır?",
    options: [
      "LLC ve MAC olarak iki alt katman",
      "Tek katman",
      "Üç alt katman",
      "Dört alt katman"
    ],
    answer: 0,
    explain: "LLC (Logical Link Control) ve MAC (Media Access Control)."
  },
  { id: 902, topic: "M6_1", type: "mcq",
    q: "LLC alt katmanının görevi nedir?",
    options: [
      "Üst katman ağ yazılımı ile alt katman cihaz donanımı arasında iletişim kurmak",
      "Kablo tipi seçmek",
      "IP atamak",
      "Paket yönlendirmek"
    ],
    answer: 0,
    explain: "LLC: network software ile device hardware arasında iletişim."
  },
  { id: 903, topic: "M6_1", type: "mcq",
    q: "MAC alt katmanının görevi nedir?",
    options: [
      "Veri kapsülleme ve ortam erişim kontrolü",
      "Uygulama sunma",
      "Şifreleme",
      "Segmentleme"
    ],
    answer: 0,
    explain: "MAC: data encapsulation ve media access control."
  },
  { id: 904, topic: "M6_1", type: "tf",
    q: "Yolunda her atlamada router 4 temel Layer 2 işlemi yapar: çerçeve kabul, dekapsülleme, yeniden kapsülleme ve yeni çerçeveyi iletme.",
    answer: true,
    explain: "Slaytta tam olarak 4 işlem listelenir."
  },
  { id: 905, topic: "M6_1", type: "mcq",
    q: "Data link katman protokollerini tanımlayan mühendislik kuruluşu OLAMAZ?",
    options: ["IEEE", "ITU", "ISO", "ICANN"],
    answer: 3,
    explain: "IEEE, ITU, ISO, ANSI. ICANN IP adreslemeye bakar."
  },

  // =========================================================
  // MODÜL 6.2 - TOPOLOJİLER VE ERİŞİM KONTROLÜ
  // =========================================================
  { id: 910, topic: "M6_2", type: "mcq",
    q: "Ağ topolojisi türleri hangileridir?",
    options: ["Fiziksel ve mantıksal", "Uzak ve yakın", "Küçük ve büyük", "Tekli ve çoklu"],
    answer: 0,
    explain: "Physical ve logical topology."
  },
  { id: 911, topic: "M6_2", type: "mcq",
    q: "Üç yaygın fiziksel WAN topolojisi hangisidir?",
    options: [
      "Point-to-point, hub and spoke, mesh",
      "Star, bus, ring",
      "Ring, tree, mesh",
      "Point-to-point, ring, star"
    ],
    answer: 0,
    explain: "WAN: point-to-point, hub and spoke, mesh."
  },
  { id: 912, topic: "M6_2", type: "mcq",
    q: "LAN'larda tipik olarak kullanılan topoloji hangisidir?",
    options: [
      "Yıldız veya genişletilmiş yıldız",
      "Yalnızca bus",
      "Yalnızca mesh",
      "Yalnızca ring"
    ],
    answer: 0,
    explain: "LAN: star ya da extended star."
  },
  { id: 913, topic: "M6_2", type: "tf",
    q: "Full-duplex iletişim paylaşılan medyada iki cihazın aynı anda göndermesine izin verir.",
    answer: true,
    explain: "Tam çift yönlü iletişim tanımı slaytta bu şekildedir."
  },
  { id: 914, topic: "M6_2", type: "mcq",
    q: "Ethernet switch'ler hangi modda çalışır?",
    options: ["Full-duplex", "Half-duplex", "Simplex", "Broadcast"],
    answer: 0,
    explain: "Ethernet switchler tam çift yönlü."
  },
  { id: 915, topic: "M6_2", type: "mcq",
    q: "CSMA/CD hangi ortamda kullanılır?",
    options: [
      "Eski bus topolojili Ethernet LAN'lar (yarı çift yönlü)",
      "WLAN",
      "Token Ring",
      "Fiber single-mode"
    ],
    answer: 0,
    explain: "CSMA/CD: legacy Ethernet, half-duplex."
  },
  { id: 916, topic: "M6_2", type: "mcq",
    q: "CSMA/CA hangi ortamda kullanılır?",
    options: [
      "IEEE 802.11 WLAN'lar",
      "Gigabit Ethernet",
      "PPP",
      "Frame Relay"
    ],
    answer: 0,
    explain: "CSMA/CA: 802.11 WLAN."
  },
  { id: 917, topic: "M6_2", type: "tf",
    q: "Kontrollü erişim (deterministik) Token Ring ve ARCNET gibi eski ağlarda kullanılır.",
    answer: true,
    explain: "Controlled/deterministic access: Token Ring, ARCNET."
  },
  { id: 918, topic: "M6_2", type: "fill",
    q: "CSMA/CA çarpışma ____ süreci kullanır.",
    answer: ["önleme", "avoidance"],
    explain: "CSMA/CA: collision avoidance."
  },

  // =========================================================
  // MODÜL 6.3 - VERİ BAĞLANTISI ÇERÇEVESİ
  // =========================================================
  { id: 930, topic: "M6_3", type: "mcq",
    q: "Data link çerçevesi kaç bölümden oluşur?",
    options: ["Header, Data, Trailer", "Sadece header ve data", "Sadece data", "Header ve footer"],
    answer: 0,
    explain: "Header, Data, Trailer."
  },
  { id: 931, topic: "M6_3", type: "mcq",
    q: "Çerçevedeki 'Tip (Type)' alanı neyi tanımlar?",
    options: [
      "Kapsüllenmiş Layer 3 protokolünü",
      "Kaynak MAC'i",
      "FCS'i",
      "Paket boyutunu"
    ],
    answer: 0,
    explain: "Type: encapsulated L3 protocol."
  },
  { id: 932, topic: "M6_3", type: "mcq",
    q: "FCS (Frame Check Sequence / Hata Tespiti) alanı ne işe yarar?",
    options: [
      "İletim hatalarını belirlemek",
      "Kaynak adresini göstermek",
      "Tipi belirlemek",
      "Akış kontrolü"
    ],
    answer: 0,
    explain: "Error detection."
  },
  { id: 933, topic: "M6_3", type: "tf",
    q: "Katman 2 adresleri (fiziksel adresler) her bir bağlantı için yerel teslimat amacıyla kullanılır ve çerçeveyi ileten her cihaz tarafından güncellenir.",
    answer: true,
    explain: "Slayt: 'Used only for local delivery', 'Updated by each device that forwards'."
  },
  { id: 934, topic: "M6_3", type: "mcq",
    q: "Aşağıdakilerden hangisi bir data link protokolü DEĞİLDİR?",
    options: ["Ethernet", "PPP", "HDLC", "TCP"],
    answer: 3,
    explain: "TCP transport layer; Ethernet/PPP/HDLC/Frame-Relay data link."
  },
  { id: 935, topic: "M6_3", type: "fill",
    q: "Data link çerçevesinde 'kaynak ve hedef düğümleri' belirten alan ____ alanıdır.",
    answer: ["Addressing", "adresleme"],
    explain: "Addressing field."
  },

  // =========================================================
  // MODÜL 7.1 - ETHERNET ÇERÇEVESİ
  // =========================================================
  { id: 1000, topic: "M7_1", type: "mcq",
    q: "Ethernet hangi katmanlarda çalışır?",
    options: [
      "Data Link ve Physical",
      "Network ve Transport",
      "Application ve Session",
      "Yalnızca Physical"
    ],
    answer: 0,
    explain: "Ethernet: L2 ve L1'de çalışır."
  },
  { id: 1001, topic: "M7_1", type: "mcq",
    q: "Ethernet hangi IEEE standartları ailesi kapsamındadır?",
    options: ["802.2 ve 802.3", "802.11 ve 802.15", "802.1 ve 802.16", "802.4 ve 802.5"],
    answer: 0,
    explain: "IEEE 802.2 (LLC) ve 802.3 (MAC Ethernet)."
  },
  { id: 1002, topic: "M7_1", type: "mcq",
    q: "Minimum ve maksimum Ethernet çerçeve boyutu nedir?",
    options: [
      "Min 64 bayt, max 1518 bayt",
      "Min 128, max 2048",
      "Min 32, max 1024",
      "Min 46, max 1500"
    ],
    answer: 0,
    explain: "Min 64, max 1518 bayt."
  },
  { id: 1003, topic: "M7_1", type: "fill",
    q: "64 bayttan küçük çerçeveler ____ (runt frame) olarak kabul edilir ve otomatik atılır.",
    answer: ["collision fragment", "çarpışma parçası", "runt"],
    explain: "Collision fragment / runt frame."
  },
  { id: 1004, topic: "M7_1", type: "mcq",
    q: "1500 bayttan fazla veri taşıyan çerçevelere ne ad verilir?",
    options: [
      "Jumbo veya baby giant çerçeveler",
      "Runt frame",
      "Collision fragment",
      "Preamble frame"
    ],
    answer: 0,
    explain: "Jumbo / baby giant frames."
  },
  { id: 1005, topic: "M7_1", type: "tf",
    q: "Giriş (preamble) alanı Ethernet çerçeve boyutu hesabına dahil edilmez.",
    answer: true,
    explain: "Slayt: 'Giriş alanı, çerçevenin boyutunu açıklarken dahil edilmez.'"
  },
  { id: 1006, topic: "M7_1", type: "mcq",
    q: "Günümüzün Ethernet LAN'ları genellikle hangi çalışma modunu kullanır?",
    options: [
      "Tam çift yönlü switch'ler (CSMA/CD gerektirmez)",
      "Yarı çift yönlü bus",
      "Simplex",
      "Yalnızca hub"
    ],
    answer: 0,
    explain: "Günümüz Ethernet LAN: full-duplex switch."
  },
  { id: 1007, topic: "M7_1", type: "fill",
    q: "Hata tespiti için kullanılan Ethernet alanı ____ (FCS) 'dir.",
    answer: ["Frame Check Sequence", "FCS"],
    explain: "FCS: error detection."
  },

  // =========================================================
  // MODÜL 7.2 - ETHERNET MAC ADRESİ
  // =========================================================
  { id: 1020, topic: "M7_2", type: "mcq",
    q: "Ethernet MAC adresi kaç bittir?",
    options: ["48 bit", "32 bit", "64 bit", "128 bit"],
    answer: 0,
    explain: "MAC: 48 bit = 12 hex = 6 byte."
  },
  { id: 1021, topic: "M7_2", type: "mcq",
    q: "Bir MAC adresinin ilk 3 baytı (24 bit, 6 hex) neyi gösterir?",
    options: [
      "Organizasyonel olarak benzersiz tanımlayıcı (OUI)",
      "Seri numarası",
      "MAC versiyonu",
      "VLAN ID"
    ],
    answer: 0,
    explain: "İlk 3 bayt (6 hex) = OUI; son 3 bayt satıcı tarafından atanır."
  },
  { id: 1022, topic: "M7_2", type: "tf",
    q: "Ethernet cihazı satan tüm satıcılar benzersiz OUI elde etmek için IEEE'ye kaydolmalıdır.",
    answer: true,
    explain: "OUI IEEE tarafından atanır."
  },
  { id: 1023, topic: "M7_2", type: "mcq",
    q: "Ethernet broadcast MAC adresi nedir?",
    options: [
      "FF-FF-FF-FF-FF-FF",
      "00-00-00-00-00-00",
      "01-00-5E-00-00-00",
      "33-33-00-00-00-01"
    ],
    answer: 0,
    explain: "Broadcast MAC = FF-FF-FF-FF-FF-FF."
  },
  { id: 1024, topic: "M7_2", type: "mcq",
    q: "IPv4 multicast çerçevelerinde hedef MAC adresinin önek baytları nelerdir?",
    options: ["01-00-5E", "33-33", "FF-FF", "00-00-5E"],
    answer: 0,
    explain: "IPv4 multicast MAC: 01-00-5E-xx-xx-xx."
  },
  { id: 1025, topic: "M7_2", type: "mcq",
    q: "IPv6 multicast çerçevelerinde hedef MAC adresinin önek baytları nelerdir?",
    options: ["33-33", "01-00-5E", "FF-FF", "00-00-0C"],
    answer: 0,
    explain: "IPv6 multicast MAC: 33-33-xx-xx-xx-xx."
  },
  { id: 1026, topic: "M7_2", type: "tf",
    q: "Kaynak MAC adresi her zaman unicast olmalıdır.",
    answer: true,
    explain: "'Source MAC address must always be unicast.'"
  },
  { id: 1027, topic: "M7_2", type: "mcq",
    q: "Bir NIC gelen Ethernet çerçevesini nasıl işler?",
    options: [
      "Hedef MAC kendi MAC'i değilse (veya broadcast/multicast grubu değilse) çerçeveyi atar",
      "Her zaman kabul eder",
      "Her zaman broadcast olarak yayar",
      "MAC'i değiştirir"
    ],
    answer: 0,
    explain: "Kendi MAC'i değilse discard; broadcast/ait olduğu multicast grubunda ise kabul."
  },
  { id: 1028, topic: "M7_2", type: "mcq",
    q: "IPv4'te hedef MAC'i bulmak için hangi protokol kullanılır?",
    options: ["ARP", "ND", "DHCP", "DNS"],
    answer: 0,
    explain: "IPv4: ARP; IPv6: ND."
  },
  { id: 1029, topic: "M7_2", type: "mcq",
    q: "IPv6'da hedef MAC'i bulmak için hangi süreç kullanılır?",
    options: ["Neighbor Discovery (ND)", "ARP", "RARP", "DHCP"],
    answer: 0,
    explain: "IPv6: Neighbor Discovery."
  },
  { id: 1030, topic: "M7_2", type: "fill",
    q: "Bir MAC adresi 12 onaltılık basamak ya da ____ bayt uzunluğundadır.",
    answer: ["6", "altı"],
    explain: "6 byte = 48 bit = 12 hex."
  },

  // =========================================================
  // MODÜL 7.3 - MAC ADRES TABLOSU
  // =========================================================
  { id: 1050, topic: "M7_3", type: "mcq",
    q: "Bir L2 Ethernet anahtarı yönlendirme kararlarını neye göre verir?",
    options: [
      "Yalnızca L2 Ethernet MAC adreslerine göre",
      "IP adreslerine göre",
      "Port numaralarına göre",
      "DNS isimlerine göre"
    ],
    answer: 0,
    explain: "Switch sadece MAC tablosuna bakar."
  },
  { id: 1051, topic: "M7_3", type: "mcq",
    q: "MAC adres tablosu bazen ____ olarak da adlandırılır.",
    options: ["CAM tablosu", "ARP tablosu", "Route tablosu", "DNS cache"],
    answer: 0,
    explain: "CAM (Content Addressable Memory) tablosu."
  },
  { id: 1052, topic: "M7_3", type: "mcq",
    q: "Anahtarın MAC tablosuna yeni giriş ekleme süreci (Learn) ne zaman olur?",
    options: [
      "Çerçevenin kaynak MAC'i tabloda yoksa, gelen portla birlikte eklenir",
      "Hedef MAC tabloda olmadığında kaynak eklenir",
      "Broadcast geldiğinde",
      "Yalnızca reboot'ta"
    ],
    answer: 0,
    explain: "Learn: kaynak MAC + port numarası tabloya eklenir."
  },
  { id: 1053, topic: "M7_3", type: "mcq",
    q: "Varsayılan olarak Cisco switch'leri bir MAC girişi ne kadar süre tutar?",
    options: ["5 dakika", "30 saniye", "1 saat", "Süresiz"],
    answer: 0,
    explain: "Default aging 5 dakika."
  },
  { id: 1054, topic: "M7_3", type: "mcq",
    q: "Hedef MAC MAC tablosunda yoksa (unknown unicast) anahtar ne yapar?",
    options: [
      "Gelen port dışındaki tüm portlardan çerçeveyi gönderir (flood)",
      "Çerçeveyi atar",
      "Broadcast geri gönderir",
      "MAC'i değiştirir"
    ],
    answer: 0,
    explain: "Unknown unicast → flood."
  },
  { id: 1055, topic: "M7_3", type: "tf",
    q: "Hedef MAC broadcast veya multicast ise switch çerçeveyi gelen port dışındaki tüm portlardan gönderir.",
    answer: true,
    explain: "Broadcast/multicast flood yapılır (multicast snooping yapılandırılmadıkça)."
  },
  { id: 1056, topic: "M7_3", type: "mcq",
    q: "Aynı MAC adresi farklı bir portta görünürse, anahtar ne yapar?",
    options: [
      "Girişi daha güncel port numarasıyla değiştirir",
      "Reddeder",
      "İki giriş tutar",
      "Cihazı kapatır"
    ],
    answer: 0,
    explain: "Entry replaced with more current port."
  },
  { id: 1057, topic: "M7_3", type: "fill",
    q: "Anahtar açıldığında MAC adres tablosu ____ olur.",
    answer: ["boş", "empty"],
    explain: "Boot sonrası MAC tablosu boştur."
  },

  // =========================================================
  // MODÜL 7.4 - ANAHTAR HIZLARI VE YÖNLENDİRME YÖNTEMLERİ
  // =========================================================
  { id: 1070, topic: "M7_4", type: "mcq",
    q: "Store-and-forward switching'in cut-through'a göre AVANTAJI nedir?",
    options: [
      "Çerçeveyi iletmeden önce CRC ile hata tespiti yapar; hatalıyı atar",
      "Her zaman daha düşük gecikme sağlar",
      "Hiç bellek kullanmaz",
      "Sadece IPv6 için çalışır"
    ],
    answer: 0,
    explain: "Store-and-forward tüm çerçeveyi alır, CRC yapar, hatalıyı atar."
  },
  { id: 1071, topic: "M7_4", type: "mcq",
    q: "Cut-through switching nasıl çalışır?",
    options: [
      "Çerçeve tamamen alınmadan önce hedef MAC okunur okunmaz iletilir",
      "Tüm çerçeveyi bekler ve kontrol eder",
      "Fiber üzerinde çalışmaz",
      "Broadcast'i engeller"
    ],
    answer: 0,
    explain: "Cut-through: hedef MAC okunur okunmaz iletir."
  },
  { id: 1072, topic: "M7_4", type: "mcq",
    q: "Cut-through switching'in iki türü nedir?",
    options: [
      "Fast-forward ve Fragment-free",
      "Store-and-forward ve Fragment-free",
      "Full-duplex ve Half-duplex",
      "Port-based ve Shared"
    ],
    answer: 0,
    explain: "Fast-forward, Fragment-free."
  },
  { id: 1073, topic: "M7_4", type: "mcq",
    q: "Fragment-free switching ne yapar?",
    options: [
      "Çerçevenin ilk 64 baytını depolayıp hata kontrolü yapar, sonra iletir",
      "Tüm çerçeveyi saklar",
      "Hiç hata kontrolü yapmaz",
      "Sadece fiberde çalışır"
    ],
    answer: 0,
    explain: "Fragment-free: ilk 64 bayt kontrol edilir (çoğu çarpışma burada olur)."
  },
  { id: 1074, topic: "M7_4", type: "tf",
    q: "Store-and-forward anahtarlama, VoIP gibi QoS gerektiren yakınsak ağlarda gereklidir.",
    answer: true,
    explain: "QoS analizi için store-and-forward şarttır."
  },
  { id: 1075, topic: "M7_4", type: "mcq",
    q: "Port-based bellek tamponlaması ile paylaşılan bellek tamponlaması arasındaki temel fark nedir?",
    options: [
      "Paylaşılan bellek tamponu dinamik olarak tahsis edilir; tüm portlarca paylaşılır",
      "Port-based bellek hiçbir port tarafından kullanılamaz",
      "İkisi aynıdır",
      "Paylaşılan bellek sadece VoIP içindir"
    ],
    answer: 0,
    explain: "Shared memory: ortak, dinamik tahsis. Port-based: belirli portlara bağlı kuyruklar."
  },
  { id: 1076, topic: "M7_4", type: "mcq",
    q: "Ethernet'te iki tip çift yönlü ayar vardır: ____",
    options: [
      "Full-duplex ve Half-duplex",
      "Simplex ve Multiplex",
      "Full ve Flex",
      "High ve Low"
    ],
    answer: 0,
    explain: "Full-duplex ve half-duplex."
  },
  { id: 1077, topic: "M7_4", type: "tf",
    q: "Gigabit Ethernet portları yalnızca full-duplex çalışır.",
    answer: true,
    explain: "Slaytta: 'Gigabit Ethernet bağlantı noktaları yalnızca tam çift yönlü çalışır.'"
  },
  { id: 1078, topic: "M7_4", type: "mcq",
    q: "Duplex mismatch ne zaman oluşur?",
    options: [
      "Bağlantının bir ucu half-duplex, diğer ucu full-duplex çalışıyorsa",
      "Her iki uç da full-duplex ise",
      "Auto-negotiation her iki tarafta açıksa ve eşleşirse",
      "Fiber kullanıldığında her zaman"
    ],
    answer: 0,
    explain: "Duplex mismatch: bir uç half, diğeri full."
  },
  { id: 1079, topic: "M7_4", type: "mcq",
    q: "Auto-MDIX özelliği ne yapar?",
    options: [
      "Kablo türünü otomatik algılayıp arayüzü uygun biçimde yapılandırır",
      "Duplex sorununu çözer",
      "VLAN ataması yapar",
      "MAC filtreleme yapar"
    ],
    answer: 0,
    explain: "Auto-MDIX: kablo türünü algılar."
  },
  { id: 1080, topic: "M7_4", type: "fill",
    q: "Auto-MDIX'i yeniden etkinleştirmek için kullanılan interface config komutu: ____ auto",
    answer: ["mdix"],
    explain: "`mdix auto`."
  },
  { id: 1081, topic: "M7_4", type: "tf",
    q: "En iyi uygulama, her iki Ethernet anahtar bağlantı noktasını tam çift yönlü (full-duplex) yapılandırmaktır.",
    answer: true,
    explain: "Slayt: best practice full-duplex her iki porta."
  }
];

// Konu başlığı oluştururken kullanılacak modül haritası
const TOPIC_MODULE = {
  M1_1: 1, M1_2: 1, M1_3: 1, M1_4: 1, M1_5: 1, M1_6: 1, M1_7: 1, M1_8: 1, M1_9: 1,
  M2_1: 2, M2_2: 2, M2_3: 2, M2_4: 2, M2_5: 2, M2_6: 2, M2_7: 2, M2_8: 2,
  M3_1: 3, M3_2: 3, M3_3: 3, M3_4: 3, M3_5: 3, M3_6: 3, M3_7: 3,
  M4_1: 4, M4_2: 4, M4_3: 4, M4_4: 4, M4_5: 4, M4_6: 4,
  M5_1: 5, M5_2: 5,
  M6_1: 6, M6_2: 6, M6_3: 6,
  M7_1: 7, M7_2: 7, M7_3: 7, M7_4: 7,
  M8_1: 8, M8_2: 8, M8_3: 8, M8_4: 8, M8_5: 8,
  M9_1: 9, M9_2: 9, M9_3: 9
};
