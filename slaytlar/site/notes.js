// ITN v7 · Modül 1-9 — Vize için kapsamlı ders notları
// Her modül sınavda çıkabilecek tanım, liste, karşılaştırma ve ayrıntıları içerir.

const NOTES = [
  // =====================================================================
  {
    id: "M1",
    title: "Modül 1 · Networking Today (Ağlar ve Günümüz)",
    sections: [
      {
        h: "1.1 Ağlar Hayatımızı Nasıl Etkiliyor?",
        body: `
<p><b>İletişim</b> hayatta hava, su, yiyecek ve barınma kadar önemlidir. Ağlar insanların iletişimini, öğrenmesini, çalışmasını ve eğlenmesini kolaylaştırır.</p>
<ul>
  <li><b>Küresel topluluklar:</b> Ağlar coğrafi engelleri kaldırır, anlık iletişim sağlar.</li>
  <li>İnsan ağı (human network): Ağlar üzerinden birbirine bağlı insanlar oluşturur.</li>
  <li>Ağlar; öğrenme (e-learning), iletişim (VoIP, video konferans), çalışma (uzaktan çalışma), oyun/eğlence için kullanılır.</li>
</ul>`
      },
      {
        h: "1.2 Ağ Bileşenleri",
        body: `
<p>Tüm ağlar üç temel bileşenden oluşur:</p>
<ul>
  <li><b>Cihazlar (Devices)</b>
    <ul>
      <li><b>Uç cihazlar (End devices / hosts):</b> Bilgisayar, yazıcı, IP telefon, tablet, TPOS terminali, kamera.
        Her uç cihazın <b>IP adresi</b> vardır. Mesajı üreten veya alan cihazdır.</li>
      <li><b>Ara cihazlar (Intermediary devices):</b> Switch, router, wireless access point, firewall.
        Görevleri: sinyal üretme, yol belirleme, paketleri yönlendirme, güvenlik.</li>
    </ul>
  </li>
  <li><b>Medya (Media):</b> Bakır kablo, fiber optik, kablosuz.</li>
  <li><b>Hizmetler (Services):</b> E-posta, web, dosya paylaşımı vb. uygulamalar.</li>
</ul>

<p><b>Sunucu / İstemci (Server / Client):</b></p>
<ul>
  <li><b>Server:</b> Bilgi ve hizmet sağlayan (mail, web, file, DHCP, DNS…).</li>
  <li><b>Client:</b> Bilgi isteyen/alan uç cihaz.</li>
  <li><b>Peer-to-peer (P2P):</b> Cihaz hem istemci hem sunucu gibi davranır (SOHO ağlarda yaygın; yönetimi zordur, ölçeklenmez, performans düşüktür).</li>
</ul>`
      },
      {
        h: "1.3 Ağ Gösterimleri ve Topolojiler",
        body: `
<p><b>Ağ gösterim (representation) bilgileri:</b> cihaz tipi ve adı, arayüz, IP adresi, varsayılan ağ geçidi.</p>

<p><b>İki tür topoloji diyagramı:</b></p>
<ul>
  <li><b>Fiziksel topoloji:</b> Cihazların fiziksel konumları ve kablolar gösterilir.</li>
  <li><b>Mantıksal topoloji:</b> Cihazlar, arayüzler ve IP adresleme şeması gösterilir.</li>
</ul>`
      },
      {
        h: "1.4 Yaygın Ağ Türleri",
        body: `
<ul>
  <li><b>LAN (Local Area Network):</b> Küçük coğrafi alan (ev, okul, ofis). Bir kişi/kurum tarafından yönetilir. Yüksek bant genişliği.</li>
  <li><b>WAN (Wide Area Network):</b> Geniş coğrafi alan (şehirler/ülkeler). Birden fazla LAN'ı birbirine bağlar. Servis sağlayıcı (ISP) tarafından işletilir. Genelde daha düşük hız.</li>
  <li><b>MAN, WLAN, SAN</b> gibi türler de vardır.</li>
  <li><b>İnternet:</b> Birbirine bağlı ağların dünya çapındaki birleşimi.</li>
  <li><b>Intranet:</b> Bir kuruma özel, yalnızca iç kullanıcıların erişebildiği ağ.</li>
  <li><b>Extranet:</b> Organizasyon dışı iş ortaklarına/müşterilere güvenli erişim sağlar.</li>
</ul>`
      },
      {
        h: "1.5 İnternet Bağlantıları",
        body: `
<p><b>Ev/SOHO bağlantı türleri:</b></p>
<ul>
  <li><b>Cable (Kablo):</b> TV kablo şirketi tarafından; yüksek bant genişliği, her zaman açık, her zaman bağlı.</li>
  <li><b>DSL:</b> Telefon hattı üzerinden; genellikle yüksek bant genişliği, sürekli bağlantı.</li>
  <li><b>Cellular (Hücresel):</b> Mobil telefon ağı üzerinden; kapsama alanı ve hız şebekeye bağlıdır.</li>
  <li><b>Satellite:</b> Uydu antenine görüş gerekir; kablo/DSL olmayan kırsal alanlar için iyi seçenek.</li>
  <li><b>Dial-up:</b> Telefon hattı + modem; çok yavaş, eski.</li>
</ul>

<p><b>Kurumsal bağlantı türleri:</b></p>
<ul>
  <li><b>Dedicated/Leased Line:</b> ISP tarafından kiralanmış, ayrılmış dijital hat; yüksek güvenilirlik.</li>
  <li><b>Metro Ethernet / Ethernet WAN:</b> Şehir genelinde Ethernet teknolojisi kullanarak LAN'ı WAN'a uzatır.</li>
  <li><b>Business DSL / SDSL:</b> İş için simetrik DSL.</li>
  <li><b>Satellite:</b> Kablolu altyapı yoksa kurumsal kullanım için.</li>
</ul>`
      },
      {
        h: "1.6 Yakınsak (Converged) Ağ",
        body: `
<p><b>Converged network:</b> Ses, veri ve video gibi farklı iletişim türlerinin <i>aynı altyapı</i> üzerinden taşınmasıdır. Eskiden her hizmet ayrı ağ kullanıyordu (telefon ağı, veri ağı…), günümüzde hepsi tek IP tabanlı ağdan geçer.</p>`
      },
      {
        h: "1.7 Güvenilir Ağın 4 Temel Özelliği",
        body: `
<ol>
  <li><b>Fault Tolerance (Hata toleransı):</b> Bir bileşen bozulsa bile çalışır; <i>paket anahtarlamalı</i> ağlarda birden fazla yol olabilir.</li>
  <li><b>Scalability (Ölçeklenebilirlik):</b> Yeni kullanıcı/uygulama eklendiğinde performans korunur.</li>
  <li><b>QoS (Quality of Service):</b> Ağ tıkandığında <i>önceliklendirme</i> yapılır (sesli çağrı > e-posta).</li>
  <li><b>Security (Güvenlik):</b> İki ana başlık altında:
    <ul>
      <li><b>Ağ altyapı güvenliği:</b> Cihazlara fiziksel ve mantıksal erişim kısıtlanır.</li>
      <li><b>Bilgi güvenliği (CIA):</b>
        <ul>
          <li><b>Confidentiality (Gizlilik):</b> Sadece yetkililer erişir.</li>
          <li><b>Integrity (Bütünlük):</b> Veri değiştirilmediğinden emin olunur.</li>
          <li><b>Availability (Erişilebilirlik):</b> Kullanıcılar hizmete zamanında erişebilir.</li>
        </ul>
      </li>
    </ul>
  </li>
</ol>`
      },
      {
        h: "1.8 Ağ Trendleri",
        body: `
<ul>
  <li><b>BYOD (Bring Your Own Device):</b> Kullanıcının kendi cihazını kullanması; esneklik sağlar.</li>
  <li><b>Online İşbirliği:</b> Cisco WebEx, Teams, Zoom vb.</li>
  <li><b>Video iletişimi:</b> Cisco TelePresence vb.</li>
  <li><b>Cloud Computing:</b>
    <ul>
      <li><b>Public Cloud:</b> Herkese açık (AWS, Azure).</li>
      <li><b>Private Cloud:</b> Tek bir organizasyona özel.</li>
      <li><b>Hybrid Cloud:</b> Public + Private.</li>
      <li><b>Custom Cloud:</b> Belirli bir sektöre özel (sağlık, askeri).</li>
    </ul>
  </li>
  <li><b>Powerline Networking:</b> Elektrik prizi üzerinden veri; yeni kablo çekilemeyen yerlerde.</li>
  <li><b>Wireless ISP (WISP):</b> Kırsal alanlarda kablosuz geniş bant.</li>
  <li><b>Smart Home / IoT:</b> Cihazların birbirine bağlanması.</li>
</ul>`
      },
      {
        h: "1.9 Ağ Güvenliği Tehditleri ve Çözümleri",
        body: `
<p><b>Tehdit kaynakları:</b></p>
<ul>
  <li><b>External (Dış) tehditler:</b> Amatör hackerlar, organize hackerlar, hacktivistler, devlet destekli saldırılar.</li>
  <li><b>Internal (İç) tehditler:</b> Kaybolan/çalınan cihaz, kazara hatalı kullanım, kötü niyetli çalışan. Genelde dıştan daha tehlikelidir çünkü içeriden erişim kolaydır.</li>
</ul>

<p><b>Yaygın saldırı/tehdit türleri:</b> virüs, solucan (worm), Truva atı (Trojan), spyware, adware, zero-day, hacker saldırısı, DoS, veri çalma, kimlik hırsızlığı.</p>

<p><b>Küçük ev/ofis için güvenlik:</b> virüsten/spyware'den korunma yazılımı, firewall filtreleme.</p>
<p><b>Büyük kurumlar için ek güvenlik:</b> <b>Dedicated firewall</b>, <b>ACL (Access Control List)</b>, <b>IPS (Intrusion Prevention System)</b>, <b>VPN</b> (sanal özel ağ).</p>`
      },
      {
        h: "1.10 BT Profesyoneli",
        body: `
<p>Ağ mühendisleri Cisco Networking Academy eğitimleri ile sertifika hazırlığı yapar (CCNA, CCNP, CCIE). CompTIA Network+ da temel bir sertifikadır.</p>`
      }
    ]
  },

  // =====================================================================
  {
    id: "M2",
    title: "Modül 2 · Basic Switch and End Device Configuration",
    sections: [
      {
        h: "2.1 İşletim Sistemi (OS) Temelleri",
        body: `
<p>Tüm uç cihazlar ve ağ cihazları çalışmak için bir OS'e ihtiyaç duyar. OS üç katmandan oluşur:</p>
<ul>
  <li><b>Shell (Kabuk):</b> Kullanıcı ile çekirdek arasında köprü. CLI veya GUI olabilir.</li>
  <li><b>Kernel (Çekirdek):</b> Donanım ile yazılım arasında iletişim sağlar, kaynakları yönetir.</li>
  <li><b>Hardware (Donanım):</b> Fiziksel cihaz bileşenleri.</li>
</ul>

<p><b>GUI vs CLI:</b></p>
<ul>
  <li><b>GUI:</b> Görsel, kullanımı kolay (Windows, macOS, Linux GUI).</li>
  <li><b>CLI:</b> Metin tabanlı, daha az kaynak, hatalara daha dayanıklı — <b>Cisco cihazları CLI ile yönetilir</b> (Cisco IOS).</li>
</ul>`
      },
      {
        h: "2.2 Cisco IOS'a Erişim Yöntemleri",
        body: `
<ul>
  <li><b>Console (Konsol):</b> Cihazın konsol portuna doğrudan kablo (rollover). <b>Out-of-band</b> erişim: ağ yapılandırılmasa da çalışır; başlangıç yapılandırması için kullanılır.</li>
  <li><b>SSH (Secure Shell):</b> Güvenli, <b>şifreli</b> uzak erişim. Üretim sistemleri için önerilen yöntem.</li>
  <li><b>Telnet:</b> Uzak erişim, ama <b>şifrelenmemiş</b> (kullanıcı adı ve parola düz metin). <b>Güvensiz!</b> Telnet yerine SSH kullanın.</li>
  <li><b>AUX (Yardımcı) port:</b> Eski modemle dial-up uzak erişim sağlar.</li>
</ul>

<p><b>Terminal emülasyon programları:</b> PuTTY, Tera Term, SecureCRT, OS X Terminal.</p>`
      },
      {
        h: "2.3 IOS Komut Modları",
        body: `
<p>Cisco IOS komut satırı <b>hiyerarşik</b> modlara ayrılmıştır:</p>
<ul>
  <li><b>User EXEC (Kullanıcı) modu:</b> <code>Router&gt;</code> — Sadece <u>görüntüleme</u> izni olan sınırlı mod.</li>
  <li><b>Privileged EXEC (Ayrıcalıklı) modu:</b> <code>Router#</code> — Tüm göster/değiştir/sil komutlarına erişim; <code>enable</code> komutuyla girilir, <code>disable</code> ile çıkılır.</li>
  <li><b>Global Configuration modu:</b> <code>Router(config)#</code> — Cihaz genelindeki ayarları değiştirir; <code>configure terminal</code> ile girilir.</li>
  <li><b>Subconfiguration modları (Global'in alt modları):</b>
    <ul>
      <li><b>Line Config:</b> <code>Router(config-line)#</code> — <code>line console 0</code>, <code>line vty 0 4</code>.</li>
      <li><b>Interface Config:</b> <code>Router(config-if)#</code> — <code>interface gigabitethernet 0/0/0</code>, <code>interface vlan 1</code>.</li>
    </ul>
  </li>
</ul>

<p>Mod geçişleri: <code>end</code> veya <code>Ctrl+Z</code> ile doğrudan privileged EXEC'e döner; <code>exit</code> bir önceki moda geri gider.</p>`
      },
      {
        h: "2.4 Komut Yapısı ve Yardım",
        body: `
<p><b>Komut yapısı:</b></p>
<pre>switch&gt; komut anahtar_kelime argüman</pre>
<ul>
  <li><b>Keyword (Anahtar kelime):</b> Önceden tanımlı seçenek (ör. <code>running-config</code>).</li>
  <li><b>Argument:</b> Kullanıcı tarafından tanımlanan değer (ör. host adı).</li>
</ul>

<p><b>IOS yardım özellikleri:</b></p>
<ul>
  <li><b>Context-sensitive help (<code>?</code>):</b> Bir komuttan sonra <code>?</code> yazarak devam eden seçenekleri görür.</li>
  <li><b>Command syntax check:</b> Hatalı komutta "<i>Ambiguous / Incomplete / Incorrect</i>" mesajı.</li>
  <li><b>Tab</b> tuşu komutu otomatik tamamlar.</li>
</ul>

<p><b>Hotkey ve kısayollar:</b></p>
<ul>
  <li><b>Ctrl+A:</b> Satır başına git.</li>
  <li><b>Ctrl+E:</b> Satır sonuna git.</li>
  <li><b>Ctrl+R:</b> Satırı yeniden göster.</li>
  <li><b>Ctrl+Z:</b> Konfigürasyon modundan privileged EXEC'e dön.</li>
  <li><b>Ctrl+C:</b> Konfigürasyon modundan çık veya komutu iptal et.</li>
  <li><b>Ctrl+Shift+6:</b> DNS lookup, ping, traceroute gibi işlemleri durdur.</li>
  <li><b>Yukarı / Aşağı ok:</b> Komut geçmişinde gezinti.</li>
  <li><b>Space:</b> Uzun çıktıda sonraki sayfa; <b>Enter:</b> sonraki satır.</li>
</ul>`
      },
      {
        h: "2.5 Temel Cihaz Yapılandırması",
        body: `
<p><b>Hostname (Cihaz adı):</b> <code>Switch(config)# hostname Sw1</code></p>

<p><b>Parola türleri:</b></p>
<ul>
  <li><b>Console parolası</b> — konsol erişimini kısıtlar:
    <pre>line console 0
 password cisco
 login
 exit</pre>
  </li>
  <li><b>Enable secret</b> — privileged EXEC moduna girişte sorulur (şifreli saklanır):
    <pre>enable secret sifre</pre>
  </li>
  <li><b>VTY parolası</b> — Telnet/SSH girişini kısıtlar:
    <pre>line vty 0 4
 password cisco
 login
 exit</pre>
  </li>
</ul>

<p><b>Tüm düz metin parolaları şifrele:</b></p>
<pre>service password-encryption</pre>

<p><b>Banner mesajı (uyarı metni):</b></p>
<pre>banner motd # Yetkisiz erişim yasaktır! #</pre>`
      },
      {
        h: "2.6 Konfigürasyon Dosyaları",
        body: `
<ul>
  <li><b>running-config</b> — RAM'de, o anki çalışan yapılandırma. Güç kesilirse <b>silinir</b>.</li>
  <li><b>startup-config</b> — NVRAM'de, cihaz açılışında yüklenen yapılandırma. Güç kesilse de <b>kalıcıdır</b>.</li>
</ul>

<p><b>Kaydetme / yükleme komutları:</b></p>
<ul>
  <li><code>copy running-config startup-config</code> — değişiklikleri kalıcı yap.</li>
  <li><code>show running-config</code> / <code>show startup-config</code> — görüntüle.</li>
  <li><code>reload</code> — yeniden başlat (startup-config'ten yükler).</li>
  <li><code>erase startup-config</code> — NVRAM'deki yapılandırmayı sil.</li>
</ul>

<p><b>İpucu:</b> Bir değişiklik yaptıktan sonra çalışmazsa <code>reload</code> ile orijinal yapılandırmaya dönülebilir (sadece RAM'deki değişir).</p>`
      },
      {
        h: "2.7 IP Adresleme ve SVI",
        body: `
<p><b>IPv4 adresi:</b> 32 bit, <i>noktalı ondalık</i> (dotted decimal). Örn: <code>192.168.1.10</code>.</p>
<p><b>Subnet mask:</b> Ağ ve host bölümünü belirler; <code>255.255.255.0</code> gibi.</p>
<p><b>Varsayılan ağ geçidi (Default gateway):</b> Farklı ağa giden paketler için router IP'si.</p>
<p><b>IPv6 adresi:</b> 128 bit, <b>onaltılık (hex)</b> 8 hextet (<code>2001:db8::1</code>).</p>

<p><b>Switch üzerinde yönetim için SVI (Switch Virtual Interface) kurulumu (VLAN 1):</b></p>
<pre>Sw(config)# interface vlan 1
Sw(config-if)# ip address 192.168.1.2 255.255.255.0
Sw(config-if)# no shutdown
Sw(config-if)# exit
Sw(config)# ip default-gateway 192.168.1.1</pre>

<p><b>PC'de IP yapılandırma:</b></p>
<ul>
  <li><b>Manuel (statik):</b> IP, maske, gateway, DNS elle girilir — sunucular/yazıcılar için uygun.</li>
  <li><b>Otomatik (DHCP):</b> DHCP sunucusu IP bilgisini dağıtır — istemciler için uygun.</li>
</ul>`
      },
      {
        h: "2.8 Bağlantı Doğrulama",
        body: `
<ul>
  <li><b>ping &lt;ip&gt;:</b> Hedef cihazın erişilebilirliğini test eder (IPv4/IPv6). "!" başarılı, "." zaman aşımı.</li>
  <li><b>show ip interface brief:</b> Arayüz IP durumu (<code>up/up</code> = aktif).</li>
  <li><b>show running-config</b> — aktif yapılandırmayı gör.</li>
</ul>`
      }
    ]
  },

  // =====================================================================
  {
    id: "M3",
    title: "Modül 3 · Protocols and Models",
    sections: [
      {
        h: "3.1 Temel İletişim ve Kurallar",
        body: `
<p>Her iletişimin 3 unsuru: <b>kaynak (sender)</b>, <b>hedef (receiver)</b>, <b>kanal (channel)</b>.</p>

<p><b>Kurallar (Protokoller) arasında bulunması gerekenler:</b></p>
<ul>
  <li>Gönderici ve alıcı kimliği</li>
  <li>Ortak dil ve dilbilgisi</li>
  <li>İletim hızı ve zamanlama</li>
  <li>Mesajın alındığının onayı (acknowledgment) gereksinimleri</li>
</ul>`
      },
      {
        h: "3.2 Mesaj Gereksinimleri",
        body: `
<ul>
  <li><b>Message encoding (Kodlama):</b> Bilgilerin iletilebilir bir formata dönüştürülmesi (bit, ışık, elektrik sinyali).</li>
  <li><b>Message formatting & encapsulation (Biçim ve kapsülleme):</b> Mesaja başlık/altbilgi eklenerek adres ve kontrol bilgileri eklenir.</li>
  <li><b>Message size (Boyut):</b> Büyük mesajlar küçük parçalara (frame, packet) bölünür.</li>
  <li><b>Message timing (Zamanlama):</b>
    <ul>
      <li><i>Flow control</i> — gönderim hızı alıcıya uyumlu olmalı.</li>
      <li><i>Response timeout</i> — cevap beklemek için süre sınırı.</li>
      <li><i>Access method</i> — ortamı kullanma sırası (CSMA/CD, CSMA/CA vb.).</li>
    </ul>
  </li>
  <li><b>Message delivery options (Teslimat):</b>
    <ul>
      <li><b>Unicast:</b> tek cihaza.</li>
      <li><b>Multicast:</b> seçili bir gruba.</li>
      <li><b>Broadcast:</b> tüm cihazlara (IPv4).</li>
      <li><b>Anycast:</b> IPv6'da, bir grup içinde <i>en yakın</i> cihaza.</li>
    </ul>
  </li>
</ul>`
      },
      {
        h: "3.3 Ağ Protokolleri ve Fonksiyonları",
        body: `
<p><b>Protokol türleri:</b></p>
<ul>
  <li><b>Network communications:</b> HTTP, TCP, IP</li>
  <li><b>Network security:</b> SSH, SSL, TLS</li>
  <li><b>Routing protocols:</b> OSPF, BGP, EIGRP</li>
  <li><b>Service discovery:</b> DHCP, DNS</li>
</ul>

<p><b>Protokollerin ortak fonksiyonları:</b> adresleme, güvenilirlik, akış kontrolü, sıralama, hata tespiti, uygulama arayüzü.</p>`
      },
      {
        h: "3.4 Protokol Suite'leri (Yığınları)",
        body: `
<p>Bir <b>protocol suite</b>, bir sisteme hizmet veren birbirleriyle uyumlu protokollerin grubudur.</p>

<p><b>Yaygın suites:</b> TCP/IP (en yaygın, <i>açık standart</i>), OSI, AppleTalk, Novell NetWare.</p>

<p><b>TCP/IP özellikleri:</b></p>
<ul>
  <li><b>Açık (open):</b> Herkes ücretsiz kullanabilir.</li>
  <li><b>Standart tabanlı:</b> IETF tarafından RFC olarak yayınlanır.</li>
  <li><b>Katmanlı</b> yapıdadır.</li>
</ul>

<p><b>TCP/IP iletişim süreci örneği (web sayfası):</b> kullanıcı URL'yi yazar → DNS ad çözümlemesi → TCP bağlantı kurulumu → HTTP isteği → HTTP yanıtı → tarayıcıda görüntüleme.</p>`
      },
      {
        h: "3.5 Standart Kuruluşları",
        body: `
<p><b>İnternet standartları:</b></p>
<ul>
  <li><b>ISOC (Internet Society):</b> Açık gelişimi teşvik eder.</li>
  <li><b>IAB (Internet Architecture Board):</b> Mimari yönetim.</li>
  <li><b>IETF (Internet Engineering Task Force):</b> RFC'leri yayınlar, protokol geliştirir.</li>
  <li><b>IRTF (Internet Research Task Force):</b> Uzun vadeli araştırma.</li>
  <li><b>ICANN:</b> IP ve alan adı tahsisi (yönetim).</li>
  <li><b>IANA:</b> ICANN'in bir alt parçası; IP adres bloklarını, port numaralarını yönetir.</li>
</ul>

<p><b>Elektronik / iletişim standartları:</b></p>
<ul>
  <li><b>IEEE:</b> 802.3 (Ethernet), 802.11 (Wi-Fi), 802.15 (Bluetooth).</li>
  <li><b>EIA/TIA:</b> Kablolama standartları (TIA/EIA-568).</li>
  <li><b>ITU-T:</b> Telekomünikasyon standartları.</li>
</ul>

<p><b>Açık standartların faydası:</b> birlikte çalışabilirlik, rekabet, maliyet düşürme, hızlı inovasyon.</p>`
      },
      {
        h: "3.6 Referans Modelleri (OSI ve TCP/IP)",
        body: `
<p><b>OSI modeli — 7 katman:</b></p>
<ol>
  <li><b>Physical</b> (L1) — bit iletimi, kablolar, konektörler.</li>
  <li><b>Data Link</b> (L2) — MAC, çerçeveleme, ortam erişimi.</li>
  <li><b>Network</b> (L3) — IP, yönlendirme, paketler.</li>
  <li><b>Transport</b> (L4) — TCP/UDP, segmentasyon, port numaraları.</li>
  <li><b>Session</b> (L5) — oturum yönetimi.</li>
  <li><b>Presentation</b> (L6) — şifreleme, sıkıştırma, format.</li>
  <li><b>Application</b> (L7) — HTTP, FTP, SMTP, DNS.</li>
</ol>

<p><b>TCP/IP modeli — 4 katman:</b></p>
<ol>
  <li><b>Network Access</b> — OSI'nin Physical + Data Link katmanlarına karşılık.</li>
  <li><b>Internet</b> — OSI'nin Network katmanına karşılık (IP).</li>
  <li><b>Transport</b> — OSI'nin Transport katmanına karşılık (TCP/UDP).</li>
  <li><b>Application</b> — OSI'nin Session + Presentation + Application katmanlarına karşılık.</li>
</ol>

<p><b>Katmanlı modelin faydaları:</b> standartlaştırma, modülerlik, birlikte çalışma, karmaşıklığı parçalara ayırma, sorun giderme kolaylığı.</p>`
      },
      {
        h: "3.7 Kapsülleme ve PDU'lar",
        body: `
<p><b>Segmentation (Segmentasyon):</b> Büyük veriler küçük parçalara bölünür — güvenilirlik ve <i>multiplexing</i> (aynı ağda birden fazla konuşma) sağlanır. <b>TCP</b> sırası ve yeniden iletimi yönetir.</p>

<p><b>PDU (Protocol Data Unit) — her katmanda farklı ad:</b></p>
<ul>
  <li><b>Application:</b> Data</li>
  <li><b>Transport:</b> <b>Segment</b></li>
  <li><b>Network:</b> <b>Packet</b></li>
  <li><b>Data Link:</b> <b>Frame</b></li>
  <li><b>Physical:</b> <b>Bits</b></li>
</ul>

<p><b>Kapsülleme akışı (gönderici):</b> Data → Segment (L4) → Packet (L3) → Frame (L2) → Bits (L1). <b>De-kapsülleme</b> alıcıda tersine yapılır.</p>`
      },
      {
        h: "3.8 Veri Erişimi: L2 ve L3 Adresleme",
        body: `
<p><b>IP (L3) adres yapısı:</b> iki bölüm — <b>network/prefix</b> ve <b>host/interface ID</b>.</p>

<p><b>Aynı ağda iletişim:</b> IP (L3) + MAC (L2) adresleri doğrudan kaynaktan hedefe.</p>

<p><b>Farklı ağlara iletişim:</b> Paket, <b>default gateway</b>'e gönderilir.</p>

<p><b>Önemli kural:</b></p>
<ul>
  <li><b>L3 IP adresleri</b> yolculuk boyunca <i>değişmez</i> (kaynak → hedef).</li>
  <li><b>L2 MAC adresleri</b> her hop'ta (her router geçişinde) <i>değişir</i>, çünkü her bağlantı bir sonraki cihaza özel.</li>
</ul>`
      }
    ]
  },

  // =====================================================================
  {
    id: "M4",
    title: "Modül 4 · Physical Layer",
    sections: [
      {
        h: "4.1 Fiziksel Katmanın Amacı",
        body: `
<p>Fiziksel katman, bit'leri ortamda sinyale çevirip iletir.</p>
<ul>
  <li><b>NIC (Ağ Arabirim Kartı):</b> L2 adresleme ve L1 sinyal üretme işlerini yapar.</li>
  <li><b>Fiziksel katman standartları 3 alanı tanımlar:</b>
    <ul>
      <li>Fiziksel bileşenler (kablolar, konnektörler)</li>
      <li>Kodlama (encoding)</li>
      <li>Sinyalleşme (signaling)</li>
    </ul>
  </li>
</ul>`
      },
      {
        h: "4.2 Bant Genişliği ve Performans",
        body: `
<ul>
  <li><b>Bandwidth (Bant genişliği):</b> Birim zamanda taşınabilecek veri miktarı. Birimler:
    <b>bps</b>, <b>Kbps</b>, <b>Mbps</b>, <b>Gbps</b>, <b>Tbps</b>.</li>
  <li><b>Latency (Gecikme):</b> Bir bitin kaynağı terk etmesi ile hedefe ulaşması arasındaki süre.</li>
  <li><b>Throughput (Gerçek iş gücü):</b> Belli bir zaman diliminde <i>gerçekte</i> aktarılan veri miktarı — genelde <b>bandwidth'ten düşüktür</b> (gecikme, yoğun trafik, hata vb. nedenlerle).</li>
  <li><b>Goodput:</b> Hata düzeltme, başlık (header) vb. yükleri çıkardıktan sonra kalan yararlı veri hızı.</li>
</ul>`
      },
      {
        h: "4.3 Bakır (Copper) Kablolama",
        body: `
<p>En yaygın ve en ucuz, kurulumu kolay medya. <b>Dezavantajları:</b></p>
<ul>
  <li><b>Attenuation (Zayıflama):</b> Mesafe arttıkça sinyal zayıflar.</li>
  <li><b>EMI / RFI:</b> Dış elektromanyetik/radyo gürültüsü.</li>
  <li><b>Crosstalk:</b> Komşu kablodan gelen parazit.</li>
</ul>

<p>Azaltıcı önlemler: doğru tip seçimi, kablo uzunluk sınırlarına uyum, <b>twist (bükme)</b> ve <b>shielding</b>.</p>

<p><b>Üç tür bakır kablo:</b></p>
<ul>
  <li><b>UTP (Unshielded Twisted Pair):</b> Korumasız, bükümlü çiftli. <u>En yaygın LAN kablosu.</u></li>
  <li><b>STP (Shielded Twisted Pair):</b> Metal zırh eklenmiş — daha iyi EMI koruması.</li>
  <li><b>Coaxial:</b> Merkezi bakır iletken + yalıtkan + zırh. Kablo TV, eski Ethernet, anten bağlantılarında kullanılır.</li>
</ul>`
      },
      {
        h: "4.4 UTP Detayları",
        body: `
<ul>
  <li>4 çift bükümlü tel, her çiftin farklı bükme açısı paraziti azaltır.</li>
  <li><b>Kategoriler:</b> Cat3 (telefon), Cat5 / Cat5e (100 Mbps → 1 Gbps), Cat6 / Cat6a (1-10 Gbps), Cat7/Cat8.</li>
  <li><b>Konektör:</b> <b>RJ-45</b>.</li>
  <li><b>TIA/EIA-568A</b> ve <b>TIA/EIA-568B</b> pin dizilişleri.</li>
</ul>

<p><b>Kablo türleri:</b></p>
<ul>
  <li><b>Straight-through (düz):</b> Farklı türde cihazları bağlar (PC ↔ switch, switch ↔ router).</li>
  <li><b>Crossover (çapraz):</b> Aynı türden cihazlar (switch ↔ switch, PC ↔ PC, router ↔ router).</li>
  <li><b>Rollover:</b> Konsol portuna bağlanır (PC ↔ Cisco router/switch konsol portu).</li>
</ul>

<p><b>Auto-MDIX:</b> Modern switch/router'lar kablo türünü otomatik algılar — düz/çapraz farketmez.</p>`
      },
      {
        h: "4.5 Fiber Optik",
        body: `
<p>Cam çekirdek üzerinden <b>ışık darbeleriyle</b> veri iletir. Bakıra göre avantajları:</p>
<ul>
  <li>Çok daha uzak mesafe (kilometrelerce).</li>
  <li>Çok yüksek bant genişliği.</li>
  <li><b>EMI/RFI'dan etkilenmez</b>.</li>
  <li>Gizlice dinlenmesi zordur.</li>
</ul>

<p><b>İki tür fiber:</b></p>
<ul>
  <li><b>Single-mode (SMF):</b> İnce çekirdek, tek ışık yolu, çok uzun mesafe — uzun haul (telekom) ve denizaltı.</li>
  <li><b>Multimode (MMF):</b> Daha kalın çekirdek, birden çok ışık yolu (modal dispersion) — kısa/orta mesafe, kampüs ağları.</li>
</ul>

<p><b>Kullanım alanları:</b> kurumsal ağ omurgası, FTTH (eve fiber), uzun mesafe, denizaltı kablolar.</p>

<p><b>Bağlayıcılar (konektörler):</b> <b>ST</b> (bayonet), <b>SC</b> (square/snap), <b>LC</b> (küçük), <b>Duplex LC</b>.</p>

<p><b>Patch kablo renkleri (genel geçer):</b> sarı — single-mode; turuncu/aqua — multimode.</p>`
      },
      {
        h: "4.6 Kablosuz Medya (Wireless)",
        body: `
<p><b>Özellikleri:</b> hareketlilik sağlar, kablo gerektirmez.</p>

<p><b>Dezavantajları / Sınırlamaları:</b></p>
<ul>
  <li><b>Kapsama alanı (coverage)</b> sınırlıdır.</li>
  <li><b>Interference (girişim):</b> Diğer kablosuz cihazlar, duvarlar, mikrodalga vb.</li>
  <li><b>Güvenlik:</b> Hava ortamı herkese açık; WPA2/WPA3 gibi şifreleme şart.</li>
  <li><b>Paylaşımlı medya:</b> CSMA/CA ile erişim kontrol edilir, hız kullanıcılara bölünür.</li>
</ul>

<p><b>Standartlar:</b></p>
<ul>
  <li><b>IEEE 802.11 — Wi-Fi</b></li>
  <li><b>IEEE 802.15 — Bluetooth</b> (WPAN)</li>
  <li><b>IEEE 802.16 — WiMAX</b></li>
  <li><b>IEEE 802.15.4 — Zigbee</b> (IoT, düşük güç)</li>
</ul>

<p><b>WLAN bileşenleri:</b> <b>Access Point (AP)</b>, <b>kablosuz NIC</b>'ler (istemcilerde).</p>`
      }
    ]
  },

  // =====================================================================
  {
    id: "M5",
    title: "Modül 5 · Number Systems",
    sections: [
      {
        h: "5.1 İkili (Binary) Sayı Sistemi",
        body: `
<p>Bilgisayarlar <b>taban 2</b> (binary) kullanır: sadece <b>0</b> ve <b>1</b>.</p>
<ul>
  <li>Her basamağa <b>bit</b> denir; 8 bit = 1 <b>byte</b>.</li>
  <li>Bit değerleri 2'nin kuvvetleridir: 128, 64, 32, 16, 8, 4, 2, 1.</li>
</ul>

<p><b>IPv4 adresi:</b> 32 bit → 4 oktet (her oktet 8 bit, 0-255 arası).</p>

<p><b>Binary → Decimal (İkiliden onluğa):</b> Her 1 bitin pozisyon değerini toplarız.</p>
<p>Örn: <code>11000000 = 128 + 64 = 192</code> → <code>11000000.10101000.00000001.00000001 = 192.168.1.1</code>.</p>

<p><b>Decimal → Binary:</b> En büyük 2'nin kuvvetinden başla, çıkarabiliyorsan 1 yaz, yoksa 0. Devam et.</p>
<p>Örn: <code>200</code> → 128 (1) → kalan 72 → 64 (1) → kalan 8 → 32 (0), 16 (0), 8 (1), 4 (0), 2 (0), 1 (0) = <code>11001000</code>.</p>`
      },
      {
        h: "5.2 Onaltılık (Hex) Sayı Sistemi",
        body: `
<p>Taban 16 sistemdir. Basamaklar: <b>0-9, A, B, C, D, E, F</b> (A=10 ... F=15). Her hex basamağı tam olarak <b>4 bit</b>'i temsil eder.</p>

<p><b>IPv6 adresi:</b> 128 bit, 32 hex karakter, her 4 karakter <b>hextet</b> (16 bit). 8 hextet <code>:</code> ile ayrılır.</p>

<p>Örn: <code>2001:0DB8:0000:0000:0000:0000:0000:0001</code> → sıfırlar sıkıştırılarak <code>2001:DB8::1</code>.</p>

<p><b>MAC adresi:</b> 48 bit → 12 hex karakter (örn. <code>00:1A:2B:3C:4D:5E</code>).</p>

<p><b>Hex → Decimal dönüşümü:</b> <code>2A = 2×16 + 10 = 42</code>.</p>
<p><b>Decimal → Hex:</b> 16'ya art arda böl, kalanları tersten oku.</p>`
      }
    ]
  },

  // =====================================================================
  {
    id: "M6",
    title: "Modül 6 · Data Link Layer",
    sections: [
      {
        h: "6.1 Veri Bağlantısı Katmanının Amacı",
        body: `
<p>Katman 2, <b>NIC'ten NIC'e</b> iletişim sağlar. L3 paketlerini <b>çerçeve (frame)</b> içinde kapsüller ve <b>hata tespiti</b> yapar.</p>

<p><b>IEEE 802 LAN/MAN iki alt katmana ayırır:</b></p>
<ul>
  <li><b>LLC (Logical Link Control) — 802.2:</b> Üst katmanla (L3) iletişim; farklı medyalar üzerinde aynı görevi yapmaya yarar.</li>
  <li><b>MAC (Media Access Control) — 802.3 / 802.11 / ...:</b> Donanıma özgü erişim kontrolü, çerçeveleme, MAC adresleme, hata tespiti.</li>
</ul>

<p><b>Router'ın L2 görevleri:</b> Gelen çerçevenin FCS'sini kontrol etmek, L3 paketini çözmek, yeni L2 çerçeve yapmak (farklı ortam için).</p>`
      },
      {
        h: "6.2 L2 Standart Kuruluşları",
        body: `
<ul>
  <li><b>IEEE</b> — Ethernet, Wi-Fi, Bluetooth</li>
  <li><b>ITU</b></li>
  <li><b>ISO</b> — HDLC</li>
  <li><b>ANSI</b></li>
</ul>`
      },
      {
        h: "6.3 Topolojiler",
        body: `
<p><b>Fiziksel vs mantıksal topoloji</b> ayrımı burada da vardır.</p>

<p><b>WAN topolojileri:</b></p>
<ul>
  <li><b>Point-to-Point:</b> İki nokta arasında doğrudan bağlantı.</li>
  <li><b>Hub-and-Spoke:</b> Merkezi bir düğüm, çevre düğümler merkeze bağlı (yıldız benzeri).</li>
  <li><b>Mesh:</b> Her düğüm diğerine bağlı (yüksek yedeklilik, yüksek maliyet).</li>
</ul>

<p><b>LAN topolojileri:</b></p>
<ul>
  <li><b>Star (yıldız):</b> Tüm uçlar merkezi bir switch'e bağlıdır — en yaygın.</li>
  <li><b>Extended Star:</b> Birden fazla yıldız bir araya gelir.</li>
  <li><b>Bus:</b> Tek bir kabloya tüm cihazlar bağlanır (eski).</li>
  <li><b>Ring (halka):</b> Cihazlar halka biçiminde bağlı (Token Ring, FDDI).</li>
</ul>`
      },
      {
        h: "6.4 Half-Duplex ve Full-Duplex",
        body: `
<ul>
  <li><b>Half-duplex:</b> Aynı anda <b>sadece tek yöne</b> iletişim olur. Cihazlar sıra ile gönderir (telsiz gibi). Eski hub'lı Ethernet ve paylaşımlı WLAN.</li>
  <li><b>Full-duplex:</b> Aynı anda <b>iki yönlü</b> iletişim. Modern switch'lerde standart. Çarpışma (collision) yoktur.</li>
</ul>`
      },
      {
        h: "6.5 Ortam Erişim Yöntemleri",
        body: `
<p><b>Contention-based (yarışmalı) erişim:</b> Cihazlar sıra beklemez, ortamı serbestçe kullanır.</p>
<ul>
  <li><b>CSMA/CD (Collision Detection):</b> Eski paylaşımlı kablolu Ethernet. Önce dinle, boşsa gönder; çarpışma olursa bekleyip yeniden dene.</li>
  <li><b>CSMA/CA (Collision Avoidance):</b> <b>Kablosuz (802.11)</b> ağlarda kullanılır. Çarpışmayı tespit etmek zor olduğu için <i>önlemeye</i> çalışır (RTS/CTS, rastgele bekleme).</li>
</ul>

<p><b>Controlled (kontrollü) erişim:</b> Her cihaz ortama sırayla erişir — token, oylama vb.</p>
<ul>
  <li><b>Token Ring</b>, <b>ARCNET</b> (eski teknolojiler).</li>
</ul>`
      },
      {
        h: "6.6 Veri Bağlantı Çerçevesi (Frame)",
        body: `
<p><b>Çerçeve yapısı:</b></p>
<ol>
  <li><b>Header (Başlık):</b> Start frame, addressing (kaynak/hedef MAC), type, control.</li>
  <li><b>Data:</b> L3 paketini taşır (payload).</li>
  <li><b>Trailer (Kuyruk):</b> Hata tespiti (FCS — Frame Check Sequence), stop frame.</li>
</ol>

<p><b>L2 adresi (MAC / fiziksel adres):</b> Yalnızca <i>aynı yerel ağda</i> anlamlıdır — yerel teslimat için kullanılır.</p>

<p><b>Ortak LAN/WAN çerçeve tipleri:</b> Ethernet, 802.11 Wireless, PPP, HDLC, Frame-Relay.</p>`
      }
    ]
  },

  // =====================================================================
  {
    id: "M7",
    title: "Modül 7 · Ethernet Switching",
    sections: [
      {
        h: "7.1 Ethernet ve Standartları",
        body: `
<p><b>Ethernet</b>, OSI'nin <b>L1 (Physical) ve L2 (Data Link)</b> katmanlarında çalışır.</p>
<ul>
  <li><b>IEEE 802.2:</b> LLC alt katmanı.</li>
  <li><b>IEEE 802.3:</b> MAC alt katmanı + fiziksel katman (kablo Ethernet).</li>
</ul>

<p><b>MAC alt katmanı fonksiyonları:</b> veri kapsülleme, MAC adresleme, hata tespiti, ortam erişim kontrolü (CSMA/CD).</p>`
      },
      {
        h: "7.2 Ethernet Çerçevesi",
        body: `
<p><b>Alanlar sırasıyla:</b></p>
<ol>
  <li><b>Preamble (7 byte)</b> + <b>SFD (1 byte)</b> — Senkronizasyon.</li>
  <li><b>Destination MAC (6 byte)</b></li>
  <li><b>Source MAC (6 byte)</b></li>
  <li><b>EtherType / Length (2 byte)</b> — hangi L3 protokolü (IPv4: 0x0800, IPv6: 0x86DD, ARP: 0x0806).</li>
  <li><b>Data (46-1500 byte)</b> — L3 paketi.</li>
  <li><b>FCS (4 byte)</b> — Frame Check Sequence (CRC ile hata tespiti).</li>
</ol>

<p><b>Boyut sınırları:</b></p>
<ul>
  <li><b>Minimum 64 byte.</b> Bundan küçük → <b>collision fragment / runt frame</b> (geçersiz, atılır).</li>
  <li><b>Maximum 1518 byte.</b> Bundan büyük → <b>jumbo / baby giant</b> (standart dışı).</li>
</ul>`
      },
      {
        h: "7.3 MAC Adresleri",
        body: `
<p><b>MAC adresi:</b> 48 bit = 6 byte = 12 hex karakter. Örn: <code>00-1A-2B-3C-4D-5E</code>.</p>

<p><b>Yapı:</b></p>
<ul>
  <li>İlk 24 bit: <b>OUI</b> (Organizationally Unique Identifier) — IEEE tarafından üreticilere verilir.</li>
  <li>Son 24 bit: üretici tarafından atanan benzersiz numara.</li>
</ul>

<p><b>NIC kararı:</b> Gelen çerçevenin hedef MAC'i kendi MAC'i, broadcast veya dinlenen multicast ise <b>kabul eder</b>; aksi halde <b>atar</b>.</p>

<p><b>MAC türleri:</b></p>
<ul>
  <li><b>Unicast:</b> Tek cihaza (normal hedef MAC).</li>
  <li><b>Broadcast:</b> <code>FF-FF-FF-FF-FF-FF</code> — aynı yayın alanındaki tüm cihazlar.</li>
  <li><b>Multicast:</b>
    <ul>
      <li>IPv4 multicast → MAC <code>01-00-5E-xx-xx-xx</code></li>
      <li>IPv6 multicast → MAC <code>33-33-xx-xx-xx-xx</code></li>
    </ul>
  </li>
</ul>

<p><b>IP → MAC çözümleme:</b></p>
<ul>
  <li><b>IPv4:</b> <b>ARP</b> (Address Resolution Protocol).</li>
  <li><b>IPv6:</b> <b>Neighbor Discovery</b> (NDP) — ICMPv6 mesajlarıyla.</li>
</ul>`
      },
      {
        h: "7.4 MAC Adres Tablosu (CAM Tablosu)",
        body: `
<p>Switch'in her portu için MAC öğrenmesi:</p>

<p><b>Öğrenme:</b> Gelen çerçevenin <i>kaynak MAC</i>'ini ve geldiği portu tabloya kaydeder. Kayıtlar <b>5 dakika</b> (aging timer) kullanılmazsa silinir.</p>

<p><b>İletim (Forwarding):</b></p>
<ul>
  <li><b>Known unicast:</b> Hedef MAC tabloda varsa sadece o porttan iletilir.</li>
  <li><b>Unknown unicast:</b> Hedef MAC tabloda yoksa <b>tüm portlara flood</b> eder (gelen port hariç).</li>
  <li><b>Broadcast/Multicast:</b> Tüm portlara flood eder.</li>
</ul>`
      },
      {
        h: "7.5 Anahtar (Switch) Yönlendirme Yöntemleri",
        body: `
<ul>
  <li><b>Store-and-Forward:</b> Çerçevenin tamamı alınır, <b>FCS ile hata kontrolü</b> yapılır, sonra iletilir. Daha güvenilir. <b>QoS</b> için uygundur çünkü frame boyutunu bilir.</li>
  <li><b>Cut-Through:</b> Başlığın hedef MAC'i okunur okunmaz iletilir. Daha hızlıdır ama hatayı tespit etmez.
    <ul>
      <li><b>Fast-forward:</b> İlk 6 byte okunduktan sonra iletilir (en hızlı).</li>
      <li><b>Fragment-free:</b> İlk 64 byte bekletilip çarpışma parçalarını engeller (arada bir denge).</li>
    </ul>
  </li>
</ul>`
      },
      {
        h: "7.6 Bellek Tamponlama (Memory Buffering)",
        body: `
<ul>
  <li><b>Port-based buffering:</b> Her port kendi kuyruğuna sahiptir; bir porttaki yoğunluk diğerini geciktirebilir.</li>
  <li><b>Shared memory buffering:</b> Tüm portlar ortak bellek havuzunu paylaşır; daha esnek ve yaygın.</li>
</ul>`
      },
      {
        h: "7.7 Hız ve Duplex Ayarları",
        body: `
<ul>
  <li><b>Autonegotiation:</b> Bağlantının her iki tarafı en yüksek hızı ve full-duplex'i görüşerek belirler.</li>
  <li><b>Duplex mismatch:</b> Bir taraf full-duplex, diğeri half-duplex olursa — yavaşlık, çok sayıda hata/collision.</li>
  <li><b>Auto-MDIX:</b> Arayüz straight/crossover kabloyu otomatik ayarlar.</li>
</ul>`
      }
    ]
  },

  // =====================================================================
  {
    id: "M8",
    title: "Modül 8 · Network Layer (Ağ Katmanı)",
    sections: [
      {
        h: "8.1 Ağ Katmanının Özellikleri",
        body: `
<p><b>Ağ katmanı (L3)</b> uçlar (hostlar) arasında <b>uçtan uca iletişim</b> sağlar. 4 temel fonksiyonu vardır:</p>
<ol>
  <li><b>Hostları adresleme:</b> Her host benzersiz bir IP adresine sahip olur.</li>
  <li><b>Kapsülleme (Encapsulation):</b> Transport segmentini alır, kaynak ve hedef IP ile <b>packet (paket)</b> oluşturur.</li>
  <li><b>Routing (Yönlendirme):</b> Paketi kaynaktan hedefe farklı ağlar üzerinden taşır — router'lar karar verir.</li>
  <li><b>De-kapsülleme:</b> Hedef hostta başlık çıkarılır, segment üst katmana verilir.</li>
</ol>

<p><b>IP (Internet Protocol) özellikleri:</b></p>
<ul>
  <li><b>Connectionless (Bağlantısız):</b> Önceden bağlantı kurmaz.</li>
  <li><b>Best effort (Güvenilmez):</b> Paketin hedefe ulaşacağını garanti etmez, onay (ack) beklemez, yeniden göndermez. Güvenilirliği üst katman (TCP) sağlar.</li>
  <li><b>Media independent (Medya bağımsız):</b> Kablo/fiber/kablosuz herhangi bir L2 üzerinde çalışır.</li>
</ul>`
      },
      {
        h: "8.2 IPv4 ve IPv6 Paketleri",
        body: `
<p><b>IPv4 başlığı önemli alanları:</b></p>
<ul>
  <li><b>Version:</b> 4</li>
  <li><b>Differentiated Services (DiffServ, DSCP):</b> QoS önceliklendirmesi.</li>
  <li><b>Time to Live (TTL):</b> Her router'dan geçişte 1 azalır; 0 olunca paket atılır, ICMP "Time exceeded" gönderilir (sonsuz döngüyü engeller).</li>
  <li><b>Protocol:</b> Üst katman protokolü (TCP=6, UDP=17, ICMP=1).</li>
  <li><b>Header Checksum:</b> Başlık hata kontrolü.</li>
  <li><b>Source / Destination IPv4 Address</b></li>
</ul>

<p><b>IPv4'ün sınırlılıkları:</b> IP adres tükenmesi, Internet yönlendirme tablosu büyümesi, uçtan uca bağlantı eksikliği (NAT).</p>

<p><b>IPv6 avantajları:</b></p>
<ul>
  <li>Çok daha geniş adres alanı (128 bit).</li>
  <li>Basitleştirilmiş başlık (sabit 40 byte) → hızlı işleme.</li>
  <li>Hiyerarşik adresleme, daha verimli yönlendirme.</li>
  <li>Dahili güvenlik desteği (IPsec zorunlu tasarım).</li>
  <li>NAT'a gerek yok.</li>
</ul>

<p><b>IPv6 başlığı önemli alanları:</b> Version (6), Traffic Class, Flow Label, <b>Payload Length</b>, <b>Next Header</b> (protokol), <b>Hop Limit</b> (IPv4 TTL karşılığı), Source Address (128 bit), Destination Address (128 bit). IPv6'da yönlendiriciler <b>fragmantasyon yapmaz</b> — bu işi kaynak host yapar.</p>`
      },
      {
        h: "8.3 Host Nasıl Yönlendirir?",
        body: `
<p>Bir host paketi göndereceği zaman <b>hedef IP adresinin kendi ağında olup olmadığını</b> değerlendirir:</p>
<ul>
  <li><b>Aynı ağdaysa:</b> Paket doğrudan hedef hosta gönderilir (ARP ile MAC bulunur).</li>
  <li><b>Farklı ağdaysa:</b> Paket <b>default gateway (varsayılan ağ geçidi)</b>'ne gönderilir — router bunu sonraki ağa yönlendirir.</li>
</ul>

<p><b>Kararı verirken kullandığı tablo:</b> host'un yönlendirme tablosu. Genelde şu girdiler bulunur:</p>
<ul>
  <li><b>Direct connection</b> — kendi arayüzü.</li>
  <li><b>Local network</b> — yerel ağ için.</li>
  <li><b>Default route (0.0.0.0/0)</b> — diğer tüm trafik; gateway'e gider.</li>
</ul>

<p>Windows'ta <code>route print</code> / <code>netstat -r</code>, Linux/macOS'ta <code>netstat -r</code> veya <code>ip route</code> komutlarıyla görüntülenir.</p>`
      },
      {
        h: "8.4 Router Tanıtımı",
        body: `
<p><b>Router:</b> Farklı ağları birbirine bağlayan L3 cihazdır. Gelen her pakete şu kararları verir:</p>
<ul>
  <li>Çerçeveyi çöz (de-encapsulate), L3 paketi incele.</li>
  <li><b>Yönlendirme tablosuna</b> bak: hedef IP için en iyi yol (next-hop, çıkış arayüzü) var mı?</li>
  <li>Paketi yeni bir L2 çerçeveye yeniden kapsülle (yeni kaynak/hedef MAC).</li>
  <li>Doğru çıkış portundan ilet.</li>
</ul>

<p><b>Router bileşenleri:</b> <b>CPU</b>, <b>RAM</b> (running-config, routing table, ARP cache — güç kesilirse silinir), <b>ROM</b> (bootstrap, POST, limited IOS), <b>Flash</b> (IOS imajı), <b>NVRAM</b> (startup-config), <b>arayüzler</b> (LAN, WAN, konsol, AUX).</p>

<p><b>Boot aşamaları:</b> 1) <b>POST</b> + bootstrap (ROM) → 2) <b>IOS yükle</b> (Flash) → 3) <b>startup-config</b>'i uygula (NVRAM → RAM).</p>`
      },
      {
        h: "8.5 Yönlendirme Tablosu",
        body: `
<p>Router yönlendirme tablosundaki girdilerin kaynağı (letter code):</p>
<ul>
  <li><b>L (Local):</b> Router'ın arayüzünün IP'si (/32 veya /128).</li>
  <li><b>C (Connected):</b> Router'a doğrudan bağlı bir ağ.</li>
  <li><b>S (Static):</b> Yönetici tarafından elle girilmiş.</li>
  <li><b>D / O / R / B:</b> Dinamik yönlendirme protokollerinden (EIGRP / OSPF / RIP / BGP).</li>
</ul>

<p><b>Dinamik yönlendirme protokollerinin görevleri:</b></p>
<ul>
  <li>Uzak ağları keşfetmek (neighbor discovery).</li>
  <li>En iyi yolu seçmek.</li>
  <li>Yol değişirse tabloları güncelleyip yönlendirmeyi sürdürmek.</li>
</ul>

<p><b>Static vs Dynamic karşılaştırması:</b></p>
<ul>
  <li><b>Statik:</b> Küçük ağlarda basit, güvenli, az kaynak kullanır; ama değişikliğe manuel müdahale gerekir.</li>
  <li><b>Dinamik:</b> Büyük ağlarda ölçeklenir, otomatik adapte olur; ama CPU/RAM/bant genişliği tüketir.</li>
</ul>`
      }
    ]
  },

  // =====================================================================
  {
    id: "M9",
    title: "Modül 9 · Address Resolution (ARP ve IPv6 ND)",
    sections: [
      {
        h: "9.1 MAC ve IP Adreslemenin Rolü",
        body: `
<p>Bir hostun çerçeve oluşturabilmesi için <b>hem hedef IP hem de hedef MAC</b> gerekir:</p>
<ul>
  <li><b>IP (L3)</b> — uçtan uca adresleme. Paket boyunca değişmez.</li>
  <li><b>MAC (L2)</b> — yerel (link üzerinde) adresleme. Her router geçişinde (hop) kaynak/hedef MAC <b>değişir</b>.</li>
</ul>

<p><b>Aynı ağdaysa:</b> Hedef IP = hedef hostun IP'si → hedef MAC = hedef hostun MAC'i.</p>
<p><b>Farklı ağdaysa:</b> Hedef IP = <u>hedef hostun IP'si</u> → ama hedef MAC = <u>default gateway'in MAC'i</u>!</p>`
      },
      {
        h: "9.2 ARP (Address Resolution Protocol) — IPv4",
        body: `
<p>ARP, bir IPv4 adresine karşılık gelen MAC adresini bulmak için kullanılır.</p>

<p><b>ARP'nin 2 ana görevi:</b></p>
<ol>
  <li>IPv4 adresini MAC adresine <b>çözümlemek (resolve)</b>.</li>
  <li>Çözümlenen eşleşmeleri bir tabloda (ARP cache) <b>tutmak</b>.</li>
</ol>

<p><b>ARP Request (istek):</b></p>
<ul>
  <li><b>Broadcast</b> olarak gönderilir — hedef MAC: <code>FF-FF-FF-FF-FF-FF</code>.</li>
  <li>"Bu IP'ye sahip olan kim? Bana MAC'ini söyle."</li>
  <li>Tüm cihazlar çerçeveyi alır; sadece IP'si uyan <b>tek cihaz</b> cevap verir.</li>
</ul>

<p><b>ARP Reply (cevap):</b></p>
<ul>
  <li><b>Unicast</b> olarak sadece isteği gönderen hosta yanıt verilir.</li>
  <li>"IP X.X.X.X benimdir, MAC adresim şudur."</li>
</ul>

<p><b>ARP Cache (tablo):</b> İşletim sistemi cevapları önbelleğe alır; aynı hedefe tekrar ARP göndermez. <b>Zaman aşımı</b> vardır (dakikalar). Kayıt eskiyince tekrar sorulur.</p>

<ul>
  <li>Windows: <code>arp -a</code></li>
  <li>Cisco IOS: <code>show ip arp</code></li>
</ul>

<p><b>ARP sorunları:</b></p>
<ul>
  <li><b>Broadcast trafiği:</b> Her ARP isteği tüm cihazları kesintiye uğratır.</li>
  <li><b>ARP Spoofing / Poisoning:</b> Saldırgan sahte ARP cevaplarıyla trafiği kendine yönlendirir. Kurumsal switch'ler bunu <b>Dynamic ARP Inspection (DAI)</b> ile engeller.</li>
</ul>`
      },
      {
        h: "9.3 IPv6 Neighbor Discovery (ND)",
        body: `
<p>IPv6'da <b>ARP yoktur</b>. Onun yerine <b>ICMPv6</b> kullanan <b>Neighbor Discovery (NDP)</b> çalışır.</p>

<p><b>4 ana mesaj:</b></p>
<ul>
  <li><b>Router Solicitation (RS):</b> Host, ağa bağlandığında "bu ağın router'ı var mı?" der.</li>
  <li><b>Router Advertisement (RA):</b> Router kendini ve ağ prefix'ini duyurur (SLAAC için).</li>
  <li><b>Neighbor Solicitation (NS):</b> ARP Request'e karşılık — komşunun MAC adresi sorulur.</li>
  <li><b>Neighbor Advertisement (NA):</b> ARP Reply karşılığı — MAC adresini bildirir.</li>
</ul>

<p><b>Adres çözümleme akışı:</b> Host A, B'nin IPv6 adresinden bir <b>solicited-node multicast adresi</b> üretir ve bu adrese NS mesajı gönderir. Bu adresi dinleyen tek cihaz B'dir → NA ile cevap verir.</p>

<p><b>Avantajları:</b></p>
<ul>
  <li>Broadcast <b>yok</b> — bunun yerine multicast kullanılır, daha az gürültü.</li>
  <li><b>Duplicate Address Detection (DAD)</b> — adres çakışmalarını engeller.</li>
  <li>Yönlendirici keşfi ve SLAAC ile otomatik yapılandırma.</li>
</ul>

<p><b>Bitmiş komut:</b> Cisco IOS'ta <code>show ipv6 neighbors</code>.</p>`
      }
    ]
  }
];

if (typeof module !== 'undefined') { module.exports = { NOTES }; }
