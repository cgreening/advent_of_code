interface Operator {
  getValue(): number;
}

class Value implements Operator {
  private value: number;
  constructor(value: number) {
    this.value = value;
  }
  getValue(): number {
    return this.value;
  }
}

class PacketFunction implements Operator {
  private type: number;
  private values: Operator[];
  constructor(type: number, values: Operator[]) {
    this.type = type;
    this.values = values;
  }
  getValue(): number {
    switch (this.type) {
      case 0:
        return this.values.reduce((acc, packet) => acc + packet.getValue(), 0);
      case 1:
        return this.values.reduce((acc, packet) => acc * packet.getValue(), 1);
      case 2:
        return Math.min(...this.values.map((packet) => packet.getValue()));
      case 3:
        return Math.max(...this.values.map((packet) => packet.getValue()));
      case 5:
        if (this.values[0].getValue() > this.values[1].getValue()) {
          return 1;
        } else {
          return 0;
        }
      case 6:
        if (this.values[0].getValue() < this.values[1].getValue()) {
          return 1;
        } else {
          return 0;
        }
      case 7:
        if (this.values[0].getValue() === this.values[1].getValue()) {
          return 1;
        } else {
          return 0;
        }
      default:
        console.error("Unknown packet function", this.type);
        return 0;
    }
  }
}

function parsePacket(
  context: { binary: string },
  packetsToParse = -1
): Operator[] {
  const result: Operator[] = [];
  while (context.binary.length > 6 && packetsToParse !== 0) {
    // first three bits are the packet version
    const versionString = context.binary.substring(0, 3);
    const version = parseInt(versionString, 2);
    // next three bits are the packet type
    const typeString = context.binary.substring(3, 6);
    const type = parseInt(typeString, 2);
    // skip past the header
    context.binary = context.binary.substring(6);
    // if it's a litteral value then start extracting the value
    if (type === 4) {
      let value = "";
      let isDone = false;
      while (!isDone) {
        value += context.binary.substring(1, 5);
        isDone = context.binary[0] === "0";
        context.binary = context.binary.substring(5);
      }
      // this is the result
      result.push(new Value(parseInt(value, 2)));
    } else {
      // operator packet
      if (context.binary[0] === "0") {
        // if next bit is 0 then read the next 15 bits to get the length in bits of the subpackets
        // skip past the length string
        const lengthString = context.binary.substring(1, 16);
        const length = parseInt(lengthString, 2);
        context.binary = context.binary.substring(16);
        const subPackets = context.binary.substring(0, length);
        result.push(
          new PacketFunction(type, parsePacket({ binary: subPackets }))
        );
        context.binary = context.binary.substring(length);
      } else {
        // if next bit is 1 then read the next 11 bits to get the number of packets
        const lengthString = context.binary.substring(1, 12);
        const packets = parseInt(lengthString, 2);
        context.binary = context.binary.substring(12);
        result.push(new PacketFunction(type, parsePacket(context, packets)));
      }
    }
    packetsToParse--;
  }
  return result;
}

function part1(intput: string) {
  const hexToBin: { [key: string]: string } = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };
  const binary = intput
    .split("")
    .map((hex) => hexToBin[hex])
    .join("");
  // console.log(binary);

  const results = parsePacket({ binary });
  console.log(results.map((result) => result.getValue()));
}

part1("C200B40A82");
part1("04005AC33890");
part1("880086C3E88112");
part1("CE00C43D881120");
part1("D8005AC2A8F0");
part1("F600BC2D8F");
part1("9C005AC2F8F0");
part1("9C0141080250320F1802104A08");
part1(
  "6051639005B56008C1D9BB3CC9DAD5BE97A4A9104700AE76E672DC95AAE91425EF6AD8BA5591C00F92073004AC0171007E0BC248BE0008645982B1CA680A7A0CC60096802723C94C265E5B9699E7E94D6070C016958F99AC015100760B45884600087C6E88B091C014959C83E740440209FC89C2896A50765A59CE299F3640D300827902547661964D2239180393AF92A8B28F4401BCC8ED52C01591D7E9D2591D7E9D273005A5D127C99802C095B044D5A19A73DC0E9C553004F000DE953588129E372008F2C0169FDB44FA6C9219803E00085C378891F00010E8FF1AE398803D1BE25C743005A6477801F59CC4FA1F3989F420C0149ED9CF006A000084C5386D1F4401F87310E313804D33B4095AFBED32ABF2CA28007DC9D3D713300524BCA940097CA8A4AF9F4C00F9B6D00088654867A7BC8BCA4829402F9D6895B2E4DF7E373189D9BE6BF86B200B7E3C68021331CD4AE6639A974232008E663C3FE00A4E0949124ED69087A848002749002151561F45B3007218C7A8FE600FC228D50B8C01097EEDD7001CF9DE5C0E62DEB089805330ED30CD3C0D3A3F367A40147E8023221F221531C9681100C717002100B36002A19809D15003900892601F950073630024805F400150D400A70028C00F5002C00252600698400A700326C0E44590039687B313BF669F35C9EF974396EF0A647533F2011B340151007637C46860200D43085712A7E4FE60086003E5234B5A56129C91FC93F1802F12EC01292BD754BCED27B92BD754BCED27B100264C4C40109D578CA600AC9AB5802B238E67495391D5CFC402E8B325C1E86F266F250B77ECC600BE006EE00085C7E8DF044001088E31420BCB08A003A72BF87D7A36C994CE76545030047801539F649BF4DEA52CBCA00B4EF3DE9B9CFEE379F14608"
);
