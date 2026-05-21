import util

# ============================================================
# CS168 Project 1B 
# Not:
# - Her TODO en fazla 1-2 satır olmalı.
# - Yorumlarda ilgili test ve byte ipuçları verildi.
# ============================================================

TRACEROUTE_MAX_TTL = 30
TRACEROUTE_PORT_NUMBER = 33434
PROBE_ATTEMPT_COUNT = 3


class IPv4:
    version: int
    header_len: int
    tos: int
    length: int
    id: int
    flags: int
    frag_offset: int
    ttl: int
    proto: int
    cksum: int
    src: str
    dst: str

    def __init__(self, buffer: bytes):
        if len(buffer) < 20:
            raise ValueError("Truncated IPv4 header")

        first_byte = buffer[0]
        self.version = first_byte >> 4
        ihl_words = first_byte & 0x0F
        self.header_len = ihl_words * 4

        if self.header_len < 20:
            raise ValueError("Invalid IPv4 header length")
        if len(buffer) < self.header_len:
            raise ValueError("Truncated IPv4 header with options")

        self.tos = buffer[1]
        self.length = int.from_bytes(buffer[2:4], byteorder="big")
        self.id = int.from_bytes(buffer[4:6], byteorder="big")

        flags_and_offset = int.from_bytes(buffer[6:8], byteorder="big")
        self.flags = (flags_and_offset >> 13) & 0x7
        self.frag_offset = flags_and_offset & 0x1FFF

        self.ttl = buffer[8]
        self.proto = buffer[9]
        self.cksum = int.from_bytes(buffer[10:12], byteorder="big")
        self.src = util.inet_ntoa(buffer[12:16])
        self.dst = util.inet_ntoa(buffer[16:20])

    def __str__(self) -> str:
        return f"IPv{self.version} (tos 0x{self.tos:x}, ttl {self.ttl}, " + \
            f"id {self.id}, flags 0x{self.flags:x}, " + \
            f"ofsset {self.frag_offset}, " + \
            f"proto {self.proto}, header_len {self.header_len}, " + \
            f"len {self.length}, cksum 0x{self.cksum:x}) " + \
            f"{self.src} > {self.dst}"


class ICMP:
    type: int
    code: int
    cksum: int

    def __init__(self, buffer: bytes):
        if len(buffer) < 4:
            raise ValueError("Truncated ICMP header")

        self.type = buffer[0]
        self.code = buffer[1]
        self.cksum = int.from_bytes(buffer[2:4], byteorder="big")

    def __str__(self) -> str:
        return f"ICMP (type {self.type}, code {self.code}, " + \
            f"cksum 0x{self.cksum:x})"


class UDP:
    src_port: int
    dst_port: int
    len: int
    cksum: int

    def __init__(self, buffer: bytes):
        if len(buffer) < 8:
            raise ValueError("Truncated UDP header")

        self.src_port = int.from_bytes(buffer[0:2], byteorder="big")
        self.dst_port = int.from_bytes(buffer[2:4], byteorder="big")
        self.len = int.from_bytes(buffer[4:6], byteorder="big")
        self.cksum = int.from_bytes(buffer[6:8], byteorder="big")

    def __str__(self) -> str:
        return f"UDP (src_port {self.src_port}, dst_port {self.dst_port}, " + \
            f"len {self.len}, cksum 0x{self.cksum:x})"


# ------------------------------------------------------------
# TEST B2 / B3:
# Sadece iki ICMP cevabı kabul et.
# 1) TTL expired       -> type 11, code 0
# 2) Port unreachable  -> type 3,  code 3
# ------------------------------------------------------------
def _is_relevant_icmp(icmp_packet: ICMP) -> bool:
    if icmp_packet.type == 11 and icmp_packet.code == 0:
        return True
    if icmp_packet.type == 3 and icmp_packet.code == 3:
        return True
    return False


def _extract_response(
    buf: bytes,
    destination_ip: str,
    valid_ports: set[int],
) -> tuple[str, int, bool] | None:
    """Geçerliyse (router_ip, matched_dst_port, is_destination) döndürür."""
    try:
        outer_ip = IPv4(buf)
    except ValueError:
        return None

    # ----------------------------------------------------
    # TEST B4 + parse alıştırması:
    # Dış IPv4 header'da protocol alanı 9. byte'tadır.
    # İpucu: zero-based index kullanıyoruz, yani 10. byte = [9]
    # ----------------------------------------------------
    outer_proto = buf[9]                  # TODO PARSE+B4: buf içinden protocol alanını al
    if outer_proto != 1:                        # TODO B4: outer_proto ICMP değilse None dön
        return None

    icmp_start = outer_ip.header_len
    if len(buf) < icmp_start + 8:
        return None

    try:
        icmp_packet = ICMP(buf[icmp_start:icmp_start + 8])
    except ValueError:
        return None

    # ----------------------------------------------------
    # TEST B2 / B3:
    # Geçersiz ICMP türü / kodu varsa paketi yok say.
    # ----------------------------------------------------
    if not _is_relevant_icmp(icmp_packet):                        # TODO B2/B3: _is_relevant_icmp False ise None dön
        return None

    inner_ip_start = icmp_start + 8
    try:
        inner_ip = IPv4(buf[inner_ip_start:])
    except ValueError:
        return None

    # ----------------------------------------------------
    # TEST B7:
    # ICMP payload içindeki orijinal paket UDP olmalı.
    # ----------------------------------------------------
    if inner_ip.proto != 17:                        # TODO B7: inner_ip.proto UDP değilse None dön
        return None

    # ----------------------------------------------------
    # TEST B16 + parse alıştırması:
    # Inner IPv4 header içinde destination IP alanı 16:20 byte aralığındadır.
    # Ama dikkat: bu aralık inner IP'nin başlangıcına göredir.
    # Yani buf içinde başlangıç = inner_ip_start + 16 olur.
    # ----------------------------------------------------
    inner_dst_ip = util.inet_ntoa(buf[inner_ip_start + 16:inner_ip_start + 20])                # TODO PARSE+B16: inner destination IP'yi buf'tan çıkar
    if inner_dst_ip != destination_ip:                        # TODO B16: inner_dst_ip != destination_ip ise None dön
        return None

    inner_udp_start = inner_ip_start + inner_ip.header_len
    try:
        inner_udp = UDP(buf[inner_udp_start:inner_udp_start + 8])
    except ValueError:
        return None

    # ----------------------------------------------------
    # TEST B13 / B14 / B15 / B16 + Küçük parse alıştırması:
    # UDP header içinde destination port alanı 2:4 byte aralığındadır.
    # Ama bu aralık UDP header'ın başlangıcına göredir.
    # Yani buf içinde başlangıç = inner_udp_start + 2 olur.
    # ----------------------------------------------------
    parsed_dst_port = int.from_bytes(buf[inner_udp_start + 2:inner_udp_start + 4], byteorder="big")              # TODO PARSE+B13-B16: inner UDP dst port'u buf'tan çıkar
    if parsed_dst_port not in valid_ports:                        # TODO B13-B16: parsed_dst_port kümede değilse None dön
        return None

    is_destination = (
        icmp_packet.type == 3 and
        icmp_packet.code == 3 and
        outer_ip.src == destination_ip
    )
    return outer_ip.src, parsed_dst_port, is_destination



def traceroute(sendsock: util.Socket, recvsock: util.Socket, ip: str) \
        -> list[list[str]]:
    """Run traceroute and return the discovered path."""

    discovered_path: list[list[str]] = []
    next_port = TRACEROUTE_PORT_NUMBER

    for ttl in range(1, TRACEROUTE_MAX_TTL + 1):
        sendsock.set_ttl(ttl)

        ttl_ports: list[int] = []
        for probe_index in range(PROBE_ATTEMPT_COUNT):
            probe_port = next_port
            next_port += 1
            ttl_ports.append(probe_port)
            payload = f"ttl={ttl};probe={probe_index}".encode()
            sendsock.sendto(payload, (ip, probe_port))

        pending_ports = set(ttl_ports)
        routers: list[str] = []
        seen_routers: set[str] = set()
        destination_reached = False

        while pending_ports:
            # ------------------------------------------------
            # TEST B1 / B11 / B12:
            # Yeni cevap hazır değilse daha fazla bekleme.
            # Timeout alındığında bu TTL turunu bırak.
            # ------------------------------------------------
            if not recvsock.recv_select():                # TODO B1/B11/B12: recv_select False ise break et
                break

            buf, _ = recvsock.recvfrom()
            parsed = _extract_response(buf, ip, set(ttl_ports))
            if parsed is None:
                continue

            router_ip, matched_port, is_destination = parsed

            # ------------------------------------------------
            # TEST B13 / B14 / B15:
            # Aynı probe için daha önce cevap geldiyse,
            # bu duplicate cevap olabilir; yok say.
            # ------------------------------------------------
            if matched_port not in pending_ports:                # TODO B13/B14/B15: matched_port pending'de değilse continue
                continue

            pending_ports.remove(matched_port)

            if router_ip not in seen_routers:
                routers.append(router_ip)
                seen_routers.add(router_ip)

            if is_destination:
                destination_reached = True

        util.print_result(routers, ttl)
        discovered_path.append(routers)

        if destination_reached:
            break

    return discovered_path


if __name__ == '__main__':
    args = util.parse_args()
    ip_addr = util.gethostbyname(args.host)
    print(f"traceroute to {args.host} ({ip_addr})")
    traceroute(util.Socket.make_udp(), util.Socket.make_icmp(), ip_addr)
