#!/usr/bin/env python3
"""ITN_Module_3 çeviri önbelleğinde: anlam hatalarını giderir, ders dilinde terimleri İngilizce bırakır."""
import json
import os
import subprocess
import sys

CACHE = os.path.join(os.path.dirname(__file__), "ITN_Module_3_translation_cache.json")
SCRIPT = os.path.join(os.path.dirname(__file__), "itn_module3_translate_pdf.py")

# Anahtar = orijinal İngilizce parça (JSON key), değer = düzeltilmiş Türkçe (+ gerekli İngilizce terimler)
FIXES: dict[str, str] = {
    # Uluslararası kuruluş / katman adları (İTÜ = ITU karışması, Application = Başvuru hatası)
    "(ITU)": "(ITU)",
    "7 - Application": "7 - Application",
    "Application": "Application",
    "1 - Physical": "1 - Physical",
    "2 - Data Link": "2 - Data Link",
    "3 - Network": "3 - Network",
    "4 - Transport": "4 - Transport",
    "5 - Session": "5 - Session",
    "6 - Presentation": "6 - Presentation",
    "Network": "Network",
    "Transport": "Transport",
    "Discovery": "Discovery",
    "Routing": "Routing",
    "Ethernet": "Ethernet",
    "Internet": "Internet",
    "Hypertext Transfer": "Hypertext Transfer",
    "Transmission Control": "Transmission Control",
    "Area Network (LAN)": "Local Area Network (LAN)",
    "LAN).": "LAN).",
    # Yanlış çeviri: addressing → hitap
    "addressing.": "adresleme.",
    # Anlam bozan / eksik makine çevirileri
    "• TCP/IP protocols operate at the": (
        "• TCP/IP protokolleri application, transport ve internet katmanlarında çalışır."
    ),
    "• Each LAN or WAN will have the same": (
        "• Her LAN veya WAN aynı network portion değerine sahip olur."
    ),
    "• Notice that the packet is not modified, but the frame is changed, therefore the L3 IP": (
        "• Paket değiştirilmez; frame değişir; bu nedenle L3 IP adreslemesi, "
        "L2 MAC adreslemesinin aksine segmentten segmente değişmez."
    ),
    "• TCP/IP is the protocol suite used by": "• TCP/IP, Internet tarafından kullanılan protokol paketidir.",
    "Note: Broadcasts are used in IPv4 networks, but are not an option for IPv6. Later we will also": (
        "Not: Broadcast IPv4 ağlarında kullanılır; IPv6 için seçenek değildir. Daha sonra ayrıca"
    ),
    "link frame from one network interface card (NIC) to another NIC on the same network.": (
        "data link frame'i bir NIC'ten aynı ağdaki başka bir NIC'e iletmekle sorumludur."
    ),
    "• Networks require the use of several": (
        "• Ağlar, iletişim için birden çok protokolün kullanılmasını gerektirir."
    ),
    "• Protocols may have may have one": "• Protokollerin bir veya daha fazla işlevi olabilir.",
    "• Can be implemented on": "• Şu ortamlarda uygulanabilir:",
    "• Rules": "• Rules",
    "• Foster competition because products from different vendors can work together": (
        "• Farklı üreticilerin ürünleri birlikte çalışabildiği için rekabeti teşvik eder"
    ),
    "• Assist in protocol design because protocols that operate at a specific layer have": (
        "• Belirli bir katmanda çalışan protokollerin işlediği bilginin ve üst/alt katman "
        "arayüzünün tanımlı olması sayesinde protokol tasarımına yardımcı olur"
    ),
    "• Open System Interconnection (OSI)": "• Open Systems Interconnection (OSI)",
    "• Open Systems Interconnection (OSI)": "• Open Systems Interconnection (OSI)",
    "Default Gateway MAC) Receives": "Default Gateway MAC) çerçeveyi alır",
    "the internet and includes many": "Internet'i ve birçok protokolü içerir",
    "internet": "internet",
    "internet layers.": "internet katmanları.",
    "• Part 1: Research Networking Standards Organizations": (
        "• Bölüm 1: Networking Standards kuruluşlarını araştırma"
    ),
    "• Provide a common language to describe networking functions and capabilities": (
        "• Networking işlev ve yeteneklerini tanımlamak için ortak dil sağlar"
    ),
    "• Prevent technology or capability changes in one layer from affecting other layers": (
        "• Bir katmandaki teknoloji veya yetenek değişikliklerinin diğer katmanları etkilemesini önler"
    ),
    "Protocols": "Protocols",
    "Protocol Suites": "Protocol Suites",
    "The Rules": "The Rules",
    "Data Link Addresses": "Data Link Addresses",
    "Data Link Addresses (Cont.)": "Data Link Addresses (Cont.)",
    "•": "•",
    "▪": "▪",
}


def main() -> None:
    with open(CACHE, encoding="utf-8") as f:
        data: dict[str, str] = json.load(f)

    n = 0
    for k, v in FIXES.items():
        if k in data:
            if data[k] != v:
                data[k] = v
                n += 1
        else:
            print(f"[uyarı] önbellekte yok: {k[:60]!r}", file=sys.stderr)

    for k, v in list(data.items()):
        if v is None:
            data[k] = k
            n += 1

    with open(CACHE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Güncellenen girdi: {n}")
    r = subprocess.run([sys.executable, SCRIPT, "--pdf-only"], check=False)
    sys.exit(r.returncode)


if __name__ == "__main__":
    main()
