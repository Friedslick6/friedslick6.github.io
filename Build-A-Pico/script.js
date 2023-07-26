
/* Declarations */

// Get all elements with the "title" class
const titles = document.querySelectorAll(".title");
// Get the element with the "name-input" id
const nameInput = document.querySelector('#name-input');

// Get all image elements with the "palette" attribute
const paletteImages = document.querySelectorAll("img[palette]");
// Parse URL query parameters
const query = new URLSearchParams(document.location.search);
// Retrieve defined palette name
const parameters = [query.get("n") || undefined];
// Declare CSS variable names in order that defines the colour palette
const palette = [
    "--outline",
    "--body1",
    "--body2",
    "--body3",
    "--body4",
    "--belly1",
    "--belly2",
    "--belly3",
    "--belly4",
    "--faceMarkings",
    "--tailSpikes_mouth",
    "--flame1",
    "--flame2",
    "--pupils1",
    "--pupils2",
    "--eye"
];
// Get all variables from :root psuedo selector
const rootStyles = document.querySelector(":root");
const computedStyles = window.getComputedStyle(rootStyles);
// Fill the swatches array with CSS variable values from the :root element
const swatches = palette.map(
(variable) => computedStyles.getPropertyValue(variable)
);
// Pre-calculated lookup table for the polynomial 0xEDB88320 divisor
const lookupTable = [
    0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685,
    2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995,
    2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648,
    2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990,
    1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755,
    2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145,
    1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206,
    2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980,
    1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705,
    3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527,
    1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772,
    4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290,
    251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719,
    3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925,
    453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202,
    4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960,
    984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733,
    3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467,
    855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048,
    3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054,
    702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443,
    3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945,
    2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430,
    2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580,
    2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225,
    1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143,
    2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732,
    1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850,
    2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135,
    1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109,
    3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954,
    1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920,
    3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877,
    83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603,
    3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992,
    534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934,
    4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795,
    376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105,
    3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270,
    936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108,
    3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449,
    601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
    3272380065, 1510334235, 755167117
];

/* PLTE Chunk Modification */

// Function to modify the PLTE chunk of a given image:
async function modifyPLTE(image) {
    // Assign defined name parameter to its CSS variable
    if (parameters[0]) {
        document.querySelector(":root").style.setProperty("--name", `"${parameters[0]}"`);
    }
    // Fill the parameters array with defined query string parameters (0x0-0xF)
    let param;
    for (param = 0; param <= 15; param += 1) {
        parameters[param + 1] = query.get(param.toString(16)) || undefined;
    }
    // Replace swatches array values with defined parameters array values
    let val;
    for (val = 1; val <= 16; val += 1) {
        if (parameters[val]) {
            swatches[val - 1] = `#${parameters[val]}`;
        }
    }
    // Declare the PLTE chunk array with the "PLTE" ASCII header bytes
    const PLTEChunk = new Uint8Array(59);
    PLTEChunk.set([0x50, 0x4C, 0x54, 0x45], 0);
    // For each swatch:
    let swatch;
    for (swatch = 0; swatch < 16; swatch += 1) {
        // Exclude the '#' character
        const swatchStr = swatches[swatch].substring(1);
        let swatchInt = 0;
        // For each hexadecimal character pair, construct an integer
        let char;
        for (char = 0; char < 6; char += 2) {
            swatchInt = swatchInt << 8 |
                swatchStr.charCodeAt(char) - (swatchStr[char] >=
                    "a" ? 87 : 48) << 4 |
                swatchStr.charCodeAt(char + 1) - (swatchStr[char + 1] >=
                    "a" ? 87 : 48);
        }
        // Calculate the index to set the swatch bytes in the PLTEChunk array
        const index = 4 + 3 * swatch;
        // Push the swatch bytes into the PLTE chunk array
        PLTEChunk.set(
            [
                swatchInt >> 16 & 0xFF, swatchInt >> 8 & 0xFF, swatchInt & 0xFF
            ], index);
    }
    // Append the #000000 transparency swatch
    PLTEChunk.set([0, 0, 0], 52);
    // Initialize CRC32 with 0xFFFFFFFF
    const crc = new Uint32Array([0xFFFFFFFF]);
    //Exclude the checksum section from the PLTE chunk array
    const bytes = PLTEChunk.subarray(0, 55);
    // For each PLTEChunk byte, use lookupTable to calculate CRC32 checksum
    let byte;
    for (byte = 0; byte < 55; byte += 1) {
        crc[0] = lookupTable[0xFF &
            (crc[0] ^ bytes[byte])] ^ crc[0] >>> 8;
    }
    // Perform the final XOR operation on the CRC array with 0xFFFFFFFF
    crc[0] ^= 0xFFFFFFFF;
    // Append the PLTEChunk array's CRC-32 checksum
    PLTEChunk.set(
        [
            crc[0] >> 24 & 0xFF,
            crc[0] >> 16 & 0xFF,
            crc[0] >> 8 & 0xFF,
            crc[0] & 0xFF
        ], 55
    );
    // Fetch the image as an array buffer
    const response = await fetch(image.src);
    // Create a new Uint8Array from the fetched array buffer
    const byteArray = new Uint8Array(await response.arrayBuffer());
    // Replace bytes from offset 0x25 with the PLTE chunk array
    byteArray.set(PLTEChunk, 0x25);
    // Create a blob from the new image with the modified PLTE chunk
    const newImage = new Blob([byteArray], {
        type: "image/png"
    });
    // Replace the image with the new image
    image.src = URL.createObjectURL(newImage);
}
// Function to modify PLTE chunks for all images with the "palette" attribute
async function modifyPLTECall() {
    let num;
    for (num = 0; num < paletteImages.length; num += 1) {
        await modifyPLTE(paletteImages[num]);
    }
}

/* Title Animation */

let frameCount = 0;
function animateTitles() {
    // Every 15 frames, for each title class element:
	frameCount++ % 15 == 0 && titles.forEach(title => {
        //If element is active (name-input):
		if (title !== document.activeElement) {
            // Set all characters to lower case
			let string = title.textContent.toLowerCase();
            // Get string length
			const length = string.length;
			let randomizedCaseTextContent = [];
            let num;
            // For each character:
			for (num = 0; num < length; num += 1) {
                //
				let char = string[num];
                //Add random case letter to new string
				randomizedCaseTextContent += Math.random() < .5 ? char : char.toUpperCase();
			}
            //Replace original string with randomised case string
			title.textContent = randomizedCaseTextContent;
		}
	});
    // Re-iterate function
	requestAnimationFrame(animateTitles);
}

// Call the modifyPLTECall function
modifyPLTECall();
// Begin animation request loop
requestAnimationFrame(animateTitles);